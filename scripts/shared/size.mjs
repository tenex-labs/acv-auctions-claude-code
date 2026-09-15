import path from "node:path";
import { readFileSync } from "node:fs";
const contract = JSON.parse(
  readFileSync(new URL("./contract.json", import.meta.url), "utf8"),
);
export function isCountedPath(name) {
  return (
    contract.size.extensions.includes(path.extname(name).toLowerCase()) &&
    !contract.size.excludedFiles.includes(name)
  );
}
export function countLines(bytes) {
  const text = Buffer.from(bytes).toString("utf8").replace(/\r\n?/g, "\n");
  if (text.includes("\0")) throw Error("Counted source contains NUL");
  return text ? text.split("\n").length - (text.endsWith("\n") ? 1 : 0) : 0;
}
export function checkSize(files) {
  const counted = files
    .filter((f) => isCountedPath(f.path))
    .map((f) => ({
      path: f.path,
      lines: countLines(f.content),
      group: /^(tests|\.claude)\//.test(f.path) ? "helper" : "application",
    }));
  return {
    maximum: 500,
    files: counted,
    violations: counted.filter((f) => f.lines > 500),
    passed: counted.every((f) => f.lines <= 500),
  };
}
