# Design: the week table on the lecture page

Written for `page-builder` and `content-writer`. Source of the job:
`docs/experiments/task-lecture-week-table.md` and
`docs/handoff/05-work-order-designer.md`. Nothing here has been rendered or
measured; where a claim is about how something will look, it is what the
design asks for, and the roles after this one find out.

Read before designing: the task, `docs/course-design.md` (tone, weeks 10 and
12), `src/pages/lectures/[slug].astro`, `src/pages/sessions/[slug].astro`,
`src/components/WeekChain.astro`, `WeekNav.astro`, `TeachingTeam.astro`,
`src/site-config.ts`, `docs/site-review.md` § 7, `spec/course.test.ts`. I could
not list `src/components/`, so two of the five hand-built components are
unseen (see Questions).

Two decisions that hold whichever way the two open questions go:

- **The table is one row.** A lecture page is one week, so the table is a
  header and a single week's row. It is a record of three linked facts, not a
  grid to scan down. That is why the phone layout can be a stack of labelled
  blocks without losing anything.
- **The table sits directly after the week-chain strip and before whatever
  follows it.** Whether a "Why it works" paragraph follows is Question 1; the
  table's position does not depend on the answer.

---

# Part 1: The lecture page

## What it is for

A reader sampling the site sees, near the top of any lecture, the week's trick,
the mechanism it exploits and a place they could watch it happen, before the
prose begins (from the task).

## Structure

In the order a reader meets them. Only the fourth is new.

1. **Date line, and the slides link when there is one.** Which week and when.
   Unchanged. Carried by the existing bold date paragraph and link.
2. **Where this week sits.** The earlier weeks it builds on and the assessments
   it feeds. Unchanged. Carried by `WeekChain`.
3. **Trick, mechanism, where you would see it.** The page's summary in three
   linked sentences; a reader who reads nothing else has the week. Carried by
   the new week table (Part 2).
4. **The "Why it works" paragraph, or its absence marker.** Present or not
   depending on Question 1. If kept, it is unchanged. If dropped, section 3
   is the only place the mechanism appears.
5. **The lecture prose.** Unchanged. Carried by the entry's own content.
6. **Sources.** Unchanged. A heading and a list of links, shown only when the
   week has sources.
7. **Teaching team, related content, previous and next week.** Unchanged.
   Carried by `TeachingTeam`, the theme's `RelatedContent` and `WeekNav`.

There is no new heading above the table. It is the first thing after the
strip, its own column labels say what it is, and a heading that restated them
would be a label doing a second job.

## Components

- Date line, slides link, prose, sources: what the page already has.
- `WeekChain`, `TeachingTeam`, `WeekNav`: reused, unchanged.
- `RelatedContent` from the course package: reused, unchanged.
- The week table: new. Reason in Part 2.
- Theme `Callout`, `FilterableCardGrid`, `Pagination`, embed transclusion: none
  is used. A callout would put chrome around a summary that should read as a
  plain part of the page; the other three are for lists, filtering and paging,
  and this is one row.

## Desktop and phone

| Section | 1920x1080 | 390x844 |
| --- | --- | --- |
| Date line and slides link | No difference | No difference |
| Week chain | Label and links share a row | Existing behaviour: the label sits above its links, one group per line (it stacks at a narrow width the component already chooses) |
| Week table | Three columns side by side | Three labelled blocks, one under another (Part 2) |
| "Why it works" paragraph, if kept | Below the table, full text width | Same, and it is more expensive here: see Question 1 |
| Prose | Theme layout; not designed here | Theme layout; not designed here |
| Sources | No difference | No difference |
| Team, related, week nav | No difference | Week nav stacks (existing behaviour) |

The one place the phone pays for this change is length. Before the prose
begins, the phone now carries the date, the week chain and the whole table,
which stacked is several times taller than the chain strip. The page-builder
should look at the first 844px of week 2 and week 12 at 390px and report what
the reader sees there. If the prose heading or first sentence is not visible
without scrolling, say so; do not fix it by shrinking the table's type.

## Accessibility

