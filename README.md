# Inspection Desk walkthrough

Watch the presenter modernize an existing application, then add follow-ups. Follow along locally if useful. The starter leaves both tasks unfinished; the C1 checkpoint provides the completed modernization so you can begin the follow-up feature.

## Follow along

Use Node **24.21.0**, Claude Code and a browser. Extract the download and open a terminal inside its `inspection-desk/` folder.

```sh
node --version
npm run setup
npm run preflight
npm run check:foundation
npm run dev
```

Open http://127.0.0.1:3000. Setup installs the locked packages and Chromium; Git is not required. Accept the Claude Code workspace trust dialog to use project hooks.

## The six stages

| Stage | Work and evidence |
| --- | --- |
| 1. Orient and inspect | Explore the [running CFML application](https://acv-inspection-desk-legacy.vercel.app/), [source](legacy/README.md) and [preservation requirements](docs/PRESERVATION-CONTRACT.md). |
| 2. Specify and plan the modernization | Investigate two bounded questions, verify cited source lines, then save the specification and plan under `workshop/`. |
| 3. Modernize and develop the review skill | Build search, inspection and reports in small increments. Fix DF-01: lowercase stock-number search must match. Develop `/inspection-review` and test it on the supplied cases. |
| 4. Clarify and plan the feature | Read the [request](product/follow-up/REQUEST.md), [journey](product/follow-up/JOURNEY.md), [prototype](product/follow-up/follow-up.html) and [clarifications](product/follow-up/CLARIFICATIONS.md). Save the follow-up specification and plan. |
| 5. Implement, review and verify | Add follow-ups, write regression tests and reuse the review skill. Check a correction, then review any proposed project rule before saving it. |
| 6. Review and grade your work | Compare the local result with the demonstration, save check outcomes and remaining questions in [FINAL.md](workshop/FINAL.md), and identify what to reuse. Optionally use the [codebase and skill review prompt](docs/SELF-REVIEW-PROMPT.md). |

Loading, data types and formatting helpers are prepared under `src/server/`. Foundation checks pass initially. Completed-task checks deliberately fail while the corresponding behavior or participant tests remain unfinished.

## Local checks

| Command | When to use it |
| --- | --- |
| `npm run check:foundation` | Before starting; prepared modules, types and file size. |
| `npm run check:increment -- task1 PB-04` | One named modernization change; builds saved source once. |
| `npm run check:task1` | The modernization is complete. |
| `npm run check:increment -- task2 FU-04` | One named follow-up change. |
| `npm run check:task2` | The follow-up feature is complete. |
| `npm run check` | Final local verification: one fresh build, all checks and your regression tests. |
| `npm run hook:probe` | Direct type, size and irrelevant-file probes; actual Claude session events are separate evidence. |
| `npm run package -- --recovery` | Save a new local backup before switching to a checkpoint. |
| `npm run reset:data` | Clear only follow-up state. |

[Behavior checklist](docs/CHECKS.md) · [Interface](docs/INTERFACE-CONTRACT.md) · [Local backups](docs/PACKAGING.md) · [Regression tests](tests/participant/README.md).

`npm run test:participant` uses a running app at `INSPECTION_DESK_BASE_URL` (default port 3000). After editing production code, run `npm run build` and restart it before testing. The completed-task commands manage their own server on port 4310; stop anything using that port first.

## Continue from C1

C1 is available whenever you want to begin the follow-up feature. Save your current work first:

```sh
npm run package -- --recovery
```

After it succeeds, extract `inspection-desk-task1-migrated.zip` into a new folder. Keep the original project and printed recovery ZIP. Copy your own workshop notes, complete review-skill directory and reviewed rules into the new project. Run `npm run setup` and `npm run preflight` there. C1 completes task 1 and leaves task 2 unfinished.

## Keep the useful parts

Record completed behavior, executed checks, limitations and the next useful change in `workshop/FINAL.md`. Keep the full `.claude/skills/inspection-review/` directory, including its cases and references. Save the optional prompt response as `workshop/SELF-REVIEW.md`; inspect its cited evidence before relying on a grade.

The application and tests use local records after setup. They must work without calling the hosted legacy service. The build downloads no external fonts or assets.
