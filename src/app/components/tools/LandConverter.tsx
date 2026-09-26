import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Ruler, RotateCcw, Info, Mountain, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";

/**
 * Nepal land-unit converter — the two traditional systems every kitta
 * (land plot) is still recorded in, converted with the standard factors
 * used by the Survey Department / government land records:
 *
 *   Hill system: 1 Ropani = 16 Aana = 64 Paisa = 256 Daam = 508.72 m²
 *   Terai system: 1 Bigha = 20 Kattha = 400 Dhur = 6,772.63 m²
 *   1 Kattha = 338.63 m² · 1 Dhur = 16.93 m² · 1 Aana = 31.80 m²
 *
 * (Factors verified against multiple published Nepali land-conversion
 * references that quote the same government survey constants.)
 */

const SQM = {
  ropani: 508.72,
  aana: 508.72 / 16,
  paisa: 508.72 / 64,
  daam: 508.72 / 256,
  bigha: 6772.63,
  kattha: 6772.63 / 20,
  dhur: 6772.63 / 400,
  sqm: 1,
  sqft: 0.09290304,
} as const;

type Unit = keyof typeof SQM;

const UNITS: { value: Unit; en: string; np: string }[] = [
  { value: "ropani", en: "Ropani", np: "रोपनी" },
  { value: "aana", en: "Aana", np: "आना" },
  { value: "paisa", en: "Paisa", np: "पैसा" },
  { value: "daam", en: "Daam", np: "दाम" },
  { value: "bigha", en: "Bigha", np: "बिघा" },
  { value: "kattha", en: "Kattha", np: "कट्ठा" },
  { value: "dhur", en: "Dhur", np: "धुर" },
  { value: "sqm", en: "m²", np: "वर्ग मि." },
  { value: "sqft", en: "ft²", np: "वर्ग फिट" },
];

const fmtNum = (v: number, np: boolean, digits = 2) => {
  const s = v.toLocaleString("en-US", { maximumFractionDigits: digits });
  return np ? toNepaliDigits(s) : s;
};

