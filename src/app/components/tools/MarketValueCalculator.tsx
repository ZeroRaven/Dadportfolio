import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Scale, AlertTriangle } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/**
 * LIVE ANIMAL MARKET VALUE ESTIMATOR.
 *
 * Default rates are EDITABLE ESTIMATES (they vary strongly by market,
 * season and festival week — always enter your local rate):
 *  · Goat / Khasi live weight ≈ NPR 900–1,200/kg (festival weeks peak)
 *  · Buffalo live ≈ NPR 300–400/kg · Cow/Ox ≈ NPR 250–350/kg
 *  · Pig live ≈ NPR 380–450/kg
 * The estimate shows a ±10% band and is a planning aid, not a quote.
 */

const SPECIES = [
  { value: "goat",    en: "Goat / Khasi", np: "बाख्रा / खसी",    rate: 1000 },
  { value: "buffalo", en: "Buffalo",      np: "भैंसी",           rate: 350 },
  { value: "cow",     en: "Cow / Ox",     np: "गाई / बाँझ",      rate: 300 },
  { value: "pig",     en: "Pig",          np: "सुँगुर",          rate: 400 },
] as const;

function Np({ v, np }: { v: number; np: boolean }) {
  const s = Math.round(v).toLocaleString("en-IN");
  return <>{np ? toNepaliDigits(s) : s}</>;
}

export function MarketValueCalculator({ np }: { np: boolean }) {
  const [species, setSpecies] = useState<string>("goat");
  const [weight, setWeight] = useState(30);
  const [rate, setRate] = useState(1000);

  const spec = useMemo(() => SPECIES.find((s) => s.value === species) ?? SPECIES[0], [species]);

  const r = useMemo(() => {
    const value = weight * rate;
    const low = value * 0.9;
    const high = value * 1.1;
    return { value, low, high };
  }, [weight, rate]);

  const switchSpecies = (v: string) => {
    const next = SPECIES.find((s) => s.value === v) ?? SPECIES[0];
    setSpecies(v);
    setRate(next.rate);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-6">
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

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "जीवित तौल (केजी)" : "Live weight (kg)"}
            </Label>
            <Input
              type="number" min={1} max={900} value={weight}
              onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "जीवित तौल" : "Live weight"}
            />
            <p className="text-[11px] text-gray-400 mt-1 leading-snug">
              {np ? "फित्ताले नापेको अनुमान? माथिको तौल आकलक औजार हेर्नुहोस्।" : "No scale? Use the Weight Estimator tool above."}
            </p>
          </div>
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "दर (रु./केजी जीवित)" : "Rate (NPR/kg live)"}
            </Label>
            <Input
              type="number" min={0} max={5000} value={rate}
              onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "प्रतिकेजी दर" : "Rate per kg"}
            />
            <p className="text-[11px] text-gray-400 mt-1 leading-snug">
              {np ? "स्थानीय बजारको आजको दर हाल्नुहोस् — डिफल्ट मात्र अनुमान हो।" : "Enter today's local rate — the default is only an estimate."}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 flex items-start gap-3">
          <AlertTriangle size={15} className="mt-0.5 text-amber-600 flex-shrink-0" />
          <p className="text-xs text-amber-900/80 leading-relaxed">
            {np
              ? "भाउ बजार, मौसुम र चाडपर्वसँग बदलिन्छ — यो अनुमान योजनाका लागि मात्र हो। दशैँ–तिहारतर्फ दर वार्षिक चरममा पुग्छछ; निर्णय अघि दुई व्यापारीसँग पक्का गर्नुहोस्।"
              : "Prices swing with market, season and festivals — this estimate is for planning only. Rates peak toward Dashain–Tihar; confirm with two traders before deciding."}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6 sticky top-24">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-4">
            <Scale size={13} />
            {np ? "अनुमानित जीवित मूल्य" : "Estimated live value"}
          </p>
          <motion.p
            key={r.value}
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            className="font-display text-4xl font-bold leading-none"
          >
            रु. <Np v={r.value} np={np} />
          </motion.p>
          <p className="text-xs text-gray-400 mt-2">
            {np ? "सम्भाव्य दायरा" : "Likely range"}:{" "}
            <span className="font-semibold text-gray-200">
              रु. <Np v={r.low} np={np} /> – रु. <Np v={r.high} np={np} />
            </span>{" "}
            <span className="text-gray-500">(±10%)</span>
          </p>

          <div className="mt-5 pt-4 border-t border-white/15 space-y-2 text-xs">
            <p className="flex justify-between text-gray-300">
              <span>{np ? "तौल" : "Weight"}</span>
              <span className="font-semibold text-white"><Np v={weight} np={np} /> {np ? "केजी" : "kg"}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span>{np ? "दर" : "Rate"}</span>
              <span className="font-semibold text-white">रु. <Np v={rate} np={np} />/{np ? "केजी" : "kg"}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span>{np ? "प्रजाति" : "Species"}</span>
              <span className="font-semibold text-white">{np ? spec.np : spec.en}</span>
            </p>
          </div>

          {/* Save / copy / share / print + recent results */}
          <ResultCardActions
            np={np}
            toolId="market"
            label={`${np ? spec.np : spec.en} · ${weight} kg · रु.${rate}/kg`}
            summary={`रु. ${r.value.toLocaleString("en-IN")} (±10%: रु.${r.low.toLocaleString("en-IN")}–रु.${r.high.toLocaleString("en-IN")})`}
          />
        </div>
      </div>
    </div>
  );
}
