import { spawnSync } from 'node:child_process';

export const COUNTING_VERSION = 'changed-code-2.0';
export const CODE_LIMIT = 500;

// Fixed release rules. Unknown text files count as code so moving a helper cannot hide it.
export function classifyPath(file) {
  if (/(^|\/)(dist|build|node_modules|\.next|coverage)(\/|$)|\.(?:min\.[cm]?js|map)$/.test(file)) return 'generated';
  if (/^workshop\/evidence\/[^/]+\.(?:json|log)$/.test(file)) return 'evidence';
  if (/\.(?:md|txt|rst|adoc)$/i.test(file) || /^(?:LICENSE|NOTICE)(?:\.[^/]*)?$/.test(file)) return 'documentation';
  if (/^tests\//.test(file)) return 'tests';
  return 'code';
}

/** Parse git --numstat -z --no-renames. Tabs/newlines in filenames remain intact. */
export function parseChangedCode(output) {
  const files = output.split('\0').filter(Boolean).map((entry) => {
    const match = /^(\d+|-)\t(\d+|-)\t([\s\S]+)$/.exec(entry);
    if (!match) throw new Error('Invalid numstat record; use -z and --no-renames.');
    const [, add, del, file] = match;
    const binary = add === '-' || del === '-';
    return { path: file, category: classifyPath(file), additions: binary ? null : Number(add), deletions: binary ? null : Number(del), binary };
  });
  const total = (categories) => files.filter((f) => categories.includes(f.category)).reduce((n, f) => n + (f.additions ?? 0) + (f.deletions ?? 0), 0);
  const uncountable = files.filter((f) => f.binary && !['documentation', 'evidence'].includes(f.category)).map((f) => f.path);
  const generated = files.filter((f) => f.category === 'generated').map((f) => f.path);
  const countedCodeLines = total(['code', 'tests', 'generated']);
  return { countingVersion: COUNTING_VERSION, limit: CODE_LIMIT, countedCodeLines,
    applicationLines: total(['code']), testLines: total(['tests']), documentationLines: total(['documentation']), evidenceLines: total(['evidence']),
    uncountable, generated, withinLimit: uncountable.length === 0 && generated.length === 0 && countedCodeLines <= CODE_LIMIT, files };
}

export function countCommitChanges(repo, base, head = 'HEAD') {
  for (const revision of [base, head]) {
    if (!/^(?:[a-f0-9]{40}|HEAD)$/.test(revision)) throw new Error('Use a full commit ID or HEAD.');
  }
  const result = spawnSync('git', ['-c', 'core.attributesFile=/dev/null', 'diff', '--numstat', '-z', '--no-renames', '--no-ext-diff', '--no-textconv', '--diff-algorithm=myers', '--no-indent-heuristic', base, head, '--'],
    { cwd: repo, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, timeout: 15000 });
  if (result.status !== 0) throw new Error('Cannot compare these commits. Fetch the frozen starter and push the code before submitting.');
  return { baseSha: base, headSha: head, ...parseChangedCode(result.stdout) };
}
