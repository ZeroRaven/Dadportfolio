import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, Egg, Thermometer } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/**
 * INCUBATION CALENDAR — set date + species → the full hatch schedule.
 *
 * Verified incubation data (poultry extension guides):
 *  · Chicken 21 d · Duck 28 d · Turkey 28 d · Quail 17–18 d (17 used)
 *  · Forced-air incubator 37.8 °C (99.5 °F)
 *  · Humidity 55–60% days 1–18; 65–75% for lockdown (last 3 days)
 *  · Candling on days 7 and 14; "lockdown" = final 3 days, stop turning
 */

const SPECIES = [
  { value: "chicken", en: "Chicken", np: "कुखुरा", days: 21, lockdown: 3, candle: [7, 14] },
  { value: "duck",    en: "Duck",    np: "हाँस",  days: 28, lockdown: 3, candle: [10, 21] },
  { value: "turkey",  en: "Turkey",  np: "टर्की", days: 28, lockdown: 3, candle: [10, 21] },
  { value: "quail",   en: "Quail",   np: "बटाईसे", days: 17, lockdown: 2, candle: [6, 12] },
] as const;

function npDate(d: Date, np: boolean): string {
  const s = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  if (!np) return s;
  const months: Record<string, string> = {
    Jan: "जनवरी", Feb: "फेब्रुअरी", Mar: "मार्च", Apr: "अप्रिल", May: "मे", Jun: "जुन",
    Jul: "जुलाई", Aug: "अगस्ट", Sep: "सेप्टेम्बर", Oct: "अक्टोबर", Nov: "नोभेम्बर", Dec: "डिसेम्बर",
  };
  return s.replace(/[A-Za-z]+/, (m) => months[m] ?? m).replace(/\d/g, (c) => "०१२३४५६७८९"[Number(c)]);
}

