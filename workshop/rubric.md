# Review skill package assessment

Version `inspection-desk-skill-4.1` · proposed for facilitator review · September 14, 2026.

Submit a ZIP containing one complete skill directory, including SKILL.md and any files it needs. A self-contained SKILL.md is also accepted. Supporting files are optional and earn no points merely for being present. The application and its 500-line limit remain local exercises. The scoring weights are proposed for this workshop.

| Criterion | Points | Units |
| --- | ---: | --- |
| Detects actual defects | 30 | retry, ui-state, variation |
| Avoids unsupported findings on correct changes | 20 | correct |
| Uses accurate, checkable evidence | 15 | correct, retry, ui-state, uncertain, variation |
| Handles missing or conflicting evidence honestly | 15 | uncertain |
| Recommends specific corrections within the requested scope | 10 | retry, ui-state, variation |
| Provides clear, reusable inputs and instructions | 10 | skill |

## Fixed scoring rule

For each criterion, award zero=0, partial=0.5 or full=1 to every listed unit. Multiply the mean of its unit levels by its maximum. Add unrounded criterion points, then round the total to two decimals. All units and all five native case runs must resolve; evaluator failures never count as zero. Latest valid completed submission per participant ranks; a pending replacement suspends the previous rank. Equal totals share competition rank (1,1,3).

Participant omissions in an otherwise completed case are assessed against the criterion examples. Missing runtime inputs, timeouts, malformed grader output, unsupported grader citations or unresolved qualitative disagreement require attention and prevent a final score. Never invent a participant failure to complete a result.

The three defect units ask whether the actual break was found. Evidence asks whether the review supports its decisive claims. Corrections ask whether its proposed change would fix the break. These are distinct questions even when they refer to the same finding. Extra findings on faulty cases affect evidence and correction judgments; the 20-point restraint criterion uses only the correct case. Judge that choice during manual review.

Length, command names, agent count, file existence, generic advice and claims of improvement earn no points. A reference to hooks, Plan Mode or subagents does not establish observed use. Valid JSON is not a correct review. A valid citation location is not proof that the cited text supports the claim.

## Detects actual defects — 30 points

Claude practice: Compare the change with explicit requirements.

Assessed input/output: Actual reviews of the server, UI and changed-path cases.

Automatic checks: Match required units and validate cited excerpts.

Qualitative judgment: Does the finding identify the actual broken behavior and its cause?

- Zero: Misses the retry defect or names an unrelated issue.
- Partial: Identifies the wrong retry response but does not explain the duplicate request condition.
- Full: Explains that a reused retry receives 202 instead of 200, citing the handler and requirement.

Units: retry, ui-state, variation. Use the shared failure rule; retain all prior attempts and corrections. An omission in a successful review is assessed against these examples; a missing evaluator output prevents completion.

## Avoids unsupported findings on correct changes — 20 points

Claude practice: Verify a concern before reporting a defect.

Assessed input/output: Review of the correct change.

Automatic checks: Check that the complete output is retained.

Qualitative judgment: Are reported defects supported? Does the review distinguish limitations from failures?

- Zero: Declares the correct retry mapping broken, or supplies no review.
- Partial: Avoids a false defect but gives only a vague pass without explaining what was checked.
- Full: Explains the correct behavior with evidence and makes no unsupported defect claim.

Units: correct. Use the shared failure rule; retain all prior attempts and corrections. An omission in a successful review is assessed against these examples; a missing evaluator output prevents completion.

## Uses accurate, checkable evidence — 15 points

Claude practice: Inspect sources and connect evidence to claims.

Assessed input/output: Decisive claims and citations in every case output.

Automatic checks: Validate source paths, lines and exact excerpts in grader judgments.

Qualitative judgment: Do the participant references and reasoning support the claim? A real line alone is insufficient.

- Zero: Invents test execution or supplies no checkable support.
- Partial: Uses a relevant source but a decisive claim lacks a clear supporting location or explanation.
- Full: Connects decisive claims to the supplied source or check record, with accurate locations and an explanation of what it proves.

Units: correct, retry, ui-state, uncertain, variation. Use the shared failure rule; retain all prior attempts and corrections. An omission in a successful review is assessed against these examples; a missing evaluator output prevents completion.

## Handles missing or conflicting evidence honestly — 15 points

Claude practice: Separate observed results from assumptions.

Assessed input/output: Review with an absent result and a check from a different revision.

Automatic checks: Check complete input and output records.

Qualitative judgment: Does the review identify both the missing check and stale/conflicting evidence without inventing a result?

- Zero: Claims the submitted revision passes based on the stale report.
- Partial: States that verification is incomplete but misses the revision mismatch or the absent result.
- Full: Names both gaps, withholds a verified-pass claim, and asks for the precise checks on the current revision.

Units: uncertain. Use the shared failure rule; retain all prior attempts and corrections. An omission in a successful review is assessed against these examples; a missing evaluator output prevents completion.

## Recommends specific corrections within the requested scope — 10 points

Claude practice: Turn a verified finding into a bounded change.

Assessed input/output: Correction recommendations in the three faulty cases.

Automatic checks: Require one judgment for each case.

Qualitative judgment: Would the proposed fix address the actual failure without unrelated redesign?

- Zero: No fix, an incorrect fix, or a rewrite outside scope.
- Partial: Suggests the right area but omits the condition or behavior to change.
- Full: Specifies the small condition/state update needed and a relevant follow-up check.

Units: retry, ui-state, variation. Use the shared failure rule; retain all prior attempts and corrections. An omission in a successful review is assessed against these examples; a missing evaluator output prevents completion.

## Provides clear, reusable inputs and instructions — 10 points

Claude practice: Write a skill that works in a fresh Claude Code context.

Assessed input/output: Exact submitted skill package and outputs across the fixed cases.

Automatic checks: Validate package format, paths, complete content, dependencies and actual native invocation separately from scoring.

Qualitative judgment: Can another user identify the required inputs, procedure, output and limits, including a changed path?

- Zero: No usable review procedure, or depends on an unavailable private conversation.
- Partial: Useful procedure with an ambiguous input or output; still tied to one example.
- Full: Clear target/specification/diff/check inputs, repeatable review steps and output/limit instructions that work with the supplied package beyond the example. Optional files are neither required nor rewarded.

Units: skill. Use the shared failure rule; retain all prior attempts and corrections. An omission in a successful review is assessed against these examples; a missing evaluator output prevents completion.

## Worked arithmetic examples

These illustrate arithmetic, not actual scores or approved judgments.

| Example | Calculation | Total |
| --- | --- | ---: |
| All units full | 30 + 20 + 15 + 15 + 10 + 10 | 100 |
| Detection full/partial/zero; all others full | 30 × (1 + 0.5 + 0)/3 + 70 | 85 |
| One correction partial; all others full | 90 + 10 × (1 + 1 + 0.5)/3 | 98.33 |
| One native case times out | No final score; needs attention | — |

Earlier example-specific partial-credit decisions do not approve this rubric. The public case categories and aggregation stay fixed for all participants; private answer keys remain with the trainer.
