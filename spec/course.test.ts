import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// What this course promises that the build cannot check: three registers a
// week (a trick, the mechanism it exploits, and who pays for it), an order to
// the weeks, weeks that do not repeat, assessment that draws on the weeks it
// follows, a paper and a case behind every trick, and prose that reads like a
// person wrote it. Each test is a decision about what a good course is, made
// checkable.

interface ApiNode {
  id: string;
  type: string;
  title: string;
  description: string;
  related?: string[];
  meta?: Record<string, unknown>;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const nodesOfType = (type: string): ApiNode[] => api.nodes.filter((node) => node.type === type);
const sessions = nodesOfType("sessions");
const lectures = nodesOfType("lectures");
const assessments = nodesOfType("assessments");
const weekOf = (node: ApiNode): number => Number(node.meta?.week);
const byWeek = (nodes: ApiNode[], week: number): ApiNode | undefined =>
  nodes.find((node) => weekOf(node) === week);

// The one honest week: the layoff list. No trick can reach a spreadsheet
// sorted by cost centre, so the site must not pretend one can.
const HONEST_WEEK = 10;

describe("two registers a week", () => {
  it("gives every week a trick in the stand-up and a mechanism in the lecture, except the honest week", () => {
    for (let week = 1; week <= 12; week++) {
      const session = byWeek(sessions, week);
      const lecture = byWeek(lectures, week);
      expect(session, `no stand-up for week ${week}`).toBeDefined();
      expect(lecture, `no lecture for week ${week}`).toBeDefined();
      const trick = session?.meta?.trick;
      const mechanism = lecture?.meta?.mechanism;
      if (week === HONEST_WEEK) {
        expect(trick, `week ${week} must not offer a trick`).toBeUndefined();
        expect(mechanism, `week ${week} must not claim a mechanism`).toBeUndefined();
      } else {
        expect(typeof trick, `week ${week} has no trick`).toBe("string");
        expect(typeof mechanism, `week ${week} has no mechanism`).toBe("string");
      }
    }
  });

  // Every trick has a cost and somebody pays it. The honest week has no
  // trick, but the layoff list still costs someone, so the cost is named
  // there too: the line is the one register no week is excused from.
  it("names who pays in every stand-up, the honest week included", () => {
    for (let week = 1; week <= 12; week++) {
      const cost = byWeek(sessions, week)?.meta?.cost;
      expect(typeof cost, `week ${week} does not say who pays`).toBe("string");
      expect((cost as string).trim().length, `week ${week} names nobody`).toBeGreaterThan(0);
    }
  });
});

describe("the weeks are in an order", () => {
  it("has every week after the first build on an earlier one, and never a later one", () => {
    for (const session of sessions) {
      const week = weekOf(session);
      const buildsOn = session.meta?.buildsOn;
      expect(Array.isArray(buildsOn), `${session.id} has no buildsOn list`).toBe(true);
      const earlier = buildsOn as unknown[];
      if (week > 1) {
        expect(earlier.length, `week ${week} builds on nothing`).toBeGreaterThan(0);
      }
      for (const ref of earlier) {
        expect(Number.isInteger(ref), `week ${week} buildsOn contains ${String(ref)}`).toBe(true);
        expect(Number(ref), `week ${week} builds on week ${String(ref)}, which is not earlier`).toBeLessThan(week);
        expect(Number(ref), `week ${week} builds on week ${String(ref)}, which does not exist`).toBeGreaterThan(0);
      }
    }
  });
});

describe("the weeks do not repeat one another", () => {
  // Word-set overlap of two weeks' titles and descriptions. Twelve weeks that
  // say the same thing in different nouns is the failure the brief names.
  const MAX_OVERLAP = 0.4;
  const words = (node: ApiNode): Set<string> =>
    new Set(
      `${node.title} ${node.description}`
        .toLowerCase()
        .replace(/[^a-z' ]+/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 3),
    );
  const overlap = (a: Set<string>, b: Set<string>): number => {
    let shared = 0;
    for (const word of a) if (b.has(word)) shared++;
    return shared / new Set([...a, ...b]).size;
  };

  for (const [label, nodes] of [
    ["stand-ups", sessions],
    ["lectures", lectures],
  ] as const) {
    it(`keeps every pair of ${label} under ${MAX_OVERLAP} word overlap`, () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const score = overlap(words(nodes[i]), words(nodes[j]));
          expect(score, `${nodes[i].id} and ${nodes[j].id} overlap ${score.toFixed(2)}`).toBeLessThan(MAX_OVERLAP);
        }
      }
    });
  }
});