export function LandConverter({ np }: { np: boolean }) {
  const [value, setValue] = useState("1");
  const [unit, setUnit] = useState<Unit>("ropani");

  const v = Number(value) || 0;
  const sqm = v * SQM[unit];

  /** Compound breakdowns: 1234 m² → 2 Ropani 3 Aana … & 0 Bigha 3 Kattha … */
  const breakdown = useMemo(() => {
    const hill = ["ropani", "aana", "paisa", "daam"] as const;
    const terai = ["bigha", "kattha", "dhur"] as const;
    const parts = (sys: readonly Unit[]) => {
      let rest = sqm;
      const out: { unit: Unit; qty: number }[] = [];
      sys.forEach((u, i) => {
        const step = SQM[u];
        const isLast = i === sys.length - 1;
        const qty = isLast ? rest / step : Math.floor(rest / step);
        if (!isLast) rest -= qty * step;
        out.push({ unit: u, qty });
      });
      return out;
    };
    return { hill: parts(hill), terai: parts(terai) };
  }, [sqm]);

  const F = (x: number, d = 2) => fmtNum(x, np, d);
  const nameOf = (u: Unit) => (np ? UNITS.find((x) => x.value === u)!.np : UNITS.find((x) => x.value === u)!.en);
  const nameOfEn = (u: Unit) => UNITS.find((x) => x.value === u)!.en;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-3 space-y-6">
        <div>
          <Label htmlFor="lc-value" className="text-sm font-semibold text-[#0A2540] mb-2 block">
            <Ruler className="inline mr-1.5" size={15} />
            {np ? "जग्गाको मात्रा" : "Land quantity"}
          </Label>
          <div className="flex gap-3">
            <Input
              id="lc-value"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 text-lg font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              aria-label={np ? "एकाइ छान्नुहोस्" : "Unit"}
              className="border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg px-3 font-semibold text-[#0A2540] bg-white"
            >
              {UNITS.map((u) => (
                <option key={u.value} value={u.value}>
                  {np ? u.np : u.en}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
            {np
              ? "लालपुर्जा वा मोहीमा लेखिएको मात्रा राख्नुहोस् — दुवै प्रणालीमा रुपान्तरण तुरुन्तै देखिन्छ।"
              : "Enter the figure from your lalpurja (title deed) — every other unit appears instantly."}
          </p>
        </div>

        {/* Compound breakdown cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border-2 border-[#0A2540]/10 bg-white p-5"
          >
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0A2540]/60 mb-3">
              <Mountain size={13} className="text-[#B8941F]" />
              {np ? "पहाडी प्रणाली" : "Hill system"}
            </p>
            <p className="text-lg font-bold text-[#0A2540] leading-snug">
              {breakdown.hill.map(({ unit: u, qty }) => (
                <span key={u} className="mr-2 inline-block">
                  {F(qty, 2)} <span className="text-sm font-medium text-gray-500">{nameOf(u)}</span>
                </span>
              ))}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {np ? "रोपनी–आना–पैसा–दाम" : "Ropani–Aana–Paisa–Daam"}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-xl border-2 border-[#0A2540]/10 bg-white p-5"
          >
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0A2540]/60 mb-3">
              <Sun size={13} className="text-[#B8941F]" />
              {np ? "तराई प्रणाली" : "Terai system"}
            </p>
            <p className="text-lg font-bold text-[#0A2540] leading-snug">
              {breakdown.terai.map(({ unit: u, qty }) => (
                <span key={u} className="mr-2 inline-block">
                  {F(qty, 2)} <span className="text-sm font-medium text-gray-500">{nameOf(u)}</span>
                </span>
              ))}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {np ? "बिघा–कट्ठा–धुर" : "Bigha–Kattha–Dhur"}
            </p>
          </motion.div>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setValue("1");
            setUnit("ropani");
          }}
          className="text-sm font-semibold border-2 border-gray-200 hover:border-[#D4AF37]"
        >
          <RotateCcw size={14} className="mr-1.5" />
          {np ? "रिसेट" : "Reset"}
        </Button>
      </div>

      {/* Result — full unit table */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-24 rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6 shadow-xl overflow-hidden">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
            {np ? "सबै एकाइमा" : "In every unit"}
          </p>
          <p className="text-sm text-gray-300 mb-4">
            {F(v, 2)} {nameOf(unit)} =
          </p>
          <ul className="space-y-2 text-sm">
            {UNITS.filter((u) => u.value !== "sqft").map((u) => (
              <li key={u.value} className="flex justify-between gap-3 border-b border-white/10 pb-2 last:border-0">
                <span className="text-gray-300">{nameOf(u.value)} <span className="text-[10px] text-gray-400 uppercase tracking-wide ml-1">{nameOfEn(u.value)}</span></span>
                <span className="font-semibold tabular-nums">
                  {u.value === "sqm" ? F(sqm, 1) : F(v * (SQM[unit] / SQM[u.value]), 3)}
                </span>
              </li>
            ))}
            <li className="flex justify-between gap-3">
              <span className="text-gray-300">{np ? "वर्ग फिट" : "Square feet"}</span>
              <span className="font-semibold tabular-nums">{F(sqm / 0.09290304, 0)}</span>
            </li>
          </ul>
        </div>

        <p className="mt-4 text-[11px] text-gray-400 leading-relaxed flex items-start gap-1.5">
          <Info size={12} className="mt-0.5 flex-shrink-0" />
          {np
            ? "मापन तत्वहरू (१ रोपनी = ५०८.७२ वर्ग मि., १ बिघा = ६,७७२.६३ वर्ग मि.) नेपाल सरकारको मापन तालिका अनुसार। स्थानीय अभिलेखमा सानो भिन्नता भेटिन सक्छ।"
            : "Standard factors (1 Ropani = 508.72 m², 1 Bigha = 6,772.63 m²) as used in Government of Nepal land records. Local records can differ marginally."}
        </p>
      </div>
    </div>
  );
}
