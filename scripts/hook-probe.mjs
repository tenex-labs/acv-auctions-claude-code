import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const file='src/server/hook-probe.ts';
if(fs.existsSync(file))throw Error('Probe file already exists; nothing changed');
const results=[];
function probe(name,content,expected,target=file){
 if(content!==null)fs.writeFileSync(file,content);
 const started=Date.now();
 const run=spawnSync(process.execPath,['.claude/hooks/check-change.mjs'],{
  input:JSON.stringify({hook_event_name:'PostToolUse',tool_name:'Edit',tool_input:{file_path:target}}),
  encoding:'utf8',timeout:120000,
 });
 const row={name,expected,exit:run.status,milliseconds:Date.now()-started,stdout:run.stdout,stderr:run.stderr,error:run.error?.message};
 results.push(row);console.log(`${name}: exit ${run.status} (expected ${expected})`);
 if(run.status!==expected)process.exitCode=1;
}
try{
 probe('healthy','export const healthy: number = 1;\n',0);
 probe('type error','const broken: number = "text";\nexport {};\n',2);
 probe('500 lines',Array(500).fill('// counted').join('\n')+'\n',0);
 probe('501 lines',Array(501).fill('// counted').join('\n')+'\n',2);
 fs.unlinkSync(file);
 probe('prose edit',null,0,'workshop/EVALUATION.md');
}finally{
 if(fs.existsSync(file))fs.unlinkSync(file);
 fs.mkdirSync('.check-output/hook',{recursive:true});
 fs.writeFileSync('.check-output/hook/probe.json',JSON.stringify(results,null,2)+'\n');
}
console.log('Direct probes only. Observe a matching edit separately in a Claude session.');
