# Preservation contract — what the Next.js replacement must keep

September 15, 2026. Behavior contract 1.1 for the modernization walkthrough. Expected values below use the sample data. Implement the general rules so they also work for other records with the same shape. Selectors and endpoints: INTERFACE-CONTRACT.md.

## Startup

| ID | Behavior | Check |
| --- | --- | --- |
| PB-00 | `npm run build` succeeds; `npm run start` with `PORT`, `INSPECTION_DESK_FIXTURE_DIR`, `INSPECTION_DESK_DATA_DIR` set serves `GET /api/health` → 200 with `contractVersion` `inspection-desk-2task-1.1` and the two directories echoed. The process makes no outbound network request after setup. | HTTP |

## Vehicle discovery

| ID | Behavior | Expected on sample data | Check |
| --- | --- | --- | --- |
| PB-01 | Empty query lists every vehicle in saved order | `/` shows `Showing 8 of 8 vehicles`; rows veh-001 … veh-008 in that order; `GET /api/vehicles` `matched` 8, `total` 8 | browser + HTTP |
| PB-02 | Case-insensitive substring match on make and model | `q=honda` → veh-002, veh-005 (`Showing 2 of 8 vehicles`); `q=ESCAPE` → veh-003 | browser + HTTP |
| PB-03 | Substring match on stock number, and DF-01 fixed | `q=STK-2083` → veh-003, veh-004; `q=stk-20811` → veh-001 | HTTP + browser |
| PB-04 | Numeric mileage sort ascending | `sort=asc` → veh-003, veh-007, veh-001, veh-002, veh-005, veh-004, veh-006, veh-008 | browser (DOM order) + HTTP |
| PB-05 | Numeric mileage sort descending | `sort=desc` → reverse of PB-04 | browser + HTTP |
| PB-06 | Filter before sort; sort links keep the query | `q=ford&sort=desc` → veh-008, veh-003; `sort-asc` link on that page has `href` containing `q=ford` and `sort=asc` | browser |
| PB-07 | Row content | veh-001 row: `vehicle-name` `2021 Toyota RAV4`, `vehicle-stock` `STK-20811`, `vehicle-mileage` `42,310 mi`, `vehicle-color` `Silver`, link `Open inspection` → `/inspections/insp-001`; veh-005 row title `2019 HONDA Accord`; veh-003 mileage `9,850 mi` | browser |
| PB-08 | Vehicle without inspection | veh-007 row shows `vehicle-no-inspection` `No inspection recorded` and no `Open inspection` link; `GET /api/vehicles` gives `inspectionId: null` for veh-007 | browser + HTTP |
| PB-09 | Empty results state | `q=zzz` → `Showing 0 of 8 vehicles`, `results-empty` `No vehicles match "zzz".`, no rows; `GET /api/vehicles?q=zzz` → `vehicles: []`, `matched: 0` | browser + HTTP |
| PB-10 | Unknown sort value keeps saved order; query is trimmed | `sort=up` → saved order; `q=%20civic%20` → veh-002 and the search input shows `civic` | HTTP + browser |

## Inspection page

| ID | Behavior | Expected on sample data | Check |
| --- | --- | --- | --- |
| PB-11 | Identity and facts | `/inspections/insp-001`: `inspection-page[data-inspection-id="insp-001"]`, `vehicle-title` `2021 Toyota RAV4`, `vehicle-stock` `STK-20811`, `vehicle-mileage` `42,310 mi`, `vehicle-color` `Silver`, `inspection-date` `Aug 20, 2026`, `inspector` `D. Okafor`, `inspection-revision` `1` | browser |
| PB-12 | UTC date rule | `/inspections/insp-008`: `inspection-date` `Sep 2, 2026` (the checker runs with `TZ=UTC`; a correct implementation gives the same value under any TZ) | browser |
| PB-13 | Findings in saved order with exact text and labels | `/inspections/insp-004`: `finding-005`, `finding-006`, `finding-007`, `finding-008`, `finding-009` in that DOM order; `finding-007` has `finding-severity` `Major`, `finding-area` `Brakes`, `finding-description` `Front brake pads worn below the service limit.` | browser |
| PB-14 | Severity counts and the needs-attention rule (both branches) | insp-004: counts `1`/`3`/`1`, `needs-attention` present; insp-005: `0`/`3`/`0`, present; insp-006: `0`/`2`/`1`, **absent**; insp-003: `0`/`0`/`0`, absent; `GET /api/inspections/insp-005` `summary.needsAttention` true, insp-006 false | browser + HTTP |
| PB-15 | Zero-finding state | `/inspections/insp-003`: `findings-empty` `No findings recorded.`, no `finding-*` elements | browser |

