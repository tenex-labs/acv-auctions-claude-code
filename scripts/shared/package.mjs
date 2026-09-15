import path from "node:path";
import { promises as fs, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { readZip, writeZip } from "./archive.mjs";
import { checkSize } from "./size.mjs";
const contract = JSON.parse(
  readFileSync(new URL("./contract.json", import.meta.url), "utf8"),
);
const rules = contract.packaging;
export const sha256 = (b) => createHash("sha256").update(b).digest("hex");
const compare = (a, b) => {
  const left = Array.from(a, (x) => x.codePointAt(0)),
    right = Array.from(b, (x) => x.codePointAt(0));
  for (let i = 0; i < Math.min(left.length, right.length); i++)
    if (left[i] !== right[i]) return left[i] - right[i];
  return left.length - right.length;
};
export function packageHash(files) {
  return sha256(
    Buffer.from(
      [...files]
        .sort((a, b) => compare(a.path, b.path))
        .map((f) => f.path + "\t" + sha256(f.content) + "\n")
        .join(""),
    ),
  );
}
export function safePath(name) {
  if (
    typeof name !== "string" ||
    !name ||
    name.length > rules.maxPathLength ||
    /[\\:\x00-\x1f\x7f]/.test(name) ||
    name.startsWith("/") ||
    name.normalize("NFC") !== name
  )
    throw Error("Unsafe path: " + name);
  const parts = name.split("/");
  if (
    parts.length > rules.maxDepth ||
    parts.some(
      (p) =>
        !p ||
        p === "." ||
        p === ".." ||
        /[. ]$/.test(p) ||
        /^(con|prn|aux|nul|com\d|lpt\d)(\.|$)/i.test(p),
    )
  )
    throw Error("Unsafe path: " + name);
  return name;
}
export function excluded(name) {
  const p = name.split("/"),
    base = p.at(-1);
  return (
    p.some(
      (x) =>
        rules.excludeDirectories.filter((x) => !x.includes("/")).includes(x) ||
        x.startsWith(".next"),
    ) ||
    rules.excludeDirectories
      .filter((x) => x.includes("/"))
      .some((x) => name === x || name.startsWith(x + "/")) ||
    base === ".env" ||
    (base.startsWith(".env.") && base !== ".env.example") ||
    base === "CLAUDE.local.md" ||
    name === ".claude/settings.local.json" ||
    (name.startsWith(".claude/") && /\.local\./.test(base)) ||
    /\.(log|tsbuildinfo|zip|tar|tgz|gz|7z|rar|swp)$/.test(base) ||
    [".DS_Store", "Thumbs.db"].includes(base) ||
    base.endsWith("~")
  );
}
function supported(name) {
  const ext = path.extname(name).toLowerCase();
  if (
    rules.supportedTextExtensions.includes(ext) ||
    rules.supportedRootNames.includes(name)
  )
    return "text";
  if (
    rules.binaryExtensions.includes(ext) &&
    rules.binaryRoots.some((p) => name.startsWith(p))
  )
    return "binary";
  throw Error("Unsupported file: " + name);
}
function scan(name, b) {
  if (
    /(^|\/)(id_rsa|id_ed25519|credentials|\.netrc)(\.|$)/i.test(name) ||
    /\.(pem|key|p12|pfx)$/i.test(name)
  )
    throw Error("Credential file forbidden: " + name);
  const text = new TextDecoder("utf-8", { fatal: true }).decode(b);
  if (text.includes("\0")) throw Error("NUL in text file: " + name);
  const patterns = [
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
    /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})/,
    /(?:sk-ant-api\d{2}-[A-Za-z0-9_-]{30,})/,
    /AKIA[A-Z0-9]{16}/,
    /(?:_authToken|_password|_auth)\s*=\s*[^\s$]{4,}/,
  ];
  const line = text
    .split(/\r?\n/)
    .findIndex((l) => patterns.some((p) => p.test(l)));
  if (line >= 0) throw Error("Possible credential: " + name + ":" + (line + 1));
}
function validateFiles(files) {
  if (files.length > rules.maxFiles) throw Error("More than 3000 files");
  let total = 0,
    binary = 0;
  const seen = new Set();
  for (const f of files) {
    safePath(f.path);
    if (excluded(f.path)) throw Error("Excluded file in archive: " + f.path);
    const key = f.path.toLowerCase();
    if (seen.has(key)) throw Error("Duplicate path: " + f.path);
    seen.add(key);
    if (f.content.length > rules.maxFileBytes)
      throw Error("File exceeds 2 MiB: " + f.path);
    total += f.content.length;
    if (total > rules.maxExtractedBytes)
      throw Error("Extracted files exceed 100 MiB");
    if (supported(f.path) === "binary") {
      if (++binary > rules.maxBinaryFiles)
        throw Error("More than 20 binary files");
    } else scan(f.path, f.content);
    f.sha256 = sha256(f.content);
    f.size = f.content.length;
  }
  const map = new Map(files.map((f) => [f.path, f]));
  for (const name of rules.required)
    if (!map.has(name)) throw Error("Missing required file: " + name);
  const pkg = JSON.parse(map.get("package.json").content);
  if (!pkg.scripts?.build || !pkg.scripts?.start)
    throw Error("package.json requires build and start scripts");
  const declaration = JSON.parse(
    map.get("tests/participant/assessment.json").content,
  );
  if (
    declaration.version !== 1 ||
    typeof declaration.regressionTest !== "string" ||
    !/^tests\/participant\/.*\.test\.(ts|mts|js|mjs)$/.test(
      declaration.regressionTest,
    ) ||
    !map.has(declaration.regressionTest)
  )
    throw Error("Missing declared regression test under tests/participant");
  safePath(declaration.regressionTest);
  return { files, total, sizeReport: checkSize(files) };
}
export function validateArchive(bytes, expected = {}) {
  bytes = Buffer.from(bytes);
  const zipSha256 = sha256(bytes);
  if (expected.zipSha256 && expected.zipSha256 !== zipSha256)
    throw Error("ZIP-byte hash mismatch");
  const entries = readZip(bytes, rules),
    seen = new Set();
  for (const f of entries) {
    safePath(f.directory ? f.path.slice(0, -1) : f.path);
    const key = f.path.replace(/\/$/, "").toLowerCase();
    if (seen.has(key)) throw Error("Duplicate ZIP path: " + f.path);
    seen.add(key);
  }
  const entry = entries.find((f) => f.path === "submission-manifest.json");
  if (!entry)
    throw Error(
      "Run npm run package in your project and upload submission.zip.",
    );
  const manifest = JSON.parse(
    new TextDecoder("utf-8", { fatal: true }).decode(entry.content),
  );
  const files = entries
    .filter((f) => !f.directory && f !== entry)
    .map(({ path, content }) => ({ path, content }));
  const state = validateFiles(files);
  if (
    manifest.manifestVersion !== 1 ||
    manifest.contractVersion !== contract.contractVersion ||
    !Array.isArray(manifest.files) ||
    manifest.files.length !== files.length ||
    manifest.fileCount !== files.length ||
    manifest.uncompressedBytes !== state.total
  )
    throw Error("Inconsistent manifest");
  const declared = new Map();
  for (const f of manifest.files) {
    safePath(f.path);
    if (
      declared.has(f.path) ||
      !Number.isInteger(f.bytes) ||
      !/^[a-f0-9]{64}$/.test(f.sha256)
    )
      throw Error("Invalid manifest file");
    declared.set(f.path, f);
  }
  for (const f of files) {
    const d = declared.get(f.path);
    if (!d || d.bytes !== f.size || d.sha256 !== f.sha256)
      throw Error("File hash or length mismatch: " + f.path);
  }
  const fingerprint = packageHash(files);
  if (
    manifest.packageHash !== fingerprint ||
    (expected.packageHash && expected.packageHash !== fingerprint)
  )
    throw Error("Package content hash mismatch");
  return {
    manifest,
    files,
    packageHash: fingerprint,
    zipSha256,
    warnings: bytes.length > rules.warnZipBytes ? ["ZIP exceeds 10 MiB"] : [],
  };
}
export async function createPackage(root, options = {}) {
  root = path.resolve(root);
  const configured = options.dataDir ?? process.env.INSPECTION_DESK_DATA_DIR;
  const dataPath = configured ? path.resolve(root, configured) : undefined;
  const files = [],
    snapshots = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name),
        name = path.relative(root, full).split(path.sep).join("/");
      if (
        full === dataPath ||
        name === "submission-manifest.json" ||
        excluded(name)
      )
        continue;
      safePath(name);
      const stat = await fs.lstat(full);
      if (
        stat.isSymbolicLink() ||
        (!stat.isDirectory() && !stat.isFile()) ||
        (stat.isFile() && stat.nlink > 1)
      )
        throw Error("Links and special files forbidden: " + name);
      if (stat.isDirectory()) {
        await walk(full);
        continue;
      }
      if (stat.size > rules.maxFileBytes)
        throw Error("File exceeds 2 MiB: " + name);
      if (files.length >= rules.maxFiles) throw Error("More than 3000 files");
      const content = await fs.readFile(full);
      files.push({ path: name, content });
      snapshots.push({
        full,
        size: stat.size,
        mtimeMs: stat.mtimeMs,
        ino: stat.ino,
        content,
      });
    }
  }
  await walk(root);
  const state = validateFiles(files);
  for (const s of snapshots) {
    const after = await fs.lstat(s.full);
    if (
      after.size !== s.size ||
      after.mtimeMs !== s.mtimeMs ||
      after.ino !== s.ino ||
      !Buffer.from(await fs.readFile(s.full)).equals(s.content)
    )
      throw Error(
        "File changed during packaging: " + path.relative(root, s.full),
      );
  }
  const fingerprint = packageHash(files),
    warnings = state.sizeReport.violations.map(
      (f) => f.path + ": " + f.lines + " lines (maximum 500)",
    );
  const manifest = {
    manifestVersion: 1,
    contractVersion: contract.contractVersion,
    producedAt: options.producedAt ?? new Date().toISOString(),
    tool: "inspection-desk-package-1.1",
    node: process.version,
    fileCount: files.length,
    uncompressedBytes: state.total,
    files: [...files]
      .sort((a, b) => compare(a.path, b.path))
      .map((f) => ({ path: f.path, bytes: f.size, sha256: f.sha256 })),
    packageHash: fingerprint,
    sizeReport: state.sizeReport,
    warnings,
  };
  const bytes = writeZip([
    ...files,
    {
      path: "submission-manifest.json",
      content: Buffer.from(JSON.stringify(manifest, null, 2) + "\n"),
    },
  ]);
  if (bytes.length > rules.maxZipBytes) throw Error("ZIP exceeds 25 MiB");
  const verified = validateArchive(bytes);
  return { ...verified, bytes };
}
export async function extractArchive(bytes, destination, expected = {}) {
  const validated = validateArchive(bytes, expected);
  await fs.mkdir(destination, { recursive: true });
  if ((await fs.readdir(destination)).length)
    throw Error("Extraction destination must be empty");
  for (const f of validated.files) {
    const target = path.join(destination, f.path);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, f.content, { flag: "wx", mode: 0o644 });
  }
  return validated;
}
