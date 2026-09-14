# M6 · Finalize · 10 minutes

An earlier passing result does not establish that the final version works.

Decision: Do current results support readiness, and what remains unresolved?

## Claude Code controls

**Evidence-based review.** Reuse the separate review procedure on the final version. Give each received finding a supported disposition.

**Verified completion.** Accept completion only when current results support it; stop pending workshop work. Run final checks and clear any remaining goal or schedule.

## Do

1. For each received finding, record fixed, accepted as unresolved or disputed, with supporting evidence. Make justified corrections.
2. Reuse /workshop-review with the final spec, plan, diff and results. Explain the final changed-line total and any departure from PLAN.md.
3. Commit code. Run M6 and save its output. Write the M6 readiness entry from that result, then run the separate evidence check and commit the evidence.
4. Push and save M6. Preview/redact the selected workshop exports and attach them privately. Confirm no workshop goal or schedule remains.

## Starting prompt

```text
Use the received reviews and the current SPEC.md and PLAN.md. For each
finding, cite the correction or the evidence for a remaining disagreement.
Reuse /workshop-review with this final version and its check results.
Follow the published M6 order: commit code, run the final checks, write
the evidence entry, validate it, then commit the evidence. Report readiness
only when the required checks support it. Identify remaining failures and
confirm that no workshop goal or scheduled task remains. Do not merge.
```

## Save your work

Final checked version, all feedback dispositions, scope and readiness decision; selected private workshop exports covering M1–M6. No new peer-review round.

Commit and push your continuing PR, then select **Save submission** in the portal. Preview and redact session evidence before attaching it. Keep exports outside the repository; the private evidence route accepts selected excerpts when export or tenant rules prevent collection.

```sh
npm run check -- --stage m6 --json workshop/evidence/m6-check.json
npm run check -- --stage evidence
```

## Published grading

5 method points.

**CC-M6-FEEDBACK · Resolve feedback with evidence · 2 points.**
Evidence: Each received finding marked fixed, unresolved or disputed with supporting evidence.

- Zero: Feedback ignored or dismissed without support.
- Half: Some dispositions are supported but a material finding is unaddressed.
- Full: Each disposition states the action or remaining limitation and cites supporting evidence.

**CC-M6-VERIFY · Verify the final code version · 2 points.**
Evidence: Final hosted checks and the readiness decision at the saved version.

- Zero: Stale checks or a readiness claim contradicted by the results.
- Half: Current results exist but a required result or limitation is omitted.
- Full: Current final results support readiness or explicitly identify unresolved work.

**CC-M6-SCOPE · Explain final scope · 1 points.**
Evidence: Final additions/deletions and changed files compared with PLAN.md.

- Zero: No explanation of the final change.
- Half: The scope is described but a material departure is unexplained.
- Full: The final counted change and any departure from the plan are explained.

Automated checks establish submitted versions, document limits, protected files and executed behavior. File existence or a command invocation alone does not earn method points. Final behavior contributes 40 points once, at M6. See [rules](../rules.md), [acceptance cases](../acceptance.md) and [full rubric](../rubric.md).

## Optional hints

- Record a supported blocker when a required check fails. This can still earn method credit.
- Keep the tested code commit separate from the later evidence commit. The trainer reruns the saved final version; local output cannot override its results.

Hints and unavailable optional features cost no points.
