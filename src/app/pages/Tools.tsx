import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Scale, Ruler, Syringe, BellRing, Download, Calculator, RotateCcw,
  Info, CalendarDays, AlertTriangle, Weight, Stethoscope, Map as MapIcon, Wheat, Pill, Bird,
  Droplets, Wallet, Egg, Landmark, CloudSun, Beef, Leaf,
  Search, X, ArrowLeft, ChevronRight, History,
  ThermometerSun, Flame, FlaskConical,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { HealthGuide } from "../components/HealthGuide";
import { WeatherDashboard } from "../components/tools/WeatherDashboard";
import { HerdTracker } from "../components/tools/HerdTracker";
import { BCSGuide } from "../components/tools/BCSGuide";
import { GestationCalculator } from "../components/tools/GestationCalculator";
import { LandConverter } from "../components/tools/LandConverter";
import { FeedCalculator } from "../components/tools/FeedCalculator";
import { DosageCalculator } from "../components/tools/DosageCalculator";
import { PoultryCalculator } from "../components/tools/PoultryCalculator";
import { MilkIncomeCalculator } from "../components/tools/MilkIncomeCalculator";
import { WaterRequirementCalculator } from "../components/tools/WaterRequirementCalculator";
import { IncubationCalculator } from "../components/tools/IncubationCalculator";
import { MarketValueCalculator } from "../components/tools/MarketValueCalculator";
import { ManureValueCalculator } from "../components/tools/ManureValueCalculator";
import { EstrusPlanner } from "../components/tools/EstrusPlanner";
import { ClimateTracker } from "../components/tools/ClimateTracker";
import { MethaneCalculator } from "../components/tools/MethaneCalculator";
import { MilkQualityCalculator } from "../components/tools/MilkQualityCalculator";
import { SilageCalculator } from "../components/tools/SilageCalculator";
import { CalfPlanner } from "../components/tools/CalfPlanner";
import { CMTMastitis } from "../components/tools/CMTMastitis";
import { FodderBudget } from "../components/tools/FodderBudget";
import { AflatoxinRisk } from "../components/tools/AflatoxinRisk";
import { ResultCardActions } from "../components/tools/ResultActions";
import { toNepaliDigits } from "../i18n/format";

/* ─────────────────────────────────────────────────────────────────────────────
 *  FARM TOOLS — real, interactive site functions (not just content).
 *
 *  Tool 1 · Livestock weight estimator
 *      Heart girth + body length → estimated live weight using the
 *      Schaeffer heart-girth rule (standard field method in livestock
 *      extension), with a rough dry-matter intake reference.
 *
 *  Tool 2 · Vaccination reminder generator
 *      Last-dose date + program interval → downloads a real .ics
 *      calendar file (Google Calendar / Apple Calendar / Outlook) with
 *      recurring reminders and a day-before alarm.
 *
 *  ➤ EDIT HERE — tune species divisors and program intervals in the
 *    SPECIES / PROGRAMS arrays below to match your own field practice.
 * ──────────────────────────────────────────────────────────────────────────── */

const SPECIES = [
  {
    value: "cattle",
    en: "Cattle / Buffalo",
    np: "गाई / भैंसी",
    divisor: 10835, // Schaeffer's rule, metric conversion (÷ 10,835)
    girth: { min: 90, max: 250, def: 170 }, // cm
    length: { min: 55, max: 190, def: 140 }, // cm
  },
  {
    value: "goat",
    en: "Goat / Sheep",
    np: "बाख्रा / भेडा",
    divisor: 10890, // commonly cited small-ruminant variant (÷ 10,890)
    girth: { min: 30, max: 110, def: 62 }, // cm
    length: { min: 25, max: 95, def: 58 }, // cm
  },
] as const;

const PROGRAMS = [
  { value: "fmd",     en: "FMD · Foot & Mouth",   np: "एफएमडी · खुरा रोग",    months: 6 },
  { value: "hs",      en: "HS · Haemorrhagic Septicaemia", np: "एचएस · घाँटे रोग", months: 12 },
  { value: "anthrax", en: "Anthrax",               np: "एन्थ्राक्स",           months: 12 },
  { value: "ppr",     en: "PPR (goats)",           np: "पिपिआर (बाख्रा)",      months: 12 },
  { value: "deworm",  en: "Deworming",             np: "कृमिनाशक",             months: 3 },
  { value: "custom",  en: "Custom interval",       np: "आफ्नै अन्तराल",        months: 0 },
] as const;

const CM_PER_INCH = 2.54;

function fmt(value: number, np: boolean, digits = 0): string {
  const s = value.toFixed(digits);
  return np ? toNepaliDigits(s) : s;
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() < day) d.setDate(0); // clamp month-overflow (Jan 31 + 1mo → Feb 28)
  return d;
}

function isoDate(d: Date): string {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("");
}

/* ═══════════════════════════════════════════ Tool 1 · Weight estimator ═════ */

