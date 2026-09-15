# Inspection Desk workshop

Use Node **24.21.0**, Claude Code and a browser. Extract this folder and open a terminal inside it.

```sh
node --version
npm run setup
npm run preflight
npm run check:foundation
npm run dev
```

Open http://127.0.0.1:3000. Setup installs the locked packages and Chromium; it does not require Git. Accept the Claude Code workspace trust dialog to use project hooks.

## Task 1: modernize

Inspect the [running application](https://acv-inspection-desk-legacy.vercel.app/), [its source](legacy/README.md) and [preservation requirements](docs/PRESERVATION-CONTRACT.md). Loading, data types and formatting are prepared under `src/server/`. Build the vehicle search, inspection and report journey. Fix DF-01: lower-case stock-number search must match.

The starter opens and foundation checks pass. Its unfinished task routes and unfinished participant tests deliberately fail completed-task checks.

## Task 2: add follow-ups

Read the [rough request](product/follow-up/REQUEST.md), [journey](product/follow-up/JOURNEY.md), [prototype](product/follow-up/follow-up.html) and [clarification record](product/follow-up/CLARIFICATIONS.md). Save your specification and plan in `workshop/`, then implement the feature and regression tests.

## Check and submit

| Command | When to use it |
| --- | --- |
| `npm run check:foundation` | Before starting; prepared modules, types and file size. |
| `npm run check:increment -- task1 PB-04` | One named change; builds saved source once and runs matching checks. |
| `npm run check:task1` | Entire modernization finished. |
| `npm run check:increment -- task2 FU-04` | One named feature change. |
| `npm run check:task2` | Entire feature finished. |
| `npm run check` | Final verification; one fresh production build, all checks and your regression tests. |
| `npm run hook:probe` | Direct type/size/error/prose probes; does not prove a Claude session event. |
| `npm run package` | Packages saved files into `submission.zip`, without Git. |
| `npm run reset:data` | Clears only follow-up state. |

[Published checks and points](docs/CHECKS.md) · [Interface](docs/INTERFACE-CONTRACT.md) · [Packaging limits](docs/PACKAGING.md) · [Regression requirement](tests/participant/README.md).

`npm run test:participant` uses a running app at `INSPECTION_DESK_BASE_URL` (default port 3000). Start a fresh production process with `npm run build` then `npm run start` before testing edited code. Production-based check commands manage their own server on port 4310; stop anything using that port first.

## Checkpoint C1 at 9:45 a.m.

Save your work first:

```sh
npm run package -- --recovery
```

Only after it succeeds, extract `inspection-desk-task1-migrated.zip` into a new folder. Keep the original project and the printed recovery ZIP. Copy your own workshop notes, review skill and reviewed rules into the new project, then run `npm run setup` and `npm run preflight` there. The checkpoint completes task 1 and leaves task 2 unfinished. Using it changes no scoring rule.

Keep the complete `.claude/skills/inspection-review/` directory. Submit one `submission.zip` through the portal. Specifications and plans are collected learning records; points measure application, regression-test and hook behavior. Do not include credentials, personal notes or transcripts.

The application and its checks use local records. They must work without the hosted legacy service or network access after setup. No external fonts or assets are downloaded by the build.
