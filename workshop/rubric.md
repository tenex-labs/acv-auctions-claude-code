# How your work earns points

Contract `inspection-desk-2.0`. Each item earns zero, half or full points. A judgment must cite the saved artifact or private session passage and explain the awarded level. File creation and command invocation alone do not establish understanding.

Final behavior earns 40 points; Claude Code method earns 40; outgoing reviews earn 20. Earlier behavior runs show progress and are not added to the final score.

## Final behavior

| Case | Points | Required result |
| --- | ---: | --- |
| AC-01 | 6 | Progress; every published assertion passes. |
| AC-02 | 6 | One active run; every published assertion passes. |
| AC-03 | 8 | Correct result; every published assertion passes. |
| AC-04 | 6 | Failure recovery; every published assertion passes. |
| AC-05 | 6 | Safe retry; every published assertion passes. |
| AC-06 | 8 | Preserved results and inspection separation; every published assertion passes. |

## Claude Code method

### M1 · Inspect — 5 points

**CC-M1-CONTEXT · Select relevant context · 1 points**

Evidence: Selected project instructions and source references, with the reason they matter.

- Zero: A list of files with no connection to the failure.
- Half: Relevant source supplied, but its role is unexplained.
- Full: The report entry point and applicable instructions are connected to the observed failure.

**CC-M1-CHOICE · Justify model and effort · 1 points**

Evidence: The approved model/effort used, the task need and a checked result.

- Zero: Only a model name or screenshot.
- Half: A task-based choice without checking the result.
- Full: The choice is justified and its result checked; any limit or need to change is explained.

**CC-M1-DIAGNOSIS · Verify the diagnosis · 3 points**

Evidence: Reproduction, Claude’s diagnosis and the engineer’s source or UI verification.

- Zero: An unsupported cause or no reproduction.
- Half: The failure is reproduced but the cited cause is not fully checked.
- Full: The observed failure is traced to code and the weak test’s missing recovery assertion is explained.

### M2 · Specify — 10 points

**CC-M2-CLARIFY · Resolve a consequential ambiguity · 3 points**

Evidence: Question, shared product answer and the resulting requirement.

- Zero: “Make retry robust” with no checked clarification.
- Half: A meaningful question is answered but its effect on the spec is unclear.
- Full: A product answer resolves an ambiguity and changes an observable requirement.

**CC-M2-ACCEPTANCE · Specify observable behavior · 4 points**

Evidence: SPEC.md covers AC-01–06, including status lookup and recovery.

- Zero: Acceptance IDs without observable outcomes.
- Half: Useful cases omit a required outcome or failure case.
- Full: Cases identify inputs/actions and observable outcomes for every published behavior.

**CC-M2-BOUNDARIES · Preserve behavior and limit scope · 3 points**

Evidence: Report contents, retry data, service reuse and exclusions in SPEC.md.

- Zero: No supported preservation or scope rules.
- Half: Some boundaries are explicit but a material rule is missing.
- Full: Required contents and original retry data are preserved; service ownership and exclusions are explicit.

### M3 · Plan — 10 points

**CC-M3-PLAN · Plan two bounded increments · 4 points**

Evidence: PLAN.md connects the reviewed spec to files and two implementation increments.

- Zero: Unbounded rewrite or a task list unrelated to the spec.
- Half: Two increments exist but a material dependency or acceptance path is missing.
- Full: Both increments follow the spec, reuse existing behavior and name their affected files.

**CC-M3-DELEGATION · Choose suitable delegation and tools · 2 points**

Evidence: A narrow subagent question, supplied context and inspected tool/model configuration.

- Zero: Only an invocation or unrestricted request to build everything.
- Half: The question is bounded but tool/context/model suitability is unexplained.
- Full: An independent question uses suitable context, tools and approved model settings.

**CC-M3-VERIFY · Check delegated evidence · 2 points**

Evidence: Returned finding, cited source and the engineer’s checked decision.

- Zero: Claude’s conclusion accepted without checking it.
- Half: A citation is inspected but the claimed relationship is not established.
- Full: Source evidence supports a correction, rejection or acceptance and informs the plan.

