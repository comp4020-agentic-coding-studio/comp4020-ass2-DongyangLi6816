---
to: content-writer
kind: work-order
written: 2026-09-20T15:27+10:00
reads:
  - docs/handoff/17-report-page-reader.md
  - docs/handoff/08-report-content-writer.md
  - src/content/lectures/week-11.md
  - src/content/sessions/11-the-rat-race.md
writes:
  - src/content/lectures/week-11.md
  - docs/handoff/20-report-content-writer.md
---

# One-line job

Replace the `seen:` line in `src/content/lectures/week-11.md` with a sentence
that names a place where a reader could watch the week's trick, leaving before
the equilibrium arrives, happen.

## Read these, in this order

1. `docs/handoff/17-report-page-reader.md`, finding 3 only. A reader looking at
   the rendered page found that week 11's row does not read across.
2. `docs/handoff/08-report-content-writer.md` — your earlier report and the
   rules that order gave you.
3. `src/content/lectures/week-11.md` and `src/content/sessions/11-the-rat-race.md`
   — the mechanism, the sources and the trick.

## Write exactly this

Change only the `seen:` line in `src/content/lectures/week-11.md`, and write
`docs/handoff/20-report-content-writer.md`. **The report must be a file at that
path.** A reply in chat does not count; last time it was the only place the
report lived.

## Facts you will not find in the files

- The trick is "Leave before the equilibrium arrives." The current line is "A
  promotion shortlist, where every name has the same rating and the same list of
  launches." A reader said that shows the crowded field the mechanism describes,
  not anyone leaving, so the third column does not answer "where would I see the
  trick?".
- The three cells are read across in a row: trick, mechanism, where you would see
  it. This line is the one that has to show the trick, not the mechanism.
- Every rule from order 07 still applies: at most 20 words, one sentence
  ending in a full stop, plain English, no "You'd see", nothing about a company
  or person that this week's `sources` do not cite, and a place different
  from the other ten weeks' places (a meeting, a dashboard, a brag document, a
  feedback form, an email, an office, an on-call rota, a channel, a packet, a
  course website).

## Done when

1. `git diff -U0 src/content/lectures/week-11.md` shows exactly one line
   removed and one added, both starting `seen: `.
2. The new sentence is at most 20 words, ends in a full stop, and does not
   contain "You'd see", "you would see" or "you'll see".
3. It shows a person leaving or being about to leave, and does not describe the
   crowded field, ratings or launches.
4. `pnpm check` exits 0.
5. `git status --porcelain` lists nothing outside `week-11.md` and the report
   beyond what was already there.
6. `docs/handoff/20-report-content-writer.md` exists.

## Out of scope

Any other week. Any other field. Anything that is not the one `seen:` line.

## If unsure

List it under `## Questions` in the report and leave the line as it is.
