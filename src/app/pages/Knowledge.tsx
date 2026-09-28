import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen, Search, ChevronLeft, ChevronRight, Clock, Info,
  Stethoscope, Milk, Mountain, Bird, Wheat, Leaf, ThermometerSun, ClipboardList,
  Lightbulb, AlertTriangle, BookMarked, CalendarDays, BarChart3, Printer,
  ListTree, Share2, Copy, Check, ArrowRight, MessageCircle, Fish,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { ArticleSchema } from "../components/ArticleSchema";
import { Input } from "../components/ui/input";
import { kbArticles, kbCategories, kbArticleCount } from "../data/kb";
import type { KBArticle } from "../data/kb/types";
import { toNepaliDigits } from "../i18n/format";
import { siteConfig } from "../config/site";

/**
 * KNOWLEDGE BASE — a researched, bilingual agriculture & animal-husbandry
 * library for Nepali farmers, students and extension workers.
 *
 * UI/UX pattern (r10 redesign):
 *   · Header band with live search (title + summary + section text, both langs)
 *     and a stats line (articles · categories · sourced figures)
 *   · Sort control — Newest updated / A–Z / Shortest read
 *   · Unfiltered browse = category sections (icon + blurb + count), each
 *     with its own compact card grid; filtered browse = one flat grid
 *   · Compact horizontal cards (image thumb left, clamped text right) —
 *     ~3× denser than the old tall cards, scannable on mobile
 *   · In-place article reader (URL-driven, deep-linkable): section TOC,
 *     reading-progress bar, share/copy/print, related articles + prev/next
 *
 * Content lives in src/app/data/kb/* — every schedule and statistic is
 * sourced (Merck Vet Manual, FAO, MoALD/DLS/NARC, peer-reviewed papers) and
 * marked with the collection date so it can be re-verified on schedule.
 */

const CATEGORY_ICONS: Record<string, typeof Stethoscope> = {
  "animal-health": Stethoscope,
  "cattle-buffalo": Milk,
  "goat-farming": Mountain,
  poultry: Bird,
  crops: Wheat,
  fodder: Leaf,
  climate: ThermometerSun,
  "farm-management": ClipboardList,
  "other-livestock": Fish,
};

type SortId = "newest" | "az" | "short";

const SORTS: { id: SortId; en: string; np: string }[] = [
  { id: "newest", en: "Newest", np: "नयाँ" },
  { id: "az", en: "A–Z", np: "अ–ज" },
  { id: "short", en: "Shortest", np: "छोटो" },
];

const QUICK_TOPICS = [
  { q: "vaccine", np: "खोप" }, { q: "silage", np: "सिलेज" },
  { q: "goat", np: "बाख्रा" }, { q: "mastitis", np: "थन" },
  { q: "compost", np: "कम्पोस्ट" }, { q: "heat", np: "यात्रा" },
];

const fmtN = (n: number, np: boolean) => (np ? toNepaliDigits(String(n)) : String(n));

const fmtVal = (v: number, np: boolean) =>
  np ? toNepaliDigits(String(v)) : String(v);

