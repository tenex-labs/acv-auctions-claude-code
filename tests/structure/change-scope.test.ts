import { mkdtempSync, mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { describe, expect, test } from 'vitest';
import { classifyPath, countCommitChanges, parseChangedCode, instructionCode } from '../../scripts/lib/change-scope.mjs';

describe('published changed-code counter', () => {
  test('counts helpers, tests, styles, automation, comments and blank lines; separates documents', () => {
    const r = parseChangedCode('1\t1\tsrc/a.ts\0' + '5\t0\ttests/participant/a.spec.ts\0' + '2\t0\tworkshop/helper.js\0' + '3\t0\t.github/workflows/new.yml\0' + '1\t0\ttheme.css\0' + '80\t0\tSPEC.md\0');
    expect(r.countedCodeLines).toBe(13);
    expect(r.documentationLines).toBe(80);
    expect(classifyPath('workshop/helpers/code.json')).toBe('code');
  });
  test('includes all filename characters and refuses binary/generated code', () => {
    const r = parseChangedCode('1\t0\thelper\twith\nspaces.js\0-\t-\tsrc/opaque.bin\0');
    expect(r.files[0]!.path).toBe('helper\twith\nspaces.js');
    expect(r.withinLimit).toBe(false);
    expect(parseChangedCode('1\t0\tdist/bundle.js\0').withinLimit).toBe(false);
    expect(parseChangedCode('500\t0\tnew.js\0').withinLimit).toBe(true);
    expect(parseChangedCode('500\t1\tnew.js\0').withinLimit).toBe(false);
  });
  test('real git comparison treats renames as delete/add and includes blank/comment edits', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'idesk-scope-'));
    const git = (...args: string[]) => execFileSync('git', args, { cwd: dir, encoding: 'utf8' }).trim();
    try {
      git('init', '-q'); git('config', 'user.name', 'Scope test'); git('config', 'user.email', 'test@example.invalid');
      writeFileSync(path.join(dir, 'old.js'), 'one\ntwo\n');
      writeFileSync(path.join(dir, 'edit.js'), 'a\nb\n');
      git('add', '.'); git('commit', '-qm', 'base'); const base = git('rev-parse', 'HEAD');
      renameSync(path.join(dir, 'old.js'), path.join(dir, 'new.js'));
      writeFileSync(path.join(dir, 'edit.js'), 'a\n// b\n\n');
      mkdirSync(path.join(dir, 'workshop'));
      writeFileSync(path.join(dir, 'workshop/helper.js'), 'helper\n');
      git('add', '.'); git('commit', '-qm', 'change');
      const r = countCommitChanges(dir, base);
      expect(r.countedCodeLines).toBe(8); // move 4; replacement 3; helper 1
      expect(r.files.map((f: { path: string }) => f.path).sort()).toEqual(['edit.js','new.js','old.js','workshop/helper.js']);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });
});


test('counts fenced blocks and frontmatter, separates prose, and handles instruction renames', () => {
  expect(instructionCode('# Notes\nUse `npm test`.\n')).toBe('');
  expect(instructionCode('---\nmodel: inherit\n---\nProse.\n```sh\nnpm test\n```\n')).toBe('---\nmodel: inherit\n---\n```sh\nnpm test\n```\n');
  const dir=mkdtempSync(path.join(os.tmpdir(),'idesk-instruction-scope-'));
  const git=(...args:string[])=>execFileSync('git',args,{cwd:dir,encoding:'utf8'}).trim();
  try {
    git('init','-q');git('config','user.name','Scope test');git('config','user.email','test@example.invalid');
    writeFileSync(path.join(dir,'old.md'),'Prose.\n```js\nconst x = 1;\n```\n');
    git('add','.');git('commit','-qm','base');const base=git('rev-parse','HEAD');
    renameSync(path.join(dir,'old.md'),path.join(dir,'new.md'));
    writeFileSync(path.join(dir,'notes.md'),'Explanation and `inline command`.\n');
    git('add','.');git('commit','-qm','rename');
    const result=countCommitChanges(dir,base);expect(result.countedCodeLines).toBe(6);expect(result.countingVersion).toBe('changed-code-3.0');
    expect(result.files.find(f=>f.path==='new.md')?.instructionAdditions).toBe(3);
    expect(result.files.find(f=>f.path==='old.md')?.instructionDeletions).toBe(3);
  } finally {rmSync(dir,{recursive:true,force:true});}
});
