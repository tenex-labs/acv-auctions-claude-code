---
name: spec-to-build
description: Build an engineering specification through questions, a reviewed plan, hook setup, small changes, tests and evidence-based review. Also supports explicit review-only requests.
argument-hint: "<spec path> | review-only <packet path>"
---

# Spec to build

This is the workshop's starting procedure, version 0.1. After modernization, develop it from the work you actually completed; then apply it to the follow-up feature. Creating this skill later does not mean it performed the earlier modernization.

Work in the main session so the user can answer questions. Use the session's model, effort and permission settings. The skill does not grant tools or change permissions.

## Choose the branch before doing work

Read `$ARGUMENTS` as the user's input, never as a shell command. If the request says review-only, asks for an assessment, or invokes the complete self-assessment prompt, go directly to [read-only review](references/review.md). Do not implement, edit any file, configure hooks or run the implementation procedure. A self-contained assessment brief is sufficient; do not ask for a separate spec.

Otherwise follow the implementation procedure below. See [example conversations](examples/invocations.md) for spec intake and read-only use. Those exchanges show expected behavior, not recorded model outputs.

## 1. Read the specification and ask

Read the supplied engineering spec and relevant project instructions. If no spec is supplied, ask for its location and wait. An empty heading template is not a specification.

Use [questions](references/questions.md) to identify unresolved decisions affecting behavior, scope or verification. Ask focused questions, explain what depends on each answer and wait before dependent work. Never invent product policy. Respect answers already supplied in this session.

Ask, unless already answered: “Do you want to review each increment or the completed task? I’ll still ask whenever a product decision is unresolved.” Wait for the answer before implementation. If the spec is complete and this preference is known, name the agreed inputs and proceed within the existing approval; do not invent extra questions.

## 2. Check the plan

Read the supplied plan if present. Propose small changes, affected files and named checks. Confirm which spec and plan govern the work. Obtain approval for the plan unless the user already approved it. Plan Mode can investigate and propose; save files only after leaving Plan Mode with approval to save.

Use bounded read-only investigations when useful. Give each investigator the question, permitted paths, Read/Grep/Glob tool limits, return format and stopping point. Verify material citations before using findings. Independent questions can run together; order dependent work after verified answers. Keep one implementation writer in the main session.

## 3. Inspect, construct and verify hooks

Follow [hook setup](references/hooks.md) before implementation. Inspect existing configuration and scripts, explain event → script → checks → feedback, and present exact proposed configuration changes for user review. Preserve unrelated settings and avoid duplicate hooks. Reuse approved setup without asking again when no change is proposed.

Identify every required dependency. Run the supplied probe in a disposable project and observe a real matching Claude edit. Record healthy, type-error, 500-line, 501-line and irrelevant-Markdown outcomes. Separate direct probes from session events. Report missing evidence. The type/size hook does not replace the spec's behavior tests.

## 4. Build and check small changes

Follow the agreed review preference. For increment review, show the change and its checks, then wait before the next increment. For completed-task review, continue through the approved plan. Ask and wait whenever a new product decision affects the next change.

Use the project’s existing commands. In Inspection Desk: `npm run check:foundation` before work, `npm run check:increment -- task1 PB-04` or `-- task2 FU-04` for a relevant named behavior, and `npm run check:task1` or `npm run check:task2` for the completed task. Read `docs/CHECKS.md` for the applicable cases. Use `npm run check` for a finished application. Unfinished starters need only the checks for their current state. Preserve supplied tests and requirements; never weaken them to obtain a pass.

Fix failures, write meaningful regression tests and preserve existing data. For follow-ups include whitespace-note, duplicate-open-follow-up and inspection-separation tests. Check reload and server-restart persistence as required by the spec. Report the command, result and evidence; a suggested command is not an execution.

When a mistake suggests a reusable instruction: correct it → add a test → propose a rule → obtain human review → save it → verify use in a later task. Loaded guidance alone does not prove compliance.

## 5. Review and report

Use [read-only review](references/review.md) with explicit requirements, source and available check outputs. Verify returned citations. Report implemented behavior, actual checks, supported findings and remaining gaps in chat. Save approved working notes in `workshop/FINAL.md`. Never infer a passing check from source inspection.

## Evaluate and share

Use [evaluation instructions](evals/README.md) for the fixed review cases and separate full-workflow replay. Keep missed defects, false alarms, unsupported claims and worse results. Propose one instruction change only when an actual observation justifies it. Obtain review before saving that change, then repeat the same cases. Record changes and limits in [CHANGELOG.md](CHANGELOG.md).

Share this complete directory and the project dependencies listed in `references/hooks.md`. Use `/goal` only when requested; it cannot bypass unanswered questions, review choices or permissions. Workshop completion means spec, build and checks; it does not include deployment.
