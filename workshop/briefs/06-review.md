# M6 · Final review and submit

10 minutes · 5 practice points in the final assessment.

A final claim is only useful when it describes the code version actually submitted.

Decision: Is this version ready, and can another engineer trace the change and repeat the review?

Claude Code: Final review · current verification · reproducible handoff

## Work

1. Use the review skill on the final change. Fix, accept as unresolved or dispute findings with evidence. Stop remaining delegated work.
2. Complete workshop/FINAL.md within 300 words and check all required public documents and instruction files. Commit the final public work.
3. Run final checks on the clean commit into .workshop-private/final-checks.json. Push and open one PR. If public files change, commit and rerun.
4. Export only selected workshop sessions, supplement missing tool results, preview/redact and submit the PR with one private packet. Confirm the suggested evidence index and missing-field note.

## Save

One final PR and one private packet, bound to the same commit. Corrections preserve the earlier receipt.

## Prompt

Review the final change against SPEC.md using the shared review skill. Verify findings and record supported dispositions, scope, readiness, usage/version notes and limits in workshop/FINAL.md. Finish public files before committing. Then run final checks on that clean version with output in ignored .workshop-private/. Report the actual commit and results privately. Stop unfinished delegated work. Do not claim readiness from stale checks.

## Check and grade

`npm run check -- --stage m6 --json .workshop-private/final-checks.json`

See the zero/half/full examples in [the rubric](../rubric.md). A command or file alone earns no credit.

<details><summary>Optional hints</summary>

Do not write a document that requires its own future SHA. Commit public work before running final checks into ignored storage.

If grading is pending at closing, your receipt remains available. Final results and approved feedback are released after assessment resolves; no delivery deadline has been agreed.

</details>
