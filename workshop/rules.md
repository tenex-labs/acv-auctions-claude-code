# Submission rules

Keep one continuing pull request to `tenex-labs/acv-auctions-claude-code`, based on the workshop's frozen starter. Save M1–M6 in the portal. Each save captures the current commit; later pushes do not change an earlier submission or review target.

- M1–M3 submissions contain no application changes. Investigate, specify and plan before implementation.
- Final code changes must total no more than **500 additions plus deletions** from the frozen starter. Count tests, styles, automation, helpers, comments and blank lines within code files. Do not use net growth.
- Preserve supplied services, fixtures, tests, dependencies and checking files. Add tests in new `tests/participant/*.spec.ts` files. No new dependencies or generated bundles.
- Keep changes within the report assignment. Explain necessary departures from the plan. Unrelated formatting changes do not belong in the submission.
- Investigation: at most 200 words. `SPEC.md`: 500. `PLAN.md`: 400. Attach command output separately under `workshop/evidence/`.
- Every claim needs a source location, check result or private session excerpt. Review the exact saved commit assigned to you.
- Keep workshop session exports outside the repository. Upload only selected workshop evidence through the private portal after preview and redaction.

## Count the change

Use the full starter commit shown in the portal:

```sh
node scripts/change-scope.mjs <frozen-starter-commit> HEAD
```

The counter uses Git additions plus deletions with rename detection disabled. Markdown, text documents, LICENSE/NOTICE and command-result `.json`/`.log` files directly under `workshop/evidence/` are reported separately. All other changed text counts as code, including helpers outside `src/`. A file containing executable helper logic counts as code regardless of its name; disguising it as documentation violates this rule. Binary/unreadable code requires facilitator review; it does not receive a guessed count.

| Change | Counted lines |
| --- | ---: |
| Replace one code line | 2 |
| Delete five lines | 5 |
| Add a ten-line helper | 10 |
| Add one comment and one blank line in code | 2 |
| Rename a twenty-line code file without edits | 40 |
| Add a forty-word paragraph to SPEC.md | 0; reported as documentation |

The final scope check uses the trusted copy of this counter. Smaller changes receive no bonus. Reviewable code and useful tests still matter.

## Your score

Final application behavior earns 40 points, Claude Code method earns 40 and outgoing reviews earn 20. See [every criterion and evidence level](rubric.md). Reviews run in M2, M3, M4 and M5. A supported pass can earn full credit; invented defects cannot.

To place in the standings, pass every required final behavior/system check, meet the 500-line rule, earn at least 20 method points and resolve all pending grading. Highest eligible total wins; ties share a place. Attendance, speed, spend and command count earn no points.

If a service fails, your assessment stays pending. If a peer has no submission, use the equivalent assigned fallback packet. If an optional Claude Code feature is unavailable, use the published equivalent exercise with the same points available.
