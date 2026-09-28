import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Milk, Baby, CalendarDays, CheckCircle2, Info } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/* ─────────────────────────────────────────────────────────────────────────────
 *  CALF FEEDING PLANNER — colostrum first, then milk on a step-down ladder.
 *
 *  Verified reference figures:
 *  · Colostrum: 10% of body weight within the first 6–12 h; ≥4 L for a
 *    45-kg calf; quality ≥50 g IgG/L ≈ Brix ≥22%; gut closure ≈24 h
 *    (Cornell / McGill / Penn State calf-care SOPs).
 *  · Whole milk at ~10% of body weight per day, split across two feeds
 *    (Cornell Liquid Feed Management; Palczynski et al. 2020).
 *  · Step-down weaning: reduce milk over the last ~2–3 weeks and wean at
 *    8–12 weeks once calf starter reaches ~0.7–1 kg/day (PSU, Cornell).
 * ──────────────────────────────────────────────────────────────────────────── */

const fmt = (v: number, np: boolean, digits = 1) => {
  const s = v.toFixed(digits);
  return np ? toNepaliDigits(s) : s;
};

const num = (s: string) => {
  const v = parseFloat(s);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

/** Step-down milk ladder as a share of full daily milk, weeks 1..8. */
const LADDER = [1, 1, 1, 1, 1, 0.75, 0.5, 0.25] as const;

export function CalfPlanner({ np }: { np: boolean }) {
  const [species, setSpecies] = useState<"cow" | "buffalo">("cow");
  const [weight, setWeight] = useState("28");
  const [weaning, setWeaning] = useState<8 | 10>(8);
  const [milkPrice, setMilkPrice] = useState("65");

  const bw = num(weight) || 25;

  const plan = useMemo(() => {
    const colostrum = bw * 0.1; // litres, first 12 h
    const daily = bw * 0.1; // litres/day full feeding
    const weeks = Array.from({ length: weaning }, (_, i) => {
      const share = i < LADDER.length ? LADDER[i] : LADDER[LADDER.length - 1];
      return { week: i + 1, share, litres: daily * share };
    });
    const totalMilk = weeks.reduce((a, w) => a + w.litres * 7, 0);
    const cost = (totalMilk * num(milkPrice)) / 1;
    return { colostrum, daily, weeks, totalMilk, cost };
  }, [bw, weaning, milkPrice]);

  const NP_MONTHS: Record<string, string> = {
    "01": "जनवरी", "02": "फेब्रुअरी", "03": "मार्च", "04": "अप्रिल", "05": "मे", "06": "जुन",
    "07": "जुलाई", "08": "अगस्ट", "09": "सेप्टेम्बर", "10": "अक्टोबर", "11": "नोभेम्बर", "12": "डिसेम्बर",
  };
  const weekDate = (week: number) => {
    const d = new Date();
    d.setDate(d.getDate() + (week - 1) * 7);
    return d.toLocaleDateString(np ? "ne-NP" : "en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Inputs */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-1">
          <Baby size={13} aria-hidden="true" />
          {np ? "नयाँ बच्चा" : "The newborn"}
        </p>
        <p className="text-[11px] text-gray-400 mb-4">
          {np ? "जन्मेको तौल लेख्नुहोस् — पूरै योजना त्यहीँबाट बन्छ" : "Enter the birth weight — the whole plan builds from it"}
        </p>

        <div className="flex gap-2 mb-4">
          {([["cow", "Calf (cow)", "बछडा (गाई)"], ["buffalo", "Calf (buffalo)", "बछडा (भैंसी)"]] as const).map(([id, en, npLbl]) => (
            <button
              key={id}
              type="button"
              onClick={() => { setSpecies(id); setWeight(id === "buffalo" ? "34" : "28"); }}
              aria-pressed={species === id}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                species === id
                  ? "bg-[#0A2540] text-white border-[#0A2540] shadow"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/60"
              }`}
            >
              {np ? npLbl : en}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">{np ? "जन्मेको तौल (केजी)" : "Birth weight (kg)"}</Label>
            <Input
              type="number" inputMode="decimal" min={15} max={60} step={0.5}
              value={weight} onChange={(e) => setWeight(e.target.value)}
              className="mt-1 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
          </div>
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">{np ? "छुटाउने हप्ता" : "Weaning week"}</Label>
            <div className="flex gap-1.5 mt-1">
              {([8, 10] as const).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWeaning(w)}
                  aria-pressed={weaning === w}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                    weaning === w
                      ? "bg-[#D4AF37]/20 text-[#0A2540] border-[#D4AF37]/60"
                      : "text-gray-500 border-gray-200 hover:border-[#D4AF37]/40"
                  }`}
                >
                  {fmt(w, np, 0)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">{np ? "दुध भाउ (रु/लि)" : "Milk price (Rs/L)"}</Label>
            <Input
              type="number" inputMode="decimal" min={0} step={1}
              value={milkPrice} onChange={(e) => setMilkPrice(e.target.value)}
              className="mt-1 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Colostrum card — the clock card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6 shadow-xl">
        <p className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
          <Milk size={14} />
          {np ? "पहिलो १२ घण्टा — खीर" : "First 12 hours — colostrum"}
        </p>
        <motion.div
          key={plan.colostrum}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl font-bold leading-none"
        >
          {fmt(plan.colostrum, np, 1)}
          <span className="text-xl text-gray-400 font-semibold ml-2">{np ? "लिटर कुल" : "litres total"}</span>
        </motion.div>
        <p className="text-sm text-gray-400 mt-2">
          {np
            ? `दुई पटकमा — पहिलो खुराक जन्मेको २ घण्टाभित्र, बाँकी १२ घण्टाभित्र`
            : `split into two feeds — first within 2 h of birth, the rest within 12 h`}
        </p>
        <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4">
          <p className="text-sm text-gray-300 leading-relaxed">
            {np
              ? "गुणस्तर जाँच: ब्रिक्स रिफ्र्याक्टोमिटरमा २२ वा माथि पढे मात्र राम्रो खीर मानिन्छ — तल पढे बढी परिमाण दिनुहोस्। २४ घण्टापछि आन्द्राको ढोका बन्दिन्छ, त्यसपछि एन्टिबडी पचिन्छ, सोसिँदैन।"
              : "Quality check: a Brix refractometer reading 22 or above counts as good colostrum — below that, feed more volume. The gut door closes by ~24 h; after that antibodies are digested, not absorbed."}
          </p>
        </div>
      </div>

      {/* Week ladder table */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-1">
          <CalendarDays size={13} aria-hidden="true" />
          {np ? "दुध पात्रो — दिनको लिटर" : "Milk ladder — litres per day"}
        </p>
        <p className="text-[11px] text-gray-400 mb-4">
          {np
            ? "पूरा दिनको दुध शरीरको १०% — दुई पटकमा। पछिल्ला हप्ता घटाउँदै स्टार्टर दानाले ठाउँ लिन्छ।"
            : "Full milk = 10% of body weight, in two feeds. The step-down hands over to calf starter."}
        </p>

        <div className="space-y-1.5">
          {plan.weeks.map((w) => {
            const pct = Math.round(w.share * 100);
            const isNow = w.week === 1;
            return (
              <div
                key={w.week}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 ${isNow ? "bg-[#D4AF37]/10 border border-[#D4AF37]/30" : "bg-gray-50 border border-gray-100"}`}
              >
                <span className="w-14 text-xs font-bold text-[#0A2540] flex-shrink-0">
                  {np ? `हप्ता ${toNepaliDigits(String(w.week))}` : `Week ${w.week}`}
                </span>
                <div className="flex-1 h-6 rounded-lg bg-gray-200/70 overflow-hidden" role="img" aria-label={`${pct}%`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#0A2540] to-[#4C7FB5]"
                  />
                </div>
                <span className="w-20 text-right text-sm font-bold text-[#0A2540] flex-shrink-0">
                  {fmt(w.litres, np, 1)} {np ? "लि./दिन" : "L/day"}
                </span>
                <span className="hidden sm:block w-16 text-right text-[11px] text-gray-400 flex-shrink-0">{weekDate(w.week)}</span>
              </div>
            );
          })}
          <div className="flex items-center gap-3 rounded-xl px-3 py-2 bg-emerald-50 border border-emerald-200">
            <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs font-semibold text-emerald-800">
              {np
                ? `हप्ता ${toNepaliDigits(String(weaning + 1))} — छुटाइन्छ, जब स्टार्टर दिनको ~१ केजी पुग्छ`
                : `Week ${weaning + 1} — wean, once starter reaches ~1 kg/day`}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#0A2540]/[0.04] border border-[#0A2540]/10 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{np ? "कुल दुध (छुटाउनेसम्म)" : "Total milk to weaning"}</p>
            <p className="font-display text-xl font-bold text-[#0A2540] mt-1">{fmt(plan.totalMilk, np, 0)} {np ? "लिटर" : "litres"}</p>
          </div>
          <div className="rounded-xl bg-[#0A2540]/[0.04] border border-[#0A2540]/10 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{np ? "दुधको मूल्य" : "Milk value"}</p>
            <p className="font-display text-xl font-bold text-[#0A2540] mt-1">
              {np ? `रु. ${toNepaliDigits(plan.cost.toFixed(0))}` : `Rs ${plan.cost.toFixed(0)}`}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <ResultCardActions
            np={np}
            toolId="calf"
            label={np ? "बछडा दुध योजना" : "Calf milk plan"}
            summary={np
              ? `${fmt(bw, np, 1)} केजी बछडा — खीर ${fmt(plan.colostrum, np, 1)} लि./१२ घण्टा, दुध ${fmt(plan.daily, np, 1)} लि./दिन, ${fmt(weaning, np, 0)} हप्तामा छुटाइन्छ`
              : `${fmt(bw, np, 1)} kg calf — colostrum ${fmt(plan.colostrum, np, 1)} L/12 h, milk ${fmt(plan.daily, np, 1)} L/day, wean at ${fmt(weaning, np, 0)} weeks`}
            detail={(np
              ? `जन्मेको तौल ${fmt(bw, np, 1)} केजी\nखीर (१२ घण्टाभित्र): ${fmt(plan.colostrum, np, 1)} लिटर\nदैनिक दुध: ${fmt(plan.daily, np, 1)} लि./दिन (१०% तौल)\nकुल दुध ${fmt(weaning, np, 0)} हप्तासम्म: ${fmt(plan.totalMilk, np, 0)} लिटर\ndrmogalshah.com.np/tools/calf`
              : `Birth weight ${fmt(bw, np, 1)} kg\nColostrum (within 12 h): ${fmt(plan.colostrum, np, 1)} L\nDaily milk: ${fmt(plan.daily, np, 1)} L/day (10% of BW)\nTotal milk to week ${fmt(weaning, np, 0)}: ${fmt(plan.totalMilk, np, 0)} L\ndrmogalshah.com.np/tools/calf`)}
          />
        </div>
      </div>

      {/* Reference */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-3">
          <Info size={13} aria-hidden="true" />
          {np ? "स्रोत" : "Sources"}
        </p>
        <p className="text-[13px] text-gray-600 leading-relaxed">
          {np
            ? "खीर १०% तौल / ६–१२ घण्टा, गुणस्तर ब्रिक्स ≥२२, आन्द्रा ~२४ घण्टामा बन्द — Cornell / McGill / Penn State बछडा-सम्बन्धी SOP। दुध १०% तौल प्रति दिन र स्टेप-डाउन छुटाइ — Cornell Liquid Feed Management; Palczynski et al. 2020 (Animals)।"
            : "Colostrum 10% of BW in 6–12 h, quality Brix ≥22, gut closure ~24 h — Cornell / McGill / Penn State calf SOPs. Milk at 10% of BW daily and step-down weaning — Cornell Liquid Feed Management; Palczynski et al. 2020 (Animals)."}
        </p>
      </div>
    </div>
  );
}
