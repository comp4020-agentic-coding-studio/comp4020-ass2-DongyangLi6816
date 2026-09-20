---
to: dispatcher
kind: report
from: page-reader
reads:
  - /private/tmp/claude-501/-Users-dongyangli-comp4020-comp4020-ass2-DongyangLi6816/9597ef2f-7891-4f90-aecc-d703fe682780/scratchpad/captures-week-table/measurements.json
  - the ten PNGs beside it
---

# Page reader report: lecture weeks 2, 9, 10, 11, 12

I read captures, not a live browser. I could not hover, click or scroll. The
tall phone captures were shown to me downscaled (about 150 to 190px wide), so I
could read headings and body text but not small type or fine alignment. Vertical
positions below are estimates from the downscale, good to about 20px.

## What I read

All URLs are `http://localhost:4599/comp4020-ass2-DongyangLi6816/lectures/week-NN/`.
`innerWidth`, `scrollWidth`, page height and clip are as `measurements.json`
reports them. Every capture is clipped at its full page height, so nothing lay
below any clip.

| Page | Viewport | innerWidth | scrollWidth | Page height | Clipped at | Missed below clip |
|---|---|---|---|---|---|---|
| week-02 | 1920x1080 | 1920 | 1905 | 3012 | 3012 | 0 |
| week-02 | 390x844 | 390 | 390 | 4673 | 4673 | 0 |
| week-09 | 1920x1080 | 1920 | 1905 | 2774 | 2774 | 0 |
| week-09 | 390x844 | 390 | 390 | 4181 | 4181 | 0 |
| week-10 | 1920x1080 | 1920 | 1905 | 2697 | 2697 | 0 |
| week-10 | 390x844 | 390 | 390 | 4235 | 4235 | 0 |
| week-11 | 1920x1080 | 1920 | 1905 | 3129 | 3129 | 0 |
| week-11 | 390x844 | 390 | 390 | 5039 | 5039 | 0 |
| week-12 | 1920x1080 | 1920 | 1905 | 3200 | 3200 | 0 |
| week-12 | 390x844 | 390 | 390 | 5263 | 5263 | 0 |

Every desktop capture reports `scrollWidth` 1905 against `innerWidth` 1920,
which is less, not more, so there is no horizontal overflow. Every phone capture
reports 390 and 390. The phone captures were rendered at the width they
reported, so no clamping is in play.

### Desktop: where the table falls

On all four pages that have one, the whole table (header row and the trick row)
sits inside the first 1080px, roughly between y=660 and y=930. A desktop reader
sees the table without scrolling.

### Phone: what fills the first 844px, and where the table starts

- **Week 2.** Site header, the title "Week 2: Rewarding A, hoping for B", the
  standfirst, the date "2 March 2027", the "BUILDS ON" row (chip "week 1"),
  and the "FEEDS" row. The first chip, "The self-review 15%", is inside the
  fold. The second, "Stand-up attendance 10%", is at about y=880, just outside
  it. The table's first line, "THE TRICK", falls at about y=970, roughly 125px
  below the boundary. The table does not appear in the first 844px.
- **Week 9.** Header, title "Week 9: The reorg", standfirst, date "4 May 2027",
  "BUILDS ON" (week 3, week 7), "FEEDS" (Calibration 15%, Stand-up attendance
  10%). The table's top rule falls at about y=860 and "THE TRICK" at about
  y=880, roughly 35px below the boundary. It does not appear in the first 844px.
  This is the closest miss.
- **Week 10.** Header, title "Week 10: The layoff list", standfirst, date
  "11 May 2027", "BUILDS ON" (week 1, week 9), "FEEDS". No table exists on this
  page. The first line of body, "No mechanism this week.", falls at about y=873,
  just below the boundary.
- **Week 11.** Header, title "Week 11: The rat race", the four-line standfirst,
  date "18 May 2027", "BUILDS ON" (week 2, week 10), "FEEDS" (Calibration 15%,
  Stand-up attendance 10%). The third chip, "Design an ungameable review 40%",
  is at about y=867, just outside. "THE TRICK" falls at about y=958, roughly
  115px below the boundary. It does not appear in the first 844px.
- **Week 12.** Header, title "Week 12: Now you're the manager" over two lines,
  standfirst, date "25 May 2027", and a "BUILDS ON" row that wraps to three
  lines of chips (week 1 through week 11). "FEEDS" starts at about y=890.
  "THE TRICK" falls at about y=1056, roughly 210px below the boundary. It does
  not appear in the first 844px. This is the furthest.

On the phone the table is not a three-column grid. Each label ("THE TRICK",
"THE MECHANISM IT EXPLOITS", "WHERE YOU'D SEE IT") stacks above its cell, so the
row reads top to bottom, in the order the columns run on desktop.

## Findings

Order is by how much I think it matters to a reader spending ten minutes.

1. **Phone, weeks 2, 9, 11, 12: the table is below the first screen.** On the
   390x844 captures, the first 844px holds the title, standfirst, date and the
   "BUILDS ON" and "FEEDS" chips, and the table starts 35px (week 9) to 210px
   (week 12) below the boundary. A reader who opens a page on a phone and does
   not scroll sees no table. On week 12 the "BUILDS ON" row alone is three
   lines of chips: "week 1", "week 2", "week 3", "week 4", "week 5", "week 6",
   "week 7", "week 8", "week 9", "week 10", "week 11". Fix: `dispatcher`
   (position and size of the metadata block).

