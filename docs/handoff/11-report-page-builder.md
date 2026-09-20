---
from: page-builder
kind: report
answers: docs/handoff/10-work-order-page-builder.md
---

# Report: the week table on the lecture page

## What I changed

- `src/components/LectureWeekTable.astro` (new)
- `src/pages/lectures/[slug].astro` (imports the table, renders it on every week except 10)
- `docs/handoff/11-report-page-builder.md` (this file)

How it works:

- The component takes `week`, `mechanism` and `seen`, and looks up `trick` on the `sessions` entry with the same `week`.
- If any of the three is missing or blank, it throws `Week N has no <field>...`. The lecture page skips the component for week 10 through a named constant, `NO_TRICK_WEEK = 10`. Week 10 keeps its "No mechanism this week." line and has no `<table`.
- Nothing is retyped: the three cell texts come from the entries.
- Existing `.register-absent` styles are not copied or touched. No absence treatment is built, as the work order says.
- **The "Why it works" paragraph stays, unchanged, directly below the table.** This answers design Question 1 as decided: the mechanism is on the page twice, on purpose. On the phone that costs 5 to 7 more lines (week 11: 7; week 12: 6).
- Reuse of the theme: nothing in `src/components/` or the theme sets a labelled value or a table. `WeekChain` is the only source for the label voice, and I copied its label rules (mono, xs, uppercase, secondary ink, 0.08em tracking). That is a second copy of those five lines. The design's Question 3 is answered: none of the eleven components in `src/components/` is a table, a label style or an absence marker.
- The theme's `.visually-hidden` class carries the screen-reader-only caption.

## Done-when results

1. **`pnpm check` exits 0.** Run last, after the restore in item 6: `check exit=0`. 21 tests passed, axe and the base-path link check both clean.

2. **Header cells per built page.** I read the built HTML with a small Python regex (`<table\b` and `<th ...>(.*?)</th>`). I did not use grep. The apostrophe is `&#39;` in the file, which is the HTML escape for `'`.

   ```
   week-01: <table count=1 th=['The trick', 'The mechanism it exploits', 'Where you&#39;d see it']
   ... (02 to 09 identical) ...
   week-10: <table count=0 th=[]
   week-11: <table count=1 th=['The trick', 'The mechanism it exploits', 'Where you&#39;d see it']
   week-12: <table count=1 th=['The trick', 'The mechanism it exploits', 'Where you&#39;d see it']
   ```

3. **390px widths.** I did not use `capture.mjs`. I read it: it measures `innerWidth` and `scrollWidth`, but it does not do dark theme or the accessibility tree. I wrote `scratchpad/measure.mjs`. It sets the viewport with `Emulation.setDeviceMetricsOverride` (`mobile: true`) and evaluates `innerWidth` and `document.documentElement.scrollWidth` in the page. Values as the page reported them, against the built site served by `astro preview`:

   | Page | innerWidth | scrollWidth | Table width |
   | --- | --- | --- | --- |
   | week 9 | 390 | 390 | 354 |
   | week 11 | 390 | 390 | 354 |
   | week 12 | 390 | 390 | 354 |

   Also 390/390 for weeks 2 and 10, in both themes. That would have failed if a cell overflowed: the check is `scrollWidth > innerWidth`.

   At 1920 the page reports `innerWidth` 1920 and `scrollWidth` 1905. The 15px gap is the classic scrollbar Chrome draws on the right of the desktop screenshots; `scrollWidth` excludes it. It is not overflow, and the table's right edge is at 1403.

   **Stack point: `max-width: 47rem` (752px).** I swept viewport widths 700 to 760 on week 11, the longest mechanism (33 words), with three columns in place:

   | Viewport | Mechanism cell lines |
   | --- | --- |
   | 720 to 750 | 9 |
   | 755, 760 | 8 |
   | 800 | 8 |
   | 900 | 7 |
   | 1024 and up | 6 |

   The design says to stack when the cell would be taller than about eight lines. 750px is the last width at 9 lines, so 47rem (752px) stacks and everything wider stays as columns. After the change, 700 to 750 measured 5 lines stacked and 755 to 760 measured 8 lines in columns. It is a viewport media query. The content column is `min(48rem, viewport minus gutters)`, so the two track each other only above roughly 640px. Below that the stacked layout is in force anyway.

   At 1920, column widths are trick 24%, mechanism 44% (380px), seen 32%.

