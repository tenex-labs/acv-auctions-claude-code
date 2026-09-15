# Read-only review branch

Use this branch for `review-only <packet path>`, an explicit review request, or the complete self-assessment prompt. Do not run spec intake, request progress preferences, implement, edit any file or configure hooks. Return the review in chat.

## Inputs and boundaries

Read the supplied requirements, permitted source paths or excerpts, and available results. The packet may include a diff, behavior IDs and checks. If an input is absent, name it as missing. A self-contained assessment brief supplies its own requirements and does not require a separate spec or the legacy site.

For fixed packet reviews, use only Read, Grep and Glob; do not run commands. Read only the assigned packet and this procedure. Do not read expected findings, other cases, prior outputs or trainer material before returning the review. The `.claude/agents/reviewer.md` worker has these read-only tools if the main session uses a separate reviewer. Give it the complete assignment and paths; verify its material citations on return.

For the complete self-assessment, its supplied instructions control verification. The main session may run the installed local checks and create disposable verification copies explicitly allowed by that prompt, after inspecting scripts. Do not change working source, tests, instructions or existing data. A Read/Grep/Glob worker can review supplied results but cannot perform those executions; do not claim it did. Do not browse, install dependencies or call external services for that assessment.

## Findings

For fixed packets, exclude hypothetical defects about omitted helpers, unsupported input types, concurrency or unspecified product policy; report only violations established by the supplied requirement and excerpt, and put missing evidence in a short limits section.

For each supported finding give:

1. Requirement and behavior ID, or a quotation from the supplied requirement.
2. File and line, or exact excerpt location.
3. Concrete consequence for a named input.
4. Evidence kind: inspected source, supplied check record, or actually executed check.
5. A verification step and the expected outcome; mark it unexecuted if it was not run.

Distinguish missing evidence from a demonstrated defect. A missing helper excerpt does not establish the helper is broken. Do not invent failures outside the packet. “No supported findings” is valid. Preserve limitations even when the supplied check record says PASS. A fixed teaching record is not a test run against the user's current code.

For self-assessment, preserve its complete report and points rules, including unassessed points. Otherwise report scope, supported findings and unresolved evidence. Suggest corrections without making them.
