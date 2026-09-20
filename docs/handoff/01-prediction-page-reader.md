---
kind: prediction
about: 02-work-order-page-reader.md
written: 2026-09-20T14:40+10:00
by: dispatcher (main session)
---

# What I expect the page-reader to find

Written before the role was dispatched and never shown to it. I have read the
content source and `docs/site-review.md`; I have not opened the captures. The
point of writing this down is that it can be wrong, and the gap is the only
evidence that a separate reader saw something this session would not have.

1. **No horizontal overflow at 390px on any of the six pages.** Already
   measured — `scrollWidth` equals `innerWidth` on every phone capture — so a
   finding that contradicts this would mean the reader is reading the picture
   rather than the numbers.
2. **The week 2 lecture reads thin.** Two sections, Outline and Sources, about
   300 words, against a stand-up page with five. I expect this to be the
   reader's largest structural finding.
3. **Week 10 will be misread as broken.** It deliberately has no trick and no
   mechanism, and the page says "No mechanism this week." A reader with no
   access to `docs/course-design.md` should flag it. If it flags it as a
   defect, the work order is at fault, not the reader.
4. **The team packet page is dense on the phone.** Eight dashboard figures,
   three manager notes and two peer paragraphs in one column.
5. **Few or no restatement findings.** Three recent commits went through every
   page deleting sentences whose information had already appeared above them.
   If the reader still finds restatement, those commits missed something.
6. **Visual monotony.** One SVG on two pages and no figures, tables or
   callouts anywhere else; six pages of prose in the same rhythm.
7. **Nothing will be reported below a clip**, because no page exceeded the
   6,000px clip height and every capture is whole.

## What would make this prediction worthless

If the report contradicts none of these and adds nothing to them, the
arrangement was ceremony tonight and the evidence entry says so with the
number. A gap of zero is a finding, not a failure to report one.
