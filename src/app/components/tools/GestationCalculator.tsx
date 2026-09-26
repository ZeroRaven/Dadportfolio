import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, RotateCcw, Info } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";

/**
 * Gestation calculator — breeding date + species → expected delivery date.
 *
 * Gestation lengths (days) are the averages published in the Merck
 * Veterinary Manual's "Approximate Gestation Periods" table, plus the
 * buffalo average (~310 d) reported in Nili-Ravi / Murrah research and FAO
 * buffalo production literature, and the 21-day hen egg incubation period.
 */

const SPECIES = [
  { value: "cattle",  en: "Cow",           np: "गाई",           days: 283 },
  { value: "buffalo", en: "Buffalo",       np: "भैंसी",         days: 310 },
  { value: "goat",    en: "Goat",          np: "बाख्रा",         days: 150 },
  { value: "sheep",   en: "Sheep",         np: "भेडा",          days: 147 },
  { value: "pig",     en: "Pig",           np: "सुँगुर",        days: 114 },
  { value: "horse",   en: "Horse / Mule",  np: "घोडा / खच्चर",   days: 340 },
  { value: "dog",     en: "Dog",           np: "कुकुर",         days: 63 },
  { value: "cat",     en: "Cat",           np: "बिरालो",        days: 65 },
  { value: "rabbit",  en: "Rabbit",        np: "खरायो",         days: 31 },
  { value: "hen",     en: "Hen (egg)",     np: "कुखुरा (अन्डा)", days: 21 },
] as const;

/** Dairy practice: start the dry period ~2 months before calving. */
const DRY_OFF_LEAD_DAYS = 60;

function npDate(d: Date, np: boolean): string {
  const s = d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  if (!np) return s;
  // localize digits in the formatted date (keeps month names readable)
  const months: Record<string, string> = {
    Jan: "जनवरी", Feb: "फेब्रुअरी", Mar: "मार्च", Apr: "अप्रिल", May: "मे", Jun: "जुन",
    Jul: "जुलाई", Aug: "अगस्ट", Sep: "सेप्टेम्बर", Oct: "अक्टोबर", Nov: "नोभेम्बर", Dec: "डिसेम्बर",
  };
  return s.replace(/[A-Za-z]+/, (m) => months[m] ?? m).replace(/\d/g, (c) => "०१२३४५६७८९"[Number(c)]);
}

