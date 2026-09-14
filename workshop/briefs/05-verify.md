# M5 · Verify · 20 minutes

A passing weak test and a completion claim can both miss broken recovery.

Decision: What does the unchanged test establish on correct, faulty and your own code?

## Claude Code controls

**Command hooks.** A script runs when a configured action occurs. PostToolUse runs after an edit and does not undo it. Observe a relevant edit, failed check, correction/pass and unrelated edit.

**Completion conditions.** /goal continues toward a stated result. Its evaluator reads the conversation; current executed checks establish behavior. Use one supervised request to finish within scope or report a supported blocker.

**Scheduled prompts.** /loop repeats a prompt at an interval until cancelled. This is an optional demonstration. Read one existing job’s status; cancel the schedule without launching another job.

## Do

1. Add a new test under tests/participant. Select stuck recovery or stale-error behavior and identify the assertion that should expose it. Do not edit supplied tests.
2. In a disposable copy, verify the hook’s relevant invocation, failure, correction/pass and unrelated-action check. Use the prepared equivalent packet if account rules prevent this.
3. Save the starting version and results. Adapt one completion prompt with the spec, plan, current failures, allowed files and stopping condition. Work under supervision for up to six minutes; intervene when justified.
4. Check the actual outcome, interrupt at cutoff and clear unfinished goals/schedules. Push and save M5. Review the assigned test suite for five minutes; pending execution is a stated limitation.

## Starting prompt

```text
/goal Use SPEC.md, PLAN.md and the current M5 check results to finish the
approved report-generation change. Run npm run check -- --stage m5 and
show its actual results. Run my new regression test and report its result.
Change only the planned application files and my new test files. Preserve
the supplied service, fixtures, official checks and dependency files. Keep
the final additions plus deletions across code, tests, styles and automation
within 500 lines from the frozen starter. Keep the configured hook enabled.
Do not push or merge. Report the changed files, executed commands, results
and remaining failures. Stop after six minutes or if a required change is
outside scope, and report the blocker without claiming completion.
```

## Save your work

New regression test and intended assertion; hook evidence; launch prompt, interventions and checked completion/blocker; outgoing test review. Attach selected session passages privately.

Commit and push your continuing PR, then select **Save submission** in the portal. Preview and redact session evidence before attaching it. Keep exports outside the repository; the private evidence route accepts selected excerpts when export or tenant rules prevent collection.

```sh
npm run check -- --stage m5
```

## Published grading

5 method points and 6 review points.

**CC-M5-TEST · Demonstrate regression-test strength · 2 points.**
Evidence: Trusted test results on correct, faulty and own implementations; intended assertion and file hash.

- Zero: Failure is an import/startup error, timeout, or occurs on the correct implementation.
- Half: The test distinguishes correct and faulty behavior but its coverage limit is unexplained.
- Full: The unchanged test passes correct behavior, fails the intended faulty assertion, and its own-result and limits are explained.

**CC-M5-HOOK · Interpret hook feedback accurately · 1 points.**
Evidence: Relevant invocation, failure output, correction/pass and unrelated-action check; coverage limit, or the approved equivalent packet.

- Zero: Claim that PostToolUse undoes an edit or proves all behavior.
- Half: Relevant hook output without explaining its effect or limit.
- Full: The engineer shows relevant invocation, failure, correction/pass and an unrelated-action check, and explains what behavioral checks remain.

**CC-M5-COMPLETE · Use a measurable completion condition · 2 points.**
Evidence: Saved launch prompt with current spec/plan, scope, completion/stopping conditions; current results, justified interventions and cleared unfinished work.

- Zero: Claude says done without current checks.
- Half: A bounded condition is present but the conclusion omits a required result.
- Full: The bounded launch request and current results support completion or a blocker; justified interventions and cancellation are recorded.

**REV-M5-VALIDITY · Reach a supported verdict · 2 points.**
Evidence: Verdict on the assigned test suite: assertion and trusted correct/faulty test results.

- Zero: Invented defect or unsupported pass.
- Half: A useful conclusion is only partly established.
- Full: A verified defect or supported pass accurately reflects the assigned case.

**REV-M5-EVIDENCE · Cite the assigned version · 2 points.**
Evidence: Exact assigned commit, source locations and relevant test suite evidence.

- Zero: No evidence or the wrong saved version.
- Half: Relevant evidence leaves a material part of the claim unverified.
- Full: Reproducible evidence at the assigned version establishes the claim.

**REV-M5-USEFULNESS · Give a bounded correction or limitation · 2 points.**
Evidence: Specific next change/check, or the stated limits of a supported pass.

- Zero: Generic criticism or praise.
- Half: A useful direction lacks a concrete change/check or limit.
- Full: The author receives a bounded correction or a precise limit on supported acceptance.

Automated checks establish submitted versions, document limits, protected files and executed behavior. File existence or a command invocation alone does not earn method points. Final behavior contributes 40 points once, at M6. See [rules](../rules.md), [acceptance cases](../acceptance.md) and [full rubric](../rubric.md).

## Optional hints

- Wait for an observable settled state, then assert the recovery behavior. A timeout or setup error does not prove defect detection.
- The trainer runs your unchanged test on correct, faulty and submitted versions. If /goal is unavailable, use the same prompt without the command. Record useful interventions; silence earns no points.

Hints and unavailable optional features cost no points.
