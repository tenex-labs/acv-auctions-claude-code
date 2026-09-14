# Prepare and open an inspection report

The user has completed an inspection and needs its report. They should know whether work is waiting, running, ready or blocked.

| Step | Action | Expected result |
| --- | --- | --- |
| J-01 | Open an inspection. | See that inspection’s current report and attempt, if any. |
| J-02 | Generate a report. | See the request, queued and running states. Repeated clicks do not create another active attempt. |
| J-03 | Open the completed report. | Read the correct inspection contents. The displayed progress comes from the server. |
| J-04 | Generation fails; request a retry. | Leave the busy state, show the error and enable Retry. Retry uses the failed attempt’s original inspection data, even if the inspection has since changed. Repeated retry requests return the same retry. |
| J-05 | Looking up progress fails; choose Check again. | Read the same attempt again without starting work. Clear the lookup error when a fresh result arrives. |
| J-06 | Reload or switch inspections. | Resume the active attempt on reload. Show only the selected inspection’s state and report. Previously completed contents stay intact. |

The HTML demonstrates the successful path using sample data and timers. It does not demonstrate the server connection, recovery or durable state. Browser reload and server restart differ: browser reload must recover the running server’s state; server restart resets this application’s temporary data.

Use [the shared product decisions](../workshop/product-decisions.md) for exact labels and retry rules, and [AC-01–06](../workshop/acceptance.md) for the published checks. Those requirements control where the prototype is incomplete.
