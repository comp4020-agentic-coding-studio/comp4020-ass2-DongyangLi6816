---
from: sensor-writer
kind: report
written: 2026-09-20T15:25+10:00
reads:
  - docs/handoff/13-work-order-sensor-writer.md
writes:
  - spec/lecture-week-table.test.ts
---

# Result

`spec/lecture-week-table.test.ts` holds one test:
"gives every lecture but week 10 a table of the stand-up's trick and the lecture's mechanism".
`pnpm check` exits 0 (5 files, 22 tests). No title repeats one in `spec/`.
The falsifier is stated in a comment above the test.

## What it reads

`dist/lectures/week-NN/index.html` for weeks 1 to 12, and `dist/api/index.json`
for the stand-up's `trick` and the lecture's `mechanism`. It takes the first
`<table>` on the page and compares decoded text: headers equal the three
titles in order, the first cell equals the trick, the second equals the
mechanism, the third is not empty. On week 10 it asserts the page has no table.
It names no component, class or source file.

The built table repeats each header inside its cell as a label for narrow
screens. The test strips a leading header text from a cell before comparing, and
does not require it, so the label can go without breaking it.

## Red against a broken input

Each break edited the built HTML in `dist/lectures/` and was restored by copying
the original file back. The final `pnpm check` rebuilt `dist/` from source.

### 1. Table removed from week 4

Removed with a regex that deletes the first `<table>...</table>` in
`dist/lectures/week-04/index.html`.

```
 FAIL  spec/lecture-week-table.test.ts > the week table on each lecture page > gives every lecture but week 10 a table of the stand-up's trick and the lecture's mechanism
AssertionError: week 4 has no table: expected 0 to be greater than 0
 ❯ spec/lecture-week-table.test.ts:53:58
```

### 2. Header changed on week 7

`sed` replaced `The mechanism it exploits</th>` with `The mechanism</th>` in
`dist/lectures/week-07/index.html`.

```
AssertionError: week 7 has the wrong column headers: expected [ 'The trick', 'The mechanism', …(1) ] to deeply equal [ 'The trick', …(2) ]
- Expected
+ Received
  [
    "The trick",
-   "The mechanism it exploits",
+   "The mechanism",
    "Where you'd see it",
  ]
 ❯ spec/lecture-week-table.test.ts:56:81
```

### 3. Trick changed on week 12

`sed` replaced `There isn&#39;t one. You write the rubric now.` with
`You write the rubric now.` in `dist/lectures/week-12/index.html`.

```
AssertionError: week 12's trick differs from its stand-up: expected 'You write the rubric now.' to be 'There isn\'t one. You write the rubri…' // Object.is equality
Expected: "There isn't one. You write the rubric now."
Received: "You write the rubric now."
 ❯ spec/lecture-week-table.test.ts:68:95
```

## Green against the real input

After restoring the three files:

```
 Test Files  1 passed (1)
      Tests  1 passed (1)
```

Then `pnpm check`: build complete, `Test Files  5 passed (5)`, `Tests  22 passed (22)`.

## What no sensor covers

- **The 390px claim.** A spec cannot check it; the builder measured it in a
  browser. No sensor covers it.
- **The third cell's wording.** Only presence and non-emptiness are checked.
  The sentence is authored for this table and has no second source to compare
  against.
- **Week 10's missing `seen`, and any other missing value.** The page throws at
  build time, which is a separate sensor.
- **A table that is first on the page but not near the top.** The test takes the
  first table and does not check its position relative to the prose.

## Questions

None.
