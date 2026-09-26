import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Wheat, RotateCcw, Info, Droplets } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";

/**
 * Feed & dry-matter calculator — body weight → daily dry-matter requirement.
 *
 * Dry-matter intake (DMI) bands:
 *   · FAO (Estimation of feed requirements, ch. 7): 2.5 kg DM per 100 kg
 *     liveweight per day — the species-general standard (1 TLU = 250 kg).
 *   · Dairy feeding guidelines: cattle 2.0–2.5 % of body weight,
 *     buffalo 2.5–3.0 % of body weight.
 *
 * Green-fodder equivalent uses the typical 20–25 % dry-matter content of
 * fresh fodder; the concentrate note states the classic field rule used by
 * extension services (~1 kg concentrate per 2.5 L of milk above maintenance).
 */

const ANIMALS = [
  { value: "cattleLactating", en: "Cow · milking",   np: "गाई · दुध दुहुने",     low: 2.5, high: 3.0 },
  { value: "cattleDry",       en: "Cow · dry",       np: "गाई · सुकेको",         low: 2.0, high: 2.5 },
  { value: "buffaloLactating",en: "Buffalo · milking",np: "भैंसी · दुध दुहने",   low: 2.5, high: 3.0 },
  { value: "buffaloDry",      en: "Buffalo · dry",   np: "भैंसी · सुकेको",       low: 2.5, high: 3.0 },
  { value: "goat",            en: "Goat / Sheep",    np: "बाख्रा / भेडा",         low: 2.5, high: 4.0 },
] as const;

const FRESH_DM_LOW = 0.2;   // fresh fodder ~20% dry matter
const FRESH_DM_HIGH = 0.25; // ...up to 25%

