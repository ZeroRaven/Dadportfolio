import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen, Search, ChevronLeft, ChevronRight, Clock, Info,
  Stethoscope, Milk, Mountain, Bird, Wheat, Leaf, ThermometerSun, ClipboardList,
  Lightbulb, AlertTriangle, BookMarked, CalendarDays,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { Input } from "../components/ui/input";
import { kbArticles, kbCategories } from "../data/kb";
import type { KBArticle } from "../data/kb/types";
import { toNepaliDigits } from "../i18n/format";

/**
 * KNOWLEDGE BASE — a researched, bilingual agriculture & animal-husbandry
 * library for Nepali farmers, students and extension workers.
 *
 * UI/UX pattern:
 *   · Header band with live search (title + summary + section text, both langs)
 *   · Category rail (chips with icons) that filters instantly
 *   · Article cards with reading time + last-updated
 *   · In-place article reader (no route change): sections, bullets,
 *     field-tip / caution callouts, per-article source citations
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
};

const fmtN = (n: number, np: boolean) => (np ? toNepaliDigits(String(n)) : String(n));

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

export function Knowledge() {
  const { language } = useLanguage();
  const np = language === "np";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [selected, setSelected] = useState<KBArticle | null>(null);

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

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: kbArticles.length };
    for (const a of kbArticles) m[a.categoryId] = (m[a.categoryId] ?? 0) + 1;
    return m;
  }, []);

  const closeArticle = () => setSelected(null);

  return (
    <>
      <SEO
        title="Agriculture & Animal Husbandry Knowledge Base"
        description="A researched, bilingual knowledge base for Nepali farmers and livestock keepers — vaccination schedules, dairy buffalo feeding, goat breeds of Nepal, Ranikhet control, paddy-maize-wheat crop seasons, fodder and silage making, climate change adaptation, and farm records. Every figure sourced from MoALD, DLS, NARC, FAO and the Merck Veterinary Manual."
        keywords="Nepal agriculture knowledge base, livestock farming guide Nepal, vaccination schedule FMD HS PPR, dairy buffalo feeding, goat farming Nepal Khari Boer, Ranikhet Newcastle vaccine, paddy rice seasons Nepal, fodder trees silage hay, climate change agriculture Nepal, farm record keeping, कृषि ज्ञान भण्डार, पशुपालन जानकारी, बाख्रा पालन, धान मकै गहुँ, चारा सिलेज, जलवायु परिवर्तन कृषि"
        path="/knowledge"
      />

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* ── Header band ─────────────────────────────────────────────── */}
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

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-7 max-w-xl relative"
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

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* ── Article reader (in-place) ─────────────────────────────── */}
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.article
                key={selected.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="-mt-6 bg-white rounded-2xl shadow-xl border-0 overflow-hidden"
              >
                {/* Reader header */}
                <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white px-6 sm:px-10 py-8">
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
                </div>

                {/* Reader body */}
                <div className="px-6 sm:px-10 py-8 sm:py-10">
                  {selected.sections.map((s, i) => (
                    <section key={i} className={i === 0 ? "" : "mt-8"}>
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

                  {/* Next article */}
                  {(() => {
                    const idx = kbArticles.findIndex((a) => a.id === selected.id);
                    const next = kbArticles[(idx + 1) % kbArticles.length];
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(next);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="mt-8 w-full text-left rounded-xl border-2 border-gray-100 hover:border-[#D4AF37]/50 bg-gray-50 hover:bg-[#D4AF37]/[0.05] px-5 py-4 transition-colors group"
                      >
                        <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                          {np ? "अर्को लेख" : "Next article"}
                        </span>
                        <span className="flex items-center justify-between gap-3 mt-1">
                          <span className="font-semibold text-[#0A2540] group-hover:text-[#B8941F] transition-colors">
                            {np ? next.title.np : next.title.en}
                          </span>
                          <ChevronRight size={18} className="text-[#B8941F] flex-shrink-0" />
                        </span>
                      </button>
                    );
                  })()}
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
                {/* ── Category rail ─────────────────────────────────── */}
                <div className="-mt-6 bg-white rounded-2xl shadow-xl p-4 sm:p-5 mb-8">
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
                </div>

                {/* ── Result count / empty state ────────────────────── */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <p className="text-sm text-gray-500">
                    {filtered.length === kbArticles.length
                      ? np
                        ? `${fmtN(filtered.length, np)} लेख — सबै वर्ग`
                        : `${filtered.length} articles — all categories`
                      : np
                        ? `${fmtN(filtered.length, np)} लेख भेटियो`
                        : `${filtered.length} ${filtered.length === 1 ? "article" : "articles"} found`}
                  </p>
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

                {filtered.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
                    <Search className="mx-auto text-gray-300 mb-3" size={32} />
                    <p className="text-gray-600 font-medium">
                      {np ? "कुनै लेख भेटिएन — अर्को शब्दले प्रयास गर्नुहोस्।" : "No articles matched — try another word."}
                    </p>
                  </div>
                ) : (
                  /* ── Article card grid ──────────────────────────────── */
                  <div className="grid sm:grid-cols-2 gap-5">
                    {filtered.map((a, i) => {
                      const Icon = CATEGORY_ICONS[a.categoryId] ?? BookOpen;
                      const cat = kbCategories.find((c) => c.id === a.categoryId);
                      return (
                        <motion.button
                          key={a.id}
                          type="button"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.3 }}
                          onClick={() => {
                            setSelected(a);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="text-left bg-white rounded-2xl shadow-md hover:shadow-xl border border-transparent hover:border-[#D4AF37]/40 transition-all p-6 flex flex-col group"
                        >
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#B8941F]">
                              <Icon size={13} />
                              {np ? cat?.title.np : cat?.title.en}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                              <Clock size={11} />
                              {fmtN(a.readMinutes, np)} {np ? "मिनेट" : "min"}
                            </span>
                          </div>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-[#0A2540] leading-snug group-hover:text-[#B8941F] transition-colors mb-2">
                            {np ? a.title.np : a.title.en}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed flex-1">
                            {np ? a.summary.np : a.summary.en}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A2540] group-hover:gap-2.5 transition-all">
                            {np ? "पढ्नुहोस्" : "Read article"}
                            <ChevronRight size={15} className="text-[#B8941F]" />
                          </span>
                        </motion.button>
                      );
                    })}
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
