# Fixed review case

## target
Review the supplied function excerpt and check record.

## behaviors
PB-04/PB-05: An unrecognized sort parameter leaves vehicles in saved order; mileage is numeric.

## spec
PB-04/PB-05: An unrecognized sort parameter leaves vehicles in saved order; mileage is numeric. The packet is deliberately limited to the function and recorded checks.

## diff
The proposed function is below. Cite this packet's line numbers.

```ts
export function sortByMileage(rows, sort) {
  if (sort !== 'asc' && sort !== 'desc') return rows;
  const ordered = [...rows].sort((a,b) => String(a.mileage).localeCompare(String(b.mileage)));
  return sort === 'desc' ? ordered.reverse() : ordered;
}
```

## source
This packet is self-contained. Other helpers and the HTTP mapping are not supplied.

## checks
Supplied teaching check record, fixed for the comparison. This is not a claim about the participant's current code.

```text
FAIL ascending first
AssertionError: expected veh-003 (9850), received veh-004 (101200)
```

Return a verdict, cited evidence, bounded correction or supported limitation. Do not edit or run commands.
