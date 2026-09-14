import { mkdtempSync, mkdirSync, cpSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { checkFinalDocuments, checkFinalDocument, wordCount } from '../../scripts/lib/evidence.mjs';
const app=path.resolve(import.meta.dirname,'../..');
let root:string;
beforeEach(()=>{root=mkdtempSync(path.join(os.tmpdir(),'idesk-final-docs-'));});
afterEach(()=>rmSync(root,{recursive:true,force:true}));
function put(file:string,text:string){mkdirSync(path.dirname(path.join(root,file)),{recursive:true});writeFileSync(path.join(root,file),text);}
function completeDocuments(){
  for(const file of ['workshop/INVESTIGATION.md','SPEC.md','PLAN.md','workshop/EVALUATION.md','workshop/FINAL.md']){
    const original=readFileSync(path.join(app,file),'utf8');
    const text=original.replace(/<!--[\s\S]*?-->/g,'Synthetic source checked; specific limitation recorded.').replace(/\| AC-(0[1-6]) \| \| \| \|/g,'| AC-$1 | A | source.ts | Direct check |');
    put(file,text);
  }
  for(const file of ['CLAUDE.md','.claude/rules/report-generation.md','.claude/agents/service-contract.md','.claude/agents/behavior-test.md','.claude/skills/workshop-review/SKILL.md','.claude/skills/workshop-review/INITIAL.md'])put(file,'Synthetic instructions.\n');
  put('tests/participant/retry.spec.ts','// Synthetic file for document validation only.\n');
  put('tests/participant/assessment.json',JSON.stringify({version:2,tests:[{file:'tests/participant/retry.spec.ts',title:'synthetic server test',fault:'retry-status',assertionLine:1}]}));
}
describe('one final public document check',()=>{
  it('requires completed public artifacts without a future commit ID or private result file',()=>{
    completeDocuments();expect(checkFinalDocuments(root)).toEqual([]);
    expect(readFileSync(path.join(root,'workshop/FINAL.md'),'utf8')).not.toMatch(/[a-f0-9]{40}/);
  });
  it('rejects unfilled templates, oversized prose and a missing new server test',()=>{
    completeDocuments();put('workshop/INVESTIGATION.md',readFileSync(path.join(app,'workshop/INVESTIGATION.md'),'utf8'));
    expect(checkFinalDocuments(root).some(x=>x.includes('fill'))).toBe(true);
    put('workshop/FINAL.md','word '.repeat(301));expect(checkFinalDocument(root,'workshop/FINAL.md').some(x=>x.includes('300-word'))).toBe(true);
    rmSync(path.join(root,'tests/participant/retry.spec.ts'));expect(checkFinalDocuments(root).some(x=>x.includes('new participant file'))).toBe(true);
  });
  it('excludes evaluation result-table rows while still counting headings and ordinary prose',()=>{
    completeDocuments();const file='workshop/EVALUATION.md';put(file,readFileSync(path.join(root,file),'utf8')+'\n| case | '+ 'result '.repeat(600)+'|\n');
    expect(checkFinalDocument(root,file)).toEqual([]);
    put(file,readFileSync(path.join(root,file),'utf8')+'\n'+'prose '.repeat(501));
    expect(checkFinalDocument(root,file).some(x=>x.includes('500-word'))).toBe(true);
    expect(wordCount('# Heading\n<!-- omitted -->\nA checked result.')).toBe(4);
  });
  it('executes the evidence stage before any private check report exists',()=>{
    completeDocuments();cpSync(path.join(app,'scripts'),path.join(root,'scripts'),{recursive:true});
    const run=spawnSync(process.execPath,['scripts/check.mjs','--stage','evidence'],{cwd:root,encoding:'utf8'});
    expect(run.status,run.stdout+run.stderr).toBe(0);
    const result=JSON.parse(readFileSync(path.join(root,'.check-output/evidence/result.json'),'utf8'));
    expect(result.contractVersion).toBe('inspection-desk-3.0');expect(result.requiredPassed).toBe(1);expect(result.checks[0].id).toBe('DOC-FINAL');
  });
});