export function FeedCalculator({ np }: { np: boolean }) {
  const [animal, setAnimal] = useState<string>("buffaloLactating");
  const [weight, setWeight] = useState("400");
  const [milk, setMilk] = useState("5");

  const spec = ANIMALS.find((a) => a.value === animal) ?? ANIMALS[0];
  const w = Math.max(0, Number(weight) || 0);
  const milkL = Math.max(0, Number(milk) || 0);
  const showMilk = animal.endsWith("Lactating");

  const r = useMemo(() => {
    const dmLow = (w * spec.low) / 100;
    const dmHigh = (w * spec.high) / 100;
    return {
      dmLow,
      dmHigh,
      freshLow: dmLow / FRESH_DM_HIGH, // fresher fodder = more kg for same DM
      freshHigh: dmHigh / FRESH_DM_LOW,
      conc: milkL / 2.5, // field rule: 1 kg per 2.5 L
      waterLow: dmLow * 2,
      waterHigh: dmHigh * 3,
    };
  }, [w, spec, milkL]);

  const F = (x: number, d = 1) => {
    const s = x.toLocaleString("en-US", { maximumFractionDigits: d });
    return np ? toNepaliDigits(s) : s;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-3 space-y-6">
        <div>
          <Label className="text-sm font-semibold text-[#0A2540] mb-3 block">
            {np ? "पशु र अवस्था" : "Animal & state"}
          </Label>
          <div className="flex flex-wrap gap-2">
            {ANIMALS.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => setAnimal(a.value)}
                aria-pressed={animal === a.value}
                className={`px-3.5 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  animal === a.value
                    ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#0A2540]"
                    : "border-gray-200 text-gray-600 hover:border-[#D4AF37]/50"
                }`}
              >
                {np ? a.np : a.en}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            {np
              ? "दुध दुहुने अवस्थामा कम्तीमा यो दायरा चाहिन्छ; सुकेको (dry) अवस्थामा घट्छ।"
              : "Lactating animals need the upper band; dry animals need less."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="fc-weight" className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "शरीरको तौल (कि.ग्रा.)" : "Body weight (kg)"}
            </Label>
            <Input
              id="fc-weight"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="text-lg font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {np ? "तौल थाहा नभए यो पानाको “तौल अनुमान” औजार प्रयोग गर्नुहोस्।" : "No scale? Use the weight-estimator tab on this page."}
            </p>
          </div>
          {showMilk ? (
            <div>
              <Label htmlFor="fc-milk" className="text-sm font-semibold text-[#0A2540] mb-2 block">
                {np ? "दैनिक दुध (लिटर)" : "Daily milk (L)"}
              </Label>
              <Input
                id="fc-milk"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={milk}
                onChange={(e) => setMilk(e.target.value)}
                className="text-lg font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                {np ? "गाइभैंसीको दैनिक औसत दुध।" : "Average litres per day."}
              </p>
            </div>
          ) : null}
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setAnimal("buffaloLactating");
            setWeight("400");
            setMilk("5");
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
            {np ? "दैनिक आवश्यकता" : "Daily requirement"}
          </p>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={animal}>
            <div className="flex items-baseline gap-2">
              <Wheat size={18} className="text-[#D4AF37]" />
              <p className="text-3xl font-bold leading-tight">
                {F(r.dmLow)}–{F(r.dmHigh)} <span className="text-base font-medium text-gray-300">{np ? "कि.ग्रा. सुख्खा पदार्थ" : "kg dry matter"}</span>
              </p>
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex justify-between gap-3 border-b border-white/10 pb-2.5">
                <span className="text-gray-300">{np ? "ताजा रुपमा (हरियो चारा)" : "As green fodder"}</span>
                <span className="font-semibold">{F(r.freshLow, 0)}–{F(r.freshHigh, 0)} {np ? "कि.ग्रा." : "kg"}</span>
              </li>
              {showMilk ? (
                <li className="flex justify-between gap-3 border-b border-white/10 pb-2.5">
                  <span className="text-gray-300">{np ? "दाना (कन्सन्ट्रेट) सुझाव" : "Concentrate (rule of thumb)"}</span>
                  <span className="font-semibold">≈ {F(r.conc, 1)} {np ? "कि.ग्रा." : "kg"}</span>
                </li>
              ) : null}
              <li className="flex justify-between gap-3">
                <span className="text-gray-300 inline-flex items-center gap-1.5">
                  <Droplets size={13} className="text-blue-300" />
                  {np ? "पिउने पानी (अनुमान)" : "Drinking water (approx.)"}
                </span>
                <span className="font-semibold">{F(r.waterLow, 0)}–{F(r.waterHigh, 0)} {np ? "लि." : "L"}</span>
              </li>
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-gray-300/90">
              {showMilk
                ? np
                  ? "कन्सन्ट्रेट अनुमान: दुधको प्रति २.५ लिटरमा करिब १ कि.ग्रा. दाना — विस्तार सेवाको सामान्य नियम।"
                  : "Concentrate rule of thumb used by extension services: ~1 kg per 2.5 L of milk above maintenance."
                : np
                  ? "सुकेको पशुलाई दाना घटाई हरियो/सुक्खा चारा मुख्य राख्नुहोस्।"
                  : "For dry animals keep roughage as the main ration and reduce concentrate."}
            </p>
          </motion.div>
        </div>

        <p className="mt-4 text-[11px] text-gray-400 leading-relaxed flex items-start gap-1.5">
          <Info size={12} className="mt-0.5 flex-shrink-0" />
          {np
            ? "स्रोत: FAO आहार आवश्यकता मापदण्ड (१०० कि.ग्रा. तौलमा २.५ कि.ग्रा. सुख्खा पदार्थ); गाई २.०–२.५%, भैंसी २.५–३.०% (दुग्ध दुहुने निर्देशिका)। गुणस्तर, हावापानी र दुध उत्पादनले यो दायरा बदल्छ — ठूलो फरक परे डाक्टरसँग जाँच्नुहोस्।"
            : "Sources: FAO feed-requirement standard (2.5 kg DM per 100 kg liveweight); cattle 2.0–2.5% and buffalo 2.5–3.0% of body weight (dairy feeding guidelines). Feed quality, weather and yield shift the band — verify big changes with your vet."}
        </p>
      </div>
    </div>
  );
}
