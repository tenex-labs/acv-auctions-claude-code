# M4 · Implement and reuse

30 minutes · 15 practice points in the final assessment.

A review prompt tied to one conversation cannot reliably guide another engineer.

Decision: Which explicit inputs and instructions make this review procedure reusable?

Claude Code: Repository skills · separate review context · team reuse

## Work

1. Implement increment A and run direct server checks. Inspect its diff before continuing.
2. Implement increment B and run browser checks. Record necessary deviations from PLAN.md; preserve the prepared service and supplied checks.
3. Adapt .claude/skills/workshop-review/SKILL.md. Require explicit inputs, source citations, supported passes and stated limits.
4. Invoke the skill in a fresh review context, verify a consequential conclusion and save a bounded correction or supported limitation. Add concise use, owner and version notes.

## Save

Local implementation, new tests, adapted review skill and a checked fresh-context review. Save the initial skill for comparison.

## Prompt

Implement PLAN.md one increment at a time, with one writer. Reuse the prepared service and run each increment’s checks. Then adapt .claude/skills/workshop-review/SKILL.md to review an explicit spec, target, diff and check outputs in a separate context. Require citations, supported passes and limitations. Show me a consequential conclusion to verify, and leave short usage, owner and version notes so another engineer can reuse it.

## Check and grade

`npm run check -- --stage m5`

See the zero/half/full examples in [the rubric](../rubric.md). A command or file alone earns no credit.

<details><summary>Optional hints</summary>

Use repository-relative paths and a context file another engineer can supply.

A supported pass can earn full credit. Do not invent defects; verify the cited source before accepting a finding.

</details>
