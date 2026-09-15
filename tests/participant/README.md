# Participant regression test (15 points) — published requirement

Write one Vitest file under `tests/participant/` (the starter supplies the skeleton `tests/participant/follow-up.test.ts`) that checks the follow-up API over HTTP only. It must assert these three published behaviors, each in its own `test(...)`:

| Behavior | What to assert | Fault it catches |
| --- | --- | --- |
| FU-04 duplicate | create for one finding → 201; the identical create again → **409**; `GET /api/inspections/<id>/follow-ups` has exactly one record | F1 |
| FU-03 validation | create with `{"note":"   "}` → **400** with `error.code` `INVALID_NOTE`; the list for that inspection is unchanged | F2 |
| FU-07 isolation | after creating on inspection A, `GET /api/inspections/<B>/follow-ups` → `[]` for a different inspection B (both from the sample data) | F3 |

Rules:

- Read the base URL from `process.env.INSPECTION_DESK_BASE_URL` (default `http://127.0.0.1:3000`); use the global `fetch`. Do not import application code. Do not mock. Do not touch the data directory.
- Sample data only (`data/`), for example `insp-002` / `finding-004` and `insp-001` / `finding-001`. The checker gives every run a fresh, empty follow-up store. Create at most 10 follow-ups and use a distinctive note text.
- The file must pass on your application and on the trusted correct service; it must fail with an assertion error on each faulty service it is meant to catch. A test that never fails (weak assertions) or fails everywhere (wrong URL, typo) earns nothing.
- Declare it in `tests/participant/assessment.json`:

```json
{ "version": 1, "regressionTest": "tests/participant/follow-up.test.ts" }
```

How the checker runs it — five runs of the same file, with the same command and the checker's bundled Vitest configuration (no server start, no setup files), reporting as JSON:

| Run | `INSPECTION_DESK_BASE_URL` points at | Required result |
| --- | --- | --- |
| 1 | the participant's built app (sample data, fresh data dir) | all tests pass |
| 2 | the trusted reference service (sample data, fresh data dir) | all tests pass |
| 3 | the trusted reference with **F1** applied (fresh data dir) | at least one test fails with an assertion error |
| 4 | the trusted reference with **F2** applied | same |
| 5 | the trusted reference with **F3** applied | same |

Points (proposed for the assessment worker): runs 1 and 2 are a gate (either failing → 0). Then 5 points for each of runs 3, 4, 5 that fails with an assertion error (15 maximum). Partial credit therefore comes only from independent faulty services, never from participant-reported results.

Local rehearsal for participants (`workshop/EVALUATION.md`): `npm run start` in one terminal, `npm run test:participant` in another → pass; introduce your own temporary fault (return 201 from your duplicate branch) → the FU-04 test fails at its 409 assertion; restore → pass. Record the three results.

