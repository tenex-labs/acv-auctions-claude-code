import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, readFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { measureLayer } from './check-pr.mjs';

test('counts full layers, limits, new/generated files and dirty work without changing the index', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'pr-counter-test-'));
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  const write = (name, text) => writeFileSync(join(cwd, name), text);
  try {
    git('init', '-b', 'main'); git('config', 'user.name', 'Workshop check'); git('config', 'user.email', 'test@example.invalid');
    write('source.ts', 'one\ntwo\n'); write('.gitignore', 'ignored/\n'); git('add', '.'); git('commit', '-m', 'base');
    git('switch', '-c', 'storage'); write('new.ts', 'a\nb\n'); git('add', '.'); git('commit', '-m', 'two additions');
    assert.equal(measureLayer({ cwd, base: 'main', limit: 2 }).passed, true, 'selected limit passes');
    assert.equal(measureLayer({ cwd, base: 'main', limit: 1 }).passed, false, 'one above fails');
    git('switch', '-c', 'api'); write('generated.txt', 'generated\n'); git('add', '.'); git('commit', '-m', 'generated text');
    assert.equal(measureLayer({ cwd, base: 'storage', limit: 1 }).changedLines, 1, 'preceding branch isolates layer');
    assert.equal(measureLayer({ cwd, base: 'main', limit: 2 }).changedLines, 3, 'earlier base includes previous commits');
    write('source.ts', 'one\n'); git('add', 'source.ts');
    write('untracked.ts', 'fresh\n'); write('new.ts', 'a\nb\nc\n');
    const before = readFileSync(join(cwd, '.git/index'));
    const result = measureLayer({ cwd, base: 'storage', limit: 4 });
    assert.deepEqual([result.additions, result.deletions, result.changedLines, result.passed], [3, 1, 4, true]);
    assert.deepEqual(readFileSync(join(cwd, '.git/index')), before, 'real index remains byte-identical');
    assert.ok(result.files.find(f => f.path === 'untracked.ts'));
    assert.equal(measureLayer({ cwd, base: 'storage', limit: 3 }).passed, false);
    mkdirSync(join(cwd, 'ignored')); write('ignored/intended.ts', 'explicitly proposed\n');
    git('add', '-f', 'ignored/intended.ts');
    const stagedIgnoredIndex = readFileSync(join(cwd, '.git/index'));
    const withIgnored = measureLayer({ cwd, base: 'storage', limit: 5 });
    assert.equal(withIgnored.changedLines, 5, 'explicitly staged ignored new files count');
    assert.ok(withIgnored.files.find(f => f.path === 'ignored/intended.ts'));
    assert.deepEqual(readFileSync(join(cwd, '.git/index')), stagedIgnoredIndex);
    git('branch', 'not-an-ancestor', 'api'); git('switch', '--detach', 'storage');
    assert.throws(() => measureLayer({ cwd, base: 'not-an-ancestor', limit: 10 }), /not an ancestor/);
    assert.throws(() => measureLayer({ cwd, base: 'missing', limit: 10 }));
    assert.throws(() => measureLayer({ cwd, base: 'main', limit: 0 }), /positive/);
  } finally { rmSync(cwd, { recursive: true, force: true }); }
});
