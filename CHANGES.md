# Changelog — Site Optimization & Feature Release

**Date:** September 2026 · **Repo:** ZeroRaven/Dadportfolio · **Site:** drmogalshah.com.np

This release implements every fix from the deep-dive audit report
(`Website_Audit_Report_drmogalshah.com.np.pdf`): all 6 P0 critical fixes,
all P1 performance issues, and the feasible P2 feature roadmap.

---

## ⚠️ Two things to configure after deploy (2 minutes)

Open **`src/app/config/site.ts`** — the single source of truth for all site settings:

1. **WhatsApp username + phone** — a **DEMO pair is currently set**
   (`whatsappUsername: "drmogalshah"`, `phone: "+977 980-123-4567"`) so every
   feature is visible out of the box. WhatsApp links now use the **username
   format** (`wa.me/drmogalshah`) verified from the official WhatsApp Help
   Center — reserve the real username in the app (Settings → Account →
   Username) and paste it here to keep the phone number private. The phone
   number is still used for `tel:` network calls (usernames cannot place
   network calls). One edit updates the WhatsApp card, floating button, footer
   rows and every deep link — dev mode prints a loud console warning until
   swapped.

2. **Contact form delivery** — the form currently hands off to the visitor's
   email app with the message pre-filled (with clear on-screen feedback).
   For true background delivery, create a free key at **web3forms.com** and
   paste it into `formWeb3FormsKey` (or use `formspreeEndpoint`). The form
   then delivers silently with success/error states — no code changes needed.

---

## Release 7 — Implementation plan execution: reliability, SEO infrastructure, PWA offline, deep links, shareable results (Sept 2026)

*Every item below was implemented from a detailed external implementation plan
(verification-first: each claim was re-checked against the codebase before
patching — plan line numbers were already stale in places, values were
re-read from source).*

### RELIABILITY
- **Root `ErrorBoundary`** (`RouteErrorBoundary.tsx`, React Router 7 data
  mode) on the root route + the three heaviest lazy routes (Tools, AgroMap,
  Knowledge): a render error or **stale-chunk load failure** (common right
  after a deploy) now renders a styled bilingual recovery screen offering
  "Reload" (chunk case) or "Go home" — verified by renaming a hashed chunk
  and hard-reloading. Previously: blank white screen.
- **Cookie consent wired up** (was built but dormant): bilingual banner,
  `useConsent` hook (localStorage + cross-tab storage events, legacy-value
  mapping), and **analytics now gated — GA + Clarity mount only after
  "granted"**. Verified: fresh visit = zero analytics network requests;
  accept → scripts inject; decline → never loads; persists across reload.
  Dismissing (X) hides without recording — analytics stay off, banner
  returns next visit.
- `isDemoContact` now also checks the `phone` placeholder (the WhatsApp
  half already matched) so a partial real-config swap can't silence the
  dev warning.

### SEO — knowledge base gets real URLs (the highest-leverage fix)
- **`/knowledge/:slug`** — every one of the 32 articles is now deep-linkable,
  bookmarkable and individually indexable (was client-side `useState`).
  Article selection derives from the URL; bad slugs fall back to the grid
  with an inline notice; Back returns to the list.
- **Per-article SEO** (title, description, canonical, `og:type=article`)
  + **`Article` JSON-LD** (headline/dates padded to NPT from the honest
  `YYYY-MM` data — datePublished == dateModified noted in-code) + 3-level
  **`BreadcrumbList`** mirrored by a visible trail in the reader.
- **Fixed a pre-existing site-wide SEO bug**: `react-helmet` v6 under
  React 18 only ever applied `<title>` — meta description / og / canonical /
  robots NEVER updated on any route, and the static `index.html` tags then
  DUPLICATED helmet's (two conflicting canonicals!). Migrated to
  **`react-helmet-async` 3** (`HelmetProvider` in App) and stripped the
  duplicate-prone static tags from `index.html`. Verified: exactly ONE
  description/og/canonical per page, article-specific on article URLs.
- **Sitemap generator** (`scripts/generate-sitemap.mjs`, runs inside
  `npm run build`): 43 URLs = 11 static routes + **32 article URLs**,
  with duplicate/count validation guards so data drift fails the build
  loudly. Was: 10 hand-maintained flat entries.
- **Visible breadcrumb bar** (`LayoutBreadcrumb` in RootLayout) on every
  non-home route with matching `BreadcrumbList` schema — one wiring point;
  knowledge articles own their 3-level trail instead (Google's
  markup-must-match-visible-content policy honoured).
- **`llms.txt`** added (llmstxt.org shape, key pages + honest descriptions).
  Explicitly speculative for non-Google AI crawlers — Google has stated
  it ignores such files; shipped as a low-cost bet for Bing Copilot /
  Perplexity traffic, matching the README's own claim. FAQPage schema was
  NOT expanded (Google retired FAQ rich results in May 2026 — expanding it
  would ship inert markup).

### SITE SEARCH — auto-generated article entries
- Every KB article is now searchable in the ⌘K palette and 404 search
  (title + summary, both languages) and jumps to its **deep URL** — derived
  from `kbArticles` at load so new articles are searchable automatically.
- **Bundle regression caught and fixed during implementation**: the naive
  static import pulled the whole 256 KB knowledge dataset into the eager
  bundle (index chunk 144 → 388 KB!). The KB entries now **lazy-load on
  first search-UI use** (`useSearchIndex(active)` + module cache) — index
  chunk back to ~151 KB, KB data fetched only when search opens or the
  Knowledge page loads.

