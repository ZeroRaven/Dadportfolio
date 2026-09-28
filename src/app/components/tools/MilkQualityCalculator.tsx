import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Milk, Droplets, BadgeCheck, TriangleAlert, Info, Calculator, CalendarDays,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/* ─────────────────────────────────────────────────────────────────────────────
 *  MILK QUALITY & PAYMENT — the two-axis (fat × SNF) pricing used by dairy
 *  cooperatives across the subcontinent, plus the field SNF formula.
 *
 *  · Two-axis payment:  price/litre = Fat% × A + SNF% × B, where A and B are
 *    the dairy's published per-point rates. Defaults (A = Rs 6.50, B = Rs 4.00)
 *    give Rs 60 per litre at 4.0% fat / 8.5% SNF — a realistic Nepali farm-gate
 *    level; replace with your dairy's own rates.
 *  · SNF from a lactometer (field formula, BIS variant):
 *      SNF% = CLR/4 + 0.21 × Fat% + 0.36
 *    (CLR = corrected lactometer reading — verified against Indian dairy
 *    extension texts; coefficients vary slightly by state standard.)
 *  · Quality benchmarks (Nepal DDB / FSSAI-style): fat ≥ 3.5%, SNF ≥ 8.5%.
 *    Good-quality milk reads SNF 8.0–9.0; 1 kg of milk ≈ 40 g fat + 80 g SNF
 *    + 880 g water — so diluted or mastitis-affected milk shows first in SNF.
 * ──────────────────────────────────────────────────────────────────────────── */

const fmt = (v: number, np: boolean, digits = 1) => {
  const s = v.toFixed(digits);
  return np ? toNepaliDigits(s) : s;
};

