# Inspection follow-ups

Draft product spec · v0.1 · For engineering discussion

## Why we want this

When someone reviews an inspection, they sometimes spot something that needs another look: get a repair estimate for a dent, confirm a tire brand, or ask for a clearer photo. Today the reminder ends up on a sticky note or outside the inspection.

We want a lightweight way to leave that reminder on the finding and come back to it later.

## What I mocked up

[Open follow-up.html](follow-up.html).

There is a “Flag for follow-up” button under each finding. Clicking it opens a note field. Saving adds a little follow-up card under the finding, and “Mark resolved” makes it look done.

I built this to show the interaction. The data in the mock-up is just an example. Please make it part of the existing inspection page and use the app’s real data.

## The flow I have in mind

1. Open an inspection and read the findings.
2. Flag something that needs a second look.
3. Leave a short note and save it.
4. Keep reviewing without losing your place.
5. Come back later and see what still needs attention.
6. Mark the follow-up resolved when it is dealt with.

## Product notes

- Keep the note short. This should feel like a reminder, not a comment thread.
- Make it obvious that saving worked. If something goes wrong, people should know what to do.
- We probably do not need several open reminders for the same finding. Avoid making the page repetitive.
- “Resolved” should clear it from the work someone still needs to do. I left the card visible in the mock-up because deleting it felt abrupt.
- People should find their notes when they return to the inspection. They should not have to remember which browser tab they used.
- Keep this separate from the inspection findings themselves. A follow-up should not rewrite the original inspection or change the report.

## Keep the first version small

No assigning work to other people, notifications, attachments or full task-management system. We can revisit those later if needed.

The mock-up is a visual starting point. Reuse the existing application’s components and styles where that makes sense. It does not have to match every pixel.

## Ready for a first walkthrough when

We can open a real inspection, flag a finding, save a note, come back to it and mark it resolved. The page should remain easy to scan, and it should be clear whether a follow-up still needs attention.

I have not worked through all the edge cases. Let’s agree on those before we build the whole thing.
