# Inspection Desk — interface contract for the Next.js replacement

September 14, 2026. Application and product exercise worker. Tenex internal, definition phase. Approved implementation contract, corrected and frozen September 15. Changes require a coordinator version decision before workers alter consumers.

Contract version string: `inspection-desk-2task-1.1`.

Scope: the Next.js application participants submit. It replaces the hosted Lucee (CFML) application (task 1) and adds the follow-up feature (task 2). It must run with no network access and must never call the hosted legacy application (coordinator instruction, September 14).

## 1. Data shapes

Vehicle (`data/vehicles.json`, array):

```json
{ "id": "veh-001", "stockNumber": "STK-20811", "year": 2021, "make": "Toyota", "model": "RAV4", "mileage": 42310, "exteriorColor": "Silver" }
```

Inspection (`data/inspections.json`, array):

```json
{ "id": "insp-001", "vehicleId": "veh-001", "revision": 1, "inspectedAt": "2026-08-20T14:00:00.000Z", "inspectorLabel": "D. Okafor",
  "findings": [ { "id": "finding-001", "area": "Exterior", "severity": "minor", "description": "Small scratch on the left rear door." } ] }
```

`severity` is one of `major`, `minor`, `info`. A vehicle has at most one inspection; a vehicle may have none.

Report (generated or recorded; identical shape, no timestamps, no random values):

```json
{ "id": "RPT-001-R1", "inspectionId": "insp-001", "inspectionRevision": 1,
  "vehicle": { "id": "veh-001", "stockNumber": "STK-20811", "year": 2021, "make": "Toyota", "model": "RAV4", "mileage": 42310, "exteriorColor": "Silver" },
  "inspectedAt": "2026-08-20T14:00:00.000Z", "inspectorLabel": "D. Okafor",
  "findings": [ { "id": "finding-001", "area": "Exterior", "severity": "minor", "description": "Small scratch on the left rear door." },
                { "id": "finding-002", "area": "Interior", "severity": "info", "description": "Seats and controls inspected." } ],
  "severityCounts": { "major": 0, "minor": 1, "info": 1 },
  "needsAttention": false }
```

Follow-up (task 2; the only writable record):

```json
{ "id": "fu-3f9c1b2a-…", "inspectionId": "insp-002", "findingId": "finding-004", "note": "Confirm tire brand before sale.",
  "status": "open", "createdAt": "2026-09-17T14:02:11.000Z", "resolvedAt": null }
```

`id` is server-generated and opaque; it matches `^fu-[A-Za-z0-9-]{8,40}$`. Checks never predict it.

## 2. Business rules (the legacy behavior to preserve; PB numbers refer to PRESERVATION-CONTRACT.md)

| Rule | Definition |
| --- | --- |
| R-SEARCH | Query `q` is trimmed. Empty → all vehicles. Otherwise a vehicle matches when the trimmed query is a **case-insensitive substring** of its `make`, `model` or `stockNumber`. Year and color never match. (Legacy defect DF-01: the legacy matches `stockNumber` case-sensitively; the replacement must apply the fixed rule stated here.) |
| R-SORT | `sort=asc` orders by `mileage` as a number, lowest first; `sort=desc` highest first; any other value or no value keeps saved file order. Filtering happens before sorting. |
| R-MILES | Mileage displays as thousands-separated digits plus ` mi`, e.g. `42,310 mi`, `9,850 mi`. |
| R-DATE | Inspection date displays as the **UTC** calendar date of `inspectedAt` in the form `Aug 20, 2026` (three-letter English month, day without leading zero, four-digit year). `2026-09-02T02:30:00.000Z` displays `Sep 2, 2026`. |
| R-TITLE | Vehicle title is `<year> <make> <model>` with make and model exactly as saved (mixed case preserved): `2019 HONDA Accord`. |
| R-COUNTS | `severityCounts` counts findings per severity; keys always present in the order major, minor, info. |
| R-ATTENTION | `needsAttention` is true when `major >= 1` **or** `minor >= 3`; otherwise false. Shown as the text `Needs attention`; when false nothing is shown. |
| R-ORDER-INSP | The inspection page lists findings in **saved order**. |
| R-ORDER-RPT | A report lists findings ordered by severity `major`, then `minor`, then `info`; within a severity by finding `id` ascending (plain string comparison). |
| R-SEVLABEL | Severity labels display as `Major`, `Minor`, `Info`. |
| R-REPORT-ID | Report id is `RPT-<n>-R<revision>` where `<n>` is the inspection id with the leading `insp-` removed, unchanged otherwise (`insp-001` → `RPT-001-R1`; `insp-1041`, revision 2 → `RPT-1041-R2`). |
| R-GENERATED | A generated report is a deterministic render from the current inspection and vehicle records. Generating never writes anything. |
| R-RECORDED | A recorded report is a saved file `data/reports/<reportId>.json`, read back verbatim. For an inspection's **current** revision, the generated report must deep-equal the recorded report when a recorded file exists. Some inspections deliberately have no recorded report (empty state). A recorded file may exist for an older revision (e.g. `RPT-004-R1` while the inspection is at revision 2); it is readable by id and is not compared with the current generated report. |
| R-EMPTY | Zero-result search, zero-finding inspection, inspection without recorded report, vehicle without inspection each have a defined visible state (section 3). |
| R-MISSING | Unknown inspection id, unknown report id, unknown follow-up id → HTTP 404 with the defined page or JSON error. |

