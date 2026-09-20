---
title: Promotion-driven development
description: >-
  Promotion packets, Google's product graveyard, the multitask model with a
  launch in it, and how to tell a rebuild the users needed from one the packet
  needed.
week: 7
date: 2027-04-20
teachers:
  - ingrid-solano
mechanism: A packet counts launches; the multitask result says the countable task crowds out the rest, and maintenance is the rest.
seen: A promotion packet, whose project list is sorted by launch date and has no entry for upkeep.
sources:
  - title: "Holmstrom and Milgrom, Multitask principal-agent analyses (Journal of Law, Economics, and Organization, 1991)"
    url: https://academic.oup.com/jleo/article-abstract/7/special_issue/24/2194011
  - title: "Nemenman, Promotion-driven development"
    url: https://medium.com/@quarterdome/promotion-driven-development-fbc6f48d43e8
  - title: "Yegge, Dear Google Cloud: your deprecation policy is killing you"
    url: https://medium.com/@steve.yegge/dear-google-cloud-your-deprecation-policy-is-killing-you-ee7525dc05dc
related:
  - sessions/07-promotion-driven-development
---

A promotion packet is a list of things launched. Maintaining a system that
works, for years, for thousands of users, produces nothing that fits in it.
Replacing that system with a new one produces a launch, a design document, an
announcement and a packet, and the cost of migrating everyone off the old one
is paid later, by other people, in reviews that are not yours.

Steve Yegge's 2020 essay on Google Cloud's deprecation policy is the best
known account of what this does to a company from the outside: products that
appear, are announced, and are abandoned once the people who launched them
have been promoted off them. From the inside it looks like a rational
response to the rubric. Week 2 gave you the model: two tasks, one countable
and one not, and effort flowing to the counted one. A launch is countable.
Keeping a system alive for its users is not, so the packet cannot hold it,
so nobody is paid to do it, so it is done badly or not at all. This is the
most expensive version of the multitask result, and it is still cheap for
the person doing it. The bill goes to the users who migrate and to the
engineer who inherits the old system after the launch team has been
promoted off it.

## Outline

- what a packet contains, and what it cannot
- the multitask model, one more time, with a launch in it
- the rebuild: who gets the launch, who gets the migration
- Google's product graveyard as a rubric artefact
- how to tell a rebuild the users needed from one the packet needed
