---
to: content-writer
kind: work-order
written: 2026-09-20T15:25+10:00
reads:
  - docs/design/lecture-week-table.md
  - docs/course-design.md
  - src/content/lectures/
  - src/content/sessions/
writes:
  - src/content/lectures/week-01.md
  - src/content/lectures/week-02.md
  - src/content/lectures/week-03.md
  - src/content/lectures/week-04.md
  - src/content/lectures/week-05.md
  - src/content/lectures/week-06.md
  - src/content/lectures/week-07.md
  - src/content/lectures/week-08.md
  - src/content/lectures/week-09.md
  - src/content/lectures/week-11.md
  - src/content/lectures/week-12.md
  - docs/handoff/08-report-content-writer.md
---

# One-line job

Add one `seen:` line to the frontmatter of eleven lecture entries: a single
plain-English sentence naming a place where a reader could watch that week's
trick happen.

## Read these, in this order

1. `docs/design/lecture-week-table.md`, the subsection *The shape of the third
   column, for `content-writer`* (Part 2). It is the rules for the line.
2. `docs/course-design.md`, § *Tone and the lines we hold*.
3. `src/content/lectures/week-01.md` to `week-12.md` — each week's `mechanism`
   and `sources`. Your line must not restate the mechanism and must not name a
   company or person that week's sources do not cite.
4. `src/content/sessions/01-*.md` to `12-*.md` — each week's `trick` and `cost`.
   Your line must not restate either.

## Write exactly this

The eleven lecture files listed in the frontmatter, and
`docs/handoff/08-report-content-writer.md`. In each lecture file add one line
`seen: <sentence>` directly under that file's `mechanism:` line, and change
nothing else in the file.

## Facts you will not find in the files

- The line becomes the third column of a table headed *The trick / The
  mechanism it exploits / Where you'd see it*. So it answers "where would I
  see this?" and the column label already says so: do not begin with "You'd see
  it in" or repeat the label in any form.
- The key is named `seen`. The site reads it as an unchecked key beside
  `mechanism`; nothing else needs to change for it to be accepted.
- **Week 10 is not in your list and gets no `seen:`.** It has no trick, and the
  table is deliberately not rendered on that page. Do not touch
  `src/content/lectures/week-10.md`.
- Week 12's trick is the sentence "There isn't one. You write the rubric now."
  It still needs a line: a place where a reader would watch someone write, or
  rely on, a rubric.
- The line will be read on a phone at 390px as the third of three stacked
  blocks. It is the shortest of the three.
- Every `: ` inside a frontmatter scalar breaks the build. Your role file says
  to quote or fold; do so for any sentence that has one, and prefer a sentence
  that has none.

## Done when

1. `grep -L '^seen: ' src/content/lectures/*.md` prints exactly one file,
   `src/content/lectures/week-10.md`.
2. Every `seen` sentence is at most 20 words, ends with a full stop, and
   contains no "You'd see", "you would see" or "you'll see".
3. No two `seen` sentences open with the same first three words, and no two
   name the same kind of place as their first noun.
4. None names a company, product or person that the same week's `sources` do
   not cite.
5. `pnpm check` exits 0, or the report quotes the failure verbatim.
6. `git status --porcelain` lists only the eleven files and the report.

The report restates 1 to 6 by number with the measured result. For 2, list the
word count of each of the eleven sentences.

## Out of scope

Week 10. Any other field in any lecture file. Anything under `src/components/`,
`src/pages/` or `spec/`. Rewording a `mechanism` or `trick`. Deciding whether
the table appears on the page.

## If unsure

List it under `## Questions` in the report and leave that week's line unwritten.
A missing line is visible; an invented one is not.