- Landmark and heading order: unchanged. The table adds no heading, so the
  outline is the same as today.
- Reading order is date, chain, table, then prose. It must be the same in the
  markup as on screen at both widths.
- Nothing in this page relies on colour to mean something; the table adds no
  colour meaning either (Part 2).

## What I did not design

- The prose, sources and teaching-team blocks, which the theme and the entry
  own.
- The slides link and the date format.
- Whether the "Why it works" paragraph stays (Question 1).
- The order of the date line, chain and table beyond "table after chain".
  Putting the table above the chain would put the week's summary about five
  phone lines higher; I kept the chain first because it already orients every
  page in the site, and moving it is a change to a component outside this job.
- The stand-up page, home page, decks, assessments.

## Questions

Held together at the end of the file (Questions, below).

---

# Part 2: The week table

## What it is for

To put the week's trick, the mechanism it exploits and one place to watch it
happen side by side, so a reader can read across from what to do to why it
works to where they would see it (from the task).

## Structure

Column labels, verbatim from the task, in this order:

1. **The trick.** Read from the `trick` on that week's stand-up entry. Corporate
   voice. One sentence.
2. **The mechanism it exploits.** Read from the `mechanism` on the lecture.
   Plain English. A sentence of 20 to 40 words.
3. **Where you'd see it.** New text on the lecture entry. Plain English. One
   sentence. Shape in the next subsection.

The reader meets, in order: the three column labels, then the three cells, left
to right on desktop and top to bottom on the phone. The same order in both.
There is one body row and no row label; the page title already says which week.

The table has an accessible name that says which week it belongs to (for
example "Week 2: trick, mechanism and where you'd see it"). It is not shown on
screen, because a visible caption would repeat what the column labels already
say.

### Each cell can be absent, and only week 10 may be

Week 10 has no trick and no mechanism on purpose. In that row the cell for a
missing value shows the site's existing absence sentence for that register
("No trick this week." and "No mechanism this week." are already on the
site), set in the same treatment as the page's existing absence marker:
secondary ink and italic, with the words carrying the meaning. It must look
like that marker, not like a new one. Whether week 10's third cell is written
or absent is Question 2. The structure supports either, and supports every
cell being independently present or absent.

Two rules that protect the "exactly one honest week" promise:

- The absence treatment is for a missing value in week 10 and nowhere else. A
  missing value on any other week is a data error and should stop the build,
  not render as an absence marker, because on any other week that marker would
  say "this week is the honest one" when it is a bug. `page-builder` decides
  the mechanism; this is a requirement on it.
- Week 12's trick is the sentence "There isn't one. You write the rubric now."
  That is a value, not an absence. It is set as ordinary text in the first
  cell, exactly like any other week's trick, and must not trigger the absence
  treatment because it begins with a negative.

### The shape of the third column, for `content-writer`

The third cell is the only new text. It has one job: name a place a reader
could go and watch the trick happen.

- **One sentence**, ending with a full stop, as the other two cells do.
- **Short.** Aim for about 20 words at most, and never longer than that week's
  mechanism. It is the shortest cell in the row, or level with the trick.
- **Plain English**, no corporate vocabulary. That register belongs to the
  trick alone.
- **Lead with the place**, named as a thing a reader could open or attend: a
  meeting, a message, a document, a dashboard. On a phone the first words of the
  cell are the ones the eye finds first.
- **Observable.** Say what is said, posted, counted or shown there. Do not say
  what someone intends or feels.
- **Do not start with "You'd see it in".** The column label already says that,
  and a cell that repeats its label is one element doing two jobs.
- **Do not restate the trick or the mechanism**, and do not name who pays; that
  line lives on the stand-up page.
- **No new claim.** Nothing about a named company, product or person unless
  that week's lecture already cites it in its sources. Nothing that names or
  targets a colleague of the reader. The joke is on the system.
- **Straight-faced**, no winking.
- **Different places across the twelve weeks.** The point of the column is that
  a reader who reads three weeks meets three different rooms and screens.
- The banned-phrase test in `spec/course.test.ts` applies to this text on
  every page.

## Components

