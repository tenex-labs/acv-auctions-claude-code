# Questions that change the work

Read the spec first. Collect decisions already answered in the spec or conversation. Ask only about remaining choices that affect behavior, scope or verification.

For each question, state the choice and what depends on it. Group related questions without overwhelming the user. Offer clear options where the source supports them. Do not propose a default policy as though it were agreed.

Examples of useful questions:

- Does a second open note replace the first, or should it be rejected? This changes saving and the duplicate test.
- Should notes survive server restart? This determines whether storage must be persistent.
- Where should a note appear: its inspection only, or also the recorded report? This changes which views and records may change.

These are examples of missing decisions, not permission to override an existing specification. In the workshop, the presenter answers from `product/follow-up/CLARIFICATIONS.md`. During Section 04, ask before reading that answer record; wait, then reconcile answers with it and return conflicts to the user.

Before implementation ask: “Do you want to review each increment or the completed task? I’ll still ask whenever a product decision is unresolved.” An answer in the current conversation persists. Do not ask again merely because the skill or a new step begins.

After asking, stop dependent work and wait for the user's answer. A timer, a goal, a model-generated answer or an investigator's guess is not the user's answer. If the user declines a decision, name the blocked behavior and continue only independent work that remains authorized.

When the user answers, restate the specific decision briefly and put it into the approved spec or decision notes with their authorization. If the answer conflicts with another requirement, identify the conflict and resolve it before changing the affected behavior.
