# Construct and verify the after-edit hook

Use this reference during construction (03.C) and before reusing the skill (05.A). It describes executable project setup. Read-only reviews skip this procedure entirely.

## Required project files and tools

Run from the folder containing `package.json`. Inspection Desk supplies all of these dependencies:

- `.claude/settings.json`: project event configuration.
- `.claude/hooks/check-change.mjs`: reads the event payload; invokes type and size checks for counted files.
- `scripts/hook-probe.mjs`: controlled direct probes with saved outputs.
- `scripts/check-size.mjs`, `scripts/files.mjs`, `scripts/shared/size.mjs`, `scripts/shared/package.mjs`, `scripts/shared/archive.mjs`, `scripts/shared/contract.json`: source-file selection and the 500-line maximum.
- `package.json`, `package-lock.json`, `tsconfig.json`: Node 24.21.0, npm and the locked TypeScript toolchain. `npm run setup` installs dependencies before the workshop.

Read those files before running them. A different project must supply equivalent scripts and commands; review and test any adaptation before claiming reuse. This directory alone does not contain the application or its toolchain.

## Inspect and propose configuration

Inspect `.claude/settings.json` and any applicable local or managed settings. Never display secrets. In Claude Code, use `/hooks` to inspect the effective hooks. Workspace trust and managed settings can affect whether project hooks run.

The supplied configuration is:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "node .claude/hooks/check-change.mjs",
        "timeout": 60
      }]
    }]
  }
}
```

`PostToolUse` occurs after a successful matching tool call. The script reads the changed path from standard input. For a counted source file it runs `npm run typecheck` and `npm run check:size`. It saves output at `.check-output/hook/last.log`. A failure exits 2 and sends the error back to Claude. A successful check exits 0. An irrelevant Markdown edit exits 0 without running these checks.

Explain the event, script, checks and feedback. Compare existing entries by event, matcher and actual script target; equivalent absolute or relative commands are not two different requirements. If the required hook is already present, keep it. Otherwise present the exact change, including dependencies and timeout, and wait for user review before applying it. Merge only the needed entry; preserve unrelated settings and other hooks. Do not also put the same hook in skill frontmatter.

Inspect effective configuration again after approval. If settings are not reflected, start a fresh trusted session and check `/hooks`; do not add another entry to force a retry.

## Direct probes in a disposable copy

Preserve the user's project and existing data. Use an installed disposable copy and run `npm run hook:probe` from its root. The script refuses to overwrite an existing probe file, cleans up its own fixture and saves `.check-output/hook/probe.json`.

| Input | Expected result |
| --- | --- |
| Valid TypeScript | Exit 0; type and size checks pass |
| `const broken: number = "text"` | Exit 2; TypeScript reports the mismatched type |
| Exactly 500 counted lines | Exit 0 |
| 501 counted lines | Exit 2; size check names the file and count |
| `workshop/EVALUATION.md` edit | Exit 0; no type/size check runs |

These are expected results until you inspect the recorded output. Keep the failures as evidence of the controlled probes, not as defects in the restored project.

## Observe a real matching edit

In a trusted Claude session in the disposable copy, first create and read `src/server/hook-session-example.ts` with `export const total: number = 12;`. Ask Claude to use **Edit** to replace `12` with `"12"`, then stop so you can inspect the hook feedback. This deliberate error is limited to that fixture. Observe the Edit event and actual returned type error. Ask it to restore `12` with Edit and inspect the passing hook output. Remove only the fixture you created afterward.

Record the tool name, changed path, actual feedback and restoration. If the hook did not fire, say so and inspect trust, settings and matcher. A direct script invocation does not prove a Claude event occurred. A headless run establishes that mode only; it does not demonstrate the interactive workspace trust dialog.

`PostToolUse` cannot undo the edit. `PreToolUse` can reject a matching action before it runs. This Edit/Write matcher does not cover shell edits or every possible writing tool. Run named behavior tests separately: the hook does not prove application behavior, duplicate protection or persistence.

Source: [Claude Code hooks](https://code.claude.com/docs/en/hooks), checked September 15, 2026.

## Separate PR-size gate

Read references/stack.md and run the explicit per-layer `check:pr` command. Its scripts/check-pr.mjs, scripts/check-pr.test.mjs and package.json entries are required project dependencies. The existing Edit/Write PostToolUse hook runs typecheck and check:size only. It neither measures PR size nor covers Bash edits. Keep behavior tests separate. Run test:pr before accepting the selected counting rule.
