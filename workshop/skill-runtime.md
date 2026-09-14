# Skill package format and supplied runtime

Assessment `inspection-desk-skill-4.1`. Submit the reusable review skill developed during the workshop.

## Accepted package

```text
workshop-review/
  SKILL.md
  references/review-criteria.md
  examples/example-review.md
  scripts/check-evidence.py
```

Supporting files are optional. A ZIP must contain exactly one skill directory; SKILL.md must sit at its root. Self-contained SKILL.md is accepted directly. Relative paths and original bytes are retained. The receipt identifies the whole package; changing a supporting file creates a replacement version. ZIP compression and entry order do not change content identity.

Limits: at most 128 ZIP entries including directory records; 256 KiB uploaded ZIP; 64 files; 512 KiB expanded total; 128 KiB per supporting file; 32 KiB UTF-8 SKILL.md; 8 path levels including the archive root; 180 characters per archive path. Links, unsafe paths, nested archives, compiled programs and duplicate or case-colliding names are rejected. Readable files have an exact preview. Binary data is retained and labeled; it is not silently flattened into the prompt.

Use lowercase letters, digits and hyphens for the root directory and skill name. SKILL.md requires flat YAML `name` and `description` fields. Supported optional fields are argument-hint, context, agent, allowed-tools, disable-model-invocation, user-invocable, model and effort. Only the published model/effort are allowed. Omit disable-model-invocation or set it to false: the prepared runtime explicitly uses the native Skill tool. user-invocable must be true or omitted. No dynamic shell substitution. If context is fork, use the supplied reviewer agent. A required missing relative reference receives a validation error.

## Installed for every evaluation

- Claude Code 2.1.271; claude-sonnet-4-6; medium effort.
- Fresh case directory with INPUTS.md, SPEC.md, before/after source, change.patch and CHECKS.md. Check records are supplied case evidence, not checks executed by the participant.
- Complete submitted skill installed under a temporary, explicitly loaded workshop-runtime plugin. The runner explicitly requests the native Skill tool with the installed skill name and INPUTS.md arguments, equivalent to `/workshop-runtime:<skill-name> INPUTS.md`. The retained tool result must confirm launch. Participants do not install a plugin.
- Read, Glob, Grep and Skill tools. The `reviewer` agent is installed explicitly with `--agents`; `context: fork` can select it. Project/user configuration is not inferred from arbitrary folders.
- `mcp__workshop__run_python` executes submitted scripts/*.py. Python 3.9 standard library is supplied. Pass a script path relative to the skill directory and an optional array of literal arguments. Working directory is the case root; `__file__` locates the installed helper. Documents remain at their original relative paths.

Helpers run in a separate macOS sandbox process: no network, private workspace access, subprocesses or writes outside scratch/. Limits: four calls per case, ten seconds wall time, five CPU seconds, 64 open files, 64 KiB captured output. No memory ceiling has been demonstrated. Local use is limited to these authored samples until stronger host isolation is reviewed for attendee packages.

Custom agent definitions, hooks, .claude settings, MCP configuration and package/plugin configuration are unsupported and rejected. Required third-party Python modules are not installed. A missing dependency during execution is reported and the assessment stays unresolved. Reading a script does not prove it ran; actual helper calls and results are recorded separately.

Native review: 180 seconds per case, 12 turns, 6,000 maximum output tokens per response, 192 KiB captured model output, $1.50 reservation per call. Two worker attempts and two grading attempts maximum. A timeout or malformed response produces no invented score.

The five case categories are a correct change, server/retry defect, UI/report-state defect, missing/conflicting checks and a changed-path variation. All receive the same case versions, model, settings and tools. The privileged grader separately receives private answer keys and the authoritative rubric; the submitted skill cannot edit these or choose points. Server code calculates points from validated judgments.

## Current official Claude Code references

Feature behavior checked September 14, 2026. Local invocation evidence is retained separately; documentation alone is not proof of execution.

- [Skills and supporting files](https://code.claude.com/docs/en/skills)
- [Subagent configuration](https://code.claude.com/docs/en/sub-agents)
- [CLI reference](https://code.claude.com/docs/en/cli-reference)
- [Headless execution](https://code.claude.com/docs/en/headless)
- [Hooks](https://code.claude.com/docs/en/hooks)
- [Sandboxing](https://code.claude.com/docs/en/sandboxing)
- [MCP tools](https://code.claude.com/docs/en/mcp)
