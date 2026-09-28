import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Droplets, TriangleAlert, Info, CheckCircle2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/* ─────────────────────────────────────────────────────────────────────────────
 *  CMT UDDER CHECK — score the four quarters, see the cost.
 *
 *  Verified reference figures:
 *  · CMT scored 0 / Trace / 1 / 2 / 3 — a distinct gel (2–3) is positive;
 *    the reaction becomes visible at roughly ≥400,000 somatic cells/mL
 *    (California Mastitis Test references; Wikipedia CMT scale).
 *  · Nepal subclinical mastitis prevalence ≈30–46% of dairy animals
 *    (Dhakal, Chitwan cattle ~30%; Lamjung survey 46.1%).
 *  · Milk-loss bands below are conservative field estimates drawn from
 *    published SCC-vs-yield relationships (high SCC reduces yield and
 *    triggers price penalties — Teagasc/NMC guidance); they are INDICATIVE,
 *    not a diagnosis.
 * ──────────────────────────────────────────────────────────────────────────── */

type Score = "n" | "t" | "1" | "2" | "3";

const SCORES: { id: Score; en: string; np: string; scc: string; lossLow: number; lossHigh: number; cls: string; bar: string }[] = [
  { id: "n", en: "Negative", np: "नेगेटिभ", scc: "< ~200k", lossLow: 0, lossHigh: 0, cls: "bg-emerald-50 border-emerald-200 text-emerald-800", bar: "bg-emerald-500" },
  { id: "t", en: "Trace", np: "ट्रेस", scc: "~200–400k", lossLow: 0, lossHigh: 5, cls: "bg-lime-50 border-lime-200 text-lime-800", bar: "bg-lime-500" },
  { id: "1", en: "1 — weak gel", np: "१ — हल्का जेल", scc: "~400k–1M", lossLow: 5, lossHigh: 10, cls: "bg-amber-50 border-amber-200 text-amber-800", bar: "bg-amber-500" },
  { id: "2", en: "2 — distinct gel", np: "२ — स्पष्ट जेल", scc: "~1–5M", lossLow: 15, lossHigh: 20, cls: "bg-orange-50 border-orange-200 text-orange-800", bar: "bg-orange-500" },
  { id: "3", en: "3 — near-solid", np: "३ — जमेको", scc: "> ~5M", lossLow: 25, lossHigh: 30, cls: "bg-red-50 border-red-200 text-red-800", bar: "bg-red-500" },
];

const scoreDef = (s: Score) => SCORES.find((x) => x.id === s) ?? SCORES[0];

const fmt = (v: number, np: boolean, digits = 1) => {
  const s = v.toFixed(digits);
  return np ? toNepaliDigits(s) : s;
};

