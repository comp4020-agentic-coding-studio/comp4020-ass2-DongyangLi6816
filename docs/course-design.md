# SLOP3385 Meets Expectations: Surviving the Performance Review

Course design for Assignment 2. This is the plan the site is built from; the
site, not this file, is the deliverable. Where a call is still open it is
marked **open** with the pick I'd make.

## The one idea

Every trick for surviving a performance review works because the review system
is badly designed. So the course teaches the tricks, straight-faced, beside
each one explains the real mechanism it exploits, and ends each one by naming
who pays for it. By week 12 the student understands the system well enough to
design one their week-1 self could not beat, and to say who pays under the
design. You learn to game the system; then you become the system.

Revised 16 September 2026 after an external review. What changed: a fourth
per-week field, `cost`; one classic paper beside each week's case;
calibration reframed as a flawed fix for the rater problem rather than the
enemy; week 8 rebuilt around passive presence so it stops repeating week 5;
peer feedback folded into week 3; week 11 corrected (the rat race has a
model); Assessment 3 marked on the page rather than the room; Assessment 4
given two questions no design may skip.

The audience is real: final-year students about to start graduate jobs at
companies that, in 2025 and 2026, cut staff on the basis of ratings decided in
rooms the employee never enters. Nobody tells graduates how they will be
judged. This course does, in the form of a survival guide.

## Course record

