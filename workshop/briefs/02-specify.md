# M2 · Specify · 20 minutes

“Support retry” leaves decisions about saved data and repeated requests unanswered.

Decision: What product answer changes an observable requirement?

## Claude Code controls

**Claude-led clarification.** AskUserQuestion lets Claude ask for a decision before implementing. Ordinary questions are an equivalent fallback. Ask which inspection data Retry must use.

**Durable task context.** A referenced specification preserves the agreed task across conversations. SPEC.md is not loaded automatically. Reference the agreed SPEC.md when planning, implementing and reviewing.

## Do

1. Give Claude the investigation, product decisions and acceptance cases. Have it ask about an ambiguity that changes implementation.
2. Answer from workshop/product-decisions.md. Check how the answer changes an observable requirement.
3. Write SPEC.md in at most 500 words: all six acceptance cases, failure handling, preserved contents and scope. Keep application code unchanged.
4. Commit, push and save M2. Review the assigned specification for four minutes; submit a verdict, evidence and correction or limitation.

## Starting prompt

```text
Read my investigation, workshop/product-decisions.md and
workshop/acceptance.md. Before drafting SPEC.md, ask me about a consequential
ambiguity using AskUserQuestion if available. Use the shared product
decisions as authority and preserve any unresolved question. Then draft
observable cases for AC-01–06, preserved behavior and exclusions in no more
than 500 words. Do not implement. Show how the answer changed a requirement.
```

## Save your work

SPEC.md, M2 clarification and changed requirement; outgoing specification review. Attach the supporting exchange and your verification privately.

Commit and push your continuing PR, then select **Save submission** in the portal. Preview and redact session evidence before attaching it. Keep exports outside the repository; the private evidence route accepts selected excerpts when export or tenant rules prevent collection.

```sh
npm run check -- --stage m2
```

## Published grading

10 method points and 4 review points.

**CC-M2-CLARIFY · Resolve a consequential ambiguity · 3 points.**
Evidence: Question, shared product answer and the resulting requirement.

- Zero: “Make retry robust” with no checked clarification.
- Half: A meaningful question is answered but its effect on the spec is unclear.
- Full: A product answer resolves an ambiguity and changes an observable requirement.

**CC-M2-ACCEPTANCE · Specify observable behavior · 4 points.**
Evidence: SPEC.md covers AC-01–06, including status lookup and recovery.

- Zero: Acceptance IDs without observable outcomes.
- Half: Useful cases omit a required outcome or failure case.
- Full: Cases identify inputs/actions and observable outcomes for every published behavior.

**CC-M2-BOUNDARIES · Preserve behavior and limit scope · 3 points.**
Evidence: Report contents, retry data, service reuse and exclusions in SPEC.md.

- Zero: No supported preservation or scope rules.
- Half: Some boundaries are explicit but a material rule is missing.
- Full: Required contents and original retry data are preserved; service ownership and exclusions are explicit.

**REV-M2-VALIDITY · Reach a supported verdict · 2 points.**
Evidence: Verdict on the assigned specification: retry requirements and preserved data.

- Zero: Invented defect or unsupported pass.
- Half: A useful conclusion is only partly established.
- Full: A verified defect or supported pass accurately reflects the assigned case.

**REV-M2-EVIDENCE · Cite the assigned version · 1 points.**
Evidence: Exact assigned commit, source locations and relevant specification evidence.

- Zero: No evidence or the wrong saved version.
- Half: Relevant evidence leaves a material part of the claim unverified.
- Full: Reproducible evidence at the assigned version establishes the claim.

**REV-M2-USEFULNESS · Give a bounded correction or limitation · 1 points.**
Evidence: Specific next change/check, or the stated limits of a supported pass.

- Zero: Generic criticism or praise.
- Half: A useful direction lacks a concrete change/check or limit.
- Full: The author receives a bounded correction or a precise limit on supported acceptance.

Automated checks establish submitted versions, document limits, protected files and executed behavior. File existence or a command invocation alone does not earn method points. Final behavior contributes 40 points once, at M6. See [rules](../rules.md), [acceptance cases](../acceptance.md) and [full rubric](../rubric.md).

## Optional hints

- Walk through failure, retry and two repeated retry requests.
- Specify which saved inspection data Retry uses. Include status-lookup failure, Check again and recovery without a new attempt.

Hints and unavailable optional features cost no points.
