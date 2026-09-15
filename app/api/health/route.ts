import { fixtureDir, dataDir } from '@/src/server/env';
export const dynamic = 'force-dynamic';
export function GET() { return Response.json({ status: 'ok', contractVersion: 'inspection-desk-2task-1.1', fixtureDir, dataDir }); }
