# Evidence

<!--
One entry per module. Each entry is short. Link larger artifacts under workshop/evidence/.
"Tested commit" is the commit you actually ran the checks on; you may commit this file afterwards.
Keep all workshop session exports and excerpts private. Attach them through the portal.
Write artifact references and your own verified decisions here; M1 is limited to 200 words.
-->

## M1

- Tested commit:
- Reproduction: <!-- the steps you took and what you saw -->
- Source references: <!-- path:line for the state update responsible and what the current test checks -->
- Model/effort: <!-- what you used and why the task did or did not justify a change -->
- Private session reference: <!-- a few lines showing the claim you checked -->
- Decision: <!-- what you corrected, accepted or rejected, and its effect -->
- Unresolved:

## M2

- Tested commit:
- Clarification: <!-- the material question Claude asked, the source-backed answer or the open decision -->
- Private session reference:
- Decision: <!-- how the answer changed SPEC.md -->
- Unresolved:

## M3

- Tested commit:
- Subagent: <!-- question, tools, model; link the returned finding -->
- Private session reference:
- Decision: <!-- accepted, corrected or rejected the finding, and how the plan changed -->
- Unresolved:

## M4

- Tested commit:
- Check output: <!-- path to the m4 result JSON or the relevant lines -->
- Review context file: <!-- path under workshop/evidence/ -->
- Private session reference: <!-- the most consequential finding from /workshop-review -->
- Decision: <!-- verified the finding against the code; corrected or supported acceptance -->
- Unresolved:

## M5

- Tested commit:
- Starting code and context: <!-- saved M4 commit, spec/plan versions, model/effort -->
- Regression test: <!-- file, fault, intended assertion and trusted correct/fault/own results -->
- Completion condition: <!-- the /goal text or the cohort fallback prompt -->
- Hook observation: <!-- relevant invocation, failure output, correction/pass and unrelated-action check; private packet reference -->
- Intervention: <!-- follow-up direction and reason, or none -->
- Stopping controls: <!-- interrupted at cutoff, goal cleared, schedule cancelled, or none running -->
- Check output:
- UI evidence:
- Private session reference:
- Decision: <!-- the completion or blocker judgment checked against executed results -->
- Unresolved:

## M6

<!-- Order: commit your code → `npm run check -- --stage m6 --json workshop/evidence/m6-check.json` → fill this entry from that result → `npm run check -- --stage evidence` → commit. -->

- Tested commit: <!-- the code commit the m6 result names (testedCommit in the JSON); this entry is committed afterwards -->
- Outgoing review target: <!-- M2–M5 assignment IDs and full reviewed commit IDs -->
- Received findings: <!-- one line per finding: accepted_fixed | accepted_unresolved | disputed_with_evidence, or "none received" -->
- Final checks: <!-- workshop/evidence/m6-check.json -->
- Readiness: <!-- ready_for_merge only if every required check in that result passed; otherwise changes_required and name what is unresolved -->
- Decision:
- Unresolved:
