# Published checks

Contract inspection-desk-2task-1.1. These 45 checks total 100 points.

## Production build and start-up — 10 points

- **BUILD-01** (2): `npm ci --ignore-scripts` from the submitted `package-lock.json` exits 0 (network on for this step only, no secrets on the machine)
- **BUILD-02** (3): `npm run build` exits 0 within 10 minutes with no network
- **BUILD-03** (3): `npm run start` with `PORT=4310` answers `GET /api/health` 200 within 90 s, body `contractVersion` equals `inspection-desk-2task-1.1` and `fixtureDir`/`dataDir` echo the directories the checker set (PB-00)
- **BUILD-04** (2): `GET /api/vehicles` returns 200 with `vehicles.length`, `matched` and `total` all equal to the dataset's vehicle count

## Source-file size — 5 points

- **SIZE-01** (3): Every maintained application, configuration and runtime source file anywhere in the packaged project has 500 lines maximum, excluding only published generated or supplied-source exceptions.
- **SIZE-02** (2): Every maintained test, hook and executable skill helper anywhere under tests/ or .claude/ has 500 lines maximum.

## Vehicle discovery — 10 points

- **DISC-01** (2): Empty query lists every vehicle in saved order (PB-01) and each row shows the published content: `vehicle-name` (R-TITLE with saved casing), `vehicle-stock`, `vehicle-mileage` (R-MILES), `vehicle-color`, `Open inspection` link to `/inspections/<id>` (PB-07); `results-count` reads `Showing 8 of 8 vehicles`
- **DISC-02** (2): Case-insensitive substring match on make and model (PB-02): `q=honda` → veh-002, veh-005; `q=ESCAPE` → veh-003; `results-count` `Showing 2 of 8 vehicles`
- **DISC-03** (2): Substring match on stock number and defect DF-01 fixed (PB-03): `q=STK-2083` → veh-003, veh-004; `q=stk-20811` → veh-001
- **DISC-04** (2): Ascending mileage sort is numeric (PB-04): API order and DOM order of `vehicle-row-*` both equal the reference order
- **DISC-05** (1): Descending sort is the exact reverse (PB-05)
- **DISC-06** (1): Filter before sort and sort links keep the query (PB-06): `q=ford&sort=desc` → veh-008, veh-003; on that page `sort-asc` `href` contains `q=ford` and `sort=asc`

## Report accuracy — 15 points

- **REPORT-01** (3): Identity and facts on the inspection page and the generated report page (PB-11, PB-16): `inspection-page[data-inspection-id]`, `vehicle-title`, `vehicle-stock`, `inspector`, `inspection-revision`; `report-page[data-report-id][data-report-source="generated"]`, `report-id` in the R-REPORT-ID form, `report-revision`
- **REPORT-02** (3): Ordering (PB-13, PB-16): inspection page lists `finding-<id>` in saved order (R-ORDER-INSP); the report lists `report-finding-<id>` major, minor, info, then by id (R-ORDER-RPT); each finding shows `finding-area`, `finding-severity` (`Major`/`Minor`/`Info`), `finding-description` exactly
- **REPORT-03** (3): Severity counts and the needs-attention rule on both branches (PB-14) including the zero-finding inspection (PB-15): `count-*` and `report-count-*` digits equal the reference; `needs-attention`/`report-needs-attention` present exactly when major ≥ 1 or minor ≥ 3; `findings-empty`/`report-findings-empty` `No findings recorded.` for zero findings; `severityCounts` in the API
- **REPORT-04** (2): Date and mileage formatting (PB-12, R-DATE, R-MILES): `inspection-date`/`report-date` show the UTC calendar date `Sep 2, 2026` for `2026-09-02T02:30:00.000Z`; `report-mileage` `42,310 mi`
- **REPORT-05** (2): Generated report JSON (PB-17): `GET /api/inspections/<id>/report` deep-equals the reference's generated report; `report-json` on the page parses to the same object
- **REPORT-06** (2): Generated equals recorded for the current revision (PB-18): for every inspection with a recorded file, the generated report deep-equals `GET /api/reports/<reportId>`

## Selection and error behavior — 10 points

- **SELECT-01** (2): Empty results and query handling (PB-09, PB-10): `q=zzz` → `Showing 0 of 8 vehicles`, `results-empty` `No vehicles match "zzz".`, no rows, API `matched: 0`; `q=%20civic%20` → veh-002 and `search-input` shows `civic`; `sort=up` keeps saved order
- **SELECT-02** (3): Unknown inspection id (PB-21): `/inspections/insp-999` and `/inspections/insp-999/report` return HTTP 404 with `record-missing` `That inspection was not found.`; `GET /api/inspections/insp-999` and `/report` return 404 `INSPECTION_NOT_FOUND`
- **SELECT-03** (2): Vehicle without inspection (PB-08): row shows `vehicle-no-inspection` `No inspection recorded` and no `Open inspection` link; API gives `inspectionId: null`
- **SELECT-04** (2): Recorded-report links and absence (PB-20, PB-22): an inspection with a recorded file shows `Generate report` → `/inspections/<id>/report` and `Open recorded report` → `/reports/<reportId>`; an inspection without one shows `no-recorded-report` `No recorded report for this inspection.` and no `Open recorded report` link; `/reports/RPT-006-R1` → 404 `record-missing` `That recorded report was not found.`; API 404 `REPORT_NOT_FOUND`; `recordedReportExists` correct in `GET /api/inspections/<id>`
- **SELECT-05** (1): Older-revision recorded report readable by id (PB-19): `/reports/RPT-004-R1` renders `report-page[data-report-source="recorded"]` from the file (three findings, counts `1/2/0`), `Back to inspection` → `/inspections/insp-004`; API returns the file verbatim

