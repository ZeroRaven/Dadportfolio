import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  CalendarDays, Sprout, Wheat, HeartPulse, Fish, Store, Archive,
  ChevronRight, Info, ChevronDown, BookOpen, MapPin,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { BreadcrumbSchema } from "../components/BreadcrumbSchema";
import { FARM_CALENDAR, CAL_SOURCES, BELTS, type CalEntry, type CalKind } from "../data/farmCalendar";
import { toNepaliDigits } from "../i18n/format";

/**
 * NEPAL FARMING CALENDAR — the crop & livestock year, belt by belt.
 *
 * A unique companion to the AgroMap: the map answers "where", the calendar
 * answers "when". Twelve months × three ecological belts, each entry tied
 * to the science in the knowledge base. The current month is highlighted
 * automatically so a farmer landing on the page sees "this month" first.
 */

const KIND_ICON: Record<CalKind, typeof Sprout> = {
  sow: Sprout,
  harvest: Wheat,
  livestock: HeartPulse,
  fish: Fish,
  market: Store,
  storage: Archive,
};

const KIND_COLOR: Record<CalKind, string> = {
  sow: "bg-emerald-100 text-emerald-700",
  harvest: "bg-[#D4AF37]/15 text-[#8A6D1F]",
  livestock: "bg-rose-100 text-rose-700",
  fish: "bg-sky-100 text-sky-700",
  market: "bg-violet-100 text-violet-700",
  storage: "bg-gray-200/70 text-gray-600",
};

const fmtN = (n: number, np: boolean) => (np ? toNepaliDigits(String(n)) : String(n));

