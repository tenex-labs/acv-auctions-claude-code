# Evaluate spec-to-stacked-pr

The four fixed packets evaluate the read-only review branch. They do not establish that the full implementation procedure works. Their check blocks are supplied teaching records, not live application results.

## Fixed review protocol

1. Save the skill version or hash, Claude Code version, resolved model, effort, tool limits and case hashes. Keep those settings consistent. Record unsupported settings rather than pretending they applied.
2. In a fresh session for each case, run `/spec-to-stacked-pr review-only .claude/skills/spec-to-stacked-pr/evals/<case>.md`. Permit Read/Grep/Glob only. Supply only that case and the review procedure. The filenames are task1-correct.md, task1-faulty.md, task2-correct.md and task2-faulty.md.
3. Preserve actual output separately for each run. Only after the review, compare it with [expected findings](expectations.md).
4. In `workshop/EVALUATION.md`, record missed defects, false alarms, unsupported claims and correct findings. Keep source inspection distinct from supplied teaching output and executed results.
5. If an observation justifies one instruction change, propose it and obtain review. Save the prior version, change exactly that instruction, then repeat all four unchanged cases with the same settings. Preserve worse results. If no change is justified, state that; do not manufacture a before/after improvement.

## Full workflow

[Full-workflow replay](full-workflow-replay.md) separately checks spec intake, prepared answers, review preference, hook setup, implementation and acceptance checks. It is longer than a packet review and is not another required live Build action. A definition or expected result is not an observed replay.

## Result fields

Date; branch; case; skill hash; case hash; model; effort; tools; actual output path; observed findings; missed defects; false alarms; unsupported claims; check executions; limits; reviewed change; repeat result.
