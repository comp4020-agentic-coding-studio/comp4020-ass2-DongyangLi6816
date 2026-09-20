---
to: page-reader
kind: work-order
written: 2026-09-20T14:45+10:00
reads:
  - /private/tmp/claude-501/-Users-dongyangli-comp4020-comp4020-ass2-DongyangLi6816/26bc9507-a080-41b6-9e9b-f93baa9a671a/scratchpad/captures/
writes:
  - docs/handoff/03-report-page-reader.md
---

# One-line job

Read these six pages as a prospective student would, at both marking viewports,
and report what they actually show.

## Read these, in this order

Captures and measurements are in
`/private/tmp/claude-501/-Users-dongyangli-comp4020-comp4020-ass2-DongyangLi6816/26bc9507-a080-41b6-9e9b-f93baa9a671a/scratchpad/captures/`.

1. `measurements.json` — one row per page per viewport, with the `innerWidth`
   and `scrollWidth` the page reported, its full height, the height the capture
   was clipped to, and how much fell below that clip.
2. The twelve PNGs, `<page>-desktop.png` (1920x1080) and `<page>-phone.png`
   (390x844), for these six pages:
   - `/` — the home page
   - `/lectures/week-02/` — a lecture
   - `/sessions/10-the-layoff-list/` — a stand-up
   - `/assessments/` — the assessment index
   - `/policies/`
   - `/team/priya-natarajan/` — one of twelve engineer packets

Nothing else is authoritative. Do not open `src/`.

## Write exactly this

`docs/handoff/03-report-page-reader.md`, in the sections your role file names.

## Facts you will not find in the files

- The site is a course website for a fictional university. The course is called
  *Meets Expectations: Surviving the Performance Review*, and it teaches, in a
  straight-faced corporate register, the tricks people use to survive a
  performance review — then explains in plain English the mechanism each trick
  exploits, and names who pays for it. The irony is left to the reader. The
  site never winks. A page that reads like sincere corporate training is doing
  its job, not failing.
- One week deliberately has no trick. If a page says so, that is the design.
- It is marked in Chrome at exactly the two viewports above, by a person who
  spends about ten minutes on the whole site and samples pages. Read for what
  that person would notice.
- You are reading captures, not a live browser, so you cannot hover, click or
  scroll. Say so where it matters.
- The captures were taken from a local build at 14:35 today.

## Done when

1. All six pages appear in `## What I read`, each with both viewports, and for
   each the `innerWidth`, `scrollWidth` and clip height taken from
   `measurements.json` — not from the file name and not from this order.
2. Every finding quotes text visible in the capture it cites.
3. Every finding names the role that should fix it: `content-writer` for words,
   `dispatcher` for anything structural or visual.
4. `## What I did not read` and `## Questions` are both present.
5. `git status --porcelain` lists only `docs/handoff/03-report-page-reader.md`.

## Out of scope

Fixing anything. Reading source. Proposing a redesign. Judging whether the
course is a good idea — that is not yours and not mine.

## If unsure

List it under `## Questions` in your report and carry on with the other pages.
Do not assume what a page was for.
