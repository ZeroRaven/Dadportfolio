// SITEMAP GENERATOR — run before every build (`npm run build`).
//
// Why not import the TS data directly? The repo must build on any Node ≥18,
// and only Node 22+ can strip types — and even then only with full .ts
// specifiers. Instead this script scans the KB content files (the single
// source of truth for article ids) textually, then validates what it found
// so a data refactor cannot silently ship a broken sitemap.
//
// Static routes mirror src/app/routes.tsx. Article routes = every
// `id: "..."` found in the KB content files (categories live only in
// index.ts and are intentionally not scanned). Tool routes = the deep
// pages of the Tools directory (validated against Tools.tsx below).

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://www.drmogalshah.com.np";

// The files that define articles (NOT index.ts — that holds category ids).
const KB_FILES = [
  "animalHealth", "cattle", "goats", "poultry", "crops",
  "fodder", "climate", "management", "more",
].map((f) => join(ROOT, "src/app/data/kb", `${f}.ts`));

// Deep tool pages (hub-and-spoke Tools redesign) — must stay in sync with
// the TOOL_GROUPS registry in src/app/pages/Tools.tsx; validated below.
const TOOL_IDS = [
  "weight", "gestation", "feed", "dosage", "water", "market", "bcs",
  "dairy", "land", "poultry", "hatch", "vaccine", "herd", "weather", "health",
];

const staticRoutes = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.9" },
  { path: "/services", priority: "0.9" },
  { path: "/experience", priority: "0.8" },
  { path: "/publications", priority: "0.7" },
  { path: "/booking", priority: "0.8" },
  { path: "/tools", priority: "0.7" },
  { path: "/knowledge", priority: "0.8" },
  { path: "/agromap", priority: "0.8" },
  { path: "/contact", priority: "0.8" },
  { path: "/gallery", priority: "0.6" },
];

// ── Collect article ids ────────────────────────────────────────────────────
const articleIds = [];
for (const file of KB_FILES) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/^\s*id:\s*"([a-z0-9-]+)"/gm)) {
    articleIds.push(m[1]);
  }
}

// ── Validation guards (fail the build loudly rather than ship drift) ───────
const dupes = articleIds.filter((id, i) => articleIds.indexOf(id) !== i);
if (dupes.length) {
  console.error(`[sitemap] DUPLICATE article ids found: ${dupes.join(", ")}`);
  process.exit(1);
}
if (articleIds.length < 30) {
  // The KB currently holds 32 articles — a sudden drop means the scan broke.
  console.error(
    `[sitemap] Only ${articleIds.length} article ids found (expected ≥30). ` +
    "Check that KB content files still use `id: \"slug\"` fields."
  );
  process.exit(1);
}

const toolsSrc = readFileSync(join(ROOT, "src/app/pages/Tools.tsx"), "utf8");
const missingTools = TOOL_IDS.filter((id) => !toolsSrc.includes(`value: "${id}"`));
if (missingTools.length) {
  console.error(
    `[sitemap] Tool ids not found in Tools.tsx registry: ${missingTools.join(", ")}`
  );
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const all = [
  ...staticRoutes,
  ...articleIds.map((id) => ({ path: `/knowledge/${id}`, priority: "0.6" })),
  ...TOOL_IDS.map((id) => ({ path: `/tools/${id}`, priority: "0.6" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (r) => `  <url>
    <loc>${BASE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(ROOT, "public/sitemap.xml"), xml);
console.log(
  `[sitemap] written with ${all.length} URLs ` +
  `(${articleIds.length} knowledge articles, ${TOOL_IDS.length} tool pages).`
);
