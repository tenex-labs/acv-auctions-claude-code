# Plan and verify a stack

Read this during planning, before each layer and when preparing PRs.

## Inputs and branches

Require the engineering spec, approved stack plan, selected review criteria and review preference. Ask about missing values and wait before dependent work. Confirm `git status`, current branch, the actual base commit and the intended repository. Preserve unrelated work. A ZIP has no Git history: initialize a fresh local repository and commit its unchanged starting files before creating layers. Git is needed for a branch stack; GitHub and a personal account are optional.

Record a table: purpose | branch | base | dependencies | acceptance checks | changed-line limit. Name a branch when beginning a coherent concern, with its tests. Use `git switch -c <layer> <base>` after confirming the worktree is suitable; never discard existing changes to switch.

## Supplied line counter

Run from the Git root:

```sh
npm run check:pr -- --base <preceding-branch> --limit <selected-limit>
npm run test:pr
```

This command snapshots saved work in a temporary Git index and leaves the actual staging area unchanged. It counts additions plus deletions for the complete layer against the explicit base. New files count in full. Tracked generated text, lockfiles, prose and tests count too. Renames count as deletion plus addition. Tracked files, saved unstaged edits and nonignored new files all count, across every commit. No file is silently omitted from the proposed tree.

Ignored untracked paths are listed in the result and are not proposed for the PR. Review that list: if an ignored file belongs in the change, explicitly add it to Git and rerun. Dependencies, build output and runtime data should remain untracked. Binary changes cannot be measured in text lines and fail this gate pending separate review. Never hide maintained code in ignored paths. Run `check:size` separately for the 500-line maintained-source-file limit.

The counter verifies that the base is an ancestor, but cannot know your intended plan. Compare its base name and commit with the approved table and GitHub PR metadata. A technically valid but wrong earlier base measures the wrong layer. Save actual JSON output outside the measured project while checking, or rerun after adding an evidence file. Do not report the previous check for newly changed bytes.

`test:pr` uses disposable repositories to check the selected limit, one above it, new files, deletions, generated text, full multi-commit differences, saved uncommitted work, the unchanged real index and base selection. The only dependencies are Node 24 and Git; scripts/check-pr.mjs and scripts/check-pr.test.mjs ship with this project. Check the script and its tests before moving it to another repository.

## Hosted PR or local fallback

Read the repository remote and confirm access and authorization before pushing. With an established permitted target, push each layer and use:

```sh
gh pr create --draft --repo <permitted-owner/repo> --base <preceding-branch> --head <layer-branch> --title <reviewed-title> --body-file <reviewed-body-file>
gh pr view <number> --repo <permitted-owner/repo> --json baseRefName,headRefName,url,additions,deletions
```

This workshop uses ordinary dependent PRs with explicit bases. It does not require GitHub's preview stack extension or imply its automatic rebasing features were used. Without GitHub access, retain local branches and provide those exact proposed fields in chat. Every PR description states the observable change, actual checks and remaining gaps. Do not assign reviewers, send messages, merge or deploy unless separately authorized.

Sources checked September 15, 2026: [GitHub PR creation](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request), [stacked PRs](https://docs.github.com/en/pull-requests/get-started/about-stacked-prs).
