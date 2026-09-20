---
to: designer
kind: work-order
written: 2026-09-20T15:10+10:00
reads:
  - docs/experiments/task-lecture-week-table.md
  - docs/course-design.md
  - src/pages/lectures/[slug].astro
  - src/components/
  - src/site-config.ts
  - docs/site-review.md
writes:
  - docs/design/lecture-week-table.md
---

# One-line job

Design the three-column table that goes near the top of every lecture page, for
both marking viewports, so that `page-builder` can build it and `content-writer`
knows what shape of line the third column takes.

## Read these, in this order

1. `docs/experiments/task-lecture-week-table.md` — the task. The columns, the
   data each one comes from, and what "done" means.
2. `docs/course-design.md` — read § *Tone and the lines we hold*, and the
   entries for week 10 and week 12.
3. `src/pages/lectures/[slug].astro` — the page the table goes into. Read what
   it already shows above the prose.
4. `src/components/` — what already exists.
5. `docs/site-review.md` § *Theme affordances we own and don't use*.
6. `src/site-config.ts` — brand tokens.

## Write exactly this

`docs/design/lecture-week-table.md`. There is one page in scope: the lecture
page. The table is a new component on it, so the seven sections in your role
file apply to the page and to the table.

## Facts you will not find in the files

- The reader is a prospective student who spends about ten minutes on the whole
  site and samples pages. It is marked in Chrome at exactly 1920x1080 and
  390x844.
- Each cell is a sentence, not a word. "The trick" is written in corporate
  voice ("Split one ticket into five."), "The mechanism it exploits" is a full
  plain-English sentence of 20 to 40 words, and "Where you'd see it" will be one
  line. At 390px three such columns do not fit side by side.
- Nothing may scroll sideways at 390px, inside a box or on the page. This repo
  has shipped a table that did.
- The first two columns are read from existing data at build time; only the
  third column is new. The third column's text will live on the lecture entry
  beside `mechanism`. You do not name the field.
- The build runs axe over every page and fails on a violation. Dark theme is
  not checked by anything.
- Week 10 has no `trick` and no `mechanism`, on purpose, and a spec test holds
  the site to exactly one such week. Week 12's trick is the sentence "There
  isn't one. You write the rubric now."
- The lecture page already prints the mechanism in a paragraph headed "Why it
  works", above the prose, in plain English with no box or rule.

## Done when

1. `docs/design/lecture-week-table.md` has all seven sections for the lecture
   page and for the table.
2. Every section states its phone behaviour, or says "no difference".
3. Nothing in the file is code, markup or CSS, including a sketch.
4. No colour or spacing is given as a literal value; tokens are named.
5. `git status --porcelain` lists only `docs/design/lecture-week-table.md`.

## Out of scope

Page copy. Deciding what week 10's row says. Deciding whether the existing
"Why it works" paragraph stays. These are two questions the task leaves open;
say what each option costs the reader and put both under `## Questions`. Design
the table so it works whichever way they are answered.

The stand-up pages, home page, decks, assessments, and the styling of anything
that is not this table.

## If unsure

List it under `## Questions` and design the part that is not in doubt.