| Field | Value |
| --- | --- |
| Code | SLOP3385 (**open**: 3xxx as a final-year elective; 6385 if it should read as a fake MBA subject) |
| Title | Meets Expectations: Surviving the Performance Review |
| Level | 3 |
| Session | Semester 1, 2027 |
| Teaching period | 22 February – 28 May 2027 (the starter's dates; twelve teaching weeks with a two-week break after week 6) |
| Tags | office politics, performance reviews, careers |
| Description (80–300 chars) | A semester on how tech companies rate, rank and cut their staff, taught as the survival guide nobody gives graduates. Learn the tricks, learn why they work, then design a review that can't be gamed. |

Session label (**open**): "Workshops". The in-voice alternative is
"One-on-ones", which is funnier but reads as a private meeting rather than a
class; "Workshops" is the safe pick.

## Tone and the lines we hold

- **Straight-faced.** The site reads like a real corporate training course. The
  irony is left for the reader; the site never winks. (**open**: this is my
  pick over openly sarcastic. Deadpan wears better over twenty pages.)
- **Three registers, kept apart.** Each week has a *Trick* section written in
  corporate voice ("stakeholders", "alignment", "impact"), a *Why it works*
  section in plain English, and a one-line *Who pays* in plain English as a
  verdict. Jargon is allowed only in the trick. This is the difference between
  deliberate jargon and AI slop, and it becomes a harness rule.
- **A paper and a case, every week.** The mechanism cites the research it
  rests on (Scullen, Kerr, Holmstrom and Milgrom, Prendergast, Bolino,
  Harris and Schaubroeck, Heilman and Haynes, Elsbach, Landers, Colquitt);
  the trick cites a 2025–26 case. `spec/course.test.ts` holds every lecture
  to at least two sources.
- **The joke is on the system, not on people.** Tricks stay within office
  politics and gaming the measure. Nothing illegal, no sabotage of a named
  colleague, no harassment. Real layoffs are cited as facts with sources and
  are never played for laughs.
- **Every trick is real.** Each week names at least one real, sourced case
  (a memo, a leaked policy, a published essay). A trick with no source doesn't
  go in.

## Shape of the semester

Four blocks of three weeks, the break in the middle. Each block ends with a
change of footing.

| Block | Weeks | What changes |
| --- | --- | --- |
| A. The room | 1–3 | You learn how the rating is actually decided, by whom, and why the room exists |
| B. Inputs you control | 4–6 | You learn to shape the self-review, the traces and the credit |
| *break* | 5–16 April | |
| C. Inputs you do not | 7–9 | The packet, the presence and the reorg: tricks that depend on things you don't control |
| D. The system fails | 10–12 | The tricks fail, then stop distinguishing anyone, and you are handed the other side of the table |

### Week by week

Each week has a lecture (Monday) and a workshop. Frontmatter on every week:
`trick` (one line), `mechanism` (one line), `buildsOn` (earlier weeks),
`sources` (URLs). Week 10 has no `trick` and no `mechanism`, on purpose.

**Week 1 (22 Feb) — Welcome to calibration.**
The meeting where your rating is decided, and you are not in the room. Forced
distribution from Welch's 20/70/10 "vitality curve" to Meta's 2025 instruction
that managers of large teams rate 15–20% "below expectations". *Trick:* know
the rubric better than your manager does; every word in your self-review maps
to a rubric line. *Why it works:* your manager has three minutes to argue for
you in calibration and will use whatever you hand them. Builds on: nothing.
This week's lecture carries the real deck.

**Week 2 (1 Mar) — Rewarding A, hoping for B.**
Kerr (1975), Goodhart (1975), Campbell (1979), Strathern's paraphrase, and
Holmstrom and Milgrom's multitask model (1991): pay for the countable task and
effort leaves the uncountable one. Software examples: lines of code, closed
tickets, story points. *Trick:* split one ticket into five. *Why it works:*
the dashboard counts tickets, not work, and nobody reconciles the two. *Who
pays:* whoever does the work the dashboard cannot count. Builds on: 1.

**Week 3 (8 Mar) — Who speaks for you.**
Who speaks for you in calibration, who writes your peer feedback, and who
chairs it. Prendergast (1999) on influence activities under subjective
evaluation; Bolino et al. (2008) on ingratiation outperforming self-promotion.
*Trick:* choose your reviewers, then have coffee with your skip-level. *Why it
works:* calibration is advocacy, and being liked moves a rating further than
being impressive. *Who pays:* the new hire with nobody to ask. Builds on: 1.

**Week 4 (15 Mar) — The self-review as fiction.**
The brag document (Julia Evans), Amazon's 2026 "Forte" requirement to list
3–5 accomplishments with impact. *Trick:* quantify everything, including the
parts you made up ("reduced onboarding time by 40%" for a doc you wrote once).
*Why it works:* numbers survive the summary that reaches calibration; sentences
don't. Builds on: 1, 2. **Assessment 1 set.**

**Week 5 (22 Mar) — Traces.**
Work nobody sees doesn't exist. *Trick:* post progress in the public channel,
never in a direct message; reply-all on the good news. *Why it works:* your
manager's memory of your quarter is built from the traces that crossed their
screen, and a private message leaves none. Kept deliberately apart from week
8: this is the trace work leaves; week 8 is the trace you leave when not
working. *Who pays:* the person who fixed it in a direct message. Builds on:
3, 4.

**Week 6 (29 Mar) — Credit.**
"We shipped" versus "I shipped". *Trick:* be the person who writes the launch
email. *Why it works:* the launch email is the only artefact of a project most
executives ever read, and its author is assumed to be its owner. Builds on: 5.
**Assessment 1 due Friday 2 April.** Then the break.

**Week 7 (19 Apr) — Promotion-driven development.**
Why new things get built and old things rot: promotion packets reward launches,
and maintaining someone else's system produces nothing packet-shaped. Google's
product graveyard as the case. *Trick:* rebuild something that already works,
and launch it. *Why it works:* "impact" is measured at launch, and the cost of
the rebuild lands in someone else's review. Builds on: 2, 6.

**Week 8 (26 Apr) — Presence.**
Being seen, rated separately from what you did. Elsbach, Cable and Sherman
(2010): passive face time triggers spontaneous inferences of "dependable" and
"committed" that the observer does not know they made. Proxies updated to
2026: status dot, document comments, camera, attendance. *Trick:* keep the
green dot on, and comment on every document. *Why it works:* presence is
absorbed as a trait, not remembered as an event, and the signal costs
nothing. *Who pays:* whoever has to be offline at five. Builds on: 5.
**Assessment 2 set.**

**Week 9 (3 May) — The reorg.**
Every trick so far assumes a stable org chart. A reorg wipes the scoreboard:
new manager, no history, your brag doc is about a team that no longer exists.
*Trick:* become the only person who understands the system you built. *Why it
works:* in a reorg, the people kept are the ones whose removal breaks
something. Builds on: 3, 7. **Assessment 2 due Friday 7 May.**

**Week 10 (10 May) — The layoff list.**
Microsoft 2025: a PIP or a voluntary exit, and a two-year rehire ban. Amazon,
October 2025 to January 2026: roughly 30,000 corporate roles, the memo citing
"layers" and AI. Meta, May 2026: about 10%. How the list is actually built: by
function, cost and headcount target, with "performance" applied afterwards.
**No trick this week.** *Why there is no trick:* a spreadsheet sorted by cost
centre cannot be gamed by anyone on it. Builds on: 1, 9. This is the one honest
week, and the change of tone is the point.

**Week 11 (17 May) — The rat race.**
When everyone games the measure, the measure measures nothing, and the whole
team runs faster to stay in place. Landers, Rebitzer and Taylor (1996) model
the rat race and measure it in two law firms: promotion on billable hours,
every associate bills long, hours stop distinguishing anyone, nobody can move
first. Scullen, Bergey and Aiman-Smith (2005) on forced-distribution gains
fading within a few years; Ordóñez et al. on what narrow targets do
meanwhile. Earlier drafts called this folk theory; it is not, and the page no
longer says so. *Trick:* leave before the equilibrium arrives. *Why it
works:* the race is the equilibrium, not a failure of it. *Who pays:*
everyone who stays. Builds on: 2, 10. **Assessment 3 runs in this week's
workshop.**

**Week 12 (24 May) — Now you're the manager.**
Backward design applied to a review system: decide what you want to be true of
your team, then design the evidence, then the process. Design a review your
week-1 self could not beat. *Trick:* there isn't one; you write the rubric now.
*Why it works:* every trick in this course was a design flaw with a person
standing in it. Builds on: everything. **Assessment 4 due Friday 28 May.**

## Assessment (100%)

Revised 17 September 2026. Five pieces, every one weighted against named
criteria, every one with five grade bands (HD 80–100, D 70–79, CR 60–69,
P 50–59, N 0–49) written in the piece's own terms and rendered under "How it
is marked". Each written piece has the same skeleton a real assignment sheet
has: the brief, what to write (sections and limits), rules, what you submit
(format, filename, thread, time), a timeline where the piece spans weeks, and
a marker's checklist the tutor works down.

| # | Task | Weight | Set | Due | Draws on weeks |
| --- | --- | --- | --- | --- | --- |
| 0 | Stand-up attendance | 10% | wk 1 | every stand-up, best 10 of 12 | all |
| 1 | The self-review | 15% | wk 4 | Fri 2 Apr (wk 6) | 1, 2, 4, 6 |
| 2 | The manager's case | 20% | wk 8 | Fri 7 May (wk 9) | 3 to 8, and the team |
| 3 | Calibration | 15% | wk 11 | prediction Wed 19 May, room Thu 20 May, page by midnight | 1, 3, 9, 10, 11, and the team |
| 4 | Design an ungameable review | 40% | wk 7 | design Mon 24 May 9 am, justification Fri 28 May 5 pm | all |

**0. Stand-up attendance (10%).** One mark per stand-up: half for being in the
room when it starts, half for bringing what the page's Bring section asks
for. Best ten of twelve count, so two misses need no extension. The tutor
records it in the room. The course teaches in week 8 that presence is a
proxy; the piece says so on its own page and the week 8 stand-up points at
the sheet. It has `cadence: weekly` in frontmatter: the semester track shows
it no due badge, the weights bar lists it first, and its `week`/`due` name
the last stand-up only because the schema requires them. Its bands are in
marks out of ten rather than the university's ranges, and the spec test
allows that for a weekly piece only.

**1. The self-review (15%).** Write a self-review, in corporate register, for a
completely ordinary quarter of work: a group project, a part-time job, a
semester of a club. Then, on a second page, write the honest version in plain
English. Page one is a header naming the rubric and three to five statements
of at most 60 words, each bracketed with its rubric line and every number
tagged (C) checkable or (E) estimated; page two is under 300 words, second
person, no untagged numbers. Marked (weighted): rubric mapping 40, tagged and
plausible numbers 30, the honest version 30.

**2. The manager's case (20%).** Replaces the field report, which asked
students to observe a trick in a workplace most of them do not have, and
which markers could not distinguish from a made-up one. Now the course
supplies the field: twelve engineers' packets on the team page (below).
Groups are drawn in the week 8 stand-up and each student takes one packet by
lottery. Page one is the case they would argue in the room, 450 words, a
proposed rating and the curve, three claims each tied to a packet item with
its evidence type named. Page two is what they do not believe: every trick in
the packet by week, what it would take to check, and the rating they would
give if it all checked out, with the gap explained. This is the manager's
side of the table, which A1 is the employee's side of, and it is the
preparation a real manager does before calibration with the honest half
written down. Marked (weighted): the case 35, the tricks found 30, the checks
15, two minutes and an honest gap 20.

**3. Calibration (15%).** The A2 group is the room, whatever its size,
because teams are; the curve is fixed at one in five exceeds and one in ten
below, at least one below, rounded (six is 1/4/1, eight 2/5/1, twelve 2/9/1).
A student chair is drawn on Wednesday night: calls names in an order they do
not explain, times cases at two minutes, runs the ten minutes that fit the
curve, keeps the record sheet. The chair's own engineer has nobody to argue
for them and is read flat from the packet for one minute, which is week 9
made literal; every room has one. The tutor floats, arbitrates and signs the
sheets. Forty-five minutes in a fifty-minute stand-up; the old twenty-minute
spoken debrief becomes the page. Three things make the page markable rather
than a participation mark: a prediction sealed the night before (marked on
the explanation of the gap, not on accuracy), the chair's record as the fact
base every claim is checked against, and a counterfactual that only someone
who saw how the below was produced can write. Being in the room is a gate:
pass or fail, a fail caps at 49, and neither the two minutes nor the
engineer's result is marked, for the reason week 1 gives. Marked (weighted):
the record 25, the mechanisms 35, the prediction and the gap 25, the
counterfactual 15.

**4. Design an ungameable review (40%).** A review system for the team
whose packets the student argued from and calibrated over, in two parts. The design, two pages, posted by 9 am Monday of week
12: a front page with three answers (what replaces calibration, how a rating
is contested, who pays) and a trick table with a row for each of weeks 1 to
11 (the trick, what it stands on, closed or conceded, how). The class attacks
it until the Thursday stand-up. The justification, up to 1,000 words, by 5 pm
Friday: what it cost and who pays for each closure, what beat it (cannot be
empty), and what you would ship. An optional draft goes to the tutor in week
10. Marked (weighted): coverage 25, the rater 20, contest 15, who pays 25,
survival 15. Converted from holistic so that the two front-page questions and
"who pays" are criteria a marker can score rather than sentences in a
paragraph; the argument the paragraph carried (a costless design sits low) now
lives in the N band and in the who-pays criterion. Down from 45% to make room
for attendance; still two fifths of the course.

## The team

A fifth content collection, `team`: twelve fictional engineers on one
payments team at a company that runs a curve, whose manager moved teams in
the April reorg. Each dossier is one quarter as it reaches the new manager:
a self-review in the course's corporate register, two peer paragraphs (one
nominated, one assigned), three notes the old manager left, eight dashboard
figures, the announcement if there was one, and where the person sits.
Each packet carries one or two things the course has a week for, and the
set covers the course: unverifiable numbers and a borrowed launch email
(Priya), ticket splitting (Lena), presence (Marcus), the rebuild (Aisha) and
the person who paid for it (Kenji), the bus factor (Daniel), the skip-level
coffee (Sofia), the public feed (Ravi), the new hire with nobody to nominate
(Jonas), the carer who is offline at four (Hannah), the incident handler who
only exists in direct messages (Tom), and one honest, tagged, unremarkable
quarter (Grace). A2 argues from them, A3 calibrates them, A4 designs for
them; `spec/course.test.ts` holds the collection to twelve, each with the six
packet parts, and each drawn on by all three assessments. Registered in
`graphCollections` so the edges render both ways and the packets are in the
API.