export function IncubationCalculator({ np }: { np: boolean }) {
  const [species, setSpecies] = useState<string>("chicken");
  const [setOn, setSetOn] = useState<string>(() => new Date().toISOString().slice(0, 10));

  const spec = SPECIES.find((s) => s.value === species) ?? SPECIES[0];

  const result = useMemo(() => {
    if (!setOn) return null;
    const start = new Date(setOn + "T00:00:00");
    if (Number.isNaN(start.getTime())) return null;
    const add = (days: number) => {
      const d = new Date(start);
      d.setDate(d.getDate() + days);
      return d;
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const elapsed = Math.round((today.getTime() - start.getTime()) / 86400000);
    return {
      hatch: add(spec.days),
      lockdown: add(spec.days - spec.lockdown),
      candle1: add(spec.candle[0]),
      candle2: add(spec.candle[1]),
      elapsed,
      progress: Math.min(100, Math.max(0, (elapsed / spec.days) * 100)),
    };
  }, [setOn, spec]);

  const fmtD = (n: number) => (np ? toNepaliDigits(String(n)) : String(n));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <div>
          <Label className="text-sm font-semibold text-[#0A2540] mb-3 block">
            {np ? "प्रजाति" : "Species"}
          </Label>
          <div className="flex flex-wrap gap-2">
            {SPECIES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setSpecies(s.value)}
                aria-pressed={species === s.value}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  species === s.value
                    ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#0A2540]"
                    : "border-gray-200 text-gray-600 hover:border-[#D4AF37]/50"
                }`}
              >
                {np ? s.np : s.en}
                <span className="ml-1.5 text-[11px] opacity-60">{fmtD(s.days)}{np ? " दिन" : "d"}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold text-[#0A2540] mb-2 block" htmlFor="incubation-set">
            {np ? "अन्डा राखेको मिति" : "Eggs set on"}
          </Label>
          <Input
            id="incubation-set"
            type="date"
            value={setOn}
            onChange={(e) => setSetOn(e.target.value)}
          />
        </div>

        {/* Reference card */}
        <div className="rounded-xl border border-[#0A2540]/10 bg-[#0A2540]/[0.02] p-5">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#B8941F] mb-3">
            <Thermometer size={13} />
            {np ? "इन्कुबेटर सन्दर्भ" : "Incubator reference"}
          </p>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            <div>
              <dt className="text-[11px] text-gray-500 font-semibold">{np ? "तापक्रम (फोर्स्ड-एयर)" : "Temperature (forced-air)"}</dt>
              <dd className="font-bold text-[#0A2540]">37.8 °C / 99.5 °F</dd>
            </div>
            <div>
              <dt className="text-[11px] text-gray-500 font-semibold">{np ? "आर्द्रता (दिन १–१८)" : "Humidity (days 1–18)"}</dt>
              <dd className="font-bold text-[#0A2540]">55–60%</dd>
            </div>
            <div>
              <dt className="text-[11px] text-gray-500 font-semibold">{np ? "आर्द्रता (लकडाउन)" : "Humidity (lockdown)"}</dt>
              <dd className="font-bold text-[#0A2540]">65–75%</dd>
            </div>
            <div>
              <dt className="text-[11px] text-gray-500 font-semibold">{np ? "पल्टाउने" : "Turning"}</dt>
              <dd className="font-bold text-[#0A2540]">{np ? "दिनको ३+ पटक, दिन १८ सम्म" : "3+ times daily, until day 18"}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[11px] text-gray-400 leading-snug">
            {np
              ? "अन्डा राख्नुअघि १३–१८ डिग्रीमा ठूलो टुप्पो माथि राखेर ७ दिनभित्र सेट गर्नुहोस्।"
              : "Store eggs blunt-end up at 13–18 °C and set within 7 days of laying."}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6 sticky top-24">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-4">
            <Egg size={13} />
            {np ? "कलाउने तालिका" : "Hatch schedule"}
          </p>

          {result ? (
            <>
              <div className="rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-4 py-3.5 mb-4">
                <p className="text-[11px] text-[#D4AF37] font-semibold uppercase tracking-wider">
                  {np ? "चल्ली निस्किने मिति" : "Hatch date"}
                </p>
                <motion.p
                  key={result.hatch.toISOString()}
                  initial={{ scale: 0.96 }}
                  animate={{ scale: 1 }}
                  className="font-display text-2xl font-bold leading-tight"
                >
                  {npDate(result.hatch, np)}
                </motion.p>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  {fmtD(spec.days)} {np ? "दिनको तापन" : "days of incubation"}
                </p>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-white/[0.06] px-3.5 py-2.5">
                  <span className="text-xs text-gray-300 flex items-center gap-2">
                    <CalendarDays size={13} className="text-[#D4AF37]" />
                    {np ? `प्रकाश जाँच १ (दिन ${fmtD(spec.candle[0])})` : `Candling 1 (day ${spec.candle[0]})`}
                  </span>
                  <span className="font-semibold text-white">{npDate(result.candle1, np)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/[0.06] px-3.5 py-2.5">
                  <span className="text-xs text-gray-300 flex items-center gap-2">
                    <CalendarDays size={13} className="text-[#D4AF37]" />
                    {np ? `प्रकाश जाँच २ (दिन ${fmtD(spec.candle[1])})` : `Candling 2 (day ${spec.candle[1]})`}
                  </span>
                  <span className="font-semibold text-white">{npDate(result.candle2, np)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/[0.06] px-3.5 py-2.5">
                  <span className="text-xs text-gray-300 flex items-center gap-2">
                    <CalendarDays size={13} className="text-[#D4AF37]" />
                    {np ? `लकडाउन — पल्टाउने बन्द (दिन ${fmtD(spec.days - spec.lockdown)})` : `Lockdown — stop turning (day ${spec.days - spec.lockdown})`}
                  </span>
                  <span className="font-semibold text-white">{npDate(result.lockdown, np)}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                  <span>{np ? "प्रगति" : "Progress"}</span>
                  <span>
                    {np ? `दिन ${fmtD(Math.max(0, result.elapsed))}/${fmtD(spec.days)}` : `Day ${Math.max(0, result.elapsed)}/${spec.days}`}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F]"
                  />
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-300">{np ? "मिति छान्नुहोस्।" : "Pick a date to see the schedule."}</p>
          )}

          {/* Save / copy / share / print + recent results */}
          {result && (
            <ResultCardActions
              np={np}
              toolId="hatch"
              label={`${np ? spec.np : spec.en} · ${np ? "सेट" : "set"} ${npDate(new Date(setOn + "T00:00:00"), np)}`}
              summary={`${np ? "चल्ली" : "Hatch"}: ${npDate(result.hatch, np)}`}
              detail={
                `${np ? "प्रकाश जाँच" : "Candling"}: ${npDate(result.candle1, np)} / ${npDate(result.candle2, np)} · ` +
                `${np ? "लकडाउन" : "Lockdown"}: ${npDate(result.lockdown, np)}`
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
