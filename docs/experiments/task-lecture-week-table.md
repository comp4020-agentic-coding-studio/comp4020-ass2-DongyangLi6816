# Task: a table on every lecture page

## What to build

Every lecture page, weeks 1 to 12, gains one table near the top of the page,
before the prose. Three columns:

| The trick | The mechanism it exploits | Where you'd see it |

- **The trick** is already written. It is the `trick:` field on that week's
  stand-up entry under `src/content/sessions/`.
- **The mechanism it exploits** is already written. It is the `mechanism:`
  field on the lecture itself.
- **Where you'd see it** is new: one concrete, observable line per week,
  naming a place a reader could actually watch the trick happen — a meeting,
  a message, a document, a dashboard.

The first two columns are read from the existing data, not retyped. A fact
restated in a second place is how the two start to disagree.

## What it has to do

1. Render on every lecture page at `/lectures/week-01/` through
   `/lectures/week-12/`.
2. Read at both marking viewports: 1920x1080 and 390x844.
3. `pnpm check` green — which includes axe over every rendered page, the
   base-path link check, and the existing spec suites.
4. Nothing about the course changes. This is a new view of facts the site
   already states, not a new claim.

## What is out of scope

The stand-up pages, the home page, the decks, the assessments, the styling of
anything that is not this table.

## Done when

- The table is on all twelve lecture pages.
- `pnpm check` exits 0.
- You can say, with a measurement rather than an impression, that the table
  reads at 390px — and say what you measured.
