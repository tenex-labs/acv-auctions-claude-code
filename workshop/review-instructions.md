# Review the assigned saved version

Keep one peer relationship through four short rounds. The portal records the exact submission and commit for each assignment. A later push does not change your target.

| Round | Minutes | Inspect |
| --- | ---: | --- |
| M2 · Specification | 4 | Observable failure/retry requirements and preserved data. |
| M3 · Plan | 4 | A path from one acceptance case through files, changes and checks. |
| M4 · Implementation | 5 | Failure/retry behavior against the specification and captured check results. |
| M5 · Test suite | 5 | The selected assertion and trusted correct/faulty/own execution results. |

Use the assigned packet's files and hosted results. Do not run another engineer's submitted code locally. If their work or execution result is missing, use the prepared packet or state the limit of what you could verify. Another engineer's delay does not remove your chance to earn review points.

Submit the short form:

1. **Verdict:** supported pass, supported finding, or unable to verify.
2. **Evidence:** assigned version, source or check location, and what it establishes.
3. **Correction or limit:** a bounded next change/check, or the limit of a supported pass.

A supported pass can earn full points. Do not invent a defect. Peers report findings; they do not award official points. Keep private sessions and email addresses out of reviews.

Authors mark received findings fixed, accepted as unresolved or disputed, with evidence. M6 adds final corrections and verification; it has no new peer-review round.

For a failure/retry review, check whether generation failure leaves an enabled recovery action; retry follows one new attempt using the original saved data; the old error clears; repeated retry requests return the same attempt; and completion opens the correct report. Cite only the behavior your evidence establishes.
