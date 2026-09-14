# M1 · Inspect · 10 minutes

A plausible diagnosis can miss the state that leaves the screen stuck.

Decision: Which evidence supports the cause, and does it justify the model/effort choice?

## Claude Code controls

**Context selection.** Supply the files and symptom Claude needs; /context shows what the conversation contains. Reference the report screen and reproduced failure.

**Project instructions.** CLAUDE.md and scoped rules supply lasting project guidance. Read the report rule before asking for changes.

**Model and effort.** Choose an approved model and how much work it should spend on the task. Check the diagnosis before deciding whether to change settings.

## Do

1. Start a fresh workshop session. Read the project instructions and inspect the model/effort setting.
2. Run the app. In Operations, select Fail next generation, then Generate report. Record the observed state.
3. Ask Claude to trace the failure. Verify a cited source and explain what the passing baseline test misses. Keep application code unchanged.
4. Write the M1 investigation in EVIDENCE.md in at most 200 words. Commit, push and open your continuing PR.

## Starting prompt

```text
Read the project instructions and trace the report-generation failure from
the relevant UI entry point. Do not change application code. Separate what
you observed from what you infer. Cite the source for the stuck state and
identify what the existing baseline test fails to check. Give me the
smallest reproduction I can run before I accept the diagnosis.
```

## Save your work

M1 investigation, tested commit and checked source references. Attach the prompt, Claude response/tool activity and your verification privately.

Commit and push your continuing PR, then select **Save submission** in the portal. Preview and redact session evidence before attaching it. Keep exports outside the repository; the private evidence route accepts selected excerpts when export or tenant rules prevent collection.

```sh
npm run check -- --stage m1
```

## Published grading

5 method points.

**CC-M1-CONTEXT · Select relevant context · 1 points.**
Evidence: Selected project instructions and source references, with the reason they matter.

- Zero: A list of files with no connection to the failure.
- Half: Relevant source supplied, but its role is unexplained.
- Full: The report entry point and applicable instructions are connected to the observed failure.

**CC-M1-CHOICE · Justify model and effort · 1 points.**
Evidence: The approved model/effort used, the task need and a checked result.

- Zero: Only a model name or screenshot.
- Half: A task-based choice without checking the result.
- Full: The choice is justified and its result checked; any limit or need to change is explained.

**CC-M1-DIAGNOSIS · Verify the diagnosis · 3 points.**
Evidence: Reproduction, Claude’s diagnosis and the engineer’s source or UI verification.

- Zero: An unsupported cause or no reproduction.
- Half: The failure is reproduced but the cited cause is not fully checked.
- Full: The observed failure is traced to code and the weak test’s missing recovery assertion is explained.

Automated checks establish submitted versions, document limits, protected files and executed behavior. File existence or a command invocation alone does not earn method points. Final behavior contributes 40 points once, at M6. See [rules](../rules.md), [acceptance cases](../acceptance.md) and [full rubric](../rubric.md).

## Optional hints

- Separate the observed state from the proposed cause.
- Follow Generate through the client request and back to the condition that disables the button. Compare that condition with the baseline test’s assertions.

Hints and unavailable optional features cost no points.
