---
kind: prediction
about: 13-work-order-sensor-writer.md
written: 2026-09-20T16:10+10:00
by: dispatcher (main session)
---

# What I expect the sensor-writer to produce

Written before the role was dispatched and never shown to it. I have read the
builder's report and the work order. I have not read `spec/*.test.ts`.

1. **One test, and it goes red for the reason it names.** The role file demands
   red before green, pasted. I expect the red output to be a missing table on a
   named week, not an error in the test's own setup.
2. **It reads `dist/`, not `src/`.** Its role file says so and it has no other
   way to see what shipped. If the test opens a `.astro` file, the role
   ignored its own rules.
3. **It names no component or class.** The work order says the table is new
   and does not give the component's name. I expect the test to match the
   `<table` element and its header text.
4. **Its weak point is the third column.** The test can compare the trick and
   mechanism cells to the API, but for `seen` it can only check that the cell
   is not empty; it cannot know it is the right sentence. I expect the role
   to say so under Questions, or not to say so at all.
5. **It does not test the viewport.** A spec cannot measure 390px, and the
   role should say the phone claim has no sensor behind it.

## What I would have done alone, for the gap

I would have written the check as a loop over the twelve weeks in the
existing `two registers a week` test's shape, and probably added the week-10
absence to that test rather than to a new file. The role file forbids a
second assertion for convenience; the gap is whether it splits them.

## What would make this prediction worthless

If the test matches the builder's class name or component, or the report
shows red only for a typo, the sensor is decorative and the evidence entry
says so.
