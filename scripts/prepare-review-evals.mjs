import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { measureLayer } from './check-pr.mjs';

// Create isolated Git fixtures. Never alter the learner's working tree or index.
const args = process.argv.slice(2);
const option = name => args[args.indexOf(name) + 1];
if (args.length !== 6 || !['--limit','--criteria','--out'].every(name => args.includes(name))) {
  throw new Error('Usage: node scripts/prepare-review-evals.mjs --limit <selected-limit> --criteria workshop/review-criteria.md --out workshop/review-cases');
}
const limit = Number(option('--limit'));
if (!Number.isSafeInteger(limit) || limit < 1 || limit > 1000000) throw new Error('Choose a positive integer up to 1,000,000 for these disposable fixtures. This technical fixture bound is not a PR policy.');
const criteria = readFileSync(resolve(option('--criteria')), 'utf8');
const destination = resolve(option('--out'));
for (const name of ['at-limit.md','above-limit.md','size-results.json']) {
  if (existsSync(join(destination, name))) throw new Error(`Preserve the existing run: ${name} already exists. Choose a new output folder.`);
}
const temp = mkdtempSync(join(tmpdir(), 'inspection-review-evals-'));
try {
  const git = args => execFileSync('git', args, {cwd:temp,encoding:'utf8',stdio:['ignore','pipe','pipe']});
  git(['init','-b','main']);
  git(['-c','user.name=Workshop fixture','-c','user.email=fixture@example.invalid','commit','--allow-empty','-m','Prepared baseline']);
  git(['switch','-c','review-layer']);
  const results = [];
  mkdirSync(destination, {recursive:true});
  for (const [name,count] of [['at-limit',limit],['above-limit',limit+1]]) {
    writeFileSync(join(temp,'proposed.txt'), Array.from({length:count},(_,i)=>`Line ${i+1}\n`).join(''));
    const result = measureLayer({cwd:temp,base:'main',limit});
    if (result.changedLines !== count || result.passed !== (count<=limit)) throw new Error('Fixture check did not produce the intended boundary result.');
    results.push({case:name,...result});
    writeFileSync(join(destination,`${name}.md`), `# Review this proposed layer\n\n## Agreed review criteria\n\n${criteria}\n\n## Scope\n\nAssess the line-count criterion from the supplied record. The explicit selected limit for this fixture is ${limit}; flag any conflict with the criteria document. Other criteria need their own evidence. Do not infer behavior or review coherence from line count alone.\n\n## Observed fixture check\n\nThe packet generator ran the project's measureLayer function in a disposable Git repository. The proposed change is one new text file, with no excluded generated files or binary changes. It compared the complete proposed layer on review-layer with main. This record is supplied evidence for the read-only reviewer, not a command executed by that reviewer.\n\n\`\`\`json\n${JSON.stringify(result,null,2)}\n\`\`\`\n\nReturn the supported decision, cite the count, limit and base, and state what remains unverified. Do not edit or execute commands.\n`);
  }
  writeFileSync(join(destination,'size-results.json'),JSON.stringify(results,null,2)+'\n');
  console.log(JSON.stringify({destination,cases:results.map(r=>({case:r.case,changedLines:r.changedLines,limit:r.limit,passed:r.passed}))},null,2));
} finally { rmSync(temp,{recursive:true,force:true}); }
