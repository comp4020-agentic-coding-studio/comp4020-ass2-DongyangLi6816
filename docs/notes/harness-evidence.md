# Harness evidence

Failures caught while doing the work, and what would have caught each one
earlier. Source material for `PROCESS.md` and for proposed `CLAUDE.md` rules —
not a draft of either.

Each entry records what actually happened, what it cost, and the harness-level
fix: a rule the agent holds to, or a sensor wired into `check`. Nothing goes in
that was not observed in the session.

This file stays behind with the prototype. Only `CLAUDE.md` and the sensors in
`check` carry forward, so an entry that proves durable is promoted into one of
those and says which.

---

## Headless Chrome reported a 500px viewport as 390px

**What happened.** Checking the new week-chain and week-nav components at the
390x844 phone marking viewport, I ran
`chrome --headless --window-size=390,844 --screenshot`. The capture showed the
lead paragraph clipped at the right edge and the two-column chain layout still
in force, which reads as horizontal overflow plus a dead media query. Both
readings were wrong. Chrome clamps a headless window to a 500px minimum width,
so the page had laid out at 500 CSS px and the image was merely cropped to 390.
Probing with a page that prints `innerWidth` returned `500`.

**What it cost.** One wrong screenshot, one near-miss: I was about to report
phone-width overflow that does not exist, and would have "fixed" a layout that
was already correct. Caught only because the media query I had just written at
`max-width: 30rem` visibly had not fired, which was the thing that did not add
up.

**What would have caught it earlier.** A sensor. `--window-size` is not a
viewport control; `Emulation.setDeviceMetricsOverride` over the DevTools
protocol is. The replacement script drives CDP, sets a real viewport, and
returns `innerWidth` and `scrollWidth` alongside the image, so the measurement
reports what it measured and an overflow claim is falsifiable. Re-run at a true
390px: viewport 390, scrollWidth 390, no overflow.

**Promotion.** Proposed, not yet wired: fold that script into `check` as a
phone-width overflow gate over the week pages, so `scrollWidth > innerWidth`
fails the build instead of relying on someone looking at a picture.

## A grep for a CSS class "verified" a component that was not there

**What happened.** To check the two absence markers rendered on exactly one
lecture and one stand-up, I grepped `dist` for `register-absent` and got all 24
week pages. Same for `chain-none`. The obvious conclusion --- the conditional
is broken and the marker renders everywhere --- was wrong: Astro emits a
component's scoped `<style>` block on every page that uses the component, so
the class name is in the stylesheet whether or not the element exists. The grep
was reading CSS, not markup.

**What it cost.** Two checks that returned a confident number about nothing,
and would have passed just as happily if the elements had never rendered at
all. Re-run against the rendered text (`>No mechanism this week.<`) it returns
exactly `lectures/week-10/` and `sessions/10-the-layoff-list/`, which is the
claim.

**What would have caught it earlier.** A rule, and it is the one already in
`CLAUDE.md` under "say what would falsify it": a check whose failure mode is
indistinguishable from its success mode is not evidence. Grepping a built page
for a class name cannot come out wrong, because scoped CSS guarantees the hit.
Assert on rendered text or on the element with its attributes.

**Promotion.** Rule, for `CLAUDE.md` if it holds up again: when checking a
built page, match what a reader sees --- rendered text or a full element ---
never a class name, which the stylesheet supplies for free.


## Three visibly wrong figures, and a green `check` for all of them

**What happened.** Building the semester track and the weights bar, `pnpm
check` --- typecheck, build, axe over 38 pages, the link checker, 16 spec tests
--- came back green on three states that were wrong the moment anyone looked:

- `min-height: 1em` on the assessment badge reserved less than the line box it
  renders in, so the four weeks carrying a badge stood taller than the other
  eight and the track was a ragged row.
- Folding each block's gloss into the figure let a three-line gloss push its
  weeks below a two-line gloss's, so the twelve cells stepped down the page
  instead of reading as one track. Fixed with `grid-template-rows: subgrid`.
- `border-inline-start` on the break label, which is set `writing-mode:
  vertical-rl`, drew as a stub across the top of the label rather than a line
  down the semester --- under vertical writing the inline-start edge *is* the
  top. Physical `border-left` was what the design meant.

Then a fourth, found only by forcing `data-theme="dark"`: the lightest segment
of the weights bar sat at `color-mix(accent 55%, bg)`, which against a near
black background was barely a shade off it.

**What it cost.** Four rounds of render-look-fix. Nothing shipped wrong,
because each one was caught by reading the picture --- but nothing in `check`
was ever going to catch them.

