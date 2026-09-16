export type Severity = 'major' | 'minor' | 'info';
export interface Vehicle { id: string; stockNumber: string; year: number; make: string; model: string; mileage: number; exteriorColor: string }
export interface Finding { id: string; area: string; severity: Severity; description: string }
export interface Inspection { id: string; vehicleId: string; revision: number; inspectedAt: string; inspectorLabel: string; findings: Finding[] }
export interface Summary { severityCounts: Record<Severity, number>; needsAttention: boolean }
export interface Report extends Summary { id: string; inspectionId: string; inspectionRevision: number; vehicle: Vehicle; inspectedAt: string; inspectorLabel: string; findings: Finding[] }
export interface ApiError { error: { code: string; message: string } }
