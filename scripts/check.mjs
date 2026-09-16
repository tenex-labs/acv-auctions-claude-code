import {spawn,spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
const mode=process.argv[2],task=process.argv[3],pattern=process.argv.slice(4).join(' ');
const npm=process.platform==='win32'?'npm.cmd':'npm';
function run(args) {const r=spawnSync(npm,args,{stdio:'inherit',env:process.env});if(r.status!==0)throw Error(`Command failed: npm ${args.join(' ')}`);}
const nap=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function server() {
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'inspection-desk-check-'));
 const port=Number(process.env.INSPECTION_DESK_CHECK_PORT||4310);
 await new Promise((resolve,reject)=>{const s=net.createServer();s.once('error',()=>reject(Error(`Port ${port} is in use; stop the other server or set INSPECTION_DESK_CHECK_PORT.`)));s.listen(port,'127.0.0.1',()=>s.close(resolve));});
 process.env.INSPECTION_DESK_BASE_URL=`http://127.0.0.1:${port}`;
 const child=spawn(npm,['run','start'],{stdio:'inherit',detached:process.platform!=='win32',env:{...process.env,PORT:String(port),INSPECTION_DESK_DATA_DIR:dir,NEXT_TELEMETRY_DISABLED:'1',TZ:'UTC'}});
 async function stop() {if(child.exitCode===null){try{process.kill(-child.pid,'SIGTERM');}catch{child.kill('SIGTERM');}await Promise.race([new Promise(r=>child.once('exit',r)),nap(10000)]);if(child.exitCode===null)try{process.kill(-child.pid,'SIGKILL');}catch{child.kill('SIGKILL');}}fs.rmSync(dir,{recursive:true,force:true});}
 for(let i=0;i<180;i++){if(child.exitCode!==null){await stop();throw Error('Application exited before health check');}try{if((await fetch(process.env.INSPECTION_DESK_BASE_URL+'/api/health')).ok)return stop;}catch{}await nap(500);}
 await stop();throw Error('Application did not become healthy within 90 seconds');
}
let stop;
try {
 if (['check:task2','check','test','test:e2e'].includes(mode) || (mode==='check:increment' && task==='task2')) {
  if (!fs.existsSync('docs/COMPARISON-CONTRACT.md')) throw Error('Part 2 requirements are not installed. Ask the product questions, then follow the Comparison requirements pack instructions in Build.');
 }
 if(mode==='check:increment'&&(!['task1','task2'].includes(task)||!pattern))throw Error('Usage: npm run check:increment -- <task1|task2> <test-name-pattern>');
 if(['check:foundation','check:task1','check'].includes(mode)) {for(const script of ['preflight','typecheck','check:size','test:unit'])run(['run',script]);}
 if(mode!=='check:foundation') {
  run(['run','build']); stop=await server();
  const api=(t,p)=>run(['exec','--','vitest','run',`tests/api/${t}`,...(p?['-t',p]:[])]);
  const browser=(t,p)=>run(['exec','--','playwright','test',`tests/e2e/${t}`,...(p?['--grep',p]:[])]);
  if(mode==='check:increment') {const paths=['api','e2e'].filter(type=>fs.existsSync(`tests/${type}/${task}`));let selected=false;for(const type of paths){const names=fs.readdirSync(`tests/${type}/${task}`).map(n=>fs.readFileSync(`tests/${type}/${task}/${n}`,'utf8')).join('\n');const titles=[...names.matchAll(/(?:test|it)\s*\(\s*(['"`])([^'"`]+)\1/g)].map(m=>m[2]);if(titles.some(title=>new RegExp(pattern).test(title))){selected=true;(type==='api'?api:browser)(task,pattern);}}if(!selected)throw Error('No checks match the supplied pattern.');}
  else if(mode==='check:task1'||mode==='check:task2') {const t=mode.split(':')[1];api(t);browser(t);}
  else if(mode==='test') {run(['run','test:unit']);api('');}
  else if(mode==='test:e2e')browser('');
  else if(mode==='check') {api('');browser('');await stop();stop=await server();run(['run','test:participant']);}
  else throw Error('Unknown check mode');
  if (mode==='check:task2' || mode==='check') run(['exec','--','node','scripts/comparison-restart.mjs']);
 }
} catch(error) {console.error(error.message);process.exitCode=1;} finally {if(stop)await stop();}
