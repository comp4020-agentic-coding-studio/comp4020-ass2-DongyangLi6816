import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// The promise: every lecture page from week 1 to week 12 except week 10 opens
// with a table whose three column headers are "The trick", "The mechanism it
// exploits" and "Where you'd see it", in that order, and whose first two cells
// say what the stand-up's trick and the lecture's mechanism say. Week 10 is
// the honest week and has no table, because it has no trick to tabulate.

interface ApiNode {
  type: string;
  meta?: Record<string, unknown>;
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as { nodes: ApiNode[] };
const nodeFor = (type: string, week: number): ApiNode | undefined =>
  api.nodes.find((node) => node.type === type && Number(node.meta?.week) === week);

const HONEST_WEEK = 10;
const HEADERS = ["The trick", "The mechanism it exploits", "Where you'd see it"];

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (text: string): string =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (whole, name: string) => ENTITIES[name.toLowerCase()] ?? whole);
const textOf = (html: string): string =>
  decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const cellsOf = (row: string, tag: "th" | "td"): string[] =>
  [...row.matchAll(new RegExp(`<${tag}[\\s>][\\s\\S]*?</${tag}>`, "gi"))].map((cell) => textOf(cell[0]));

describe("the week table on each lecture page", () => {
  // Falsifier: a lecture page other than week 10 has no table, has headers
  // other than the three above in that order, has a first cell that differs
  // from its stand-up's trick or a second that differs from its lecture's
  // mechanism, or has an empty third cell; or week 10 has a table at all.
  // The third cell is checked only for presence: its sentence is authored
  // for this table alone, so no other source exists for a spec to compare it
  // to, and a check on its wording would only restate the content file.
  it("gives every lecture but week 10 a table of the stand-up's trick and the lecture's mechanism", () => {
    for (let week = 1; week <= 12; week++) {
      const path = resolve("dist", "lectures", `week-${String(week).padStart(2, "0")}`, "index.html");
      const html = readFileSync(path, "utf8");
      const tables = [...html.matchAll(/<table[\s>][\s\S]*?<\/table>/gi)].map((match) => match[0]);

      if (week === HONEST_WEEK) {
        expect(tables.length, `week ${week} has no trick, so it must have no table`).toBe(0);
        continue;
      }

      expect(tables.length, `week ${week} has no table`).toBeGreaterThan(0);
      // The first table is the one that opens the page, before the prose.
      const table = tables[0];
      expect(cellsOf(table, "th"), `week ${week} has the wrong column headers`).toEqual(HEADERS);

      const cells = cellsOf(table, "td");
      expect(cells.length, `week ${week} has ${cells.length} cells, not 3`).toBe(3);

      // A cell may repeat its own header as a label for narrow screens;
      // what follows the label is the value.
      const valueOf = (cell: string, header: string): string =>
        cell.startsWith(header) ? cell.slice(header.length).trim() : cell;

      const trick = String(nodeFor("sessions", week)?.meta?.trick);
      const mechanism = String(nodeFor("lectures", week)?.meta?.mechanism);
      expect(valueOf(cells[0], HEADERS[0]), `week ${week}'s trick differs from its stand-up`).toBe(textOf(trick));
      expect(valueOf(cells[1], HEADERS[1]), `week ${week}'s mechanism differs from its lecture`).toBe(textOf(mechanism));
      expect(valueOf(cells[2], HEADERS[2]).length, `week ${week} has nothing under "${HEADERS[2]}"`).toBeGreaterThan(0);
    }
  });
});
