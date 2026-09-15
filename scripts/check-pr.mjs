import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, realpathSync, copyFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/** Snapshot proposed bytes in a private index; never stage the learner's files. */
export function measureLayer({ cwd = process.cwd(), base, limit }) {
  if (!base || !Number.isSafeInteger(limit) || limit < 1) {
    throw new Error('Supply --base <preceding-branch> and --limit <positive changed-line limit>. No default policy is assumed.');
  }
  const git = (args, env = {}) => execFileSync('git', args, {
    cwd, encoding: 'utf8', env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe'],
  });
  const root = git(['rev-parse', '--show-toplevel']).trim();
  if (realpathSync(cwd) !== realpathSync(root)) throw new Error('Run from the project Git root.');
  const baseCommit = git(['rev-parse', '--verify', `${base}^{commit}`]).trim();
  const head = git(['rev-parse', 'HEAD']).trim();
  try { git(['merge-base', '--is-ancestor', baseCommit, head]); }
  catch { throw new Error(`Base ${base} is not an ancestor of HEAD. Confirm the planned preceding branch before checking.`); }
  const temp = mkdtempSync(join(tmpdir(), 'inspection-pr-'));
  try {
    const env = { GIT_INDEX_FILE: join(temp, 'index') };
    const actualIndex = resolve(cwd, git(['rev-parse', '--git-path', 'index']).trim());
    if (existsSync(actualIndex)) copyFileSync(actualIndex, env.GIT_INDEX_FILE);
    else git(['read-tree', 'HEAD'], env);
    git(['add', '-A', '--', '.'], env);
    const proposedTree = git(['write-tree'], env).trim();
    const raw = git(['diff', '--numstat', '-z', '--no-renames', baseCommit, proposedTree]);
    const files = raw.split('\0').filter(Boolean).map(row => {
      const [, added, deleted, path] = row.match(/^(\S+)\t(\S+)\t([\s\S]+)$/) ?? [];
      if (!path) throw new Error('Could not parse Git changed-line output.');
      return { path, additions: added === '-' ? null : Number(added), deletions: deleted === '-' ? null : Number(deleted) };
    });
    const binaryFiles = files.filter(f => f.additions === null || f.deletions === null).map(f => f.path);
    const additions = files.reduce((n, f) => n + (f.additions ?? 0), 0);
    const deletions = files.reduce((n, f) => n + (f.deletions ?? 0), 0);
    const ignored = git(['ls-files', '--others', '--ignored', '--exclude-standard', '--directory', '-z']).split('\0').filter(Boolean);
    return {
      base, baseCommit, head, proposedTree, limit, additions, deletions, changedLines: additions + deletions,
      passed: binaryFiles.length === 0 && additions + deletions <= limit, files, binaryFiles,
      ignored,
      countingRule: 'Additions + deletions for the complete proposed layer against the explicit base. New and tracked generated text files count in full; renames count as deletion + addition. Tracked files plus all nonignored new files and saved uncommitted edits are included. Ignored untracked paths are listed, not proposed: explicitly add any intended ignored file to Git before rerunning. Binary changes require separate review and fail this line-only gate. Commits do not reset the count. The 500-line source-file rule is separate.',
    };
  } finally { rmSync(temp, { recursive: true, force: true }); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 4 || !args.includes('--base') || !args.includes('--limit')) throw new Error('Usage: npm run check:pr -- --base <preceding-branch> --limit <selected-limit>');
    const result = measureLayer({ base: args[args.indexOf('--base') + 1], limit: Number(args[args.indexOf('--limit') + 1]) });
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = result.passed ? 0 : 1;
  } catch (error) { console.error(error.message); process.exitCode = 2; }
}
