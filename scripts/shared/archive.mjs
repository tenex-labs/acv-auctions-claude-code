import { inflateRawSync, deflateRawSync } from "node:zlib";
const table = Array.from({ length: 256 }, (_, n) => {
  for (let k = 0; k < 8; k++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
  return n >>> 0;
});
export function crc32(b) {
  let c = 0xffffffff;
  for (const x of b) c = table[(c ^ x) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function integer(n) {
  if (n > BigInt(Number.MAX_SAFE_INTEGER)) throw Error("ZIP64 value too large");
  return Number(n);
}
function extras(b) {
  const out = new Map();
  for (let p = 0; p < b.length;) {
    if (p + 4 > b.length) throw Error("Malformed ZIP extra");
    const id = b.readUInt16LE(p),
      n = b.readUInt16LE(p + 2);
    p += 4;
    if (p + n > b.length || out.has(id)) throw Error("Malformed ZIP extra");
    out.set(id, b.subarray(p, p + n));
    p += n;
  }
  return out;
}
function resolve64(raw, ext) {
  let p = 0;
  return raw.map((x) => {
    if (x !== 0xffffffff) return x;
    if (!ext || p + 8 > ext.length) throw Error("Missing ZIP64 metadata");
    const n = integer(ext.readBigUInt64LE(p));
    p += 8;
    return n;
  });
}
export function readZip(input, limits) {
  const b = Buffer.from(input);
  if (b.length > limits.maxZipBytes) throw Error("ZIP exceeds 25 MiB");
  let e = -1;
  for (let p = b.length - 22; p >= Math.max(0, b.length - 65557); p--)
    if (
      b.readUInt32LE(p) === 0x06054b50 &&
      p + 22 + b.readUInt16LE(p + 20) === b.length
    ) {
      e = p;
      break;
    }
  if (e < 0) throw Error("Missing ZIP directory");
  if (b.readUInt16LE(e + 4) || b.readUInt16LE(e + 6))
    throw Error("Multipart ZIP is not supported");
  let count = b.readUInt16LE(e + 10),
    size = b.readUInt32LE(e + 12),
    start = b.readUInt32LE(e + 16),
    end = e;
  if (count !== b.readUInt16LE(e + 8)) throw Error("Multipart entry counts");
  if (count === 65535 || size === 0xffffffff || start === 0xffffffff) {
    if (
      e < 20 ||
      b.readUInt32LE(e - 20) !== 0x07064b50 ||
      b.readUInt32LE(e - 16) !== 0 ||
      b.readUInt32LE(e - 4) !== 1
    )
      throw Error("Invalid ZIP64 locator");
    const z = integer(b.readBigUInt64LE(e - 12));
    if (
      z + 56 > e - 20 ||
      b.readUInt32LE(z) !== 0x06064b50 ||
      b.readUInt32LE(z + 16) ||
      b.readUInt32LE(z + 20)
    )
      throw Error("Invalid ZIP64 directory");
    if (b.readBigUInt64LE(z + 24) !== b.readBigUInt64LE(z + 32))
      throw Error("ZIP64 entry disagreement");
    count = integer(b.readBigUInt64LE(z + 32));
    size = integer(b.readBigUInt64LE(z + 40));
    start = integer(b.readBigUInt64LE(z + 48));
    end = z;
  }
  if (count > limits.maxFiles + 1 || start + size !== end)
    throw Error("ZIP directory limits or offsets");
  let p = start,
    total = 0;
  const entries = [],
    ranges = [];
  for (let i = 0; i < count; i++) {
    if (p + 46 > start + size || b.readUInt32LE(p) !== 0x02014b50)
      throw Error("Invalid central entry");
    const flags = b.readUInt16LE(p + 8),
      method = b.readUInt16LE(p + 10),
      crc = b.readUInt32LE(p + 16),
      nameLen = b.readUInt16LE(p + 28),
      extraLen = b.readUInt16LE(p + 30),
      commentLen = b.readUInt16LE(p + 32),
      disk = b.readUInt16LE(p + 34),
      attrs = b.readUInt32LE(p + 38),
      platform = b[p + 5];
    if (flags & ~0x808 || ![0, 8].includes(method) || disk)
      throw Error("Unsupported ZIP flags/method/disk");
    if (p + 46 + nameLen + extraLen + commentLen > start + size)
      throw Error("Truncated central entry");
    const nameBytes = b.subarray(p + 46, p + 46 + nameLen);
    const name = new TextDecoder("utf-8", { fatal: true }).decode(nameBytes);
    if (!(flags & 0x800) && nameBytes.some((x) => x > 127))
      throw Error("ZIP names must be UTF-8");
    const ext = extras(
      b.subarray(p + 46 + nameLen, p + 46 + nameLen + extraLen),
    );
    if (ext.has(0x756e)) throw Error("ZIP link metadata is not supported");
    const [expanded, compressed, offset] = resolve64(
      [b.readUInt32LE(p + 24), b.readUInt32LE(p + 20), b.readUInt32LE(p + 42)],
      ext.get(1),
    );
    const mode = attrs >>> 16,
      type = mode & 0xf000;
    if (platform === 3 && type !== 0 && type !== 0x8000 && type !== 0x4000)
      throw Error("ZIP links and special files forbidden: " + name);
    const directory = name.endsWith("/");
    if (directory && (expanded || compressed))
      throw Error("Nonempty ZIP directory");
    if (
      expanded > limits.maxFileBytes ||
      total + expanded > limits.maxExtractedBytes
    )
      throw Error("ZIP expanded limits: " + name);
    if (offset + 30 > start || b.readUInt32LE(offset) !== 0x04034b50)
      throw Error("Invalid local record");
    const lf = b.readUInt16LE(offset + 6),
      lm = b.readUInt16LE(offset + 8),
      ln = b.readUInt16LE(offset + 26),
      le = b.readUInt16LE(offset + 28);
    if (
      lf !== flags ||
      lm !== method ||
      ln !== nameLen ||
      !b.subarray(offset + 30, offset + 30 + ln).equals(nameBytes)
    )
      throw Error("Central/local disagreement: " + name);
    const dataStart = offset + 30 + ln + le,
      dataEnd = dataStart + compressed;
    if (dataEnd > start) throw Error("Overlapping ZIP data");
    const localExtra = extras(b.subarray(offset + 30 + ln, dataStart));
    const [lx, lc] = resolve64(
      [b.readUInt32LE(offset + 22), b.readUInt32LE(offset + 18)],
      localExtra.get(1),
    );
    if (
      !(flags & 8) &&
      (b.readUInt32LE(offset + 14) !== crc ||
        lx !== expanded ||
        lc !== compressed)
    )
      throw Error("Local sizes disagree: " + name);
    let rangeEnd = dataEnd;
    if (flags & 8) {
      let d = dataEnd;
      if (b.readUInt32LE(d) === 0x08074b50) d += 4;
      const wide = ext.has(1) || localExtra.has(1);
      if (d + (wide ? 20 : 12) > start) throw Error("Truncated descriptor");
      const dc = b.readUInt32LE(d),
        ds = wide ? integer(b.readBigUInt64LE(d + 4)) : b.readUInt32LE(d + 4),
        dx = wide ? integer(b.readBigUInt64LE(d + 12)) : b.readUInt32LE(d + 8);
      if (dc !== crc || ds !== compressed || dx !== expanded)
        throw Error("Descriptor mismatch");
      rangeEnd = d + (wide ? 20 : 12);
    }
    ranges.push([offset, rangeEnd]);
    let content;
    try {
      content =
        method === 0
          ? Buffer.from(b.subarray(dataStart, dataEnd))
          : inflateRawSync(b.subarray(dataStart, dataEnd), {
              maxOutputLength:
                Math.min(
                  limits.maxFileBytes,
                  limits.maxExtractedBytes - total,
                ) + 1,
            });
    } catch {
      throw Error("ZIP decompression limit or invalid contents: " + name);
    }
    if (content.length !== expanded || crc32(content) !== crc)
      throw Error("ZIP content length or CRC mismatch: " + name);
    total += content.length;
    entries.push({ path: name, content, directory, mode });
    p += 46 + nameLen + extraLen + commentLen;
  }
  if (p !== start + size) throw Error("Unexpected ZIP directory data");
  ranges.sort((a, b) => a[0] - b[0]);
  let prev = 0;
  for (const [a, z] of ranges) {
    if (a !== prev) throw Error("ZIP overlapping or unaccounted local bytes");
    prev = z;
  }
  if (prev !== start) throw Error("ZIP unaccounted bytes");
  return entries;
}
export function writeZip(files) {
  const local = [],
    central = [];
  let offset = 0;
  for (const f of files) {
    const name = Buffer.from(f.path),
      data = Buffer.from(f.content),
      compressed = deflateRawSync(data, { level: 6 }),
      crc = crc32(data),
      h = Buffer.alloc(30);
    h.writeUInt32LE(0x04034b50);
    h.writeUInt16LE(20, 4);
    h.writeUInt16LE(0x800, 6);
    h.writeUInt16LE(8, 8);
    h.writeUInt16LE(33, 12);
    h.writeUInt32LE(crc, 14);
    h.writeUInt32LE(compressed.length, 18);
    h.writeUInt32LE(data.length, 22);
    h.writeUInt16LE(name.length, 26);
    local.push(h, name, compressed);
    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50);
    c.writeUInt16LE(0x0314, 4);
    c.writeUInt16LE(20, 6);
    c.writeUInt16LE(0x800, 8);
    c.writeUInt16LE(8, 10);
    c.writeUInt16LE(33, 14);
    c.writeUInt32LE(crc, 16);
    c.writeUInt32LE(compressed.length, 20);
    c.writeUInt32LE(data.length, 24);
    c.writeUInt16LE(name.length, 28);
    c.writeUInt32LE((0x81a4 * 65536) >>> 0, 38);
    c.writeUInt32LE(offset, 42);
    central.push(c, name);
    offset += h.length + name.length + compressed.length;
  }
  const cd = Buffer.concat(central),
    e = Buffer.alloc(22);
  e.writeUInt32LE(0x06054b50);
  e.writeUInt16LE(files.length, 8);
  e.writeUInt16LE(files.length, 10);
  e.writeUInt32LE(cd.length, 12);
  e.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, cd, e]);
}