## 3. Pages (App Router) and the elements the browser checks read

Checks find elements by `data-testid` and by role plus accessible name (Playwright `getByTestId`, `getByRole`). Text comparisons are exact after trimming unless "contains" is stated. Any extra markup is allowed.

### 3.1 `/` — vehicle search

Query parameters: `q` (string), `sort` (`asc` | `desc`).

| Element | Requirement |
| --- | --- |
| `data-testid="search-page"` | Page root. |
| `role="searchbox"` or `<input>` with accessible name `Search vehicles`, `data-testid="search-input"` | Reflects the current `q` (trimmed value) after load. |
| Button, accessible name `Search` | Submits; the resulting URL contains `q=<value>` (a GET form or client navigation; either is fine). |
| `data-testid="sort-asc"`, link, accessible name `Sort by mileage, lowest first` | `href` keeps the current `q` and sets `sort=asc`. |
| `data-testid="sort-desc"`, link, accessible name `Sort by mileage, highest first` | `href` keeps the current `q` and sets `sort=desc`. |
| `data-testid="results-count"` | Text `Showing <matched> of <total> vehicles` (`Showing 8 of 8 vehicles`, `Showing 0 of 8 vehicles`). |
| `data-testid="results-empty"` | Present only when `matched = 0`; text `No vehicles match "<trimmed q>".` |
| `data-testid="vehicle-row-<vehicleId>"` with attribute `data-vehicle-id="<vehicleId>"` | One per matched vehicle, in result order. Checks read DOM order. |
| inside a row: `data-testid="vehicle-name"` | R-TITLE text. |
| inside a row: `data-testid="vehicle-stock"` | `stockNumber`. |
| inside a row: `data-testid="vehicle-mileage"` | R-MILES text. |
| inside a row: `data-testid="vehicle-color"` | `exteriorColor`. |
| inside a row: link, accessible name `Open inspection` | `href="/inspections/<inspectionId>"`; present only when the vehicle has an inspection. |
| inside a row: `data-testid="vehicle-no-inspection"` | Text `No inspection recorded`; present only when the vehicle has no inspection. |

### 3.2 `/inspections/[id]` — inspection page

