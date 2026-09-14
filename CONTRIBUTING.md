# Contributing during the workshop

1. Confirm `node --version` reports Node 24. Use the frozen starter commit linked from the portal. Fork this repository. Keep the fork's `main` untouched; create a branch such as `workshop/<your-login>`.
2. Run `npm ci`, `npm run prepare:local`, then `npm run check -- --stage baseline`. It must be green
   before you begin; `BASE-02-STRONG` is a diagnostic that is expected to fail on the starter.
3. Open **one** pull request from your branch to this repository's `main` during M1, titled
   `Workshop: <your GitHub login> — report generation`. Fill in the template. Keep the same PR open
   through M6; push at each module boundary. The trainer captures your PR head commit at each boundary.
4. Do not force-push after your first captured commit. Do not edit protected files (see
   `workshop/acceptance.md`, SYS-03). Add tests as new files under `tests/participant/`.
5. Upstream `main` stays fixed during the workshop. Your final review records whether the PR is ready
   to merge; competing solutions are not merged into the shared starter.
6. Use your public GitHub login only. Do not put email addresses, attendance details or personal
   Claude transcripts in the PR or repository.

The public PR check gives feedback. The official result comes from the trainer's private rerun of
the same checks on your captured commit.

Read [the 500-line rule](workshop/rules.md), [published grading](workshop/rubric.md) and [test assessment](workshop/test-assessment.md). Use the verified workshop email for attendance and private feedback; keep it out of the PR.