/** Horizontal labelled bars — a lightweight chart with no dependency. */
function KBChartBars({
  title, unit, data, source, np,
}: {
  title: string;
  unit?: string;
  data: { label: string; value: number }[];
  source: string;
  np: boolean;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <figure className="mt-8 rounded-xl border border-gray-100 bg-gray-50/70 p-5">
      <figcaption className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#B8941F] mb-4">
        <BarChart3 size={14} />
        {title}
        {unit && <span className="font-medium normal-case tracking-normal text-gray-400">({unit})</span>}
      </figcaption>
      <div className="space-y-3">
        {data.map((d, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
              <span>{d.label}</span>
              <span className="font-bold text-[#0A2540]">{fmtVal(d.value, np)}</span>
            </div>
            <div className="h-3 rounded-full bg-gray-200/70 overflow-hidden" role="img" aria-label={`${d.label}: ${d.value}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(d.value / max) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                className="kb-chart-bar h-full rounded-full bg-gradient-to-r from-[#0A2540] to-[#4C7FB5]"
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-gray-400 leading-snug">{source}</p>
    </figure>
  );
}

function npDatestamp(s: string, np: boolean): string {
  if (!np) {
    return new Date(`${s}-01`).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }
  const months: Record<string, string> = {
    "01": "जनवरी", "02": "फेब्रुअरी", "03": "मार्च", "04": "अप्रिल", "05": "मे", "06": "जुन",
    "07": "जुलाई", "08": "अगस्ट", "09": "सेप्टेम्बर", "10": "अक्टोबर", "11": "नोभेम्बर", "12": "डिसेम्बर",
  };
  const [y, m] = s.split("-");
  return `${months[m] ?? m} ${toNepaliDigits(y)}`;
}

/** Compact horizontal article card — image thumb left, clamped text right. */
function ArticleCard({
  a, np, onOpen, index,
}: { a: KBArticle; np: boolean; onOpen: (a: KBArticle) => void; index: number }) {
  const Icon = CATEGORY_ICONS[a.categoryId] ?? BookOpen;
  const cat = kbCategories.find((c) => c.id === a.categoryId);
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.25), duration: 0.25 }}
      onClick={() => onOpen(a)}
      className="text-left bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-[#D4AF37]/40 transition-all overflow-hidden flex group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-1"
    >
      {a.image ? (
        <span className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-100 overflow-hidden" aria-hidden="true">
          <img
            src={a.image}
            alt=""
            loading="lazy"
            width={1200}
            height={500}
            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          <span className="absolute bottom-1.5 left-1.5 w-6 h-6 rounded-lg bg-[#0A2540]/85 flex items-center justify-center">
            <Icon size={12} className="text-[#D4AF37]" />
          </span>
        </span>
      ) : (
        <span className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-[#0A2540] flex items-center justify-center" aria-hidden="true">
          <Icon size={28} className="text-[#D4AF37]" />
        </span>
      )}
      <span className="min-w-0 flex-1 p-4 flex flex-col">
        <span className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#B8941F] truncate">
            {np ? cat?.title.np : cat?.title.en}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 flex-shrink-0">
            <Clock size={10} />
            {fmtN(a.readMinutes, np)}
          </span>
        </span>
        <span className="font-display text-[15px] sm:text-base font-bold text-[#0A2540] leading-snug line-clamp-2 group-hover:text-[#B8941F] transition-colors">
          {np ? a.title.np : a.title.en}
        </span>
        <span className="mt-1 text-xs sm:text-[13px] text-gray-600 leading-relaxed line-clamp-2">
          {np ? a.summary.np : a.summary.en}
        </span>
        <span className="mt-auto pt-2 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
            <CalendarDays size={10} />
            {npDatestamp(a.updated, np)}
            {a.facts && a.facts.length > 0 && (
              <span className="ml-1.5 inline-flex items-center gap-0.5 text-[#B8941F] font-bold">
                <ClipboardList size={10} />
                {np ? "तथ्यपत्र" : "Factsheet"}
              </span>
            )}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A2540] group-hover:gap-2 transition-all">
            {np ? "पढ्नुहोस्" : "Read"}
            <ChevronRight size={13} className="text-[#B8941F]" />
          </span>
        </span>
      </span>
    </motion.button>
  );
}

export function Knowledge() {
  const { language } = useLanguage();
  const np = language === "np";
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortId>("newest");
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  /* Reader text size — persisted so the next visit remembers. Applied via
     CSS zoom on the reader body so typography, spacing and lists all scale
     together without touching the page chrome (nav, chips, related cards). */
  const ZOOM_STEPS = [0.92, 1, 1.12, 1.25] as const;
  const [readerZoom, setReaderZoom] = useState<number>(() => {
    try {
      const v = parseFloat(localStorage.getItem("kb-reader-zoom") || "1");
      return ZOOM_STEPS.find((z) => z === v) ?? 1;
    } catch {
      return 1;
    }
  });
  const bumpZoom = (dir: 1 | -1) => {
    setReaderZoom((z) => {
      const i = ZOOM_STEPS.findIndex((s) => s === z);
      const next = ZOOM_STEPS[Math.min(Math.max(i + dir, 0), ZOOM_STEPS.length - 1)] ?? 1;
      try { localStorage.setItem("kb-reader-zoom", String(next)); } catch { /* ignore */ }
      return next;
    });
  };

  // Article selection lives in the URL (/knowledge/:slug) so every one of
  // the articles is deep-linkable, bookmarkable and individually indexed.
  const selected = useMemo(
    () => (slug ? kbArticles.find((a) => a.id === slug) ?? null : null),
    [slug]
  );
  // A slug that matches no article (bad/old link) falls back to the grid —
  // with a notice instead of a silently blank reader.
  const slugMissed = !!slug && !selected;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return kbArticles.filter((a) => {
      if (category !== "all" && a.categoryId !== category) return false;
      if (!q) return true;
      const haystack = [
        a.title.en, a.title.np, a.summary.en, a.summary.np,
        ...a.sections.flatMap((s) => [s.heading.en, s.heading.np, s.body.en, s.body.np]),
      ].join(" ").toLowerCase();
      return q.split(/\s+/).every((w) => haystack.includes(w));
    });
  }, [query, category]);

  const sorter = (arr: KBArticle[]): KBArticle[] => {
    const c = [...arr];
    if (sort === "newest") c.sort((a, b) => (a.updated < b.updated ? 1 : a.updated > b.updated ? -1 : a.id.localeCompare(b.id)));
    else if (sort === "az") c.sort((a, b) => (np ? a.title.np.localeCompare(b.title.np) : a.title.en.localeCompare(b.title.en)));
    else c.sort((a, b) => a.readMinutes - b.readMinutes);
    return c;
  };

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: kbArticles.length };
    for (const a of kbArticles) m[a.categoryId] = (m[a.categoryId] ?? 0) + 1;
    return m;
  }, []);

  /* Unfiltered & unsearched → grouped category sections (hub pattern). */
  const grouped = !query.trim() && category === "all";
  const flatList = useMemo(() => sorter(filtered), [filtered, sort, np]); // eslint-disable-line react-hooks/exhaustive-deps

  const openArticle = (article: KBArticle) => {
    setProgress(0);
    navigate(`/knowledge/${article.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const closeArticle = () => {
    setProgress(0);
    navigate("/knowledge");
  };

  /* Reading-progress bar — tracks the reader card through the viewport.
     Respects the reduce-motion switch (no animated width). */
  useEffect(() => {
    if (!selected) return;
    const smooth = !document.documentElement.classList.contains("a11y-reduce-motion");
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.4;
      const done = Math.min(Math.max(-r.top + window.innerHeight * 0.3, 0), Math.max(total, 1));
      setProgress(Math.round((done / Math.max(total, 1)) * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      void smooth;
    };
  }, [selected]);

  /* Related articles — same category, excluding the open one. */
  const related = useMemo(
    () =>
      selected
        ? kbArticles.filter((a) => a.categoryId === selected.categoryId && a.id !== selected.id).slice(0, 3)
        : [],
    [selected]
  );

  const articleUrl = selected ? `${siteConfig.url}/knowledge/${selected.id}` : "";

  const shareText = selected
    ? `${np ? selected.title.np : selected.title.en} — ${articleUrl}`
    : "";

  const copyLink = async () => {
    if (!articleUrl) return;
    try {
      await navigator.clipboard.writeText(articleUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = articleUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const scrollToSection = (i: number) => {
    const smooth = !document.documentElement.classList.contains("a11y-reduce-motion");
    document.getElementById(`kb-sec-${i}`)?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "start",
    });
  };

  return (
    <>
      <SEO
        title="Agriculture & Animal Husbandry Knowledge Base"
        description="A researched, bilingual knowledge base for Nepali farmers and livestock keepers — vaccination schedules, dairy buffalo feeding, goat breeds of Nepal, Ranikhet control, paddy-maize-wheat crop seasons, fodder and silage making, climate change adaptation, manure compost and biogas, heat detection and AI, farm records, hidden mastitis and the CMT test, colostrum and calf care, urea-treated straw, Azolla fodder, goat pneumonia, poultry coccidiosis, grain storage and aflatoxin, pig farming and carp polyculture. Every figure sourced from MoALD, DLS, NARC, FAO and the Merck Veterinary Manual."
        keywords="Nepal agriculture knowledge base, livestock farming guide Nepal, vaccination schedule FMD HS PPR, dairy buffalo feeding, goat farming Nepal Khari Boer, Ranikhet Newcastle vaccine, paddy rice seasons Nepal, fodder trees silage hay, climate change agriculture Nepal, manure compost biogas Nepal, heat detection cattle buffalo AI, farm record keeping, subclinical mastitis CMT test, colostrum calf care, urea treated rice straw, azolla fodder, goat pneumonia Mannheimia, poultry coccidiosis, maize storage aflatoxin, pig farming Nepal, carp polyculture fish pond, कृषि ज्ञान भण्डार, पशुपालन जानकारी, बाख्रा पालन, धान मकै गहुँ, चारा सिलेज, गोबर कम्पोस्ट बायोग्यास, यात्रा मिलन, जलवायु परिवर्तन कृषि, थनरोग CMT, खीर बछडा, एजोला, सुँगुर पालन, माछा पालन"
        path="/knowledge"
      />
      {/* Per-article SEO overrides the page-level tags above (helmet
          last-wins) and mirrors the reader exactly. */}
      {selected && (
        <>
          <SEO
            title={np ? selected.title.np : selected.title.en}
            description={(np ? selected.summary.np : selected.summary.en).slice(0, 155)}
            path={`/knowledge/${selected.id}`}
            type="article"
          />
          <BreadcrumbSchema
            items={[
              { name: np ? "गृहपृष्ठ" : "Home", url: "/" },
              { name: np ? "ज्ञान भण्डार" : "Knowledge Base", url: "/knowledge" },
              { name: np ? selected.title.np : selected.title.en, url: `/knowledge/${selected.id}` },
            ]}
          />
          {/* datePublished == dateModified: the KB data model tracks a single
              "updated" month (YYYY-MM) — padded to NPT midnight rather than
              inventing day-level precision. */}
          <ArticleSchema
            headline={np ? selected.title.np : selected.title.en}
            description={np ? selected.summary.np : selected.summary.en}
            datePublished={`${selected.updated}-01T00:00:00+05:45`}
            dateModified={`${selected.updated}-01T00:00:00+05:45`}
            image={selected.image ?? siteConfig.ogImage}
          />
        </>
      )}

      {/* Reading progress — only while an article is open */}
      {selected && (
        <div
          className="fixed top-0 left-0 right-0 z-[55] h-[3px] bg-transparent pointer-events-none"
          role="progressbar"
          aria-label={np ? "पढाइ प्रगति" : "Reading progress"}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* ── Header band — HUB ONLY. An open article replaces it entirely:
            deep-linked readers land straight on the article (its own dark
            header carries the breadcrumb, back-link and title), instead of
            scrolling past a large hub hero on every article. ─────────── */}
        {!selected && (
        <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white pt-28 pb-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-[#D4AF37]/30"
            >
              <BookOpen className="text-[#D4AF37]" size={16} />
              <span className="text-sm font-medium">
                {np ? "किसान, विद्यार्थी र विस्तारकर्ताका लागि" : "For farmers, students & extension workers"}
              </span>
            </motion.div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {np ? "कृषि तथा पशुपालन ज्ञान भण्डार" : "Agriculture & Animal Husbandry Knowledge Base"}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              {np
                ? "प्रमाणित स्रोतबाट तयार पारिएको द्विभाषी ज्ञान भण्डार — खोप तालिका, दुग्ध आहार, बाख्रा-कुखुरा पालन, बाली मौसुम, चारा व्यवस्थापन, जलवायु अनुकूलन र फार्म अभिलेख। हरेक तथ्याङ्क स्रोतसहित जाँचिएको छ।"
                : "A bilingual library built from verified sources — vaccination calendars, dairy feeding, goat and poultry systems, crop seasons by belt, fodder management, climate adaptation and farm records. Every figure is cited and dated."}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-300">
              {[
                np ? `${fmtN(kbArticleCount, np)} लेख` : `${kbArticleCount} articles`,
                np ? `${fmtN(kbCategories.length, np)} वर्ग` : `${kbCategories.length} categories`,
                np ? "हरेक तथ्याङ्क स्रोतसहित" : "every figure sourced",
              ].map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  <Check size={12} className="text-[#D4AF37]" aria-hidden="true" />
                  {s}
                </span>
              ))}
            </div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 max-w-xl relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
              <Input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (selected) closeArticle();
                }}
                placeholder={np ? "लेख खोज्नुहोस्… (जस्तै: खोप, सिलेज, बाख्रा)" : "Search articles… (e.g. vaccine, silage, goat)"}
                aria-label={np ? "ज्ञान भण्डार खोज्नुहोस्" : "Search the knowledge base"}
                className="pl-11 pr-4 py-3 text-base bg-white/95 border-0 rounded-xl shadow-lg placeholder:text-gray-400 focus:bg-white"
              />
            </motion.div>
          </div>
        </div>
        )}

        <div className={`max-w-5xl mx-auto px-4 sm:px-6 ${selected ? "pt-24 sm:pt-28" : ""}`}>
          {/* Bad/old slug notice — grid is shown below instead */}
          {slugMissed && (
            <div className="-mt-6 mb-6 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-5 py-3.5 flex items-center gap-3">
              <Info size={16} className="text-[#B8941F] flex-shrink-0" />
              <p className="text-sm text-[#0A2540]">
                {np
                  ? "त्यो लेख फेला परेन — तल सबै लेख देखाइएको छ।"
                  : "That article could not be found — showing all articles below."}
              </p>
            </div>
          )}

          {/* ── Article reader (in-place, URL-driven) ─────────────────── */}
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.article
                key={selected.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                ref={articleRef}
                className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden scroll-mt-24"
              >
                {/* Reader header */}
                <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white px-6 sm:px-10 py-8">
                  {/* Visible trail — mirrors the BreadcrumbList schema above */}
                  <nav
                    aria-label={np ? "ब्रेडक्रम्ब" : "Breadcrumb"}
                    className="mb-3"
                  >
                    <ol className="flex items-center gap-1.5 text-xs text-gray-300 flex-wrap">
                      <li>
                        <a href="/" className="hover:text-white transition-colors">
                          {np ? "गृहपृष्ठ" : "Home"}
                        </a>
                      </li>
                      <li aria-hidden="true"><ChevronRight size={12} /></li>
                      <li>
                        <a href="/knowledge" className="hover:text-white transition-colors">
                          {np ? "ज्ञान भण्डार" : "Knowledge Base"}
                        </a>
                      </li>
                      <li aria-hidden="true"><ChevronRight size={12} /></li>
                      <li aria-current="page" className="font-medium text-[#D4AF37] truncate max-w-[16rem]">
                        {np ? selected.title.np : selected.title.en}
                      </li>
                    </ol>
                  </nav>
                  <button
                    type="button"
                    onClick={closeArticle}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4AF37] hover:text-white transition-colors mb-4"
                  >
                    <ChevronLeft size={16} />
                    {np ? "सबै लेखमा फर्कनुहोस्" : "Back to all articles"}
                  </button>
                  <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                    <span className="inline-flex items-center gap-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full px-3 py-1 font-semibold">
                      {(() => {
                        const Icon = CATEGORY_ICONS[selected.categoryId] ?? BookOpen;
                        return <Icon size={12} className="text-[#D4AF37]" />;
                      })()}
                      {np
                        ? kbCategories.find((c) => c.id === selected.categoryId)?.title.np
                        : kbCategories.find((c) => c.id === selected.categoryId)?.title.en}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-gray-300">
                      <Clock size={12} />
                      {fmtN(selected.readMinutes, np)} {np ? "मिनेट पढाइ" : "min read"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-gray-300">
                      <CalendarDays size={12} />
                      {np ? "अद्यावधिक" : "Updated"} {npDatestamp(selected.updated, np)}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                    {np ? selected.title.np : selected.title.en}
                  </h2>
                  <p className="mt-3 text-gray-300 leading-relaxed max-w-3xl">
                    {np ? selected.summary.np : selected.summary.en}
                  </p>

                  {/* Reader actions: share · copy · print */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#25D366]/15 border border-[#25D366]/40 text-[#9BE3B0] rounded-full px-3 py-1.5 hover:bg-[#25D366]/25 transition-colors"
                    >
                      <MessageCircle size={12} />
                      {np ? "व्हाट्सएपमा पठाउनुहोस्" : "Share on WhatsApp"}
                    </a>
                    <button
                      type="button"
                      onClick={copyLink}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-gray-200 hover:text-white hover:border-[#D4AF37]/60 transition-colors"
                    >
                      {copied ? <Check size={12} className="text-[#D4AF37]" /> : <Copy size={12} />}
                      {copied ? (np ? "लिङ्क कपी भयो" : "Link copied") : np ? "लिङ्क कपी" : "Copy link"}
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-gray-200 hover:text-white hover:border-[#D4AF37]/60 transition-colors"
                    >
                      <Printer size={12} />
                      {np ? "प्रिन्ट गर्नुहोस्" : "Print article"}
                    </button>

                    {/* Reader text size — scales the article body only */}
                    <div
                      className="inline-flex items-center rounded-full border border-white/20 bg-white/10 overflow-hidden print:hidden"
                      role="group"
                      aria-label={np ? "पढाइको अक्षर आकार" : "Article text size"}
                    >
                      <button
                        type="button"
                        onClick={() => bumpZoom(-1)}
                        disabled={readerZoom === ZOOM_STEPS[0]}
                        aria-label={np ? "अक्षर सानो" : "Smaller text"}
                        className="px-2.5 py-1.5 text-xs font-bold text-gray-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        A−
                      </button>
                      <span className="px-1 text-[10px] font-semibold text-gray-300 select-none" aria-hidden="true">
                        {readerZoom === 1 ? (np ? "सामान्य" : "normal") : `${Math.round(readerZoom * 100)}%`}
                      </span>
                      <button
                        type="button"
                        onClick={() => bumpZoom(1)}
                        disabled={readerZoom === ZOOM_STEPS[ZOOM_STEPS.length - 1]}
                        aria-label={np ? "अक्षर ठूलो" : "Larger text"}
                        className="px-2.5 py-1.5 text-xs font-bold text-gray-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        A+
                      </button>
                    </div>
                  </div>

                  {/* Section TOC — long articles only (≥ 4 sections) */}
                  {selected.sections.length >= 4 && (
                    <div className="mt-5 pt-4 border-t border-white/15">
                      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] mb-2">
                        <ListTree size={12} />
                        {np ? "यो लेखमा" : "In this article"}
                      </p>
                      <ol className="flex flex-wrap gap-1.5">
                        {selected.sections.map((s, i) => (
                          <li key={i}>
                            <button
                              type="button"
                              onClick={() => scrollToSection(i)}
                              className="text-[11px] sm:text-xs font-medium text-gray-200 bg-white/10 hover:bg-[#D4AF37]/20 hover:text-white border border-white/15 rounded-full px-2.5 py-1 transition-colors text-left"
                            >
                              {fmtN(i + 1, np)}. {np ? s.heading.np : s.heading.en}
                            </button>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                {/* Hero image */}
                {selected.image && (
                  <div className="relative h-44 sm:h-64 bg-gray-100">
                    <img
                      src={selected.image}
                      alt={np ? selected.imageAlt?.np ?? selected.title.np : selected.imageAlt?.en ?? selected.title.en}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={1200}
                      height={500}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" aria-hidden="true" />
                  </div>
                )}

                {/* Reader body — zoom scales article typography only */}
                <div className="px-6 sm:px-10 py-8 sm:py-10" style={{ zoom: readerZoom }}>
                  {/* Factsheet — key technical figures */}
                  {selected.facts && selected.facts.length > 0 && (
                    <div className="mb-8 rounded-xl border border-[#0A2540]/10 bg-[#0A2540]/[0.02] overflow-hidden">
                      <p className="flex items-center gap-2 px-5 py-3 bg-[#0A2540] text-white text-xs font-bold uppercase tracking-[0.18em]">
                        <ClipboardList size={14} className="text-[#D4AF37]" />
                        {np ? "मुख्य तथ्य — तथ्यपत्र" : "Key facts — factsheet"}
                      </p>
                      <dl className="divide-y divide-gray-100">
                        {selected.facts.map((f, i) => (
                          <div key={i} className="grid grid-cols-1 sm:grid-cols-[minmax(9rem,2fr)_3fr] gap-1 sm:gap-4 px-5 py-3">
                            <dt className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                              {np ? f.label.np : f.label.en}
                            </dt>
                            <dd>
                              <span className="font-display font-bold text-[#0A2540] text-[15px]">
                                {np ? f.value.np : f.value.en}
                              </span>
                              {f.note && (
                                <span className="block text-xs text-gray-500 mt-0.5 leading-snug">
                                  {np ? f.note.np : f.note.en}
                                </span>
                              )}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  {/* Data chart */}
                  {selected.chart && (
                    <KBChartBars
                      title={np ? selected.chart.title.np : selected.chart.title.en}
                      unit={selected.chart.unit ? np ? selected.chart.unit.np : selected.chart.unit.en : undefined}
                      data={selected.chart.data.map((d) => ({
                        label: np ? d.label.np : d.label.en,
                        value: d.value,
                      }))}
                      source={selected.chart.source}
                      np={np}
                    />
                  )}

                  {selected.sections.map((s, i) => (
                    <section key={i} id={`kb-sec-${i}`} className={i === 0 ? "scroll-mt-24" : "mt-8 scroll-mt-24"}>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A2540] mb-3">
                        {np ? s.heading.np : s.heading.en}
                      </h3>
                      <p className="text-gray-700 leading-[1.85] text-[15px] sm:text-base">
                        {np ? s.body.np : s.body.en}
                      </p>
                      {s.bullets && (
                        <ul className="mt-4 space-y-2.5">
                          {s.bullets.map((b, j) => (
                            <li key={j} className="flex gap-3 text-gray-700 text-[15px] leading-relaxed">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                              <span>{np ? b.np : b.en}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}

                  {/* Field tip */}
                  {selected.tip && (
                    <div className="mt-8 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-5 py-4">
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#B8941F] mb-2">
                        <Lightbulb size={14} />
                        {np ? "डा. शाहको फिल्ड सुझाव" : "Dr. Shah's field tip"}
                      </p>
                      <p className="text-[#0A2540] leading-relaxed text-[15px]">
                        {np ? selected.tip.np : selected.tip.en}
                      </p>
                    </div>
                  )}

                  {/* Caution */}
                  {selected.caution && (
                    <div className="mt-4 rounded-xl bg-red-50 border border-red-100 px-5 py-4">
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-red-700 mb-2">
                        <AlertTriangle size={14} />
                        {np ? "सावधानी" : "Caution"}
                      </p>
                      <p className="text-red-900/90 leading-relaxed text-[15px]">
                        {np ? selected.caution.np : selected.caution.en}
                      </p>
                    </div>
                  )}

                  {/* Sources */}
                  <div className="mt-8 pt-5 border-t border-gray-100">
                    <p className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
                      <BookMarked size={13} className="mt-0.5 flex-shrink-0 text-[#B8941F]" />
                      <span>
                        <strong className="text-gray-700">{np ? "स्रोत: " : "Sources: "}</strong>
                        {selected.sources}
                      </span>
                    </p>
                  </div>

                  {/* Prev / next pair */}
                  {(() => {
                    const idx = kbArticles.findIndex((a) => a.id === selected.id);
                    const prev = idx > 0 ? kbArticles[idx - 1] : null;
                    const next = idx < kbArticles.length - 1 ? kbArticles[idx + 1] : null;
                    const NavBtn = ({ a, isNext }: { a: KBArticle | null; isNext: boolean }) =>
                      !a ? (
                        <span className="flex-1" aria-hidden="true" />
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            openArticle(a);
                          }}
                          className={`flex-1 min-w-0 rounded-xl border-2 border-gray-100 hover:border-[#D4AF37]/50 bg-gray-50 hover:bg-[#D4AF37]/[0.05] px-4 py-3.5 transition-colors group ${isNext ? "text-right" : "text-left"}`}
                        >
                          <span className={`text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold flex items-center gap-1 ${isNext ? "justify-end" : ""}`}>
                            {!isNext && <ChevronLeft size={11} />}
                            {isNext ? (np ? "अर्को लेख" : "Next article") : np ? "अघिल्लो लेख" : "Previous article"}
                            {isNext && <ChevronRight size={11} />}
                          </span>
                          <span className="block mt-1 font-semibold text-sm text-[#0A2540] group-hover:text-[#B8941F] transition-colors line-clamp-1">
                            {np ? a.title.np : a.title.en}
                          </span>
                        </button>
                      );
                    return (
                      <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <NavBtn a={prev} isNext={false} />
                        <NavBtn a={next} isNext={true} />
                      </div>
                    );
                  })()}

                  {/* Related articles — same category */}
                  {related.length > 0 && (
                    <div className="mt-10">
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B8941F] mb-3">
                        <Share2 size={13} />
                        {np ? "यही वर्गका अरू लेख" : "More in this category"}
                      </p>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {related.map((a) => (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => openArticle(a)}
                            className="text-left rounded-xl border-2 border-gray-100 hover:border-[#D4AF37]/50 bg-white px-4 py-3.5 transition-colors group"
                          >
                            <span className="block text-sm font-semibold text-[#0A2540] group-hover:text-[#B8941F] transition-colors line-clamp-2 leading-snug">
                              {np ? a.title.np : a.title.en}
                            </span>
                            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#B8941F]">
                              {np ? "पढ्नुहोस्" : "Read"}
                              <ArrowRight size={11} />
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* ── Category rail + sort ─────────────────────────── */}
                <div className="-mt-6 sticky top-[76px] z-40 bg-white/95 backdrop-blur rounded-2xl shadow-xl p-4 sm:p-5 mb-6 space-y-3.5">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setCategory("all")}
                      aria-pressed={category === "all"}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                        category === "all"
                          ? "bg-[#0A2540] text-white border-[#0A2540] shadow-md"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/60 hover:text-[#0A2540]"
                      }`}
                    >
                      <BookOpen size={14} className={category === "all" ? "text-[#D4AF37]" : "text-gray-400"} />
                      {np ? "सबै" : "All"}
                      <span className="text-[11px] font-normal opacity-70">{fmtN(counts.all ?? 0, np)}</span>
                    </button>
                    {kbCategories.map((c) => {
                      const Icon = CATEGORY_ICONS[c.id] ?? BookOpen;
                      const active = category === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCategory(active ? "all" : c.id)}
                          aria-pressed={active}
                          title={np ? c.blurb.np : c.blurb.en}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                            active
                              ? "bg-[#0A2540] text-white border-[#0A2540] shadow-md"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/60 hover:text-[#0A2540]"
                          }`}
                        >
                          <Icon size={14} className={active ? "text-[#D4AF37]" : "text-gray-400"} />
                          {np ? c.title.np : c.title.en}
                          <span className="text-[11px] font-normal opacity-70">{fmtN(counts[c.id] ?? 0, np)}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Sort */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5" role="group" aria-label={np ? "क्रमबद्ध गर्नुहोस्" : "Sort articles"}>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mr-1">
                        {np ? "क्रम:" : "Sort:"}
                      </span>
                      {SORTS.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          aria-pressed={sort === s.id}
                          onClick={() => setSort(s.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            sort === s.id
                              ? "bg-[#D4AF37]/20 text-[#0A2540] border border-[#D4AF37]/50"
                              : "text-gray-500 hover:text-[#0A2540] border border-transparent"
                          }`}
                        >
                          {np ? s.np : s.en}
                        </button>
                      ))}
                    </div>
                    {(query || category !== "all") && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          setCategory("all");
                        }}
                        className="text-xs font-semibold text-[#B8941F] hover:text-[#0A2540] transition-colors"
                      >
                        {np ? "फिल्टर हटाउनुहोस्" : "Clear filters"}
                      </button>
                    )}
                  </div>
                </div>

                {/* ── Result count (live) ─────────────────────────── */}
                <p className="mb-4 px-1 text-sm text-gray-500" aria-live="polite">
                  {filtered.length === kbArticles.length
                    ? np
                      ? `${fmtN(filtered.length, np)} लेख — सबै वर्ग`
                      : `${filtered.length} articles — all categories`
                    : np
                      ? `${fmtN(filtered.length, np)} लेख भेटियो`
                      : `${filtered.length} ${filtered.length === 1 ? "article" : "articles"} found`}
                </p>

                {filtered.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
                    <Search className="mx-auto text-gray-300 mb-3" size={32} />
                    <p className="text-gray-600 font-medium mb-4">
                      {np ? "कुनै लेख भेटिएन — अर्को शब्दले प्रयास गर्नुहोस्।" : "No articles matched — try another word."}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {QUICK_TOPICS.map((t) => (
                        <button
                          key={t.q}
                          type="button"
                          onClick={() => setQuery(t.q)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold border-2 border-gray-200 text-gray-600 hover:border-[#D4AF37]/60 hover:text-[#0A2540] transition-all"
                        >
                          {np ? t.np : t.q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : grouped ? (
                  /* ── Category sections (unfiltered browse) ─────── */
                  <div className="space-y-9">
                    {kbCategories.map((c) => {
                      const items = sorter(kbArticles.filter((a) => a.categoryId === c.id));
                      if (!items.length) return null;
                      const Icon = CATEGORY_ICONS[c.id] ?? BookOpen;
                      return (
                        <section key={c.id} aria-labelledby={`kb-cat-${c.id}`}>
                          <div className="flex items-start gap-3 mb-4">
                            <span className="w-10 h-10 rounded-xl bg-[#0A2540] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                              <Icon size={18} aria-hidden="true" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <h2 id={`kb-cat-${c.id}`} className="font-display text-lg sm:text-xl font-bold text-[#0A2540] leading-tight flex items-baseline gap-2 flex-wrap">
                                {np ? c.title.np : c.title.en}
                                <span className="text-xs font-semibold text-gray-400 font-sans">
                                  {fmtN(items.length, np)}
                                </span>
                              </h2>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {np ? c.blurb.np : c.blurb.en}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setCategory(c.id)}
                              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#B8941F] hover:text-[#0A2540] transition-colors flex-shrink-0 mt-1"
                            >
                              {np ? "यो वर्ग मात्र" : "Only this"}
                              <ChevronRight size={12} />
                            </button>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3.5">
                            {items.map((a, i) => (
                              <ArticleCard key={a.id} a={a} np={np} onOpen={openArticle} index={i} />
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                ) : (
                  /* ── Flat filtered grid ─────────────────────────── */
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    {flatList.map((a, i) => (
                      <ArticleCard key={a.id} a={a} np={np} onOpen={openArticle} index={i} />
                    ))}
                  </div>
                )}

                {/* Verification footer */}
                <div className="mt-10 rounded-xl bg-[#0A2540]/[0.04] border border-[#0A2540]/10 px-5 py-4 flex items-start gap-3">
                  <Info size={16} className="mt-0.5 text-[#B8941F] flex-shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {np
                      ? "यो ज्ञान भण्डारका तालिका र तथ्याङ्क प्रकाशित स्रोत (MoALD, DLS, NARC, FAO, Merck Veterinary Manual र समीक्षित अनुसन्धान) बाट सङ्कलन गरिएका छन् र हरेक लेखमा स्रोत र मिति उल्लेख छ। यो सामान्य मार्गदर्शन हो — तपाईंको विशेष अवस्थाका लागि स्थानीय पशु चिकित्सक वा कृषि अधिकृतसँग पक्का गर्नुहोस्।"
                      : "Schedules and statistics in this library are collected from published sources (MoALD, DLS, NARC, FAO, Merck Veterinary Manual and peer-reviewed research) and each article carries its citations and date. This is general guidance — confirm specifics for your situation with your local veterinarian or agriculture officer."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
