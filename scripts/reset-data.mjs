import fs from 'node:fs';
import path from 'node:path';
const root=fs.realpathSync(process.cwd()), target=path.resolve(process.env.INSPECTION_DESK_DATA_DIR||'.data'), fixtures=path.resolve(process.env.INSPECTION_DESK_FIXTURE_DIR||'data');
if(target===root||target===path.parse(target).root||root.startsWith(target+path.sep)||fixtures===target||fixtures.startsWith(target+path.sep)||fs.existsSync(target)&&fs.lstatSync(target).isSymbolicLink())throw Error('Refusing to remove the project, fixtures, an ancestor, or a linked directory.');
fs.rmSync(target,{recursive:true,force:true}); console.log(`Reset follow-up data: ${target}`);
