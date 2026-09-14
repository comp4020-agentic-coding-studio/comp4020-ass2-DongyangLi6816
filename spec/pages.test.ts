import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Every page names itself once. The theme renders a heading only when a page
// has both a hero title and a hero image, so a listing page can build, pass
// the accessibility check and still open with no title at all; that is what
// the first iteration shipped. Slide decks are excluded: a deck is a run of
// slides, and each title slide is legitimately an h1.

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return ["pagefind", "decks"].includes(name) ? [] : htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });

describe("every page has one title", () => {
  it("renders exactly one h1 on every built page outside the decks", () => {
    const dist = resolve("dist");
    const pages = htmlFiles(dist);
    expect(pages.length).toBeGreaterThan(20);
    for (const page of pages) {
      const count = (readFileSync(page, "utf8").match(/<h1[\s>]/g) ?? []).length;
      expect(count, `${page.replace(dist, "")} has ${count} h1 elements`).toBe(1);
    }
  });
});
