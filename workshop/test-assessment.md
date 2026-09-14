# Prove what your regression test detects

Add a new Playwright `.spec.ts` file under `tests/participant/`. Use its `request` fixture to call the real local server at `http://127.0.0.1:4190`. Do not mock its response or import the private reference implementation. Supplied Operations requests control failures and scheduling; see the public API tests and helpers.

The required server case is `retry-status`: a newly created retry must return HTTP 202; a repeated request returns HTTP 200 for the same retry. The compatible fault returns 200 even when it creates a retry. Check the response at a direct assertion after reaching the intended failed-attempt state. Add coverage for other retry behavior as time permits.

You may also select a `stuck-recovery` or `stale-error` UI test. The first challenges recovery after generation failure; the second challenges the old error remaining after retry is accepted. Select at most three tests, including the server case.

Create `tests/participant/assessment.json` with your actual file, exact title and assertion line:

```json
{
  "version": 2,
  "tests": [
    {
      "file": "tests/participant/retry.spec.ts",
      "title": "new retry returns an accepted response",
      "fault": "retry-status",
      "assertionLine": 12
    }
  ]
}
```

Run `npx playwright test tests/participant/retry.spec.ts` on your implementation. The hosted isolated checker captures the file hash and runs it unchanged on correct, compatible faulty and your own code. Correct code must pass. Faulty code must fail at the selected behavior assertion. A timeout, import/startup error, unconditional failure, skipped test or expected failure does not establish detection.

The trusted results record all three outcomes. Explain the observed difference and the test’s limits in EVALUATION.md. A test failing both implementations is invalid. An infrastructure failure stays pending. The official application suite remains separate and cannot be changed by your new test.

Your tests and selection JSON count toward the same 500-line cap. Add new files; preserve all supplied tests.
