# Inspection Desk

TypeScript/React client, Express server, committed JSON fixtures and an in-memory report service. Use Node 24. Browser reload retains server state; server restart resets it.

## Commands

- Prepare: `node --version`, `npm ci`, `npm run prepare:local`.
- Run: `npm run dev` (API 4100, UI 5173).
- Check: `npm run check -- --stage baseline`, `fast`, `m5`, `m6` or `evidence`.
- Final order: finish public documents → commit → run `npm run check -- --stage m6 --json .workshop-private/final-checks.json` → push/open the PR → submit that version and selected private evidence. Any public edit needs another commit and check run.

## Work area

Read `product-handoff/`, `workshop/product-decisions.md` and `workshop/acceptance.md`. The prototype is simulated; the accepted requirements control.

Implement `src/server/routes/reports.ts` first with direct request tests. Then connect `src/client/reports/ReportPanel.tsx` and `reportApi.ts`. New tests go in `tests/participant/`. Explain any other necessary source change in PLAN.md.

Read and preserve the report service, builder, store, scheduler, shared types, fixtures, old route and supplied checks. The exact protected list is `scripts/protected-manifest.json`.

## Working method

- Resolve product ambiguity before editing. Save the result in SPEC.md.
- Use the two read-only specialists for independent questions; verify one claim from each and combine their findings in PLAN.md. Use one implementation writer.
- Adapt `.claude/skills/workshop-review/SKILL.md`; supply its spec, target, diff and check inputs explicitly. Evaluate its output on the fixed cases before using it on the final change.
- Keep this file, scoped instructions and agent/skill configuration concise and reusable. They are editable guidance, not security controls.
- Maximum 500 added plus deleted code lines, including tests, styles and configuration. See `workshop/rules.md` for counting and editable paths.
- Never put session exports, email addresses or private evidence in Git. Use `.workshop-private/` or an external folder and preview before uploading.
