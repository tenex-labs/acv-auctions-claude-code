# Review your change with a reusable skill

There are no required peer-review rounds. Optional discussion does not affect the score.

Adapt `.claude/skills/workshop-review/SKILL.md`. Give each review a context file with the specification, exact target, diff, permitted sources and executed check outputs. The separate review context must have everything it needs.

Check a consequential conclusion against source or execution. Record a bounded correction, an accepted limitation or a supported pass. Save the skill in the PR and selected review exchanges privately.

Evaluate initial and revised instructions on the same clean and faulty cases in `workshop/skill-cases/`. Compare missed defects and false findings with the published expected results. Keep inputs, model/effort and tools fixed. Explain why you accept a change or retain the existing skill. Two cases establish only what happened on those cases.

Use the skill again for final review. In `workshop/FINAL.md`, give another engineer the command, input requirements, owner and version. A reviewed repository skill can later be packaged for a team marketplace; this workshop does not require marketplace access or publication.
