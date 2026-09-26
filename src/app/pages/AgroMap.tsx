import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NepalMap } from "nepal-district-map";
import type { Province } from "nepal-district-map";
import {
  Map as MapIcon, MousePointerClick, Info, Landmark, Users, Layers,
  Wheat, HeartPulse, CloudSun, Sparkles, ChevronRight, X,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { PROVINCES, NATIONAL_STATS, provinceById } from "../data/nepalAgro";
import { toNepaliDigits } from "../i18n/format";

/**
 * NEPAL AGRO-MAP — an interactive map of all 77 districts / 7 provinces,
 * each region opening a verified agricultural & climate profile.
 *
 * · Map engine: `nepal-district-map` (MIT) — accurate district boundaries
 *   including Limpiyadhura–Kalapani–Lipulekh in Darchula, built-in
 *   accessibility (keyboard nav, aria labels) and tooltips.
 * · Palette: seven muted, well-separated fills replace the package defaults
 *   so the map sits inside the site's navy/gold design system.
 * · Data: province profiles in src/app/data/nepalAgro.ts — production
 *   figures from MoALD/SINA, USDA, peer-reviewed papers; climate lines from
 *   DHM/ICIMOD warming analyses (sources listed at page bottom).
 */

const PROVINCE_COLORS: Record<Province, { fill: string; stroke: string }> = {
  Koshi:        { fill: "#4C7FB5", stroke: "#3A648E" },
  Madhesh:      { fill: "#E3A72F", stroke: "#B58521" },
  Bagmati:      { fill: "#43A06B", stroke: "#348055" },
  Gandaki:      { fill: "#8A67A8", stroke: "#6E5188" },
  Lumbini:      { fill: "#C86B5A", stroke: "#A45345" },
  Karnali:      { fill: "#9A7B4F", stroke: "#7C623C" },
  Sudurpashchim:{ fill: "#2FA5A0", stroke: "#24827E" },
};

export function AgroMap() {
  const { language } = useLanguage();
  const np = language === "np";
  const [selected, setSelected] = useState<Province | null>(null);

  const districtData = useMemo(() => {
    // Bilingual tooltip content per district, keyed by district name.
    const out: Record<string, { tooltip: string }> = {};
    for (const p of PROVINCES) {
      for (const d of p.districtList) {
        out[d] = { tooltip: np ? p.npName : p.id };
      }
    }
    return out;
  }, [np]);

  const profile = selected ? provinceById(selected) : null;

  const fmtN = (n: number) => (np ? toNepaliDigits(String(n)) : String(n));

  return (
    <>
      <SEO
        title="Nepal Agriculture Map — Crops, Livestock & Climate by Province"
        description="An interactive map of Nepal's 7 provinces and 77 districts with verified agricultural profiles — what each region grows and raises, its ecological belts, and how climate change is pressing its farms. National figures from MoALD, USDA, DHM and peer-reviewed research."
        keywords="Nepal agriculture map, interactive map Nepal provinces, crops by province Nepal, Koshi Madhesh Bagmati Gandaki Lumbini Karnali Sudurpashchim agriculture, climate change Nepal regions, Nepal paddy wheat maize production, नेपाल कृषि नक्सा, प्रदेश कृषि, जलवायु परिवर्तन नक्सा"
        path="/agromap"
      />

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* ── Header band ─────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white pt-28 pb-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-[#D4AF37]/30"
            >
              <MapIcon className="text-[#D4AF37]" size={16} />
              <span className="text-sm font-medium">
                {np ? "७७ जिल्ला · ७ प्रदेश · प्रमाणित तथ्याङ्क" : "77 districts · 7 provinces · verified data"}
              </span>
            </motion.div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {np ? "नेपाल कृषि नक्सा" : "Nepal Agriculture Map"}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              {np
                ? "नक्सामा जिल्ला वा प्रदेश छुनुहोस् — हरेक क्षेत्रको बाली, पशुपालन, भूगोल र जलवायु परिवर्तनको असर एकै ठाउँमा। तथ्याङ्क MoALD, USDA, DHM र प्रकाशित अनुसन्धानबाट।"
                : "Touch a district or province on the map — each region's crops, livestock, ecology and climate-change pressure opens beside it. Figures sourced from MoALD, USDA, DHM and published research."}
            </p>
          </div>
        </div>

        {/* ── Map + panel ──────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Map card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-4 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3 mb-3 px-1">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#0A2540]">
                  <MousePointerClick size={15} className="text-[#B8941F]" />
                  {np ? "जिल्ला छुनुहोस् वा प्रदेश छान्नुहोस्" : "Click a district or pick a province"}
                </p>
                {selected && (
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#0A2540] transition-colors"
                  >
                    <X size={13} />
                    {np ? "रिसेट" : "Reset"}
                  </button>
                )}
              </div>

              <NepalMap
                data={districtData}
                colorMode="province"
                provinceColors={PROVINCE_COLORS}
                selectedProvince={selected}
                dimOpacity={0.25}
                hoverColor="#0A2540"
                strokeColor="#FFFFFF"
                strokeWidth={0.7}
                backgroundColor="transparent"
                maxHeight="620px"
                ariaLabel={np ? "नेपालको अन्तरक्रियात्मक कृषि नक्सा" : "Interactive agriculture map of Nepal"}
                renderTooltip={(name, data) => (
                  <div>
                    <strong>{name}</strong>
                    <p style={{ color: "#B8941F", margin: 0, fontSize: 12 }}>
                      {(data as { tooltip?: string })?.tooltip ?? ""}
                    </p>
                    <p style={{ color: "#64748b", margin: 0, fontSize: 11 }}>
                      {np ? "क्लिक गरेर प्रदेश विवरण हेर्नुहोस्" : "click for province profile"}
                    </p>
                  </div>
                )}
                onDistrictClick={(name) => {
                  // Province is inferred from the district clicked.
                  const p = PROVINCES.find((x) => x.districtList.includes(name));
                  if (p) setSelected((prev) => (prev === p.id ? null : p.id));
                }}
              />

              {/* Province chips */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                {PROVINCES.map((p) => {
                  const active = selected === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelected((prev) => (prev === p.id ? null : p.id))}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                        active
                          ? "border-[#0A2540] bg-[#0A2540] text-white shadow-md"
                          : "border-gray-200 bg-white text-gray-600 hover:border-[#D4AF37]/60 hover:text-[#0A2540]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: PROVINCE_COLORS[p.id].fill }}
                      />
                      {np ? p.npName : p.id}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="lg:col-span-2"
            >
              <div className="lg:sticky lg:top-24">
                <AnimatePresence mode="wait">
                  {profile ? (
                    <motion.div
                      key={profile.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.22 }}
                      className="rounded-2xl shadow-xl overflow-hidden bg-white"
                    >
                      {/* Panel header */}
                      <div
                        className="px-6 py-5 text-white"
                        style={{
                          background: `linear-gradient(135deg, ${PROVINCE_COLORS[profile.id].fill}, ${PROVINCE_COLORS[profile.id].stroke})`,
                        }}
                      >
                        <p className="text-[11px] uppercase tracking-[0.25em] font-semibold opacity-80">
                          {np ? "प्रदेश प्रोफाइल" : "Province profile"}
                        </p>
                        <h2 className="font-display text-2xl font-bold leading-tight mt-1">
                          {np ? profile.npName : profile.id} {np ? "प्रदेश" : "Province"}
                        </h2>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs opacity-90">
                          <span className="inline-flex items-center gap-1.5">
                            <Landmark size={12} />
                            {np ? profile.capital.np : profile.capital.en}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Layers size={12} />
                            {fmtN(profile.districts)} {np ? "जिल्ला" : "districts"}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Users size={12} />
                            {profile.population}
                          </span>
                        </div>
                      </div>

                      {/* Panel body */}
                      <div className="px-6 py-5 max-h-[52vh] lg:max-h-[560px] overflow-y-auto">
                        <div className="text-sm text-gray-600 leading-relaxed mb-5 flex items-start gap-2">
                          <MapIcon size={15} className="mt-0.5 text-[#B8941F] flex-shrink-0" />
                          <span>{np ? profile.belts.np : profile.belts.en}</span>
                        </div>

                        <div className="rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-4 py-2.5 mb-5">
                          <p className="flex items-center gap-2 text-sm font-semibold text-[#0A2540]">
                            <Sparkles size={14} className="text-[#B8941F]" />
                            {np ? profile.stat.np : profile.stat.en}
                          </p>
                        </div>

                        <section className="mb-5">
                          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0A2540]/60 mb-2.5">
                            <Wheat size={13} className="text-[#B8941F]" />
                            {np ? "मुख्य बाली" : "Signature crops"}
                          </h3>
                          <ul className="space-y-2">
                            {(np ? profile.crops.np : profile.crops.en).map((c, i) => (
                              <li key={i} className="flex gap-2.5 text-sm text-gray-700 leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </section>

                        <section className="mb-5">
                          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0A2540]/60 mb-2.5">
                            <HeartPulse size={13} className="text-[#B8941F]" />
                            {np ? "पशुपालन" : "Livestock"}
                          </h3>
                          <ul className="space-y-2">
                            {(np ? profile.livestock.np : profile.livestock.en).map((c, i) => (
                              <li key={i} className="flex gap-2.5 text-sm text-gray-700 leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#43A06B] flex-shrink-0" aria-hidden="true" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </section>

                        <section>
                          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0A2540]/60 mb-2.5">
                            <CloudSun size={13} className="text-[#B8941F]" />
                            {np ? "जलवायु दबाब" : "Climate pressure"}
                          </h3>
                          <p className="text-sm text-gray-700 leading-relaxed bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                            {np ? profile.climate.np : profile.climate.en}
                          </p>
                        </section>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-2xl shadow-xl overflow-hidden bg-white"
                    >
                      <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white px-6 py-5">
                        <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
                          {np ? "राष्ट्रिय एक नजरमा" : "Nepal at a glance"}
                        </p>
                        <h2 className="font-display text-xl sm:text-2xl font-bold leading-tight">
                          {np ? "नक्साबाट सुरु गर्नुहोस्" : "Start from the map"}
                        </h2>
                        <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                          {np
                            ? "कुनै जिल्ला वा प्रदेश छुनुहोस् — त्यस क्षेत्रको कृषि प्रोफाइल यहीँ खुल्छ।"
                            : "Touch any district or province — its agricultural profile opens right here."}
                        </p>
                      </div>
                      <div className="px-6 py-5 grid grid-cols-2 gap-4">
                        {NATIONAL_STATS.map((s, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                            className="rounded-xl border border-gray-100 bg-gray-50/60 p-3.5"
                          >
                            <p className="font-display text-xl font-bold text-[#0A2540] leading-none">
                              {np ? toNepaliDigits(s.value) : s.value}
                            </p>
                            <p className="text-[11px] text-gray-600 leading-snug mt-1.5">
                              {np ? s.label.np : s.label.en}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">{np ? s.note.np : s.note.en}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── Sources footer ─────────────────────────────────────────── */}
          <div className="mt-8 rounded-xl bg-[#0A2540]/[0.04] border border-[#0A2540]/10 px-5 py-4 flex items-start gap-3">
            <Info size={16} className="mt-0.5 text-[#B8941F] flex-shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">
              {np
                ? "स्रोत: MoALD को Statistical Information on Nepalese Agriculture (धान ५६ लाख टन, मकै ३० लाख टन — कीर्तिमान वर्ष); USDA FAS तथा Kafle et al. 2024 (गहुँ); Poudel et al. 2020, Vaccines (भैंसीको दुध हिस्सा ६४%); FEWS NET 2026 (कृषि GDP ≈२२%); DHM/ICIMOD ताप विश्लेषण (वार्षिक +०.०५६ डिग्री); नेपाली कुखुरा तथ्याङ्क (≈१.६ अर्ब अन्डा)। नक्सा: nepal-district-map (MIT इजाजतपत्र) — दार्चुलामा लिम्पियाधुरा–कालापानी–लिपुलेकसहित। प्रदेशगत विवरण सामान्य कृषि भूगोलमा आधारित छ।"
                : "Sources: MoALD Statistical Information on Nepalese Agriculture (paddy 5.6 M t & maize 3.0 M t — record year); USDA FAS & Kafle et al. 2024 (wheat); Poudel et al. 2020, Vaccines 8:322 (buffalo ≈64% of milk); FEWS NET 2026 (agriculture ≈22% of GDP); DHM/ICIMOD warming analyses (+0.056 °C/yr); Nepali poultry statistics (≈1.6 B eggs). Map: nepal-district-map (MIT license) with the correct Limpiyadhura–Kalapani–Lipulekh boundary in Darchula. Province descriptions follow established agricultural geography."}
            </p>
          </div>

          {/* Cross-link to knowledge base */}
          <div className="mt-6 mb-2 rounded-2xl bg-gradient-to-r from-[#0A2540] to-[#12365C] text-white px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
                {np ? "अझै गहिराइमा" : "Go deeper"}
              </p>
              <p className="font-display text-lg sm:text-xl font-bold leading-snug">
                {np
                  ? "यी अभ्यासका विस्तृत मार्गदर्शन ज्ञान भण्डारमा छन्"
                  : "The knowledge base unpacks these practices in full"}
              </p>
            </div>
            <a
              href="/knowledge"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8941F] text-[#0A2540] font-semibold px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              {np ? "ज्ञान भण्डार खोल्नुहोस्" : "Open the knowledge base"}
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
