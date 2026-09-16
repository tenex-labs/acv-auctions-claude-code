# Evaluate the agreed review criteria

Use workshop/review-criteria.md from the earlier review-criteria exercise. Do not choose a new team-wide limit or overwrite the learner's preferences. The four supplied behavior packets remain part of the review evaluation.

## Prepare the size cases

From the project root, substitute the learner's selected limit:

```sh
node scripts/prepare-review-evals.mjs --limit <selected-limit> --criteria workshop/review-criteria.md --out workshop/review-cases
```

The script requires Node 24, Git and scripts/check-pr.mjs. It creates a disposable repository and measures a complete layer with one new text file against main, first at the limit and then one line above. It saves the actual counts and base commits in two packets and size-results.json. It leaves the learner's Git index and work untouched, and refuses to overwrite an existing run.

Review at-limit.md and above-limit.md separately with the same fresh-session, read-only protocol in README.md. The first meets the size criterion; the second fails it. Both still require evidence for other criteria. The reviewer must describe supplied check output accurately and must not claim to have executed it.

## Add the learner's other criteria

For each additional failure condition, agree one compliant example and one violating example. Save exact requirements, excerpts and available evidence in separate packets before running the reviewer. Ask about ambiguous expectations and wait. Keep the expected answers separate from reviewer inputs. Reuse the review preference when deciding when to ask for review of any instruction change.

Record each actual output, missed violation, false alarm and unsupported claim in workshop/EVALUATION.md. Keep the packets and settings unchanged for repeat runs. These cases evaluate review behavior; they do not prove implementation or a complete workflow.
