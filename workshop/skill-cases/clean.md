# Server response review · clean case

Target: prepared-clean-v1. Review only the changed response-status line.

## Specification

A retry request returning a new child uses HTTP 202. A repeat request returning the existing child uses HTTP 200. Both responses include the service result and a Location header. The unchanged preceding code validates the request and obtains `result` from the prepared service.

## Change

```diff
 const result = retryFromService(request);
- const responseStatus = 202;
+ const responseStatus = result.reused ? 200 : 202;
 response.location(`/api/report-runs/${result.run.id}`);
 response.status(responseStatus).json(result);
```

## Supplied execution record

Prepared fixture record for this exact case: new-child response equals 202 — passed; reused-child response equals 200 — passed; Location and result identifier agree — passed. These are supplied case inputs, not execution of a participant’s application. No browser checks are included.

Return a verdict, cited evidence, bounded correction or supported limitation. Do not edit or run commands.
