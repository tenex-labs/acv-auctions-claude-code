# Submission rules

Use the frozen starter shown in the portal. Work locally through six learning stages. Submit one complete skill package containing your reusable review procedure. Replacement submissions preserve history. No PR, application, plan, specification or conversation upload is required.

## Editable and protected paths

| Path | Rule |
| --- | --- |
| `src/server/routes/reports.ts` | Complete the three report handlers; preserve the older route. |
| `src/client/reports/ReportPanel.tsx`, `reportApi.ts` | Connect the report journey. |
| Other source/styles | Only necessary, explained changes within the assignment. |
| `tests/participant/` | Add new tests and the test-selection file. |
| `CLAUDE.md`, `.claude/rules/report-generation.md` | Adapt concise project/scoped guidance. |
| `.claude/agents/service-contract.md`, `behavior-test.md`, `report-investigator.md` | Adapt the prepared read-only assignments and review agent. |
| `.claude/skills/workshop-review/` | Adapt and retain review instructions; include short owner/version/use notes. |
| `SPEC.md`, `PLAN.md`, `workshop/INVESTIGATION.md`, `workshop/EVALUATION.md`, `workshop/FINAL.md` | Complete the public work record. |
| Prepared service, builder, store, scheduler, shared types, JSON fixtures | Read and preserve. |
| Supplied tests, check scripts, hook/settings, dependency/build files, product and grading packets | Preserve. Exact files and hashes: `scripts/protected-manifest.json`. |

No new dependencies, generated bundles, unrelated formatting or application rewrites. New helpers count wherever they are placed. Do not use documentation files as executable application modules. Trusted checking validates protected files before adding its own checks.

## 500 changed code lines

The fixed counter is `changed-code-3.0`. Run `node scripts/change-scope.mjs <full-starter-commit>` after committing. It compares with the frozen starter using additions **plus deletions**, without rename detection.

| Change | Count |
| --- | ---: |
| Replace one code line | 2 |
| Delete 10 code lines | 10 |
| Add a 20-line helper or test | 20 |
| Rename an unchanged 20-line code file | 40 |
| Add a comment and a blank line in a code file | 2 |

Application code, tests, styles, automation and configuration count. Unknown file types count. Markdown/text prose and inline command examples are reported separately. Fenced blocks and instruction frontmatter count, including their delimiters, comments and blank lines. Raw HTML documents count in full. The report lists counted instruction additions/deletions beside document changes. Renames use deletion plus addition for instruction code too. Binary files and generated bundles cannot pass the rule.

Session exports and check outputs belong in ignored `.workshop-private/` or outside the repository; never commit them. The supplied prototype and configuration are already in the starter and consume no change budget unless edited; the prototype is protected.

## Local exercise records and final skill

Keep the specification, plan, application, checks and practice notes locally. The 500-line application limit is a local exercise constraint, not competition eligibility. The application is not collected or independently graded in this competition.

Submit one UTF-8 SKILL.md, at most 32 KiB (32,768 bytes). Preview the exact content and submit. Use the supplied runtime inputs and read-only reviewer agent. The portal records its own case outputs; you do not upload logs or citation indexes.

The new proposed assessment is inspection-desk-skill-4.1. See rubric.md and assessment-contract-v4.json. Older check contracts remain available for the local exercise and archived v3 records; their score weights do not govern this submission.
