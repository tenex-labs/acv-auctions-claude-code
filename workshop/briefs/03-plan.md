# M3 · Plan · 25 minutes

A broad plan can replace working behavior before the engineer understands it.

Decision: Which existing service behavior should the plan reuse?

## Claude Code controls

**Plan Mode.** Inspect and agree on the approach before authorizing implementation. Plan both increments while leaving application code unchanged.

**Subagent context.** A delegated agent receives its own instructions and supplied context. Ask report-investigator one question about preserved report data.

**Tool and model limits.** Inspect the agent’s configured tools and model; a read-only request alone is not a permission limit. The prepared agent can Read, Grep and Glob; it cannot edit or run shell commands.

## Do

1. Enter Plan Mode. Use the reviewed SPEC.md to plan two increments completed in M4.
2. Inspect report-investigator’s tools/model. Assign one question with relevant paths and required citations.
3. Open a returned source citation and check the finding before using it. Write PLAN.md in at most 400 words, with files, checks and a code/test/automation estimate within 500 changed lines.
4. Commit, push and save M3. Review the assigned plan for four minutes. Keep application code unchanged until you approve implementation.

## Starting prompt

```text
Use the reviewed SPEC.md to plan two implementation increments. Do not edit
application code. Give the prepared read-only investigator this question:
which existing service behavior already preserves report data during retry?
Provide the relevant files and require cited findings. Bring its result
back for verification. Draft PLAN.md with files, checks, dependencies and
an additions-plus-deletions estimate including tests and helpers within
500 lines. Keep the plan within 400 words. Wait for implementation approval.
```

## Save your work

PLAN.md, delegated question, checked finding and effect on the plan; outgoing plan review. Attach the delegation and verification privately.

Commit and push your continuing PR, then select **Save submission** in the portal. Preview and redact session evidence before attaching it. Keep exports outside the repository; the private evidence route accepts selected excerpts when export or tenant rules prevent collection.

```sh
npm run check -- --stage m3
```

## Published grading

10 method points and 4 review points.

**CC-M3-PLAN · Plan two bounded increments · 4 points.**
Evidence: PLAN.md connects the reviewed spec to files and two implementation increments.

- Zero: Unbounded rewrite or a task list unrelated to the spec.
- Half: Two increments exist but a material dependency or acceptance path is missing.
- Full: Both increments follow the spec, reuse existing behavior and name their affected files.

**CC-M3-DELEGATION · Choose suitable delegation and tools · 2 points.**
Evidence: A narrow subagent question, supplied context and inspected tool/model configuration.

- Zero: Only an invocation or unrestricted request to build everything.
- Half: The question is bounded but tool/context/model suitability is unexplained.
- Full: An independent question uses suitable context, tools and approved model settings.

**CC-M3-VERIFY · Check delegated evidence · 2 points.**
Evidence: Returned finding, cited source and the engineer’s checked decision.

- Zero: Claude’s conclusion accepted without checking it.
- Half: A citation is inspected but the claimed relationship is not established.
- Full: Source evidence supports a correction, rejection or acceptance and informs the plan.

**CC-M3-CHECKS · Plan checks and estimate change size · 2 points.**
Evidence: Each increment’s checks and a cumulative code estimate including tests and helpers.

- Zero: “Run tests” with no mapping or estimate.
- Half: A useful check map or estimate omits part of the change.
- Full: Checks cover the planned behavior and the estimate includes counted code within 500 lines.

**REV-M3-VALIDITY · Reach a supported verdict · 2 points.**
Evidence: Verdict on the assigned plan: files, checks and one acceptance path.

- Zero: Invented defect or unsupported pass.
- Half: A useful conclusion is only partly established.
- Full: A verified defect or supported pass accurately reflects the assigned case.

**REV-M3-EVIDENCE · Cite the assigned version · 1 points.**
Evidence: Exact assigned commit, source locations and relevant plan evidence.

- Zero: No evidence or the wrong saved version.
- Half: Relevant evidence leaves a material part of the claim unverified.
- Full: Reproducible evidence at the assigned version establishes the claim.

**REV-M3-USEFULNESS · Give a bounded correction or limitation · 1 points.**
Evidence: Specific next change/check, or the stated limits of a supported pass.

- Zero: Generic criticism or praise.
- Half: A useful direction lacks a concrete change/check or limit.
- Full: The author receives a bounded correction or a precise limit on supported acceptance.

Automated checks establish submitted versions, document limits, protected files and executed behavior. File existence or a command invocation alone does not earn method points. Final behavior contributes 40 points once, at M6. See [rules](../rules.md), [acceptance cases](../acceptance.md) and [full rubric](../rubric.md).

## Optional hints

- Inspect reportJobs before proposing replacement work.
- Give the subagent the preservation question, then verify one cited source yourself. Map every acceptance case to an increment, file and check.

Hints and unavailable optional features cost no points.
