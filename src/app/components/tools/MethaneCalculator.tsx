import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Flame, Beef, Milk, Mountain, Bird, Leaf, Info, Recycle,
  ChevronDown, Sprout,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/* ─────────────────────────────────────────────────────────────────────────────
 *  METHANE & CARBON HOOFPRINT — IPCC Tier 1 herd greenhouse-gas estimate.
 *
 *  Every factor is a published default and EDITABLE so an extension officer
 *  can swap in national inventory values:
 *
 *  · Enteric CH4 (kg/head/yr) — IPCC 2006 GL Vol.4 Ch.10 Tier 1, Indian
 *    subcontinent region: dairy cattle 57, other cattle 27, buffalo 55,
 *    sheep & goats 5, poultry ~0 (values re-verified against South-Asian
 *    livestock CH4 assessments; Nepal studies report 56–58 for dairy).
 *  · Manure CH4 (kg/head/yr) — warm-climate Asia defaults: dairy 4,
 *    buffalo 4, other cattle 2, goats 0.2, layer hens 0.03.
 *  · Manure N2O — computed: N excreted (kg N/head/yr: dairy 50, buffalo 55,
 *    other cattle 25, goats 5, hens 0.6 — 2006 GL Ch.10 Table 10.19 style)
 *    × EF3 for the selected manure system: pasture 0.02, solid storage /
 *    compost 0.005, biogas digester 0.001 (digestate applied) × 44/28.
 *  · GWPs — IPCC AR6 (2021) 100-yr: CH4 (biogenic) 27.2, N2O 273.
 *  · Benchmark: FAO GLEAM global dairy sector average ≈ 2.5 kg CO2e per
 *    kg FPCM (≈ 2.4 per litre) — smallholder South-Asian systems typically
 *    run higher per litre because yields are low.
 *
 *  Mitigation figures shown with the result are documented ranges:
 *  3NOP (Bovaer) ~30% enteric CH4 cut in dairy trials; dietary fat/oil
 *  3–10%; biogas captures nearly all manure CH4 (Nepal: ≈450,000 fixed-dome
 *  plants by 2023, Lohani et al. 2025).
 * ──────────────────────────────────────────────────────────────────────────── */

type Sp = "dairy" | "buffalo" | "other" | "goat" | "poultry";

interface SpeciesDef {
  id: Sp;
  en: string;
  np: string;
  icon: typeof Beef;
  enteric: number;   // kg CH4/head/yr (enteric)
  manure: number;    // kg CH4/head/yr (manure)
  nExcrete: number;  // kg N/head/yr excreted
}

const SPECIES: SpeciesDef[] = [
  { id: "dairy",   en: "Dairy cows",    np: "दुधे गाई",   icon: Milk,    enteric: 57,  manure: 4,  nExcrete: 50 },
  { id: "buffalo", en: "Buffalo (milking)", np: "दुधे भैंसी", icon: Milk,  enteric: 55,  manure: 4,  nExcrete: 55 },
  { id: "other",   en: "Young / other cattle", np: "अन्य गाईगोठा", icon: Beef, enteric: 27, manure: 2,  nExcrete: 25 },
  { id: "goat",    en: "Goats & sheep", np: "बाख्रा/भेड़",  icon: Mountain, enteric: 5, manure: 0.2, nExcrete: 5 },
  { id: "poultry", en: "Layer hens",    np: "लेयर कुखुरा", icon: Bird,    enteric: 0,   manure: 0.03, nExcrete: 0.6 },
];

const GWP_CH4 = 27.2; // AR6 100-yr, biogenic
const GWP_N2O = 273;  // AR6 100-yr

type ManureSys = "pasture" | "solid" | "biogas";
const MANURE_SYS: { id: ManureSys; ef: number; en: string; np: string }[] = [
  { id: "pasture", ef: 0.02,  en: "Dropped on pasture", np: "चरनमा छाडिन्छ" },
  { id: "solid",   ef: 0.005, en: "Collected → compost / solid storage", np: "कम्पोस्ट/थुप्रो" },
  { id: "biogas",  ef: 0.001, en: "Biogas digester", np: "बायोग्यास" },
];

const fmt = (v: number, np: boolean, digits = 0) => {
  const s = v.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
  return np ? toNepaliDigits(s) : s;
};

const num = (s: string) => {
  const v = parseFloat(s);
  return Number.isFinite(v) && v >= 0 ? v : 0;
};