function WeightEstimator({ np }: { np: boolean }) {
  const [species, setSpecies] = useState<string>("cattle");
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [girthCm, setGirthCm] = useState<number>(SPECIES[0].girth.def);
  const [lengthCm, setLengthCm] = useState<number>(SPECIES[0].length.def);

  const spec = SPECIES.find((s) => s.value === species) ?? SPECIES[0];

  const switchSpecies = (value: string) => {
    const next = SPECIES.find((s) => s.value === value) ?? SPECIES[0];
    setSpecies(value);
    setGirthCm(next.girth.def);
    setLengthCm(next.length.def);
  };

  const toDisplay = (cm: number) =>
    unit === "cm" ? Math.round(cm) : Math.round((cm / CM_PER_INCH) * 2) / 2;
  const fromDisplay = (v: number) =>
    unit === "cm" ? v : Math.round(v * CM_PER_INCH);

  const girthDisp = toDisplay(girthCm);
  const lengthDisp = toDisplay(lengthCm);

  const weight = useMemo(() => {
    const kg = (girthCm * girthCm * lengthCm) / spec.divisor;
    return Math.round(kg);
  }, [girthCm, lengthCm, spec]);

  const lbs = Math.round(weight * 2.2046);
  const dmLow = Math.round(weight * 0.025 * 10) / 10;
  const dmHigh = Math.round(weight * 0.03 * 10) / 10;

  const setFromSlider = (which: "girth" | "length", value: number) => {
    const cm = fromDisplay(value);
    if (which === "girth") {
      setGirthCm(Math.min(spec.girth.max, Math.max(spec.girth.min, cm)));
    } else {
      setLengthCm(Math.min(spec.length.max, Math.max(spec.length.min, cm)));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-3 space-y-6">
        {/* Species */}
        <div>
          <Label className="text-sm font-semibold text-[#0A2540] mb-3 block">
            {np ? "पशुको प्रकार" : "Animal"}
          </Label>
          <div className="flex flex-wrap gap-2">
            {SPECIES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => switchSpecies(s.value)}
                aria-pressed={species === s.value}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  species === s.value
                    ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#0A2540]"
                    : "border-gray-200 text-gray-600 hover:border-[#D4AF37]/50"
                }`}
              >
                {np ? s.np : s.en}
              </button>
            ))}
          </div>
        </div>

        {/* Unit toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold text-[#0A2540]">
            <Ruler className="inline mr-1.5" size={15} />
            {np ? "नाप" : "Measurements"}
          </Label>
          <div className="flex rounded-lg border-2 border-gray-200 overflow-hidden text-xs font-semibold">
            {(["cm", "in"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={`px-3.5 py-1.5 transition-colors ${
                  unit === u ? "bg-[#D4AF37] text-[#0A2540]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {u === "cm" ? (np ? "से.मी." : "cm") : (np ? "इन्च" : "inch")}
              </button>
            ))}
          </div>
        </div>

        {/* Girth slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="we-girth" className="text-sm font-semibold text-[#0A2540]">
              {np ? "छातीको नाप (heart girth)" : "Heart girth"}
            </Label>
            <div className="flex items-center gap-1.5">
              <Input
                id="we-girth"
                type="number"
                inputMode="decimal"
                value={girthDisp}
                min={toDisplay(spec.girth.min)}
                max={toDisplay(spec.girth.max)}
                onChange={(e) => setFromSlider("girth", Number(e.target.value || 0))}
                className="w-24 text-right font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
              />
              <span className="text-xs text-gray-400 font-medium">{unit === "cm" ? (np ? "से.मी." : "cm") : (np ? "इन्च" : "in")}</span>
            </div>
          </div>
          <input
            type="range"
            min={toDisplay(spec.girth.min)}
            max={toDisplay(spec.girth.max)}
            step={unit === "cm" ? 1 : 0.5}
            value={girthDisp}
            onChange={(e) => setFromSlider("girth", Number(e.target.value))}
            className="w-full accent-[#D4AF37]"
            aria-label={np ? "छातीको नाप" : "Heart girth slider"}
          />
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
            {np
              ? "अगाडिको खुट्टाको ठीक पछाडि छातीको परिधि — नापपट्टी कसेर।"
              : "Circumference of the chest, just behind the front legs — pull the tape snug."}
          </p>
        </div>

        {/* Length slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="we-length" className="text-sm font-semibold text-[#0A2540]">
              {np ? "शरीरको लम्बाइ (body length)" : "Body length"}
            </Label>
            <div className="flex items-center gap-1.5">
              <Input
                id="we-length"
                type="number"
                inputMode="decimal"
                value={lengthDisp}
                min={toDisplay(spec.length.min)}
                max={toDisplay(spec.length.max)}
                onChange={(e) => setFromSlider("length", Number(e.target.value || 0))}
                className="w-24 text-right font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
              />
              <span className="text-xs text-gray-400 font-medium">{unit === "cm" ? (np ? "से.मी." : "cm") : (np ? "इन्च" : "in")}</span>
            </div>
          </div>
          <input
            type="range"
            min={toDisplay(spec.length.min)}
            max={toDisplay(spec.length.max)}
            step={unit === "cm" ? 1 : 0.5}
            value={lengthDisp}
            onChange={(e) => setFromSlider("length", Number(e.target.value))}
            className="w-full accent-[#D4AF37]"
            aria-label={np ? "शरीरको लम्बाइ" : "Body length slider"}
          />
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
            {np
              ? "काँधको बिन्दुदेखि पुच्छ्रे हाडसम्म (point of shoulder → pin bone)।"
              : "Point of shoulder to the pin bone of the hip."}
          </p>
        </div>

        {/* Reset */}
        <Button
          variant="outline"
          onClick={() => {
            setGirthCm(spec.girth.def);
            setLengthCm(spec.length.def);
          }}
          className="text-sm font-semibold border-2 border-gray-200 hover:border-[#D4AF37]"
        >
          <RotateCcw className="mr-1.5" size={14} />
          {np ? "पूर्वनिर्धारितमा फर्काउनुहोस्" : "Reset to defaults"}
        </Button>
      </div>

      {/* Result panel */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-28 rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
            <Weight size={14} />
            {np ? "अनुमानित तौल" : "Estimated live weight"}
          </div>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={weight}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="font-display text-5xl sm:text-6xl font-bold leading-none text-white"
            >
              {fmt(weight, np)}
              <span className="text-xl sm:text-2xl text-gray-400 font-semibold ml-2">
                {np ? "केजी" : "kg"}
              </span>
            </motion.div>
          </AnimatePresence>
          <p className="text-sm text-gray-400 mt-2">
            {np ? `लगभग ${fmt(lbs, np)} पाउन्ड` : `≈ ${fmt(lbs, np)} lbs`}
          </p>

          <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-2">
              <Scale size={13} />
              {np ? "खस्रो खाद्य सन्दर्भ (दैनिक)" : "Rough dry-matter reference (daily)"}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {np
                ? `${fmt(dmLow, np, 1)}–${fmt(dmHigh, np, 1)} केजी/दिन (शरीरको तौलको २.५–३%)`
                : `${fmt(dmLow, np, 1)}–${fmt(dmHigh, np, 1)} kg/day (2.5–3% of body weight)`}
            </p>
          </div>

          {/* Working shown — transparency builds trust */}
          <p className="text-[11px] text-gray-500 mt-4 leading-relaxed break-words">
            {np
              ? `गणना: (${fmt(girthCm, np)} × ${fmt(girthCm, np)} × ${fmt(lengthCm, np)}) ÷ ${fmt(spec.divisor, np)} — शाफरको नियम`
              : `Working: (${fmt(girthCm, np)} × ${fmt(girthCm, np)} × ${fmt(lengthCm, np)}) ÷ ${fmt(spec.divisor, np)} — Schaeffer's rule`}
          </p>

          {/* Save / copy / share / print + recent results */}
          <ResultCardActions
            np={np}
            toolId="weight"
            label={
              (np ? SPECIES.find((s) => s.value === species)?.np : SPECIES.find((s) => s.value === species)?.en) +
              ` · ${fmt(girthDisp, np, 0)} ${unit} × ${fmt(lengthDisp, np, 0)} ${unit}`
            }
            summary={`${np ? "लगभग" : "≈"} ${fmt(weight, np)} kg`}
            detail={
              np
                ? `खस्रो खाद्य: ${fmt(dmLow, np, 1)}–${fmt(dmHigh, np, 1)} केजी/दिन`
                : `Dry matter: ${fmt(dmLow, np, 1)}–${fmt(dmHigh, np, 1)} kg/day`
            }
          />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════ Tool 2 · Vaccination reminders ═════════ */

function VaccineReminder({ np }: { np: boolean }) {
  const [program, setProgram] = useState<string>("fmd");
  const [lastDate, setLastDate] = useState<string>("");
  const [customMonths, setCustomMonths] = useState<number>(6);
  const [downloaded, setDownloaded] = useState(false);

  const prog = PROGRAMS.find((p) => p.value === program) ?? PROGRAMS[0];
  const interval = prog.months || Math.min(24, Math.max(1, customMonths));

  const today = new Date();
  const isoLocal = (d: Date) =>
    [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");

  const doses = useMemo(() => {
    if (!lastDate) return [];
    const base = new Date(`${lastDate}T00:00:00`);
    if (Number.isNaN(base.getTime())) return [];
    return [1, 2, 3].map((n) => addMonths(base, interval * n));
  }, [lastDate, interval]);

  const pretty = (d: Date) => {
    const s = isoLocal(d);
    return np ? toNepaliDigits(s) : s;
  };

  const buildIcs = (): string => {
    const first = doses[0];
    const stamp = isoDate(today) + "T" +
      String(today.getUTCHours()).padStart(2, "0") +
      String(today.getUTCMinutes()).padStart(2, "0") + "00Z";
    const title = np ? `${prog.np} — डा. एम.पी. शाह सम्झना` : `${prog.en} — Dr. M.P. Shah reminder`;
    const desc = np
      ? `drmogalshah.com.np बाट तयार गरिएको सम्झना। पछिल्लो खोप: ${isoLocal(new Date(`${lastDate}T00:00:00`))} · अन्तराल: ${interval} महिना।`
      : `Reminder generated at drmogalshah.com.np. Last dose: ${isoLocal(new Date(`${lastDate}T00:00:00`))} · interval: ${interval} months.`;
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//drmogalshah com np//Veterinary Reminders//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:vet-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@drmogalshah.com.np`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${isoDate(first)}`,
      `DTEND;VALUE=DATE:${isoDate(addMonths(first, 1))}`,
      `RRULE:FREQ=MONTHLY;INTERVAL=${interval};COUNT=6`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${title}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    return lines.join("\r\n");
  };

  const download = () => {
    if (!doses.length) return;
    const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vet-reminder-${prog.value}-${isoLocal(doses[0]).replace(/-/g, "")}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <div className="max-w-2xl space-y-6 print:space-y-0">
      {/* Program */}
      <div>
        <Label className="text-sm font-semibold text-[#0A2540] mb-3 block">
          <Syringe className="inline mr-1.5" size={15} />
          {np ? "खोप / कार्यक्रम" : "Vaccination / program"}
        </Label>
        <div className="flex flex-wrap gap-2">
          {PROGRAMS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => {
                setProgram(p.value);
                setDownloaded(false);
              }}
              aria-pressed={program === p.value}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                program === p.value
                  ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#0A2540]"
                  : "border-gray-200 text-gray-600 hover:border-[#D4AF37]/50"
              }`}
            >
              {np ? p.np : p.en}
            </button>
          ))}
        </div>
      </div>

      {/* Custom interval */}
      {prog.months === 0 && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
          <Label htmlFor="vr-months" className="text-sm font-semibold text-[#0A2540] mb-2 block">
            {np ? "अन्तराल (महिनामा)" : "Interval (months)"}
          </Label>
          <Input
            id="vr-months"
            type="number"
            min={1}
            max={24}
            value={customMonths}
            onChange={(e) => {
              setCustomMonths(Number(e.target.value) || 1);
              setDownloaded(false);
            }}
            className="w-32 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
          />
        </motion.div>
      )}

      {/* Last dose date */}
      <div>
        <Label htmlFor="vr-last" className="text-sm font-semibold text-[#0A2540] mb-2 block">
          {np ? "पछिल्लो खोप/औषधि दिएको मिति" : "Date of the last dose"}
        </Label>
        <Input
          id="vr-last"
          type="date"
          max={isoLocal(today)}
          value={lastDate}
          onChange={(e) => {
            setLastDate(e.target.value);
            setDownloaded(false);
          }}
          className="w-full sm:w-56 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-xl"
        />
      </div>

      {/* Schedule preview */}
      <AnimatePresence>
        {doses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 border-gray-100 bg-gray-50/60 p-5"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0A2540] uppercase tracking-widest mb-4">
              <CalendarDays size={14} className="text-[#B8941F]" />
              {np ? "आगामी खुराकहरू" : "Upcoming doses"}
            </div>
            <ul className="space-y-2.5">
              {doses.map((d, i) => (
                <li key={d.toISOString()} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#D4AF37]/15 text-[#B8941F] text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {fmt(i + 1, np)}
                  </span>
                  <span className="text-sm font-semibold text-[#0A2540]">{pretty(d)}</span>
                  <span className="text-xs text-gray-400">
                    {np ? `${prog.np} · ${fmt(interval * (i + 1), np)} महिनापछि` : `${prog.en} · after ${fmt(interval * (i + 1), np)} months`}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              onClick={download}
              className="mt-5 w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold px-6"
            >
              <Download className="mr-2" size={16} />
              {np ? "क्यालेन्डर सम्झना डाउनलोड गर्नुहोस् (.ics)" : "Download calendar reminder (.ics)"}
            </Button>
            <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">
              <BellRing className="inline mr-1" size={12} />
              {downloaded
                ? np
                  ? "फाइल डाउनलोड भयो — खोलेर आफ्नो क्यालेन्डरमा थप्नुहोस् (हरेक खुराकअघि १ दिन अलार्म)।"
                  : "File downloaded — open it to add to your calendar (alarm fires 1 day before each dose)."
                : np
                ? "गुगल / एप्पल / आउटलुक क्यालेन्डरमा खुल्छ — ६ पटक दोहोरिने सम्झना, खुराकअघि १ दिन अलार्म।"
                : "Works with Google / Apple / Outlook Calendar — 6 recurring reminders with a day-before alarm."}
            </p>

            {/* Save / copy / share / print + recent results */}
            {doses.length > 0 && (
              <ResultCardActions
                np={np}
                toolId="vaccine"
                label={`${np ? prog.np : prog.en} · ${np ? "पछिल्लो खुराक" : "last dose"} ${lastDate || (np ? "आज" : "today")}`}
                summary={`${np ? "अर्को खुराक" : "Next dose"}: ${pretty(doses[0])}`}
                detail={doses.map((d, i) => `${i + 1}. ${pretty(d)}`).join("\n")}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════ Page shell ═══════════════
 *
 *  HUB-AND-SPOKE LAYOUT (Release 9 — Tools redesign)
 *
 *  Fifteen tools no longer fit on one screen of switcher chips (they were
 *  eating 30–40% of the desktop viewport and ~2 mobile screens before the
 *  calculator began), so the page now works like a directory:
 *
 *    /tools          → the hub: search box + category filter + card grid
 *    /tools/:toolId  → a focused single-tool page (own h1 + description,
 *                      related tools, an "All tools" way back, print header)
 *
 *  Deep links keep working; unknown ids redirect to the hub. Recently used
 *  tools (visit-based, localStorage only, never sent anywhere) resurface as
 *  quick chips at the top of the hub.
 * ──────────────────────────────────────────────────────────────────────────── */

interface ToolMeta {
  value: string;
  icon: typeof Weight;
  en: string;
  np: string;
  descEn: string;
  descNp: string;
  /** extra bilingual search terms (lower-cased before matching) */
  kw: string;
}

interface ToolGroup {
  id: string;
  en: string;
  np: string;
  icon: typeof Weight;
  tools: ToolMeta[];
}

/** Twenty tools in four categories — the single registry for hub, deep
 *  links, related-tools strips, search and the sitemap. */
const TOOL_GROUPS: ToolGroup[] = [
  {
    id: "livestock",
    en: "Livestock",
    np: "पशुधन",
    icon: Beef,
    tools: [
      { value: "weight", icon: Weight, en: "Weight", np: "तौल",
        descEn: "Live weight from a heart-girth tape measurement",
        descNp: "नापपट्टीको नापबाट जीवित तौल अनुमान",
        kw: "tape heart girth schaeffer lbs kg नापपट्टी छाती" },
      { value: "gestation", icon: CalendarDays, en: "Gestation", np: "गर्भावधि",
        descEn: "Breeding date to calving, kidding or farrowing dates",
        descNp: "मिलनको मितिबाट प्रसूति मिति हिसाब",
        kw: "pregnancy due date calving kidding dry off प्रसूति" },
      { value: "feed", icon: Wheat, en: "Feed", np: "चारा",
        descEn: "Daily ration and dry matter for cattle and buffalo",
        descNp: "गाईभैंसीको दैनिक चारा तथा सुख्खा पदार्थ",
        kw: "ration dry matter dm fodder concentrate tdn आहार" },
      { value: "dosage", icon: Pill, en: "Dosage", np: "खुराक",
        descEn: "mg/kg medicine doses into mL of injection",
        descNp: "mg/kg खुराकलाई mL इन्जेक्सनमा बदल्नुहोस्",
        kw: "injection tablet medicine antibiotic औषधि इन्जेक्सन" },
      { value: "water", icon: Droplets, en: "Water", np: "पानी",
        descEn: "Daily drinking water for the whole herd, tank size",
        descNp: "बथानको दैनिक पिउने पानी र ट्यांकी नाप",
        kw: "tank storage litres drink ट्यांकी पिउने" },
      { value: "market", icon: Scale, en: "Live value", np: "जीवित मूल्य",
        descEn: "Live weight × your local rate, with a planning band",
        descNp: "जीवित तौल × स्थानीय दर — योजना दायरासहित",
        kw: "khasi goat buffalo price sell खसी भाउ बेच्ने" },
      { value: "bcs", icon: Ruler, en: "BCS score", np: "शरीर अवस्था",
        descEn: "Body condition 1–5 scored on a live cow diagram",
        descNp: "शरीर अवस्था अंक १–५, गाईको चित्रसहित",
        kw: "fat thin conditioning edmondson बोसो" },
      { value: "estrus", icon: CalendarDays, en: "Heat & AI", np: "यात्रा-मिलन",
        descEn: "Heat date → serve window, next heats, preg-check dates",
        descNp: "यात्राको मितिबाट मिलन-झ्याल, अर्का यात्रा, गर्भ-जाँच",
        kw: "estrus heat insemination breeding cycle 21 days ai यात्रा मिलन गर्भ" },
      { value: "silage", icon: Wheat, en: "Silage pit", np: "सिलेज गारो",
        descEn: "Pit size → tonnes, dry matter and days of feed for the herd",
        descNp: "गारोको नापबाट टन, सुक्खा पदार्थ र पुग्ने दिन",
        kw: "silage bunker pit tonnage dry matter density maize fodder सिलेज गारो खाल्डो" },
      { value: "calf", icon: Bird, en: "Calf planner", np: "बछडा योजना",
        descEn: "Colostrum litres, daily milk and step-down weaning ladder",
        descNp: "खीरको लिटर, दैनिक दुध र बिस्तारै छुटाउने पात्रो",
        kw: "colostrum calf milk replacer weaning bottle खीर बछडा दुध छुटाउने" },
      { value: "cmt", icon: Droplets, en: "CMT udder check", np: "थन जाँच",
        descEn: "Four-quarter CMT scores → cell counts, milk-loss estimate",
        descNp: "चार थनको CMT अङ्क → कोशिका सङ्ख्या, दुध-हानि अनुमान",
        kw: "mastitis cmt scc udder subclinical थनरोग थन सङ्क्रमण" },
      { value: "fodderbudget", icon: Leaf, en: "Fodder budget", np: "चारा बजेट",
        descEn: "Whole-herd DMI → green, dry and concentrate needs, land",
        descNp: "पूरै बथानको DMI → हरियो, सुक्खा, दाना र जग्गा",
        kw: "dry matter intake herd feed planning green fodder land ropani चारा योजना दाना" },
    ],
  },
  {
    id: "farm",
    en: "Farm & business",
    np: "खेत तथा व्यवसाय",
    icon: Landmark,
    tools: [
      { value: "dairy", icon: Wallet, en: "Dairy income", np: "दुग्ध आम्दानी",
        descEn: "Milk margin after feed and labour costs",
        descNp: "चारा-श्रम खर्च काटेर दुधको नाफा",
        kw: "profit litre price cost नाफा लिटर" },
      { value: "land", icon: MapIcon, en: "Land units", np: "जग्गा",
        descEn: "Ropani-Aana ↔ Bigha-Kattha to square metres",
        descNp: "रोपनी-आना ↔ बिघा-कट्ठा वर्ग मिटरमा",
        kw: "ropani aana paisa dam bigha kattha dhur area kitta रोपनी बिघा कट्ठा" },
      { value: "poultry", icon: Bird, en: "Poultry", np: "कुखुरा",
        descEn: "Feed, FCR and batch economics for layers and broilers",
        descNp: "लेयर-ब्रोयलरको दाना, FCR र बैच हिसाब",
        kw: "broiler layer eggs fcr दाना अन्डा" },
      { value: "hatch", icon: Egg, en: "Hatchery", np: "कलाउने",
        descEn: "Set date to hatch, candling and lockdown days",
        descNp: "अन्डा राखेको मितिबाट कलाउने पात्रो",
        kw: "incubator chicken duck quail candling इन्कुबेटर" },
      { value: "vaccine", icon: BellRing, en: "Vaccination", np: "खोप",
        descEn: "FMD, HS, PPR… calendar reminders (.ics download)",
        descNp: "एफएमडी, एचएस, पिपिआर… क्यालेन्डर सम्झना (.ics)",
        kw: "fmd hs anthrax ppr deworm ics सम्झना" },
      { value: "herd", icon: Beef, en: "Herd ledger", np: "खोर अभिलेख",
        descEn: "Animals and daily milk records, charts, CSV export",
        descNp: "पशु र दैनिक दुध अभिलेख, चार्ट, CSV निर्यात",
        kw: "record keeping tracking livestock register अभिलेख" },
      { value: "manure", icon: Wheat, en: "Manure value", np: "गोबर मूल्य",
        descEn: "Dung → compost, NPK, fertiliser-bag value, biogas",
        descNp: "गोबर → कम्पोस्ट, NPK, मल-बोरा मूल्य, बायोग्यास",
        kw: "dung compost npk fertiliser biogas slurry organic गोबर कम्पोस्ट मल बायोग्यास" },
      { value: "methane", icon: Flame, en: "Carbon hoofprint", np: "कार्बन पदचाप",
        descEn: "Herd methane & CO₂e — IPCC Tier 1, with fixes",
        descNp: "बथानको मिथेन र CO₂e — IPCC तह-१, सुधार सुझाव",
        kw: "methane greenhouse gas carbon footprint ipcc ch4 biogas जलवायु मिथेन कार्बन" },
      { value: "milktest", icon: FlaskConical, en: "Milk quality & pay", np: "दुध गुणस्तर",
        descEn: "Fat/SNF two-axis pricing, CLR→SNF, quality grade",
        descNp: "बोसो-SNF दुई-धुरी भुक्तानी, CLR→SNF, गुणस्तर",
        kw: "fat snf clr lactometer milk price payment दुध बोसो एसएनएफ भुक्तानी" },
      { value: "aflatoxin", icon: AlertTriangle, en: "Grain storage", np: "अन्न भण्डारण",
        descEn: "Maize storage moisture & method → aflatoxin risk score",
        descNp: "मकैको चिस्यान र भण्डारणबाट एफ्लाटक्सिन जोखिम",
        kw: "aflatoxin maize storage mycotoxin hermetic ppb मकै भण्डारण ढुसी विष" },
    ],
  },
  {
    id: "weather",
    en: "Weather & climate",
    np: "मौसम तथा हावापानी",
    icon: CloudSun,
    tools: [
      { value: "weather", icon: CloudSun, en: "Weather smart", np: "मौसम सहायक",
        descEn: "Live district weather with heat-stress (THI) alerts",
        descNp: "जिल्लाको लाइभ मौसम, ताप-तनाव (THI) सहित",
        kw: "open meteo forecast rain temperature 7-day पूर्वानुमान वर्षा" },
      { value: "climate", icon: ThermometerSun, en: "Climate tracker", np: "हावापानी पछिल्लगता",
        descEn: "30-year district rainfall & temperature normals, warming trend",
        descNp: "३० वर्षे जिल्ला वर्षा-तापक्रम औसत, ताप वृद्धि",
        kw: "climate change normals era5 monsoon share warming anomaly जलवायु मनसुन वर्षा औसत" },
    ],
  },
  {
    id: "health",
    en: "Health",
    np: "स्वास्थ्य",
    icon: Stethoscope,
    tools: [
      { value: "health", icon: Stethoscope, en: "Health guide", np: "रोग लक्षण",
        descEn: "Match symptoms to likely diseases and first steps",
        descNp: "लक्षण मिलाई सम्भावित रोग र पहिलो कदम",
        kw: "symptom checker disease fmd mastitis bloat रोग" },
    ],
  },
];

type ToolEntry = ToolMeta & { group: ToolGroup };

const ALL_TOOLS: ToolEntry[] = TOOL_GROUPS.flatMap((g) =>
  g.tools.map((t) => ({ ...t, group: g }))
);
const TOOL_MAP = new Map<string, ToolEntry>(
  ALL_TOOLS.map((t): [string, ToolEntry] => [t.value, t])
);

/** Fallback strip for single-tool categories (Weather, Health). */
const POPULAR_IDS = ["weight", "dosage", "weather", "herd", "dairy"];

/* ── Recently used (visits, localStorage only — never sent anywhere) ─────── */

const RECENT_KEY = "farm-tools-recent";
const RECENT_MAX = 6;

function readRecent(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function pushRecent(id: string): void {
  try {
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify([id, ...readRecent().filter((x) => x !== id)].slice(0, RECENT_MAX))
    );
  } catch {
    /* private mode — degrade silently, like every other local feature */
  }
}

/* ── The calculator switch (unchanged components, new home) ──────────────── */

function renderTool(value: string, np: boolean) {
  switch (value) {
    case "weight": return <WeightEstimator np={np} />;
    case "gestation": return <GestationCalculator np={np} />;
    case "feed": return <FeedCalculator np={np} />;
    case "dosage": return <DosageCalculator np={np} />;
    case "water": return <WaterRequirementCalculator np={np} />;
    case "market": return <MarketValueCalculator np={np} />;
    case "dairy": return <MilkIncomeCalculator np={np} />;
    case "land": return <LandConverter np={np} />;
    case "poultry": return <PoultryCalculator np={np} />;
    case "hatch": return <IncubationCalculator np={np} />;
    case "vaccine": return <VaccineReminder np={np} />;
    case "weather": return <WeatherDashboard np={np} />;
    case "herd": return <HerdTracker np={np} />;
    case "bcs": return <BCSGuide np={np} />;
    case "health": return <HealthGuide np={np} />;
    case "manure": return <ManureValueCalculator np={np} />;
    case "estrus": return <EstrusPlanner np={np} />;
    case "climate": return <ClimateTracker np={np} />;
    case "methane": return <MethaneCalculator np={np} />;
    case "milktest": return <MilkQualityCalculator np={np} />;
    case "silage": return <SilageCalculator np={np} />;
    case "calf": return <CalfPlanner np={np} />;
    case "cmt": return <CMTMastitis np={np} />;
    case "fodderbudget": return <FodderBudget np={np} />;
    case "aflatoxin": return <AflatoxinRisk np={np} />;
    default: return null;
  }
}

/* ── Hub: one compact card per tool, browsable and searchable ────────────── */

function ToolCard({ tool, np }: { tool: ToolEntry; np: boolean }) {
  const Icon = tool.icon;
  return (
    <Link
      to={`/tools/${tool.value}`}
      className="group flex items-start gap-3.5 rounded-xl border-2 border-gray-100 bg-white p-4 transition-all duration-200 hover:border-[#D4AF37]/70 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-1"
    >
      <span className="w-10 h-10 rounded-lg bg-[#0A2540] flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#B8941F]">
        <Icon size={18} className="text-[#D4AF37] transition-colors group-hover:text-[#0A2540]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-[#0A2540] text-sm transition-colors group-hover:text-[#B8941F]">
          {np ? tool.np : tool.en}
        </span>
        <span className="block text-xs text-gray-500 leading-relaxed mt-1">
          {np ? tool.descNp : tool.descEn}
        </span>
      </span>
      <ChevronRight
        size={16}
        aria-hidden="true"
        className="text-gray-300 transition-colors group-hover:text-[#D4AF37] mt-1 flex-shrink-0"
      />
    </Link>
  );
}

function ToolsHub({ np }: { np: boolean }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string>("all");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setRecent(readRecent().filter((id) => TOOL_MAP.has(id)));
  }, []);

  const q = query.trim().toLowerCase();

  const matches = (t: ToolEntry) =>
    [t.en, t.np, t.descEn, t.descNp, t.kw, t.group.en, t.group.np]
      .some((s) => s.toLowerCase().includes(q));

  const results = useMemo(
    () => ALL_TOOLS.filter((t) => (group === "all" || t.group.id === group) && (!q || matches(t))),
    [q, group] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const sections =
    !q && group === "all"
      ? TOOL_GROUPS.map((g) => ({ group: g, tools: g.tools as ToolEntry[] }))
      : [{ group: null, tools: results }];

  const clearAll = () => {
    setQuery("");
    setGroup("all");
  };

  return (
    <>
      {/* Header band — slim: badge, title, two sentences */}
      <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white pt-28 pb-16 px-4 sm:px-6 print:hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-[#D4AF37]/30"
          >
            <Calculator className="text-[#D4AF37]" size={16} />
            <span className="text-sm font-medium">
              {np ? "निःशुल्क खेत औजार" : "Free field tools · no sign-up"}
            </span>
          </motion.div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {np ? "कृषि औजार तथा क्यालकुलेटरहरू" : "Farm Tools & Calculators"}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {np
              ? `नेपाली किसान तथा पशुपालकका लागि ${fmt(ALL_TOOLS.length, np)} वटा निःशुल्क, द्विभाषी औजार — नापपट्टीको तौल अनुमानदेखि ताप-तनाव सहितको लाइभ मौसमसम्म। तल खोज्नुहोस् वा वर्गअनुसार हेर्नुहोस्; हरेक औजार जुनसुकै फोनमा चल्छ।`
              : `${ALL_TOOLS.length} free, bilingual tools for Nepali farmers and livestock keepers — from a tape-measure weight estimator to live weather with heat-stress alerts. Search or browse below; every tool runs offline-fast on any phone.`}
          </p>
        </div>
      </div>

      {/* Search + filters, overlapping the band */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-4 sm:p-5 space-y-3.5 print:hidden">
            <div role="search" className="relative">
              <Search
                size={16}
                aria-hidden="true"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={np ? "औजार खोज्नुहोस् — जस्तै 'खुराक' वा 'weather'" : "Search tools — try 'dosage' or 'मौसम'"}
                aria-label={np ? "औजार खोज्नुहोस्" : "Search tools"}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] focus:outline-none text-sm font-medium text-[#0A2540] placeholder:text-gray-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={np ? "खोज मेटाउनुहोस्" : "Clear search"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div role="group" aria-label={np ? "वर्गअनुसार छान्नुहोस्" : "Filter by category"} className="flex flex-wrap gap-2">
              {[{ id: "all", en: "All", np: "सबै", icon: Calculator, count: ALL_TOOLS.length }]
                .concat(
                  TOOL_GROUPS.map((g) => ({
                    id: g.id, en: g.en, np: g.np, icon: g.icon, count: g.tools.length,
                  }))
                )
                .map(({ id, en, np: npLabel, icon: Icon, count }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={group === id}
                    onClick={() => setGroup(id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
                      group === id
                        ? "bg-[#0A2540] text-white border-[#0A2540] shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/60 hover:text-[#0A2540]"
                    }`}
                  >
                    <Icon size={13} className={group === id ? "text-[#D4AF37]" : "text-gray-400"} />
                    {np ? npLabel : en}
                    <span className={`text-[11px] font-bold ${group === id ? "text-[#D4AF37]" : "text-gray-400"}`}>
                      {fmt(count, np)}
                    </span>
                  </button>
                ))}
            </div>

            {recent.length > 0 && !q && group === "all" && (
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                  <History size={11} aria-hidden="true" />
                  {np ? "हालै प्रयोग गरेका" : "Recently used"}
                </span>
                {recent.slice(0, 4).map((id) => {
                  const t = TOOL_MAP.get(id)!;
                  const RIcon = t.icon;
                  return (
                    <Link
                      key={id}
                      to={`/tools/${id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-gray-100 text-xs font-semibold text-gray-600 hover:border-[#D4AF37]/60 hover:text-[#0A2540] transition-all"
                    >
                      <RIcon size={13} className="text-[#B8941F]" />
                      {np ? t.np : t.en}
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* The directory itself */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        <p aria-live="polite" className="text-xs text-gray-500 mb-4 min-h-[1rem]">
          {q && results.length > 0
            ? np
              ? `'${query.trim()}' खोजीमा ${fmt(results.length, np)} औजार भेटिए`
              : `${results.length} tools match “${query.trim()}”`
            : ""}
        </p>

        {results.length === 0 ? (
          <div className="text-center py-16">
            <Search size={30} className="mx-auto text-gray-300 mb-4" aria-hidden="true" />
            <p className="font-semibold text-[#0A2540]">
              {np ? "कुनै औजार भेटिएन" : "No tools match"}
            </p>
            <p className="text-sm text-gray-500 mt-1.5">
              {np ? "अर्को शब्दले खोज्नुहोस् वा वर्ग हेर्नुहोस्।" : "Try another word, or browse a category."}
            </p>
            <Button variant="outline" onClick={clearAll} className="mt-5 font-semibold border-2 hover:border-[#D4AF37]">
              <X className="mr-1.5" size={14} />
              {np ? "खोज र छानो मेटाउनुहोस्" : "Clear search & filters"}
            </Button>
          </div>
        ) : (
          sections.map(({ group: g, tools }, i) => (
            <section key={g ? g.id : "results"} className={i > 0 ? "mt-10" : undefined} aria-label={g ? (np ? g.np : g.en) : undefined}>
              {g && (
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="w-7 h-7 rounded-md bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0">
                    <g.icon size={14} className="text-[#B8941F]" aria-hidden="true" />
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#0A2540]">
                    {np ? g.np : g.en}
                  </h2>
                  <span className="text-xs text-gray-400 font-medium">{fmt(g.tools.length, np)}</span>
                  <span className="flex-1 h-px bg-gray-200" aria-hidden="true" />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {tools.map((t) => (
                  <ToolCard key={t.value} tool={t} np={np} />
                ))}
              </div>
            </section>
          ))
        )}

        <p className="mt-10 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5 print:hidden">
          <Info size={12} />
          {np
            ? "औजारहरू तपाईंको ब्राउजरमै चल्छन् — कुनै डाटा कतै पठाइँदैन।"
            : "Everything runs in your browser — no data ever leaves this page."}
        </p>
      </div>
    </>
  );
}

/* ── Spoke: one focused tool, with a way back and related tools ──────────── */

function ToolView({ tool, np }: { tool: ToolEntry; np: boolean }) {
  const Icon = tool.icon;
  const GroupIcon = tool.group.icon;

  const sameGroup = tool.group.tools.filter((t) => t.value !== tool.value) as ToolEntry[];
  const stripTools =
    sameGroup.length > 0
      ? { tools: sameGroup, label: np ? `${tool.group.np}का अन्य औजार` : `More in ${tool.group.en}` }
      : {
          tools: POPULAR_IDS
            .map((id) => TOOL_MAP.get(id)!)
            .filter((t) => t && t.value !== tool.value),
          label: np ? "लोकप्रिय औजारहरू" : "Popular tools",
        };

  return (
    <>
      {/* Compact header band: way back + this tool's name as the page h1 */}
      <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white pt-28 pb-10 px-4 sm:px-6 print:hidden">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-white text-xs font-semibold uppercase tracking-[0.18em] mb-4 transition-colors"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            {np ? "कृषि औजारहरू" : "Farm Tools"}
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 flex items-center gap-4">
            <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
              <Icon size={22} className="text-[#D4AF37]" aria-hidden="true" />
            </span>
            {np ? tool.np : tool.en}
          </h1>
          <p className="text-gray-300 text-base max-w-2xl leading-relaxed">
            {np ? tool.descNp : tool.descEn}
          </p>
        </div>
      </div>

      {/* The tool itself */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-5 sm:p-10">
            {/* Print-only title — the on-screen title lives in the dark band */}
            <div className="hidden print:block mb-6 pb-4 border-b border-gray-300">
              <p className="font-display text-xl font-bold text-black">
                {np ? tool.np : tool.en} · drmogalshah.com.np
              </p>
              <p className="text-xs text-gray-700 mt-1">{np ? tool.descNp : tool.descEn}</p>
            </div>

            {renderTool(tool.value, np)}

            {/* Related tools — same category (or popular picks) */}
            {stripTools.tools.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-100 print:hidden">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B8941F] mb-3">
                  <GroupIcon size={12} aria-hidden="true" />
                  {stripTools.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {stripTools.tools.map((t) => {
                    const RIcon = t.icon;
                    return (
                      <Link
                        key={t.value}
                        to={`/tools/${t.value}`}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border-2 border-gray-100 text-sm font-semibold text-gray-600 hover:border-[#D4AF37]/60 hover:text-[#0A2540] transition-all"
                      >
                        <RIcon size={14} className="text-[#B8941F]" />
                        {np ? t.np : t.en}
                      </Link>
                    );
                  })}
                  <Link
                    to="/tools"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0A2540] text-white text-sm font-semibold hover:bg-[#12365C] transition-colors"
                  >
                    {np ? "सबै औजार हेर्नुहोस्" : "Browse all tools"}
                    <ChevronRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}

            {/* Honest-use disclaimer */}
            <div className="mt-8 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3.5 flex items-start gap-3 print:hidden">
              <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={17} aria-hidden="true" />
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                {np
                  ? "यी अनुमानहरू दाना योजना र तयारीका लागि मात्र हुन् — खोपको खुराक वा उपचार अघि डाक्टरको प्रत्यक्ष जाँच अनिवार्य छ।"
                  : "These estimates are for planning and preparation only — actual dosing and treatment always require a hands-on examination by a veterinarian."}
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-5 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5 print:hidden">
          <Info size={12} />
          {np
            ? "औजारहरू तपाईंको ब्राउजरमै चल्छन् — कुनै डाटा कतै पठाइँदैन।"
            : "Everything runs in your browser — no data ever leaves this page."}
        </p>
      </div>
    </>
  );
}

/* ── Route entry: /tools → hub · /tools/:toolId → focused view ───────────── */

export function Tools() {
  const { language } = useLanguage();
  const np = language === "np";
  const { toolId } = useParams<{ toolId?: string }>();
  const navigate = useNavigate();

  const active = toolId ? TOOL_MAP.get(toolId) : undefined;

  // Unknown ids (/tools/nonsense) redirect to the directory instead of
  // silently rendering an unrelated calculator under a wrong URL.
  useEffect(() => {
    if (toolId && !TOOL_MAP.has(toolId)) navigate("/tools", { replace: true });
  }, [toolId, navigate]);

  // Track recent visits (local only) and start each tool from the top.
  useEffect(() => {
    if (toolId && TOOL_MAP.has(toolId)) {
      pushRecent(toolId);
      window.scrollTo(0, 0);
    }
  }, [toolId]);

  return (
    <>
      <SEO
        title="Farm Tools & Calculators — 25 Free Tools for Nepali Farmers"
        description="25 free farm tools and calculators for Nepali farmers and livestock keepers: tape-based weight estimation, gestation dates, heat & AI breeding planner, feed rations, medicine dosage, water needs, market value, body condition score, dairy income, herd & milk ledger, Ropani-Bigha land units, poultry & hatchery planning, vaccination reminders, manure & compost value with biogas potential, IPCC Tier 1 methane & carbon hoofprint, fat/SNF milk quality & payment, live weather with THI heat-stress alerts, a 30-year district climate tracker with rainfall normals and warming trend, a CMT udder checker, silage pit planner, calf colostrum & milk schedule, herd fodder budget and grain-storage aflatoxin risk — plus a symptom checker — bilingual, no sign-up."
        keywords="farm calculator Nepal, livestock weight estimator, gestation calculator cattle buffalo goat, dairy income calculator Nepal, water requirement livestock, goat market price Nepal, live animal value estimator, incubation hatch calendar chicken duck quail, ropani aana converter, bigha kattha dhur conversion, dry matter intake calculator, feed requirement buffalo, veterinary dosage calculator mg kg, poultry feed FCR calculator, vaccination reminder FMD HS PPR, livestock symptom checker, body condition score cattle buffalo BCS, herd record keeping app, milk production tracker, milk fat SNF payment calculator, methane carbon footprint livestock IPCC, climate tracker Nepal rainfall normals monsoon, Nepal weather livestock heat stress THI, किसान क्यालकुलेटर, दुग्ध आम्दानी गणना, पशु पानी आवश्यकता, खसी मूल्य, अन्डा कलाउने पात्रो, रोपनी रूपान्तरण, गर्भावधि हिसाब, चारा गणना, खुराक क्यालकुलेटर, शरीर अवस्था अंक, खोर अभिलेख, मौसम सहायक, दुध बोसो एसएनएफ, जलवायु पछिल्लगता, कार्बन पदचाप"
        path="/tools"
      />
      <div className="bg-gray-50 min-h-screen pb-20 print:pb-0">
        {active ? <ToolView tool={active} np={np} /> : <ToolsHub np={np} />}
      </div>
    </>
  );
}
