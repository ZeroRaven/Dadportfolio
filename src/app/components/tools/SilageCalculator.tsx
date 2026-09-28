import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Wheat, Boxes, Calculator, Info, Timer } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/* ─────────────────────────────────────────────────────────────────────────────
 *  SILAGE PLANNER — how much the pit holds, and how long it feeds.
 *
 *  Verified reference figures:
 *  · Well-packed bunker/pit silage ≈ 600–700 kg per cubic metre (as-fed);
 *    default 650, editable. (Silage-pit calculation guides; UNL CropWatch
 *    bunker tonnage method.)
 *  · Harvest DM for maize silage 30–35% (35% DM example, ag-proud/UNL);
 *    trench/pit storage losses typically 12–23% (silage-loss tables) —
 *    default wastage allowance 15%, editable.
 *  · Intake: cows eat silage as ~3% of body weight DM — the per-animal
 *    as-fed default (25 kg) matches a ~400 kg bovine on a 32%-DM ration.
 * ──────────────────────────────────────────────────────────────────────────── */

const fmt = (v: number, np: boolean, digits = 1) => {
  const s = v.toFixed(digits);
  return np ? toNepaliDigits(s) : s;
};

const num = (s: string) => {
  const v = parseFloat(s);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

export function SilageCalculator({ np }: { np: boolean }) {
  const [length, setLength] = useState("6");
  const [width, setWidth] = useState("3");
  const [depth, setDepth] = useState("1.5");
  const [density, setDensity] = useState("650");
  const [dm, setDm] = useState(32);
  const [wastage, setWastage] = useState(15);
  const [animals, setAnimals] = useState("3");
  const [perHead, setPerHead] = useState("25");

  const calc = useMemo(() => {
    const volume = num(length) * num(width) * num(depth); // m³
    const asFed = (volume * num(density)) / 1000; // tonnes
    const dmTonnes = (asFed * dm) / 100;
    const usable = asFed * (1 - wastage / 100);
    const dailyHerd = num(animals) * num(perHead);
    const days = dailyHerd > 0 ? Math.floor((usable * 1000) / dailyHerd) : 0;
    const refillDays = 60;
    const refillVolume = dailyHerd > 0 ? ((dailyHerd * refillDays) / 1000) / (num(density) / 1000) : 0;
    return { volume, asFed, dmTonnes, usable, dailyHerd, days, refillVolume, refillDays };
  }, [length, width, depth, density, dm, wastage, animals, perHead]);

  return (
    <div className="max-w-2xl space-y-6">
      {/* Silo / pit inputs */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-1">
          <Boxes size={13} aria-hidden="true" />
          {np ? "तपाईंको गारो / खाल्डो" : "Your pit / bunker"}
        </p>
        <p className="text-[11px] text-gray-400 mb-4">
          {np ? "भित्री नाप (मिटरमा) लेख्नुहोस्" : "Inside measurements, in metres"}
        </p>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">{np ? "लम्बाइ" : "Length"}</Label>
            <Input
              type="number" inputMode="decimal" min={0.5} step={0.5}
              value={length} onChange={(e) => setLength(e.target.value)}
              className="mt-1 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
          </div>
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">{np ? "चौडाइ" : "Width"}</Label>
            <Input
              type="number" inputMode="decimal" min={0.5} step={0.5}
              value={width} onChange={(e) => setWidth(e.target.value)}
              className="mt-1 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
          </div>
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">{np ? "गहिराइ" : "Depth"}</Label>
            <Input
              type="number" inputMode="decimal" min={0.5} step={0.25}
              value={depth} onChange={(e) => setDepth(e.target.value)}
              className="mt-1 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">
              {np ? "घनत्व (केजी/म³)" : "Density (kg/m³)"}
            </Label>
            <Input
              type="number" inputMode="decimal" min={300} max={900} step={25}
              value={density} onChange={(e) => setDensity(e.target.value)}
              className="mt-1 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
            <p className="text-[11px] text-gray-400 mt-1 leading-snug">
              {np ? "राम्ररी कसेको सिलेज ६००–७०० — कम कसेको भन्दा धेरै गुम्छ" : "Well-packed 600–700; loose packing stores less and spoils more"}
            </p>
          </div>
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">
              {np ? "बथान · प्रति पशु केजी/दिन" : "Herd · kg/animal/day"}
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="number" inputMode="numeric" min={1}
                value={animals} onChange={(e) => setAnimals(e.target.value)}
                className="w-20 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
              />
              <Input
                type="number" inputMode="decimal" min={1}
                value={perHead} onChange={(e) => setPerHead(e.target.value)}
                className="flex-1 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1 leading-snug">
              {np ? "४०० केजी गाईभैंसीलाई ~२५ केजी सिलेज सामान्य" : "~25 kg suits a 400-kg bovine"}
            </p>
          </div>
        </div>

        {/* DM slider */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Label className="text-[13px] font-semibold text-[#0A2540]">
              {np ? "सुक्खा पदार्थ (DM)" : "Dry matter (DM)"}
            </Label>
            <span className="text-sm font-bold text-[#B8941F]">{fmt(dm, np, 0)}%</span>
          </div>
          <input
            type="range" min={22} max={45} step={1} value={dm}
            onChange={(e) => setDm(Number(e.target.value))}
            className="w-full accent-[#D4AF37] mt-1"
            aria-label={np ? "सिलेजको सुक्खा पदार्थ प्रतिशत" : "Silage dry matter percent"}
          />
          <p className="text-[11px] text-gray-400 mt-1 leading-snug">
            {np
              ? "मकै सिलेज ३०–३५% मा काट्नु — धेरै चिसो भए झैँ बग्छ, धेरै सुक्खो भए गारो तातो पार्छ।"
              : "Cut maize silage at 30–35% — wetter seeps, drier heats in the pit."}
          </p>
        </div>

        {/* Wastage slider */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Label className="text-[13px] font-semibold text-[#0A2540]">
              {np ? "बर्बादी सीमा" : "Wastage allowance"}
            </Label>
            <span className="text-sm font-bold text-[#B8941F]">{fmt(wastage, np, 0)}%</span>
          </div>
          <input
            type="range" min={5} max={30} step={1} value={wastage}
            onChange={(e) => setWastage(Number(e.target.value))}
            className="w-full accent-[#D4AF37] mt-1"
            aria-label={np ? "बर्बादी प्रतिशत" : "Wastage percent"}
          />
          <p className="text-[11px] text-gray-400 mt-1 leading-snug">
            {np
              ? "गारो-खाल्डोमा १२–२३% सामान्य हानि — सतह र किनार कसरी मिल्छ, त्यसले तय गर्छ।"
              : "Trench/pit losses run 12–23% — surface and edge care decide where you land."}
          </p>
        </div>
      </div>

      {/* Result panel */}
      <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6 shadow-xl">
        <p className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
          <Wheat size={14} />
          {np ? "गारोले कति, कति दिन पुग्छ" : "What the pit holds & feeds"}
        </p>

        <motion.div
          key={calc.days}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl font-bold leading-none"
        >
          {fmt(calc.days, np, 0)}
          <span className="text-xl text-gray-400 font-semibold ml-2">{np ? "दिन" : "days"}</span>
        </motion.div>
        <p className="text-sm text-gray-400 mt-2">
          {np
            ? `${fmt(num(animals), np, 0)} वटा पशु · दिनको ${fmt(calc.dailyHerd, np, 0)} केजी खुवाउँदा`
            : `for ${fmt(num(animals), np, 0)} animals eating ${fmt(calc.dailyHerd, np, 0)} kg/day`}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { icon: Boxes, label: np ? "कुल सिलेज (ताजा)" : "Total silage (as-fed)", value: `${fmt(calc.asFed, np, 1)} t`, note: `${fmt(calc.volume, np, 1)} m³ × ${fmt(num(density), np, 0)} kg/m³` },
            { icon: Wheat, label: np ? "सुक्खा पदार्थ" : "Dry matter", value: `${fmt(calc.dmTonnes, np, 1)} t`, note: `${fmt(dm, np, 0)}% DM` },
            { icon: Calculator, label: np ? "बर्बादीपछि उपलब्ध" : "Usable after wastage", value: `${fmt(calc.usable, np, 1)} t`, note: `${fmt(wastage, np, 0)}% हानि काटेर` },
            { icon: Timer, label: np ? `${fmt(calc.refillDays, np, 0)} दिनको थप गारो` : `Pit size for ${fmt(calc.refillDays, np, 0)} days`, value: `${fmt(calc.refillVolume, np, 0)} m³`, note: np ? "नयाँ भर्न खन्नुपर्ने नाप" : "volume to dig for the next fill" },
          ].map((c, i) => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3.5">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300 uppercase tracking-wider">
                <c.icon size={12} aria-hidden="true" />
                {c.label}
              </p>
              <p className="font-display text-xl font-bold mt-1.5 leading-none">{c.value}</p>
              <p className="text-[11px] text-gray-400 mt-1.5 leading-snug">{c.note}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
          {np
            ? `गणना: ${fmt(num(length), np, 1)}×${fmt(num(width), np, 1)}×${fmt(num(depth), np, 1)} मि.³ × ${fmt(num(density), np, 0)} केजी/मि.³ — घनत्व ६५० राम्ररी कसेको गारोको अनुमान, आफ्नै अनुभवले ठीक पार्नुहोस्।`
            : `Working: ${fmt(num(length), np, 1)}×${fmt(num(width), np, 1)}×${fmt(num(depth), np, 1)} m³ × ${fmt(num(density), np, 0)} kg/m³ — 650 kg/m³ assumes firm packing; refine with your own experience.`}
        </p>

        <div className="mt-4">
          <ResultCardActions
            np={np}
            toolId="silage"
            label={np ? "सिलेज योजना" : "Silage plan"}
            summary={np
              ? `${fmt(num(animals), np, 0)} वटा पशुलाई ${fmt(calc.days, np, 0)} दिन — ${fmt(calc.asFed, np, 1)} टन सिलेज (${fmt(dm, np, 0)}% DM)`
              : `${fmt(num(animals), np, 0)} animals fed for ${fmt(calc.days, np, 0)} days — ${fmt(calc.asFed, np, 1)} t silage (${fmt(dm, np, 0)}% DM)`}
            detail={(np
              ? `गारो: ${fmt(num(length), np, 1)}×${fmt(num(width), np, 1)}×${fmt(num(depth), np, 1)} मि., घनत्व ${fmt(num(density), np, 0)} केजी/मि.³\n`
              : `Pit: ${fmt(num(length), np, 1)}×${fmt(num(width), np, 1)}×${fmt(num(depth), np, 1)} m, density ${fmt(num(density), np, 0)} kg/m³\n`
            ) + (
              np
                ? `कुल ${fmt(calc.asFed, np, 1)} ट · सुक्खा ${fmt(calc.dmTonnes, np, 1)} ट · बर्बादी ${fmt(wastage, np, 0)}%\n${fmt(calc.days, np, 0)} दिन पुग्छ (${fmt(calc.dailyHerd, np, 0)} केजी/दिन)\ndrmogalshah.com.np/tools/silage`
                : `Total ${fmt(calc.asFed, np, 1)} t · DM ${fmt(calc.dmTonnes, np, 1)} t · wastage ${fmt(wastage, np, 0)}%\nFeeds for ${fmt(calc.days, np, 0)} days (${fmt(calc.dailyHerd, np, 0)} kg/day)\ndrmogalshah.com.np/tools/silage`
            )}
          />
        </div>
      </div>

      {/* Reference facts */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-3">
          <Info size={13} aria-hidden="true" />
          {np ? "स्रोत र सन्दर्भ" : "Sources & reference"}
        </p>
        <ul className="space-y-2 text-[13px] text-gray-600 leading-relaxed">
          <li className="flex gap-2.5">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" aria-hidden="true" />
            <span>
              {np
                ? "गारो घनत्व ६००–७०० केजी/मि.³ — सिलेज-गारो गणना तालिका (UNL CropWatch को बङ्कर टनेज विधि, गारो-हानि तालिका १२–२३%)।"
                : "Bunker density 600–700 kg/m³ — silage-pit calculation guides (UNL CropWatch bunker tonnage method; pit-loss tables 12–23%)."}
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" aria-hidden="true" />
            <span>
              {np
                ? "मकै ३०–३५% DM मा काट्ने अभ्यास (UNL/extension मार्गदर्शन) — दाना सुक्खो देखिन थालेपछि काट्नु।"
                : "Cut maize at 30–35% DM (UNL/extension guidance) — the kernel milk-line tells you when."}
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" aria-hidden="true" />
            <span>
              {np
                ? "कस्नु, छोप्नु, दिनहुँ पातलो तह थप्नु — हावा बस्न नदिनु: यही तीन कुराले हानि आधा गर्छ।"
                : "Pack tight, seal airtight, fill in thin daily layers — those three habits halve the losses."}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
