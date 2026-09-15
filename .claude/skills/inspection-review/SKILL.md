---
name: inspection-review
description: Review implementation and tests against agreed requirements.
context: fork
agent: reviewer
argument-hint: <path to review packet>
---

# Inspection review

Review the implementation and its tests against the agreed requirements. Identify specific defects, missing checks and claims that the available evidence does not support.

Read the packet at $ARGUMENTS. It must provide target, behaviors, spec, diff, source and checks. Name missing inputs. Read only the named source paths and [output format](references/output-format.md).

This starter procedure is intentionally brief. Develop it after modernization, then reuse it for follow-ups. Do not edit or execute code during a review. Report only supported findings; "No supported findings" is valid.
