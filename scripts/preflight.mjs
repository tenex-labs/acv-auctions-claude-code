import fs from 'node:fs';
if(process.versions.node!=='24.21.0') { console.error(`Node ${process.version} found; use v24.21.0.`); process.exit(1); }
try { const {chromium}=await import('@playwright/test'); if(!fs.existsSync(chromium.executablePath()))throw Error('Chromium missing'); await import('next/package.json',{with:{type:'json'}}); console.log('OK: Node v24.21.0, dependencies installed, Chromium present.'); } catch(error) { console.error(`${error.message}. Run npm run setup.`);process.exit(1); }
