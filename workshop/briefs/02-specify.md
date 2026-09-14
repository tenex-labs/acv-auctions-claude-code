# M2 · Specify

20 minutes · 10 practice points in the final assessment.

The prototype leaves recovery, repeated requests and preserved data unresolved.

Decision: Which product answer changes an observable requirement?

Claude Code: Clarification · durable task context

## Work

1. Give Claude the investigation, journey, product decisions and acceptance rules. Ask it to surface a question that changes implementation.
2. Answer from workshop/product-decisions.md. Record how the answer changes a requirement; name remaining unknowns.
3. Write SPEC.md within 500 words. Cover direct server responses and visible AC-01–06 behavior, including failed status lookup.
4. Define preserved data, service ownership and excluded work. Save the specification locally before implementation.

## Save

Local SPEC.md and the clarification exchange. Show the question, supported answer and changed requirement.

## Prompt

Read workshop/INVESTIGATION.md, product-handoff/USER-JOURNEY.md, workshop/product-decisions.md and workshop/acceptance.md. Ask me about a consequential ambiguity using AskUserQuestion if available. Resolve it from the shared product answers, then draft SPEC.md within 500 words. Cover AC-01–06 in UI and server behavior, preserved contents and exclusions. Show which requirement the answer changed. Do not implement.

## Check and grade

`npm run check -- --stage m2`

See the zero/half/full examples in [the rubric](../rubric.md). A command or file alone earns no credit.

<details><summary>Optional hints</summary>

Ask what Retry uses if an inspection changes after failure.

Use an action, input and observable result for each case. “Support retry” does not define duplicate handling.

</details>