**What would have caught it earlier.** Nothing in this repo yet, and it is
worth being honest about which of these a sensor could reach. Unequal cell
heights and a stepped track are measurable: the bounding boxes of the twelve
week cells should share a top edge and a height, and that is a DOM assertion.
The break rule and the dim segment are not; they need an eye. The axe pass in
particular gives false comfort here --- it checks the contrast of *text*, and a
block of colour carrying meaning with no text in it is invisible to it.

**Promotion.** Proposed, alongside the phone-width overflow gate from the first
entry: a layout sensor over the built home page asserting the twelve week cells
agree on top edge and height. The rest stays a rule that is already in
`CLAUDE.md` --- open the page and look at it --- and this entry is evidence it
earns its place.

## A colon in a frontmatter line took the build down

**What happened.** Adding the new `cost:` line to all twelve stand-ups in one
scripted pass, week 9's value began "You: the person nobody can remove". YAML
read the second colon as a nested key and `astro check` failed on
`09-the-reorg.md:11:9` with "bad indentation of a mapping entry" before any
page built.

**What it cost.** One red run and one quoted string. Small, and caught at the
first gate, which is the point of recording it: the sensor that caught it is
the build, and the build only ran because `pnpm check` is the first thing done
after a content edit.

**What would have caught it earlier.** A rule. Any frontmatter value written by
a script, or containing `: `, is double-quoted. Eleven of the twelve lines were
fine, which is exactly how the twelfth gets through a read-over.

**Promotion.** Proposed for `CLAUDE.md`, under the stack facts: quote any
frontmatter scalar that contains a colon.

## An edit script quoted a paragraph from memory and stopped halfway

**What happened.** The block D script replaced text in nine files in
sequence, each replacement guarded by an assertion that the old string occurs
exactly once. The week 11 stand-up's old string had been typed from my own
summary of the page, not copied from it, and did not match. The assertion
fired, the script exited, and the six edits after it never ran, while the
three before it had already been written.

**What it cost.** One partially applied unit, a `grep` to find out which half
had landed, and a second run of the remainder. Nothing wrong shipped, because
the guard did its job: an unguarded `replace` would have silently changed
nothing and reported success.

**What would have caught it earlier.** The guard is the sensor and it worked;
what failed was the input to it. The rule: an `old` string in an edit script
is pasted from the file's current text, never reconstructed. Where several
files are edited in one pass, check every `old` string against its file before
writing any of them, so a mismatch stops the pass before it starts rather than
in the middle.

**Promotion.** Rule, for `CLAUDE.md` if it recurs: match strings come from the
file, and a multi-file edit verifies all its matches before it writes one.

## The screenshot stopped 4,000 pixels short of the thing being checked

**What happened.** The capture script clips a page at 4,000 CSS pixels to
keep images readable. The new grade-band tables sit at the bottom of the
assessment pages, below that line on both viewports. The first captures of
`/assessments/ungameable-review/` reported no overflow and showed a page that
looked fine, and neither fact said anything about the tables, because the
tables were not in the picture.

**What it cost.** One round of looking at the wrong evidence. Caught because
the plan named the band table as the thing to look at and the picture did
not contain one. Recaptured at full height, the phone view showed the table
scrolling sideways inside its box, which was the finding, and it was fixed.

**What would have caught it earlier.** A rule the harness already states,
applied to the sensor itself: name what you exercised. A capture reports
the page height it took and the height it clipped to; a claim about
something below the clip is not a claim. The script now takes the clip height
from the environment and prints both numbers, so the next reader can see
when a picture is a fragment.

**Promotion.** Rule, for `CLAUDE.md` if it recurs: a screenshot verifies only
what is inside it, and the capture must say what it left out.

## The colon took the build down a second time

**What happened.** Rewriting eleven `description:` fields in one scripted
pass to stop them restating the page, three of the new sentences contained
a colon followed by a space. The helper wrote plain multi-line scalars, so
YAML read the colon as a nested key and `astro check` failed on the first
file it reached.

**What it cost.** One red run, the same as the first time, plus the
realisation that the first entry's rule had been written down and not
followed, because a rule in an evidence file is not a rule anywhere the work
happens.

**What would have caught it earlier.** The helper that writes frontmatter
now emits folded scalars (`>-`) for every description it touches, so the
rule lives in the tool rather than in a note. That is the sensor form of
the rule the first entry proposed.

**Promotion.** This lesson has now recurred, which is the bar the harness
sets. Proposed for `CLAUDE.md`, stack facts: a frontmatter scalar that
contains `: ` is written as a folded block or a quoted string, never plain.
