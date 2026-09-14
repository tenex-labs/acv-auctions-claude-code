import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const COUNTING_VERSION = 'changed-code-3.0';
export const CODE_LIMIT = 500;

// Fixed release rules. Unknown text files count as code so moving a helper cannot hide it.
export function classifyPath(file) {
  if (/(^|\/)(dist|build|node_modules|\.next|coverage)(\/|$)|\.(?:min\.[cm]?js|map)$/.test(file)) return 'generated';
  if (/^(?:\.workshop-private\/|session-export)|\.session\.(?:txt|jsonl)$/.test(file)) return 'generated';
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
  const uncountable = files.filter((f) => f.binary).map((f) => f.path);
  const generated = files.filter((f) => f.category === 'generated').map((f) => f.path);
  const countedCodeLines = total(['code', 'tests', 'generated']);
  return { countingVersion: COUNTING_VERSION, limit: CODE_LIMIT, countedCodeLines,
    applicationLines: total(['code']), testLines: total(['tests']), documentationLines: total(['documentation']), evidenceLines: total(['evidence']),
    uncountable, generated, withinLimit: uncountable.length === 0 && generated.length === 0 && countedCodeLines <= CODE_LIMIT, files };
}

/** Frontmatter and fenced examples count as code/configuration. Inline prose commands do not.
 * Raw HTML is counted in full; changing an extension cannot exempt executable content.
 */
export function instructionCode(text) {
  const lines = text.split('\n');
  if (/<(?:script|style|html)\b|\bon\w+\s*=|javascript:/i.test(text)) return text;
  const output = [];
  let fence = null, frontmatter = lines[0] === '---';
  for (let i=0;i<lines.length;i++) {
    const line=lines[i];
    if (frontmatter) {
      output.push(line);
      if (i>0 && /^---\s*$/.test(line)) frontmatter=false;
      continue;
    }
    if (fence) {
      output.push(line);
      if (new RegExp(`^ {0,3}${fence[0]}{${fence.length},}\\s*$`).test(line)) fence=null;
    } else {
      const open=/^ {0,3}(`{3,}|~{3,})/.exec(line);
      if(open){fence=open[1];output.push(line);}
    }
  }
  return output.length ? output.join('\n')+'\n' : '';
}

export function countCommitChanges(repo, base, head = 'HEAD') {
  for (const revision of [base, head]) {
    if (!/^(?:[a-f0-9]{40}|HEAD)$/.test(revision)) throw new Error('Use a full commit ID or HEAD.');
  }
  const result = spawnSync('git', ['-c', 'core.attributesFile=/dev/null', 'diff', '--numstat', '-z', '--no-renames', '--no-ext-diff', '--no-textconv', '--diff-algorithm=myers', '--no-indent-heuristic', base, head, '--'],
    { cwd: repo, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, timeout: 15000 });
  if (result.status !== 0) throw new Error('Cannot compare these commits. Fetch the frozen starter and push the code before submitting.');
  const report = parseChangedCode(result.stdout);
  const temporary=mkdtempSync(path.join(os.tmpdir(),'inspection-instruction-diff-'));
  try {
    for(const file of report.files.filter(f=>f.category==='documentation'&&!f.binary)) {
      const before=spawnSync('git',['show',`${base}:${file.path}`],{cwd:repo,encoding:'utf8',maxBuffer:8*1024*1024});
      const after=spawnSync('git',['show',`${head}:${file.path}`],{cwd:repo,encoding:'utf8',maxBuffer:8*1024*1024});
      // A deleted/new file has no content on one side. Any other read error is unresolved.
      if ((before.status!==0 && file.deletions!==0) || (after.status!==0 && file.additions!==0)) throw new Error(`Cannot read instruction changes: ${file.path}`);
      const oldFile=path.join(temporary,'before'),newFile=path.join(temporary,'after');
      writeFileSync(oldFile,instructionCode(before.status===0?before.stdout:''));
      writeFileSync(newFile,instructionCode(after.status===0?after.stdout:''));
      const compared=spawnSync('git',['-c','core.attributesFile=/dev/null','diff','--no-index','--numstat','--no-ext-diff','--no-textconv','--diff-algorithm=myers','--no-indent-heuristic',oldFile,newFile],{encoding:'utf8',maxBuffer:8*1024*1024});
      if (![0,1].includes(compared.status)) throw new Error(`Cannot count instruction code: ${file.path}`);
      const match=/^(\d+)\t(\d+)\t/.exec(compared.stdout);
      file.instructionAdditions=match?Number(match[1]):0;
      file.instructionDeletions=match?Number(match[2]):0;
      report.countedCodeLines+=file.instructionAdditions+file.instructionDeletions;
      report.applicationLines+=file.instructionAdditions+file.instructionDeletions;
    }
    report.withinLimit=report.withinLimit&&report.countedCodeLines<=CODE_LIMIT;
    return {baseSha:base,headSha:head,...report};
  } finally {rmSync(temporary,{recursive:true,force:true});}
}
