import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Scale, Ruler, Syringe, BellRing, Download, Calculator, RotateCcw,
  Info, CalendarDays, AlertTriangle, Weight, Stethoscope, Map, Wheat, Pill, Bird,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { HealthGuide } from "../components/HealthGuide";
import { GestationCalculator } from "../components/tools/GestationCalculator";
import { LandConverter } from "../components/tools/LandConverter";
import { FeedCalculator } from "../components/tools/FeedCalculator";
import { DosageCalculator } from "../components/tools/DosageCalculator";
import { PoultryCalculator } from "../components/tools/PoultryCalculator";
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
    <div className="max-w-2xl space-y-6">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════ Page shell ═══════════════ */

const TABS = [
  { value: "weight",   icon: Weight,       en: "Weight",      np: "तौल" },
  { value: "gestation",icon: CalendarDays, en: "Gestation",   np: "गर्भावधि" },
  { value: "feed",     icon: Wheat,        en: "Feed",        np: "चारा" },
  { value: "dosage",   icon: Pill,         en: "Dosage",      np: "खुराक" },
  { value: "land",     icon: Map,          en: "Land units",  np: "जग्गा" },
  { value: "poultry",  icon: Bird,         en: "Poultry",     np: "कुखुरा" },
  { value: "vaccine",  icon: BellRing,     en: "Vaccination", np: "खोप" },
  { value: "health",   icon: Stethoscope,  en: "Health guide",np: "रोग लक्षण" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

export function Tools() {
  const { language } = useLanguage();
  const np = language === "np";
  const [tab, setTab] = useState<TabValue>("weight");

  return (
    <>
      <SEO
        title="Farm Tools & Calculators"
        description="Free farm tools and calculators for Nepali farmers and livestock keepers — estimate cattle and goat live weight from heart-girth measurements, plan gestation and dry-off dates, convert Ropani-Aana and Bigha-Kattha land units, compute feed and dry-matter needs, verify medicine dosages, size poultry feed with FCR, generate vaccination calendar reminders, and check disease symptoms in the health guide."
        keywords="farm calculator Nepal, livestock weight estimator, gestation calculator cattle buffalo goat, ropani aana converter, bigha kattha dhur conversion, dry matter intake calculator, feed requirement buffalo, veterinary dosage calculator mg kg, poultry feed FCR calculator, vaccination reminder FMD HS PPR, livestock symptom checker, किसान क्यालकुलेटर, रोपनी रूपान्तरण, गर्भावधि हिसाब, चारा गणना, खुराक क्यालकुलेटर"
        path="/tools"
      />
      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Header band */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white pt-28 pb-12 px-4 sm:px-6">
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
                ? "नापले तौल अनुमान, गर्भावधि हिसाब, रोपनी–बिघा रूपान्तरण, चारा तथा खुराक गणना, कुखुराको दाना योजना, खोपका सम्झना र रोगका लक्षण जाँच — किसान, पशुपालक र कृषकका लागि वैज्ञानिक स्रोतमा आधारित निःशुल्क औजारहरू।"
                : "Weigh animals with a measuring tape, plan gestation and dry-off dates, convert Ropani↔Bigha land units, size feed rations, verify medicine dosages, plan poultry feed, keep vaccinations on autopilot, and triage disease symptoms — free tools built on published livestock science."}
            </p>
          </div>
        </div>

        {/* Tool switcher + card */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-5 sm:p-10">
              {/* Tool rail — wraps on small screens, scrolls if ever needed */}
              <div
                className="flex flex-wrap gap-2 mb-8"
                role="tablist"
                aria-label={np ? "औजार छान्नुहोस्" : "Choose a tool"}
              >
                {TABS.map(({ value, icon: Icon, en, np: npLabel }) => (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={tab === value}
                    onClick={() => setTab(value)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                      tab === value
                        ? "bg-[#0A2540] text-white border-[#0A2540] shadow-md"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/60 hover:text-[#0A2540]"
                    }`}
                  >
                    <Icon size={15} className={tab === value ? "text-[#D4AF37]" : "text-gray-400"} />
                    {np ? npLabel : en}
                  </button>
                ))}
              </div>

              {tab === "weight" ? (
                <WeightEstimator np={np} />
              ) : tab === "gestation" ? (
                <GestationCalculator np={np} />
              ) : tab === "feed" ? (
                <FeedCalculator np={np} />
              ) : tab === "dosage" ? (
                <DosageCalculator np={np} />
              ) : tab === "land" ? (
                <LandConverter np={np} />
              ) : tab === "poultry" ? (
                <PoultryCalculator np={np} />
              ) : tab === "vaccine" ? (
                <VaccineReminder np={np} />
              ) : (
                <HealthGuide np={np} />
              )}

              {/* Honest-use disclaimer */}
              <div className="mt-10 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3.5 flex items-start gap-3">
                <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={17} />
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  {np
                    ? "यी अनुमानहरू दाना योजना र तयारीका लागि मात्र हुन् — खोपको खुराक वा उपचार अघि डाक्टरको प्रत्यक्ष जाँच अनिवार्य छ।"
                    : "These estimates are for planning and preparation only — actual dosing and treatment always require a hands-on examination by a veterinarian."}
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-5 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <Info size={12} />
            {np
              ? "औजारहरू तपाईंको ब्राउजरमै चल्छन् — कुनै डाटा कतै पठाइँदैन।"
              : "Everything runs in your browser — no data ever leaves this page."}
          </p>
        </div>
      </div>
    </>
  );
}
