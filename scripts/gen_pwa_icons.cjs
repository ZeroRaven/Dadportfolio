/* Release 10 — PWA icons generated from the WEBSITE LOGO (the Dr. Shah bust
 * illustration used in the nav + footer, src/imports/avatar.webp, 183x220,
 * white background, head top ~y=22, shoulders bleed to the side edges).
 *
 * Presentation mirrors the navbar exactly: a circular medallion of the bust
 * with a gold ring, on the deep-navy brand background.
 *   · pwa-192.png / pwa-512.png        (purpose "any")
 *   · pwa-192-maskable.png / -512-...  (content inside the 80% maskable safe zone)
 *   · apple-touch-icon.png             (180px, opaque — iOS rounds corners itself)
 *
 * Crop geometry: the bust is horizontally centered (content bbox x 0-182,
 * center x=91). The circle is centred at (91, 95) so the head clears the top
 * of the medallion and the wide shoulders are clipped by the circle exactly
 * like a portrait medallion. No distortion: the 183px-wide circle is scaled
 * with lanczos3 + a light sharpen.
 *
 * Run: NODE_PATH=/home/z/.npm-global/lib/node_modules node scripts/gen_pwa_icons.js
 */
const sharp = require("sharp");
const path = require("path");

const ROOT = "/home/z/my-project/dadportfolio";
const AVATAR = path.join(ROOT, "src/imports/avatar.webp");
const NAVY = { r: 10, g: 37, b: 64, alpha: 1 }; // #0A2540
const GOLD = "#D4AF37";

/* Circle crop parameters (source pixels, 183x220 image). */
const CX = 91;   // horizontal centre of the bust
const CY = 95;   // vertical centre — head top (y≈22) clears with margin
const R = 91.5;  // radius = half the image width (full-width circle)

async function makeIcon(size, outName, contentFrac) {
  const contentD = Math.round(size * contentFrac);        // medallion incl. ring
  const ringW = Math.max(2, Math.round(size * 0.035));    // gold ring thickness
  const discD = contentD - 2 * ringW;                     // white disc (the bust)

  // 1 — square extract of the bust around the circle, scaled to the disc size
  const side = Math.round(R * 2); // 183
  const left = Math.max(0, Math.min(CX - R, 183 - side));
  const top = Math.max(0, Math.min(CY - R, 220 - side));
  const bust = await sharp(AVATAR)
    .extract({ left: Math.round(left), top: Math.round(top), width: side, height: side })
    .resize(discD, discD, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.7 })
    .png()
    .toBuffer();

  // 2 — clip it to a circle (white background stays — it IS the medallion)
  const mask = Buffer.from(
    `<svg width="${discD}" height="${discD}"><circle cx="${discD / 2}" cy="${discD / 2}" r="${discD / 2}" fill="#fff"/></svg>`
  );
  const disc = await sharp(bust)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // 3 — the gold ring (like the navbar's ring-2 ring-[#D4AF37])
  const ring = Buffer.from(
    `<svg width="${contentD}" height="${contentD}"><circle cx="${contentD / 2}" cy="${contentD / 2}" r="${contentD / 2 - ringW / 2}" fill="none" stroke="${GOLD}" stroke-width="${ringW}"/></svg>`
  );

  // 4 — navy canvas + medallion + ring, centred
  const offset = Math.round((size - contentD) / 2);
  const out = path.join(ROOT, "public", outName);
  await sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([
      { input: disc, left: offset + ringW, top: offset + ringW },
      { input: ring, left: offset, top: offset },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log("wrote", out, `${size}x${size}`);
}

(async () => {
  /* "any" icons — medallion fills 87% (survives launcher circle masks) */
  await makeIcon(192, "pwa-192.png", 0.87);
  await makeIcon(512, "pwa-512.png", 0.87);
  /* maskable — whole medallion inside the 80% safe-zone circle */
  await makeIcon(192, "pwa-192-maskable.png", 0.76);
  await makeIcon(512, "pwa-512-maskable.png", 0.76);
  /* apple touch — opaque, slightly larger medallion (iOS adds its own mask) */
  await makeIcon(180, "apple-touch-icon.png", 0.86);
})();