## Follow-up creation and validation — 10 points

- **FU-CREATE-01** (3): `POST /api/inspections/<id>/findings/<findingId>/follow-ups` `{"note":"…"}` → 201 `{ followUp }` with an id matching `^fu-[A-Za-z0-9-]{8,40}$`, correct `inspectionId`, `findingId`, `status: "open"`, `resolvedAt: null`, ISO `createdAt`; browser: `Flag for follow-up` → `follow-up-note` → `Save follow-up` → `follow-up-<id>[data-follow-up-status="open"]` appears inside the finding region with `follow-up-note-text`, and `follow-up-status` reads `Follow-up saved.`
- **FU-CREATE-02** (1): Trimming: `"  Check tread depth  "` is saved and returned as `Check tread depth`
- **FU-CREATE-03** (2): Empty and whitespace-only notes → 400 `INVALID_NOTE`; the list is unchanged; browser: saving an empty note shows `role="alert"` `Add a note before saving.` and creates nothing
- **FU-CREATE-04** (2): Length: 281 characters after trimming → 400 `INVALID_NOTE`, nothing saved; exactly 280 → 201
- **FU-CREATE-05** (2): Wrong targets and bodies: unknown inspection → 404 `INSPECTION_NOT_FOUND`; unknown finding → 404 `FINDING_NOT_FOUND`; body that is not a JSON object → 400 `INVALID_REQUEST`; nothing saved in each case

## Follow-up persistence — 10 points

- **FU-PERSIST-01** (2): Immediately after creation the record is returned by `GET /api/inspections/<id>/follow-ups` (oldest first) and by `GET /api/follow-ups/<followUpId>`, and the inspection page shows it
- **FU-PERSIST-02** (2): Page reload: after creating through the browser, `page.reload()` still shows `follow-up-<id>`
- **FU-PERSIST-03** (4): Server restart: the checker stops the process (SIGTERM, SIGKILL after 10 s), starts it again with the same `INSPECTION_DESK_DATA_DIR`, and the list and read routes return the record with the same id and `createdAt`
- **FU-PERSIST-04** (2): Resolve: `POST /api/follow-ups/<id>/resolve` → 200 with `status: "resolved"` and ISO `resolvedAt`; the record stays readable; `GET /api/inspections/<id>` (findings, revision) and `GET /api/inspections/<id>/report` are deep-equal before and after (S1 in `FAULTS-AND-CASES.md` is the model of what fails here); browser: `Mark resolved` → `follow-up-resolved` contains `Resolved` and `follow-up-status` reads `Follow-up resolved.`

## Duplicate handling and isolation — 10 points

- **FU-DUP-01** (3): Second create for a finding with an open follow-up → 409 with `error.code` `FOLLOW_UP_EXISTS` and `followUp` equal to the existing record; list count unchanged; browser alert `This finding already has an open follow-up.` (F1 is the model of what fails here)
- **FU-DUP-02** (2): Resolving an already resolved follow-up → 200 with the **same** `resolvedAt`
- **FU-DUP-03** (1): After resolution a new open follow-up for the same finding → 201 (interface contract section 4.2 rule)
- **FU-DUP-04** (2): Isolation by list: follow-ups for inspection A never appear under inspection B and vice versa (two inspections, two follow-ups each); the inspection page for A renders only A's
- **FU-DUP-05** (2): Isolation by target: a finding id that belongs to inspection A posted to inspection B → 404 `FINDING_NOT_FOUND`, nothing saved

## Participant regression test — 15 points

- **REG-01** (5): Fails against faulty service F1 (a second open follow-up for the same finding is accepted) with at least one assertion failure, no timeout, no import error
- **REG-02** (5): Fails against faulty service F2 (a whitespace-only note is accepted) likewise
- **REG-03** (5): Fails against faulty service F3 (follow-ups listed under the wrong inspection) likewise

## Checking hook — 5 points

- **HOOK-01** (1): Configuration parses; at least one `PostToolUse` handler of type `command` matches `Edit` and `Write`; every such command is a non-empty string
- **HOOK-02** (1): Relevant edit with a deliberate type error in a counted file: some matching handler exits 2 with non-empty standard error within the limit
- **HOOK-03** (1): Relevant edit that pushes a counted file over 500 lines: some matching handler exits 2 with non-empty standard error
- **HOOK-04** (1): The submitted baseline passes trusted type and size checks; on a harmless relevant edit all matching handlers exit 0. An invalid baseline fails this check; matching failures cannot pass.
- **HOOK-05** (1): Irrelevant file (`README.md`): every matching handler exits 0, all of them within 5 seconds


Regression prerequisite: the same test must pass on your application and the trusted correct service before fault detection earns any points.
