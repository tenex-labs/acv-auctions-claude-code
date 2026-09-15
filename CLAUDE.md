# Inspection Desk

Node 24.21.0; Next.js 16.3.5 App Router; TypeScript. Read-only fixtures are under data/. Only follow-ups write under INSPECTION_DESK_DATA_DIR, default .data/.

Keep notes and check results locally. Record the completed work in workshop/FINAL.md and use docs/SELF-REVIEW-PROMPT.md to review its evidence.

Read [the interface](docs/INTERFACE-CONTRACT.md), [preservation requirements](docs/PRESERVATION-CONTRACT.md) before implementation. For task 2, ask product questions before reading product/follow-up/CLARIFICATIONS.md; wait for answers, then reconcile them with that record. Loading and formatting helpers are supplied. Joins, search, numeric sorting, summary and report rules are participant work.

Run npm run check:foundation before work. Use npm run check:increment -- task1 PB-04 (or task2 FU-04) for named changes; check:task1 or check:task2 for a completed task; npm run check for final local verification. Every source file has 500 lines maximum. The edit hook runs type and size checks only.

Save specifications and plans in workshop/. Plan Mode proposes; save the approved plan through the editor or after approving edits. Use legacy-investigator and contract-investigator for two bounded questions, with explicit file limits. Verify material findings before relying on them.

After modernization, develop /spec-to-stacked-pr from that completed process. It reads a spec, asks useful questions and waits for answers, respects the agreed review preference, checks hook setup, then plans dependent branches, builds, tests and reviews. Hook construction and verification are a separate action. Apply it to the follow-up spec. Its review-only branch uses explicit requirements, source and results without changing files or configuration. No supported findings is valid. The complete self-assessment prompt supplies its own requirements and controls its permitted verification.

When a check catches a mistake, correct it and add a regression test. Then propose a scoped project instruction, review it as a person, save it under .claude/rules/, and inspect fresh-session loading and code behavior separately. Loading instructions is not proof they were applied correctly. Auto memory is local; shared project instructions travel with this folder.

Do not call the hosted legacy service from the application or tests. Keep credentials and session transcripts out of shared project files. Run npm run package -- --recovery before applying checkpoint C1.

Plan manageable PRs before implementation. Read workshop/review-criteria.md and reuse the selected review preference. Run check:pr against each layer's actual base, counting additions, deletions, new files and generated text across the complete proposed layer. A local branch is not a hosted PR. See .claude/skills/spec-to-stacked-pr/references/stack.md. Ask questions about all four fictional PM inputs before consulting CLARIFICATIONS.md.
