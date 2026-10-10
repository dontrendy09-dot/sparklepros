/**
 * Renders the default social share image (public/og/sparkle-pros.jpg).
 *
 * A pre-rendered JPEG keeps the file well under WhatsApp's ~300 KB limit for
 * link previews — a dynamic PNG of the same photo is roughly 1 MB.
 *
 * Usage: npm run og
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const width = 1200;
const height = 630;
const panel = 560;

const photo = await sharp(path.join(root, "src", "assets", "images", "steam-cleaning-bedroom.jpg"))
  .resize(width - panel, height, { fit: "cover", position: sharp.gravity.west })
  .toBuffer();

const logo = await sharp(path.join(root, "src", "assets", "brand", "sparkle-pros-logo-light.png"))
  .resize({ width: 330 })
  .toBuffer();

const star = (x, y, size, fill) =>
  `<path transform="translate(${x} ${y}) scale(${size / 24})" fill="${fill}" d="M12 1.5C12.7 7.4 16.6 11.3 22.5 12C16.6 12.7 12.7 16.6 12 22.5C11.3 16.6 7.4 12.7 1.5 12C7.4 11.3 11.3 7.4 12 1.5Z"/>`;

const panelSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${panel}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#3e0d42"/>
      <stop offset="1" stop-color="#2b0731"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  ${star(56, 236, 18, "#c9a6e6")}
  <text x="84" y="251" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="600" letter-spacing="3.5" fill="#c9a6e6">COIMBATORE &amp; KONGU REGION</text>
  <text font-family="Georgia, 'Times New Roman', serif" font-size="56" font-weight="700" fill="#ffffff" letter-spacing="-1">
    <tspan x="56" y="318">Steam &amp; deep</tspan>
    <tspan x="56" y="380">cleaning, done</tspan>
    <tspan x="56" y="442">properly.</tspan>
  </text>
  <text x="56" y="500" font-family="Segoe UI, Arial, sans-serif" font-size="21" fill="#ffffff" fill-opacity="0.78">140°C steam · In-house crew · Pay after inspection</text>
  <text x="56" y="574" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="600" fill="#ffffff" fill-opacity="0.7">sparklepros.in</text>
</svg>`;

const sparkles = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width - panel}" height="${height}">
  ${star(width - panel - 96, 40, 48, "#ffffff")}
  ${star(width - panel - 132, 104, 18, "#ffffff")}
</svg>`;

await mkdir(path.join(root, "public", "og"), { recursive: true });
const out = path.join(root, "public", "og", "sparkle-pros.jpg");
const info = await sharp({ create: { width, height, channels: 3, background: "#2b0731" } })
  .composite([
    { input: Buffer.from(panelSvg), left: 0, top: 0 },
    { input: logo, left: 56, top: 64 },
    { input: photo, left: panel, top: 0 },
    { input: Buffer.from(sparkles), left: panel, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true, progressive: true })
  .toFile(out);

console.log(`og  ${path.relative(root, out)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
