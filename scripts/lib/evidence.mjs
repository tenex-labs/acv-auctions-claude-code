/**
 * Public document checks used by scripts/check.mjs.
 * Pure functions over a project root so they can be unit-tested against temporary directories.
 *
 * These checks are diagnostics of document shape and internal consistency. They cannot judge whether a
 * specification, plan or decision is good; that is assessed from the evidence by a person or a validated grader.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export const ALL_AC = ['AC-01', 'AC-02', 'AC-03', 'AC-04', 'AC-05', 'AC-06'];
// Unfilled outline values: empty, an HTML comment, a bare dash, or the usual TODO markers.
export const PLACEHOLDER = /^(?:<[^>]*>|\(fill in\)|TODO|TBD|_?not filled_?|—|-)?$/i;

// Count whitespace-separated tokens containing a letter or number; headings count, markup alone does not.
export function wordCount(markdown) {
  return markdown.replace(/<!--[\s\S]*?-->/g, '').split(/\s+/).filter(word=>/[\p{L}\p{N}]/u.test(word)).length;
}
export function wordLimit(text,maximum,label) {
  const count=wordCount(text);return count>maximum ? [`${label}: ${count} words exceeds the ${maximum}-word limit. Attach command output separately.`] : [];
}

export function readDoc(root, name) {
  const file = path.join(root, name);
  if (!existsSync(file)) throw new Error(`${name} is missing`);
  return readFileSync(file, 'utf8');
}

export function section(markdown, heading) {
  const lines = markdown.split('\n');
  const start = lines.findIndex((line) => /^##\s+/.test(line) && line.replace(/^##\s+/, '').trim().startsWith(heading));
  if (start < 0) return null;
  const end = lines.findIndex((line, index) => index > start && /^##\s+/.test(line));
  return lines.slice(start + 1, end < 0 ? undefined : end).join('\n');
}

export function checkSpec(root) {
  const text = readDoc(root, 'SPEC.md');
  const problems = wordLimit(text,500,'SPEC.md');
  for (const heading of ['Problem and evidence', 'Intended behavior', 'Failure cases', 'Constraints', 'Acceptance criteria', 'Scope', 'Open decisions']) {
    const body = section(text, heading);
    if (body === null) problems.push(`SPEC.md: missing "## ${heading}" section`);
    else if (body.replace(/<!--[\s\S]*?-->/g, '').trim().length < 20) problems.push(`SPEC.md: "## ${heading}" is empty`);
  }
  const acceptance = section(text, 'Acceptance criteria') ?? '';
  const rows = [...acceptance.matchAll(/^\|\s*(AC-0[1-6])\s*\|/gm)].map((m) => m[1]);
  for (const id of ALL_AC) {
    const count = rows.filter((row) => row === id).length;
    if (count === 0) problems.push(`SPEC.md: acceptance table has no row for ${id}`);
    if (count > 1) problems.push(`SPEC.md: acceptance ID ${id} appears ${count} times; IDs must be unique`);
  }
  const acceptanceLines = acceptance.split('\n').filter((line) => /^\|\s*AC-0[1-6]\s*\|/.test(line));
  for (const line of acceptanceLines) {
    const cells = line.split('|').map((cell) => cell.trim()).filter((_, index, all) => index > 0 && index < all.length - 1);
    if (cells.length < 4) problems.push(`SPEC.md: row "${cells[0]}" needs example, expected result and planned check columns`);
    else if (cells.slice(1).some((cell) => cell.length === 0 || PLACEHOLDER.test(cell))) problems.push(`SPEC.md: row "${cells[0]}" has an unfilled cell`);
  }
  return problems;
}

// V3 checks public artifacts only. Private execution results are captured separately and bound by the trainer.
// Shape and length are requirements, not evidence of understanding or readiness.
const FINAL_DOCS = {
  'workshop/INVESTIGATION.md': [200, ['Product and current behavior', 'Instructions and checked sources', 'Model and decision']],
  'PLAN.md': [400, ['Increment A', 'Increment B', 'Agent assignments', 'Verified findings and synthesis', 'Acceptance mapping', 'Change estimate', 'Alternatives and limits']],
  'workshop/EVALUATION.md': [500, ['Regression test', 'Review skill comparison', 'Instruction decision', 'Hook and completion', 'Limits']],
  'workshop/FINAL.md': [300, ['Scope and readiness', 'Review findings and decisions', 'Reuse the review skill', 'Verification and remaining work']],
};

export function checkFinalDocument(root, file) {
  if (!existsSync(path.join(root, file))) return [`${file} is missing`];
  const text = readDoc(root, file);
  if (file === 'SPEC.md') return checkSpec(root);
  const definition = FINAL_DOCS[file];
  if (!definition) return [`Unknown final document: ${file}`];
  const [maximum, headings] = definition;
  const prose = file === 'workshop/EVALUATION.md' ? text.split('\n').filter(line => !/^\s*\|.*\|\s*$/.test(line)).join('\n') : text;
  const problems = wordLimit(prose, maximum, file);
  for (const heading of headings) {
    const body = section(text, heading)?.replace(/<!--[\s\S]*?-->/g, '').trim();
    if (!body || wordCount(body) < 3 || PLACEHOLDER.test(body)) problems.push(`${file}: fill "## ${heading}" with your evidence or a specific limitation.`);
  }
  if (file === 'PLAN.md') {
    const mapping = section(text, 'Acceptance mapping') ?? '';
    for (const id of ALL_AC) {
      const rows = mapping.split('\n').filter(line => new RegExp(`^\\|\\s*${id}\\s*\\|`).test(line));
      const cells = (rows[0] ?? '').split('|').slice(1,-1).map(x=>x.trim());
      if (rows.length !== 1 || cells.length < 4 || cells.some(x=>!x || PLACEHOLDER.test(x))) problems.push(`PLAN.md: ${id} needs one filled increment / files / check row.`);
    }
  }
  return problems;
}

export function checkFinalDocuments(root) {
  const problems = ['workshop/INVESTIGATION.md','SPEC.md','PLAN.md','workshop/EVALUATION.md','workshop/FINAL.md'].flatMap(file => checkFinalDocument(root,file));
  for (const file of ['CLAUDE.md','.claude/rules/report-generation.md','.claude/agents/service-contract.md','.claude/agents/behavior-test.md','.claude/skills/workshop-review/SKILL.md','.claude/skills/workshop-review/INITIAL.md']) {
    if (!existsSync(path.join(root,file)) || !readDoc(root,file).trim()) problems.push(`${file} is missing or empty.`);
  }
  try {
    const selection=JSON.parse(readDoc(root,'tests/participant/assessment.json'));
    if(selection.version!==2 || !Array.isArray(selection.tests) || selection.tests.length<1 || selection.tests.length>3 || !selection.tests.some(t=>t.fault==='retry-status')) problems.push('Select 1–3 participant tests using assessment.json version 2, including the retry-status server regression.');
    else for(const test of selection.tests) {
      if(!/^tests\/participant\/[a-zA-Z0-9_./-]+\.spec\.ts$/.test(test.file) || test.file.split('/').includes('..') || !existsSync(path.join(root,test.file)) || !test.title?.trim() || !['retry-status','stuck-recovery','stale-error'].includes(test.fault) || !Number.isSafeInteger(test.assertionLine) || test.assertionLine<1) problems.push('Each selected test needs a new participant file, exact title, published fault and assertion line.');
      else if(test.assertionLine>readDoc(root,test.file).split('\n').length) problems.push(`Selected assertion is outside ${test.file}.`);
    }
  } catch { problems.push('Add tests/participant/assessment.json with your selected server regression test.'); }
  return problems;
}