- **Reused:** the week chain's label style (the small, mono, uppercase,
  secondary-ink label), taken as the look for the three column labels so the
  page has one label voice. The page's existing absence marker treatment,
  reused for empty cells.
- **New: the week table.** Reason: nothing existing shows three sentences
  side by side. `WeekChain` is a two-item list of links, and the theme's
  `Callout` puts a box around one block. The theme has no table component; the
  only tables on the site are the rubric tables the assessment pages render.
  It reads its first two columns from the existing data and takes only the third
  as new.
- **Not reused, on purpose:** the tinted, ruled box that sets the trick on the
  stand-up page, and the no-chrome setting of the mechanism paragraph. On the
  stand-up page those two are kept looking unlike each other so that the
  register is legible without reading. Here the three columns are labelled in
  words, so no cell gets its own chrome: all three are set alike as body text
  and the column label carries the register. The tinted ground token stays
  reserved for the trick box.

### Setting, in tokens

- Type: labels use the mono font token at the extra-small size and the
  secondary text token. Cells use the base text token and the base size; the
  small size is not used for any sentence.
- Rules: a hairline under the label row and a hairline under the row, both the
  divider token. No vertical rules, no tinted ground, no box, no rounded
  corners.
- Space: the table takes the same block margins as the strip and paragraph
  beside it: the medium spacing token above and the large one below. Cell
  padding uses the small spacing token.
- Alignment: text left-aligned; cells aligned to the top, since the mechanism
  cell is much taller than the other two.
- Column proportions: the mechanism column widest, the trick column narrowest,
  the third in between. Named as an order, not as widths, because the builder
  must size them against the longest real text (below).
- Dark theme: only theme tokens that already flip are used, and none for
  meaning, so the table has no colours of its own to get wrong in the dark.
  Nothing checks dark theme, so `page-builder` looks at it (see Accessibility).

## Desktop and phone

**Desktop, 1920x1080.** Three columns in one row, sitting inside the page's
normal text column. It is not widened beyond the prose. I have not seen how
wide that column is and do not claim the columns fit; the builder measures.

**Phone, 390x844.** The three columns do not fit and must not shrink, clip or
scroll. The table becomes a stack of three blocks in the same order: label,
then its sentence, then a hairline (divider token), then the next label. Labels
stay visible text. Cells take the full column width. Text stays at the base size.

Nothing scrolls sideways, on the page or inside any box. That includes no
horizontal scroll container around the table and no clipped text with an
ellipsis. The stack point is chosen by measurement: the widest viewport at which
three columns would leave the mechanism cell taller than about eight lines is
where it stacks. It will be wider than the points at which the week chain and
week nav stack, and it stacks at every width below it, including the width
between phone and desktop that nothing assesses.

**Size the design against these rows, not an average one:** the week with the
longest mechanism, the week with the longest third-column line, week 10 (two
absences), and week 12 (a trick that reads like an absence but is not). If it
holds for these it holds for the rest.

**The design fails if:** the document or the table is wider than the viewport
at 390px; any cell's text is cut off; a column label is not next to the text it
labels on the phone; week 10 or week 12 renders differently from a normal row
in any way other than its absence markers; or the stacked table on the phone
pushes the first line of the prose below the fold and the builder cannot say
why that is acceptable.

## Accessibility

- **How it reads.** On desktop it is a table with three column headers and one
  row, so a screen reader announces the header for each cell. The accessible
  name says which week.
- **Phone.** Stacking a table with layout tricks can strip its table meaning in
  some browsers. The requirement is on the outcome: on the phone, each sentence
  must still be announced with its label exactly once, in the reading order
  trick, mechanism, where you would see it. If the table meaning survives, the
  visible labels must not also be read out a second time. If it does not
  survive, the stack of visible labels and sentences is acceptable as long as
  each label is read next to its sentence. `page-builder` checks this in the
  browser's accessibility tree at 390px, not from the source.
- **Nothing here depends on colour.** Labels are text. The rows are separated by
  rules and space. The absence state is carried by the words "No trick this
  week." and "No mechanism this week." and by italic, and secondary ink only
  reinforces it; with all colour removed the state is unchanged. A block of colour
  meaning something is not used anywhere in this design.
