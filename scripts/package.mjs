import fs from 'node:fs';
import path from 'node:path';
import {createPackage,sha256} from './shared/package.mjs';
import {writeZip} from './shared/archive.mjs';
const recovery=process.argv.includes('--recovery');
try {
 const result=await createPackage(process.cwd());
 let bytes=result.bytes, target='submission.zip';
 if(recovery) {
  const records=[]; const data=path.resolve(process.env.INSPECTION_DESK_DATA_DIR||'.data');
  function read(dir) { if(!fs.existsSync(dir))return;for(const e of fs.readdirSync(dir,{withFileTypes:true})) {const full=path.join(dir,e.name);if(e.isSymbolicLink())throw Error('Recovery cannot include linked state');if(e.isDirectory())read(full);else records.push({path:'.data/'+path.relative(data,full).split(path.sep).join('/'),content:fs.readFileSync(full)});}}
  read(data);
  bytes=writeZip([...result.files,...records,{path:'submission-manifest.json',content:Buffer.from(JSON.stringify(result.manifest,null,2))}]);
  fs.mkdirSync('.workshop-private/recovery',{recursive:true});
  target=`.workshop-private/recovery/${new Date().toISOString().replace(/[:.]/g,'-')}-${crypto.randomUUID().slice(0,8)}-submission.zip`;
 }
 fs.writeFileSync(target,bytes,{flag:recovery?'wx':'w'});
 console.log(JSON.stringify({file:target,fileCount:result.manifest.fileCount,packageHash:result.packageHash,zipSha256:sha256(bytes),bytes:bytes.length,warnings:result.warnings},null,2));
} catch(error) {console.error(error.message);process.exitCode=1;}
