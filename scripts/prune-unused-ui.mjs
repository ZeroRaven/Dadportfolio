#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  prune-unused-ui — drop shadcn/ui components that site code never imports
 * ─────────────────────────────────────────────────────────────────────────────
 *  WHY: exports from Figma Make commit the ENTIRE shadcn/ui library into
 *  `src/app/components/ui/`, but `package.json` only carries dependencies for
 *  the components actually used. Unused files then fail `tsc --noEmit` in CI
 *  with "Cannot find module 'recharts'" (and ~24 more packages).
 *
 *  HOW: walks every import in site code (outside ui/), collects the set of
 *  `components/ui/<name>` modules that are referenced — including transitive
 *  imports between ui files — and deletes every other file in ui/.
 *  Only ever touches `src/app/components/ui/`. Never deletes the FLOOR set
 *  (button/card/input/label/textarea/utils) even if temporarily unreferenced.
 *
 *  USAGE:
 *    npm run prune-ui            → list what would be removed (dry run)
 *    npm run prune-ui -- --apply → actually delete the files
 *
 *  After deleting, run `npm run typecheck` to confirm the gate is green.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const UI_DIR = join(ROOT, "src", "app", "components", "ui");
const SRC_DIR = join(ROOT, "src");
const APPLY = process.argv.includes("--apply");

/** Components that must survive even if the scan finds no references. */
const FLOOR = new Set(["button", "card", "input", "label", "textarea", "utils"]);

/** Recursively collect .ts/.tsx files under a directory. */
function collect(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collect(full, out);
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

/** Pull every module specifier (static + dynamic import) out of a file. */
function specifiers(source) {
  const specs = [];
  for (const m of source.matchAll(/from\s+["']([^"']+)["']/g)) specs.push(m[1]);
  for (const m of source.matchAll(/import\(\s*["']([^"']+)["']\s*\)/g)) specs.push(m[1]);
  return specs;
}

const uiFiles = readdirSync(UI_DIR).filter((f) => /\.(ts|tsx)$/.test(f));
const uiNames = new Set(uiFiles.map((f) => f.replace(/\.(ts|tsx)$/, "")));

/** Reference set seeded from site code outside ui/. */
const referenced = new Set();
for (const file of collect(SRC_DIR)) {
  if (file.startsWith(UI_DIR + "/") || file.startsWith(UI_DIR + "\\")) continue;
  for (const spec of specifiers(readFileSync(file, "utf8"))) {
    const m = spec.match(/components\/ui\/([a-z0-9-]+)/i);
    if (m && uiNames.has(m[1])) referenced.add(m[1]);
  }
}

/** Grow the set with imports made *by* kept ui files (transitive closure). */
let grew = true;
while (grew) {
  grew = false;
  for (const name of [...referenced]) {
    const file = join(UI_DIR, `${name}.tsx`);
    let source;
    try {
      source = readFileSync(file, "utf8");
    } catch {
      continue; // .ts variant or unreadable — nothing to walk
    }
    for (const spec of specifiers(source)) {
      // Relative intra-ui import: "./utils", "../ui/button", "./button"
      if (spec.startsWith(".")) {
        const resolved = spec.replace(/^\.\//, "").replace(/^(\.\.\/)+(app\/)?components\/ui\//, "");
        const base = resolved.replace(/\.(ts|tsx)$/, "");
        if (uiNames.has(base) && !referenced.has(base)) {
          referenced.add(base);
          grew = true;
        }
      } else {
        const m = spec.match(/components\/ui\/([a-z0-9-]+)/i);
        if (m && uiNames.has(m[1]) && !referenced.has(m[1])) {
          referenced.add(m[1]);
          grew = true;
        }
      }
    }
  }
}

for (const name of FLOOR) referenced.add(name);

const removable = [...uiNames].filter((n) => !referenced.has(n));
if (removable.length === 0) {
  console.log("prune-unused-ui: nothing to remove — all ui components are referenced.");
  process.exit(0);
}

console.log(`${APPLY ? "Removing" : "Would remove"} ${removable.length} unused ui component(s):`);
for (const name of removable.sort()) console.log(`  - src/app/components/ui/${name}.tsx`);

if (!APPLY) {
  console.log("\nDry run only. Re-run with:  npm run prune-ui -- --apply");
} else {
  for (const name of removable) {
    rmSync(join(UI_DIR, `${name}.tsx`));
  }
  console.log("\nDone. Verify with:  npm run typecheck");
}
