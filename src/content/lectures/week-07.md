---
title: Promotion-driven development
description:
  Why launches are rewarded and maintenance is not, and how that one incentive
  explains most of what large software companies build and abandon.
week: 7
date: 2027-04-20
teachers:
  - ingrid-solano
mechanism: Impact is assessed at launch and the cost of a rebuild lands in someone else's review, so launches are overproduced and maintenance is underproduced.
sources:
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
response to the rubric. Week 2 said the measure moves by the cheapest means.
This is the most expensive version of that, and it is still cheap for the
person doing it.

## Outline

- what a packet contains, and what it cannot
- the rebuild: who gets the launch, who gets the migration
- Google's product graveyard as a rubric artefact
- how to tell a rebuild the users needed from one the packet needed
