import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Recycle, Beef, Milk, Mountain, Bird, PiggyBank, Flame,
  ChevronDown, Package, Leaf, Info,
} from "lucide-react";
import { Input } from "../ui/input";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/**
 * MANURE & COMPOST VALUE CALCULATOR — turns a herd roster into the
 * fertiliser-and-energy value of its dung. Every constant is sourced:
 *
 *   · Dung output (kg/head/day, editable): cattle ~12 (10–15), buffalo ~17
 *     (15–20, Indian PIB bovine planning figure 15), goat ~0.7, pig ~2.2,
 *     layer hen ~0.12 (0.10–0.15).
 *   · Nutrients (kg/t fresh dung, editable): cattle 3.4 N / 1.9 P₂O₅ /
 *     0.6 K₂O and buffalo 2.2 / 1.2 / 0.55 (FAO "Type of fertilizers"
 *     organic-manure table); hen manure 16 / 15 / 8 (IUNG guide, 1.6% N);
 *     goat 6.5 / 5.0 / 3.0 (TNAU fresh sheep/goat values); pig 5.5 / 3.5 / 4.0.
 *   · Compost mass retention 60% (field range 50–70%), first-year N
 *     availability ≈ 50% (slow mineralisation), DAP also carries 18% N
 *     (conservatively not credited).
 *   · Biogas: 0.036 m³ gas per kg fresh cattle/buffalo dung; household
 *     cooking ≈ 2 m³/day; 1 m³ ≈ 0.43 kg LPG ≈ 2.7 kg firewood; Nepal
 *     fixed-dome plants ≈ 0.33 m³ gas per m³ digester per day (so a 6 m³
 *     plant ≈ 2 m³/day on ~56 kg dung); ~450,000 plants installed by 2023
 *     (Lohani et al. 2025); each saves ≈ 2 t firewood/yr (Ashden/BSP).
 *   · Fertiliser bag prices default to Nepal's Koshi province directive
 *     (urea Rs 705, DAP Rs 2,200, MOP Rs 1,600 per 50 kg) — editable.
 */

type Sp = "cattle" | "buffalo" | "goat" | "pig" | "poultry";

interface SpeciesDef {
  id: Sp;
  en: string;
  np: string;
  icon: typeof Beef;
  /** default kg dung per head per day */
  dung: number;
  /** kg N, P2O5, K2O per tonne fresh dung */
  n: number;
  p: number;
  k: number;
}

const SPECIES: SpeciesDef[] = [
  { id: "cattle", en: "Cattle / cows", np: "गाई", icon: Beef, dung: 12, n: 3.4, p: 1.9, k: 0.6 },
  { id: "buffalo", en: "Buffalo", np: "भैंसी", icon: Milk, dung: 17, n: 2.2, p: 1.2, k: 0.55 },
  { id: "goat", en: "Goats", np: "बाख्रा", icon: Mountain, dung: 0.7, n: 6.5, p: 5.0, k: 3.0 },
  { id: "pig", en: "Pigs", np: "सुँगुर", icon: PiggyBank, dung: 2.2, n: 5.5, p: 3.5, k: 4.0 },
  { id: "poultry", en: "Layer hens", np: "लेयर कुखुरा", icon: Bird, dung: 0.12, n: 16, p: 15, k: 8 },
];

const GAS_PER_KG = 0.036;      // m³ biogas per kg fresh dung
const COOKING_M3 = 2.0;        // m³/day a household cooks with
const GAS_PER_M3_PLANT = 0.33; // m³ gas per m³ digester per day
const FIREWOOD_KG_PER_M3 = 2.7;
const LPG_KG_PER_M3 = 0.43;
const COMPOST_RETENTION = 0.6;
const N_YEAR1 = 0.5; // ~half of organic N feeds the first crop

const PLANT_SIZES = [4, 6, 8, 13] as const;

const fmtNum = (v: number, np: boolean, digits = 1) => {
  const s = v.toLocaleString("en-US", { maximumFractionDigits: digits });
  return np ? toNepaliDigits(s) : s;
};

