# M5 · Evaluate and improve

20 minutes · 10 practice points in the final assessment.

Passing output can hide a weak test or a review procedure that misses its target.

Decision: Does the evidence justify changing the test or review instructions?

Claude Code: Regression tests · skill evaluations · command hooks

## Work

1. Add a direct server-request regression test in tests/participant/. Select its fault, exact title and behavioral assertion in assessment.json. Run it on your code; the hosted checker repeats correct/faulty/own runs.
2. Evaluate the initial review skill on both fixed cases. Check for missed defects and false findings. Retain inputs, settings and actual outputs.
3. Change the instructions only when an observed weakness warrants it. Repeat the same cases/settings, then accept or reject the revision. A supported decision to retain an adequate version is valid.
4. Exercise the prepared hook: relevant edit, actual failure feedback, correction/pass and unrelated action. Record its limits and your measurable completion result in workshop/EVALUATION.md.

## Save

Local regression test/selection, EVALUATION.md within 500 prose words, initial/final skill versions and selected test/review/hook output.

## Prompt

Check SPEC.md with a new direct server-request regression test. Name its intended behavioral assertion and coverage limit; preserve supplied tests. Evaluate the initial workshop-review skill on the fixed clean and faulty packets with identical model/effort and tools. Record actual misses and false findings. Propose a justified instruction change, compare again and accept/reject it, or justify retention. Demonstrate real hook failure, correction/pass and an unrelated action. Finish only when the selected checks and evidence support the stated completion condition; report any blocker.

## Check and grade

`npm run check -- --stage m5`

See the zero/half/full examples in [the rubric](../rubric.md). A command or file alone earns no credit.

<details><summary>Optional hints</summary>

A timeout or startup error is not defect detection. The intended assertion must fail only on the compatible fault.

PostToolUse reports after an action; it does not reverse the edit. The Edit/Write filter does not observe every shell edit.

Use a bounded completion prompt or /goal where available. /loop is an optional read-only demonstration; cancel it. Neither replaces the required evaluations.

</details>
