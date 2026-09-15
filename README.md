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

| Module | Minutes | Work |
| --- | --- | --- |
| 00 · Understand the ColdFusion application | 5 | Explain the application and identify the behavior to preserve. |
| 01 · Specify the modernization | 20 | Agree on the modernization specification and proposed stack. |
| 02 · Define the checks | 10 | Choose review criteria, then construct and test the checks and hooks. |
| 03 · Modernize in small increments | 20 | Build the modernization and inspect actual changes, failures and corrections. |
| 04 · Package the procedure into a skill | 10 | Create spec-to-stacked-pr from the modernization experience. |
| 05 · Turn the rough feature request into an engineering spec | 25 | Clarify the supplied HTML and product request, then agree on the feature spec and stack. |
| 06 · Apply the skill and review the feature | 30 | Apply the skill and inspect the working feature, its stack and the recorded checks. |

Modules 01 and 05 reserve 45 minutes for specifications and planning. Build shows 12 actions, including the optional goal and self-assessment, one at a time. The starter and C1 include a scaffold. Develop it from your observed modernization in Module 04, then apply it to the new feature.


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

After it succeeds, extract `inspection-desk-task1-migrated.zip` into a new folder. Keep the original project and printed recovery ZIP. Copy your own workshop notes, complete spec-to-stacked-pr directory, review-criteria.md and reviewed rules into the new project. Run `npm run setup` and `npm run preflight` there. C1 completes task 1 and leaves task 2 unfinished.

## Keep the useful parts

Record completed behavior, executed checks, limitations and the next useful change in `workshop/FINAL.md`. Keep the full `.claude/skills/spec-to-stacked-pr/` directory, including its questions, hook instructions, examples, evaluations and references. The optional prompt contains the complete requirements and gives an advisory review across 20 checks, with 100 possible points. It may use installed local tools and disposable copies while preserving your working files and existing data. The report returns in chat; inspect its evidence and unverified items before deciding what to change.

The application and tests use local records after setup. They must work without calling the hosted legacy service. The build downloads no external fonts or assets.

## Branch stacks and review size

Use Git for local branches; GitHub access is optional for participants. If starting from the ZIP, initialize a repository and commit the unchanged starting state. Plan each branch against its preceding branch before implementation. Read `.claude/skills/spec-to-stacked-pr/references/stack.md` for commands and permitted-repository setup. Never open workshop PRs into the Tenex starter.

Choose the PR changed-line limit in 02.A. Run `npm run check:pr -- --base <preceding-branch> --limit <selected-limit>` for the complete layer, including saved work and new files; `npm run test:pr` verifies the counting rule. This is separate from the 500-line source-file limit. No numeric ACV-wide PR policy has been set.

## Fictional PM inputs

Module 05 begins with `product/follow-up/REQUEST.md`, `PRODUCT-SPEC.md`, `JOURNEY.md` and `follow-up.html`. Ask product questions before reading CLARIFICATIONS.md. The prototype keeps notes only in page memory and deliberately leaves decisions open. It is fictional training material.
