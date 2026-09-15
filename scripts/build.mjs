import {spawnSync} from 'node:child_process';
process.env.NEXT_TELEMETRY_DISABLED='1';
const result=spawnSync(process.execPath,['node_modules/next/dist/bin/next','build'],{stdio:'inherit',env:process.env});
process.exitCode=result.status??1;
