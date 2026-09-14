# M4 · Implement · 30 minutes

A separate reviewer cannot use evidence left only in the main conversation.

Decision: Does the review conclusion justify a correction or acceptance?

## Claude Code controls

**Reusable skills.** A skill stores a procedure that can be invoked again. Use /workshop-review with a saved context file.

**Separate review context.** context: fork gives the review its own conversation; it does not inherit the main history. Supply the spec, plan, saved diff, commit and actual check output.

**Session continuation.** Reference agreed files when restarting; /compact can shorten a continuing conversation. Preserve the approved plan and current failures when context changes.

## Do

1. Approve the plan and leave Plan Mode. Implement increment A, run its planned checks, then implement and check increment B. Keep the supplied hook enabled.
2. Save each increment’s commit and output. Stay within 500 added plus deleted code lines, including tests, styles and helpers.
3. Run /workshop-review with the actual spec, plan, diff, commit and results. Verify one finding or supported pass and record your decision.
4. Commit, push and save M4. Review the assigned implementation for five minutes, using its fixed version and available checks.

## Starting prompt

```text
Implement the approved increments from SPEC.md and PLAN.md. Run the planned
check after each increment and show its output. Preserve the supplied
services, fixtures, checks and dependencies. Before extending the scope,
stop and explain the required change. Run /workshop-review with explicit
spec, plan, target version, diff and results. Report one finding or supported
pass that I can verify against the code or application.
```

## Save your work

Both implementation increments, check output and verified skill-review conclusion; outgoing PR review. Attach the skill’s supplied context, response and your verification privately.

Commit and push your continuing PR, then select **Save submission** in the portal. Preview and redact session evidence before attaching it. Keep exports outside the repository; the private evidence route accepts selected excerpts when export or tenant rules prevent collection.

```sh
npm run check -- --stage m4
```

## Published grading

5 method points and 6 review points.

**CC-M4-CONTEXT · Supply explicit review context · 2 points.**
Evidence: Skill invocation and the exact spec, diff, target version and results supplied.

- Zero: Bare skill invocation.
- Half: Useful files supplied but a material input is missing.
- Full: The separate review receives the target version and all evidence needed for its bounded question.

**CC-M4-VERIFY · Verify a review conclusion · 2 points.**
Evidence: Skill finding or supported pass and independent verification.

- Zero: Unverified praise or criticism.
- Half: A useful conclusion is checked incompletely.
- Full: The engineer verifies the conclusion against code or executed behavior and responds accordingly.

**CC-M4-SCOPE · Control implementation scope · 1 points.**
Evidence: Two increments and an explanation of changed files or deviations.

- Zero: Unexplained unrelated edits.
- Half: The change mostly follows the plan but a deviation is unexplained.
- Full: Both increments follow the agreed scope or explain necessary deviations with evidence.

**REV-M4-VALIDITY · Reach a supported verdict · 2 points.**
Evidence: Verdict on the assigned implementation: failure/retry behavior against the specification.

- Zero: Invented defect or unsupported pass.
- Half: A useful conclusion is only partly established.
- Full: A verified defect or supported pass accurately reflects the assigned case.

**REV-M4-EVIDENCE · Cite the assigned version · 2 points.**
Evidence: Exact assigned commit, source locations and relevant implementation evidence.

- Zero: No evidence or the wrong saved version.
- Half: Relevant evidence leaves a material part of the claim unverified.
- Full: Reproducible evidence at the assigned version establishes the claim.

**REV-M4-USEFULNESS · Give a bounded correction or limitation · 2 points.**
Evidence: Specific next change/check, or the stated limits of a supported pass.

- Zero: Generic criticism or praise.
- Half: A useful direction lacks a concrete change/check or limit.
- Full: The author receives a bounded correction or a precise limit on supported acceptance.

Automated checks establish submitted versions, document limits, protected files and executed behavior. File existence or a command invocation alone does not earn method points. Final behavior contributes 40 points once, at M6. See [rules](../rules.md), [acceptance cases](../acceptance.md) and [full rubric](../rubric.md).

## Optional hints

- Treat the reviewer as someone who has never seen the conversation.
- Supply SPEC.md, PLAN.md, the saved diff and current results through workshop/evidence/review-context.md. The prepared reviewer reads evidence; run checks in the main session.

Hints and unavailable optional features cost no points.
