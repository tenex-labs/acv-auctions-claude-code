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

## Seven sections · September 17, 9–11 a.m. Eastern

| Section | Minutes | Work |
| --- | --- | --- |
| 00 · Claude Code basics | 5 | Open the prepared project; inspect one cited answer. |
| 01 · Context and instructions | 5 | Explain the legacy journey and DF-01 from source and observed behavior. |
| 02 · Specifications and agents | 15 | Investigate two bounded questions, verify citations, agree on the modernization spec and plan. |
| 03 · Modernization and skills | 20 | Modernize; create spec-to-build from the completed work; separately attach and test hooks. |
| 04 · Clarification and retained lessons | 30 | Ask questions before reading the clarification answers; agree on the feature spec and plan. |
| 05 · Hooks, evaluations and goals | 35 | Apply the skill; prove the unchanged regression test; evaluate fixed review cases. Optional /goal. |
| 06 · Assessment and reuse | 10 | Optional complete self-assessment; inspect evidence and retain the skill package. |

Sections 02 and 04 reserve 45 minutes for specifications and planning. Build shows 12 actions, including the optional goal and self-assessment, one at a time. The starter and C1 include a starting procedure. Develop it after modernization, then apply it to the new feature.

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

After it succeeds, extract `inspection-desk-task1-migrated.zip` into a new folder. Keep the original project and printed recovery ZIP. Copy your own workshop notes, complete spec-to-build directory and reviewed rules into the new project. Run `npm run setup` and `npm run preflight` there. C1 completes task 1 and leaves task 2 unfinished.

## Keep the useful parts

Record completed behavior, executed checks, limitations and the next useful change in `workshop/FINAL.md`. Keep the full `.claude/skills/spec-to-build/` directory, including its questions, hook instructions, examples, evaluations and references. The optional prompt contains the complete requirements and gives an advisory review across 20 checks, with 100 possible points. It may use installed local tools and disposable copies while preserving your working files and existing data. The report returns in chat; inspect its evidence and unverified items before deciding what to change.

The application and tests use local records after setup. They must work without calling the hosted legacy service. The build downloads no external fonts or assets.
