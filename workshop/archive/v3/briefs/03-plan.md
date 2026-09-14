# M3 · Plan and coordinate

25 minutes · 15 practice points in the final assessment.

Two useful investigations can still leave conflicting assumptions or dependent work unordered.

Decision: What can run independently, what must wait, and which findings survive verification?

Claude Code: Plan Mode · bounded subagents · result synthesis

## Work

1. Enter Plan Mode. Assign service-contract and behavior-test separate read-only questions with inputs, tools/model, output requirements and stop conditions.
2. Run independent investigations concurrently where permitted. Use the same assignments sequentially if access prevents concurrency.
3. Verify one cited source claim from each. Resolve overlap or conflict and record how the findings change the plan.
4. Write PLAN.md within 400 words: server handlers/direct request tests first, then UI/browser checks. Map AC-01–06 and estimate all added plus deleted code within 500 lines. Keep one implementation writer.

## Save

Local PLAN.md, two bounded assignments, returned findings and your verified synthesis.

## Prompt

In Plan Mode, use .claude/agents/service-contract.md and behavior-test.md for two independent read-only investigations of SPEC.md. Give each permitted inputs, tools/model, a narrow question, cited output and a stop condition. Run concurrently if available; otherwise sequentially. Return one claim from each for me to verify. Reconcile the findings into PLAN.md: server handlers/direct request tests, then UI/browser checks; files, AC mapping and an additions-plus-deletions estimate below 500. Do not implement.

## Check and grade

`npm run check -- --stage m3`

See the zero/half/full examples in [the rubric](../rubric.md). A command or file alone earns no credit.

<details><summary>Optional hints</summary>

The service investigator can establish what handlers must pass through; the test investigator can map the user journey to checks.

Name the dependency explicitly: the UI needs working start/status/retry responses. Do not count only net line growth.

</details>
