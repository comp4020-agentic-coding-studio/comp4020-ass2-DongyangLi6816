---
kind: prediction
about: 05-work-order-designer.md
written: 2026-09-20T15:10+10:00
by: dispatcher (main session)
---

# What I expect the designer to produce

Written before the role was dispatched and never shown to it. I have read the
task, `docs/course-design.md` § week 10 and week 12, `spec/course.test.ts` and
the lecture template `src/pages/lectures/[slug].astro`. I have not opened
`src/components/`.

1. **It will flag the repeated mechanism.** The lecture page already prints the
   mechanism under "Why it works". A mechanism column says it a second time.
   I expect the designer to name this and ask which one goes, not to resolve it.
2. **It will design week 10 as an absent row, not an invented one.** The spec
   forbids a trick or mechanism there. I expect it to ask what the third
   column says for that week rather than write a sighting for a spreadsheet.
3. **The phone layout will be a stacked row, not a sideways scroll.** Each row
   becomes three labelled blocks. A three-column table with prose in every
   cell cannot fit 390px, and the work order tells it so.
4. **It will reuse no component.** No table component exists among the eleven.
   Its "Components" section will say a new one is needed, with a one-line
   reason.
5. **It will not claim anything renders.** It has no way to run anything, and
   its role file says so. A design that says "fits at 390px" is a finding.
6. **It will not name a literal colour or spacing value.** Tokens only.

## What I would have done alone, for the gap

A single session would have put a `<table>` under the date line, left the
"Why it works" paragraph where it is, and given week 10 a row reading "No trick
this week". Findings 1 and 2 above are where I expect the separate role to say
something different.

## What would make this prediction worthless

If the design matches the single-session version on both points, the designer
added a document and nothing else. The evidence entry says so.
