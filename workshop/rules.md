# Submission rules

Use the frozen starter shown in the portal. Save work locally through six learning stages. At the end, open one PR and submit its link with one private evidence packet. Corrections update the same PR and create a new receipt; earlier receipts and grades retain their exact code versions. No intermediate uploads or peer reviews are required.

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

## Documents and private evidence

Investigation: 200 words. SPEC: 500. PLAN: 400. EVALUATION: 500 prose words, excluding result-table rows. FINAL: 300. Headings count; Markdown punctuation and HTML comments do not. Put command output in the private packet.

Attach at most eight private files: 1 MiB each, 4 MiB total. Preview and redact selected workshop sessions. Native exports can omit expanded tool results; add a selected supplementary file and explain missing evidence. Keep private sessions, email and other participants’ data out of public Git history.

Complete and commit public files first. Run final checks on the clean commit into ignored storage, push/open the PR, then submit the same code version and private evidence. Repeat checks after any public edit. A public document never needs to contain its own future commit ID.

The trainer checks captured versions. A saved snapshot cannot prove that a temporary local edit never occurred. Session hashes establish integrity after receipt, not an independent record of every action.
