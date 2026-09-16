# Example invocations

These are authored examples of expected interaction. They are not observed model outputs.

## Build from a spec

User: `/spec-to-stacked-pr workshop/comparison-spec.md`

Expected opening when the spec omits duplicate behavior: “The spec says to save notes but does not say whether a second open note replaces the first or is rejected. Which behavior do you want? Do you want to review each increment or the completed task? I’ll still ask whenever a product decision is unresolved.”

The skill waits. Prepared example answer: “Reject the second open note. Review the completed task.” It then reconciles the specification, proposes or reads the approved plan, inspects hook setup and presents any configuration change before implementation. If those answers were already supplied, it uses them without asking again.

## Review a fixed packet

`/spec-to-stacked-pr review-only .claude/skills/spec-to-stacked-pr/evals/task1-faulty.md`

Expected behavior: read only the named packet and review instructions; cite the numeric-sorting defect; mark supplied check output accurately; do not edit or configure hooks. Use `evals/README.md` to run the fixed comparison.

## Complete self-assessment

Paste the unchanged `docs/SELF-REVIEW-PROMPT.md`. Its self-contained assignment governs the review. The skill's read-only branch applies. It does not require a separate spec, progress preference, deployment or upload.

## Reuse in another project

Supply that project's engineering spec and instructions. Use `references/hooks.md` to identify the required scripts and toolchain before enabling a hook. Do not copy Inspection Desk's command paths into a project where those files do not exist. Use `evals/full-workflow-replay.md` for a complete replay definition.
