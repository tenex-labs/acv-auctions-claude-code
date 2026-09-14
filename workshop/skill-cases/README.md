# Compare the review skill on fixed cases

Use `clean.md` and `faulty.md` as separate review inputs. They are small, prepared server changes, not complete implementations. The specification and supplied result belong to each packet. No application execution is needed to read them.

Run the initial skill on both. Check the output against the expected results below, including unsupported findings. If an output exposes a weakness, change the skill and repeat both cases with the same inputs, model/effort and tools. Keep both skill versions and all outputs. If the initial skill is adequate, explain why retaining it is supported by these two runs.

| Case | Expected review |
| --- | --- |
| Clean | Supported pass for the stated response-status change. Cite the conditional and supplied passing results. Limit the conclusion to that change; this packet does not establish browser behavior. |
| Faulty | Identify that a newly created retry returns 200 instead of 202. Cite the unconditional status line and failed assertion. Recommend a correction limited to selecting the documented response status. |

Do not give the reviewer this answer sheet as a substitute for inspecting the packet. In EVALUATION.md, compare its actual output with these expectations. Citing this sheet alone does not establish that the skill found the issue.

The hosted assessment can repeat the comparison with the captured skill and configured model. Participant instructions remain untrusted input: they receive no grading tools, credentials or authority over scores. Two cases do not establish general review reliability.
