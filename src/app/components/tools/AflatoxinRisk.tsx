import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Wheat, ShieldCheck, TriangleAlert, Info, ThermometerSun } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/* ─────────────────────────────────────────────────────────────────────────────
 *  GRAIN STORAGE RISK CHECK — is the store room growing aflatoxin?
 *
 *  Verified reference figures:
 *  · Nepal regulates aflatoxin in food at 20 ppb; surveys have found
 *    >50% of some maize sample sets above limits (Tufts Nepal assessment).
 *  · The mould needs moisture + warmth: storage science says dry grain to
 *    ≤13% moisture; hermetic (sealed-air) bags cut total aflatoxin ≈34%
 *    vs controls in a Senegal farm RCT (Prieto et al. 2019); repeated
 *    opening of bags lets humidity cycle in (Tubbs et al. 2016).
 *  · FAO's Nepal mycotoxin review found aflatoxin B1 up to 1100 ppb in
 *    contaminated poultry-feed samples — poultry are the most sensitive
 *    farm animals.
 * ──────────────────────────────────────────────────────────────────────────── */

const fmt = (v: number, np: boolean, digits = 0) => {
  const s = v.toFixed(digits);
  return np ? toNepaliDigits(s) : s;
};

const num = (s: string) => {
  const v = parseFloat(s);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

const BINS: { id: string; en: string; np: string; pts: number }[] = [
  { id: "woven", en: "Open woven sack", np: "खुला बुनेको बोरा", pts: 30 },
  { id: "plastic", en: "Plastic bag, sealed daily", np: "प्लास्टिक झोला, दैनिक बन्द", pts: 15 },
  { id: "hermetic", en: "Hermetic sealed bag", np: "एयरटाइट (हर्मेटिक) झोला", pts: -25 },
  { id: "bin", en: "Metal / sealed drum", np: "धातु वा बन्द ड्रम", pts: -10 },
];

const ROOMS: { id: string; en: string; np: string; pts: number }[] = [
  { id: "airy", en: "Dry, airy, raised floor", np: "सुक्खा, हावा चल्ने, उठेको तल", pts: 0 },
  { id: "humid", en: "Humid room, mud wall", np: "चिसो कोठा, माटोको भित्ता", pts: 20 },
  { id: "hot", en: "Hot tin roof, packed tight", np: "तातो टिन, कसेर थुप्रो", pts: 15 },
];

export function AflatoxinRisk({ np }: { np: boolean }) {
  const [moisture, setMoisture] = useState(15);
  const [bin, setBin] = useState("woven");
  const [room, setRoom] = useState("humid");
  const [months, setMonths] = useState("4");
  const [checkFreq, setCheckFreq] = useState<"never" | "monthly">("never");

  const calc = useMemo(() => {
    let score = 0;
    // moisture: ≤13 safe; each point above adds
    score += Math.max(0, moisture - 13) * 7;
    score += BINS.find((b) => b.id === bin)?.pts ?? 0;
    score += ROOMS.find((r) => r.id === room)?.pts ?? 0;
    // duration: each month stored adds a little
    score += Math.min(30, Math.round(num(months) * 2.5));
    // monthly inspection & re-drying discipline
    if (checkFreq === "monthly") score -= 10;
    score = Math.max(0, Math.min(100, score));

    const band =
      score < 25
        ? { en: "Low", np: "कम", cls: "from-emerald-600 to-emerald-500", advice: { en: "Conditions look sound. Keep grain ≤13% moisture, keep the floor raised, and check the store monthly with a look-and-sniff.", np: "अवस्था ठीक देखिन्छ। अन्न १३% भन्दा कम चिस्यान, तल उठाएर, र महिनैमा हेरेर-सुँघेर जाँच्नुहोस्।" } }
        : score < 50
          ? { en: "Moderate", np: "मध्यम", cls: "from-amber-600 to-amber-500", advice: { en: "The store is drifting into the danger band — re-dry the grain now, move sacks off walls, and give air a path through the pile.", np: "भण्डार खतरातिर डढँदैछ — अहिलै अन्न फेरि सुकाउनुहोस्, बोरा भित्ताबाट टाढा सार्नुहोस्, र थुप्रोमा हावाको बाटो दिनुहोस्।" } }
          : score < 75
            ? { en: "High", np: "उच्च", cls: "from-orange-600 to-orange-500", advice: { en: "Aflatoxin is likely forming — dry immediately, sell or feed the oldest grain first, and never send visibly mouldy lots to the kitchen or to poultry.", np: "एफ्लाटक्सिन बनिरहेको हुँदो हो — तुरुन्तै सुकाउनुहोस्, पुरानो अन्न पहिले बेच्नु/खुवाउनुहोस्, र ढुसी देखिने भाग भान्सा वा कुखुरामा कहिल्यै नपठाउनुहोस्।" } }
            : { en: "Very high", np: "धेरै उच्च", cls: "from-red-600 to-red-500", advice: { en: "This store is a poison factory: hot, humid, long-stored grain in open sacks. Rescue what you can — sort out discoloured kernels, re-dry the rest — and rebuild the storage before the next harvest.", np: "यो भण्डार विष-कारखाना बनेको छ: तातो, चिसो, लामो समय खुला बोरामा राखिएको अन्न। जोगाउन सकिने उद्धार्नुहोस् — रंग फेरिएका गेडा छाट्नुहोस्, बाँकी फेरि सुकाउनुहोस् — र अर्को बालीअघि भण्डार फेरि बनाउनुहोस्।" } };
    return { score, band };
  }, [moisture, bin, room, months, checkFreq]);

  const moistOk = moisture <= 13;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Inputs */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-1">
          <Wheat size={13} aria-hidden="true" />
          {np ? "भण्डारणको अवस्था" : "Storage conditions"}
        </p>
        <p className="text-[11px] text-gray-400 mb-4">
          {np ? "मकै/गहुँ कसरी राखिएको छ — भन्नुहोस्" : "Tell it how the maize/wheat is being kept"}
        </p>

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <Label className="text-[13px] font-semibold text-[#0A2540]">
              {np ? "अन्नको चिस्यान (जाँच वा अनुमान)" : "Grain moisture (measured or guessed)"}
            </Label>
            <span className={`text-sm font-bold ${moistOk ? "text-emerald-600" : "text-[#C0392B]"}`}>{fmt(moisture, np, 0)}%</span>
          </div>
          <input
            type="range" min={8} max={20} step={0.5} value={moisture}
            onChange={(e) => setMoisture(Number(e.target.value))}
            className="w-full accent-[#D4AF37] mt-1"
            aria-label={np ? "अन्नको चिस्यान प्रतिशत" : "Grain moisture percent"}
          />
          <p className="text-[11px] text-gray-400 mt-1 leading-snug">
            {moistOk
              ? (np ? "≤१३% — ढुसीलाई चाहिने पानी पुग्दैन (दाँतले टोक्दा च्यात् फुट्ने गेडा)" : "≤13% — below the mould's water line (a kernel should crack with a bite)")
              : (np ? "१३% भन्दा माथि — ढुसी सुरु हुने जमिन; फेरि सुकाउनुहोस्" : "Above 13% — mould country; re-dry before storing")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540] mb-1.5">{np ? "झोलाको किसिम" : "Bag / container"}</Label>
            <div className="space-y-1.5">
              {BINS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBin(b.id)}
                  aria-pressed={bin === b.id}
                  className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-semibold border-2 transition-all ${
                    bin === b.id
                      ? "bg-[#0A2540] text-white border-[#0A2540] shadow"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/60"
                  }`}
                >
                  {np ? b.np : b.en}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-[13px] font-semibold text-[#0A2540] mb-1.5">{np ? "कोठा / थुप्रो" : "Room / stack"}</Label>
            <div className="space-y-1.5">
              {ROOMS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRoom(r.id)}
                  aria-pressed={room === r.id}
                  className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-semibold border-2 transition-all ${
                    room === r.id
                      ? "bg-[#0A2540] text-white border-[#0A2540] shadow"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/60"
                  }`}
                >
                  {np ? r.np : r.en}
                </button>
              ))}
              <div className="flex gap-2 pt-1">
                <div className="flex-1">
                  <Label className="text-[12px] font-semibold text-[#0A2540]">{np ? "कति महिना राखिन्छ" : "Stored for (months)"}</Label>
                  <Input
                    type="number" inputMode="numeric" min={1} max={12}
                    value={months} onChange={(e) => setMonths(e.target.value)}
                    className="mt-1 font-semibold border-2 border-gray-200 focus:border-[#D4AF37] rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Label className="text-[13px] font-semibold text-[#0A2540] mb-1.5">{np ? "जाँच-चेक" : "Inspection habit"}</Label>
          <div className="flex gap-2">
            {([["never", np ? "सामान्यतः नाघ्छ" : "Rarely check"], ["monthly", np ? "महिनैमा हेर्छु" : "Monthly look-and-sniff"]] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setCheckFreq(id)}
                aria-pressed={checkFreq === id}
                className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold border-2 transition-all ${
                  checkFreq === id
                    ? "bg-[#D4AF37]/20 text-[#0A2540] border-[#D4AF37]/60"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#D4AF37]/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result gauge */}
      <div className={`rounded-2xl bg-gradient-to-br ${calc.band.cls} text-white p-6 shadow-xl`}>
        <p className="flex items-center gap-2 text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">
          <TriangleAlert size={14} />
          {np ? "एफ्लाटक्सिन जोखिम" : "Aflatoxin risk"}
        </p>

        <div className="flex items-center gap-5">
          <div className="relative w-28 h-28 flex-shrink-0" role="img" aria-label={`${calc.band.en}: ${calc.score}/100`}>
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="12" />
              <motion.circle
                cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={264}
                initial={{ strokeDashoffset: 264 }}
                animate={{ strokeDashoffset: 264 - (264 * calc.score) / 100 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold">
              {fmt(calc.score, np, 0)}
            </span>
          </div>
          <div className="min-w-0">
            <motion.p
              key={calc.band.en}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl font-bold leading-tight"
            >
              {np ? calc.band.np : calc.band.en}
            </motion.p>
            <p className="text-sm text-white/85 leading-relaxed mt-2">
              {np ? calc.band.advice.np : calc.band.advice.en}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-black/15 border border-white/15 p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-white mb-1.5">
            <ShieldCheck size={13} aria-hidden="true" />
            {np ? "मुख्य पाँच कुरा" : "The five things that matter"}
          </p>
          <ul className="text-[13px] text-white/90 leading-relaxed space-y-1">
            <li>• {np ? "१३% भन्दा कम चिस्यान — दाँतको परीक्षा: गेडा च्यात् फुटोस्, दब्नु हुँदैन" : "Dry to ≤13% — the bite test: kernel cracks, doesn't dent"}</li>
            <li>• {np ? "एयरटाइट झोलाले एफ्लाटक्सिन ~३४% घटायो (सेनेगल फार्म-परीक्षण)" : "Hermetic bags cut aflatoxin ~34% (Senegal farm trial)"}</li>
            <li>• {np ? "बोरा बारम्बार खोल्दा चिस्यान भित्रिन्छ — साप्ताहिक सानो बोरा राख्नुहोस्" : "Repeated bag-opening cycles humidity in — keep a small daily-use bag"}</li>
            <li>• {np ? "नेपालको कानुनी सीमा २० पिपिबी; कुखुरा सबैभन्दा संवेदनशील (दूषित नमुनामा ११०० पिपिबीसम्म भेटिएको छ)" : "Nepal's legal limit is 20 ppb; poultry are most sensitive (up to 1100 ppb found in bad feed)"}</li>
            <li>• {np ? "महिनैमा हेराइ-सुँघाइ: तातो भाग, गन्ध वा कीरा भए त्यो थुप्रो तपाईंविरुद्ध काम गरिरहेको हुन्छ" : "Monthly look-and-sniff: warm spots, musty smell or insects mean the pile is working against you"}</li>
          </ul>
        </div>

        <div className="mt-4">
          <ResultCardActions
            np={np}
            toolId="aflatoxin"
            label={np ? "अन्न भण्डारण जोखिम" : "Grain storage risk"}
            summary={np
              ? `${fmt(moisture, np, 0)}% चिस्यान · ${BINS.find((b) => b.id === bin)?.np} · ${fmt(num(months), np, 0)} महिना — जोखिम ${calc.band.np} (${fmt(calc.score, np, 0)}/१००)`
              : `${fmt(moisture, np, 0)}% moisture · ${BINS.find((b) => b.id === bin)?.en} · ${fmt(num(months), np, 0)} months — risk ${calc.band.en} (${fmt(calc.score, np, 0)}/100)`}
            detail={(np
              ? `चिस्यान: ${fmt(moisture, np, 0)}%\nभण्डारण: ${BINS.find((b) => b.id === bin)?.np}, ${ROOMS.find((r) => r.id === room)?.np}\nअवधि: ${fmt(num(months), np, 0)} महिना\nजोखिम अङ्क: ${fmt(calc.score, np, 0)}/१०० (${calc.band.np})\ndrmogalshah.com.np/tools/aflatoxin`
              : `Moisture: ${fmt(moisture, np, 0)}%\nStorage: ${BINS.find((b) => b.id === bin)?.en}, ${ROOMS.find((r) => r.id === room)?.en}\nDuration: ${fmt(num(months), np, 0)} months\nRisk score: ${fmt(calc.score, np, 0)}/100 (${calc.band.en})\ndrmogalshah.com.np/tools/aflatoxin`)}
          />
        </div>
      </div>

      {/* Reference */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-3">
          <Info size={13} aria-hidden="true" />
          {np ? "स्रोत" : "Sources"}
        </p>
        <p className="text-[13px] text-gray-600 leading-relaxed">
          {np
            ? "नेपालको कानुनी सीमा २० पिपिबी र सर्वेक्षणमा ५०% भन्दा बढी नमुना माथि (Tufts/Nepal मूल्याङ्कन); एयरटाइट झोला ~३४% कम (Prieto et al. 2019, सेनेगल); बारम्बार खोल्ने असर (Tubbs et al. 2016); कुखुरा-दानामा AFB1 ११०० पिपिबीसम्म (FAO नेपाल माइकोटक्सिन समीक्षा); ≤१३% चिस्यान — पछि-कटाई विज्ञानको सामान्य नियम। यो जोखिम-अङ्क शिक्षाका लागि हो, प्रयोगशाला परीक्षण होइन।"
            : "Nepal legal limit 20 ppb and >50% of some survey samples over it (Tufts/Nepal assessment); hermetic bags ≈34% lower aflatoxin (Prieto et al. 2019, Senegal RCT); repeated bag-opening effects (Tubbs et al. 2016); AFB1 up to 1100 ppb in contaminated Nepali poultry feed (FAO mycotoxin review); ≤13% moisture is standard post-harvest science. This score educates — it does not replace a lab test."}
        </p>
      </div>
    </div>
  );
}
