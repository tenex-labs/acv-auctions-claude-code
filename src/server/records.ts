import fs from 'node:fs';
import path from 'node:path';
import { fixtureDir } from './env';
import { validId } from './http';
import type { Vehicle, Inspection, Report } from '../shared/types';
let cached: { vehicles: Vehicle[]; inspections: Inspection[] } | undefined;
function load() {
  if (cached) return cached;
  const vehicles: Vehicle[] = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'vehicles.json'), 'utf8'));
  const inspections: Inspection[] = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'inspections.json'), 'utf8'));
  if (!Array.isArray(vehicles) || !Array.isArray(inspections)) throw new Error('Expected record arrays.');
  for (const v of vehicles) {
    validId(v.id);
    if (![v.stockNumber, v.make, v.model, v.exteriorColor].every(x => typeof x === 'string') || !Number.isFinite(v.mileage) || !Number.isInteger(v.year)) throw new Error('Invalid vehicle.');
  }
  for (const i of inspections) {
    validId(i.id); validId(i.vehicleId);
    if (!Number.isInteger(i.revision) || !Number.isFinite(Date.parse(i.inspectedAt)) || !Array.isArray(i.findings)) throw new Error('Invalid inspection.');
    for (const f of i.findings) if (!['major','minor','info'].includes(f.severity) || typeof f.description !== 'string' || typeof f.area !== 'string') throw new Error('Invalid finding.'); else validId(f.id);
  }
  cached = { vehicles, inspections }; return cached;
}
export const readVehicles = () => load().vehicles;
export const readInspections = () => load().inspections;
export const findVehicle = (id: string) => readVehicles().find(v => v.id === validId(id));
export const findInspection = (id: string) => readInspections().find(i => i.id === validId(id));
export function readRecordedReport(id: string): Report | undefined {
  const file = path.join(fixtureDir, 'reports', `${validId(id)}.json`);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : undefined;
}
