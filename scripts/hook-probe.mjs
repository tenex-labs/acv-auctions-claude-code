import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const file='src/server/hook-probe.ts';if(fs.existsSync(file))throw Error('Probe file already exists');
function probe(name,content,event='PostToolUse',target=file){if(content!==null)fs.writeFileSync(file,content);const r=spawnSync(process.execPath,['.claude/hooks/check-change.mjs'],{input:JSON.stringify({hook_event_name:event,tool_name:'Edit',tool_input:{file_path:target}}),encoding:'utf8'});console.log(`${name}: exit ${r.status}`);return r.status;}
try{const results=[probe('healthy','export const healthy: number = 1;\n'),probe('type error','const broken: number = "text";\nexport {};\n'),probe('501 lines',Array(501).fill('// counted').join('\n')+'\n')];fs.unlinkSync(file);results.push(probe('prose edit',null,'PostToolUse','workshop/EVALUATION.md'));if(JSON.stringify(results)!=='[0,2,2,0]')process.exitCode=1;}finally{if(fs.existsSync(file))fs.unlinkSync(file);}
console.log('These direct probes do not establish that a hook ran in a Claude session.');