4. **Accessibility tree at 390px** (`Accessibility.getFullAXTree` in headless Chrome, week 12, light theme). The table keeps its `table` role with the name "Week 12: trick, mechanism and where you'd see it". The column headers are not in the tree, because `thead` is `display: none`. Each `cell` has a name that begins with its own label, followed by the sentence:

   ```
   cell "THE TRICK There isn't one. You write the rubric now."
   cell "THE MECHANISM IT EXPLOITS A review is a design; ..."
   cell "WHERE YOU'D SEE IT A course website, where ..."
   ```

   Each label appears once, next to its sentence. Names are upper case because Chrome exposes the CSS-transformed text. On desktop (1920) the same tree has one `columnheader` row and three `cell`s, and the in-cell labels are absent (`display: none`). I looked only at week 12 in the tree; the other weeks use the same markup. I did not test a real screen reader, only the tree.

   The design says to read the header from the table on the phone. I chose the other route it allows: on the phone the headers are removed and each cell carries its own label.

5. **Dark theme, looked at on weeks 11 and 12 (screenshots at 1920x1080 and 390x844).** Labels in secondary ink and the hairlines read clearly on the dark ground, at both viewports. Nothing on the table depends on colour; it has no fill of its own. I read the screenshots by eye; I did not compute contrast ratios for dark, since `axe` does not run there.

   The first 844px of week 2 and week 12 at 390px: the table is not in it. Its top is at 954px (week 2) and 1036px (week 12). The fold holds the title, description, date and the start of the week chain, which is long on this page. The prose was already below the fold before this change, so the table does not push anything out of view that was in view. The stacked table is 390px tall on week 2 and 454px on week 12.

6. **Missing `seen` fails the build.** I removed the `seen:` line from `src/content/lectures/week-05.md` and ran `pnpm build`:

   ```
   [ERROR] Error: Week 5 has no seen (on the lecture entry). Only week 10 may leave it out; every other week's lecture page needs it.
   [ERROR] [build] Caught error rendering /lectures/week-05/: Error: Week 5 has no seen ...
   [ELIFECYCLE] Command failed with exit code 1.
   ```

   The shell showed no exit code for the pipe. The failure is `ELIFECYCLE ... exit code 1`.

   I restored the entry from a copy made before the edit. I know it matches because `shasum -a 256` gave `f9905da1...2362` both before the edit and after the restore, and `cmp` reported the files identical. `git diff --stat` still shows the one-line `+1` that `content-writer` had already added, and nothing more.

7. **`git status --porcelain`.** It lists the three files I wrote, plus what was already dirty when I started: the eleven `src/content/lectures/week-*.md` files `content-writer` changed, `docs/notes/harness-evidence.md`, and the untracked `docs/design/` and `docs/handoff/` files. I did not touch those. Nothing outside the work order's writes list is mine. A literal reading of "only the three files" cannot hold on this tree.

## What I did not do

- No real screen reader: only the browser's accessibility tree.
- No numeric dark-theme contrast check: I looked at it only.
- I looked at the accessibility tree for week 12 only, at 390px, and only light theme.
- Container query for the stack point: not used. A container query would track the content column exactly; I stayed with the media query because the work order asks for a viewport measurement.
- No shared absence-marker definition, no link in a cell, no schema typing for `seen` (all out of scope).
- `docs/notes/harness-evidence.md` is not in my writes list, so I made no entry there. One thing worth an entry: the `capture.mjs` script named in the work order measures only light theme and no accessibility tree, so it could not have answered items 4 and 5.

## Questions

1. Should `seen` be typed in `src/content.config.ts`? The table throws with the week number today, so a typo in the key name would fail the build there. Typing would catch it earlier and name the file. I did not touch the schema.
2. The stack point is a viewport width, and the mechanism line count is measured on today's week 11. If a future mechanism gets longer than 33 words, the point needs measuring again. Nothing in `pnpm check` notices this.
3. Should the label style live in one place? It is now written out in `WeekChain.astro`, the stand-up page's `.trick-label` and this component. Out of scope for this work order.