**CC-M3-CHECKS · Plan checks and estimate change size · 2 points**

Evidence: Each increment’s checks and a cumulative code estimate including tests and helpers.

- Zero: “Run tests” with no mapping or estimate.
- Half: A useful check map or estimate omits part of the change.
- Full: Checks cover the planned behavior and the estimate includes counted code within 500 lines.

### M4 · Implement — 5 points

**CC-M4-CONTEXT · Supply explicit review context · 2 points**

Evidence: Skill invocation and the exact spec, diff, target version and results supplied.

- Zero: Bare skill invocation.
- Half: Useful files supplied but a material input is missing.
- Full: The separate review receives the target version and all evidence needed for its bounded question.

**CC-M4-VERIFY · Verify a review conclusion · 2 points**

Evidence: Skill finding or supported pass and independent verification.

- Zero: Unverified praise or criticism.
- Half: A useful conclusion is checked incompletely.
- Full: The engineer verifies the conclusion against code or executed behavior and responds accordingly.

**CC-M4-SCOPE · Control implementation scope · 1 points**

Evidence: Two increments and an explanation of changed files or deviations.

- Zero: Unexplained unrelated edits.
- Half: The change mostly follows the plan but a deviation is unexplained.
- Full: Both increments follow the agreed scope or explain necessary deviations with evidence.

### M5 · Verify — 5 points

**CC-M5-TEST · Demonstrate regression-test strength · 2 points**

Evidence: Trusted test results on correct, faulty and own implementations; intended assertion and file hash.

- Zero: Failure is an import/startup error, timeout, or occurs on the correct implementation.
- Half: The test distinguishes correct and faulty behavior but its coverage limit is unexplained.
- Full: The unchanged test passes correct behavior, fails the intended faulty assertion, and its own-result and limits are explained.

**CC-M5-HOOK · Interpret hook feedback accurately · 1 points**

Evidence: Relevant invocation, failure output, correction/pass and unrelated-action check; coverage limit, or the approved equivalent packet.

- Zero: Claim that PostToolUse undoes an edit or proves all behavior.
- Half: Relevant hook output without explaining its effect or limit.
- Full: The engineer shows relevant invocation, failure, correction/pass and an unrelated-action check, and explains what behavioral checks remain.

**CC-M5-COMPLETE · Use a measurable completion condition · 2 points**

Evidence: Saved launch prompt with current spec/plan, scope, completion/stopping conditions; current results, justified interventions and cleared unfinished work.

- Zero: Claude says done without current checks.
- Half: A bounded condition is present but the conclusion omits a required result.
- Full: The bounded launch request and current results support completion or a blocker; justified interventions and cancellation are recorded.

### M6 · Finalize — 5 points

**CC-M6-FEEDBACK · Resolve feedback with evidence · 2 points**

Evidence: Each received finding marked fixed, unresolved or disputed with supporting evidence.

- Zero: Feedback ignored or dismissed without support.
- Half: Some dispositions are supported but a material finding is unaddressed.
- Full: Each disposition states the action or remaining limitation and cites supporting evidence.

**CC-M6-VERIFY · Verify the final code version · 2 points**

Evidence: Final hosted checks and the readiness decision at the saved version.

- Zero: Stale checks or a readiness claim contradicted by the results.
- Half: Current results exist but a required result or limitation is omitted.
- Full: Current final results support readiness or explicitly identify unresolved work.

**CC-M6-SCOPE · Explain final scope · 1 points**

Evidence: Final additions/deletions and changed files compared with PLAN.md.

- Zero: No explanation of the final change.
- Half: The scope is described but a material departure is unexplained.
- Full: The final counted change and any departure from the plan are explained.

## Outgoing reviews

### M2 · Specify — 4 points

**REV-M2-VALIDITY · Reach a supported verdict · 2 points**

Evidence: Verdict on the assigned specification: retry requirements and preserved data.

- Zero: Invented defect or unsupported pass.
- Half: A useful conclusion is only partly established.
- Full: A verified defect or supported pass accurately reflects the assigned case.

**REV-M2-EVIDENCE · Cite the assigned version · 1 points**

