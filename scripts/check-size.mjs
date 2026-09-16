import { sourceFiles } from './files.mjs';
import { checkSize } from './shared/size.mjs';
try { const result=checkSize(sourceFiles()); for(const f of result.violations) console.error(`${f.path}: ${f.lines} lines; maximum 500`); console.log(`${result.files.length} source files checked; maximum 500 lines each.`); process.exitCode=result.passed?0:1; } catch(error) { console.error(error.message); process.exitCode=1; }
