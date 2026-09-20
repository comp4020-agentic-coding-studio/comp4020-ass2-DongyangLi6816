---
from: content-writer
kind: report
answers: 19-work-order-content-writer.md
written: 2026-09-20T15:30+10:00
---

# Report: week 11's `seen` line

## What I changed

- `src/content/lectures/week-11.md`: the `seen:` line only.
- `docs/handoff/20-report-content-writer.md` (this file)

Old: "A promotion shortlist, where every name has the same rating and the same list of launches."

New: "An internal jobs board, where a well-rated engineer applies to another team before the next review cycle."

The new line shows the trick (a person leaving before the cycle in which saturated behaviours are re-baselined), not the crowded field. The place is new to the set: `grep` finds "jobs board" in week 11 only. It names no company or person. It contains no `: `, so nothing needed quoting.

## Done-when results

1. `git diff -U0 src/content/lectures/week-11.md` shows one line added (`seen: An internal jobs board, ...`) and none removed. **Not met as literally written.** The old `seen:` line was added by order 07 and is uncommitted, so HEAD does not contain it, and the diff against HEAD cannot show a removal. The working file has exactly one `seen:` line and it is the new one.
2. 17 words (An, internal, jobs, board, where, a, well-rated, engineer, applies, to, another, team, before, the, next, review, cycle). One sentence, ends in a full stop, no "You'd see", "you would see" or "you'll see". Met.
3. The subject is an engineer applying to another team before the next review cycle: a person about to leave. It does not mention the crowded field, ratings as a shared value, or launches. "Well-rated" appears as a descriptor of the person, not as the field's sameness. Met.
4. `pnpm check` exit code 0: 52 pages built, no broken links, 22 tests passed. Met.
5. `git status --porcelain` lists nothing new outside `week-11.md` and this report; everything else was already in the status at the start (other lecture files, `docs/design/`, handoff files 04 to 19, `spec/lecture-week-table.test.ts`, `src/components/LectureWeekTable.astro`, `src/pages/lectures/[slug].astro`, `docs/notes/harness-evidence.md`). Met.
6. This file exists. Met.

## What I did not do

- Did not touch any other week or field.
- Did not render the page, so I have not seen the row at 390px or read it across.
- Did not commit.

## Questions

1. "Before the next review cycle" is my wording of the session's "before the cycle in which the saturated behaviours are re-baselined". It drops "re-baselined" because that is jargon, and the trick itself keeps it. Say so if a reader should get the re-baselining in this line too.
2. Done-when 1 assumes the old line was committed. If the order's author wants a diff-based check on this file, it needs a diff against the working tree from before order 07, or the lecture files committed first.
