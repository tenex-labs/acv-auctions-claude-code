# Show what your regression test catches

Add your test in a new file under `tests/participant/`. Use the published UI/API behavior and supplied helpers. Keep supplied tests unchanged. Your test code counts toward the 500-line limit.

Choose **stuck recovery** or **stale error**. After the application reaches an observable state, assert the behavior that should differ on the faulty copy. Identify that assertion's line. A timeout, import error or startup failure does not demonstrate detection.

In `tests/participant/assessment.json`, select one to three exact test titles:

```json
{
  "version": 1,
  "tests": [
    {
      "file": "tests/participant/recovery.spec.ts",
      "title": "your exact test title",
      "fault": "stuck-recovery",
      "assertionLine": 12
    }
  ]
}
```

Use `stale-error` for a test of the old error remaining during retry. Replace the example file, title and line with your actual test. Run it on your code:

```sh
npx playwright test tests/participant/recovery.spec.ts
```

The trainer captures the file and its hash, then runs it unchanged on a correct implementation, a compatible faulty implementation and your submitted implementation in the isolated checker. The correct copy must pass. The faulty copy must fail at your selected behavioral assertion. The result also reports whether your own implementation passed.

Do not use skipped tests, expected failures or retries to demonstrate detection. Tests must exercise behavior available to both valid implementations; they cannot depend on the private reference's internal variables or layout choices.

M5 method credit also requires explaining the weak test's omission and your new test's limits. An unavailable checker result remains pending. A review may state that limitation without inventing a defect.
