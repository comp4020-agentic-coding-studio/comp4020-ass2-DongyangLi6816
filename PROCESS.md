## What I built

SLOP3385, *Meets Expectations: Surviving the Performance Review*. As AI becomes smarter and smarter each year, tech companies are doing layoffs more often than ever. So I built a course that teaches graduating Computer Science students how to survive performance reviews in tech companies. Each week the course teaches students a trick and why it works. At the end, students need to design a better performance review system that nobody can trick.

## How I got here

I started from my harness from week 6 ([`02ed8c6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-DongyangLi6816/commit/02ed8c6)). At first I prompted the way I always did, very casually, for example: *"Read through all the requirements and expectations of this assignment. Design a course website that aims for HD."* Even when I used plan mode to make a plan first, the result was not good. The website was mostly text. It looked like the original template with new words in it.

Later I learned to give the AI a role. A role tells the model who it is answering as and what standard to use, so it guesses less and the output is more professional. My prompts started to look like this:

```
You are a senior course designer and front-end engineer. You design the course first and build the site second, and you treat the rendered page, not the source, as the truth.

[Project background] ...
[Tech stack (fixed, don't change)] ...
[Hard requirements from the spec] ...
[Current task]
Work in three stages and stop for my approval after each one.
Stage 1: design, with no pages and no code.
Stage 2: turn the design into checks.
Stage 3: build.
[Requirements] ...
[Output format] ...
```

With a clear scope and clear requirements, the AI did exactly what I asked. After a little research on what a good course should looks like ([`98a4d4c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-DongyangLi6816/commit/98a4d4c)). I got the whole course in one evening ([`9cba3b3...4035307`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-DongyangLi6816/compare/9cba3b3...4035307)).

But this assignment is different from the crits. The project is much bigger and has many more requirements. So I kept working in the same session for a long time, over many turns. During that time I kept giving the AI new roles: the professor teaching the course, the teaching assistant, a student taking it, a product manager, a designer ([`8c5c13a...c0dd3d2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-DongyangLi6816/compare/8c5c13a...c0dd3d2)). As the turns and roles increases, I noticed the AI keep getting more stupid. It misunderstood even simple tasks. When playing product manager, AI still think about the beheavior of professor. Worse, it started to forget the instructions in `CLAUDE.md`. In `CLAUDE.md` I said it must not commit unless I explicitly say so. This worked at the start, but later it ignored the rule and committed straight after every change I asked for.

This made me think: can I keep the benefit of giving the agent roles, but use less context, so the model doesn't get dumb so fast and one role doesn't get polluted by another? After some research I decided to build a multi-subagent setup. Each role is its own agent with its own context, and the agents talk to each other through files. The main agent splits the task up and gives each agent one piece, which saves a lot of the main agent's context window. I asked the AI to summarise all the requirements I had given so far and build the roles from them ([`7115b75`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-DongyangLi6816/commit/7115b75)). There are five subagents: designer, content-writer, page-builder, page-reader and sensor-writer. When I give a new requirement, the main agent breaks it into subtasks and sends them out. It doesn't do any of the actual work itself. It only dispatches and checks the results. The first dispatch failed completely, because the agent can't call a role I add in the middle of a session until I restart the session ([`c1c5f3b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-DongyangLi6816/commit/c1c5f3b)).

To check whether the new setup was really better than a single agent, I ran an experiment. I wrote a small task ([`bcd17bb`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-DongyangLi6816/commit/bcd17bb)) and made two branches, `arch/single-session` and `arch/multi-agent`. On the first branch I used the old way and did everything in one session. On the second I used the new setup. Same task on both, so I could see if the new setup actually did better.

`arch/single-session`:
```
Do docs/experiments/task-lecture-week-table.md. Work entirely in this one session — do not use the Agent tool and do not dispatch subagents. Play the parts yourself as you go: designer, then developer, then reviewer.
```

`arch/multi-agent`:
```
Do docs/experiments/task-lecture-week-table.md using the roles in .claude/agents/. You are the dispatcher: write each work order under docs/handoff/, dispatch the role with a one-sentence prompt, check git status --porcelain against the work order's writes list, and do none of the roles' work yourself.
```

The result was a bit disappointing. The old setup finished in 4m 26s and used 100.3k/1m tokens (10%) of the context window ([`f38c798`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-DongyangLi6816/commit/f38c798)).

![Single session: 4m 26s, 100.3k of 1m tokens of context used](docs/images/experiments/single-session-context.png)

The new setup took 28m 25s and used 149.5k/1m tokens (15%) ([`fddd4aa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-DongyangLi6816/commit/fddd4aa)). It also used a lot more tokens overall.

![Five dispatched roles: 28m 25s, 149.5k of 1m tokens of context used](docs/images/experiments/multi-agent-context.png)

Almost all the extra tokens went on reading files. When I asked the AI to break down what happened, it showed the same thing ([`d4b4b92`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-DongyangLi6816/commit/d4b4b92)). Just to keep the setup running, the main agent wrote a lot of work orders, and every time a subagent finished, reading and checking its report took up more context.

After looking into it more, I found the reason: the task was too small. Handing a task off is only worth it when the subtask needs much more exploring than the conclusion it ends with.

- Worth it: searching a big repo for something spread across dozens of files, when all you need back is one sentence.
- Not worth it: you already know what to do, and the work itself is two hundred lines.

The new setup does have one real advantage though. The agents don't pollute each other. The agent that writes a page doesn't carry its thinking into the agent that reads the page looking for problems.

So in the end I decided to use the multi-agent setup for tasks that are big, need a lot of exploring and end in a small conclusion. For small tasks that one agent can do perfectly well, I don't use it. I wrote this rule into `CLAUDE.md` too ([`51d1f21`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-DongyangLi6816/commit/51d1f21)).