describe("assessment draws on the weeks", () => {
  const relatedSessions = (assessment: ApiNode): ApiNode[] =>
    sessions.filter((session) => assessment.related?.includes(session.id));

  it("has every assessment draw on at least one stand-up", () => {
    for (const assessment of assessments) {
      expect(relatedSessions(assessment).length, `${assessment.id} draws on no week`).toBeGreaterThan(0);
    }
  });

  it("has every stand-up feed at least one assessment", () => {
    for (const session of sessions) {
      const feeds = assessments.some((assessment) => assessment.related?.includes(session.id));
      expect(feeds, `${session.id} feeds no assessment`).toBe(true);
    }
  });

  it("never sets an assessment due before the last week it draws on", () => {
    for (const assessment of assessments) {
      const lastWeek = Math.max(...relatedSessions(assessment).map(weekOf));
      expect(weekOf(assessment), `${assessment.id} is due in week ${weekOf(assessment)} but draws on week ${lastWeek}`).toBeGreaterThanOrEqual(lastWeek);
    }
  });

  it("never sets an assessment due in the mid-semester break", () => {
    // The break is the whole calendar weeks between the two stand-ups that
    // are more than a week apart; it is derived from the schedule rather
    // than restated here. The rest of the last teaching week before it is
    // still teaching time, so a Friday due date there is fine.
    const DAY = 86_400_000;
    const mondayOf = (iso: string): number => {
      const date = new Date(`${iso}T00:00:00Z`);
      return date.getTime() - ((date.getUTCDay() + 6) % 7) * DAY;
    };
    const dates = sessions.map((session) => String(session.meta?.date)).sort();
    const gaps = dates.slice(1).map((date, i) => ({ from: dates[i], to: date }));
    const breaks = gaps.filter((gap) => Date.parse(gap.to) - Date.parse(gap.from) > 7 * DAY);
    expect(breaks.length, "expected exactly one break in the schedule").toBe(1);
    const breakStart = mondayOf(breaks[0].from) + 7 * DAY;
    const breakEnd = mondayOf(breaks[0].to);
    expect(breakEnd - breakStart, "the break should be at least a week of whole weeks").toBeGreaterThanOrEqual(7 * DAY);
    for (const assessment of assessments) {
      const due = String(assessment.meta?.due).slice(0, 10);
      const at = Date.parse(`${due}T00:00:00Z`);
      const inBreak = at >= breakStart && at < breakEnd;
      expect(inBreak, `${assessment.id} is due ${due}, inside the break`).toBe(false);
    }
  });
});

describe("every trick is real", () => {
  // A paper for the mechanism and a case for the trick: two sources is the
  // floor, because a week with one has either no theory or no evidence.
  it("has every lecture cite at least two sources with a title and a URL", () => {
    for (const lecture of lectures) {
      const sources = lecture.meta?.sources;
      expect(Array.isArray(sources), `${lecture.id} has no sources list`).toBe(true);
      expect((sources as unknown[]).length, `${lecture.id} cites fewer than two sources`).toBeGreaterThanOrEqual(2);
      for (const source of sources as { title?: unknown; url?: unknown }[]) {
        expect(typeof source.title, `${lecture.id} has a source with no title`).toBe("string");
        expect(String(source.url), `${lecture.id} has a source without an http URL`).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("the prose reads like a person wrote it", () => {
  // Stock phrases that mark text nobody chose. Corporate register belongs in
  // the trick sections and is deliberate there; these belong nowhere.
  const BANNED = [
    "delve",
    "in today's fast-paced",
    "it's important to note",
    "it is important to note",
    "a testament to",
    "game-changer",
    "game changer",
    "leverage",
    "unlock",
    "tapestry",
    "cutting-edge",
    "seamless",
    "robust",
    "journey",
  ];

  const htmlFiles = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) return name === "pagefind" ? [] : htmlFiles(path);
      return name.endsWith(".html") ? [path] : [];
    });

  const textOf = (html: string): string =>
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&#39;|&apos;|’/g, "'")
      .toLowerCase();

  it("uses none of the banned phrases on any page", () => {
    const pages = htmlFiles(resolve("dist"));
    expect(pages.length).toBeGreaterThan(20);
    for (const page of pages) {
      const text = textOf(readFileSync(page, "utf8"));
      for (const phrase of BANNED) {
        expect(text.includes(phrase), `${page.replace(resolve("dist"), "")} uses "${phrase}"`).toBe(false);
      }
    }
  });
});
