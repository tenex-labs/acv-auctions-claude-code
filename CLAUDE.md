# Inspection Desk

Node 24.21.0; Next.js 16.3.5 App Router; TypeScript. Read-only fixtures are under data/. Only follow-ups write under INSPECTION_DESK_DATA_DIR, default .data/.

This is a presenter-led walkthrough with optional local follow-along. Keep notes and check results locally; finish with workshop/FINAL.md and, if useful, the optional docs/SELF-REVIEW-PROMPT.md.

Read [the interface](docs/INTERFACE-CONTRACT.md), [preservation requirements](docs/PRESERVATION-CONTRACT.md) and [task 2 answers](product/follow-up/CLARIFICATIONS.md). Loading and formatting helpers are supplied. Joins, search, numeric sorting, summary and report rules are participant work.

Run npm run check:foundation before work. Use npm run check:increment -- task1 PB-04 (or task2 FU-04) for named changes; check:task1 or check:task2 for a completed task; npm run check for final local verification. Every source file has 500 lines maximum. The edit hook runs type and size checks only.

Save specifications and plans in workshop/. Plan Mode proposes; save the approved plan through the editor or after approving edits. Use legacy-investigator and contract-investigator for two bounded questions, with explicit file limits. Verify material findings before relying on them.

Develop /inspection-review using the packet outline and supplied fixed cases. Use it after both tasks. Require the requirement, cited code, consequence and a way to verify each finding. No supported findings is valid.

When a check catches a mistake, correct it and add a regression test. Then propose a scoped project instruction, review it as a person, save it under .claude/rules/, and inspect fresh-session loading and code behavior separately. Loading instructions is not proof they were applied correctly. Auto memory is local; shared project instructions travel with this folder.

Do not call the hosted legacy service from the application or tests. Keep credentials and session transcripts out of shared project files. Run npm run package -- --recovery before applying checkpoint C1.
