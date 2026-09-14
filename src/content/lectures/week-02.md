---
title: Goodhart's law for beginners
description:
  Goodhart, Campbell, and the paraphrase everyone quotes. What happens to a
  measure once the people it measures know it is a target.
week: 2
date: 2027-03-02
teachers:
  - ingrid-solano
mechanism: A measure used as a target gets moved by the cheapest available means, which is rarely the thing it was meant to measure.
sources:
  - title: Goodhart's law
    url: https://en.wikipedia.org/wiki/Goodhart%27s_law
  - title: Campbell's law
    url: https://en.wikipedia.org/wiki/Campbell%27s_law
  - title: Goodhart's law in engineering metrics
    url: https://codepulsehq.com/guides/goodharts-law-engineering-metrics
related:
  - sessions/02-goodharts-law
---

Charles Goodhart wrote in 1975 that any observed statistical regularity will
tend to collapse once pressure is placed on it for control purposes. Donald
Campbell wrote in 1979 that the more a quantitative indicator is used for
decision-making, the more it will be corrupted and the more it will corrupt
the process it was meant to monitor. The version you have heard, "when a
measure becomes a target, it ceases to be a good measure", is Marilyn
Strathern's 1997 paraphrase, and it is the one that fits on a slide.

Software teams rediscover this every quarter. Pay by lines of code and the
code gets longer. Count closed tickets and tickets get smaller. Set a velocity
target and story points inflate. None of this requires anyone to be
dishonest. It requires only that the number be watched and that moving it be
cheaper than doing the work.

## Outline

- the three phrasings, and who actually said which
- lines, tickets, points: three metrics and how each one died
- why the dashboard cannot tell the difference
- what a measure can still do once everybody knows it is a target