### PWA — offline support (farmers on rural connectivity)
- **`vite-plugin-pwa`** (generateSW, `registerType: 'prompt'`, reusing the
  existing manifest): 49 precached entries (~2.5 MB incl. fonts/og-image) —
  the whole site works offline. Verified: SW active, network off,
  `/knowledge` renders fully from cache.
- **Update prompt** (`PWAUpdatePrompt`, bilingual): a waiting service
  worker asks before activating — verified end-to-end (old SW active →
  new SW waiting → prompt → accept → new bundle live). Complements the
  RouteErrorBoundary's stale-chunk recovery.
- `engines: { node: ">=18" }` added to package.json.

### CI safety net
- **`.github/workflows/ci.yml`**: npm ci → `typecheck` (tsc --noEmit) →
  build → **fail on stale generated sitemap**. Note: the repo's `lint`
  script requires ESLint, which is not installed as a devDependency —
  CI gates on typecheck instead (noted in the workflow itself).

### TOOLS — results you can keep, share and link to
- **All 12 calculators** gained a shared **Save / Copy / Share / Print**
  row (`ResultCardActions`) + a collapsible per-tool **Recent results**
  list (localStorage, bounded at 50, cross-tab synced, fail-silent in
  private browsing). Share uses Web Share API on mobile, WhatsApp fallback
  on desktop. Verified: save → reload → history intact.
- **`/tools/:toolId` deep links** — every calculator has its own URL
  (tab state derived from the route; invalid ids fall back to weight).
  Verified: `/tools/vaccine` hard-load selects the vaccination tool.
- Print stylesheet added (`globals.css` + `print:hidden` chrome): printing
  a result shows the content, not nav/tab-rail/footer/floating buttons.

### AGROMAP — findable, linkable, shareable
- **Live district search** on the map: typing "ilam" (English or देवनागरी)
  green-highlights matches live and offers click-through chips that open
  the factsheet.
- **URL params** (`?view=`, `?district=`, `?compare=A,B`): the workspace,
  open district and comparison are bookmarkable/shareable and restored on
  hard navigation (verified: `?district=Jumla` and `?view=compare&
  compare=Ilam,Jumla` both restore exactly).
- **Factsheet Save/Copy/Share/Print** (light variant of ResultCardActions)
  under the "Compare this district" hook — the share text carries HQ,
  belt, known-for, crop/livestock tags and the deep-link URL.

### Validation performed (this release)
- `tsc --noEmit` clean after every phase; production build clean; all
  routes (incl. deep links + query-param URLs) 200; **zero console/page
  errors across a 13-route sweep** on the final bundle.
- Browser-verified: consent gating (before/accept/decline/persist), PWA
  update cycle end-to-end, offline load of /knowledge, chunk-failure →
  styled recovery screen, article deep load (single clean SEO tag set:
  title/description/og/canonical all article-specific), bad-slug fallback
  notice, palette "mastitis" → deep article navigation, tools deep link +
  save/history-across-reload, AgroMap search/chips/URL restore/factsheet
  actions, breadcrumb bars.
- VLM review: KB article (breadcrumb + complete layout), AgroMap (tabs +
  search box), tools result card (action buttons visible), mobile consent
  banner (no overlap with floating buttons) — all clean.
- Out-of-scope items honored from the plan: Consent Mode v2 legal calls,
  per-district path URLs, opportunistic rewrites, choropleth numeric
  layer (blocked on sourcing a real per-district numeric dataset — will
  NOT be invented).

---

## Release 6 — Real text-to-speech player, full accessibility suite, analytical agro-map, mobile hero & drawer redesign (Sept 2026)

### NEW: Read-aloud SPEECH PLAYER (replaces the one-shot "read this page" button)
- **`SpeechContext` engine** walks `<main>`, splits content into
  sentence-sized reading blocks (Devanagari danda + Latin stops) and speaks
  them in a chained queue — with a **live gold highlight + smart
  auto-scroll** on the exact block being read (respects reduce-motion).
