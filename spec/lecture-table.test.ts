import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Every lecture page carries one table near the top: the week's trick, the
// mechanism it exploits, and where you'd see it. The first two are read from
// the existing entries, so the test compares the rendered table against the
// API rather than against strings typed here.

interface ApiNode {
  type: string;
  meta?: Record<string, unknown>;
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as {
  nodes: ApiNode[];
};
const metaFor = (type: string, week: number) =>
  api.nodes.find((node) => node.type === type && Number(node.meta?.week) === week)?.meta ?? {};

const plainText = (html: string): string =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const NO_TRICK_WEEK = 10;

describe("the trick table on every lecture page", () => {
  for (let week = 1; week <= 12; week++) {
    const slug = `week-${String(week).padStart(2, "0")}`;

    it(`week ${week} shows its trick, mechanism and where you'd see it, before the prose`, () => {
      const html = readFileSync(resolve(`dist/lectures/${slug}/index.html`), "utf8");
      const table = html.match(/<table[^>]*trick-table[\s\S]*?<\/table>/)?.[0];
      expect(table, `${slug} has no trick table`).toBeDefined();

      const headers = [...table!.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => plainText(m[1]));
      expect(headers).toEqual(["The trick", "The mechanism it exploits", "Where you'd see it"]);

      const cells = [...table!.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => plainText(m[1]));
      expect(cells).toHaveLength(3);

      const trick = metaFor("sessions", week).trick;
      const mechanism = metaFor("lectures", week).mechanism;
      if (week === NO_TRICK_WEEK) {
        expect(trick).toBeUndefined();
        expect(mechanism).toBeUndefined();
        expect(cells[0]).toBe("None this week.");
        expect(cells[1]).toBe("None this week.");
      } else {
        expect(cells[0]).toBe(trick);
        expect(cells[1]).toBe(mechanism);
      }
      expect(cells[2].length, `${slug} has no "where you'd see it"`).toBeGreaterThan(20);

      // "Before the prose": nothing from the lecture body, and no section
      // heading, comes ahead of the table.
      const main = html.slice(html.indexOf("<main"));
      const tableAt = main.indexOf("trick-table");
      expect(tableAt).toBeGreaterThan(-1);
      expect(main.indexOf("<h2")).toBeGreaterThan(tableAt);
    });
  }
});