export function GestationCalculator({ np }: { np: boolean }) {
  useLanguage();
  const [species, setSpecies] = useState<string>("cattle");
  const [bredOn, setBredOn] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().slice(0, 10);
  });

  const spec = SPECIES.find((s) => s.value === species) ?? SPECIES[0];

  const result = useMemo(() => {
    if (!bredOn) return null;
    const bred = new Date(bredOn + "T00:00:00");
    if (Number.isNaN(bred.getTime())) return null;
    const due = new Date(bred);
    due.setDate(due.getDate() + spec.days);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const elapsed = Math.round((today.getTime() - bred.getTime()) / 86400000);
    const remaining = Math.round((due.getTime() - today.getTime()) / 86400000);
    const progress = Math.min(100, Math.max(0, (elapsed / spec.days) * 100));
    const dryOff = new Date(due);
    dryOff.setDate(dryOff.getDate() - DRY_OFF_LEAD_DAYS);
    return { due, elapsed, remaining, progress, dryOff };
  }, [bredOn, spec]);

  const fmtD = (n: number) => (np ? toNepaliDigits(String(n)) : String(n));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-3 space-y-6">
        <div>
          <Label className="text-sm font-semibold text-[#0A2540] mb-3 block">
            {np ? "पशुको प्रकार" : "Species"}
          </Label>
          <div className="flex flex-wrap gap-2">
            {SPECIES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setSpecies(s.value)}
                aria-pressed={species === s.value}
                className={`px-3.5 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  species === s.value
                    ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#0A2540]"
                    : "border-gray-200 text-gray-600 hover:border-[#D4AF37]/50"
                }`}
              >
                {np ? s.np : s.en}
                <span className="ml-1.5 text-xs text-gray-400">{fmtD(s.days)}{np ? "दिन" : "d"}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="gc-date" className="text-sm font-semibold text-[#0A2540] mb-2 block">
            <CalendarDays className="inline mr-1.5" size={15} />
            {np ? "मिलन / अन्डा पारेको मिति" : "Breeding / laying date"}
          </Label>
          <Input
            id="gc-date"
            type="date"
            value={bredOn}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setBredOn(e.target.value)}
            className="border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg font-semibold"
          />
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
            {np
              ? "मिलन भएको वा पहिलो अन्डा पारेको दिन राख्नुहोस् — अनुमानित प्रसूति मिति तुरुन्तै देखिन्छ।"
              : "Enter the day of mating (or the day the first egg was laid) — the expected delivery date updates instantly."}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            const d = new Date();
            d.setDate(d.getDate() - 30);
            setBredOn(d.toISOString().slice(0, 10));
          }}
          className="text-sm font-semibold border-2 border-gray-200 hover:border-[#D4AF37]"
        >
          <RotateCcw size={14} className="mr-1.5" />
          {np ? "रिसेट" : "Reset"}
        </Button>
      </div>

      {/* Result */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-24 rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6 sm:p-7 shadow-xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
            {np ? "अनुमानित" : "Expected"}
          </p>
          {result ? (
            <motion.div key={result.due.toISOString()} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-2xl sm:text-3xl font-bold leading-tight">
                {npDate(result.due, np)}
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-300 mb-1.5">
                  <span>{np ? "गर्भावस्था प्रगति" : "Gestation progress"}</span>
                  <span className="text-[#D4AF37] font-semibold">{fmtD(Math.round(result.progress))}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/15 overflow-hidden" role="progressbar" aria-valuenow={Math.round(result.progress)} aria-valuemin={0} aria-valuemax={100}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F]"
                  />
                </div>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm">
                <li className="flex justify-between gap-3">
                  <span className="text-gray-300">{np ? "कुल अवधि" : "Total length"}</span>
                  <span className="font-semibold">{fmtD(spec.days)} {np ? "दिन" : "days"}</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span className="text-gray-300">{np ? "बाँकी दिन" : "Days remaining"}</span>
                  <span className={`font-semibold ${result.remaining < 0 ? "text-green-300" : ""}`}>
                    {result.remaining >= 0
                      ? `${fmtD(result.remaining)} ${np ? "दिन" : "days"}`
                      : np ? "सम्भवतः प्रसूति भइसकेको" : "likely already delivered"}
                  </span>
                </li>
                {(spec.value === "cattle" || spec.value === "buffalo") && result.remaining > 0 && (
                  <li className="flex justify-between gap-3 border-t border-white/10 pt-2.5">
                    <span className="text-gray-300">{np ? "सुकाउने (dry-off) तयारी" : "Dry-off prep (dairy)"}</span>
                    <span className="font-semibold">{npDate(result.dryOff, np)}</span>
                  </li>
                )}
              </ul>
              {(spec.value === "cattle" || spec.value === "buffalo") && result.remaining > 0 && (
                <p className="mt-3 text-[11px] leading-relaxed text-gray-300/90">
                  {np
                    ? "दुध दुहुने गाईभैंसी प्रसूति अगाडि करिब ६० दिनपूर्व सुकाउने अभ्यास राखिन्छ।"
                    : "Dairy practice: stop milking ~60 days before calving so the cow rebuilds reserves."}
                </p>
              )}
            </motion.div>
          ) : (
            <p className="text-gray-300 text-sm">{np ? "मिति छान्नुहोस्।" : "Pick a date to see the due date."}</p>
          )}
        </div>

        <p className="mt-4 text-[11px] text-gray-400 leading-relaxed flex items-start gap-1.5">
          <Info size={12} className="mt-0.5 flex-shrink-0" />
          {np
            ? "स्रोत: Merck Veterinary Manual को गर्भावधि तालिका; भैंसीको औसत (३१० दिन) Nili-Ravi/Murrah अनुसन्धान तथा FAO बाट। व्यक्तिगत पशुमा केही दिन फरक पर्न सक्छ।"
            : "Source: Merck Veterinary Manual gestation table; buffalo average (310 d) from Nili-Ravi/Murrah research and FAO. Individual animals vary by a few days."}
        </p>
      </div>
    </div>
  );
}