- **Contrast.** Axe covers the text in the light theme. It does not cover the
  dark theme. The builder looks at the dark theme at both viewports and reports
  whether the secondary-ink labels and the absence sentences are readable
  against the dark ground.
- **No interactive parts.** No links, no toggles and nothing focusable in the
  table, so it adds no tab stops.
- **Row header.** There is none, deliberately: one row, and the page title names
  the week.

## What I did not design

- Any text: the third column's sentences, and what week 10's cells say.
- The name of the new data field on the lecture entry, as the work order says.
- Where the first two columns' data is read from beyond "the existing fields".
- A link from the trick cell to the stand-up page. The related-content block
  already links it, and a link in a cell adds a tab stop for a duplicate.
- Print, sorting, filtering or highlighting.
- The same table on the stand-up pages, or anywhere but the lecture page.
- The stack point in numbers, the column widths in numbers, and the type sizes
  beyond token names, which need the real text to settle.
- A build or spec check that stops a missing value on a week that is not week 10
  (required above; the sensor itself is for whoever writes tests).

## Questions

These are two the task leaves open, and one I could not settle from the files.

**1. Does the existing "Why it works" paragraph stay?**

The table's second column prints that same sentence. The design works either
way; the reader pays differently.

- *Keep the paragraph.* The reader who samples the page meets one 20 to 40 word
  sentence twice within a screen, under two different labels: "The mechanism it
  exploits" and "Why it works". On the phone that is another block of six to
  eight lines before the prose starts. It keeps the site's rule that the
  mechanism is plain English with no chrome, set alone, and it keeps the
  week 10 absence marker as a full sentence on its own. The fact is stated in
  two places, which is what the task forbids restating in the data and what the
  house rule says to cut on the page. If kept, the table must not be the only
  place a reader would see it, and the builder should say so in the handoff.
- *Drop it.* Each fact is stated once and the phone page is shorter. The
  mechanism is now set inside a ruled table, which the code comment on the
  lecture page names as the thing it is deliberately not; the reader loses the
  standalone, italic-labelled plain-English read that separates it from the
  trick's box on the stand-up page. The name "Why it works" (the course-design
  wording for the register) disappears from the lecture page and the column
  label "The mechanism it exploits" becomes the only name. Week 10's absence
  is shown only in the table.

I did not pick. One thing decides it: whether the reader is meant to meet the
mechanism as its own read (keep) or as one of three linked lines (drop).

**2. What does week 10's row say?**

Its trick and mechanism cells are absent by design. The third cell has three
options.

- *Absent, like the other two.* All three cells are absence markers. The reader
  sees that the honest week has nothing to game and nothing to watch, which is
  the week's argument, but the row carries no information and, on the phone, is
  three short italic lines under three labels. A reader who has not read the
  earlier weeks may take it for a rendering fault.
- *A written line for where you would see it.* The reader gets one concrete
  place, but the column's promise is "where you'd see the trick", and there is
  no trick, so the line has to be about something else (where the list shows up).
  That makes week 10 the one week whose third cell means something different
  from the other eleven, and it invites a factual claim about how layoff lists
  are built, which the course itself marks as thin.
- *An absence marker with a reason in it.* Same as the first, but the sentence
  says why nothing is here. This tells the reader it is deliberate, and it is
  new copy in the register the course reserves for the honest week.

I did not choose. It is copy, and the course design says how weak the evidence
is for how the lists are built.

**3. Two of the five hand-built components are unseen.** My tools do not list
directories, and I read only the three components the lecture and stand-up pages
import. If either of the other two is a table, a label style or an absence
marker, this design reuses the wrong things. `page-builder` should list
`src/components/` before building, and if a component already sets a labelled
value or an absence, use it and tell me.

Not a question, but for whoever writes the page: the absence marker's look is
now copied in a third place if the table gets its own. The lecture and stand-up
pages each already carry a copy of it. One shared definition would be one thing
to keep working instead of three; whether to do that is the builder's call.
