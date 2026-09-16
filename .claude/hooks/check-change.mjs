import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {isCountedPath} from '../../scripts/shared/size.mjs';
let payload;try{payload=JSON.parse(fs.readFileSync(0,'utf8'));}catch{process.exit(0);}
if(payload.hook_event_name!=='PostToolUse'||!['Edit','Write'].includes(payload.tool_name))process.exit(0);
const full=payload.tool_input?.file_path;if(typeof full!=='string')process.exit(0);
const name=path.relative(process.cwd(),path.resolve(full)).split(path.sep).join('/');
if(name.startsWith('../')||!isCountedPath(name))process.exit(0);
const log=[];let failed=false;
for(const script of ['typecheck','check:size']) {const r=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['run',script],{encoding:'utf8',timeout:50000});log.push(r.stdout||'',r.stderr||'');if(r.status!==0)failed=true;}
fs.mkdirSync('.check-output/hook',{recursive:true});fs.writeFileSync('.check-output/hook/last.log',log.join('\n'));
if(failed){console.error(log.join('\n')+'\nCheck failures: .check-output/hook/last.log');process.exit(2);}console.log('Type and size checks passed.');
