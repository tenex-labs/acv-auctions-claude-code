# M1 · Context and inspect

10 minutes · 5 practice points in the final assessment.

The prototype demonstrates an idea. It does not establish how the real application behaves.

Decision: Which observed gap should the implementation address, and which source supports the diagnosis?

Claude Code: Project instructions · selective context · model and effort

## Work

1. Start a fresh workshop session. Read the applicable project instructions and inspect the model/effort setting.
2. Open the product HTML and journey. Run Inspection Desk and compare the proposed experience with actual behavior.
3. Reproduce one discrepancy. Ask Claude to trace it through relevant UI, server and service source; verify a cited claim before editing.
4. Save workshop/INVESTIGATION.md within 200 words. Keep the prompt, returned evidence and your check for the final private packet.

## Save

Local investigation and checked sources. Save relevant session evidence; no upload is required yet.

## Prompt

Read CLAUDE.md, applicable scoped instructions and product-handoff/. Compare the prototype with the running app. Before editing, identify what is simulated, reproduce one discrepancy and trace it through relevant UI, server and service source. Cite the source, distinguish observed behavior from an untested explanation, and give me a check I can execute before accepting the diagnosis.

## Check and grade

`npm run check -- --stage baseline`

See the zero/half/full examples in [the rubric](../rubric.md). A command or file alone earns no credit.

<details><summary>Optional hints</summary>

Use Operations to fail the next generation and observe the button after the error.

Trace the disabling condition in the report panel. Compare the baseline test’s assertions with the recovery the user needs.

</details>
