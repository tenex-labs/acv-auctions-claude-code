Every participant receives these requirements. The automatic checks assess the answers below. Use the reasons to explain the decisions in your specification.

| # | Product question | Answer (graded) | Reason |
| --- | --- | --- | --- |
| FU-01 | What does a follow-up belong to? | An existing inspection **and** one finding of that inspection. Creating one for an unknown inspection → 404 `INSPECTION_NOT_FOUND`; for a finding that is not part of that inspection → 404 `FINDING_NOT_FOUND`. | Checking both IDs keeps the follow-up attached to the correct inspection and finding. |
| FU-02 | What is saved? | A record `{ id, inspectionId, findingId, note, status, createdAt, resolvedAt }`; `id` server-generated and opaque; `status` `open` or `resolved`; `resolvedAt` null until resolved. Findings themselves are never modified. | Save the note and its timestamps while preserving the original finding. |
| FU-03 | What is a valid note? | Trimmed; 1 to 280 characters after trimming. Missing, non-string, empty, whitespace-only or longer → 400 `INVALID_NOTE`, nothing saved. Saved note is the trimmed text. | Require a short, non-empty note. Trim whitespace before checking its length. |
| FU-04 | Can the same finding be flagged twice? | Not while a follow-up for it is open: 409 `FOLLOW_UP_EXISTS`, and the response includes the existing open record so the interface can show it. After it is resolved, a new open follow-up may be created. | Prevent duplicate open follow-ups. Return the existing record so the interface can display it without another request. |
| FU-05 | Does it survive reload and restart? | Yes, both. Records are written to the configured store (`INSPECTION_DESK_DATA_DIR`) on every change and read back after a server restart. `npm run reset:data` is the documented way to clear them. | Saved notes must remain available after a page reload or server restart. |
| FU-06 | What does "resolved" mean? | `status` becomes `resolved` and `resolvedAt` is set once. Resolving again returns 200 with the same record (idempotent). Resolved records remain readable and listed. There is no un-resolve in this release. Resolving never changes the inspection's findings, revision or reports. | Repeated resolve requests keep the original timestamp. Resolved records remain available. |
| FU-07 | Where do follow-ups show? | Only on their own inspection's page, under their finding, oldest first. Never on another inspection's page and never on report pages. | Keep follow-up notes separate from recorded inspection findings and reports. |
| FU-08 | Which requests exist? | ../../docs/INTERFACE-CONTRACT.md section 4.2: create, list per inspection, read one, resolve. | The checks call these directly; the interface may use them however it likes. |
| FU-09 | Which screen elements are required? | ../../docs/INTERFACE-CONTRACT.md section 3.5 (button names, `follow-up-note`, alerts, `follow-up-<id>` with status attribute, `Mark resolved`, `follow-up-status`). Visual design is free. | Browser checks use the published element names. The prototype provides a visual reference. |
| FU-10 | What is out of scope? | Assignment to people, notifications, editing or deleting a note, un-resolving, attachments, comments on reports, authentication. | Not in the request; keep the change small enough for the session. |

How the checks use this (rubric: creation and validation 10, persistence 10, duplicate handling and isolation 10):

| Check | Behavior IDs | What runs |
| --- | --- | --- |
| Create and validate | FU-01, FU-02, FU-03, FU-09 | HTTP create on a variant inspection/finding → 201 and the record shape; whitespace note → 400 and the list stays empty; 300-character note → 400; unknown inspection → 404; browser: flag, save, `follow-up-status` text, alert texts |
| Persistence | FU-05 | Create; reload page → record visible; stop and start the server with the same data dir → `GET …/follow-ups` still returns it; `reset:data` removes it |
| Duplicate and isolation | FU-04, FU-06, FU-07 | Second create → 409 with the existing `followUp` and still one record; resolve → 200; resolve again → 200 with unchanged `resolvedAt`; create again after resolve → 201; POST to another inspection with that finding id → 404; other inspection's list is empty; `GET /api/inspections/:id` and the generated report unchanged after resolve |
