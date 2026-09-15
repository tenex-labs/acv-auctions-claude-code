import {test,expect} from 'vitest';
import {formatMiles,formatUtcDate,severityLabel} from '../../src/server/format';
import {readVehicles,readInspections,findInspection,readRecordedReport} from '../../src/server/records';
import {validId} from '../../src/server/http';
test('prepared formatting preserves UTC boundary and thousands',()=>{expect(formatMiles(9850)).toBe('9,850 mi');expect(formatUtcDate('2026-09-02T02:30:00.000Z')).toBe('Sep 2, 2026');expect(severityLabel('major')).toBe('Major');});
test('prepared readers load empty and older-revision records',()=>{expect(readVehicles()).toHaveLength(8);expect(readInspections()).toHaveLength(7);expect(findInspection('insp-003')?.findings).toEqual([]);expect(readRecordedReport('RPT-004-R1')?.inspectionRevision).toBe(1);expect(readRecordedReport('RPT-006-R1')).toBeUndefined();});
test('record identifiers cannot address another path',()=>{expect(()=>validId('../etc/passwd')).toThrow();expect(()=>validId('')).toThrow();});
