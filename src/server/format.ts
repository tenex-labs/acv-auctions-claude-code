import type { Severity, Vehicle } from '../shared/types';
export const formatMiles = (value: number) => `${new Intl.NumberFormat('en-US').format(value)} mi`;
export const formatUtcDate = (iso: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
export const severityLabel = (value: Severity) => value[0].toUpperCase() + value.slice(1);
export const vehicleTitle = (vehicle: Vehicle) => `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