const num = (s: string) => {
  const v = parseFloat(s);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

const QUARTERS: { key: "lf" | "rf" | "lr" | "rr"; en: string; np: string }[] = [
  { key: "lf", en: "Left front", np: "बायाँ अगाडि" },
  { key: "rf", en: "Right front", np: "दायाँ अगाडि" },
  { key: "lr", en: "Left rear", np: "बायाँ पछाडि" },
  { key: "rr", en: "Right rear", np: "दायाँ पछाडि" },
];

export function CMTMastitis({ np }: { np: boolean }) {
  const [quarters, setQuarters] = useState<Record<string, Score>>({ lf: "n", rf: "t", lr: "n", rr: "n" });
  const [yieldL, setYieldL] = useState("10");

  const calc = useMemo(() => {
    const defs = QUARTERS.map((q) => ({ ...q, def: scoreDef(quarters[q.key]) }));
    // Each quarter carries ~1/4 of yield; quarter-level loss → cow-level loss
    const lossLow = defs.reduce((a, d) => a + d.def.lossLow, 0) / 4;
    const lossHigh = defs.reduce((a, d) => a + d.def.lossHigh, 0) / 4;
    const y = num(yieldL);
    const worst = defs.slice().sort((a, b) => SCORES.findIndex((s) => s.id === b.def.id) - SCORES.findIndex((s) => s.id === a.def.id))[0];
    const positiveCount = defs.filter((d) => d.def.id === "2" || d.def.id === "3").length;
    return { defs, lossLow, lossHigh, y, lossLowL: (y * lossLow) / 100, lossHighL: (y * lossHigh) / 100, worst, positiveCount };
  }, [quarters, yieldL]);

  const adviceFor = (worstId: Score) => {
    switch (worstId) {
      case "2":
      case "3":
        return {
          en: "Clearly positive quarter(s): milk from these quarters LAST or into a separate pail, mark the cow, and discuss lactation treatment or dry-cow therapy with your veterinarian. Re-test the herd monthly — Nepal studies find roughly 30–46% of dairy animals positive.",
          np: "स्पष्ट पोजेटिभ थन(हरू): यी थन अन्तिममा वा छुट्टै बाल्टिनमा दुहुनुहोस्, गाईमा चिनो लगाउनुहोस्, र दुध-दिइरहँदा उपचार कि सुकाउने-बेलाको उपचार भन्नेमा पशु चिकित्सकसँग कुरा गर्नुहोस्। बथान महिनैमा फेरि जाँच्नुहोस् — नेपालका अध्ययनले ३०–४६% डेयरी पशु पोजेटिभ पाउँछन्।",
        };
      case "1":
        return {
          en: "Watch and re-test in two weeks: fix milking order (positive quarters last), post-milking teat dipping, and dry bedding first — hygiene often clears a score of 1 without any medicine.",
          np: "हेरिराख्नुहोस्, दुई हप्तामा फेरि जाँच्नुहोस्: दुहुने क्रम मिलाउनुहोस् (पोजेटिभ थन अन्तिम), दुहुनेपछि थन-डिप, र सुक्खा ओछ्यान पहिले — सरसफाइले नै प्रायः १ अङ्क सफा पार्छ, औषधिविना।",
        };
      case "t":
        return {
          en: "Trace reactions are common and borderline — usually hygiene, not treatment. Keep the five-point plan running: teat dip, dry bedding, dry-cow treatment at drying-off, cull chronic cows, machine service.",
          np: "ट्रेस प्रतिक्रिया सामान्य र सीमान्त हो — प्रायः औषधि होइन, सरसफाइको कुरा। पाँच-बुँदा योजना चलाइराख्नुहोस्: थन-डिप, सुक्खा ओछ्यान, सुकाउँदा उपचार, बारम्बार बल्झिने गाई बेच्नु, मेसिन मर्मत।",
        };
      default:
        return {
          en: "Clean sheet — keep it that way: post-milking teat dip, one cloth per cow, dry bedding, and a monthly paddle check. That routine is worth more than any bottle.",
          np: "सफा नतिजा — यस्तै राख्नुहोस्: दुहुनेपछि थन-डिप, प्रति गाई एक कपडा, सुक्खा ओछ्यान, र महिनौँ प्याडल जाँच। यो अभ्यास कुनै बोतलभन्दा बढी मूल्यको हुन्छ।",
        };
    }
  };
  const advice = adviceFor(calc.worst.def.id);

  return (
    <div className="max-w-2xl space-y-6">
      {/* Quarter grid */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-1">
          <Droplets size={13} aria-hidden="true" />
          {np ? "चार थनको CMT अङ्क" : "CMT score per quarter"}
        </p>
        <p className="text-[11px] text-gray-400 mb-4">
          {np
            ? "हरेक थनको प्याडल-नतिजा छान्नुहोस् — प्रतिक्रिया जति बाक्लो, अङ्क त्यति ठूलो"
            : "Pick each quarter's paddle result — the thicker the gel, the higher the score"}
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {calc.defs.map((q) => (
            <div key={q.key} className="rounded-xl border border-gray-100 bg-gray-50/60 p-3.5">
              <p className="text-xs font-bold text-[#0A2540] mb-2">{np ? q.np : q.en}</p>
              <div className="grid grid-cols-5 gap-1">
                {SCORES.map((s) => {
                  const active = quarters[q.key] === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setQuarters((prev) => ({ ...prev, [q.key]: s.id }))}
                      aria-pressed={active}
                      title={`${s.en} · ${s.scc}`}
                      className={`py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                        active ? `${s.cls} border-current shadow-sm scale-105` : "bg-white border-gray-200 text-gray-400 hover:border-[#D4AF37]/50"
                      }`}
                    >
                      {s.id === "n" ? (np ? "०" : "0") : s.id === "t" ? (np ? "T" : "T") : np ? toNepaliDigits(s.id) : s.id}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-gray-500 mt-2 leading-snug">
                {np ? q.def.np : q.def.en} · SCC {q.def.scc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Label className="text-[13px] font-semibold text-[#0A2540]">
            {np ? "गाईको दैनिक दुध (लिटर)" : "Cow's daily milk (litres)"}
          </Label>
          <Input
            type="number" inputMode="decimal" min={0} step={0.5}
            value={yieldL} onChange={(e) => setYieldL(e.target.value)}
            className="mt-1 w-32 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
          />
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6 shadow-xl">
        <p className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
          <TriangleAlert size={14} />
          {np ? "अनुमानित दुध-हानि" : "Estimated milk loss"}
        </p>

        <motion.div
          key={`${calc.lossLow}-${calc.lossHigh}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl sm:text-5xl font-bold leading-none"
        >
          {calc.lossLow === 0 && calc.lossHigh === 0 ? (np ? "०%" : "0%") : `${fmt(calc.lossLow, np, 0)}–${fmt(calc.lossHigh, np, 0)}%`}
        </motion.div>
        <p className="text-sm text-gray-400 mt-2">
          {calc.lossLow === 0 && calc.lossHigh === 0
            ? (np ? "यो गाईको थन अहिले सफा देखिन्छ" : "This udder reads clean right now")
            : np
              ? `दिनको ${fmt(calc.lossLowL, np, 1)}–${fmt(calc.lossHighL, np, 1)} लिटर — बेच्नै पुग्ने दुध चुपचाप जाँदै`
              : `${fmt(calc.lossLowL, np, 1)}–${fmt(calc.lossHighL, np, 1)} litres/day quietly leaving the pail`}
        </p>
        {calc.positiveCount > 0 && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-400/30 px-3 py-1 text-xs font-semibold text-red-200">
            {np ? `${toNepaliDigits(String(calc.positiveCount))} थन स्पष्ट पोजेटिभ (२ वा ३)` : `${calc.positiveCount} quarter(s) clearly positive (2 or 3)`}
          </p>
        )}

        <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1.5">
            <CheckCircle2 size={13} aria-hidden="true" />
            {np ? "अर्को कदम" : "Next step"}
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">{np ? advice.np : advice.en}</p>
        </div>

        <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
          {np
            ? "हानि-दायरा SCC-उत्पादन सम्बन्धका प्रकाशित अध्ययनबाट निकालिएका सतर्क अनुमान हुन् — निदान होइन। CMT प्रतिक्रिया लगभग ४ लाख कोशिका/मि.लि. देखि देखिन्छ।"
            : "Loss bands are conservative estimates from published SCC-vs-yield studies — not a diagnosis. The CMT reaction becomes visible from roughly 400,000 cells/mL."}
        </p>

        <div className="mt-4">
          <ResultCardActions
            np={np}
            toolId="cmt"
            label={np ? "CMT थन-जाँच" : "CMT udder check"}
            summary={np
              ? `थन: ${calc.defs.map((d) => d.def.id.toUpperCase()).join(" · ")} — अनुमानित हानि ${calc.lossLow === 0 && calc.lossHigh === 0 ? "०" : `${fmt(calc.lossLow, np, 0)}–${fmt(calc.lossHigh, np, 0)}`}%`
              : `Quarters: ${calc.defs.map((d) => d.def.id.toUpperCase()).join(" · ")} — est. loss ${calc.lossLow === 0 && calc.lossHigh === 0 ? "0" : `${fmt(calc.lossLow, np, 0)}–${fmt(calc.lossHigh, np, 0)}`}%`}
            detail={(np
              ? `CMT: LF ${calc.defs[0].def.np} · RF ${calc.defs[1].def.np} · LR ${calc.defs[2].def.np} · RR ${calc.defs[3].def.np}\n`
              : `CMT: LF ${calc.defs[0].def.en} · RF ${calc.defs[1].def.en} · LR ${calc.defs[2].def.en} · RR ${calc.defs[3].def.en}\n`
            ) + (
              np
                ? `अनुमानित हानि: ${fmt(calc.lossLow, np, 0)}–${fmt(calc.lossHigh, np, 0)}% (${fmt(calc.lossLowL, np, 1)}–${fmt(calc.lossHighL, np, 1)} लि./दिन)\ndrmogalshah.com.np/tools/cmt`
                : `Estimated loss: ${fmt(calc.lossLow, np, 0)}–${fmt(calc.lossHigh, np, 0)}% (${fmt(calc.lossLowL, np, 1)}–${fmt(calc.lossHighL, np, 1)} L/day)\ndrmogalshah.com.np/tools/cmt`
            )}
          />
        </div>
      </div>

      {/* Scale legend */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-3">
          <Info size={13} aria-hidden="true" />
          {np ? "CMT तालिका" : "The CMT scale"}
        </p>
        <div className="space-y-2">
          {SCORES.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className={`w-16 text-center py-1 rounded-lg text-[11px] font-bold border ${s.cls}`}>
                {s.id === "n" ? (np ? "०" : "0") : s.id === "t" ? "T" : np ? toNepaliDigits(s.id) : s.id}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#0A2540]">{np ? s.np : s.en}</p>
                <p className="text-[11px] text-gray-500">{np ? "कोशिका" : "cells"} {s.scc}/mL</p>
              </div>
              <span className="text-[11px] text-gray-400 flex-shrink-0">
                {s.lossHigh === 0 ? (np ? "हानि नगण्य" : "no loss") : `-${s.lossLow}–${s.lossHigh}%`}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed mt-4">
          {np
            ? "स्रोत: CMT ०–३ अङ्क र ~४ लाख कोशिका/मि.लि. प्रतिक्रिया-सीमा (CMT सन्दर्भ); नेपालमा अलक्षित थनरोग ३०–४६% (चितवन ~३०%, लमजुङ ४६.१%); नियन्त्रण योजना National Mastitis Council।"
            : "Sources: CMT 0–3 scale, ~400k cells/mL reaction threshold (CMT references); Nepal subclinical mastitis 30–46% (Chitwan ~30%, Lamjung 46.1%); five-point control plan per National Mastitis Council."}
        </p>
      </div>
    </div>
  );
}
