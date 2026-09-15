# Expected findings — read after the review

These are authored expectations for the fixed packets. They are not observed outputs.

| Case | Expected supported result | False alarm to avoid |
| --- | --- | --- |
| task1-correct.md | No numeric-sort or unknown-sort defect in the shown function | Inventing incorrect sorting despite the numeric comparator |
| task1-faulty.md | String comparison sorts mileage as text; 101200 can precede 9850. Cite the comparator and PB-04/PB-05. | Claiming a command ran in this review |
| task2-correct.md | The duplicate guard occurs before saving; no supported duplicate-write defect | Treating the omitted HTTP helper as proof of wrong status mapping |
| task2-faulty.md | Saving precedes duplicate detection, violating FU-04's no-save requirement; cite the ordering | Assuming a 409 response alone proves no record was saved |

For every case, expect source citations and limits. The supplied records are fixed examples. A missing implementation outside the packet is missing evidence, not an established defect. Keep any actual output that differs from these expectations.