function EntryRow({ e, np }: { e: CalEntry; np: boolean }) {
  const Icon = KIND_ICON[e.kind];
  const navigate = useNavigate();
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white px-3.5 py-3"
    >
      <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${KIND_COLOR[e.kind]}`}>
        <Icon size={15} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] text-gray-700 leading-relaxed">{np ? e.text.np : e.text.en}</p>
        {e.article && (
          <button
            type="button"
            onClick={() => navigate(`/knowledge/${e.article}`)}
            className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#B8941F] hover:text-[#0A2540] transition-colors"
          >
            <BookOpen size={11} aria-hidden="true" />
            {np ? "सम्बन्धित लेख पढ्नुहोस्" : "read the article"}
            <ChevronRight size={11} aria-hidden="true" />
          </button>
        )}
      </div>
    </motion.li>
  );
}

export function FarmCalendar() {
  const { language } = useLanguage();
  const np = language === "np";
  const navigate = useNavigate();
  const currentMonth = new Date().getMonth() + 1;

  const [belt, setBelt] = useState<"terai" | "midhills" | "highhills">("midhills");
  const [month, setMonth] = useState<number>(currentMonth);

  const monthDef = useMemo(
    () => FARM_CALENDAR.find((m) => m.greg === month) ?? FARM_CALENDAR[0],
    [month]
  );
  const entries = monthDef[belt];
  const grouped = useMemo(() => {
    const kinds: CalKind[] = ["sow", "harvest", "livestock", "fish", "market", "storage"];
    return kinds
      .map((k) => ({ kind: k, items: entries.filter((e) => e.kind === k) }))
      .filter((g) => g.items.length > 0);
  }, [entries]);

  const beltDef = BELTS.find((b) => b.id === belt)!;
  const isCurrent = (m: number) => m === currentMonth;

  return (
    <>
      <SEO
        title="Nepal Farming Calendar — Crops & Livestock Month by Month"
        description="An interactive farming calendar for Nepal — what to sow, harvest, vaccinate and manage each month in the Terai, mid-hills and high hills: rice transplanting at Asar 15, wheat sowing in Mangsir, hill maize in Baisakh, FMD and HS vaccination rounds before monsoon and winter, Dashain khasi finishing, fodder planting with the rains, and fish-pond cycles."
        keywords="Nepal farming calendar, crop calendar Nepal, rice transplanting Asar 15, wheat sowing Mangsir, maize sowing Nepal, vaccination schedule Nepal FMD, khasi fattening Dashain, fodder planting monsoon, fish farming calendar, नेपाली कृषि पात्रो, बाली पात्रो, खोप पात्रो, चारा रोपाइँ, धान रोपाइँ"
        path="/calendar"
      />
      <BreadcrumbSchema
        items={[
          { name: np ? "गृहपृष्ठ" : "Home", url: "/" },
          { name: np ? "कृषि पात्रो" : "Farming Calendar", url: "/calendar" },
        ]}
      />

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* ── Header band (compact, like the map) ───────────────────────── */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white pt-24 sm:pt-28 pb-8 sm:pb-10 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full mb-3 sm:mb-4 border border-[#D4AF37]/30"
            >
              <CalendarDays className="text-[#D4AF37]" size={14} />
              <span className="text-xs sm:text-sm font-medium">
                {np ? "१२ महिना · ३ भेग · बाली + पशुपालन" : "12 months · 3 belts · crops + livestock"}
              </span>
            </motion.div>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
              {np ? "नेपाली कृषि पात्रो" : "Nepal Farming Calendar"}
            </h1>
            <p className="hidden sm:block text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              {np
                ? "नक्साले 'कहाँ' भन्छ, पात्रोले 'कहिले' — भेग छान्नुहोस्, महिना खोल्नुहोस्, र त्यो महिना खेत र गोठमा के गर्ने, स्रोतसहित देख्नुहोस्।"
                : "The map answers where; the calendar answers when — pick your belt, open a month, and see what the field and the shed need, with sources."}
            </p>
            <p className="sm:hidden text-gray-300 text-sm leading-snug">
              {np ? "भेग छान्नुहोस् · महिना खोल्नुहोस् · काम देख्नुहोस्" : "Pick a belt · open a month · see the work"}
            </p>

            {/* Belt selector */}
            <div className="mt-4 sm:mt-6 max-w-full overflow-x-auto">
              <div className="inline-flex rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-1" role="tablist" aria-label={np ? "भेग छान्नुहोस्" : "Ecological belt"}>
                {BELTS.map((b) => {
                  const active = belt === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setBelt(b.id)}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                        active ? "bg-[#D4AF37] text-[#0A2540] shadow" : "text-gray-200 hover:text-white"
                      }`}
                    >
                      <MapPin size={14} aria-hidden="true" />
                      {np ? b.np : b.en}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="mt-2.5 text-xs text-gray-400 hidden sm:block">
              {np ? beltDef.blurb.np : beltDef.blurb.en}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6">
          {/* ── Month strip ─────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-5 mb-5">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0A2540]">
                {np ? "महिना छान्नुहोस्" : "Pick a month"}
              </p>
              {!isCurrent(month) && (
                <button
                  type="button"
                  onClick={() => setMonth(currentMonth)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#B8941F] hover:text-[#0A2540] transition-colors"
                >
                  <ChevronDown size={13} className="rotate-180" aria-hidden="true" />
                  {np ? "यो महिनामा फर्कनुहोस्" : "Back to this month"}
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2" role="tablist" aria-label={np ? "महिना" : "Month"}>
              {FARM_CALENDAR.map((m) => {
                const active = month === m.greg;
                const now = isCurrent(m.greg);
                return (
                  <button
                    key={m.greg}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setMonth(m.greg)}
                    className={`relative rounded-xl border-2 px-2 py-2.5 text-center transition-all ${
                      active
                        ? "border-[#0A2540] bg-[#0A2540] text-white shadow-md"
                        : now
                          ? "border-[#D4AF37]/70 bg-[#D4AF37]/10 text-[#0A2540]"
                          : "border-gray-200 bg-white text-gray-600 hover:border-[#D4AF37]/60 hover:text-[#0A2540]"
                    }`}
                  >
                    {now && (
                      <span
                        className={`absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full ${active ? "bg-[#D4AF37]" : "bg-[#D4AF37]"}`}
                        title={np ? "यो महिना" : "Current month"}
                        aria-label={np ? "यो महिना" : "Current month"}
                      />
                    )}
                    <span className="block text-[13px] font-bold leading-tight">
                      {np ? m.np : m.en.slice(0, 3)}
                    </span>
                    <span className={`block text-[10px] mt-0.5 font-medium ${active ? "text-gray-300" : "text-gray-400"}`}>
                      {m.bs}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Month detail ────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${belt}-${month}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6"
            >
              {/* Month header */}
              <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                    {np ? beltDef.np : beltDef.en}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight mt-1">
                    {np ? `${monthDef.np} · ${monthDef.bs}` : `${monthDef.en} · ${monthDef.bs}`}
                  </h2>
                </div>
                {isCurrent(month) && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-1.5 text-xs font-bold text-[#D4AF37]">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    {np ? "यो महिना" : "This month"}
                  </span>
                )}
              </div>

              {/* Entries grouped by kind */}
              <div className="p-5 sm:p-6">
                {grouped.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-6">
                    {np ? "यो महिना यस भेगका लागि छुट्टै काम तोकिएको छैन।" : "No belt-specific entries this month."}
                  </p>
                ) : (
                  <div className="space-y-5">
                    {grouped.map((g) => {
                      const Icon = KIND_ICON[g.kind];
                      return (
                        <section key={g.kind} aria-label={np ? g.kind : g.kind}>
                          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A2540]/70 mb-2.5">
                            <Icon size={13} aria-hidden="true" />
                            {g.kind === "sow" ? (np ? "रोपाइँ / बीउ" : "Sow & plant")
                              : g.kind === "harvest" ? (np ? "कटाई" : "Harvest")
                              : g.kind === "livestock" ? (np ? "पशुपालन" : "Livestock")
                              : g.kind === "fish" ? (np ? "माछा पोखरी" : "Fish pond")
                              : g.kind === "market" ? (np ? "बजार / चाडपर्व" : "Market & festival")
                              : (np ? "भण्डारण" : "Store & preserve")}
                          </p>
                          <ul className="grid sm:grid-cols-2 gap-2.5">
                            {g.items.map((e, i) => (
                              <EntryRow key={i} e={e} np={np} />
                            ))}
                          </ul>
                        </section>
                      );
                    })}
                  </div>
                )}

                {/* Tools cross-link */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => navigate("/tools/vaccine")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#0A2540]/[0.04] border border-[#0A2540]/15 text-[#0A2540] rounded-full px-3 py-1.5 hover:border-[#D4AF37]/60 transition-colors"
                  >
                    <CalendarDays size={12} aria-hidden="true" />
                    {np ? "खोप सम्झना बनाउनुहोस्" : "Build vaccine reminders"}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/agromap")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#0A2540]/[0.04] border border-[#0A2540]/15 text-[#0A2540] rounded-full px-3 py-1.5 hover:border-[#D4AF37]/60 transition-colors"
                  >
                    <MapPin size={12} aria-hidden="true" />
                    {np ? "जिल्ला नक्सा खोल्नुहोस्" : "Open the district map"}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/tools/climate")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#0A2540]/[0.04] border border-[#0A2540]/15 text-[#0A2540] rounded-full px-3 py-1.5 hover:border-[#D4AF37]/60 transition-colors"
                  >
                    <Wheat size={12} aria-hidden="true" />
                    {np ? "जिल्लाको हावापानी हेर्नुहोस्" : "Check district climate"}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Sources (collapsed) ─────────────────────────────────────── */}
          <div className="rounded-xl bg-[#0A2540]/[0.04] border border-[#0A2540]/10 px-5 py-3">
            <details className="group">
              <summary className="flex items-center gap-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <Info size={16} className="text-[#B8941F] flex-shrink-0" />
                <span className="text-xs font-bold text-[#0A2540]">
                  {np ? "स्रोत र तथ्याङ्क टिप्पणी" : "Sources & data notes"}
                </span>
                <ChevronRight size={14} className="text-gray-400 transition-transform group-open:rotate-90 ml-auto" aria-hidden="true" />
              </summary>
              <p className="text-xs text-gray-600 leading-relaxed mt-3 pl-7">
                {np
                  ? "बाली सन्झ्याल नेपाली कृषि पात्रो र extension अभ्यास (धान रोपाइँ असार १५ केन्द्रित, कटाई अक्टो-नोभे; वसन्त मकै फागुन-चैत तराई; पहाडी मकै बैशाख-जेठ; गहुँ मंसिर-पुष, ११०–१३० दिने चक्र); पशुपालन DLS को दुई-चरण खोप अभियान (मनसुनअघि र जाडोअघि; FMD/HS/PPR ३ महिनादेखि); खसी बोसाउने साउन-भदौ सुरु; मनसुनसँगै चारा रोपाइ; मौसमी रोग-चक्र (चिसो तलामा कक्सिडियोसिस, चिसो-गोठमा निमोनिया)। पूरा स्रोत सम्बन्धित ज्ञान भण्डारका लेखहरूमा।"
                  : CAL_SOURCES}
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
