import { spawnSync } from 'node:child_process';
if(process.versions.node!=='24.21.0') { console.error('Use Node 24.21.0 (see .node-version).'); process.exit(1); }
for(const args of [['ci','--ignore-scripts'],['exec','--','playwright','install','chromium']]) {
 const run=spawnSync(process.platform==='win32'?'npm.cmd':'npm',args,{stdio:'inherit'});if(run.status!==0)process.exit(run.status||1);
}