| Element | Requirement |
| --- | --- |
| `data-testid="inspection-page"` with `data-inspection-id="<id>"` | Page root. |
| `data-testid="vehicle-title"` | R-TITLE. |
| `data-testid="vehicle-stock"`, `vehicle-mileage`, `vehicle-color` | As in 3.1. |
| `data-testid="inspection-date"` | R-DATE. |
| `data-testid="inspector"` | `inspectorLabel`. |
| `data-testid="inspection-revision"` | The number, e.g. `2`. |
| `data-testid="count-major"`, `count-minor`, `count-info` | Digits only. |
| `data-testid="needs-attention"` | Present with text `Needs attention` only when R-ATTENTION is true. |
| `data-testid="finding-<findingId>"` with `data-finding-id` | One per finding in saved order (R-ORDER-INSP). |
| inside a finding: `data-testid="finding-area"`, `finding-severity` (R-SEVLABEL text), `finding-description` | Exact saved values. |
| `data-testid="findings-empty"` | Text `No findings recorded.` only when the inspection has zero findings. |
| Link, accessible name `Generate report` | `href="/inspections/<id>/report"`. |
| Link, accessible name `Open recorded report` | `href="/reports/<reportId>"`; present only when a recorded file exists for the **current** revision's report id. |
| `data-testid="no-recorded-report"` | Text `No recorded report for this inspection.` when no such file exists. |
| Link, accessible name `Back to search` | `href="/"`. |
| Task 2 elements | Section 3.5. |

Unknown id: HTTP status 404 and an element `data-testid="record-missing"` with text `That inspection was not found.` (Next.js renders `not-found.tsx` with status 404 for non-streamed responses; installed docs `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md`, line 13.)

### 3.3 `/inspections/[id]/report` — generated report

| Element | Requirement |
| --- | --- |
| `data-testid="report-page"` with `data-report-id="<reportId>"` and `data-report-source="generated"` | Page root. |
| `data-testid="report-id"` | R-REPORT-ID text. |
| `data-testid="report-vehicle"`, `report-stock`, `report-mileage`, `report-color`, `report-date`, `report-inspector`, `report-revision` | As defined above. |
| `data-testid="report-count-major"`, `report-count-minor`, `report-count-info` | Digits only. |
| `data-testid="report-needs-attention"` | Present with text `Needs attention` only when true. |
| `data-testid="report-finding-<findingId>"` | One per finding in R-ORDER-RPT order; contains `finding-area`, `finding-severity`, `finding-description` as in 3.2. |
| `data-testid="report-findings-empty"` | Text `No findings recorded.` when zero findings. |
| `data-testid="report-json"` | A `<pre>` whose text parses as JSON deep-equal to the report object (key order not required). |
| Link, accessible name `Back to inspection` | `href="/inspections/<id>"`. |

Unknown inspection id: 404 and `record-missing` with text `That inspection was not found.`

### 3.4 `/reports/[reportId]` — recorded report

Same elements as 3.3 with `data-report-source="recorded"`, rendered from the recorded file. `Back to inspection` links to the recorded report's `inspectionId`. Unknown report id: 404 and `record-missing` with text `That recorded report was not found.`

### 3.5 Follow-ups on `/inspections/[id]` (task 2)

Inside each `finding-<findingId>` region:

| Element | Requirement |
| --- | --- |
| Button, accessible name `Flag for follow-up` | Shown when the finding has no open follow-up. Reveals the note form. |
| `data-testid="follow-up-note"`, accessible name `Follow-up note` | Multiline text input. |
| Button, accessible name `Save follow-up` | Sends the create request. |
| Button, accessible name `Cancel` | Hides the form; nothing saved. |
| `role="alert"` inside the finding region | Validation text: `Add a note before saving.` (empty or whitespace-only), `Keep the note to 280 characters.` (over 280 after trimming), `This finding already has an open follow-up.` (server 409). |
| `data-testid="follow-up-<followUpId>"` with `data-follow-up-status="open"` or `"resolved"` | One per follow-up of that finding, oldest first. Appears after save and after reload. |
| inside a follow-up: `data-testid="follow-up-note-text"` | The trimmed note. |
| inside an open follow-up: button, accessible name `Mark resolved` | Sends the resolve request. |
| inside a resolved follow-up: `data-testid="follow-up-resolved"` | Contains the text `Resolved`. |
| `data-testid="follow-up-status"` with `role="status"` (once per page) | `Follow-up saved.` after a successful save; `Follow-up resolved.` after resolve. |

Follow-ups for other inspections never render on this page. Report pages show no follow-ups.

## 4. JSON API

