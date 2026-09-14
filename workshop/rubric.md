# Published grading criteria

One final assessment: 40 behavior + 60 Claude Code practice = 100 points. No peer, attendance, speed or command-count points.

All required final checks must pass; the change must fit 500 code lines; practice must reach 30/60; no grade may remain pending. Ties share a place.

## Application behavior — 40 points

- AC-01 · Progress: 6 points. Applicable direct server and browser assertions must all pass.
- AC-02 · One active attempt: 6 points. Applicable direct server and browser assertions must all pass.
- AC-03 · Correct report: 8 points. Applicable direct server and browser assertions must all pass.
- AC-04 · Failure and status-lookup recovery: 6 points. Applicable direct server and browser assertions must all pass.
- AC-05 · Safe retry: 6 points. Applicable direct server and browser assertions must all pass.
- AC-06 · Preserved contents and inspection separation: 8 points. Applicable direct server and browser assertions must all pass.

## WF-M1-CONTEXT · Context, instructions and diagnosis — 5 points

Evidence: INVESTIGATION.md, applicable project instructions and selected session evidence.

- Complete (5): Relevant inputs and instructions are used to verify a prototype/app discrepancy; the model/effort decision and its observed limit or result are explained.
- Partial (2.5): A real discrepancy and relevant inputs are identified, but instruction use or the diagnosis is not fully checked.
- Unsupported (0): Only file/model names or an unsupported diagnosis.

## WF-M2-CLARIFY · Resolve a consequential ambiguity — 4 points

Evidence: The product question, shared answer and resulting SPEC.md requirement.

- Complete (4): A supported product answer changes an observable requirement, such as retrying the original snapshot.
- Partial (2): A meaningful question and answer exist, but the change to the requirement is unclear.
- Unsupported (0): A generic request for robustness with no resolved decision.

## WF-M2-ACCEPTANCE · Specify observable behavior — 4 points

Evidence: SPEC.md and its journey/AC-01–06 mapping.

- Complete (4): Actions, inputs and observable outcomes cover all published cases, including failed status lookup and recovery.
- Partial (2): Useful cases omit a required outcome.
- Unsupported (0): Acceptance IDs or prototype screenshots without observable requirements.

## WF-M2-SCOPE · Define preservation and exclusions — 2 points

Evidence: SPEC.md boundaries and cited existing service behavior.

- Complete (2): Original report contents and retry data are preserved; existing service ownership and excluded work are explicit.
- Partial (1): Some preservation or scope rules are stated but a material boundary is missing.
- Unsupported (0): An unbounded rewrite or no supported preservation rules.

## WF-M3-PLAN · Plan checked increments — 4 points

Evidence: PLAN.md files, two increments, check mapping and additions/deletions estimate.

- Complete (4): Server handlers/direct request checks precede UI integration/browser checks; both increments follow the spec and estimate all counted code within 500 lines.
- Partial (2): A useful plan omits one material dependency, check or counted change.
- Unsupported (0): A task list without a bounded implementation or verification path.

## WF-M3-ASSIGN · Define the two agent assignments — 4 points

Evidence: Prepared specialist configurations and actual assignment prompts.

- Complete (4): Each independent investigation has relevant inputs, a narrow question, suitable tools/model, expected evidence and stopping conditions.
- Partial (2): The tasks are bounded but one lacks a necessary input, capability restriction or return requirement.
- Unsupported (0): Only agent invocation, agent count or an unrestricted instruction to build everything.

## WF-M3-COORDINATE · Combine work in the right order — 4 points

Evidence: Returned findings and the main session synthesis reflected in PLAN.md.

- Complete (4): Independent investigations run concurrently where permitted; dependencies are ordered and overlapping or conflicting findings are reconciled. A documented access fallback is equivalent.
- Partial (2): Both findings return, but their dependencies or a meaningful overlap are not resolved.
- Unsupported (0): Independent outputs are pasted together without a supported implementation decision.

## WF-M3-CHECK · Verify delegated findings — 3 points

Evidence: One source claim from each investigator and the engineer’s recorded check.

- Complete (3): Both claims are checked and their acceptance, correction or rejection informs the plan.
- Partial (1.5): One claim is verified or both are checked incompletely.
- Unsupported (0): Delegated conclusions are accepted without evidence.

