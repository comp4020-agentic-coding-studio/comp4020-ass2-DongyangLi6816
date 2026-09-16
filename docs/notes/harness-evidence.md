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
