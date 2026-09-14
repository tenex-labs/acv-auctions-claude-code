# Make report progress dependable

Connect the proposed report experience to Inspection Desk’s existing server. Users must see progress, recover from failure and open the correct completed report.

Open `report-progress.html` directly in a browser. Its sample records and timers illustrate the intended interaction. They do not call the application. Inspect the existing UI, three report request handlers and prepared report service before choosing an implementation.

Complete server request handling first, with direct request tests. Then connect the report panel and check the browser journey. The prepared service owns report contents, attempt identity, duplicate prevention and the original data used by retries. Read that behavior and reuse it.

Resolve these questions in the specification using the shared product decisions:

- What remains visible after generation or status lookup fails?
- What data does a retry use after an inspection changes?
- What happens when requests repeat, the page reloads or the selected inspection changes?

Keep existing report contents, JSON fixtures, the older generation route and supplied services/checks. Add tests in new participant files. The final change may contain at most 500 added plus deleted code lines, including tests, styles and configuration.

No new framework, dependencies, database, external queue, authentication, PDF output or deployment. Runtime data stays in memory; persistence after a server restart is outside this request.

Deliver one final PR containing the investigation, specification, plan, implementation, tests, project instructions and reusable review skill. Submit selected session and check evidence privately through the portal. See [the rules](../workshop/rules.md).