2. **Weeks 2, 9, 11, 12, both viewports: the mechanism is printed twice, one
   screen apart.** The "THE MECHANISM IT EXPLOITS" cell and the paragraph under
   the italic "Why it works" are the same sentence. Week 9 shows it as "A reorg
   resets every relationship a rating depended on; what survives is being the
   one person whose removal breaks something visible." in the table, then
   "A reorg resets every relationship a rating depended on; what survives is
   being the one person whose removal breaks something visible." under "Why it
   works", word for word. Weeks 2, 11 and 12 do the same. On desktop both copies
   are visible at once, about 100px apart. It reads as a rendering slip, not as
   emphasis. Fix: `dispatcher` if the second copy is generated from the same
   field as the cell; `content-writer` if it was written twice. I cannot tell
   which from the page (see Questions).

3. **Week 11, table: the trick and the "where" do not read across.** The trick
   is "Leave before the equilibrium arrives." The "where you'd see it" cell is
   "A promotion shortlist, where every name has the same rating and the same
   list of launches." That shows the saturated field, not leaving. A reader
   going across the row gets what to do, then why it works, then a place where
   the problem is visible but not the trick. The trick cell also uses
   "equilibrium" before anything on the page has defined it, and the mechanism
   cell ends on a citation fragment: "modelled, measured in two law firms, and
   fading within years." Fix: `content-writer`.

4. **Week 10, outline promises an item the body does not deliver.** The outline
   ends "why this lecture is in week 10 and not week 1". The body says
   "There is a record to read instead." and then gives the record and a two-part
   argument that ends "The person with the best rating on the team is on the
   list when the team is." Nowhere on the page does it say why the lecture sits
   in week 10. The outline item "the order the decisions were made in" is also
   only implicit: the body gives dates but never names an order. Fix:
   `content-writer`.

5. **All five pages: the "Related" link points at a title that matches the page
   itself.** Week 9 shows "RELATED" followed by the link text "The reorg" on a
   page titled "Week 9: The reorg". Week 2 shows "Rewarding A, hoping for B",
   week 10 "The layoff list", week 11 "The rat race", week 12 "Now you're the
   manager", each the page's own title minus "Week N:". A reader cannot tell
   whether this is a link to this page or to something else with the same name.
   Fix: `dispatcher` (or `content-writer` if the link text is the fault). See
   Questions.

6. **Phone, all five pages: the previous/next row stacks and staggers.** Week 2
   shows "WEEK 2 OF 12" left-aligned, then "← WEEK 1" and "Welcome to
   calibration" on the left, then "WEEK 3 →" and "Who speaks for you" pushed to
   the right on a lower line. The centred "WEEK 2 OF 12" of the desktop layout
   becomes a left-aligned heading above the links. I could not confirm the exact
   offsets at this downscale, but the two links sit on different lines and
   different sides. Fix: `dispatcher`.

7. **All ten captures: the last line of the page is a bare "| ☾".** After the
   licence line, a thin vertical bar and a small moon glyph sit at the left with
   no label. From a capture I cannot tell what it does. Fix: `dispatcher` if it
   is meant to be labelled; see Questions.

8. **Week 12, table: the row is deliberately not a trick, and reads that way.**
   "There isn't one. You write the rubric now." is in "THE TRICK". Its "where"
   is "A course website, where the marking rubric is published beside each
   assignment before anyone starts it." I flag this as an observation, not a
   fault: the row reads across (no trick, so a design; the design's reason; a
   place where it is done). The one thing a reader may notice is that "A course
   website" is the site they are on, which steps outside the corporate register
   the other rows keep.

### What works

- Weeks 2 and 9 read across cleanly. Week 2: "Split one ticket into five." then
  "Pay for what you can count and people do the countable thing; the uncountable
  work is what the measure was for." then "A team dashboard, where one chart of
  closed tickets is what the weekly review looks at." Week 9: "Become the only
  person who understands the system you built." then the reorg mechanism, then
  "An on-call rota, where a single name is listed against one system for every
  week of the quarter."
- Week 10 does what it was designed to do. There is no table, and the page says
  so twice: in the standfirst, "No mechanism this week, because no trick reaches
  it.", and in italics where "Why it works" sits on the other pages, "No
  mechanism this week." A reader is not left wondering whether the table failed
  to render.
- The register holds on all five pages. Nothing reads as a wink.

## What I did not read

- Nothing below any clip: every capture is clipped at full page height, so all
  ten were read in full.
- Any page other than the five named. I did not check that the table is absent
  from other weeks, or present on weeks 1, 3 to 8.
- Anything interactive. I did not see hover, focus, keyboard, the menu button
  on the phone (the "☰" icon at the top of each phone capture), the search
  button, or the "☾" control at the bottom. Whether the table scrolls or wraps
  at other widths I cannot say.
- Fine detail on the phone captures. The downscale made small mono-caps labels
  ("BUILDS ON", "FEEDS", the table headers) legible only by shape, so I make no
  claim about their contrast or size.
- Link destinations. I saw link text only, so I cannot say where "Related" or
  any source link goes.
- The dispatcher's own commit state. I did not run `git status --porcelain`,
  since I have no shell tool. I wrote only this one file.

## Questions

1. Is the second copy of the mechanism sentence under "Why it works" meant to
   be there, or is it a duplicate of the table cell? (Finding 2.) Whoever
   answers decides whether it goes to `dispatcher` or `content-writer`.
2. What does the "Related" link on each page point at? If it is the page itself,
   what is it doing there? (Finding 5.)
3. What is the "| ☾" at the foot of the page for, and is it meant to have a
   label? (Finding 7.)
4. Dates step by a week from week 9 (4 May 2027) through week 12 (25 May 2027),
   but week 2 is 2 March 2027, nine weeks before week 9 rather than seven. I do
   not know whether there is a break in the term. I raise it only because I did
   not read the intervening pages.