## Reports

| ID | Behavior | Expected on sample data | Check |
| --- | --- | --- | --- |
| PB-16 | Generated report identity and order | `/inspections/insp-004/report`: `report-page[data-report-id="RPT-004-R2"][data-report-source="generated"]`, `report-id` `RPT-004-R2`, `report-revision` `2`, `report-vehicle` `2018 Chevrolet Silverado 1500`, `report-mileage` `101,200 mi`, findings in DOM order `finding-007, finding-005, finding-006, finding-009, finding-008`, counts `1`/`3`/`1`, `report-needs-attention` present | browser |
| PB-17 | Generated report JSON | `GET /api/inspections/insp-004/report` deep-equals `fixtures/reports/RPT-004-R2.json`; `report-json` on the page parses to the same object; `GET /api/inspections/insp-003/report` has `findings: []`, counts all 0, `needsAttention` false | HTTP + browser |
| PB-18 | Generated equals recorded for the current revision | For every inspection with a recorded file (insp-001, 002, 003, 004, 005, 008): `GET /api/inspections/<id>/report` deep-equals `GET /api/reports/<reportId>`; generating twice returns identical bodies; generating creates no file under `INSPECTION_DESK_FIXTURE_DIR` or `INSPECTION_DESK_DATA_DIR` | HTTP + filesystem |
| PB-19 | Recorded report read-back, including an older revision | `/reports/RPT-001-R1`: `report-page[data-report-source="recorded"]`, `Back to inspection` → `/inspections/insp-001`; `/reports/RPT-004-R1`: `report-revision` `1`, three findings `finding-007, finding-005, finding-006`, counts `1`/`2`/`0` — rendered from the file, not regenerated | browser + HTTP |
| PB-20 | Inspection page links to reports | insp-001: link `Generate report` → `/inspections/insp-001/report`, link `Open recorded report` → `/reports/RPT-001-R1`; insp-004 links to `/reports/RPT-004-R2` (not R1); insp-006: `no-recorded-report` `No recorded report for this inspection.` and no `Open recorded report` link; `GET /api/inspections/insp-006` `recordedReportExists` false, `reportId` `RPT-006-R1` | browser + HTTP |

## Invalid records

| ID | Behavior | Expected | Check |
| --- | --- | --- | --- |
| PB-21 | Unknown inspection | `/inspections/insp-999` → status 404, `record-missing` `That inspection was not found.`; `/inspections/insp-999/report` → 404 same text; `GET /api/inspections/insp-999` → 404 `INSPECTION_NOT_FOUND`; `GET /api/inspections/insp-999/report` → 404 `INSPECTION_NOT_FOUND` | browser + HTTP |
| PB-22 | Unknown or absent recorded report | `/reports/RPT-006-R1` → 404, `record-missing` `That recorded report was not found.`; `GET /api/reports/RPT-006-R1` → 404 `REPORT_NOT_FOUND`; `GET /api/reports/../etc` (invalid id characters) → 400 `INVALID_REQUEST` | browser + HTTP |

## DF-01

The legacy stock-number search is case-sensitive. The replacement applies the fixed rule (PB-03). The legacy snapshot `legacy/snapshots/search-df01-stk-lowercase.html` shows the defective result for comparison.

## Out of scope for task 1

Authentication, PDF, printing beyond the browser's own print, a database, editing inspections, creating recorded report files, pagination, any request to the hosted legacy application. Visual design is free as long as the elements above exist; the report design in the starter (`product/report-design/`) is a reference, not a requirement.
