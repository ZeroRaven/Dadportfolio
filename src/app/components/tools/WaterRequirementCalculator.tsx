import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Droplets, Info } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toNepaliDigits } from "../../i18n/format";

/**
 * WATER REQUIREMENT CALCULATOR — the forgotten feed.
 *
 * Verified figures:
 *  · 4–4.5 L of water per kg of milk produced (dairy extension / Lely)
 *  · Lactating buffalo 80–120 L/day in summer (livestock feeding charts)
 *  · Total drinking water for Nepali dairy stock measured at 112–131
 *    L/adult/day (published Nepali farm study)
 *  · Dry cow 30–60 L; goat/sheep 4–10 L; layer hen ≈0.3 L
 *
 * Model: lactating animals = maintenance + 4.5 L per litre of milk
 * (milk-yield input), others use the documented band mid-points.
 */

const WATER_PER_KG_MILK = 4.5;

function Np({ v, np, digits = 0 }: { v: number; np: boolean; digits?: number }) {
  const s = v.toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return <>{np ? toNepaliDigits(s) : s}</>;
}

export function WaterRequirementCalculator({ np }: { np: boolean }) {
  const [buffLact, setBuffLact] = useState(2);
  const [buffMilk, setBuffMilk] = useState(5);
  const [cowLact, setCowLact] = useState(1);
  const [cowMilk, setCowMilk] = useState(8);
  const [dryCattle, setDryCattle] = useState(1);
  const [goats, setGoats] = useState(6);
  const [poultry, setPoultry] = useState(0);

  const r = useMemo(() => {
    // lactating: maintenance (buffalo 55, cow 30) + 4.5 L per kg milk
    const buff = buffLact * (55 + buffMilk * WATER_PER_KG_MILK);
    const cow = cowLact * (30 + cowMilk * WATER_PER_KG_MILK);
    const dry = dryCattle * 45; // 30–60 L band mid-point
    const goat = goats * 7; // 4–10 L band mid-point
    const bird = poultry * 0.3;
    const total = buff + cow + dry + goat + bird;
    const summerTotal = total * 1.2; // heat pushes the top of every band
    const reserve = total * 1.5; // 1.5-day storage recommendation
    return { buff, cow, dry, goat, bird, total, summerTotal, reserve };
  }, [buffLact, buffMilk, cowLact, cowMilk, dryCattle, goats, poultry]);

  const breakdown = [
    { label: np ? "दुध दिने भैंसी" : "Lactating buffaloes", value: r.buff },
    { label: np ? "दुध दिने गाई" : "Lactating cows", value: r.cow },
    { label: np ? "सुक्खी गाईभैंसी" : "Dry cattle", value: r.dry },
    { label: np ? "बाख्रा / भेडा" : "Goats / sheep", value: r.goat },
    ...(r.bird > 0 ? [{ label: np ? "कुखुरा" : "Poultry", value: r.bird }] : []),
  ];
  const max = Math.max(...breakdown.map((b) => b.value), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "दुध दिने भैंसी संख्या" : "Lactating buffaloes"}
            </Label>
            <Input type="number" min={0} max={200} value={buffLact}
              onChange={(e) => setBuffLact(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "भैंसी संख्या" : "Buffalo count"} />
          </div>
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "औसत दुध (लि./दिन)" : "Avg milk (L/day)"}
            </Label>
            <Input type="number" min={0} max={30} step={0.5} value={buffMilk}
              onChange={(e) => setBuffMilk(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "भैंसीको दुध" : "Buffalo milk yield"} />
          </div>
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "दुध दिने गाई संख्या" : "Lactating cows"}
            </Label>
            <Input type="number" min={0} max={200} value={cowLact}
              onChange={(e) => setCowLact(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "गाई संख्या" : "Cow count"} />
          </div>
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "औसत दुध (लि./दिन)" : "Avg milk (L/day)"}
            </Label>
            <Input type="number" min={0} max={30} step={0.5} value={cowMilk}
              onChange={(e) => setCowMilk(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "गाईको दुध" : "Cow milk yield"} />
          </div>
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "सुक्खी गाईभैंसी" : "Dry cattle"}
            </Label>
            <Input type="number" min={0} max={200} value={dryCattle}
              onChange={(e) => setDryCattle(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "सुक्खी पशु" : "Dry cattle count"} />
          </div>
          <div>
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "बाख्रा / भेडा संख्या" : "Goats / sheep"}
            </Label>
            <Input type="number" min={0} max={500} value={goats}
              onChange={(e) => setGoats(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "बाख्रा संख्या" : "Goat count"} />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
              {np ? "कुखुरा (चराचुरुङ्गी) संख्या" : "Poultry birds"}
            </Label>
            <Input type="number" min={0} max={10000} value={poultry}
              onChange={(e) => setPoultry(Math.max(0, Number(e.target.value)))}
              aria-label={np ? "कुखुरा संख्या" : "Poultry count"} />
          </div>
        </div>

        <div className="rounded-xl bg-[#0A2540]/[0.03] border border-[#0A2540]/10 p-4 flex items-start gap-3">
          <Info size={15} className="mt-0.5 text-[#B8941F] flex-shrink-0" />
          <p className="text-xs text-gray-600 leading-relaxed">
            {np
              ? "दुध दिने पशुलाई प्रति केजी दुध ४–४.५ लि. थप पानी चाहिन्छ; गर्मीमा भैंसीले ८०–१२० लि.सम्म पिउँछ। सुक्खायाम सुरु हुनुअघि यो गणना गरेर पोखरी/ट्यााँकी नाप्नुहोस्।"
              : "Lactating animals need 4–4.5 extra litres per kg of milk; a buffalo can drink 80–120 L/day in summer. Size your storage before the dry season starts — not during it."}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6 sticky top-24">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-1">
            <Droplets size={13} />
            {np ? "कुल दैनिक पिउने पानी" : "Total daily drinking water"}
          </p>
          <p className="font-display text-4xl font-bold mb-1">
            <Np v={r.total} np={np} /> <span className="text-lg font-medium text-gray-300">{np ? "लिटर/दिन" : "L/day"}</span>
          </p>
          <p className="text-xs text-gray-400 mb-4">
            {np ? "गर्मीको चरममा" : "Summer peak:"} <span className="font-semibold text-gray-200"><Np v={r.summerTotal} np={np} /> {np ? "लि./दिन" : "L/day"}</span> (+20%)
          </p>

          <div className="space-y-2.5">
            {breakdown.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-[11px] text-gray-300 mb-1">
                  <span>{b.label}</span>
                  <span className="font-semibold text-white"><Np v={b.value} np={np} /> {np ? "लि." : "L"}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.value / max) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4C7FB5]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/15 space-y-1.5 text-xs">
            <p className="flex justify-between text-gray-300">
              <span>{np ? "सिफारिस: १.५ दिनको भण्डारण" : "Recommended: 1.5-day reserve"}</span>
              <span className="font-bold text-[#D4AF37]"><Np v={r.reserve} np={np} /> {np ? "लि." : "L"}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span>{np ? "महिन्यौँको खपत (करिब)" : "Monthly use (approx.)"}</span>
              <span className="font-bold text-white"><Np v={(r.total * 30) / 1000} np={np} digits={1} /> m³</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
