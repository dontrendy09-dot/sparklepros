/**
 * Renders the PNG icon sizes (Apple touch icon + web manifest icons) from
 * src/app/icon.svg so every icon stays in sync with the SVG source.
 *
 * Usage: node scripts/generate-icons.mjs
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const svg = await readFile(path.join(process.cwd(), "src", "app", "icon.svg"), "utf8");
// iOS applies its own corner mask, so the Apple icon uses a square background.
const squareSvg = svg.replace('rx="14"', 'rx="0"');

const targets = [
  [squareSvg, 180, path.join("src", "app", "apple-icon.png")],
  [svg, 192, path.join("public", "brand", "icon-192.png")],
  [svg, 512, path.join("public", "brand", "icon-512.png")],
];

for (const [source, size, out] of targets) {
  await sharp(Buffer.from(source), { density: 72 * (size / 64) })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(process.cwd(), out));
  console.log(`icon  ${out}  ${size}x${size}`);
}
