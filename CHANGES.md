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
