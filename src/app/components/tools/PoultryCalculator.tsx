import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Bird, RotateCcw, Info, Coins } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";

/**
 * Poultry feed & FCR calculator.
 *
 * Verified reference bands:
 *   · Layer intake: ~100–120 g feed per hen per day (typical commercial layer
 *     management); Nepali commercial layers average ~112 eggs/hen/year
 *     (vs 60–70 for backyard flocks) per published Nepali poultry statistics.
 *   · Feed conversion ratio: broilers ~1.5–1.8 kg feed per kg gain; layers
 *     ~2.0–2.3 kg feed per kg egg mass (industry references).
 *   · Feed is typically 60–70% of production cost in poultry operations
 *     (industry cost-structure references).
 */

const MODES = [
  { value: "layer",  en: "Layer flock",   np: "अन्डा कुखुरा (लेयर)" },
  { value: "broiler",en: "Broiler batch", np: "मासु कुखुरा (ब्रोइलर)" },
] as const;

const LAYER_G_PER_HEN = { low: 100, high: 120 }; // g feed / hen / day
const BROILER_FCR = { low: 1.5, high: 1.8 };     // kg feed / kg gain
const LAYER_EGGS_PER_HEN_YEAR = 112;             // Nepali commercial average

export function PoultryCalculator({ np }: { np: boolean }) {
  const [mode, setMode] = useState<string>("layer");
  const [birds, setBirds] = useState("500");
  const [days, setDays] = useState("30");
  const [weight, setWeight] = useState("2");        // broiler target kg/bird
  const [feedPrice, setFeedPrice] = useState("85"); // Rs per kg

  const isLayer = mode === "layer";
  const b = Math.max(0, Number(birds) || 0);
  const d = Math.max(0, Number(days) || 0);
  const tw = Math.max(0, Number(weight) || 0);
  const price = Math.max(0, Number(feedPrice) || 0);

  const r = useMemo(() => {
    if (isLayer) {
      const feedLow = (b * d * LAYER_G_PER_HEN.low) / 1000;
      const feedHigh = (b * d * LAYER_G_PER_HEN.high) / 1000;
      const eggs = (b * LAYER_EGGS_PER_HEN_YEAR * d) / 365;
      return { feedLow, feedHigh, eggs, sacks: feedHigh / 50 };
    }
    const totalGain = b * tw;
    const feedLow = totalGain * BROILER_FCR.low;
    const feedHigh = totalGain * BROILER_FCR.high;
    return { feedLow, feedHigh, eggs: null, sacks: feedHigh / 50, totalGain };
  }, [isLayer, b, d, tw]);

  const F = (x: number, digits = 0) => {
    const s = x.toLocaleString("en-US", { maximumFractionDigits: digits });
    return np ? toNepaliDigits(s) : s;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-3 space-y-6">
        <div>
          <Label className="text-sm font-semibold text-[#0A2540] mb-3 block">
            {np ? "कुखुराको प्रकार" : "Flock type"}
          </Label>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMode(m.value)}
                aria-pressed={mode === m.value}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  mode === m.value
                    ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#0A2540]"
                    : "border-gray-200 text-gray-600 hover:border-[#D4AF37]/50"
                }`}
              >
                {np ? m.np : m.en}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="pc-birds" className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "चल्ले/कुखुरा संख्या" : "Number of birds"}
            </Label>
            <Input
              id="pc-birds"
              type="number"
              inputMode="numeric"
              min={0}
              value={birds}
              onChange={(e) => setBirds(e.target.value)}
              className="text-lg font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
          </div>
          {isLayer ? (
            <div>
              <Label htmlFor="pc-days" className="text-sm font-semibold text-[#0A2540] mb-2 block">
                {np ? "योजना गरिएको दिन" : "Days to plan"}
              </Label>
              <Input
                id="pc-days"
                type="number"
                inputMode="numeric"
                min={0}
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="text-lg font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="pc-weight" className="text-sm font-semibold text-[#0A2540] mb-2 block">
                {np ? "लक्षित तौल (कि.ग्रा./चल्ले)" : "Target weight (kg/bird)"}
              </Label>
              <Input
                id="pc-weight"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-lg font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
              />
            </div>
          )}
          <div className={isLayer ? "" : "sm:col-span-2"}>
            <Label htmlFor="pc-price" className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "दानाको मूल्य (रु./कि.ग्रा.)" : "Feed price (Rs/kg)"}
            </Label>
            <Input
              id="pc-price"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={feedPrice}
              onChange={(e) => setFeedPrice(e.target.value)}
              className="text-lg font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setMode("layer");
            setBirds("500");
            setDays("30");
            setWeight("2");
            setFeedPrice("85");
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
            {isLayer ? (np ? "दाना आवश्यकता" : "Feed required") : np ? "खरिद गर्नुपर्ने दाना" : "Feed to buy"}
          </p>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={mode}>
            <div className="flex items-baseline gap-2">
              <Bird size={18} className="text-[#D4AF37]" />
              <p className="text-3xl font-bold leading-tight">
                {F(r.feedLow)}–{F(r.feedHigh)} <span className="text-base font-medium text-gray-300">{np ? "कि.ग्रा. दाना" : "kg feed"}</span>
              </p>
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex justify-between gap-3 border-b border-white/10 pb-2.5">
                <span className="text-gray-300">{np ? "५० कि.ग्रा.को झोला" : "50 kg sacks"}</span>
                <span className="font-semibold">≈ {F(r.sacks, 1)}</span>
              </li>
              {price > 0 && r.feedHigh > 0 ? (
                <li className="flex justify-between gap-3 border-b border-white/10 pb-2.5">
                  <span className="text-gray-300 inline-flex items-center gap-1.5">
                    <Coins size={13} className="text-[#D4AF37]" />
                    {np ? "अनुमानित दाना खर्च" : "Estimated feed cost"}
                  </span>
                  <span className="font-semibold">रु. {F(r.feedLow * price)}–{F(r.feedHigh * price)}</span>
                </li>
              ) : null}
              {isLayer ? (
                <li className="flex justify-between gap-3">
                  <span className="text-gray-300">{np ? "अनुमानित अन्डा (यस अवधिमा)" : "Eggs expected (period)"}</span>
                  <span className="font-semibold">≈ {F(r.eggs ?? 0)}</span>
                </li>
              ) : (
                <li className="flex justify-between gap-3">
                  <span className="text-gray-300">{np ? "कुल मासु उत्पादन" : "Total live gain"}</span>
                  <span className="font-semibold">{F(r.totalGain ?? 0)} {np ? "कि.ग्रा." : "kg"}</span>
                </li>
              )}
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-gray-300/90">
              {isLayer
                ? np
                  ? "आधार: व्यवसायिक लेयरले दिनको १००–१२० ग्राम दाना खान्छन्; नेपालका व्यवसायिक लेयरले वर्षमा औसत ११२ अन्डा दिन्छन्।"
                  : "Basis: commercial layers eat ~100–120 g feed/day; Nepali commercial layers average 112 eggs/hen/year."
                : np
                  ? "आधार: ब्रोइलरको FCR (दाना रूपान्तरण अनुपात) १.५–१.८ — प्रति कि.ग्रा. तौल बढाउन चाहिने दाना।"
                  : "Basis: broiler FCR of 1.5–1.8 — kg of feed per kg of live-weight gain."}
            </p>
          </motion.div>
        </div>

        <p className="mt-4 text-[11px] text-gray-400 leading-relaxed flex items-start gap-1.5">
          <Info size={12} className="mt-0.5 flex-shrink-0" />
          {np
            ? "नोट: दाना उत्पादन खर्चको ६०–७०% हुन्छ — यो हिसाबले नाफा-नोक्सान अनुमान गर्न सहयोग गर्छ। जात, हावापानी र व्यवस्थापनले वास्तविक अंक बदलिन्छ।"
            : "Note: feed is typically 60–70% of poultry production cost — use this to sanity-check margins. Breed, weather and management shift real numbers."}
        </p>
      </div>
    </div>
  );
}