Evidence: Exact assigned commit, source locations and relevant specification evidence.

- Zero: No evidence or the wrong saved version.
- Half: Relevant evidence leaves a material part of the claim unverified.
- Full: Reproducible evidence at the assigned version establishes the claim.

**REV-M2-USEFULNESS · Give a bounded correction or limitation · 1 points**

Evidence: Specific next change/check, or the stated limits of a supported pass.

- Zero: Generic criticism or praise.
- Half: A useful direction lacks a concrete change/check or limit.
- Full: The author receives a bounded correction or a precise limit on supported acceptance.

### M3 · Plan — 4 points

**REV-M3-VALIDITY · Reach a supported verdict · 2 points**

Evidence: Verdict on the assigned plan: files, checks and one acceptance path.

- Zero: Invented defect or unsupported pass.
- Half: A useful conclusion is only partly established.
- Full: A verified defect or supported pass accurately reflects the assigned case.

**REV-M3-EVIDENCE · Cite the assigned version · 1 points**

Evidence: Exact assigned commit, source locations and relevant plan evidence.

- Zero: No evidence or the wrong saved version.
- Half: Relevant evidence leaves a material part of the claim unverified.
- Full: Reproducible evidence at the assigned version establishes the claim.

**REV-M3-USEFULNESS · Give a bounded correction or limitation · 1 points**

Evidence: Specific next change/check, or the stated limits of a supported pass.

- Zero: Generic criticism or praise.
- Half: A useful direction lacks a concrete change/check or limit.
- Full: The author receives a bounded correction or a precise limit on supported acceptance.

### M4 · Implement — 6 points

**REV-M4-VALIDITY · Reach a supported verdict · 2 points**

Evidence: Verdict on the assigned implementation: failure/retry behavior against the specification.

- Zero: Invented defect or unsupported pass.
- Half: A useful conclusion is only partly established.
- Full: A verified defect or supported pass accurately reflects the assigned case.

**REV-M4-EVIDENCE · Cite the assigned version · 2 points**

Evidence: Exact assigned commit, source locations and relevant implementation evidence.

- Zero: No evidence or the wrong saved version.
- Half: Relevant evidence leaves a material part of the claim unverified.
- Full: Reproducible evidence at the assigned version establishes the claim.

**REV-M4-USEFULNESS · Give a bounded correction or limitation · 2 points**

Evidence: Specific next change/check, or the stated limits of a supported pass.

- Zero: Generic criticism or praise.
- Half: A useful direction lacks a concrete change/check or limit.
- Full: The author receives a bounded correction or a precise limit on supported acceptance.

### M5 · Verify — 6 points

**REV-M5-VALIDITY · Reach a supported verdict · 2 points**

Evidence: Verdict on the assigned test suite: assertion and trusted correct/faulty test results.

- Zero: Invented defect or unsupported pass.
- Half: A useful conclusion is only partly established.
- Full: A verified defect or supported pass accurately reflects the assigned case.

**REV-M5-EVIDENCE · Cite the assigned version · 2 points**

Evidence: Exact assigned commit, source locations and relevant test suite evidence.

- Zero: No evidence or the wrong saved version.
- Half: Relevant evidence leaves a material part of the claim unverified.
- Full: Reproducible evidence at the assigned version establishes the claim.

**REV-M5-USEFULNESS · Give a bounded correction or limitation · 2 points**

Evidence: Specific next change/check, or the stated limits of a supported pass.

- Zero: Generic criticism or praise.
- Half: A useful direction lacks a concrete change/check or limit.
- Full: The author receives a bounded correction or a precise limit on supported acceptance.

## Eligibility and pending results

Every required final behavior and system check must pass, the final change must meet the 500-line rule, method points must reach 20/40 and all grading must be resolved. Highest eligible total wins; ties share a place. Attendance, speed, spend, command count and code volume earn no points. A service failure stays pending.

A supported pass can earn full review credit. Review the assigned saved version. Peers report findings; the trainer calculates official points. Unavailable optional Claude Code features use the published equivalent evidence route without a points penalty.

The workshop score describes submitted evidence. It is not an employment assessment or certification.
