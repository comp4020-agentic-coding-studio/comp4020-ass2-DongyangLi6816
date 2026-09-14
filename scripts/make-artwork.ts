// Renders the course artwork: the home hero, written as SVG, and the 1200x630
// share card, rasterised to PNG. Both draw the same thing, a five-bar rating
// curve with the middle bar labelled "you", in the Slop brand colours. Run with
// `node scripts/make-artwork.ts` and commit the outputs; the build never runs this.
//
// The hero is SVG on purpose: the theme passes vector art through untouched,
// while a raster hero is re-encoded into AVIF srcset variants, and Chrome
// painted those variants of this flat artwork as blank. The curve sits on the
// right, clear of the title, with no axis labels: they collided with the
// title at desktop width and were lost under the scrim anyway. The frame is
// wide (2560x900) and the curve sits mid-height because the theme crops a
// hero to cover its band: a taller frame lost the "you" label off the top
// once the band was at its minimum height, and the site anchors the crop to
// the right edge so the curve survives phone width too.
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const GOLD = "#b97d1c";
const DARK_GOLD = "#8a5c13";
const INK = "#1f1a14";
const CREAM = "#fbf6ee";
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";

// Heights as a share of the tallest bar: below, meets-, meets, meets+, exceeds.
const BARS = [0.12, 0.3, 1, 0.3, 0.12];
const LABELS = ["below", "", "meets", "", "exceeds"];

function curve(
  x: number,
  y: number,
  w: number,
  h: number,
  labelSize: number,
  ink = INK,
  fills: [string, string] = [GOLD, DARK_GOLD],
  axisLabels = true,
): string {
  const gap = w * 0.06;
  const barW = (w - gap * 4) / 5;
  const parts: string[] = [];
  BARS.forEach((share, i) => {
    const bh = h * share;
    const bx = x + i * (barW + gap);
    const by = y + h - bh;
    const fill = i === 2 ? fills[0] : fills[1];
    parts.push(`<rect x="${bx}" y="${by}" width="${barW}" height="${bh}" fill="${fill}" />`);
    if (axisLabels && LABELS[i]) {
      parts.push(
        `<text x="${bx + barW / 2}" y="${y + h + labelSize * 1.4}" font-family="${FONT}" font-size="${labelSize}" fill="${ink}" text-anchor="middle">${LABELS[i]}</text>`,
      );
    }
    if (i === 2) {
      parts.push(
        `<text x="${bx + barW / 2}" y="${by - labelSize * 0.6}" font-family="${FONT}" font-size="${labelSize * 1.3}" font-weight="700" fill="${ink}" text-anchor="middle">you</text>`,
      );
    }
  });
  parts.push(`<line x1="${x}" y1="${y + h}" x2="${x + w}" y2="${y + h}" stroke="${ink}" stroke-width="${Math.max(2, h * 0.006)}" />`);
  return parts.join("\n");
}

function hero(): string {
  const W = 2560;
  const H = 900;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${INK}" />
  ${curve(W * 0.62, H * 0.30, W * 0.32, H * 0.42, 48, CREAM, ["#e0a53a", GOLD], false)}
</svg>`;
}

function card(): string {
  const W = 1200;
  const H = 630;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${CREAM}" />
  ${curve(W * 0.55, H * 0.2, W * 0.38, H * 0.5, 22)}
  <text x="70" y="150" font-family="${FONT}" font-size="30" fill="${DARK_GOLD}" letter-spacing="2">SLOP3385</text>
  <text x="70" y="235" font-family="${FONT}" font-size="66" font-weight="700" fill="${INK}">Meets</text>
  <text x="70" y="315" font-family="${FONT}" font-size="66" font-weight="700" fill="${INK}">Expectations</text>
  <text x="70" y="380" font-family="${FONT}" font-size="30" fill="${INK}">Surviving the performance review</text>
  <text x="70" y="560" font-family="${FONT}" font-size="26" fill="${DARK_GOLD}">Slop University</text>
</svg>`;
}

await writeFile("src/assets/images/hero-home.svg", hero());
await sharp(Buffer.from(card())).removeAlpha().png().toFile("src/assets/images/card.png");
console.log("wrote src/assets/images/hero-home.svg and card.png");