## WF-M4-REUSE · Make the review skill usable by the team — 5 points

Evidence: Repository skill, brief use/version/owner notes and a fresh-session invocation.

- Complete (5): The skill uses explicit inputs, no personal paths or hidden chat assumptions, and works in a fresh context; another engineer has concise usage and version information.
- Partial (2.5): The skill is useful but its handoff or fresh-context use is incomplete.
- Unsupported (0): A personal-only prompt or skill file with no demonstrated reuse.

## WF-M4-REVIEW · Give the skill explicit review instructions — 5 points

Evidence: Skill instructions, supplied spec/target/diff/check inputs and cited output.

- Complete (5): The separate review receives the correct evidence and returns checked findings or a supported pass with limits; the engineer verifies a consequential result.
- Partial (2.5): The review is useful but a material input or verification is missing.
- Unsupported (0): Bare invocation, generic praise or an unverified defect claim.

## WF-M4-IMPLEMENT · Control implementation scope — 5 points

Evidence: Server and UI diff, local increments and PLAN.md deviations.

- Complete (5): Implementation follows the approved increments, reuses the prepared service and explains any necessary deviation; supplied checks remain intact.
- Partial (2.5): Most work follows the plan but a material deviation is unexplained.
- Unsupported (0): Unrelated edits, weakened checks or no supported connection to the plan.

## WF-M5-TEST · Prove the regression test detects its defect — 4 points

Evidence: The unchanged new server-request regression test and trusted correct/faulty/own results.

- Complete (4): Correct code passes, the faulty code fails at the intended assertion, and the own-code result and coverage limits are explained.
- Partial (2): Correct/faulty detection is established but the own-code result or coverage limit is not explained.
- Unsupported (0): Both implementations fail, or the faulty run fails only at import, startup or timeout. Infrastructure errors remain pending rather than scored as participant failure.

## WF-M5-EVALUATE · Evaluate and improve the review skill — 3 points

Evidence: EVALUATION.md plus retained initial/revised skill versions, fixed cases and actual outputs.

- Complete (3): Clean and faulty cases expose false findings or misses; a proposed instruction change is compared on the same cases/configuration and accepted or rejected with evidence. An adequate initial skill may be retained with supported reasons.
- Partial (1.5): Both cases are assessed, but the before/after comparison or retention decision lacks a material control.
- Unsupported (0): A self-improvement claim without executions, fabricated gains or a check that merely confirms the skill file exists.

## WF-M5-HOOK · Prove automatic checking and its limits — 3 points

Evidence: Hook event/filter/script and selected invocation, failure, correction/pass and unrelated-action evidence.

- Complete (3): The relevant event runs the intended check, feedback reaches Claude, correction passes, and scope/remaining behavioral checks are explained. Approved equivalent evidence has no feature-access penalty.
- Partial (1.5): Real hook output is supplied, but the correction, scope check or coverage limit is missing.
- Unsupported (0): Only a direct script run or an incorrect claim that PostToolUse reverses an edit or proves every behavior.

## WF-M6-VERIFY · Review and verify the final version — 3 points

Evidence: FINAL.md, final skill output, supported dispositions and current trainer checks.

- Complete (3): The engineer resolves or explains findings, checks the actual submitted version and reports readiness or a specific blocker accurately; unfinished agent work is stopped.
- Partial (1.5): Current results exist but a material finding or limitation is not addressed.
- Unsupported (0): A completion claim contradicted by results or based only on stale checks.

## WF-M6-HANDOFF · Leave a reproducible handoff — 2 points

Evidence: Final PR documents, skill usage notes and private receipt/evidence.

- Complete (2): A reviewer can trace requirements to changes and results, run the shared skill, and see scope and known limits without reconstructing private conversation history.
- Partial (1): The handoff is usable but one required connection or usage detail is missing.
- Unsupported (0): Missing or contradictory handoff with no reproducible evidence.

The model proposes levels, cited evidence and reasons. Server code calculates points. Confirmed missing practice receives zero; failed collection, execution or model assessment remains pending. File existence and invocation alone do not show understanding. Optional feature access never costs points.
