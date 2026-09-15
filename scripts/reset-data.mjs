import fs from 'node:fs';
import path from 'node:path';

const projectPath = path.resolve(process.cwd());
const project = fs.realpathSync(projectPath);
const requested = path.resolve(process.env.INSPECTION_DESK_DATA_DIR || '.data');
const within = (child, parent) => child === parent || child.startsWith(parent + path.sep);
const refusal = 'Refusing to remove the project, fixtures, an ancestor, or a linked directory.';

// Resolve an existing parent even when the final data directory does not exist.
function realLocation(location) {
  let current = location;
  const suffix = [];
  for (;;) {
    try { return path.resolve(fs.realpathSync(current), ...suffix); }
    catch (error) {
      if (error.code !== 'ENOENT' || current === path.parse(current).root) throw error;
      suffix.unshift(path.basename(current));
      current = path.dirname(current);
    }
  }
}

// System aliases such as /var may resolve normally. A link inside this project,
// or the selected directory itself, must never redirect a reset.
for (let current = requested; current !== path.parse(current).root; current = path.dirname(current)) {
  try {
    if (fs.lstatSync(current).isSymbolicLink() &&
        (current === requested || within(current, projectPath))) throw Error(refusal);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

const target = realLocation(requested);
const fixtures = realLocation(path.resolve(process.env.INSPECTION_DESK_FIXTURE_DIR || 'data'));
if (target === path.parse(target).root || within(project, target) ||
    within(fixtures, target) || within(target, fixtures)) throw Error(refusal);

fs.rmSync(target, { recursive: true, force: true });
console.log(`Reset follow-up data: ${target}`);
