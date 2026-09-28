import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Leaf, Wheat, Weight, Info, MapPin } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/* ─────────────────────────────────────────────────────────────────────────────
 *  FODDER BUDGET — what the whole herd eats this month, and the land that
 *  has to grow it.
 *
 *  Verified reference figures:
 *  · DMI as % of body weight: dairy cattle 2.5–4.5%, beef 2–3%, goats
 *    3–4% (dairy-extension feeding guides; FAO feed-requirement method
 *    2.5 kg DM / 100 kg LW; MSD goat intake 1.8–2% on high-NDF forage —
 *    defaults sit mid-range and are EDITABLE per class).
 *  · Fresh green fodder ~20–25% DM (default 22%); air-dry roughage ~88% DM.
 *  · Land: 1 ha = 19.65 ropani; multi-cut fodder systems on good management
 *    yield ~40–80 t/ha/yr of green matter — default 60, editable.
 * ──────────────────────────────────────────────────────────────────────────── */

const fmt = (v: number, np: boolean, digits = 1) => {
  const s = v.toFixed(digits);
  return np ? toNepaliDigits(s) : s;
};

const num = (s: string) => {
  const v = parseFloat(s);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

type ClassId = "cowL" | "cowD" | "bufL" | "bufD" | "goat" | "calf";

const CLASSES: { id: ClassId; en: string; np: string; dmi: number; bw: number }[] = [
  { id: "cowL", en: "Cow · milking", np: "गाई · दुध", dmi: 3.0, bw: 350 },
  { id: "cowD", en: "Cow · dry", np: "गाई · सुकेको", dmi: 2.5, bw: 350 },
  { id: "bufL", en: "Buffalo · milking", np: "भैंसी · दुध", dmi: 3.0, bw: 400 },
  { id: "bufD", en: "Buffalo · dry", np: "भैंसी · सुकेको", dmi: 2.5, bw: 400 },
  { id: "goat", en: "Goat / sheep", np: "बाख्रा / भेडा", dmi: 3.5, bw: 30 },
  { id: "calf", en: "Calf / youngstock", np: "बछडा / डिला", dmi: 2.8, bw: 80 },
];

export function FodderBudget({ np }: { np: boolean }) {
  const [counts, setCounts] = useState<Record<ClassId, string>>({
    cowL: "2", cowD: "1", bufL: "2", bufD: "0", goat: "0", calf: "1",
  });
  const [greenShare, setGreenShare] = useState(60);
  const [greenDm, setGreenDm] = useState("22");
  const [yieldHa, setYieldHa] = useState("60");

  const rows = CLASSES.map((c) => {
    const n = Math.max(0, Math.round(num(counts[c.id])));
    const dmiKg = (n * c.bw * c.dmi) / 100;
    return { ...c, n, dmiKg };
  });
  const totalDmi = rows.reduce((a, r) => a + r.dmiKg, 0);
  const totalAnimals = rows.reduce((a, r) => a + r.n, 0);

  const calc = useMemo(() => {
    const greenDmKg = (totalDmi * greenShare) / 100;
    const dryDmKg = (totalDmi * 25) / 100; // dry roughage 25% of DM
    const concDmKg = totalDmi - greenDmKg - dryDmKg; // remainder concentrate
    const greenAsFed = greenDmKg / (num(greenDm) / 100);
    const dryAsFed = dryDmKg / 0.88;
    const concAsFed = concDmKg;
    const greenMonthly = greenAsFed * 30;
    const greenYearly = greenAsFed * 365;
    const landHa = greenYearly / 1000 / num(yieldHa);
    const landRopani = landHa * 19.65;
    return { greenDmKg, dryDmKg, concDmKg, greenAsFed, dryAsFed, concAsFed, greenMonthly, greenYearly, landHa, landRopani };
  }, [totalDmi, greenShare, greenDm, yieldHa]);

  return (
    <div className="max-w-2xl space-y-6">
      {/* Herd table */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-1">
          <Weight size={13} aria-hidden="true" />
          {np ? "बथान भर्नुहोस्" : "Fill in the herd"}
        </p>
        <p className="text-[11px] text-gray-400 mb-4">
          {np
            ? "सङ्ख्या लेख्नुहोस् — औसत तौल र DMI% पहिले नै राखिएको छ, आफ्नो अनुभवले मिलाउनुहोस्"
            : "Enter counts — typical weight and DMI% are prefilled; tune them to your own animals"}
        </p>

        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-[1fr,64px,64px,72px] items-center gap-2 rounded-xl bg-gray-50/70 border border-gray-100 px-3 py-2">
              <span className="text-[13px] font-semibold text-[#0A2540] truncate">{np ? r.np : r.en}</span>
              <div>
                <Input
                  type="number" inputMode="numeric" min={0}
                  value={counts[r.id]}
                  onChange={(e) => setCounts((p) => ({ ...p, [r.id]: e.target.value }))}
                  aria-label={`${r.en} count`}
                  className="text-right font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
                />
              </div>
              <span className="text-[11px] text-gray-400 text-right">{fmt(r.bw, np, 0)} kg</span>
              <span className="text-[11px] font-semibold text-[#B8941F] text-right">{fmt(r.dmi, np, 1)}% DM</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 mt-3 leading-snug">
          {np
            ? "DMI: दुध दिने ३.०%, सुकेको २.५%, बाख्रा ३.५% — सामान्य सीमाका बीचको मान (FAO १०० केजीको २.५ केजी DM विधि; extension मार्गदर्शन)।"
            : "DMI: milking 3.0%, dry 2.5%, goats 3.5% — mid-range of standard guidance (FAO 2.5 kg DM/100 kg LW method; extension guides)."}
        </p>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Label className="text-[13px] font-semibold text-[#0A2540]">
              {np ? "हरियो चाराको हिस्सा (DM मा)" : "Green-fodder share (of DM)"}
            </Label>
            <span className="text-sm font-bold text-[#B8941F]">{fmt(greenShare, np, 0)}%</span>
          </div>
          <input
            type="range" min={30} max={80} step={5} value={greenShare}
            onChange={(e) => setGreenShare(Number(e.target.value))}
            className="w-full accent-[#D4AF37] mt-1"
            aria-label={np ? "हरियो चाराको हिस्सा" : "Green fodder share"}
          />
          <p className="text-[11px] text-gray-400 mt-1 leading-snug">
            {np
              ? "बाँकीमा सुक्खा चारा ~२५% र दाना बाँकी — चाहिने तीनै थरी तल देखिन्छन्।"
              : "Dry roughage stays ~25% of DM and concentrate takes the rest — all three shown below."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">{np ? "हरियो चारा DM%" : "Green fodder DM%"}</Label>
            <Input
              type="number" inputMode="decimal" min={10} max={40} step={1}
              value={greenDm} onChange={(e) => setGreenDm(e.target.value)}
              className="mt-1 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
          </div>
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540]">{np ? "चारा उत्पादन (टन/हे./वर्ष)" : "Fodder yield (t/ha/yr)"}</Label>
            <Input
              type="number" inputMode="decimal" min={20} max={120} step={5}
              value={yieldHa} onChange={(e) => setYieldHa(e.target.value)}
              className="mt-1 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6 shadow-xl">
        <p className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-4">
          <Leaf size={14} />
          {np ? "दिनको चारा — तीन थरी" : "Today's feed — three kinds"}
        </p>

        <motion.div
          key={totalDmi}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl font-bold leading-none"
        >
          {fmt(totalDmi, np, 0)}
          <span className="text-xl text-gray-400 font-semibold ml-2">{np ? "केजी सुक्खा पदार्थ/दिन" : "kg dry matter/day"}</span>
        </motion.div>
        <p className="text-sm text-gray-400 mt-2">
          {np
            ? `${fmt(totalAnimals, np, 0)} वटा पशु — हरेक वर्गको तौल र DMI% ले निकालेको`
            : `across ${fmt(totalAnimals, np, 0)} animals — from each class's weight and DMI%`}
        </p>

        <div className="mt-5 space-y-2.5">
          {[
            { icon: Leaf, label: np ? "हरियो चारा (ताजा)" : "Green fodder (fresh)", val: calc.greenAsFed, unit: np ? "केजी/दिन" : "kg/day", note: `${fmt(greenShare, np, 0)}% DM ताजा ${fmt(num(greenDm), np, 0)}% मा बदलेर` },
            { icon: Wheat, label: np ? "सुक्खा चारा (पराला-हे)" : "Dry roughage (straw-hay)", val: calc.dryAsFed, unit: np ? "केजी/दिन" : "kg/day", note: np ? "८८% DM मानेर" : "at 88% DM" },
            { icon: Weight, label: np ? "दाना (कन्सन्ट्रेट)" : "Concentrate", val: calc.concAsFed, unit: np ? "केजी/दिन" : "kg/day", note: np ? "बाँकी DM — दुध अनुसार मिलाउनुहोस्" : "DM remainder — adjust for milk" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-3.5 py-3">
              <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <c.icon size={16} className="text-emerald-300" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-white">{c.label}</p>
                <p className="text-[11px] text-gray-400 leading-snug">{c.note}</p>
              </div>
              <p className="font-display text-lg font-bold flex-shrink-0">
                {fmt(c.val, np, 0)} <span className="text-[10px] text-gray-400 font-medium">{c.unit}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300 uppercase tracking-wider">
              <Leaf size={12} aria-hidden="true" />
              {np ? "मासिक हरियो चारा" : "Monthly green fodder"}
            </p>
            <p className="font-display text-xl font-bold mt-1.5 leading-none">{fmt(calc.greenMonthly / 1000, np, 1)} t</p>
            <p className="text-[11px] text-gray-400 mt-1.5">{fmt(calc.greenMonthly, np, 0)} kg {np ? "महिनामा" : "per month"}</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300 uppercase tracking-wider">
              <MapPin size={12} aria-hidden="true" />
              {np ? "चाहिने जग्गा" : "Land needed"}
            </p>
            <p className="font-display text-xl font-bold mt-1.5 leading-none">{fmt(calc.landRopani, np, 1)} {np ? "रोपनी" : "ropani"}</p>
            <p className="text-[11px] text-gray-400 mt-1.5">
              {fmt(num(yieldHa), np, 0)} t/ha/yr {np ? "उब्जाउँदा" : "at your yield"} · {fmt(calc.landHa, np, 2)} ha
            </p>
          </div>
        </div>

        <div className="mt-4">
          <ResultCardActions
            np={np}
            toolId="fodderbudget"
            label={np ? "बथान चारा बजेट" : "Herd fodder budget"}
            summary={np
              ? `${fmt(totalAnimals, np, 0)} वटा पशु: दिनको ${fmt(totalDmi, np, 0)} केजी DM — हरियो ${fmt(calc.greenAsFed, np, 0)} केजी + सुक्खा ${fmt(calc.dryAsFed, np, 0)} + दाना ${fmt(calc.concAsFed, np, 0)}`
              : `${fmt(totalAnimals, np, 0)} animals: ${fmt(totalDmi, np, 0)} kg DM/day — green ${fmt(calc.greenAsFed, np, 0)} kg + dry ${fmt(calc.dryAsFed, np, 0)} + concentrate ${fmt(calc.concAsFed, np, 0)}`}
            detail={(np
              ? `बथान: ${rows.filter((r) => r.n > 0).map((r) => `${r.np}×${r.n}`).join(", ")}\n`
              : `Herd: ${rows.filter((r) => r.n > 0).map((r) => `${r.en}×${r.n}`).join(", ")}\n`
            ) + (np
              ? `कुल DMI: ${fmt(totalDmi, np, 0)} केजी/दिन\nहरियो चारा: ${fmt(calc.greenAsFed, np, 0)} केजी/दिन (मासिक ${fmt(calc.greenMonthly / 1000, np, 1)} टन)\nसुक्खा: ${fmt(calc.dryAsFed, np, 0)} केजी/दिन · दाना: ${fmt(calc.concAsFed, np, 0)} केजी/दिन\nचाहिने जग्गा: ${fmt(calc.landRopani, np, 1)} रोपनी (${fmt(num(yieldHa), np, 0)} ट/हे./वर्ष मानेर)\ndrmogalshah.com.np/tools/fodderbudget`
              : `Total DMI: ${fmt(totalDmi, np, 0)} kg/day\nGreen fodder: ${fmt(calc.greenAsFed, np, 0)} kg/day (monthly ${fmt(calc.greenMonthly / 1000, np, 1)} t)\nDry roughage: ${fmt(calc.dryAsFed, np, 0)} kg/day · Concentrate: ${fmt(calc.concAsFed, np, 0)} kg/day\nLand needed: ${fmt(calc.landRopani, np, 1)} ropani (at ${fmt(num(yieldHa), np, 0)} t/ha/yr)\ndrmogalshah.com.np/tools/fodderbudget`)}
          />
        </div>
      </div>

      {/* Reference */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-3">
          <Info size={13} aria-hidden="true" />
          {np ? "स्रोत र सीमा" : "Sources & limits"}
        </p>
        <p className="text-[13px] text-gray-600 leading-relaxed">
          {np
            ? "DMI प्रतिशत: FAO आहार-आवश्यकता विधि (१०० केजी जीवित तौलमा २.५ केजी DM) र extension मार्गदर्शन (दुग्ध गाई २.५–४.५%, बाख्रा ३–४%); ताजा चारा २०–२५% DM; सुक्खा चारा ~८८% DM; १ हेक्टर = १९.६५ रोपनी। यो योजना बजेटका लागि हो — वास्तविक खुराक दुध, गर्भावस्था र मौसुमसँग मिलाउनुहोस्।"
            : "DMI percentages: FAO feed-requirement method (2.5 kg DM per 100 kg LW) and extension guidance (dairy cows 2.5–4.5%, goats 3–4%); fresh fodder 20–25% DM; dry roughage ~88% DM; 1 ha = 19.65 ropani. This is a budgeting plan — actual rations should follow milk yield, pregnancy and season."}
        </p>
      </div>
    </div>
  );
}
