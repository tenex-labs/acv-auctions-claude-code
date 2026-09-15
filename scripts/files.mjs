import fs from 'node:fs';
import path from 'node:path';
import { excluded } from './shared/package.mjs';
import { isCountedPath } from './shared/size.mjs';
export function sourceFiles(root=process.cwd(), dir=root) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    const full=path.join(dir,e.name), name=path.relative(root,full).split(path.sep).join('/');
    if(excluded(name)||e.isSymbolicLink()) return [];
    if(e.isDirectory()) return sourceFiles(root,full);
    return isCountedPath(name)?[{path:name,content:fs.readFileSync(full)}]:[];
  });
}
