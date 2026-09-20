---
kind: prediction
about: 10-work-order-page-builder.md
written: 2026-09-20T15:40+10:00
by: dispatcher (main session)
---

# What I expect the page-builder to produce

Written before the role was dispatched and never shown to it. I have read the
design and the lecture template. I have not opened any component.

1. **One red run before green.** `lecture.data` has no typed `seen`, and the
   template already casts `mechanism` to read it. I expect the first `pnpm
   check` to fail on a type error and the report to say what it read.
2. **The accessibility-tree check is not done as the design asks.** The design
   wants each label announced exactly once at 390px, read from the browser's
   accessibility tree. The role has Bash and no browser tool, so I expect the
   report to list it under *What I did not do*, or to substitute a check on
   the markup and call it the same thing.
3. **The dark theme is not looked at.** Same reason. If the report says it was
   checked, I expect it to say how, and I will ask what it saw.
4. **The 390px measurement is real.** The role file names the 500px clamp, so
   I expect `innerWidth` to be reported as the page gave it, and for that to
   be 390 or an explained 500.
5. **The stack point lands between 600px and 800px,** chosen against week 11's
   mechanism, the longest.
6. **A missing value on any week but 10 stops the build,** as the design asks,
   through a thrown error in the page or component, not through a spec.

## What I would have done alone, for the gap

One session would have rendered and looked at both viewports in a real browser
in the same sitting, including the dark theme, and would have claimed all of it.
The gap I am watching for is the reverse: the role does less verification
because it has fewer tools, and says so.

## What would make this prediction worthless

If the report confirms 2 and 3 as done with a method that reads the
accessibility tree and the dark render, my picture of the role's tools is
wrong, and the evidence entry says so.
