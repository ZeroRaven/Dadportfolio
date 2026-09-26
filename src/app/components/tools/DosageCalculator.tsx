import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Pill, RotateCcw, Info, AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";

/**
 * Veterinary dosage calculator — converts a prescribed mg/kg dose into the
 * volume (mL) or number of tablets/boluses to actually give.
 *
 * This is pure arithmetic on YOUR vet's prescription — it does NOT
 * recommend drugs or doses. mg/kg dosing is the universal veterinary
 * pharmacology convention; the calculator only removes the arithmetic
 * errors that happen when converting dose → mL at the syringe.
 */

export function DosageCalculator({ np }: { np: boolean }) {
  const [weight, setWeight] = useState("400");
  const [dose, setDose] = useState("5");      // mg/kg
  const [conc, setConc] = useState("100");    // mg per mL
  const [tablet, setTablet] = useState("500"); // mg per unit (optional)

  const w = Math.max(0, Number(weight) || 0);
  const d = Math.max(0, Number(dose) || 0);
  const c = Math.max(0, Number(conc) || 0);
  const t = Math.max(0, Number(tablet) || 0);

  const r = useMemo(() => {
    const totalMg = w * d;
    return {
      totalMg,
      ml: c > 0 ? totalMg / c : null,
      tablets: t > 0 ? totalMg / t : null,
    };
  }, [w, d, c, t]);

  const F = (x: number, digits = 2) => {
    const s = x.toLocaleString("en-US", { maximumFractionDigits: digits });
    return np ? toNepaliDigits(s) : s;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-3 space-y-6">
        <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3.5 flex items-start gap-3">
          <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={17} />
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-medium">
            {np
              ? "यो क्यालकुलेटरले डाक्टरले लेखिदिएको खुराक (mg/kg) गणितमा बदल्छ मात्र — आफै औषधि वा खुराक छान्न होइन। सधैं निर्धारित खुराक र लेबलको निर्देशन पालना गर्नुहोस्।"
              : "This calculator only converts the mg/kg dose YOUR vet prescribed into mL — it never chooses drugs or doses. Always follow the prescription and the product label."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="dc-weight" className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "पशुको तौल (कि.ग्रा.)" : "Animal weight (kg)"}
            </Label>
            <Input
              id="dc-weight"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="text-lg font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
          </div>
          <div>
            <Label htmlFor="dc-dose" className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "निर्धारित खुराक (mg/kg)" : "Prescribed dose (mg/kg)"}
            </Label>
            <Input
              id="dc-dose"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              className="text-lg font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="dc-conc" className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "इन्जेक्सन/सिरप एकाइ (mg/ml)" : "Injectable / liquid (mg per mL)"}
            </Label>
            <Input
              id="dc-conc"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={conc}
              onChange={(e) => setConc(e.target.value)}
              className="text-lg font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {np ? "बोतल/एम्पुलमा लेखिएको बलको बल।" : "Strength printed on the vial/bottle."}
            </p>
          </div>
          <div>
            <Label htmlFor="dc-tablet" className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "ट्याब्लेट/बोलसको बल (mg)" : "Tablet / bolus strength (mg)"}
            </Label>
            <Input
              id="dc-tablet"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={tablet}
              onChange={(e) => setTablet(e.target.value)}
              className="text-lg font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              {np ? "ठोक्रा/ट्याब्लेट प्रति औषधि मात्रा — खाली छाड्न सकिन्छ।" : "mg per tablet — leave 0 to ignore."}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setWeight("400");
            setDose("5");
            setConc("100");
            setTablet("500");
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
            {np ? "दिनुपर्ने मात्रा" : "Amount to give"}
          </p>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-baseline gap-2">
              <Pill size={18} className="text-[#D4AF37]" />
              <p className="text-3xl font-bold leading-tight">
                {F(r.totalMg, 1)} <span className="text-base font-medium text-gray-300">mg</span>
              </p>
            </div>
            <p className="text-xs text-gray-300 mt-1">
              {np ? "कुल खुराक = तौल × mg/kg" : "total dose = weight × mg/kg"}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {r.ml !== null && r.ml > 0 ? (
                <li className="flex justify-between gap-3 border-b border-white/10 pb-2.5">
                  <span className="text-gray-300">{np ? "सिरिन्जमा (तरल)" : "In the syringe (liquid)"}</span>
                  <span className="font-semibold">{F(r.ml, 2)} mL</span>
                </li>
              ) : null}
              {r.tablets !== null && r.tablets > 0 ? (
                <li className="flex justify-between gap-3">
                  <span className="text-gray-300">{np ? "ट्याब्लेट/बोलस संख्या" : "Tablets / boluses"}</span>
                  <span className="font-semibold">≈ {F(r.tablets, 2)}</span>
                </li>
              ) : null}
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-gray-300/90">
              {np
                ? "खाली पेट वा खानासँग — औषधिको लेबलले भनेअनुसार। शिकार गर्दा राउन्ड गर्दा सावधानी राख्नुहोस्।"
                : "Round carefully — split tablets only when the label allows. Follow label guidance on fasting/feeding."}
            </p>
          </motion.div>
        </div>

        <p className="mt-4 text-[11px] text-gray-400 leading-relaxed flex items-start gap-1.5">
          <Info size={12} className="mt-0.5 flex-shrink-0" />
          {np
            ? "mg/kg खुराक पशु औषधिको सार्वभौमिक मापदण्ड हो। यो औजारले गणितीय त्रुटि मात्र हटाउँछ — उपचारको निर्णय सधैं पशु चिकित्सकको हो।"
            : "mg/kg dosing is the standard veterinary pharmacology convention. This tool removes arithmetic errors only — treatment decisions always belong to your veterinarian."}
        </p>
      </div>
    </div>
  );
}
