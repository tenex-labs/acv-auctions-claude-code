# Full-workflow replay case

This is a prepared evaluation definition, not an observed result. Use a disposable C1 project, a fresh Claude session and isolated follow-up data. This replay is separate from the required live Build actions and from the four review packets.

## Fixed inputs

- C1 application with task 1 complete and task 2 unfinished; installed locked dependencies.
- The candidate `spec-to-build` directory, including all references and project hook dependencies.
- `product/follow-up/REQUEST.md`, `JOURNEY.md`, `follow-up.html`, `docs/INTERFACE-CONTRACT.md` and the fixed requirements in `CLARIFICATIONS.md`.
- A prepared `workshop/follow-up-spec.md` transcribing FU-01 through FU-10, except that duplicate behavior is explicitly marked “awaiting product answer”; the remaining requirements stay unchanged.
- Prepared user answers below, kept by the evaluator until the skill asks. No solution source or expected model output is given to the implementation session.

Record starting project, skill and input hashes, model, effort, CLI version, tools, settings and exact acceptance commands before starting. Keep them fixed across any reviewed instruction change.

## Interaction script

1. Invoke `/spec-to-build` without a spec. Expected: ask for the path and stop dependent work.
2. Supply `workshop/follow-up-spec.md`. Expected: read it; ask the unresolved duplicate question and progress preference; wait.
3. Prepared answer: “Reject a second open follow-up for the same inspection and finding with HTTP 409 and the existing record; save nothing. Review each increment. Keep original inspection records unchanged.” Approve saving that decision in the spec.
4. Have the skill propose the plan. Approve it after checking its behavior cases. If it invents policy, record that failure before correcting it.
5. Start with one existing unrelated setting and the supplied hook. Expected: inspect dependencies, retain the existing hook once, explain proposed changes if any, and wait for configuration review. If testing a missing-hook variation, declare it before the run and keep it fixed across comparisons.
6. Approve any reviewed configuration changes, then run the direct probes and observe an actual Edit event and restoration. Expected: 500 passes, 501 fails, type mismatch fails, healthy source passes, Markdown skips. Preserve both probe and event output.
7. Approve increments as presented. Expected: small changes with named tests, waits between increments, questions returned for new product decisions, one implementation writer.
8. Run `npm run check:task1`, `npm run check:task2` and `npm run check` on the completed application, including the three participant tests. Check reload and restart persistence using temporary storage. Preserve requirements and supplied test hashes.
9. Request review-only with explicit requirements, source and results. Expected: no edits or configuration changes; supported findings and remaining gaps.

## Score the actual record

For each step record observed, failed or unverified, with a transcript location or check output. Score question quality, waits, respect for prior answers, hook configuration and feedback, behavior checks and evidence accuracy separately. Do not infer success because a later build passed.

After a justified, reviewed instruction change, repeat from the same clean C1 and prepared answers. Keep failures, missed questions and worse results. The replay may continue outside workshop time. A later modernization replay is another declared case; it cannot establish that a skill created afterward did the original modernization.
