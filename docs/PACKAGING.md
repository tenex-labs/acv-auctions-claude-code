# Save a local backup

Before switching to checkpoint C1, run this from the project folder:

```sh
npm run package -- --recovery
```

The command prints the backup path under `.workshop-private/recovery/`. Each run creates a new ZIP and preserves earlier backups. It works with unfinished feature code; completed-task checks do not need to pass. Wait for success before changing folders.

## What the backup contains

The backup includes saved source, tests, public documentation, specifications and plans under `workshop/`, and the complete `.claude/skills/spec-to-stacked-pr/` directory. It includes the supplied `legacy/` and `product/` references so links survive extraction. Recovery mode also saves the configured follow-up state as `.data/`.

Dependencies, build output, Git history, local Claude settings, transcripts, caches, existing archives and real `.env` files are excluded. `.env.example` is included. The command refuses linked files and likely credentials, naming the path rather than printing a secret. Keep the original project as well as the backup.

The local helper uses the supported formats and limits in `../scripts/shared/contract.json`: ZIP size 25 MiB, extracted files 100 MiB, 3,000 files and 2 MiB per file. It checks every included file and records its content hash. SVG and Vitest `.snap` files are supported text. Fix a reported packaging error before switching to C1.

## Start from C1

Extract `inspection-desk-task1-migrated.zip` into a new folder after the backup succeeds. Carry over your own workshop notes, complete spec-to-stacked-pr skill, review-criteria.md and reviewed project rules. Run `npm run setup` and `npm run preflight` in the new folder. Keep the previous project available for comparison.

To inspect a recovery ZIP, extract it into a separate empty folder. The root contains the saved project files. Run setup there before starting the application. No Git commands are needed.