export function MethaneCalculator({ np }: { np: boolean }) {
  const [counts, setCounts] = useState<Record<Sp, string>>({
    dairy: "2", buffalo: "3", other: "2", goat: "0", poultry: "0",
  });
  const [efEnteric, setEfEnteric] = useState<Record<Sp, string>>(
    Object.fromEntries(SPECIES.map((s) => [s.id, String(s.enteric)])) as Record<Sp, string>
  );
  const [milkL, setMilkL] = useState("10");
  const [manureSys, setManureSys] = useState<ManureSys>("solid");

  const sys = MANURE_SYS.find((m) => m.id === manureSys) ?? MANURE_SYS[1];

  const calc = useMemo(() => {
    let ch4 = 0, n2o = 0;
    const perSpecies = SPECIES.map((s) => {
      const n = num(counts[s.id]);
      const e = num(efEnteric[s.id]);
      const ch4Sp = n * (e + s.manure);
      const n2oSp = n * (s.nExcrete * sys.ef * (44 / 28));
      ch4 += ch4Sp;
      n2o += n2oSp;
      return { sp: s, n, ch4Sp, n2oSp };
    });
    const co2e = ch4 * GWP_CH4 + n2o * GWP_N2O;
    const litresPerYear = num(milkL) * 365;
    const perLitre = litresPerYear > 0 ? co2e / litresPerYear : null;
    return { perSpecies, ch4, n2o, co2e, tonnes: co2e / 1000, litresPerYear, perLitre };
  }, [counts, efEnteric, milkL, sys]);

  const treeEquiv = calc.co2e / 21; // a mature tree absorbs ≈21 kg CO2/yr (FAO/USDA ballpark)
  const totalAnimals = SPECIES.reduce((a, s) => a + num(counts[s.id]), 0);

  return (
    <div className="max-w-3xl space-y-6">
      {/* Intro */}
      <div className="rounded-2xl border-2 border-[#D4AF37]/40 bg-[#D4AF37]/[0.05] p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#B8941F] mb-2">
          <Flame size={13} aria-hidden="true" />
          {np ? "गोठको कार्बन पदचाप" : "Your herd's carbon hoofprint"}
        </p>
        <p className="text-sm leading-relaxed text-gray-700">
          {np
            ? "रुमिनन्ट पशुले अन्न चपाउँदा मिथेन बनाउँछ — यो जलवायुको दृष्टिले बलियो ग्रीनहाउस ग्यास हो। IPCC तह-१ विधिबाट आफ्नो बथानको अनुमानित उत्सर्जन हेर्नुहोस्, र कम गर्ने व्यवहारिक उपाय पनि।"
            : "Ruminants release methane while digesting feed — a potent greenhouse gas. Estimate your herd's footprint with the IPCC Tier 1 method, and see practical ways to shrink it."}
        </p>
      </div>

      {/* Herd inputs */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-1">
          {np ? "बथान संख्या" : "Herd numbers"}
        </p>
        <p className="text-[11px] text-gray-400 mb-4">{np ? "आफ्नो गोठका अनुसार भर्नुहोस्" : "Fill in what you keep — leave 0 for the rest"}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {SPECIES.map((s) => (
            <div key={s.id} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-3.5 py-2.5">
              <s.icon size={18} className="text-[#B8941F] flex-shrink-0" aria-hidden="true" />
              <Label className="flex-1 text-[13px] font-semibold text-[#0A2540] min-w-0 truncate">
                {np ? s.np : s.en}
              </Label>
              <Input
                type="number" min={0} inputMode="numeric"
                value={counts[s.id]}
                onChange={(e) => setCounts((c) => ({ ...c, [s.id]: e.target.value }))}
                className="w-20 text-right font-bold bg-white"
                aria-label={np ? s.np : s.en}
              />
            </div>
          ))}
        </div>

        {/* Manure system */}
        <div className="mt-4">
          <Label className="text-[13px] font-semibold text-[#0A2540] flex items-center gap-1.5">
            <Recycle size={14} aria-hidden="true" />
            {np ? "गोबर कसरी साम्बलन्छ?" : "How is the manure handled?"}
          </Label>
          <div className="mt-2 grid sm:grid-cols-3 gap-2">
            {MANURE_SYS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setManureSys(m.id)}
                className={`text-left rounded-xl border-2 px-3 py-2.5 text-[12px] font-semibold transition-all ${
                  manureSys === m.id
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#0A2540]"
                    : "border-gray-100 bg-white text-gray-500 hover:border-[#D4AF37]/40"
                }`}
              >
                {np ? m.np : m.en}
                <span className="block text-[10px] font-medium text-gray-400 mt-0.5">
                  N₂O EF₃ = {m.ef === 0.001 ? "0.001" : String(m.ef)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Milk for intensity */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-3.5 py-2.5">
          <Milk size={18} className="text-[#B8941F] flex-shrink-0" aria-hidden="true" />
          <Label className="flex-1 text-[13px] font-semibold text-[#0A2540]">
            {np ? "बेच्ने दुध (लिटर/दिन)" : "Milk sold (litres/day)"}
            <span className="block text-[10px] font-medium text-gray-400">{np ? "प्रति-लिटर तीव्रता हिसाब्न" : "for per-litre intensity"}</span>
          </Label>
          <Input
            type="number" min={0} inputMode="decimal"
            value={milkL}
            onChange={(e) => setMilkL(e.target.value)}
            className="w-20 text-right font-bold bg-white"
            aria-label={np ? "दैनिक दुध लिटर" : "litres per day"}
          />
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl border-2 border-[#0A2540]/15 bg-gradient-to-br from-[#0A2540]/[0.04] to-white p-5">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-[#0A2540]">{fmt(calc.ch4, np)}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mt-1">kg CH₄/yr</p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-[#0A2540]">{fmt(calc.co2e, np)}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mt-1">kg CO₂e/yr</p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-[#0A2540]">{fmt(calc.tonnes, np, 1)}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mt-1">{np ? "टन CO₂e/वर्ष" : "tonnes CO₂e/yr"}</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500 leading-relaxed text-center">
          {np
            ? `कुल ${fmt(totalAnimals, np)} पशु · GWP: CH₄ ${String(GWP_CH4)}, N₂O ${String(GWP_N2O)} (IPCC AR6) · रूख तुल्य: ~${fmt(treeEquiv, np)} वयस्क रूखले वर्षैकी सोख्छ`
            : `${fmt(totalAnimals, np)} animals total · GWPs: CH₄ ${String(GWP_CH4)}, N₂O ${String(GWP_N2O)} (IPCC AR6) · tree equivalent: ~${fmt(treeEquiv, np)} mature trees absorbing a year`}
        </p>

        {calc.perLitre != null && calc.perLitre > 0 && (
          <div className="mt-4 rounded-xl bg-white border border-gray-100 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-1.5">
              {np ? "प्रति-लिटर तीव्रता" : "Emission intensity"}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="font-display text-xl font-bold text-[#0A2540]">{fmt(calc.perLitre, np, 1)}</p>
              <p className="text-xs font-semibold text-gray-400">kg CO₂e / litre milk</p>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">
              {np
                ? "विश्व दुग्ध औसत ≈ २.५ किलो CO₂e प्रति किलो दुध (FAO GLEAM) — उत्पादन बढाउँदा प्रति-लिटर उत्सर्जन आफैँ घट्छ।"
                : "Global dairy average ≈ 2.5 kg CO₂e per kg milk (FAO GLEAM) — raising yield per cow lowers the per-litre figure on its own."}
            </p>
          </div>
        )}

        {/* Per-species breakdown bars */}
        <div className="mt-4 space-y-2">
          {calc.perSpecies.filter((r) => r.n > 0).map((r) => {
            const co2eSp = r.ch4Sp * GWP_CH4 + r.n2oSp * GWP_N2O;
            const pct = calc.co2e > 0 ? (co2eSp / calc.co2e) * 100 : 0;
            return (
              <div key={r.sp.id}>
                <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
                  <span className="flex items-center gap-1.5">
                    <r.sp.icon size={12} aria-hidden="true" />
                    {np ? `${r.sp.np} ×${fmt(r.n, np)}` : `${r.sp.en} ×${fmt(r.n, np)}`}
                  </span>
                  <span className="font-bold text-[#0A2540]">{fmt(co2eSp, np)} kg CO₂e</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#0A2540] to-[#4C7FB5]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mitigation */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2E7D32] mb-3">
          <Sprout size={13} aria-hidden="true" />
          {np ? "घटाउने व्यवहारिक उपाय" : "Practical ways to reduce it"}
        </p>
        <ul className="space-y-2.5 text-[13px] text-gray-700 leading-relaxed">
          <li className="flex gap-2.5">
            <Leaf size={14} className="text-[#2E7D32] mt-1 flex-shrink-0" aria-hidden="true" />
            <span>
              <b>{np ? "उत्पादनशीलता" : "Productivity"}:</b>{" "}
              {np
                ? "राम्रो नस्ल + राम्रो चाराले प्रति-लिटर मिथेन घट्छ — थोरै तर राम्ररी खुवाएको गाईले उही दुध दिँदा कम CH₄ बनाउँछ।"
                : "better genetics + better feed cut methane per litre — fewer, well-fed cows producing the same milk emit less CH₄."}
            </span>
          </li>
          <li className="flex gap-2.5">
            <Leaf size={14} className="text-[#2E7D32] mt-1 flex-shrink-0" aria-hidden="true" />
            <span>
              <b>{np ? "चारामा तेल/बोसो" : "Dietary fat & oils"}:</b>{" "}
              {np
                ? "खानेतेल वा तिलको खर्सानी जस्ता बोसो स्रोत थप्दा आँतको मिथेन ३–१०% घट्ने अनुसन्धान छ।"
                : "adding fat/oil sources (oilseeds, by-pass fat) cuts enteric CH₄ by 3–10% in trials."}
            </span>
          </li>
          <li className="flex gap-2.5">
            <Leaf size={14} className="text-[#2E7D32] mt-1 flex-shrink-0" aria-hidden="true" />
            <span>
              <b>{np ? "३-एनओपी थप विकल्प" : "3NOP feed additive"}:</b>{" "}
              {np
                ? "डेयरीमा ~३०% सम्म घटाउने प्रमाणित थप विकल्प (विश्वका धेरै देशमा स्वीकृत) — ठूला फार्मको लागि।"
                : "proven ~30% enteric reduction in dairy cattle (approved in many countries) — relevant for larger farms."}
            </span>
          </li>
          <li className="flex gap-2.5">
            <Recycle size={14} className="text-[#2E7D32] mt-1 flex-shrink-0" aria-hidden="true" />
            <span>
              <b>{np ? "गोबर → बायोग्यास" : "Manure → biogas"}:</b>{" "}
              {np
                ? "गोबर बायोग्यासमा हाल्दा गोबरको CH₄ नजिकै सबै समातिन्छ र चुलोमा जान्छ — नेपालमा ~४.५ लाख घरायसी गाडी बनिसकेका छन्। माथिको विकल्प छान्दा N₂O पनि घट्छ।"
                : "digesting manure captures nearly all its CH₄ as cooking gas — Nepal already has ≈450,000 household plants. Picking the digester option above also lowers N₂O."}
            </span>
          </li>
        </ul>
      </div>

      {/* Advanced: editable EFs */}
      <details className="rounded-2xl border-2 border-gray-100 p-5 group">
        <summary className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] cursor-pointer list-none">
          <ChevronDown size={14} className="group-open:rotate-180 transition-transform" aria-hidden="true" />
          {np ? "उन्नत — उत्सर्जन तत्त्व मिलाउनुहोस्" : "Advanced — edit emission factors"}
        </summary>
        <p className="mt-3 text-[11px] text-gray-400 leading-relaxed">
          {np
            ? "आँतको CH₄ किलो/पशु/वर्ष (IPCC 2006 तह-१, भारतीय उपमहाद्वीप): दुधे गाई ५७ · भैंसी ५५ · अन्य २७ · बाख्रा/भेड़ ५। आफ्नो निकायको संख्या भए यहाँ राख्नुहोस्।"
            : "Enteric CH₄ kg/head/yr (IPCC 2006 Tier 1, Indian subcontinent): dairy 57 · buffalo 55 · other cattle 27 · goat/sheep 5. Replace with your national inventory values if you have them."}
        </p>
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          {SPECIES.map((s) => (
            <div key={s.id} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-3.5 py-2">
              <s.icon size={16} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
              <Label className="flex-1 text-[12px] font-semibold text-gray-600 min-w-0 truncate">
                {np ? s.np : s.en}
              </Label>
              <Input
                type="number" min={0} inputMode="decimal"
                value={efEnteric[s.id]}
                onChange={(e) => setEfEnteric((c) => ({ ...c, [s.id]: e.target.value }))}
                className="w-20 text-right font-bold bg-white"
                aria-label={`${np ? s.np : s.en} EF`}
              />
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-gray-400 flex items-start gap-1.5">
          <Info size={12} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
          {np
            ? "यो शिक्षा/जानकारीका लागि हो — कार्बन बजार/प्रमाणीकरण चाहिए तह-२/३ विधि चाहिन्छ।"
            : "Educational estimate — carbon-market or reporting purposes need Tier 2/3 methods with measured data."}
        </p>
      </details>

      <ResultCardActions
        np={np}
        toolId="methane"
        label={np ? "मिथेन तथा कार्बन पदचाप" : "Methane & carbon hoofprint"}
        summary={np
          ? `${fmt(calc.tonnes, np, 1)} टन CO₂e/वर्ष · ${fmt(totalAnimals, np)} पशु`
          : `${fmt(calc.tonnes, np, 1)} t CO₂e/yr · ${fmt(totalAnimals, np)} animals`}
        detail={np
          ? `IPCC तह-१ · आँत CH₄ ${fmt(calc.ch4, np)} किलो/वर्ष · GWP AR6`
          : `IPCC Tier 1 · enteric+manure CH₄ ${fmt(calc.ch4, np)} kg/yr · AR6 GWPs`}
      />
    </div>
  );
}
