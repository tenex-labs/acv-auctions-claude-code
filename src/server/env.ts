import path from 'node:path';
export const fixtureDir = path.resolve(process.env.INSPECTION_DESK_FIXTURE_DIR || 'data');
export const dataDir = path.resolve(process.env.INSPECTION_DESK_DATA_DIR || '.data');