- **Floating mini-player** (bottom-centre; lifts above the floating buttons
  on phones): play/pause · resume · stop · previous/next block · reading
  speed (0.75×–1.5×) · **voice picker** (Nepali → Hindi-for-Devanagari →
  English fallback, or the user's saved choice per language). Progress bar
  + "Section N of M" counter.
- Engine hardening: async `voiceschanged` loading, utterances kept
  referenced (Chrome GC bug), delayed `speak()` after `cancel()` (dropped
  utterance bug), sentence-sized chunks (Chrome long-utterance cutoff),
  emulated pause (native `pause()` is broken on Android/some Windows
  builds), guarded voice assignment, and speech auto-stops on route change.
- Persisted: reading speed + voice choice per language (localStorage).

### EXPANDED: accessibility suite — more features, design-safe
- **Text size: 4 steps** (100 / 112.5 / 125 / 140%).
- **Readable font** — self-hosted **Atkinson Hyperlegible** (Braille
  Institute, OFL; latin + latin-ext woff2, lazy unicode-range) swaps in for
  Latin text; Devanagari keeps Noto/Mukta.
- **Dyslexia-friendly spacing** — WCAG 1.4.12 letter/word/line spacing
  applied to reading content only (nav & controls untouched).
- **Reading guide** — translucent gold band tracking the cursor (fine
  pointers only, rAF-throttled, pointer-events none).
- **High contrast rewritten to preserve the design**: card-like surfaces
  regain a white hairline (no more melting into an undifferentiated black
  field), gray hairlines become white, headings pop in yellow,
  `color-scheme: dark` for native controls, chart bars keep tracks, the
  panel/player keep their navy + gold ring.
- Panel regrouped into **SEE / READ / MOTION** sections, focus-trapped,
  Esc + click-outside, **Alt+A opens it from anywhere**, footer hint shows
  the shortcut.

### FIXED: floating buttons never overlap again
- **Unified right-hand dock** (`FloatingDock`): scroll-to-top sits ABOVE the
  accessibility launcher in one column; the settings panel anchors above
  the whole dock. WhatsApp aligned to the same baseline (safe-area aware).
  Speech player bottom-centre, above the buttons on phones. Verified
  geometrically: 8 px clearance, zero overlaps at 390 px.

### REDESIGNED: mobile hero (phones only)
- Compact centred composition: gold-ringed portrait first (with 29+ badge),
  badge pill, name at 2.6rem, role, clamped description, **full-width
  stacked CTAs** (thumb reach), live clinic chip, centred socials; `100svh`
  so browser toolbars never crop the fold; smaller glow blobs; scroll
  indicator hidden on phones. Desktop (≥lg) layout untouched.

### REDESIGNED: mobile menu — a real slide-in drawer
- Portal-rendered right-side drawer (86vw, max 360px): backdrop blur,
  **transform-only glide** (no height animation → no stutter), header with
  avatar/name/close, search row, grouped links **with icons** (Pages +
  Resources), language toggle, **sticky booking CTA** with safe-area
  padding, internal scrolling, body lock, focus trap, Esc, focus return.

### UPGRADED: `/agromap` — from factsheet picker to analytical map
- **Three workspaces: Map & layers · Compare districts · Data explorer.**
- **Thematic layers** (per-district fills on the accurate MIT-licensed
  geometry): Provinces · **Ecological belts** (Terai 22 / Hills 40 /
  Mountains 15 — classified from each district's own verified belt text) ·
  **Crop spotlight** (20 crop tags, e.g. "Tea → 4 gold districts") ·
  **Livestock spotlight** (7 tags incl. yaks & Chyangra, rare local
  breeds) · **Climate pressure** (7 colour-coded tags: flood, heat,
  landslide, drought, drying springs, glacier retreat, hail & frost) with
  custom legends and match counters.
- **Compare workspace**: any two districts side by side (zone header, HQ,
  known-for, crop/livestock/climate tag chips, belt) + swap button;
  "Compare this district" button on every factsheet.
- **Data explorer**: all 77 districts searchable/sortable (name, province,
  HQ, zone, crop tags), zone filters, click-through to the map, and
  **one-click CSV export** of the full bilingual dataset (offline blob,
  no server).
- Factsheet panel upgraded: zone chip, tag chips under Crops/Livestock/
  Climate tabs, spotlights bilingual (Devanagari digit counters).
- Data provenance: the zone/tag classification is derived from the same
  verified MoALD SINA / DNPWC / DHM-ICIMOD profiles — noted in the
  sources block; CSV export labelled as a copy of the same dataset.

### FIXED: layout & polish
- **Horizontal overflow killed site-wide** (`overflow-x: clip` on html/body
  — below-fold entrance animations used to push the page 10–30px wider;
  `clip` keeps position:sticky working).
- Reduced-motion now also honoured by the scroll-to-top smooth scroll and
  the reading highlight's auto-scroll.

### Validation performed (this release)
- `tsc --noEmit` clean; production build clean (AgroMap 232.9 KB /
  Knowledge 256.6 KB / Tools 109.3 KB lazy chunks); all 12 routes 200;
  zero console/page errors on the final bundle (the only logged errors
  trace to a deliberately stubbed speech engine during testing).
- Browser-verified: dock geometry (no overlap at 390px); Alt+A; a11y
  classes + localStorage persistence after reload; Atkinson font applied
  (computed style); dyslexia spacing (3.02px letter / 4.03px word /
  1.8+ line-height); contrast body black + color-scheme dark; speech
  engine end-to-end with a stubbed synth (46 blocks collected, highlight
  moves H1→P, auto-advance chain, pause/resume, next/prev, stop clears
  highlight, player hidden with zero voices); drawer (portal, transform
  glide, focus trap, Esc, route-close, CTA reachable); hero metrics
  (portrait 128px at top, h1 centred, CTAs full-width); map layers
  (zone fills 22/40/15 exact; Tea → 4 gold + note; climate 7-colour
  distribution across 77; NP layer buttons + चिया ४); compare (Ilam vs
  Jumla cards, swap, factsheet hook); data explorer (77 rows, search,
  zone filters, CSV = 78 lines bilingual); desktop regressions (hero
  two-column intact, About dropdown items).
- VLM review: mobile hero 8/10, drawer 9/10, a11y panel 9/10 (after the
  overlap fix), high contrast 9/10, map layers 9/10 ×3, compare 9/10,
  desktop home 8/10 — no defects flagged.

### Independent verification pass (follow-up audit)
Every Release 6 claim was re-verified from a fresh build on a cold preview
server, with no reliance on the original test session:
- **Dock geometry re-measured**: scroll-to-top y 768–816 vs a11y launcher
  y 828–884 (12px gap, one column) at 1440px; at 390px the WhatsApp button
  (bottom-left, x 16–72) and the dock (bottom-right, x 318–374) share a
  baseline without intersecting; the speech player is bottom-centre. Zero
  overlaps anywhere.
- **Speech engine re-driven end-to-end** with a stubbed synth: 46 blocks
  collected, highlight verified on H1 then H2 "Institutions & Partners"
  as it advanced, pause→Resume label flip, next/prev, rate cycler persisted
  across sessions (1.25× after reload of the session), voice picker
  populated (Auto + English/Hindi/Nepali) and choice persisted to
  localStorage, stop tears down player + highlight, full-page completion
  (all 46 spoken) ends cleanly.
- **All 7 a11y toggles re-verified by computed style**: font scale 20px
  root, Atkinson Hyperlegible on body, color-scheme dark + gold headings,
  dyslexia 2.16px/2.88px/32.4px spacing, underline on links, reduce-motion
  class, reading-guide band present after mousemove; reset restores
  defaults.
- **AgroMap re-verified**: Tea spotlight = exactly 4 gold paths; zone
  filters return exactly 22/40/15 rows; CSV blob = 78 lines bilingual;
  row-click (Dolpa) switches to Map tab with the factsheet open; compare
  Ilam vs Jumla shows both zone-headed cards + tag chips; NP mode renders
  चिया ४ etc. across the UI.
- **Two refinements shipped from this audit**:
  1. Data-explorer search now also matches **crop & livestock tags** in
     both scripts ("tea" and "चिया" both return the 4 tea districts;
     previously only name/HQ/known-for were searched, so Tehrathum was
     missed despite the placeholder promising "signature crop" search).
  2. The read-aloud highlight was strengthened (gold tint 0.14 → 0.22,
     ring 0.45 → 0.55) so the block being spoken is unmistakable — VLM
     re-confirmed the heading is now visibly highlighted.
- 12-route sweep (incl. a 404 route) on the final bundle: **zero console
  or page errors**. VLM re-review of 8 fresh screenshots: all clean.

---

## Release 5 — Accessibility, 77 district factsheets, deeper knowledge base, 12 tools (Sept 2026)

### NEW: Site-wide accessibility system
- **Floating Accessibility panel** (bottom-right, bilingual EN/NP) with
  persisted settings (localStorage `a11y-settings`):
  - Text size — A / A+ / A++ (112.5% / 125% root scaling)
  - High-contrast mode — black/white/yellow override stylesheet
  - Reduce motion — CSS kill-switch **+ global `MotionConfig
    reducedMotion="always"`** (also auto-on when the OS requests
    `prefers-reduced-motion`)
  - Underline-links toggle for low-vision scanning
  - **Read aloud** — Web Speech API, language-aware (picks a Nepali voice,
    falls back to Hindi for Devanagari, then English)
- Baseline upgrades always on: **skip-to-content link** on every page
  (first focusable), visible `:focus-visible` ring, nav landmarks +
  `aria-label`, `aria-expanded/controls` on the mobile menu with a focus
  trap, Esc-to-close on menu/dropdowns/panel, `main` landmark.

### FIXED: navigation de-cluttered + mobile menu scroll
- Desktop bar reduced from 8 top-level items + controls to **5 items +
  2 dropdowns + search + language + CTA**: About / Experience /
  Publications now group under an "About ▾" dropdown; Tools / Knowledge /
  Nepal Map stay under "Resources ▾". The logo **never wraps** anymore
  (`truncate` + `whitespace-nowrap` + min-width guards).
- Mobile menu rebuilt: one smooth panel animation (per-item stagger that
  read as "stuttery" removed), **internally scrollable**
  (`max-h: calc(100dvh − 5rem)` + momentum scrolling + overscroll-contain),
  body scroll locked while open, Esc closes, focus returns to the hamburger.

### EXPANDED: `/agromap` — 77 district factsheets (not just provinces)
- **Every district now opens a full bilingual factsheet**: administrative HQ,
  ecological belt, signature identity ("known for"), crops, livestock,
  **ecology — flora, fauna, protected areas (DNPWC network, RAMSAR sites)**
  and **climate-crisis pressure with the local adaptation frontier**.
  District keys verified 77/77 against the map engine.
- View-mode toggle (By district / By province), district quick-select
  dropdown grouped by province, tabbed panel
  (Overview · Crops · Livestock · Ecology · Climate) for both granularities,
  ecological-belt legend, and highlighted-district glow on selection.
- Verified hooks include: Ilam tea, Sankhuwasabha cardamom, Jumla Marsi
  rice at 2,200 m+, Mustang apples, Gulmi coffee (≈160 ha / ≈35 t / ≈219
  kg/ha case study), Chitwan poultry capital, Makwanpur ginger, Sindhuli
  junar, Baitadi goats, Achhami — the world's smallest cattle breed — and
  the full park network from Shey Phoksundo to Shuklaphanta.

### EXPANDED: `/knowledge` — 32 articles, now with images, factsheets & charts
- **+12 researched bilingual articles** (20 → 32): dairy income economics,
  water for dairy animals, khasi finishing for Dashain, incubation &
  hatchery management, layer flock economics, off-season vegetables &
  plastic tunnels, coffee in the mid-hills, high-hill apples, soil health
  & composting, drying springs (ICIMOD), beekeeping basics, zoonoses &
  farm-family safety.
- **Every article now carries a hero image** (3 new AI-generated WebP images
  — goats, poultry, polytunnel — VLM-verified 8–9/10; rest mapped from the
  existing photo library), a **technical factsheet table** (4–6 key figures
  with sources), and — where data supports — an **animated bar chart**
  (14 articles: revaccination intervals, cereals production, water by
  animal, incubation periods, laying curve, tomato farm-gate vs retail,
  honey yield by hive system, dairy model).
- Article reader adds a **Print** button; cards show image thumbnails with a
  "Factsheet" badge.

### EXPANDED: `/tools` — 4 new calculators (now 12 tools, grouped rail)
- **Dairy income** — litres × price − feed − other costs → monthly/yearly
  margin, cost per litre, break-even price (farm-gate 55–70, retail 80–120
  NPR/L benchmarks).
- **Water requirement** — herd-level daily litres (4–4.5 L per kg milk;
  buffalo 80–120 L summer; Nepal-measured 112–131 L/adult/day), summer peak
  +20% and a 1.5-day storage target.
- **Incubation & hatch calendar** — set date + species (chicken 21 d, duck
  28 d, turkey 28 d, quail 17 d) → hatch, candling (day 7/14) and lockdown
  dates, with the 37.8 °C / humidity reference card.
- **Live animal market value** — live weight × editable local rate with a
  ±10% planning band (festival-season note).
- Tab rail regrouped into **Livestock · Farm & business · Health** with
  labelled sections.

### IMPROVED: meta thumbnail with the doctor's actual headshot
- `og-image.jpg` regenerated (1200×630, 84 KB) with **Dr. Shah's real
  headshot photo** in a gold-ringed frame, name in Playfair, credentials
  badges (M.Sc. / 29+ Years / Ex-Director DLFD) and the domain — all inside
  the 80% safe zone per OG best practice (VLM review: 9/10).

### Misc
- Site-search index: +4 tool entries, updated knowledge (32) and map
  (77-district) descriptions.
- README refreshed with the new feature set.

---

## Release 4 — Farmer knowledge platform (Sept 2026)

### NEW: `/knowledge` — Agriculture & Animal Husbandry Knowledge Base
- **20 researched bilingual (EN/NP) articles** across 8 categories — Animal
  Health, Cattle & Buffalo, Goat Farming, Poultry, Crop Production, Fodder &
  Feed, Climate Adaptation, Farm Management.
- Every schedule and statistic carries **inline source citations + collection
  date** (Merck Veterinary Manual, FAO, MoALD/SINA, DLS, NARC, USDA FAS,
  peer-reviewed papers incl. Poudel et al. 2020 Vaccines 8:322).
- UI/UX: live bilingual search (title + summary + body), category rail with
  counts, in-place article reader (no route change) with sections, bullet
  lists, “Dr. Shah's field tip” and caution callouts, next-article
  navigation, per-article sources. Data lives in `src/app/data/kb/*`.

### NEW: `/agromap` — interactive Nepal agriculture map
- Real interactive map of **all 77 districts / 7 provinces** via the MIT-
  licensed `nepal-district-map` engine (accurate boundaries incl.
  Limpiyadhura–Kalapani–Lipulekh; keyboard accessible; tooltips).
- Click any district or province chip → verified bilingual profile: capital,
  area, districts, ecological belts, signature crops, livestock, climate
  pressure, one standout stat. 7-colour muted palette replacing defaults.
- National verified-stats panel: agriculture ≈22% GDP, paddy 5.6 M t, maize
  3.0 M t, wheat 2.1 M t, buffalo 64% of milk, ≈1.6 B eggs, +0.056 °C/yr
  warming — each with its source; full sources block at page bottom.

### EXPANDED: `/tools` — 5 new verified calculators (now 8 tools)
- **Gestation calculator** — 10 species (Merck gestation table + buffalo 310 d
  from Nili-Ravi/Murrah research): breeding date → due date, progress bar,
  days remaining, dairy dry-off prep date. Localised dates in NP mode.
- **Nepal land unit converter** — Ropani-Aana-Paisa-Daam ↔ Bigha-Kattha-Dhur
  ↔ m²/ft² with government survey factors (1 Ropani = 508.72 m², 1 Bigha =
  6,772.63 m²) and compound breakdown cards (e.g. 2 Ropani = 3 Kattha 0.09
  Dhur).
- **Feed & dry-matter calculator** — cattle 2.0–2.5% / buffalo 2.5–3.0% of
  body weight (FAO 2.5 kg DM/100 kg LW standard), green-fodder equivalent,
  concentrate rule-of-thumb, water estimate.
- **Dosage calculator** — prescribed mg/kg → total mg → mL (vial strength) →
  tablets, with a “vet's prescription only” disclaimer; pure arithmetic, no
  drug recommendations.
- **Poultry feed & FCR calculator** — layer/broiler modes, 100–120 g/hen/day,
  FCR 1.5–1.8 (broiler) / 2.0–2.3 (layer), sack count, feed cost, eggs
  estimate (112 eggs/hen/yr Nepali commercial average).
- Tab rail redesigned for 8 tools (wrapped pills, role=tab, aria-selected).

### WhatsApp — username-based contact (privacy)
- `site.ts` gains `whatsappUsername`; `whatsappLink()` now emits
  **`wa.me/<username>`** (format verified from WhatsApp Help Center: “Your
  username creates a direct link (wa.me/YourUsername)”). Falls back to the
  number if no username set. UI shows the `@handle` on the Contact card,
  floating button label and footer. Phone number stays for `tel:` calls.

### 404 — rebuilt on a professional illustration asset
- The hand-drawn scene (user feedback: “looked made by a child”) is replaced
  by **unDraw's “Not found” illustration** (undraw.co — copyright-free, no
  attribution), recoloured to the brand palette by
  `scripts/prepare-404-illustration.mjs` (navy card, deep-navy figure, gold
  refresh badge). VLM design review: 9/10 “flawless, premium branding”.
- Two-column layout (message + search + CTA + quick links left, illustration
  right), stacked on mobile; bilingual; NN/g recovery structure kept.

### Hero typography — per-language display voice (user request)
- Devanagari hero name (डा. मोगल प्रसाद शाह) now renders in **Noto Serif
  Devanagari 700** (elegant serif; mirrors Playfair). English hero name
  **untouched** — Playfair Display 700. Verified via computed styles,
  `document.fonts` and pixel A/B against Mukta ground truth.

### Site-wide integration
- Navigation: **Resources dropdown** (desktop, hover + click, bilingual
  blurbs) and a Resources section in the mobile menu — Tools · Knowledge ·
  Nepal Agro-Map.
- Home: new dark **“Resources for Farmers & Livestock Keepers”** band
  linking the three resource pages. Footer quick links extended. Sitemap:
  `/knowledge` + `/agromap` added (priority 0.8).
- Global search (⌘K) index extended with all new calculators, knowledge-base
  guides and the map.
- **`tsconfig.json` added + full `tsc --noEmit` clean** (the repo shipped
  without one; the Vite build does not typecheck). A LandConverter runtime
  crash was caught and fixed during validation.

---

## Release 3 — True site functions + design corrections (Sept 2026)

### NEW: `/booking` — 4-step appointment wizard (a real site function)
- Dedicated booking route with a guided flow: **service → schedule → details →
  review**, animated stepper, per-step validation (bilingual error messages),
  and a review table with per-row edit jumps.
- **Draft auto-save** — answers persist to `localStorage`; a refresh or closed
  tab never loses the visitor's place (cleared on successful send).
- Confirm builds a structured bilingual request (name, phone, location, animal,
  service, visit type — clinic / on-farm / phone, date, time preference, notes)
  and opens **WhatsApp pre-filled** (mailto fallback when unconfigured).
- Nav CTA (desktop + mobile) and the Home hero primary button now open the
  wizard; the old booking tab inside Contact was replaced by a compact
  "open the booking wizard" promo card (one flow, one place).

### NEW: `/tools` — Farm Tools & Calculators (bookmarkable utilities)
- **Livestock weight estimator** — heart girth + body length sliders/inputs
  with cm/inch toggle for Cattle/Buffalo (Schaeffer's rule, ÷10,835) and
  Goat/Sheep (÷10,890). Live animated kg result (+ lbs), rough daily dry-matter
  reference (2.5–3% BW), and the working shown for transparency. Species
  divisors are tunable in `src/app/pages/Tools.tsx` (marked EDIT HERE).
- **Vaccination reminder generator** — pick a program (FMD 6 mo, HS 12 mo,
  Anthrax, PPR, deworming 3 mo, or custom interval) + last-dose date → shows
  the next three doses and **downloads a real .ics calendar file** with 6
  recurring reminders and a day-before alarm (Google/Apple/Outlook).
- Fully bilingual with Nepali digits in NP mode; everything runs client-side
  (no data leaves the browser); honest-use disclaimer included.

### NEW: Live "Open now / Closed now" status
- `siteConfig.hours` (Mon–Fri, 9:00–17:00 Nepal Time — editable in site.ts)
  powers a live status chip computed from **Nepal Standard Time (UTC+5:45)**,
  re-checked every 30 s, shown on the Home hero and the booking header.
  Visitors see the truth no matter their own timezone.

### 404 page — paw scene replaced by an elegant DNA double helix
- The procedural sphere-paw scene read as blobs; replaced with a **DNA double
  helix** (gold + steel strands, base-pair rungs, travelling light pulses,
  dust field, mouse parallax) — veterinary science as one clean object.
- New split layout: content left · helix right on desktop; helix band on top
  with a gradient fade on mobile. Ghost numerals localize to ४०४ in NP mode.
  Same lazy `vendor-three` chunk (never loaded on normal routes).

### Hero font corrected (per owner feedback)
- **English hero name returns to Playfair Display bold** — the site's
  signature display serif. **Mukta ExtraBold now applies to Devanagari only**
  (`.lang-np .hero-name`). Mukta 800 removed from the base font request
  (injected on NP switch instead).

---

## Release 2 — Experience upgrades (Sept 2026)

### 3D error page (replaces emoji parade) — *superseded in Release 3*
- ~~three.js paw scene~~ → replaced by the **DNA double-helix scene** in
  Release 3 after owner feedback (sphere paws read as blobs). See above.
- three.js lives in its own `vendor-three` chunk (**never downloaded on normal
  routes** — only when a visitor actually hits the 404 page).

### Corrected & localized numbers
- **Years of service corrected: 27+ → 29+** everywhere (hero badge, floating
  stat cards, achievements bar, About/Gallery/Publications copy, footer,
  translations, meta descriptions, JSON-LD, cv.html, README).
- **Achievement numbers now render in Nepali digits** when the language is
  switched — २९+, १००+, ५०,०००+, १३+ (Home achievements bar, About floating
  card). New helper: `src/app/i18n/format.ts` (`toNepaliDigits`).

### Typography & bilingual UX
- **Hero name (updated in Release 3):** English uses Playfair Display bold;
  Devanagari uses Mukta ExtraBold (`.lang-np .hero-name`).
- **Devanagari menu polish** — `.nav-link` typography in NP mode: Mukta 600,
  15 px, line-height 1.6 with extra pill padding so stacked matras (ि ी ै ौ)
  never clip inside the active-link pill.
- **Mobile menu gains Roman subtitles** — Devanagari labels show small English
  hints (गृह · Home) for bilingual wayfinding; mobile menu header localizes
  the name + tagline.
- **Language switcher "नेपाली" renders in Mukta** in both modes (`.font-deva`).

### Institutions & Partners section — redesigned
- Proper section heading (serif display + gold "Trusted Network" chip with paw
  icon) replaces the cramped uppercase strip that broke Devanagari.
- 2-col mobile → 3-col sm → 6-col lg grid of rounded cards, grayscale→color
  logo hover, lift animation, localized organization names in NP mode
  (नेपाल सरकार, विश्व बैंक, त्रिभुवन विश्वविद्यालय…).

### New veterinary features
- **Consultation booking form** *(superseded in Release 3 by the dedicated
  `/booking` wizard — the Contact tab was replaced by a promo card linking
  to the full 4-step flow)*.
- **NEW: Emergency guidance strip** on Contact — red banner routes urgent
  animal-health cases straight to the phone (bilingual).
- **NEW: FAQ accordion on Home** — the FAQ data (previously JSON-LD only,
  invisible to visitors) now renders as an accessible animated accordion
  (aria-expanded, keyboard-friendly), fully bilingual.
- Floating WhatsApp button no longer auto-reveals its label pill on small
  screens (hover-only pattern; prevents crowding form content on mobile).

### Branding
- **NEW favicon** — crisp vector golden paw print on navy rounded square
  (`favicon.svg`), re-rasterized `favicon.png` (64) + `apple-touch-icon.png`
  (180) via Playwright. Replaces the font-dependent "S" monogram.
- **Regenerated og-image.jpg** (1200×630) — paw mark, name, role and
  "29+ Years" badge on the navy/gold identity.

---

## P0 — Critical fixes

| # | Issue | Fix |
|---|-------|-----|
| 1 | `noindex, nofollow` in static HTML — site invisible to Google | Removed. Static `<meta name="robots">` dropped (default = indexable); robots is now managed per-page at runtime, `noindex` only on the 404 page |
| 2 | Contact form fires no request, shows no feedback | Rebuilt: async submit (Web3Forms/Formspree-ready), loading state, success panel, error panel with retry + direct-email fallback, mailto handoff feedback, honeypot spam trap, client-side email validation (bilingual messages) |
| 3 | Placeholder phone `+977 XXX-XXXX-XXX` + broken `tel:` links | Central config (`siteConfig.phone`); phone UI renders **only** when a real number is configured — LinkedIn card shown instead in the meantime |
| 4 | Meta description described a *pet clinic* (he is a livestock development expert) | Rewritten: livestock development, food security, DLFD directorship, 29+ years — in static HTML (crawler-visible without JS) |
| 5 | OG/share image was a random Unsplash stock photo | Branded 1200×630 `og-image.jpg` generated from Dr. Shah's portrait with navy/gold identity; referenced by OG + Twitter cards |
| 6 | Canonical `drmogalshah.com.np` vs served `www.` domain mismatch | All canonicals, sitemap.xml, robots.txt, JSON-LD, cv.html now use `https://www.drmogalshah.com.np` |

Also fixed: missing favicon links (svg + png + apple-touch-icon now wired),
duplicated/conflicting robots meta, 404 page had no title (now "Page Not Found"
+ `noindex`), sitemap referenced no `/experience` route, `package.json`
referenced a nonexistent `@radix-ui/react-label@1.2.3` version (broke fresh
installs), repository URL pointed at `YOUR_USERNAME`.

## P1 — Performance

| Metric | Before | After | Δ |
|--------|--------|-------|---|
| JS — initial load | 566 KB single file (171 KB gz) | 487 KB split (155 KB gz): app 66 + react 265 + motion 129 + misc 28 | −14%, cacheable vendor chunks |
| JS — other routes | included above | lazy chunks 7–22 KB each, fetched on demand | — |
| CSS | 115.5 KB (18.4 KB gz) | 60.6 KB (10.7 KB gz) | **−47%** |
| Hero portrait | 1,048 KB PNG | 71 KB WebP | **−93%** |
| All bundled images | 2,892 KB PNG | 150 KB WebP | **−95%** |
| External hotlinks | 9 Unsplash images (~1.5 MB, third-party dependency) | 0 — all self-hosted WebP (~1.0 MB, lazy-loaded below fold) | −100% |
| Font loading | 3 blocking CSS `@import` chains | 1 preconnected `<link>` with `display=swap` in `<head>` | non-blocking |
| Screenshot flash | white flash while 566 KB JS parsed | navy branded boot spinner inline in HTML | perceived speed |
| CLS on hero | unspecified image dimensions | explicit `width`/`height`, `fetchpriority="high"`, `decoding="async"` | layout-stable |

## Typography — bilingual font system overhaul

The site now runs a coherent serif-display + sans-body system in **both** languages:

| Role | English | Nepali |
|------|---------|--------|
| Display / headings | Playfair Display | **Noto Serif Devanagari** (new) |
| Body / UI text | Plus Jakarta Sans | **Mukta** (new) |

- **Why:** the old NP fonts (Khand + Noto Sans Devanagari) clashed with the
  elegant Playfair aesthetic — Khand is a condensed industrial sans that needed
  a `letter-spacing: 0.04em` hack, which visually breaks Devanagari conjunct
  rhythm (tracking separates matras from their base glyphs). Noto Serif
  Devanagari mirrors Playfair's high-contrast elegance; Mukta is a highly
  legible Devanagari sans whose Latin companion glyphs blend naturally with
  Plus Jakarta Sans.
- **On-demand loading:** Devanagari families are injected only when a visitor
  switches to NP mode (LanguageContext) — English visitors never download
  them. Only the weights actually used are fetched.
- **Letter-spacing hack removed:** all `tracking` on Devanagari neutralized
  (`letter-spacing: normal`); both families ship with correct sidebearings.
- **Devanagari line-height safety:** `.lang-np h1/h2` get 1.3 leading so
  stacked vowel signs (ै ौ ी) never clip at display sizes.
- **`.font-display` utility fixed:** the class previously had no effect on
  non-heading elements (nav logo rendered in the body font). It now maps to
  Playfair Display in EN and Noto Serif Devanagari in NP.
- Verified: clean-page render tests confirm the NP heading stack resolves to
  Noto Serif Devanagari (0% pixel deviation from the pure font), distinct
  from Mukta (33%); all routes re-tested with zero console errors.

Route-level code splitting via `React.lazy` + `Suspense`; vendor chunks via
`manualChunks` (react / motion / misc) so returning visitors re-download only
the tiny app chunk after deploys.

## P2 — New features & UX

- **NEW: Publications page** (`/publications`) — bilingual EN/NP page with
  verified academic foundation (M.Sc. thesis on Brachiaria hybrid forage,
  B.V.Sc.&A.H., Netherlands PG diploma) and a "Professional & Technical
  Contributions" list (research / policy / training / strategy entries).
  Nav item, footer link and sitemap entry included. Entries live in two
  clearly-marked arrays at the top of `src/app/pages/Publications.tsx` —
  extend them with Dr. Shah's full publication list anytime.
- **WhatsApp floating button** (bottom-left, ScrollToTop stays bottom-right) —
  official brand glyph, "online" dot, label pill that floats ABOVE the
  circle (never overlaps page text) and shows on hover/focus as well as the
  initial auto-reveal. Currently **visible with the demo number** — see the
  config note above.
- **WhatsApp everywhere** — quick-chat card on the Contact page (4-card grid:
  Phone / WhatsApp / Email / Location) and a WhatsApp row in the footer,
  each auto-hidden until a number is configured.
- **Central site config** — `src/app/config/site.ts`: contact details, socials,
  form endpoints, developer credit. Update once, entire site follows.
- **Partner logos load instantly** — 549 KB → 91 KB total, no more lazy-flash
  of empty logo slots on first scroll.
- **Mobile hero tightened** — CTAs ("Get in Touch" / "View Profile") now sit
  above the fold on 390 px phones (was pushed below by oversized portrait).
- **CV page polished** — proper `<title>`, meta description, favicon, noindex
  (it's a print artifact), www links; existing Save-as-PDF print bar retained.
- **404 page** — proper title + `noindex, follow` (search engines never index
  error pages); playful livestock parade kept.
- **Static JSON-LD** — Person + WebSite schema now in `index.html` (crawlers
  see it without executing JS); ProfessionalService + FAQ schemas render
  client-side where relevant. Duplicate Person schema removed.
- **Dependency diet** — 47 → 12 runtime deps (removed MUI, recharts, react-dnd,
  30 unused Radix packages, etc.); `npm install` is now fast and greenfield-safe.
- **Dead code removed** — 45 unused shadcn/ui component files deleted
  (only button/card/input/label/textarea/utils are used).

## Validation performed (latest release)

- Clean `npm install` + `vite build` — zero errors; every route ships as its own
  lazy chunk (Booking 21.6 kB, Tools 17.3 kB; `vendor-three` only loads on 404).
- Browser-verified on Chromium (1440×900 and 390×844), EN + NP:
  - All 8 routes + 404 + /cv.html return correct titles and content; zero
    console/page errors, zero broken images
  - Hero fonts verified by computed style: EN = Playfair Display 700,
    NP = Mukta 800; NP stats render २९+/१००+/५०,०००+/१३+
  - Booking wizard walked end-to-end: per-step validation (bilingual errors),
    date native-setter test, draft persisted across reload and cleared after
    send, confirm → WhatsApp tab opened with the full structured bilingual
    message (Devanagari digits in NP), success panel shown
  - Tools: weight math hand-verified (170²×140÷10,835 = 373 kg; goat defaults
    62/58 → 20 kg; inch toggle → lbs), vaccination schedule (FMD 6 mo from
    2026-08-15 → 2027-02-15…) and .ics download all verified
  - 404: WebGL canvas alive in both languages; VLM review scored the helix
    scene 9/10 "elegant and premium", no overlaps or cut-offs
  - Mobile: booking CTA above fold, menu shows Devanagari + roman subtitles,
    WhatsApp float clears content
- VLM visual review of hero (EN/NP), booking review step, tools, mobile menu —
  all clean

## Deploy notes

- **Vercel:** no configuration change needed (`vercel.json` SPA rewrite kept).
- After deploying: submit `https://www.drmogalshah.com.np/sitemap.xml` in
  **Google Search Console** (the audit found the site unindexed — this release
  removes the blocker, Search Console registration accelerates re-crawling).
- Optional next steps (not in this release): photo gallery with Dr. Shah's
  field photos, testimonials with verified attribution, blog/insights section.