## Policies page

Short, and in voice. Three sections:

- **Calibration.** "Marks in this course are calibrated. Your tutor proposes a
  mark; the teaching team meets without you and fits the proposals to the
  distribution the school expects. You will not be told what the distribution
  is. This is how it works where you are going, and we would be lying to run it
  any other way."
- **Visibility.** Work not posted in the course forum by the due time does not
  exist for marking purposes. (A restatement of week 5 as a rule.)
- **Extensions.** Plain and humane; the one place the course drops the act, so
  the reader knows the act is an act.

## People

Two invented staff. The starter's portraits and entries are replaced.

- **Convenor** — a former engineering manager who "sat in fourteen calibration
  meetings and was the person being calibrated in nine more". Delivers the
  lectures.
- **Tutor** — a recent graduate, "currently rated Meets Expectations". Chairs
  the week 11 calibration.

## Home page

What a prospective student sees in the first ten seconds: the title, one
paragraph of the pitch (the survival guide nobody gives you), the four-block
shape as a single line, and the honest disclosure that the course grades on a
curve. No hero image of a handshake.

## The deck

Week 1, "Welcome to calibration", twelve or so slides: the room; the curve
(Welch → Ballmer memo 2011 → "No more curve" 2013 → Meta 2025); what your
manager has in front of them; three minutes per name; what you can do about it
from outside the room; what this course will and will not teach you. Speaker
notes carry the sources.

