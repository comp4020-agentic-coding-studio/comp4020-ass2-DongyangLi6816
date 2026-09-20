---
from: content-writer
kind: report
answers: 07-work-order-content-writer.md
written: 2026-09-20T15:12+10:00
---

# Report: the `seen` line on eleven lectures

## What I did

Read the design's rules for the third column, the tone section of
`docs/course-design.md`, and every week's `mechanism`, `sources`, `trick` and
`cost`. Wrote one sentence per week naming a place a reader could watch the
trick happen, then inserted each directly under `mechanism:` with a script that
first checked each file had exactly one `mechanism:` line and no `seen:`, and
wrote all eleven together.

## What I found

- No sentence needed a `: ` in it, so nothing is quoted or folded.
- Weeks 2, 3, 4, 5 and 9 name places where the trick itself is visible. I could
  not name a place that shows the mechanism without repeating the trick, so I
  kept those lines observable and short.
- The banned-phrase test and the rest of `pnpm check` pass with the new lines.

## What I changed

Each file got one added line, `seen: <sentence>`, directly under `mechanism:`,
and nothing else in it changed (`git diff --stat`: 11 insertions, 0 deletions).

- `src/content/lectures/week-01.md` to `week-09.md`
- `src/content/lectures/week-11.md`
- `src/content/lectures/week-12.md`
- `docs/handoff/08-report-content-writer.md` (this file)

| Week | Sentence | Words |
|---|---|---|
| 1 | A calibration meeting, as each name on a projected list is given a rating. | 14 |
| 2 | A team dashboard, where one chart of closed tickets is what the weekly review looks at. | 16 |
| 3 | A peer feedback form, where the comments describe how pleasant someone is more than what they made. | 17 |
| 4 | A brag document, kept as a dated list, where every line ends in a number. | 15 |
| 5 | A channel searched for your name, where the results list only what was posted in public. | 16 |
| 6 | The launch email, where the thanks paragraph names a few people and calls everyone else the team. | 17 |
| 7 | A promotion packet, whose project list is sorted by launch date and has no entry for upkeep. | 17 |
| 8 | An open-plan office at six in the evening, where a manager passes the desks still occupied. | 16 |
| 9 | An on-call rota, where a single name is listed against one system for every week of the quarter. | 18 |
| 11 | A promotion shortlist, where every name has the same rating and the same list of launches. | 16 |
| 12 | A course website, where the marking rubric is published beside each assignment before anyone starts it. | 16 |

## Done-when results

1. `grep -L '^seen: ' src/content/lectures/*.md` printed only
   `src/content/lectures/week-10.md`. Met.
2. Word counts are 14, 16, 17, 15, 16, 17, 17, 16, 18, 16, 16 (table above),
   all at most 20. Each ends with a full stop. None contains "You'd see", "you
   would see" or "you'll see". Met.
3. The first three words differ in every line. The first nouns are meeting,
   dashboard, form, document, channel, email, packet, office, rota, shortlist,
   website: eleven kinds of place, though "form" and "document", and "packet"
   and "shortlist", are near neighbours. Checked by eye, not by script. Met.
4. No line names a company, product or person. Met.
5. `pnpm check` exits 0: 52 pages built, 21 tests passed, no accessibility
   violations, no broken links. Met.
6. `git status --porcelain` lists the eleven lecture files as modified and this
   report as new; the other untracked entries were there before I started
   (`docs/design/` and `docs/handoff/04` to `07`). Met, now that this file
   exists.

## What I did not do

- Did not touch week 10, any other frontmatter field, or anything outside
  `src/content/lectures/` and this report.
- Did not render the pages, so I have not seen the third column at 390px. The
  longest line is week 9, at 18 words.
- Did not commit.

## Questions

1. Weeks 5 and 6 come closest to restating their tricks (search results showing
   only public posts; the launch email). Reword either if you read it as doing
   the trick's job.
2. Week 1 puts the reader at a calibration meeting the course says they are not
   in the room for. I wrote it as a place to watch, not attend. Does that read
   as a contradiction?
3. Week 12 points at a course website publishing its rubric, which is this
   site's own subject. I chose it because it makes no external claim. A team's
   review-guidelines page is the alternative.
