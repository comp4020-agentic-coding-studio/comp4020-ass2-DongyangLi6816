---
to: page-reader
kind: work-order
written: 2026-09-20T15:24+10:00
reads:
  - /private/tmp/claude-501/-Users-dongyangli-comp4020-comp4020-ass2-DongyangLi6816/9597ef2f-7891-4f90-aecc-d703fe682780/scratchpad/captures-week-table/
writes:
  - docs/handoff/17-report-page-reader.md
---

# One-line job

Read these five lecture pages as a prospective student would, at both marking
viewports, and report what they actually show, with attention to the table
near the top of each.

## Read these, in this order

Captures and measurements are in
`/private/tmp/claude-501/-Users-dongyangli-comp4020-comp4020-ass2-DongyangLi6816/9597ef2f-7891-4f90-aecc-d703fe682780/scratchpad/captures-week-table/`.

1. `measurements.json` — one row per page per viewport, with the `innerWidth`
   and `scrollWidth` the page reported, its full height, the height the capture
   was clipped to, and how much fell below that clip.
2. The ten PNGs, `lectures-week-NN-desktop.png` (1920x1080) and
   `lectures-week-NN-phone.png` (390x844), for NN in 02, 09, 10, 11 and 12.

Nothing else is authoritative. Do not open `src/`.

## Write exactly this

`docs/handoff/17-report-page-reader.md`, in the sections your role file names.

## Facts you will not find in the files

- The site is a course website for a fictional university. The course is called
  *Meets Expectations: Surviving the Performance Review*, and it teaches, in a
  straight-faced corporate register, the tricks people use to survive a
  performance review, then explains in plain English the mechanism each trick
  exploits. The irony is left to the reader. The site never winks. A page that
  reads like sincere corporate training is doing its job, not failing.
- These are lecture pages. Each has, near the top, a table with three columns:
  *The trick*, *The mechanism it exploits*, *Where you'd see it*. The task
  was that a reader can read across from what to do, to why it works, to where
  they would see it. Judge whether it does.
- Week 10 deliberately has no trick, no mechanism and no table. If its page says
  so, that is the design.
- It is marked in Chrome at exactly the two viewports above, by a person who
  spends about ten minutes on the whole site and samples pages.
- You are reading captures, not a live browser, so you cannot hover, click or
  scroll. Say so where it matters.
- The captures were taken from a local build at about 15:24 today.

## Done when

1. All five pages appear in `## What I read`, each with both viewports, and for
   each the `innerWidth`, `scrollWidth` and clip height taken from
   `measurements.json`, not from the file name and not from this order.
2. For each phone capture, the report says what fills the first 844 pixels and
   where the table's first line falls against that boundary, or that it does
   not appear in the capture.
3. Every finding quotes text visible in the capture it cites.
4. Every finding names the role that should fix it: `content-writer` for
   words, `dispatcher` for anything structural or visual.
5. `## What I did not read` and `## Questions` are both present.
6. `git status --porcelain` lists only `docs/handoff/17-report-page-reader.md`
   beyond what was already there.

## Out of scope

Fixing anything. Reading source. Proposing a redesign. Judging whether the
course is a good idea.

## If unsure

List it under `## Questions` in your report and carry on with the other pages.
Do not assume what a page was for.