## What the harness should hold to

Decisions about a good course, and where each one lands. This is the spine
PROCESS.md needs.

**Position.** A good course is one idea, aligned end to end (Biggs's
constructive alignment; Wiggins and McTighe's backward design): the final
assessment is the reason the weeks exist, each week does one job, and a
student can tell why week 9 follows week 8. Its voice is its own, and it never
lies to the student about what it is.

**Encoded as spec tests** (promises the build can't check):

1. Every week 1–12 has both a `trick` and a `mechanism`, except week 10, which
   has neither. Guards the two-register structure and the honest week.
2. `buildsOn` only points to earlier weeks, and every week after week 1 names at
   least one. Guards the order.
3. No two weeks are near-duplicates: word-set overlap of any two week
   descriptions stays under a threshold. Guards against "twelve weeks that
   repeat one another", the failure the markers named.
4. Every assessment is `related:` to at least one week and every week feeds at
   least one assessment. No orphan content; alignment is real, not claimed.
5. No assessment is due before the last week it draws on, and no due date lands
   in the break.
5a. Every assessment has five grade bands, HD to N in order, in the
   university's ranges (marks out of ten for the weekly piece), no two saying
   the same thing; and every weighted piece's criteria sum to 100. Guards the
   promise on the assessment index that each piece says what each grade looks
   like.
5b. The team is twelve, each dossier has the six packet parts and eight
   figures, and every engineer is drawn on by A2, A3 and A4. Guards the
   packets against becoming set dressing.
6. Every week lists at least one `sources` URL. The course's promise that every
   trick is real.
7. A banned-phrase list ("delve", "in today's fast-paced", "it's important to
   note", "unlock", "a testament to") fails the build on any page. Guards the
   voice at the cheap end.

**Encoded as CLAUDE.md rules** (proposed; nothing is added without approval):

- Jargon only inside a Trick section; Why-it-works sections are plain English,
  second person, no filler.
- Each week names a real, sourced case before it names a trick.
- Real layoffs are facts with citations, never punchlines.

**Deliberately left out of tests:** the jargon-only-in-tricks rule. Whether
jargon is deliberate or slop is a judgement about intent, and a test that
counted buzzwords per section would be the course's own week 2 lesson applied
to itself: the measure would become the target. It stays a rule read by a
person. Likewise "would someone want to take it" is the crit's call, not a
test's.

## What the research settled, and what it didn't

Settled, with sources: the vitality curve and Microsoft's 2013 exit from it;
Meta's 2025 rating floors and cuts; Microsoft's 2025 PIP-or-exit policy and
rehire ban; Amazon's 2025–26 cuts and the 2026 "Forte" accomplishments
requirement; Google's 2025 GRAD changes; Goodhart, Campbell, Strathern;
Evans on brag documents; promotion-driven development. Added in the September
2026 revision, all peer-reviewed: rater idiosyncrasy as over half of rating
variance (Scullen, Mount and Goff 2000); the multitask crowding-out result
(Holmstrom and Milgrom 1991); influence activities under subjective evaluation
(Prendergast 1999) and ingratiation outperforming self-promotion (Bolino et
al. 2008); self-rating leniency of half a standard deviation (Harris and
Schaubroeck 1988); credit by expectation under ambiguity (Heilman and Haynes
2005); passive face time as spontaneous trait inference (Elsbach, Cable and
Sherman 2010); the rat-race equilibrium (Landers, Rebitzer and Taylor 1996);
downsizing driven by cost, not performance (Datta et al. 2010); procedural
justice as the predictor of accepting an outcome (Colquitt 2001).

Contested or thin, and the site says so where it uses them: Amazon's "unregretted
attrition" targets (leaked, denied by Amazon, affirmed by one HR witness); the
exact way layoff lists are built (practitioner accounts, not a study). The
"everyone games it" equilibrium was listed here as folk theory in the first
draft; the rat-race literature settles it, and it has moved up.

## Sources

Research added in the September 2026 revision

- Scullen, Mount and Goff, "Understanding the latent structure of job performance ratings", JAP 2000 — https://psycnet.apa.org/record/2000-16508-012
- Speer, Tenbrink and Schwendeman, "Let's talk it out: the effects of calibration meetings on performance ratings", Human Performance 2019 — https://www.tandfonline.com/doi/abs/10.1080/08959285.2019.1609477
- Buckingham and Goodall, "Reinventing performance management", HBR 2015 — https://hbr.org/2015/04/reinventing-performance-management
- Kerr, "On the folly of rewarding A, while hoping for B", AMJ 1975 — https://journals.aom.org/doi/abs/10.5465/255378
- Holmstrom and Milgrom, "Multitask principal-agent analyses", JLEO 1991 — https://academic.oup.com/jleo/article-abstract/7/special_issue/24/2194011
- Prendergast, "The provision of incentives in firms", JEL 1999 — https://www.aeaweb.org/articles?id=10.1257/jel.37.1.7
- Bolino, Kacmar, Turnley and Gilstrap, "A multi-level review of impression management", J. Management 2008 — https://journals.sagepub.com/doi/10.1177/0149206308324325
- Harris and Schaubroeck, "A meta-analysis of self-supervisor, self-peer, and peer-supervisor ratings", Personnel Psychology 1988 — https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1744-6570.1988.tb00631.x
- Heilman and Haynes, "No credit where credit is due", JAP 2005 — https://pubmed.ncbi.nlm.nih.gov/16162063/
- Elsbach, Cable and Sherman, "How passive 'face time' affects perceptions of employees", Human Relations 2010 — https://journals.sagepub.com/doi/abs/10.1177/0018726709353139
- Elsbach and Cable, "Why showing your face at work matters", MIT Sloan Management Review 2012 — https://sloanreview.mit.edu/article/why-showing-your-face-at-work-matters/
- Landers, Rebitzer and Taylor, "Rat race redux", AER 1996 — https://ideas.repec.org/a/aea/aecrev/v86y1996i3p329-48.html
- Scullen, Bergey and Aiman-Smith, "Forced distribution rating systems and the improvement of workforce potential", Personnel Psychology 2005 — https://onlinelibrary.wiley.com/doi/10.1111/j.1744-6570.2005.00361.x
- Datta, Guthrie, Basuil and Pandey, "Causes and effects of employee downsizing", J. Management 2010 — https://journals.sagepub.com/doi/10.1177/0149206309346735
- Colquitt, "On the dimensionality of organizational justice", JAP 2001 — https://doi.org/10.1037/0021-9010.86.3.386

Mechanisms

- Vitality curve — https://en.wikipedia.org/wiki/Vitality_curve
- Eichenwald, "Microsoft's Lost Decade", Vanity Fair, 2012 — https://www.vanityfair.com/news/business/2012/08/microsoft-lost-decade
- HBR, "Don't rate your employees on a curve", 2013 — https://hbr.org/2013/11/dont-rate-your-employees-on-a-curve
- Amazon OLR / URA leak — https://www.hcamag.com/us/news/general/leaked-amazon-memo-shows-how-it-forces-out-employees-to-hit-targets/253161
- Goodhart's law — https://en.wikipedia.org/wiki/Goodhart%27s_law
- Campbell's law — https://en.wikipedia.org/wiki/Campbell%27s_law
- Goodhart in engineering metrics — https://codepulsehq.com/guides/goodharts-law-engineering-metrics
- Nemenman, "Promotion-driven development" — https://medium.com/@quarterdome/promotion-driven-development-fbc6f48d43e8
- Yegge, "Dear Google Cloud: your deprecation policy is killing you" — https://medium.com/@steve.yegge/dear-google-cloud-your-deprecation-policy-is-killing-you-ee7525dc05dc
- Evans, "Brag documents" — https://jvns.ca/blog/brag-documents/
- Pragmatic Engineer on calibrations — https://newsletter.pragmaticengineer.com/p/performance-calibrations
- Lattice on calibration — https://lattice.com/articles/the-how-and-why-of-performance-review-calibration
- Sucher and Gupta, "Layoffs that don't break your company", HBR 2018 — https://hbr.org/2018/05/layoffs-that-dont-break-your-company
- How layoff lists are built (practitioner) — https://www.dice.com/career-advice/how-companies-decide-who-to-lay-off-and-who-to-keep

2025–26 cases

- Meta 5% low-performer cuts, Jan 2025 — https://www.fortune.com/2025/01/14/meta-cut-5-percent-staff-lowest-performers-layoffs
- Meta 15–20% "below expectations" floor, May 2025 — https://www.peoplematters.in/news/performance-management/meta-prepares-for-future-layoffs-by-ranking-more-employees-as-low-performers-45647
- Meta Reality Labs cuts, Jan 2026 — https://techcrunch.com/2026/01/14/meta-to-reportedly-lay-off-10-of-reality-labs-staff/
- Meta cuts, Mar 2026 — https://www.cnbc.com/2026/03/25/meta-layoffs-reality-labs-facebook.html
- Microsoft performance-based cuts, Jan 2025 — https://www.nbcnews.com/business/business-news/microsoft-confirms-performance-based-job-cuts-departments-rcna187072
- Microsoft PIP-or-exit policy and rehire ban, Apr 2025 — https://finance.yahoo.com/news/microsoft-sets-tougher-rules-underperformers-165952780.html
- Microsoft cuts and Nadella memo, Jul 2025 — https://www.nbcnews.com/business/business-news/microsofts-satya-nadella-says-job-cuts-weighing-heavily-rcna220879
- Microsoft buyouts, 2026 — https://fortune.com/2026/07/01/microsoft-may-cut-thousands-more-jobs-control-costs/
- Amazon 14,000 cuts, Oct 2025 — https://deadline.com/2025/10/amazon-slashing-housands-of-corporate-jobs-reuters-report-1236599112/
- Amazon "Forte" accomplishments requirement, Jan 2026 — https://fortune.com/2026/01/08/amazon-demands-proof-of-productivity-from-employees-asking-for-list-of-accomplishments/
- Amazon 16,000 more cuts, Jan 2026 — https://www.cnbc.com/2026/01/28/amazon-layoffs-anti-bureaucracy-ai.html
- Google GRAD changes, Apr 2025 — https://www.hrkatha.com/news/google-overhauls-performance-ratings-to-sharpen-focus-on-high-achievers/
- Running list of 2026 layoffs citing AI — https://techcrunch.com/2026/07/25/the-running-list-major-tech-layoffs-in-2026-where-employers-cited-ai/

Course design

- Wiggins and McTighe, Understanding by Design — https://www.ascd.org/books/understanding-by-design-expanded-2nd-edition
- Biggs, "Enhancing teaching through constructive alignment", 1996 — https://doi.org/10.1007/BF00138871
- WWU, "Using big ideas for course design" — https://tlc.wwu.edu/2023/04/13/using-big-ideas-for-course-design/
- Pfeffer, "The Paths to Power", Stanford GSB — https://jeffreypfeffer.com/teaching/
- Wharton MGMT7720 Power and Politics in Organizations — https://mgmt.wharton.upenn.edu/programs/mba/course-descriptions/
- Calling Bullshit syllabus — https://callingbullshit.org/syllabus.html
- How to Make (Almost) Anything — https://fab.cba.mit.edu/classes/863.25/
- CS 007 — https://cs007.blog/
