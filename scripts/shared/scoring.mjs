import { readFileSync } from "node:fs";
export const contract = JSON.parse(
  readFileSync(new URL("./contract.json", import.meta.url), "utf8"),
);
const hash = /^[a-f0-9]{64}$/;
export function validateResult(r, expected = {}) {
  const allowed = [
    "schemaVersion",
    "binding",
    "checks",
    "regressionGate",
    "startedAt",
    "completedAt",
    "measurements",
    "screenshots",
  ];
  if (
    !r ||
    r.schemaVersion !== 1 ||
    Object.keys(r).some((k) => !allowed.includes(k))
  )
    throw Error("Invalid result schema");
  const keys = [
    "submissionId",
    "participantId",
    "sequence",
    "packageHash",
    "zipSha256",
    "contractVersion",
    "checkerBundleHash",
    "jobId",
  ];
  if (!r.binding || Object.keys(r.binding).length !== keys.length)
    throw Error("Incomplete result binding");
  for (const k of keys) {
    const v = r.binding[k];
    if (
      k === "sequence"
        ? !Number.isInteger(v) || v < 1
        : typeof v !== "string" || !v
    )
      throw Error("Invalid binding " + k);
    if (k.endsWith("Hash") || k === "zipSha256") {
      if (!hash.test(v)) throw Error("Invalid binding hash " + k);
    }
    if (expected[k] !== undefined && expected[k] !== v)
      throw Error("Result binding mismatch " + k);
  }
  if (r.binding.contractVersion !== contract.contractVersion)
    throw Error("Contract version mismatch");
  if (
    !Array.isArray(r.checks) ||
    r.checks.length !== 45 ||
    new Set(r.checks.map((c) => c.id)).size !== 45
  )
    throw Error("Expected 45 distinct checks");
  for (const c of r.checks) {
    if (
      !contract.checks.some((x) => x.id === c.id) ||
      !["pass", "fail", "pending"].includes(c.status) ||
      typeof c.explanation !== "string" ||
      !c.explanation.trim() ||
      !Array.isArray(c.datasets) ||
      c.datasets.some((x) => typeof x !== "string") ||
      Object.keys(c).some(
        (k) =>
          !["id", "status", "explanation", "datasets", "evidence"].includes(k),
      )
    )
      throw Error("Invalid check " + c.id);
    if (
      c.evidence &&
      (!Array.isArray(c.evidence) ||
        c.evidence.some((x) => typeof x !== "string"))
    )
      throw Error("Invalid evidence");
  }
  if (
    !r.regressionGate ||
    Object.keys(r.regressionGate).length !== 3 ||
    contract.regressionGate.required.some(
      (k) => typeof r.regressionGate[k] !== "boolean",
    )
  )
    throw Error("Invalid regression gate");
  for (const k of ["startedAt", "completedAt"])
    if (typeof r[k] !== "string" || !Number.isFinite(Date.parse(r[k])))
      throw Error("Invalid timestamp");
  if (Date.parse(r.completedAt) < Date.parse(r.startedAt))
    throw Error("Result time reversed");
  return r;
}
export function scoreResult(input) {
  const r = validateResult(input);
  const byId = new Map(r.checks.map((c) => [c.id, c]));
  const regression = contract.regressionGate.required.every(
    (k) => r.regressionGate[k],
  );
  const hook = contract.hookGate.requiredPass.every(
    (k) => byId.get(k).status === "pass",
  );
  const criteria = contract.criteria.map((c) => {
    const checks = contract.checks
      .filter((x) => x.criterion === c.id)
      .map((x) => {
        const gate = contract.regressionGate.gatedChecks.includes(x.id)
          ? regression
          : contract.hookGate.gatedChecks.includes(x.id)
            ? hook
            : true;
        const raw = byId.get(x.id);
        return {
          ...raw,
          points: raw.status === "pass" && gate ? x.points : 0,
          maximum: x.points,
          gatePassed: gate,
        };
      });
    return {
      ...c,
      points: checks.reduce((n, c) => n + c.points, 0),
      maximum: checks.reduce((n, c) => n + c.maximum, 0),
      checks,
    };
  });
  return {
    total: criteria.reduce((n, c) => n + c.points, 0),
    possible: 100,
    criteria,
    pending: r.checks.some((c) => c.status === "pending"),
  };
}
