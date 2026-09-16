export function validateDependencies(files) {
  const map = new Map(files.map((f) => [f.path, f]));
  const pkg = JSON.parse(map.get("package.json").content),
    lock = JSON.parse(map.get("package-lock.json").content);
  if (![2, 3].includes(lock.lockfileVersion) || !lock.packages)
    throw Error("Use an npm version 2 or 3 lockfile");
  for (const section of [
    "dependencies",
    "devDependencies",
    "optionalDependencies",
    "peerDependencies",
  ])
    for (const [name, value] of Object.entries(pkg[section] ?? {})) {
      if (
        typeof value !== "string" ||
        /^(?:file:|link:|git|https?:|ssh:|github:|\.\.?\/|\/|workspace:)/.test(
          value,
        ) ||
        value.includes("://")
      )
        throw Error("Unsupported dependency source: " + name);
    }
  for (const [name, p] of Object.entries(lock.packages)) {
    if (name && !/^node_modules\//.test(name))
      throw Error("Unexpected lockfile package path: " + name);
    if (p.link) throw Error("Linked dependency: " + name);
    if (name && !p.resolved) throw Error("Missing locked source: " + name);
    if (p.resolved) {
      let u;
      try {
        u = new URL(p.resolved);
      } catch {
        throw Error("Invalid dependency source: " + name);
      }
      if (
        u.protocol !== "https:" ||
        u.hostname !== "registry.npmjs.org" ||
        u.port ||
        u.username ||
        u.password ||
        !u.pathname.endsWith(".tgz")
      )
        throw Error("Only public npm registry tarballs are supported: " + name);
      if (!/^sha512-[A-Za-z0-9+/]+=*$/.test(p.integrity ?? ""))
        throw Error("Missing SHA512 integrity: " + name);
    }
  }
  return { packages: Object.keys(lock.packages).length - 1 };
}
