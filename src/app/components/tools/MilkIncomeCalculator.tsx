import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Wallet, Info } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/**
 * DAIRY INCOME CALCULATOR — the arithmetic of a small dairy.
 *
 * Milk price benchmarks (verified 2026): raw farm-gate milk NPR 55–70/L
 * (farmers' federations demand a NPR 70 minimum); retail buffalo milk
 * NPR 80–120/L; feed eats 60–70% of dairy costs. All inputs are editable —
 * enter the rate YOUR dairy actually pays.
 */

function Np({ v, np }: { v: number; np: boolean }) {
  const s = Math.round(v).toLocaleString("en-IN");
  return <>{np ? toNepaliDigits(s) : s}</>;
}

export function MilkIncomeCalculator({ np }: { np: boolean }) {
  const [animals, setAnimals] = useState(2);
  const [litres, setLitres] = useState(5);
  const [price, setPrice] = useState(65);
  const [feedCost, setFeedCost] = useState(300);
  const [otherCost, setOtherCost] = useState(2500);

  const r = useMemo(() => {
    const dayL = animals * litres;
    const monthL = dayL * 30;
    const grossMonth = monthL * price;
    const feedMonth = animals * feedCost * 30;
    const otherMonth = otherCost;
    const netMonth = grossMonth - feedMonth - otherMonth;
    const netYear = netMonth * 12;
    const costPerL = monthL > 0 ? (feedMonth + otherMonth) / monthL : 0;
    const marginPerL = price - costPerL;
    const breakEven = costPerL;
    return { dayL, monthL, grossMonth, feedMonth, otherMonth, netMonth, netYear, costPerL, marginPerL, breakEven };
  }, [animals, litres, price, feedCost, otherCost]);

  const rows: { label: string; value: number; strong?: boolean; tone?: "good" | "bad" }[] = [
    { label: np ? "मासिक दुध बिक्री (कुल)" : "Gross milk income (monthly)", value: r.grossMonth },
    { label: np ? "चाराको खर्च" : "Feed cost", value: r.feedMonth, tone: "bad" },
    { label: np ? "अन्य खर्च" : "Other costs", value: r.otherMonth, tone: "bad" },
    { label: np ? "कुल नाफा (मासिक)" : "Net margin (monthly)", value: r.netMonth, strong: true, tone: r.netMonth >= 0 ? "good" : "bad" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "दुध दिने पशुको संख्या" : "Milking animals"}
            </Label>
            <Input
              type="number" min={1} max={200} value={animals}
              onChange={(e) => setAnimals(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "पशु संख्या" : "Number of animals"}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "औसत लिटर प्रति पशु/दिन" : "Average litres / animal / day"}
            </Label>
            <Input
              type="number" min={0} max={40} step={0.5} value={litres}
              onChange={(e) => setLitres(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "दैनिक लिटर" : "Litres per day"}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "दुध भाउ (रु./लिटर)" : "Milk price (NPR/L)"}
            </Label>
            <Input
              type="number" min={0} max={200} value={price}
              onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "दुधको भाउ" : "Milk price"}
            />
            <p className="text-[11px] text-gray-400 mt-1 leading-snug">
              {np ? "खेतैको कच्चा दुध ५५–७०; बजारमा ८०–१२० — आफ्नो डेयरीको दर हाल्नुहोस्।" : "Raw farm-gate 55–70; retail 80–120 — enter your dairy's actual rate."}
            </p>
          </div>
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "चारा खर्च प्रति पशु/दिन (रु.)" : "Feed cost / animal / day (NPR)"}
            </Label>
            <Input
              type="number" min={0} max={5000} value={feedCost}
              onChange={(e) => setFeedCost(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "दैनिक चारा खर्च" : "Daily feed cost"}
            />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "अन्य मासिक खर्च — औषधि, श्रम, बिजुली (रु.)" : "Other monthly costs — medicine, labour, power (NPR)"}
            </Label>
            <Input
              type="number" min={0} max={200000} value={otherCost}
              onChange={(e) => setOtherCost(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "अन्य खर्च" : "Other costs"}
            />
          </div>
        </div>

        <div className="rounded-xl bg-[#0A2540]/[0.03] border border-[#0A2540]/10 p-4 flex items-start gap-3">
          <Info size={15} className="mt-0.5 text-[#B8941F] flex-shrink-0" />
          <p className="text-xs text-gray-600 leading-relaxed">
            {np
              ? "चाराले दुग्ध खर्चको ६०–७०% खान्छ — यही नाफा तय गर्ने चुङ्गा हो। आफ्नै डेयरीले तिर्ने दर र आफ्नै चाराको खर्च हाल्दा मात्र यो औजारले साँचो चित्र दिन्छ।"
              : "Feed eats 60–70% of dairy costs — it is the lever that decides profit. The tool only tells the truth when you enter the rate your dairy actually pays and what feed actually costs you."}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6 sticky top-24">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-4">
            <Wallet size={13} />
            {np ? "मासिक लेखा" : "Monthly picture"}
          </p>
          <div className="space-y-3">
            {rows.map((row) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 ${
                  row.strong ? "bg-[#D4AF37]/15 border border-[#D4AF37]/30" : "bg-white/[0.06]"
                }`}
              >
                <span className="text-xs text-gray-300 leading-snug">{row.label}</span>
                <motion.span
                  key={row.value}
                  initial={{ scale: 0.96, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`font-display text-lg font-bold whitespace-nowrap ${
                    row.tone === "bad" && !row.strong ? "text-red-300" : row.tone === "bad" ? "text-red-300" : row.strong ? "text-[#D4AF37]" : "text-white"
                  }`}
                >
                  <Np v={row.value} np={np} />
                </motion.span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/15 space-y-2 text-xs text-gray-300">
            <p className="flex justify-between">
              <span>{np ? "वार्षिक नाफा (अनुमान)" : "Yearly net (est.)"}:</span>
              <span className="font-bold text-white">
                रु. <Np v={r.netYear} np={np} />
              </span>
            </p>
            <p className="flex justify-between">
              <span>{np ? "प्रति लिटर लागत" : "Cost per litre"}:</span>
              <span className="font-bold text-white">रु. {np ? toNepaliDigits(r.costPerL.toFixed(1)) : r.costPerL.toFixed(1)}</span>
            </p>
            <p className="flex justify-between">
              <span>{np ? "प्रति लिटर नाफा" : "Margin per litre"}:</span>
              <span className={`font-bold ${r.marginPerL >= 0 ? "text-[#D4AF37]" : "text-red-300"}`}>
                रु. {np ? toNepaliDigits(r.marginPerL.toFixed(1)) : r.marginPerL.toFixed(1)}
              </span>
            </p>
            <p className="flex justify-between">
              <span>{np ? "नोक्सान नहुने भाउ" : "Break-even price"}:</span>
              <span className="font-bold text-white">रु. {np ? toNepaliDigits(r.breakEven.toFixed(1)) : r.breakEven.toFixed(1)}/L</span>
            </p>
            <p className="text-[11px] text-gray-400 leading-snug pt-1">
              {np ? "दिनको " : ""}
              {np ? toNepaliDigits(String(Math.round(r.dayL))) : Math.round(r.dayL)}
              {np ? " लिटर · महिनाको " : " L/day · "}
              {np ? toNepaliDigits(String(Math.round(r.monthL))) : Math.round(r.monthL)}
              {np ? " लिटर" : " L/month"}
            </p>
          </div>

          {/* Save / copy / share / print + recent results */}
          <ResultCardActions
            np={np}
            toolId="dairy"
            label={`${animals} ${np ? "पशु" : "animals"} · ${litres} L/day · रु.${price}/L`}
            summary={`${np ? "मासिक नाफा" : "Monthly net"}: रु. ${r.netMonth.toLocaleString()} (${r.netMonth >= 0 ? "+" : ""})`}
            detail={`${np ? "वार्षिक" : "Yearly"}: रु. ${r.netYear.toLocaleString()} · ${np ? "प्रति लिटर नाफा" : "Margin/L"}: रु. ${r.marginPerL.toFixed(1)} · ${np ? "नोक्सान नहुने भाउ" : "Break-even"}: रु. ${r.breakEven.toFixed(1)}/L`}
          />
        </div>
      </div>
    </div>
  );
}