const num = (s: string) => {
  const v = parseFloat(s);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

export function MilkQualityCalculator({ np }: { np: boolean }) {
  const [fat, setFat] = useState("4.0");
  const [snf, setSnf] = useState("8.5");
  const [snfMode, setSnfMode] = useState<"direct" | "clr">("direct");
  const [clr, setClr] = useState("30");
  const [rateFat, setRateFat] = useState("6.50");
  const [rateSnf, setRateSnf] = useState("4.00");
  const [litres, setLitres] = useState("12");

  const fatV = Math.min(9, num(fat));
  const clrV = Math.min(40, Math.max(20, num(clr)));
  const snfV = snfMode === "clr" ? Math.min(10, Math.max(6, clrV / 4 + 0.21 * fatV + 0.36)) : Math.min(10, num(snf));

  const calc = useMemo(() => {
    const pricePerL = fatV * num(rateFat) + snfV * num(rateSnf);
    const daily = pricePerL * num(litres);
    return { pricePerL, daily, monthly: daily * 30 };
  }, [fatV, snfV, rateFat, rateSnf, litres]);

  const okFat = fatV >= 3.5;
  const okSnf = snfV >= 8.5;
  const grade = okFat && okSnf
    ? { en: "Standard / premium", np: "स्तरीय", cls: "bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/30", Icon: BadgeCheck }
    : okFat || okSnf
      ? { en: "Borderline", np: "सीमान्त", cls: "bg-[#B8941F]/10 text-[#8A6D1F] border-[#B8941F]/30", Icon: TriangleAlert }
      : { en: "Below standard", np: "स्तरमुनि", cls: "bg-[#C0392B]/[0.06] text-[#C0392B] border-[#C0392B]/30", Icon: TriangleAlert };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Milk test inputs */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-1">
          <Milk size={13} aria-hidden="true" />
          {np ? "तपाईंको दुधको रिपोर्ट" : "Your milk test"}
        </p>
        <p className="text-[11px] text-gray-400 mb-4">
          {np ? "डेरी/सहकारीले दिने गरेको बिजुली वा ल्याक्टोमिटर रिडिङ" : "Figures from your dairy's tester or a lactometer"}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">
              {np ? "बोसो (Fat %)" : "Fat %"}
            </Label>
            <Input
              type="number" min={0} max={9} step={0.1} inputMode="decimal"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              className="mt-1.5 text-right font-bold"
              aria-label="fat percent"
            />
          </div>
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">
              {np ? "एसएनएफ (SNF %)" : "SNF %"}
            </Label>
            {snfMode === "direct" ? (
              <Input
                type="number" min={0} max={12} step={0.1} inputMode="decimal"
                value={snf}
                onChange={(e) => setSnf(e.target.value)}
                className="mt-1.5 text-right font-bold"
                aria-label="snf percent"
              />
            ) : (
              <div className="mt-1.5 flex items-center gap-2">
                <Input
                  type="number" min={20} max={40} step={0.5} inputMode="decimal"
                  value={clr}
                  onChange={(e) => setClr(e.target.value)}
                  className="text-right font-bold"
                  aria-label="corrected lactometer reading"
                />
                <span className="text-[11px] font-semibold text-gray-400 whitespace-nowrap">CLR →</span>
                <span className="font-bold text-[#0A2540] bg-[#D4AF37]/10 rounded-lg px-2.5 py-2 text-sm">
                  {fmt(snfV, np, 2)}
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSnfMode((m) => (m === "direct" ? "clr" : "direct"))}
          className="mt-3 text-[11px] font-semibold text-[#B8941F] hover:text-[#8A6D1F] inline-flex items-center gap-1"
        >
          <Calculator size={11} aria-hidden="true" />
          {snfMode === "direct"
            ? np ? "ल्याक्टोमिटर (CLR) बाट एसएनएफ निकाल्नुहोस्" : "Compute SNF from a lactometer (CLR)"
            : np ? "सिधै SNF % भर्नुहोस्" : "Enter SNF % directly"}
        </button>
        {snfMode === "clr" && (
          <p className="mt-1.5 text-[10px] text-gray-400 leading-relaxed">
            {np ? "सूत्र: SNF = CLR÷४ + ०.२१×बोसो + ०.३६" : "Formula: SNF = CLR/4 + 0.21×Fat + 0.36"}
          </p>
        )}
      </div>

      {/* Quality grade */}
      <div className={`rounded-2xl border-2 p-5 ${grade.cls}`}>
        <div className="flex items-center gap-3">
          <grade.Icon size={22} aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm font-bold">
              {np ? grade.np : grade.en}
              <span className="ml-2 font-mono font-semibold text-xs opacity-80">
                {np ? `बोसो ${fmt(fatV, np)}% · SNF ${fmt(snfV, np)}%` : `fat ${fmt(fatV, np)}% · SNF ${fmt(snfV, np)}%`}
              </span>
            </p>
            <p className="text-xs opacity-80 mt-0.5 leading-relaxed">
              {np
                ? "स्तरीय दुध: बोसो ≥ ३.५%, SNF ≥ ८.५% (डीडीबी मापदण्ड शैली)"
                : "Standard milk: fat ≥ 3.5%, SNF ≥ 8.5% (DDB-style benchmarks)"}
            </p>
          </div>
        </div>
        {(!okFat || !okSnf) && (
          <ul className="mt-3 space-y-1.5 text-xs leading-relaxed opacity-90">
            {!okSnf && (
              <li className="flex gap-1.5">
                <Droplets size={12} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                {np
                  ? "SNF कम = पानी मिसाएको, थन संक्रमण (म्यास्टाइटिस), वा दाना/खनिज कम — सुक्खा घाँसमा पानी नै पर्याप्त पिलाउनुहोस्।"
                  : "Low SNF = added water, mastitis, or concentrate/mineral shortfall — check water access on dry fodder too."}
              </li>
            )}
            {!okFat && (
              <li className="flex gap-1.5">
                <Info size={12} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                {np
                  ? "बोसो गाईको नस्ल, यात्राचक्र र चाराको रेशामा भर पर्छ — राम्रो घाँस/सानो दानाले सुधार्छ।"
                  : "Fat follows breed, lactation stage and fibre quality — good roughage and balanced concentrate lift it."}
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Payment */}
      <div className="rounded-2xl border-2 border-[#D4AF37]/40 bg-[#D4AF37]/[0.06] p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#B8941F] mb-1">
          {np ? "दुध भुक्तानी" : "Milk payment"}
        </p>
        <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
          {np
            ? "दुई-धुरी सूत्र: प्रति-लिटर मूल्य = बोसो% × A + SNF% × B — डेरीको दर आफू राख्नुहोस्"
            : "Two-axis formula: price/litre = Fat% × A + SNF% × B — enter your dairy's own rates"}
        </p>
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <div>
            <Label className="text-[10px] font-bold uppercase text-gray-400">{np ? "A · बोसो दर" : "A · fat rate"}</Label>
            <Input type="number" min={0} step={0.25} inputMode="decimal" value={rateFat}
              onChange={(e) => setRateFat(e.target.value)}
              className="mt-1 text-right font-bold text-sm" aria-label="fat rate per point" />
          </div>
          <div>
            <Label className="text-[10px] font-bold uppercase text-gray-400">{np ? "B · SNF दर" : "B · SNF rate"}</Label>
            <Input type="number" min={0} step={0.25} inputMode="decimal" value={rateSnf}
              onChange={(e) => setRateSnf(e.target.value)}
              className="mt-1 text-right font-bold text-sm" aria-label="snf rate per point" />
          </div>
          <div>
            <Label className="text-[10px] font-bold uppercase text-gray-400">{np ? "लिटर/दिन" : "litres/day"}</Label>
            <Input type="number" min={0} inputMode="decimal" value={litres}
              onChange={(e) => setLitres(e.target.value)}
              className="mt-1 text-right font-bold text-sm" aria-label="litres per day" />
          </div>
        </div>

        <div className="rounded-xl bg-white border border-[#D4AF37]/30 p-4 text-center">
          <motion.p key={calc.pricePerL.toFixed(1)} initial={{ scale: 0.97, opacity: 0.7 }} animate={{ scale: 1, opacity: 1 }}
            className="font-display text-3xl font-bold text-[#0A2540]">
            {np ? "रु" : "Rs"} {fmt(calc.pricePerL, np, 2)}
            <span className="text-sm font-semibold text-gray-400 ml-1">/ L</span>
          </motion.p>
          <p className="text-[11px] text-gray-400 mt-1 font-mono">
            {np
              ? `${fmt(fatV, np)} × ${num(rateFat).toFixed(2)} + ${fmt(snfV, np, 2)} × ${num(rateSnf).toFixed(2)}`
              : `${fmt(fatV, np)} × ${num(rateFat).toFixed(2)} + ${fmt(snfV, np, 2)} × ${num(rateSnf).toFixed(2)}`}
          </p>
          <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-[#0A2540]">{np ? "रु" : "Rs"} {fmt(calc.daily, np, 0)}</p>
              <p className="text-[10px] font-semibold uppercase text-gray-400">{np ? "दैनिक" : "per day"}</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#0A2540] flex items-center justify-center gap-1">
                <CalendarDays size={13} className="text-[#B8941F]" aria-hidden="true" />
                {np ? "रु" : "Rs"} {fmt(calc.monthly, np, 0)}
              </p>
              <p className="text-[10px] font-semibold uppercase text-gray-400">{np ? "मासिक (३० दिन)" : "per month (30 d)"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reference facts */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-3">
          {np ? "थाहा पाइरहनुहोस्" : "Good to know"}
        </p>
        <ul className="space-y-2 text-[13px] text-gray-700 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-[#B8941F] mt-0.5" aria-hidden="true">•</span>
            {np
              ? "१ किलो दुध भनेको ~४० ग्राम बोसो + ८० ग्राम SNF + ८८० ग्राम पानी — SNF घट्नु भनेको त्यही कडा पदार्थ घटेको हो।"
              : "1 kg of milk ≈ 40 g fat + 80 g SNF + 880 g water — a falling SNF means that solid fraction is genuinely dropping."}
          </li>
          <li className="flex gap-2">
            <span className="text-[#B8941F] mt-0.5" aria-hidden="true">•</span>
            {np
              ? "राम्रो दुधको SNF ८.०–९.०% हुन्छ; नेपालका सहकारीहरू बोसो-SNF दुवै हेरेर भुक्तानी गर्छन्।"
              : "Good-quality milk reads SNF 8.0–9.0%; Nepali cooperatives pay on both fat and SNF."}
          </li>
          <li className="flex gap-2">
            <span className="text-[#B8941F] mt-0.5" aria-hidden="true">•</span>
            {np
              ? "उत्पादन बढाउने पक्षमा थप: सफा थन, खुट्टा धुने, चाप नभएको खर (प्रति-लिटर बोसो जोगिन्छ)।"
              : "At the farm end: clean udder, dry hands, and unsoiled teats protect the fat test itself."}
          </li>
        </ul>
      </div>

      <ResultCardActions
        np={np}
        toolId="milktest"
        label={np ? "दुध गुणस्तर तथा भुक्तानी" : "Milk quality & payment"}
        summary={np
          ? `रु ${fmt(calc.pricePerL, np, 2)}/L — बोसो ${fmt(fatV, np)}%, SNF ${fmt(snfV, np, 1)}% (${grade.np})`
          : `Rs ${fmt(calc.pricePerL, np, 2)}/L — fat ${fmt(fatV, np)}%, SNF ${fmt(snfV, np, 1)}% (${grade.en})`}
        detail={np
          ? `दुई-धुरी: ${fmt(fatV, np)}×${num(rateFat).toFixed(2)} + ${fmt(snfV, np, 2)}×${num(rateSnf).toFixed(2)} · मासिक रु ${fmt(calc.monthly, np, 0)}`
          : `Two-axis: ${fmt(fatV, np)}×${num(rateFat).toFixed(2)} + ${fmt(snfV, np, 2)}×${num(rateSnf).toFixed(2)} · Rs ${fmt(calc.monthly, np, 0)}/month`}
      />
    </div>
  );
}
