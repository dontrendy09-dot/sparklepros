/**
 * Builds the web-ready photo set in /src/assets/images from the original
 * Sparkle Pros photo exports (large PNGs that should not live in git).
 *
 * Usage:
 *   npm run images -- "<path to folder with the original PNG exports>"
 *
 * Next.js <Image> generates AVIF/WebP at request time, so these masters are
 * stored as high-quality progressive JPEGs at their native 1536px width.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error('Usage: npm run images -- "<source folder>"');
  process.exit(1);
}

const outDir = path.join(process.cwd(), "src", "assets", "images");
const brandDir = path.join(process.cwd(), "src", "assets", "brand");
await mkdir(outDir, { recursive: true });

const jpeg = { quality: 82, mozjpeg: true, progressive: true };

/** Full-frame photographs. */
const photos = [
  ["Steam Cleaning.png", "steam-cleaning-bedroom.jpg"],
  ["Sofa Cleaning.png", "sofa-steam-extraction.jpg"],
  ["Kitchen Cleaning.png", "kitchen-cleaning.jpg"],
  ["Bathroom Cleaning.png", "bathroom-cleaning.jpg"],
  ["Villa Cleaning.png", "villa-cleaning-team.jpg"],
  ["Commercial Cleaning.png", "commercial-cleaning-team.jpg"],
];

/** Tighter crops used where a detail reads better than the full scene. */
const crops = [
  // [source, output, { left, top, width, height }]
  ["Steam Cleaning.png", "detail-mattress-steam.jpg", { left: 230, top: 300, width: 700, height: 600 }],
  ["Steam Cleaning.png", "apartment-armchair-steam.jpg", { left: 1040, top: 170, width: 496, height: 640 }],
  ["Sofa Cleaning.png", "detail-sofa-extraction.jpg", { left: 600, top: 160, width: 720, height: 720 }],
  ["Bathroom Cleaning.png", "detail-grout-scrubbing.jpg", { left: 760, top: 420, width: 680, height: 604 }],
  ["Kitchen Cleaning.png", "detail-kitchen-wipe-down.jpg", { left: 520, top: 240, width: 900, height: 700 }],
  // Distinct framings so services that share a source photo never look alike.
  ["Villa Cleaning.png", "home-floor-care.jpg", { left: 860, top: 100, width: 676, height: 820 }],
  ["Commercial Cleaning.png", "office-lobby-detail.jpg", { left: 0, top: 120, width: 680, height: 860 }],
  ["Commercial Cleaning.png", "commercial-floor-and-glass.jpg", { left: 670, top: 150, width: 866, height: 874 }],
];

for (const [src, out] of photos) {
  const info = await sharp(path.join(sourceDir, src))
    .resize({ width: 1536, withoutEnlargement: true })
    .jpeg(jpeg)
    .toFile(path.join(outDir, out));
  console.log(`photo  ${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

for (const [src, out, rect] of crops) {
  const info = await sharp(path.join(sourceDir, src))
    .extract(rect)
    .jpeg(jpeg)
    .toFile(path.join(outDir, out));
  console.log(`crop   ${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

// White logo for dark surfaces, derived from the transparent brand logo so
// the two variants always match exactly.
const logo = sharp(path.join(brandDir, "sparkle-pros-logo.png")).ensureAlpha();
const { width, height } = await logo.metadata();
const alpha = await logo.clone().extractChannel("alpha").toBuffer();
await sharp({ create: { width, height, channels: 3, background: "#ffffff" } })
  .joinChannel(alpha)
  .png({ compressionLevel: 9 })
  .toFile(path.join(brandDir, "sparkle-pros-logo-light.png"));
console.log(`logo   sparkle-pros-logo-light.png  ${width}x${height}`);
