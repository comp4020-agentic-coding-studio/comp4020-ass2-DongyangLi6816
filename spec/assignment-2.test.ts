import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { code: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const nodesOfType = (type: string): ApiNode[] => api.nodes.filter((node) => node.type === type);

// The last three digits of the SLOP code were assigned at provisioning time
// and are what keeps this course unique in the cohort — the brief asks that
// they survive whatever level digit gets chosen.
const PROVISIONED_CODE_SUFFIX = "385";

describe("assignment 2 spec", () => {
  it("keeps the SLOP code's provisioned three digits", () => {
    expect(api.course.code.endsWith(PROVISIONED_CODE_SUFFIX)).toBe(true);
  });

  it("runs across twelve dated teaching weeks", () => {
    const weeks = nodesOfType("sessions")
      .map((node) => node.meta?.week)
      .sort((a, b) => Number(a) - Number(b));
    expect(weeks).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
  });

  it("adds its assessment weights up to 100%", () => {
    const total = nodesOfType("assessments").reduce(
      (sum, node) => sum + Number(node.meta?.weight ?? 0),
      0,
    );
    expect(total).toBe(100);
  });

  it("has at least one lecture linked to a real, multi-slide deck", () => {
    const deckLectures = nodesOfType("lectures").filter(
      (node) => typeof node.meta?.slides === "string",
    );
    expect(deckLectures.length, "no lecture has a slides: link").toBeGreaterThan(0);

    const hasRealDeck = deckLectures.some((node) => {
      const deckName = (node.meta?.slides as string).replace(/^\/decks\/|\/$/g, "");
      const deckPath = resolve("src/decks", `${deckName}.deck.mdx`);
      if (!existsSync(deckPath)) return false;
      const body = readFileSync(deckPath, "utf8").replace(/^---\n[\s\S]*?\n---\n?/, "");
      const slides = body.split(/^---$/m).filter((slide) => slide.trim().length > 0);
      return slides.length > 1;
    });
    expect(hasRealDeck, "no linked deck has more than one slide").toBe(true);
  });
});