All responses are JSON. Errors use the envelope `{"error":{"code":"…","message":"…"}}`; `message` is free text. Path ids must match `^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$`; otherwise 400 `INVALID_REQUEST`.

### 4.1 Read endpoints (task 1)

| Method and path | Success | Errors |
| --- | --- | --- |
| `GET /api/health` | 200 `{"status":"ok","contractVersion":"inspection-desk-2task-1.1","fixtureDir":"<abs path>","dataDir":"<abs path>"}` | — |
| `GET /api/vehicles?q=&sort=` | 200 `{"vehicles":[{…vehicle,"inspectionId":"insp-001" or null}],"matched":8,"total":8}` after R-SEARCH and R-SORT | — |
| `GET /api/inspections/:id` | 200 `{"inspection":{…},"vehicle":{…},"summary":{"severityCounts":{"major":0,"minor":1,"info":1},"needsAttention":false},"reportId":"RPT-001-R1","recordedReportExists":true}` | 404 `INSPECTION_NOT_FOUND` |
| `GET /api/inspections/:id/report` | 200 `{"report":{…generated}}` | 404 `INSPECTION_NOT_FOUND` |
| `GET /api/reports/:reportId` | 200 `{"report":{…recorded file}}` | 404 `REPORT_NOT_FOUND` |

`inspection.findings` in `GET /api/inspections/:id` keep saved order; `report.findings` follow R-ORDER-RPT.

Examples on the sample data:

```
GET /api/vehicles?q=honda            → matched 2: veh-002 (Honda Civic), veh-005 (HONDA Accord), saved order
GET /api/vehicles?q=STK-2083         → matched 2: veh-003, veh-004
GET /api/vehicles?q=stk-20811        → matched 1: veh-001   (DF-01 fixed)
GET /api/vehicles?q=150              → matched 2: veh-004 (Silverado 1500), veh-008 (F-150)
GET /api/vehicles?sort=asc           → veh-003, veh-007, veh-001, veh-002, veh-005, veh-004, veh-006, veh-008
GET /api/vehicles?q=zzz              → matched 0, vehicles []
GET /api/inspections/insp-999        → 404 {"error":{"code":"INSPECTION_NOT_FOUND","message":"Inspection insp-999 was not found."}}
GET /api/reports/RPT-006-R1          → 404 {"error":{"code":"REPORT_NOT_FOUND","message":"Report RPT-006-R1 was not found."}}
```

### 4.2 Follow-up endpoints (task 2)

| Method and path | Body | Success | Errors |
| --- | --- | --- | --- |
| `POST /api/inspections/:id/findings/:findingId/follow-ups` | `{"note":"…"}` | 201 `{"followUp":{…}}` with `status:"open"`, `resolvedAt:null` | 400 `INVALID_REQUEST` (body not a JSON object); 400 `INVALID_NOTE` (note missing, not a string, empty or whitespace-only after trimming, or longer than 280 after trimming) — nothing saved; 404 `INSPECTION_NOT_FOUND`; 404 `FINDING_NOT_FOUND` (finding absent **from that inspection**); 409 `FOLLOW_UP_EXISTS` when an open follow-up already exists for that finding — body `{"error":{"code":"FOLLOW_UP_EXISTS","message":"…"},"followUp":{…existing open record}}`, nothing saved |
| `GET /api/inspections/:id/follow-ups` | — | 200 `{"followUps":[…]}` only this inspection's records, open and resolved, oldest first | 404 `INSPECTION_NOT_FOUND` |
| `GET /api/follow-ups/:followUpId` | — | 200 `{"followUp":{…}}` | 404 `FOLLOW_UP_NOT_FOUND` |
| `POST /api/follow-ups/:followUpId/resolve` | `{}` or empty | 200 `{"followUp":{…}}` with `status:"resolved"`, `resolvedAt` ISO string; repeating returns 200 with the **same** `resolvedAt` | 404 `FOLLOW_UP_NOT_FOUND` |

Rules the checks apply:

- The saved `note` is the trimmed input. Create request with `"  Check tread depth  "` saves `Check tread depth`.
- After a follow-up is resolved, a new open follow-up for the same finding is allowed (201).
- Resolving changes nothing in `GET /api/inspections/:id` (findings, revision) or in `GET /api/inspections/:id/report`.
- Records survive a server stop and start with the same `INSPECTION_DESK_DATA_DIR`.

Example:

```
POST /api/inspections/insp-002/findings/finding-004/follow-ups   {"note":"Confirm tire brand before sale."}
201 {"followUp":{"id":"fu-…","inspectionId":"insp-002","findingId":"finding-004","note":"Confirm tire brand before sale.","status":"open","createdAt":"2026-09-17T14:02:11.000Z","resolvedAt":null}}

POST (same again)
409 {"error":{"code":"FOLLOW_UP_EXISTS","message":"Finding finding-004 already has an open follow-up."},"followUp":{…the record above}}

POST /api/inspections/insp-001/findings/finding-004/follow-ups   {"note":"x"}
404 {"error":{"code":"FINDING_NOT_FOUND","message":"Finding finding-004 is not part of inspection insp-001."}}

POST /api/inspections/insp-002/findings/finding-004/follow-ups   {"note":"   "}
400 {"error":{"code":"INVALID_NOTE","message":"Add a note of 1 to 280 characters."}}

POST /api/follow-ups/fu-…/resolve
200 {"followUp":{…,"status":"resolved","resolvedAt":"2026-09-17T14:05:40.000Z"}}
```

## 5. Storage and environment

| Variable | Meaning | Default |
| --- | --- | --- |
| `INSPECTION_DESK_FIXTURE_DIR` | Directory holding `vehicles.json`, `inspections.json` and `reports/*.json`. Read-only; the app never writes here. The checker points it at the controlled variant data. | `<project>/data` |
| `INSPECTION_DESK_DATA_DIR` | Writable directory for follow-ups (the only writable state). Created on first write. | `<project>/.data` |
| `PORT` | Port for `npm run start` (`next start` reads `PORT`; installed docs `01-app/03-api-reference/06-cli/next.md`, line 121). | `3000` |
| `NEXT_TELEMETRY_DISABLED` | Set to `1` by the checker; recommended in the starter's `.env.example`. | — |
| `TZ` | The checker sets `UTC`. Date rendering must not depend on it (R-DATE uses the UTC date explicitly). | — |

Follow-up storage: the reference writes `<INSPECTION_DESK_DATA_DIR>/follow-ups.json` (an array) with write-to-temp-then-rename; any layout inside the directory is acceptable. Loading happens on first request after start. `npm run reset:data` deletes the directory's contents.

## 6. Commands

The installed Node version is pinned to **24.21.0**, verified on this laptop on September 15 with `npm exec --yes --package=node@24.21.0 -- node --version`. Participants use that same patch. Setup must not require Git.

| Command | Meaning |
| --- | --- |
| `check:foundation` | preflight, typecheck, size and supplied unit tests; must pass initially |
| `check:increment` | npm run check:increment -- <task1|task2> <test-name-pattern>; build current source once, then selected named checks only |
| `check:task1` | foundation, build current source once, all modernization HTTP and browser checks |
| `check:task2` | build current source once, all follow-up HTTP and browser checks; only expected after the feature is complete |
| `check` | foundation, build current source once, all tests including participant regression against running app; reuse that exact build |
| `test` | Build current source once, run unit and HTTP tests |
| `test:e2e` | Build current source once, run browser tests |
| `test:participant` | Against INSPECTION_DESK_BASE_URL; requires running app |
| `package` | Package exact saved bytes; detect concurrent changes; hash stable content separately from ZIP bytes |
| `package -- --recovery` | Save timestamped backup ZIP without requiring completed feature checks; do not overwrite a prior recovery archive |

`setup` installs locked dependencies and Chromium. `preflight` checks the exact Node patch, dependencies and browser. `dev` uses port 3000; `start` respects PORT. `reset:data` resets only the configured follow-up data directory, with checks against deleting the project or fixtures. Targeted increment checks use a required task and test-name pattern; an empty selection is an error. A completed-feature suite is never described as an increment gate.

