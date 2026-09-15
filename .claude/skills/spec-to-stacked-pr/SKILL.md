---
name: spec-to-stacked-pr
description: Build an engineering specification through questions, a reviewed plan, hook setup, small changes, tests and evidence-based review. Also supports explicit review-only requests.
argument-hint: "<spec path> | review-only <packet path>"
---

# Spec to stacked PR

This is the workshop's starting procedure, version 0.2 scaffold. After modernization, develop it from the work you actually completed; then apply it to the follow-up feature. Creating this skill later does not mean it performed the earlier modernization.

Work in the main session so the user can answer questions. Use the session's model, effort and permission settings. The skill does not grant tools or change permissions.

## Choose the branch before doing work

Read `$ARGUMENTS` as the user's input, never as a shell command. If the request says review-only, asks for an assessment, or invokes the complete self-assessment prompt, go directly to [read-only review](references/review.md). Do not implement, edit any file, configure hooks or run the implementation procedure. A self-contained assessment brief is sufficient; do not ask for a separate spec.

Otherwise follow the implementation procedure below. See [example conversations](examples/invocations.md) for spec intake and read-only use. Those exchanges show expected behavior, not recorded model outputs.

## 1. Read the specification and ask

Read the supplied engineering spec and relevant project instructions. If no spec is supplied, ask for its location and wait. An empty heading template is not a specification.

Use [questions](references/questions.md) to identify unresolved decisions affecting behavior, scope or verification. Ask focused questions, explain what depends on each answer and wait before dependent work. Never invent product policy. Respect answers already supplied in this session.

Ask, unless already answered: “Do you want to review each increment or the completed task? I’ll still ask whenever a product decision is unresolved.” Wait for the answer before implementation. If the spec is complete and this preference is known, name the agreed inputs and proceed within the existing approval; do not invent extra questions.

## 2. Plan the branch stack

Read the supplied plan and `workshop/review-criteria.md` if present. Reuse the selected review preference. If the PR-size limit or counting rule is missing, ask and wait before implementation. There is no default ACV-wide number. Follow [stack planning and counting](references/stack.md).

Plan coherent layers before writing application code. Record each branch, its preceding base branch, one purpose, affected files, dependencies and named tests. Every layer includes its relevant tests. The number of layers follows the work and selected limit; do not promise a fixed number without checking. Propose small changes, affected files and named checks. Confirm which spec and plan govern the work. Obtain approval for the plan unless the user already approved it. Plan Mode can investigate and propose; save files only after leaving Plan Mode with approval to save.

Use bounded read-only investigations when useful. Give each investigator the question, permitted paths, Read/Grep/Glob tool limits, return format and stopping point. Verify material citations before using findings. Independent questions can run together; order dependent work after verified answers. Keep one implementation writer in the main session.

## 3. Inspect, construct and verify hooks

Follow [hook setup](references/hooks.md) before implementation. Inspect existing configuration and scripts, explain event → script → checks → feedback, and present exact proposed configuration changes for user review. Preserve unrelated settings and avoid duplicate hooks. Reuse approved setup without asking again when no change is proposed.

Identify every required dependency. Run the supplied probe in a disposable project and observe a real matching Claude edit. Record healthy, type-error, 500-line, 501-line and irrelevant-Markdown outcomes. Separate direct probes from session events. Report missing evidence. The type/size hook does not replace the spec's behavior tests.

## 4. Build and verify each layer

Confirm the actual base before creating each branch. Implement one coherent layer with its tests. Run `npm run check:pr -- --base <preceding-branch> --limit <selected-limit>` from the project Git root, including all proposed saved edits and new files. Inspect its listed paths and compare the base with the approved plan. Stop on an oversized layer or unexplained omission; propose a coherent smaller layer or return the conflict for a decision. Splitting commits does not reduce the layer. Pass relevant tests and the size check before advancing.

Follow the agreed review preference. For increment review, show the change and its checks, then wait before the next increment. For completed-task review, continue through the approved plan. Ask and wait whenever a new product decision affects the next change.

Use the project’s existing commands. In Inspection Desk: `npm run check:foundation` before work, `npm run check:increment -- task1 PB-04` or `-- task2 FU-04` for a relevant named behavior, and `npm run check:task1` or `npm run check:task2` for the completed task. Read `docs/CHECKS.md` for the applicable cases. Use `npm run check` for a finished application. Unfinished starters need only the checks for their current state. Preserve supplied tests and requirements; never weaken them to obtain a pass.

Fix failures, write meaningful regression tests and preserve existing data. For follow-ups include whitespace-note, duplicate-open-follow-up and inspection-separation tests. Check reload and server-restart persistence as required by the spec. Report the command, result and evidence; a suggested command is not an execution.

When a mistake suggests a reusable instruction: correct it → add a test → propose a rule → obtain human review → save it → verify use in a later task. Loaded guidance alone does not prove compliance.

## 5. Prepare proposed PRs and report

A pull request (PR) proposes a change for review. A local branch is not a hosted PR. Follow [stack planning and counting](references/stack.md) for exact base/head metadata. Create hosted draft PRs only after the target repository, access and user authorization are established. Keep every layer in the learner's permitted repository, never require PRs into the Tenex starter. Each hosted PR must target the preceding branch. Otherwise return local branches and the exact proposed title, base, head, purpose, verification results and gaps for each PR. Do not merge or deploy as part of this skill.

Use [read-only review](references/review.md) with explicit requirements, source and available check outputs. Verify returned citations. Report implemented behavior, actual checks, supported findings and remaining gaps in chat. Save approved working notes in `workshop/FINAL.md`. Never infer a passing check from source inspection.

## Evaluate and share

Use [evaluation instructions](evals/README.md) for the fixed review cases and separate full-workflow replay. Keep missed defects, false alarms, unsupported claims and worse results. Propose one instruction change only when an actual observation justifies it. Obtain review before saving that change, then repeat the same cases. Record changes and limits in [CHANGELOG.md](CHANGELOG.md).

Share this complete directory and the project dependencies listed in `references/hooks.md`. Use `/goal` only when requested; it cannot bypass unanswered questions, review choices or permissions. Use [the Module 04 capture worksheet](examples/capture.md) to replace the scaffold with the procedure you actually performed. Do not claim the new skill performed earlier modernization. Workshop completion means spec, branch stack, build and checks; it does not include deployment.
