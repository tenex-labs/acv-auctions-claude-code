# Write a regression test

A regression test checks that a corrected mistake does not return. The starter supplies `tests/participant/follow-up.test.ts`. Use Vitest to check these follow-up behaviors over HTTP:

| Behavior | What to assert |
| --- | --- |
| FU-04 duplicate | Create for one finding → 201; repeat the create → **409**; the inspection's follow-up list still has exactly one record. |
| FU-03 validation | Create with `{"note":"   "}` → **400** and `error.code` `INVALID_NOTE`; the inspection's list is unchanged. |
| FU-07 isolation | After creating on inspection A, the list for a different inspection B remains empty. |

Read the base URL from `process.env.INSPECTION_DESK_BASE_URL` (default `http://127.0.0.1:3000`) and use `fetch`. Exercise the public API without importing application code, mocking it or touching its data files. Use the supplied sample records. Keep the test independent of data left by an earlier run.

`npm run check` builds the current code, starts a fresh local data store and runs the test alongside the other checks. For a separately running application, use `npm run test:participant`.

## Show that the test catches the mistake

1. Run the test on the correct implementation and save the result.
2. In a disposable copy, temporarily make the duplicate branch return 201. Rebuild and restart that copy with fresh state. The same test should fail at its 409 assertion.
3. Restore the code, rebuild and restart with fresh state. The unchanged test should pass again.

Record the commands, actual results and unchanged test hash in [EVALUATION.md](../../workshop/EVALUATION.md). An import error or timeout does not show that the test caught the duplicate behavior.
