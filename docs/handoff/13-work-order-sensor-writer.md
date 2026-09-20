---
to: sensor-writer
kind: work-order
written: 2026-09-20T16:10+10:00
reads:
  - spec/README.md
  - spec/course.test.ts
  - spec/pages.test.ts
  - docs/experiments/task-lecture-week-table.md
writes:
  - spec/lecture-week-table.test.ts
  - docs/handoff/14-report-sensor-writer.md
---

# One-line job

Write one check that fails when a lecture page's week table is missing, has
the wrong headers, or states a trick or mechanism that differs from the stand-up
and the lecture it is read from.

## Read these, in this order

1. `spec/README.md` — the contract for a spec.
2. `spec/course.test.ts` — how the existing suite reads the API and the
   built pages. Its `two registers a week` test already holds the trick and
   mechanism data; do not repeat it.
3. `spec/pages.test.ts` — how rendered HTML is read.
4. `docs/experiments/task-lecture-week-table.md` — the promise.

## Write exactly this

`spec/lecture-week-table.test.ts` and `docs/handoff/14-report-sensor-writer.md`.

## Facts you will not find in the files

- **The promise, in one line.** Every lecture page from week 1 to week 12 except
  week 10 carries a table with three column headers, *The trick*, *The mechanism
  it exploits* and *Where you'd see it*, in that order, and its first two cells
  say what the stand-up's `trick` and the lecture's `mechanism` say. Week 10 has
  no table. That last part was decided after the task was written; the task's
  "all twelve" is out of date on it.
- The third cell's text comes from a `seen` key on the lecture entry. A spec
  cannot know it is the right sentence, so check only that the cell is present
  and not empty, and say in a comment why it goes no further.
- Lecture pages are at `dist/lectures/week-NN/index.html`.
- HTML-encoded text: an apostrophe is `&#39;` in the built file, so compare
  decoded text, not raw markup. Week 12's trick, "There isn't one. You write the
  rubric now.", is a value, not an absence, and the table must show it.
- The table is new and its component's name is deliberately not given. The
  check may not depend on it, on a class, or on the file it lives in.
- The 390px claim cannot be checked by a spec. The builder measured it with a
  browser. Say in the report that no sensor covers it.
- A missing value on any week but 10 already fails the build, by a throw in the
  page. That is a separate sensor and not yours to duplicate.

## Done when

1. `pnpm check` exits 0.
2. The report shows the same test failing against a broken input, pasted
   verbatim. Break it three ways, one at a time, each restored before the next:
   a table removed from one page's built HTML, a header text changed, and a
   trick cell changed so it no longer matches the stand-up. Say how each was
   broken and how it was restored.
3. No `it(...)` title repeats one already in `spec/`.
4. A comment above the test states the falsifier in one line.
5. `git status --porcelain` lists nothing outside the two files above.

## Out of scope

Anything under `src/`. Editing `dist/` other than for the red demonstration in
item 2, which is put back by rebuilding. A second promise.

## If unsure

List it under `## Questions` and write nothing for that part.
