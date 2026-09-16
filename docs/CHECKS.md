# Behavior checklist

Use this checklist when reviewing the application. The IDs connect requirements with earlier examples; local test names may differ. Run the staged commands in README.md and record actual results. A checklist entry alone is not evidence that a check ran.

## Production build and start-up

- **BUILD-01**: `npm ci --ignore-scripts` from the saved `package-lock.json` exits 0 (dependency downloads need network access)
- **BUILD-02**: `npm run build` exits 0 within 10 minutes with no network
- **BUILD-03**: `npm run start` with `PORT=4310` answers `GET /api/health` 200 within 90 s, body `contractVersion` equals `inspection-desk-2task-1.2` and `fixtureDir`/`dataDir` echo the configured directories (PB-00)
- **BUILD-04**: `GET /api/vehicles` returns 200 with `vehicles.length`, `matched` and `total` all equal to the dataset's vehicle count

## Source-file size

- **SIZE-01**: Every maintained application, configuration and runtime source file anywhere in the packaged project has 500 lines maximum, excluding only published generated or supplied-source exceptions.
- **SIZE-02**: Every maintained test, hook and executable skill helper anywhere under tests/ or .claude/ has 500 lines maximum.

## Vehicle discovery

- **DISC-01**: Empty query lists every vehicle in saved order (PB-01) and each row shows the published content: `vehicle-name` (R-TITLE with saved casing), `vehicle-stock`, `vehicle-mileage` (R-MILES), `vehicle-color`, `Open inspection` link to `/inspections/<id>` (PB-07); `results-count` reads `Showing 8 of 8 vehicles`
- **DISC-02**: Case-insensitive substring match on make and model (PB-02): `q=honda` → veh-002, veh-005; `q=ESCAPE` → veh-003; `results-count` `Showing 2 of 8 vehicles`
- **DISC-03**: Substring match on stock number and defect DF-01 fixed (PB-03): `q=STK-2083` → veh-003, veh-004; `q=stk-20811` → veh-001
- **DISC-04**: Ascending mileage sort is numeric (PB-04): API order and DOM order of `vehicle-row-*` both equal the reference order
- **DISC-05**: Descending sort is the exact reverse (PB-05)
- **DISC-06**: Filter before sort and sort links keep the query (PB-06): `q=ford&sort=desc` → veh-008, veh-003; on that page `sort-asc` `href` contains `q=ford` and `sort=asc`

## Report accuracy

- **REPORT-01**: Identity and facts on the inspection page and the generated report page (PB-11, PB-16): `inspection-page[data-inspection-id]`, `vehicle-title`, `vehicle-stock`, `inspector`, `inspection-revision`; `report-page[data-report-id][data-report-source="generated"]`, `report-id` in the R-REPORT-ID form, `report-revision`
- **REPORT-02**: Ordering (PB-13, PB-16): inspection page lists `finding-<id>` in saved order (R-ORDER-INSP); the report lists `report-finding-<id>` major, minor, info, then by id (R-ORDER-RPT); each finding shows `finding-area`, `finding-severity` (`Major`/`Minor`/`Info`), `finding-description` exactly
- **REPORT-03**: Severity counts and the needs-attention rule on both branches (PB-14) including the zero-finding inspection (PB-15): `count-*` and `report-count-*` digits equal the reference; `needs-attention`/`report-needs-attention` present exactly when major ≥ 1 or minor ≥ 3; `findings-empty`/`report-findings-empty` `No findings recorded.` for zero findings; `severityCounts` in the API
- **REPORT-04**: Date and mileage formatting (PB-12, R-DATE, R-MILES): `inspection-date`/`report-date` show the UTC calendar date `Sep 2, 2026` for `2026-09-02T02:30:00.000Z`; `report-mileage` `42,310 mi`
- **REPORT-05**: Generated report JSON (PB-17): `GET /api/inspections/<id>/report` deep-equals the reference's generated report; `report-json` on the page parses to the same object
- **REPORT-06**: Generated equals recorded for the current revision (PB-18): for every inspection with a recorded file, the generated report deep-equals `GET /api/reports/<reportId>`

## Selection and error behavior

- **SELECT-01**: Empty results and query handling (PB-09, PB-10): `q=zzz` → `Showing 0 of 8 vehicles`, `results-empty` `No vehicles match "zzz".`, no rows, API `matched: 0`; `q=%20civic%20` → veh-002 and `search-input` shows `civic`; `sort=up` keeps saved order
- **SELECT-02**: Unknown inspection id (PB-21): `/inspections/insp-999` and `/inspections/insp-999/report` return HTTP 404 with `record-missing` `That inspection was not found.`; `GET /api/inspections/insp-999` and `/report` return 404 `INSPECTION_NOT_FOUND`
- **SELECT-03**: Vehicle without inspection (PB-08): row shows `vehicle-no-inspection` `No inspection recorded` and no `Open inspection` link; API gives `inspectionId: null`
- **SELECT-04**: Recorded-report links and absence (PB-20, PB-22): an inspection with a recorded file shows `Generate report` → `/inspections/<id>/report` and `Open recorded report` → `/reports/<reportId>`; an inspection without one shows `no-recorded-report` `No recorded report for this inspection.` and no `Open recorded report` link; `/reports/RPT-006-R1` → 404 `record-missing` `That recorded report was not found.`; API 404 `REPORT_NOT_FOUND`; `recordedReportExists` correct in `GET /api/inspections/<id>`
- **SELECT-05**: Older-revision recorded report readable by id (PB-19): `/reports/RPT-004-R1` renders `report-page[data-report-source="recorded"]` from the file (three findings, counts `1/2/0`), `Back to inspection` → `/inspections/insp-004`; API returns the file verbatim

## Part 2 checks

After the product discussion, install the Comparison requirements pack linked in Build. Read docs/COMPARISON-CONTRACT.md. The initial starter deliberately excludes the agreed product answers and Part 2 checks.

## Checking hook

- **HOOK-01**: Configuration parses; at least one `PostToolUse` handler of type `command` matches `Edit` and `Write`; every such command is a non-empty string
- **HOOK-02**: Relevant edit with a deliberate type error in a counted file: some matching handler exits 2 with non-empty standard error within the limit
- **HOOK-03**: Relevant edit that pushes a counted file over 500 lines: some matching handler exits 2 with non-empty standard error
- **HOOK-04**: The current code passes type and size checks; on a harmless relevant edit all matching handlers exit 0. An invalid baseline fails this check; matching failures cannot pass.
- **HOOK-05**: Irrelevant file (`README.md`): every matching handler exits 0, all of them within 5 seconds


First confirm the same test passes on the correct local implementation. Restore the temporary defect and confirm it passes again. Keep the test unchanged through this comparison.
