# Handoff

Roles in this repo are subagents, defined in `.claude/agents/`. They share no
context and cannot talk to each other. Everything that passes between them
passes through this directory, so what is written here is the whole interface,
and a role that needs something not written here has found a defect in the
format rather than a reason to ask.

Files are numbered in the order they were written, so one `ls` shows the chain:

```
NN-<kind>-<role>.md      kind is work-order, report or prediction
```

One writer per file, ever. A correction is a new numbered file, not an edit to
an old one — the record of what a role was actually told is worth more than a
tidy directory.

The dispatch prompt is one sentence: *Read `docs/handoff/NN-....md` and do what
it says.* If a role needed more than that, the work order was wrong.

## A work order

Frontmatter: `to`, `kind: work-order`, `written`, `reads`, `writes`. Then:

- **One-line job** — imperative, one sentence.
- **Read these, in this order** — exact repo-relative paths. Nothing else is
  authoritative.
- **Write exactly this** — exact paths. The dispatcher checks `git status
  --porcelain` against this list afterwards, because a role's tool list can
  stop it writing at all but cannot stop it writing in the wrong place.
- **Facts you will not find in the files** — the deadline, the word count, who
  is reading. A subagent inherits `CLAUDE.md` but not the conversation, so
  anything agreed in chat and written nowhere does not reach it. This section
  is where the commonest failure of a context-free role gets prevented.
- **Done when** — numbered; each item a command whose exit code decides, or a
  string that must or must not appear.
- **Out of scope** — named, not implied.
- **If unsure** — list them under `## Questions` in the report; do not assume.

## A report

Frontmatter: `from`, `kind: report`, `answers` (the work order's filename),
`written`. Then **What I did**, **What I found**, **What I changed** (exact
paths, or "nothing"), **Done-when results** — the work order's numbered list
restated by the same numbers, each with its measured result — **What I did not
do**, and **Questions**, which is never omitted.

That last pairing is the device: a missing or renumbered Done-when item is
visible without reading a word of the prose.

## A prediction

Written by the dispatcher before a role runs, never after, and never shown to
the role. It says what the dispatcher expects that role to find. The gap
between it and the report is the only evidence that the arrangement produced
something a single session would not have.