export function ManureValueCalculator({ np }: { np: boolean }) {
  const [counts, setCounts] = useState<Record<Sp, string>>({
    cattle: "2", buffalo: "5", goat: "0", pig: "0", poultry: "0",
  });
  const [rates, setRates] = useState<Record<Sp, string>>(
    Object.fromEntries(SPECIES.map((s) => [s.id, String(s.dung)])) as Record<Sp, string>
  );
  const [priceUrea, setPriceUrea] = useState("705");
  const [priceDap, setPriceDap] = useState("2200");
  const [priceMop, setPriceMop] = useState("1600");
  const [biogas, setBiogas] = useState(false);
  const [advanced, setAdvanced] = useState(false);

  const num = (s: string) => Math.max(0, Number(s) || 0);

  const rows = useMemo(
    () =>
      SPECIES.map((s) => {
        const count = num(counts[s.id]);
        const kgPerHead = num(rates[s.id]) || s.dung;
        const annualT = (count * kgPerHead * 365) / 1000;
        return { ...s, count, kgPerHead, dailyKg: count * kgPerHead, annualT, n: annualT * s.n, p: annualT * s.p, k: annualT * s.k };
      }),
    [counts, rates]
  );

  const active = rows.filter((r) => r.count > 0);
  const dailyKg = rows.reduce((a, r) => a + r.dailyKg, 0);
  const annualT = rows.reduce((a, r) => a + r.annualT, 0);
  const totN = rows.reduce((a, r) => a + r.n, 0);
  const totP = rows.reduce((a, r) => a + r.p, 0);
  const totK = rows.reduce((a, r) => a + r.k, 0);
  const compostT = annualT * COMPOST_RETENTION;

  /* Fertiliser equivalence (50-kg bags, editable NPR prices) */
  const ureaKg = totN / 0.46;
  const dapKg = totP / 0.46;
  const mopKg = totK / 0.6;
  const ureaBags = ureaKg / 50;
  const dapBags = dapKg / 50;
  const mopBags = mopKg / 50;
  const value =
    ureaBags * num(priceUrea) + dapBags * num(priceDap) + mopBags * num(priceMop);

  /* Biogas — the suggested plant is the smallest standard size that both
     your dung can feed AND that covers family cooking (~2 m³/day). If the
     dung feeds only a smaller plant, show it as partial cooking. */
  const gasM3Day = dailyKg * GAS_PER_KG;
  const dungNeeded = (size: number) => (size * GAS_PER_M3_PLANT) / GAS_PER_KG;
  const feasible = PLANT_SIZES.filter((s) => dungNeeded(s) <= dailyKg);
  const suggestedPlant =
    feasible.find((s) => s * GAS_PER_M3_PLANT >= COOKING_M3 - 0.05) ?? feasible[feasible.length - 1] ?? null;
  const plantGas = suggestedPlant ? suggestedPlant * GAS_PER_M3_PLANT : 0;
  const partialCooking = !!suggestedPlant && plantGas < COOKING_M3 - 0.05;
  const firewoodT = (gasM3Day * 365 * FIREWOOD_KG_PER_M3) / 1000;
  const lpgKg = gasM3Day * 365 * LPG_KG_PER_M3;

  const cook = COOKING_M3.toFixed(1);
  const partialNp = ` — परिवारको पकाउने ग्यास (${cook} घनमि./दिन) पुग्दैन, ब्याकअप चुलो राख्नुहोस्`;
  const fullNp = ` — परिवारको भात पकाउने (${cook} घनमि./दिन) पुग्ने ग्यास`;
  const partialEn = ` — short of full family cooking (${cook} m³/day; keep a backup stove)`;
  const fullEn = ` — enough gas for family cooking (${cook} m³/day)`;

  const F = (v: number, d = 1) => fmtNum(v, np, d);
  const hasHerd = dailyKg > 0;

  const summary = hasHerd
    ? np
      ? `दिनको ${F(dailyKg, 0)} कि.ग्रा. गोबर → वर्षको ${F(annualT)} टन · कम्पोस्ट ${F(compostT)} टन · मल-बराबर मूल्य रु. ${F(value, 0)}`
      : `${F(dailyKg, 0)} kg dung/day → ${F(annualT)} t/yr · ${F(compostT)} t compost · ≈ Rs ${F(value, 0)} of bag fertiliser`
    : "";

  return (
    <div className="space-y-5">
      {/* ── Herd inputs ─────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-gray-100 bg-white p-5 sm:p-6">
        <p className="flex items-center gap-2 text-sm font-bold text-[#0A2540] mb-1">
          <Beef size={17} className="text-[#B8941F]" aria-hidden="true" />
          {np ? "तपाईंको बथान" : "Your herd"}
        </p>
        <p className="text-xs text-gray-500 mb-4">
          {np ? "जति छन् त्यति लेख्नुहोस् — खाली छोडेको जात हिसाबमा आउँदैन।" : "Enter what you keep — anything left at 0 drops out of the maths."}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {rows.map((s) => {
            const Icon = s.icon;
            return (
              <label key={s.id} className="block">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                  <Icon size={14} className="text-[#B8941F]" aria-hidden="true" />
                  {np ? s.np : s.en}
                </span>
                <Input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={counts[s.id]}
                  onChange={(e) => setCounts({ ...counts, [s.id]: e.target.value })}
                  aria-label={np ? `${s.np} संख्या` : `Number of ${s.en}`}
                  className="border-2 border-gray-200 focus:border-[#D4AF37] text-sm font-semibold"
                />
              </label>
            );
          })}
        </div>

        {/* Advanced: dung rates + bag prices */}
        <button
          type="button"
          onClick={() => setAdvanced((v) => !v)}
          aria-expanded={advanced}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8941F] hover:text-[#0A2540] transition-colors"
        >
          <ChevronDown size={14} className={advanced ? "rotate-180 transition-transform" : "transition-transform"} aria-hidden="true" />
          {np ? "उन्नत — दर र मूल्य मिलाउनुहोस्" : "Advanced — adjust rates & prices"}
        </button>
        {advanced && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-4"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                {np ? "प्रति टाउके दैनिक गोबर (कि.ग्रा.)" : "Dung per head per day (kg)"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {SPECIES.map((s) => (
                  <label key={s.id} className="block">
                    <span className="block text-[11px] font-semibold text-gray-600 mb-1">{np ? s.np : s.en}</span>
                    <Input
                      type="number"
                      min={0}
                      step={0.1}
                      value={rates[s.id]}
                      onChange={(e) => setRates({ ...rates, [s.id]: e.target.value })}
                      aria-label={np ? `${s.np} — कि.ग्रा. प्रति दिन` : `${s.en} — kg per day`}
                      className="border border-gray-200 focus:border-[#D4AF37] text-xs py-1.5"
                    />
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                {np ? "मलको भाउ — ५० कि.ग्रा. बोराको (रु.)" : "Fertiliser price per 50-kg bag (Rs)"}
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: np ? "युरिया" : "Urea", v: priceUrea, set: setPriceUrea },
                  { label: "DAP", v: priceDap, set: setPriceDap },
                  { label: np ? "पोटास (MOP)" : "Potash (MOP)", v: priceMop, set: setPriceMop },
                ].map((x) => (
                  <label key={x.label} className="block">
                    <span className="block text-[11px] font-semibold text-gray-600 mb-1">{x.label}</span>
                    <Input
                      type="number"
                      min={0}
                      value={x.v}
                      onChange={(e) => x.set(e.target.value)}
                      aria-label={`${x.label} ${np ? "भाउ" : "price"}`}
                      className="border border-gray-200 focus:border-[#D4AF37] text-xs py-1.5"
                    />
                  </label>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5 leading-snug">
                {np
                  ? "पूर्वनिर्धारित: कोशी प्रदेश निर्देशिका (युरिया ७०५, DAP २२००, पोटास १६००) — आफ्नो क्षेत्रको भाउ हाल्नुहोस्।"
                  : "Defaults: Koshi province directive (urea 705, DAP 2,200, MOP 1,600) — enter your local rates."}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {!hasHerd ? (
        <div className="rounded-2xl bg-white border-2 border-gray-100 p-8 text-center">
          <Recycle className="mx-auto text-gray-300 mb-2" size={30} aria-hidden="true" />
          <p className="text-sm text-gray-500">
            {np ? "माथि कम्तीमा एक जातको संख्या राख्नुहोस्।" : "Enter at least one animal above to see the value."}
          </p>
        </div>
      ) : (
        <>
          {/* ── Headline stats ─────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { v: F(dailyKg, 0), unit: np ? "कि.ग्रा./दिन" : "kg/day", label: np ? "दैनिक गोबर" : "Daily dung" },
              { v: F(annualT), unit: "t", label: np ? "वार्षिक गोबर" : "Dung per year" },
              { v: F(compostT), unit: "t", label: np ? "कम्पोस्ट निकास" : "Compost yield" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl bg-[#0A2540] text-white p-3.5 text-center"
              >
                <p className="font-display text-lg sm:text-xl font-bold leading-none text-[#D4AF37]">
                  {s.v} <span className="text-[11px] text-gray-300 font-normal">{s.unit}</span>
                </p>
                <p className="text-[10px] text-gray-300 mt-1.5">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Nutrients + bag equivalents ────────────────────── */}
          <div className="rounded-2xl border-2 border-gray-100 bg-white overflow-hidden">
            <div className="px-5 py-3.5 bg-[#0A2540] text-white flex items-center gap-2">
              <Package size={16} className="text-[#D4AF37]" aria-hidden="true" />
              <p className="text-sm font-bold">
                {np ? "मल-बराबर मूल्य — बोराको भाषामा" : "Bag-fertiliser equivalent"}
              </p>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: totN, label: np ? "नाइट्रोजन (N)" : "Nitrogen (N)", color: "#0A2540" },
                  { v: totP, label: np ? "फस्फेट (P₂O₅)" : "Phosphate (P₂O₅)", color: "#43A06B" },
                  { v: totK, label: np ? "पोटास (K₂O)" : "Potash (K₂O)", color: "#B8941F" },
                ].map((x, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-center">
                    <p className="font-display text-lg font-bold" style={{ color: x.color }}>
                      {F(x.v)} <span className="text-[10px] font-normal text-gray-400">kg/yr</span>
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1 leading-tight">{x.label}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400 border-b border-gray-100">
                      <th className="py-2 pr-3 font-semibold">{np ? "मल" : "Bag"}</th>
                      <th className="py-2 pr-3 font-semibold">{np ? "बराबर" : "Equivalent"}</th>
                      <th className="py-2 pr-3 font-semibold">{np ? "बोरा (५० कि.ग्रा.)" : "50-kg bags"}</th>
                      <th className="py-2 font-semibold text-right">{np ? "मूल्य (रु.)" : "Value (Rs)"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { name: np ? "युरिया (४६% N)" : "Urea (46% N)", kg: ureaKg, bags: ureaBags, price: num(priceUrea) },
                      { name: np ? "DAP (४६% P₂O₅)" : "DAP (46% P₂O₅)", kg: dapKg, bags: dapBags, price: num(priceDap) },
                      { name: np ? "पोटास (६०% K₂O)" : "MOP (60% K₂O)", kg: mopKg, bags: mopBags, price: num(priceMop) },
                    ].map((r) => (
                      <tr key={r.name}>
                        <td className="py-2.5 pr-3 font-semibold text-[#0A2540]">{r.name}</td>
                        <td className="py-2.5 pr-3 text-gray-700">{F(r.kg)} {np ? "कि.ग्रा." : "kg"}</td>
                        <td className="py-2.5 pr-3 text-gray-700">{F(r.bags, 1)} {np ? "बोरा" : "bags"}</td>
                        <td className="py-2.5 text-right font-bold text-[#0A2540]">{F(r.bags * r.price, 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-100">
                      <td colSpan={3} className="py-3 font-bold text-[#0A2540]">
                        {np ? "कुल वार्षिक मल-बराबर मूल्य" : "Total annual fertiliser value"}
                      </td>
                      <td className="py-3 text-right font-display font-bold text-[#B8941F] text-base">
                        {np ? "रु. " : "Rs "}{F(value, 0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <p className="flex items-start gap-2 text-[11px] text-gray-500 leading-relaxed">
                <Info size={13} className="mt-0.5 flex-shrink-0 text-[#B8941F]" aria-hidden="true" />
                {np
                  ? "पहिलो बालीले जैविक N को करिब आधा मात्र तुरुन्तै पाउँछ (बाँकी पछिल्ला बालीमा); P र K को धेरैजसो उपलब्ध हुन्छ। DAP भित्रको N सुरक्षाका लागि जोडिएको छैन।"
                  : "The first crop gets only about half the organic N right away (the rest feeds later seasons); most P and K are available. The N inside DAP is deliberately not credited."}
              </p>
            </div>
          </div>

          {/* ── Biogas ─────────────────────────────────────────── */}
          <div className="rounded-2xl border-2 border-gray-100 bg-white overflow-hidden">
            <div className="px-5 py-3.5 flex items-center justify-between gap-3 bg-gradient-to-r from-[#0A2540] to-[#12365C] text-white">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Flame size={16} className="text-[#D4AF37]" aria-hidden="true" />
                {np ? "बायोग्यासको सम्भावना" : "Biogas potential"}
              </p>
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={biogas}
                  onChange={(e) => setBiogas(e.target.checked)}
                  className="accent-[#D4AF37] w-4 h-4"
                />
                {np ? "हिसाब देखाउनुहोस्" : "Show the maths"}
              </label>
            </div>
            {biogas ? (
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { v: F(gasM3Day, 1), unit: "m³/day", label: np ? "दैनिक ग्यास" : "Gas per day" },
                    { v: F(firewoodT), unit: "t/yr", label: np ? "बचत दाउरा" : "Firewood saved" },
                    { v: F(lpgKg, 0), unit: "kg/yr", label: np ? "LPG-बराबर" : "LPG equivalent" },
                    { v: suggestedPlant ? `${suggestedPlant}` : "—", unit: suggestedPlant ? "m³" : "", label: np ? "सुझाव प्लान्ट" : "Suggested plant" },
                  ].map((s, i) => (
                    <div key={i} className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-center">
                      <p className="font-display text-base font-bold text-[#0A2540] leading-none">
                        {s.v} <span className="text-[10px] font-normal text-gray-400">{s.unit}</span>
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {suggestedPlant
                    ? np
                      ? `तपाईंको ${F(dailyKg, 0)} कि.ग्रा./दिन गोबरले ${F(dungNeeded(suggestedPlant), 0)} कि.ग्रा. चाहिने ${F(suggestedPlant, 0)} घनमि. घरायसी प्लान्ट चलाउँछ${partialCooking ? partialNp : fullNp}। नेपालमा यस्ता ~४.५ लाख प्लान्ट बसिसकेका छन्; हरेकले वर्षको करिब २ टन दाउरा बचाउँछ। स्लरी निकाल्दा N-P-K को धेरैजसो जोगिन्छ — कम्पोस्टभन्दा राम्रो मल।`
                      : `Your ${F(dailyKg, 0)} kg/day feeds a ${F(suggestedPlant, 0)} m³ household plant (needs ${F(dungNeeded(suggestedPlant), 0)} kg/day)${partialCooking ? partialEn : fullEn}. Nepal has ~450,000 such plants; each saves ~2 t firewood a year. The outflowing slurry keeps most N-P-K — a better fertiliser than raw dung.`
                    : np
                      ? `मानक घरायसी प्लान्टका लागि कम्तीमा ${F(dungNeeded(4), 0)} कि.ग्रा./दिन गोबर चाहिन्छ — साझा/सामुदायिक प्लान्ट वा छिमेकीसँग गोबर जोड्ने विचार गर्नुहोस्।`
                      : `A standard household plant needs at least ${F(dungNeeded(4), 0)} kg/day — consider a shared/community plant or pooling dung with neighbours.`}
                </p>
              </div>
            ) : (
              <p className="px-5 py-4 text-xs text-gray-500 leading-relaxed">
                {np
                  ? "१ कि.ग्रा. गोबरबाट ≈ ०.०३६ घनमि. ग्यास; १ घनमि. ग्यास ≈ ०.४३ कि.ग्रा. LPG ≈ २.७ कि.ग्रा. दाउरा। टिक लगाएर आफ्नो बथानको हिसाब हेर्नुहोस्।"
                  : "1 kg dung ≈ 0.036 m³ gas; 1 m³ gas ≈ 0.43 kg LPG ≈ 2.7 kg firewood. Tick the box to see it for your herd."}
              </p>
            )}
          </div>

          {/* ── Save / share ───────────────────────────────────── */}
          <ResultCardActions
            toolId="manure"
            np={np}
            label={
              active.length
                ? active.map((a) => `${np ? a.np : a.en} ×${a.count}`).join(" · ")
                : np ? "बथान" : "herd"
            }
            summary={summary}
            detail={
              `Dung: ${F(dailyKg, 0)} kg/day · ${F(annualT)} t/yr\n` +
              `Compost (60%): ${F(compostT)} t/yr\n` +
              `N-P₂O₅-K₂O: ${F(totN)}-${F(totP)}-${F(totK)} kg/yr\n` +
              `≈ Urea ${F(ureaKg)} kg + DAP ${F(dapKg)} kg + MOP ${F(mopKg)} kg\n` +
              `Value ≈ Rs ${F(value, 0)} (at urea ${num(priceUrea)}/DAP ${num(priceDap)}/MOP ${num(priceMop)} per 50kg)\n` +
              (biogas ? `Biogas: ${F(gasM3Day, 1)} m³/day · ${F(firewoodT)} t firewood/yr` : "") +
              `\ndrmogalshah.com.np/tools/manure`
            }
          />

          <p className="flex items-start gap-2 text-[11px] text-gray-400 leading-relaxed">
            <Leaf size={12} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
            {np
              ? "स्रोत: FAO जैविक मल-पोषक तालिका; IUNG प्राकृतिक मल सन्दर्भ (कुखुरा थुक N १.६%); Lohani et al. 2025 (नेपालमा ~४.५ लाख बायोग्यास); Ashden/BSP (वार्षिक ~२ टन दाउरा बचत); कोशी प्रदेश मल-निर्देशिका (मूल्य)।"
              : "Sources: FAO organic-manure nutrient tables; IUNG natural fertiliser guide (hen manure 1.6% N); Lohani et al. 2025 (~450k Nepal plants); Ashden/BSP (~2 t firewood saved/yr); Koshi province fertiliser directive (prices)."}
          </p>
        </>
      )}
    </div>
  );
}