## 7. Source-file size rule

500 lines maximum per maintained source file: 500 passes; 501 fails. Comments and blank lines count. Normalize CRLF and lone CR to LF, count completed lines and a final nonempty unterminated line. A trailing newline finishes a line; it does not add another. Empty files have zero lines. NUL bytes in source are errors, not an exclusion.

Count every packaged file with one of these extensions, wherever it appears: `.ts .tsx .mts .cts .js .jsx .mjs .cjs .css .scss .sh .bash .zsh .py`. Root configuration, arbitrary helper directories, executable skill support files, and maintained declaration files count. Only generated `next-env.d.ts` is excluded by name.

SIZE-02 covers counted files under `tests/` and `.claude/`, including all recursively nested skill helpers. SIZE-01 covers the other counted files. No participant-defined exclusion is accepted. Generated build output, dependencies, runtime state, fixture JSON, lockfiles, prose, and supplied CFML source have no counted extension or are excluded from packaging. A source file placed under `data/`, `public/`, `product/`, `workshop/` or another helper directory still counts.

The trusted checker uses its own counter. The local counter and hook follow the same contract. Packaging warns about over-limit source files and includes them so the score describes the actual submission. No extra points are awarded for being well below 500. The rule applies to participant projects, not the portal stylesheet.

Required verification: 500/501 with LF, CRLF, lone CR and no trailing newline; root configuration, nested skill Python/shell helper, arbitrary directory, generated next-env and fixture JSON. Counted text with a NUL is rejected.

## 8. ZIP contents

The complete contents, exclusions, limits, manifest and upload fingerprint rules are in `PACKAGING.md` and frozen `../scripts/shared/contract.json`. Include full public references and skill packages, .env.example and root configuration. Legacy/product public packets are included to preserve references. Count all maintained supported source extensions wherever located. ZIP limit 25 MiB, warning above 10 MiB. Repeated saved content has the same packageHash; ZIP-byte identity is separate.

## 9. How the checker runs the app (for the assessment worker)

1. Unzip; verify `submission-manifest.json`.
2. `npm ci --ignore-scripts` from the submitted lockfile (network on for this step only).
3. `npm run build` with `NEXT_TELEMETRY_DISABLED=1`, no network from here on.
4. Phase A (variant data): start with `PORT=4310`, `INSPECTION_DESK_FIXTURE_DIR=<variant>`, `INSPECTION_DESK_DATA_DIR=<fresh temp>`, `TZ=UTC`; wait for `GET /api/health` 200; run the DISC, REPORT and SELECT checks (none of them writes), then the follow-up creation, duplicate and persistence checks, each on a finding no earlier check touched; stop the process; start again with the same data dir; run the remaining persistence check; stop. Browser checks run in this phase only.
5. Phase B (sample data): start with `PORT=4310`, `INSPECTION_DESK_FIXTURE_DIR=<sample>` and a fresh data dir; run the DISC, REPORT and SELECT HTTP checks on the sample data, then the follow-up creation and duplicate checks on the sample data in the same sequence; stop.
6. Regression start (sample data): start again with a fresh, empty data dir; run the participant regression test with Vitest (FAULTS-AND-CASES.md section 3) against `INSPECTION_DESK_BASE_URL=http://127.0.0.1:4310`; stop; then run the same file against the trusted correct service and the three trusted faulty services F1, F2, F3, each with its own fresh data dir. Four starts of the submitted application in total: phase A, the phase A restart, phase B and the regression start.
7. Hook check: run the `PostToolUse` command configured in `.claude/settings.json` with real-shaped payloads (no Claude session needed); rules in `assessment/HOOK-CRITERION.md`.

Steps 4 to 6 run in the sequence `assessment/TEST-CONTRACT.md` publishes (its "Run order" table), on the same port, so the two files state one run order. That table names the individual checks; this section names the phases.

A build or start failure caused by the submitted code is a **failed** check (the build/startup criterion fails, and every check that needs a running app fails with it). **Pending** applies only when the checker itself cannot run: a runner, image, controlled-data or reference-service problem.
