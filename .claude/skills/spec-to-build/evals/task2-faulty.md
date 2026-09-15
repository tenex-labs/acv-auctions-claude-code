# Fixed review case

## target
Review the supplied function excerpt and check record.

## behaviors
FU-04: a second open follow-up returns 409 with the existing record and saves nothing.

## spec
FU-04: a second open follow-up returns 409 with the existing record and saves nothing. The packet is deliberately limited to the function and recorded checks.

## diff
The proposed function is below. Cite this packet's line numbers.

```ts
export function createFollowUp(input) {
  requireFinding(requireInspection(input.inspectionId), input.findingId);
  const note = validateNote(input.note);
  const record = makeRecord(input, note);
  save(record);
  const open = findOpenByFinding(input.inspectionId, input.findingId);
  if (open && open.id !== record.id) throw new ServiceError('FOLLOW_UP_EXISTS', 'Already open', {followUp: open});
  return record;
}
```

## source
This packet is self-contained. Other helpers and the HTTP mapping are not supplied.

## checks
Supplied teaching check record, fixed for the comparison. This is not a claim about the participant's current code.

```text
PASS second request: 409
FAIL records after duplicate
AssertionError: expected 1, received 2
```

Return a verdict, cited evidence, bounded correction or supported limitation. Do not edit or run commands.
