---
to: page-builder
kind: work-order
written: 2026-09-20T15:40+10:00
reads:
  - docs/design/lecture-week-table.md
  - docs/experiments/task-lecture-week-table.md
  - src/pages/lectures/[slug].astro
  - src/pages/sessions/[slug].astro
  - src/components/
  - src/lib/week-graph.ts
  - src/site-config.ts
writes:
  - src/components/LectureWeekTable.astro
  - src/pages/lectures/[slug].astro
  - docs/handoff/11-report-page-builder.md
---

# One-line job

Build the week table the design describes and render it on every lecture page
except week 10, reading the trick from that week's stand-up and the mechanism
and `seen` line from the lecture.

## Read these, in this order

1. `docs/design/lecture-week-table.md` — Part 2 is the table; Part 1 is where
   it sits on the page. It is the structure you build. Its Questions section
   is answered below.
2. `docs/experiments/task-lecture-week-table.md` — the task and its "Done when".
3. `src/pages/lectures/[slug].astro`, then `src/pages/sessions/[slug].astro`
   for the trick box and the absence marker the design says not to copy.
4. `src/components/` — list the directory first. The design's author could not,
   and asks you to reuse anything that already sets a labelled value.
5. `src/lib/week-graph.ts` and `src/site-config.ts` — how a week's lecture and
   stand-up are found, and the brand tokens.

## Write exactly this

- `src/components/LectureWeekTable.astro` — new.
- `src/pages/lectures/[slug].astro` — import and place the table.
- `docs/handoff/11-report-page-builder.md`.

No schema change. `src/content.config.ts` is not in your writes list on
purpose: the lecture schema passes unknown keys through, `mechanism` is already
read as an untyped key, and `seen` is read the same way. If you think it should
be typed, say so under `## Questions`.

## Facts you will not find in the files

- The third column's text is the `seen` key in each lecture entry's
  frontmatter, beside `mechanism`. It is already written for weeks 1 to 9, 11
  and 12. Week 10 has none.
- **Week 10 gets no table.** The decision was made after the design was
  written: no table, no absence markers, nothing in that page's markup from
  this component. It keeps its existing "No mechanism this week." line. The
  design's absence treatment is therefore not needed and should not be built.
- **The "Why it works" paragraph stays**, unchanged, directly below the table.
  The design's Question 1 is answered: keep. The mechanism is on the page twice
  by decision. Say so in your report.
- **Any week other than 10 with a missing trick, mechanism or `seen` must fail
  the build,** by throwing with the week number in the message. It must not
  render an empty cell or an absence marker.
- A week's trick is on the stand-up entry in the `sessions` collection whose
  `week` equals the lecture's. Week 12's trick is the sentence "There isn't
  one. You write the rubric now." It is a value and renders as ordinary text.
- The column labels are, verbatim, *The trick*, *The mechanism it exploits* and
  *Where you'd see it*. The table has a screen-reader-only name of the form
  "Week 2: trick, mechanism and where you'd see it".
- Size it against the real rows: the longest mechanism is week 11 (33 words,
  counted with `wc -w`), the longest `seen` line is week 9 (18 words), and week 12 has the
  trick that reads like an absence.
- Headless Chrome clamps a window to 500px wide. Report `innerWidth` and
  `scrollWidth` as the page gave them. A capture script may exist at
  `/private/tmp/claude-501/-Users-dongyangli-comp4020-comp4020-ass2-DongyangLi6816/26bc9507-a080-41b6-9e9b-f93baa9a671a/scratchpad/capture.mjs`;
  nobody has vetted it for this task, so read what it measures before you use it.

## Done when

1. `pnpm check` exits 0.
2. For each of `dist/lectures/week-NN/index.html` with NN in 01 to 09, 11 and
   12, the file contains a `<table` whose three header cells read, in order,
   `The trick`, `The mechanism it exploits`, `Where you'd see it`, and
   `dist/lectures/week-10/index.html` contains no `<table`. Show the command
   and its output.
3. At 390px, for weeks 9, 11 and 12, the report gives `innerWidth` and
   `scrollWidth` as the page reported them, both equal, and says how they were
   taken. It states the stack point you chose and the measurement that chose it.
4. On the phone, each label is announced next to its sentence exactly once,
   established from the browser's accessibility tree, not from the source. If you
   cannot read the tree, say so under *What I did not do*; do not substitute a
   markup check and call it this.
5. The dark theme is looked at at both viewports and the report says what was
   seen, or says it was not looked at.
6. Removing `seen` from one non-week-10 lecture entry makes `pnpm build` fail
   with the week number in the message. Show the output, then restore the
   entry byte for byte, and say how you know it was restored.
7. `git status --porcelain` lists only the three files above.

## Out of scope

Anything under `src/content/`, `spec/` or `scripts/`. The stand-up pages, home
page, decks, assessments. Restyling anything that is not this table. A link
in any cell. A shared absence-marker definition. Typing the `seen` key in the
schema.

## If unsure

List it under `## Questions` and build the part that is not in doubt.
