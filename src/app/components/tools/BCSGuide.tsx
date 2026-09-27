import { useState } from "react";
import { motion } from "motion/react";
import { Ruler, Info } from "lucide-react";
import { Label } from "../ui/label";
import { ResultCardActions } from "./ResultActions";
import { toNepaliDigits } from "../../i18n/format";

/* ─────────────────────────────────────────────────────────────────────────────
 *  BODY CONDITION SCORE (BCS) — interactive 5-point scoring guide.
 *
 *  Based on the Edmondson et al. (1989) 5-point scale for dairy cattle —
 *  the standard used in dairy extension worldwide and applied to buffalo
 *  in South Asia. Score by feel AND look: backbone, ribs, hooks (hip
 *  bones), pins and the tailhead ligaments.
 *
 *  Management rule of thumb (dairy): aim for BCS 3–3.5 at calving.
 * ──────────────────────────────────────────────────────────────────────────── */

const SCORES: {
  score: number;
  en: string;
  np: string;
  look: { en: string; np: string };
  advice: { en: string; np: string };
  ribOpacity: number;
  spineOpacity: number;
  hipOpacity: number;
  belly: number;
}[] = [
  {
    score: 1,
    en: "Severe undercondition",
    np: "गम्भीर कमजोर (धेरै दुब्लो)",
    look: {
      en: "Bones of the spine, hooks and ribs are sharp and obvious; deep cavity around the tailhead; no fat can be felt anywhere.",
      np: "ढाडका हड्डी, कुहिनो र खेप्रा स्पष्ट देखिन्छन्; पुच्छरमुनि खाल्डो; कतै पनि बोसो छुन पाइँदैन।",
    },
    advice: {
      en: "Increase energy density gradually, check parasites and teeth, and investigate disease. Do not breed in this state — ask your vet for a feeding plan.",
      np: "बिस्तारै शक्तिशाली चारा बढाउनुहोस्, कृमि र दाँत जाँच्नुहोस्, रोग परीक्षण गर्नुहोस्। यो अवस्थामा गर्भारण नगराउनुहोस् — चिकित्सकसँग चारा योजना बनाउनुहोस्।",
    },
    ribOpacity: 1, spineOpacity: 1, hipOpacity: 1, belly: 0.82,
  },
  {
    score: 2,
    en: "Thin",
    np: "दुब्लो",
    look: {
      en: "Ribs still clearly visible; spine and hooks evident but rounded; slight cavity at the tailhead.",
      np: "खेप्रा स्पष्ट देखिन्छन्; ढाड र कुहिनो देखिन्छन् तर गोलो; पुच्छरमुनि हल्का खाल्डो।",
    },
    advice: {
      en: "Move her up before calving: add concentrate step by step and improve fodder quality. Target 3–3.5 by dry-off.",
      np: "ब्याउनुअघि सुधार्नुहोस्: बिस्तारै दाना थप्नुहोस्, राम्रो गुणस्तरको चारा दिनुहोस्। सुकाउने बेलासम्म ३–३.५ पुर्‍याउनुहोस्।",
    },
    ribOpacity: 0.85, spineOpacity: 0.8, hipOpacity: 0.8, belly: 0.88,
  },
  {
    score: 3,
    en: "Moderate — ideal",
    np: "मध्यम — आदर्श",
    look: {
      en: "Ribs just barely visible but easily felt; spine feels rounded; hooks are rounded and smooth; tailhead has no cavity.",
      np: "खेप्रा झल्किन्छ तर छुँदा सजिलै पाइन्छ; ढाड गोलो; कुहिनो राम्रोसँग गोलो; पुच्छरमुनि खाल्डो छैन।",
    },
    advice: {
      en: "This is the target condition for most of the year and at calving (3–3.5). Maintain the current ration and keep monitoring monthly.",
      np: "यही वर्षभरि र ब्याउँदा (३–३.५) को लक्ष्य हो। अहिलेको चारा नै जारी राख्नुहोस्, महिनाको जाँच गर्दै जानुहोस्।",
    },
    ribOpacity: 0.5, spineOpacity: 0.45, hipOpacity: 0.5, belly: 0.95,
  },
  {
    score: 4,
    en: "Overcondition",
    np: "बोसो भएको",
    look: {
      en: "Ribs hard to see and feel under fat cover; fat folds appearing at the tailhead; hooks buried.",
      np: "बोसोमुनि खेप्रा देखिन र छुन कठिन; पुच्छरमुनि बोसोका तह देखिन थाल्छन्; कुहिनो गाडिएको।",
    },
    advice: {
      en: "Reduce concentrates, extend exercise grazing, and re-score after a month. Over-condition at calving raises calving and metabolic problems.",
      np: "दाना घटाउनुहोस्, चरन/हिँडाइ बढाउनुहोस्, एक महिनापछि पुनः अंक दिनुहोस्। ब्याउँदा बढी बोसोले प्रसूति समस्या ल्याउँछ।",
    },
    ribOpacity: 0.25, spineOpacity: 0.2, hipOpacity: 0.25, belly: 1.02,
  },
  {
    score: 5,
    en: "Obese",
    np: "अति बोसो",
    look: {
      en: "Bone structure barely visible — heavy fat at the tailhead, over the ribs and along the spine; walking may be affected.",
      np: "हाड्डी संरचना झल्किँदैन — पुच्छरमुनि, खेप्रा र ढाडमा ठूलो बोसो; हिँडाइमा समेत असर पुग्न सक्छ।",
    },
    advice: {
      en: "A health risk: fatty liver, dystocia and repeat breeding. Build a supervised weight-loss plan with your vet — slow, never sudden.",
      np: "स्वास्थ्य जोखिम: कलेजोमा बोसो, कठिन प्रसूति, बारम्बार गर्भारण असफल। चिकित्सकको निगरानीमा बिस्तारै तौल घटाउने योजना बनाउनुहोस् — अचानक होइन।",
    },
    ribOpacity: 0.1, spineOpacity: 0.08, hipOpacity: 0.1, belly: 1.1,
  },
];

const CHECKPOINTS = [
  { en: "Backbone", np: "ढाडको हाड्डी" },
  { en: "Ribs", np: "खेप्रा" },
  { en: "Hooks (hip bones)", np: "कुहिनो (हिप)" },
  { en: "Tailhead", np: "पुच्छरमुनि" },
];

/** Schematic side-profile cow — rib/spine/hip prominence varies with score. */
function CowSchematic({ s }: { s: (typeof SCORES)[number] }) {
  return (
    <svg viewBox="0 0 320 180" className="w-full max-w-md mx-auto" role="img"
      aria-label={`BCS ${s.score} schematic`}>
      {/* body */}
      <ellipse cx="165" cy="100" rx="105" ry={44 * s.belly} fill="#F5E9D4" stroke="#B8941F" strokeWidth="2.5" />
      {/* spine line */}
      <path d={`M 75 ${100 - 40 * s.belly} Q 165 ${100 - 52 * s.belly} 255 ${100 - 38 * s.belly}`}
        fill="none" stroke="#8A6D1F" strokeWidth={3.5} opacity={s.spineOpacity} strokeLinecap="round" />
      {/* ribs — 4 curved lines */}
      {[0, 1, 2, 3].map((i) => (
        <path key={i}
          d={`M ${130 + i * 26} ${68 + 8 * s.belly} q 6 ${26 + 10 * s.belly} -2 ${52 + 12 * s.belly}`}
          fill="none" stroke="#8A6D1F" strokeWidth={2.6} opacity={s.ribOpacity} strokeLinecap="round" />
      ))}
      {/* hip (hook) bone */}
      <path d="M 250 66 q 9 -11 17 -6 q 6 7 -3 14 z" fill="#8A6D1F" opacity={s.hipOpacity} />
      {/* neck + head */}
      <path d="M 72 92 Q 40 78 30 58" fill="none" stroke="#B8941F" strokeWidth="14" strokeLinecap="round" />
      <circle cx="26" cy="48" r="13" fill="#F5E9D4" stroke="#B8941F" strokeWidth="2.5" />
      <circle cx="22" cy="44" r="2" fill="#0A2540" />
      <path d="M 20 58 q -8 6 -14 4" fill="none" stroke="#B8941F" strokeWidth="3" strokeLinecap="round" />
      {/* horn */}
      <path d="M 34 38 q 10 -12 16 -8" fill="none" stroke="#B8941F" strokeWidth="3.5" strokeLinecap="round" />
      {/* tail */}
      <path d="M 266 88 q 18 24 8 52" fill="none" stroke="#B8941F" strokeWidth="4" strokeLinecap="round" />
      {/* legs */}
      {[
        "M 110 132 l -4 38",
        "M 140 138 l 2 34",
        "M 205 138 l -2 34",
        "M 235 132 l 4 38",
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#B8941F" strokeWidth="9" strokeLinecap="round" />
      ))}
      {/* udder hint */}
      <ellipse cx="185" cy="140" rx="22" ry="13" fill="#EFE1C3" stroke="#B8941F" strokeWidth="2" />
    </svg>
  );
}

export function BCSGuide({ np }: { np: boolean }) {
  const [score, setScore] = useState(3);
  const s = SCORES.find((x) => x.score === Math.round(score)) ?? SCORES[2];
  const nearest = SCORES.reduce((a, b) => (Math.abs(b.score - score) < Math.abs(a.score - score) ? b : a));

  const fmtS = (v: number) => (np ? toNepaliDigits(v.toFixed(1)) : v.toFixed(1));

  return (
    <div className="max-w-2xl space-y-6">
      {/* Slider */}
      <div>
        <Label className="flex items-center gap-1.5 text-sm font-semibold text-[#0A2540]">
          <Ruler size={15} aria-hidden="true" />
          {np ? "अंक छान्नुहोस् (१–५)" : "Pick a score (1–5)"}
        </Label>
        <input
          type="range"
          min={1}
          max={5}
          step={0.5}
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          aria-label={np ? "शरीर अवस्था अंक" : "Body condition score"}
          className="w-full mt-3 accent-[#D4AF37]"
          style={{ height: 28 }}
        />
        <div className="flex justify-between text-[11px] font-semibold text-gray-400 px-0.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={nearest.score === n ? "text-[#B8941F]" : ""}>
              {np ? toNepaliDigits(n) : n}
            </span>
          ))}
        </div>
        <div className="text-center mt-3">
          <motion.span
            key={nearest.score}
            initial={{ scale: 0.94, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block font-display text-4xl font-bold text-[#0A2540]"
          >
            {fmtS(score)}
          </motion.span>
          <span className="ml-3 text-sm font-semibold px-3 py-1 rounded-full text-white bg-[#0A2540]">
            {np ? nearest.np : nearest.en}
          </span>
        </div>
      </div>

      {/* Schematic */}
      <div className="rounded-2xl border-2 border-gray-100 bg-gray-50/60 p-5">
        <CowSchematic s={nearest} />
        <p className="text-[10px] text-gray-400 text-center mt-1">
          {np ? "स्किमाटिक चित्र — अंक अनुसार हाड्डी देखिने मात्रा फरक देखाउँछ" : "Schematic — bone visibility changes with the score"}
        </p>
      </div>

      {/* What to see */}
      <div className="rounded-2xl border-2 border-[#D4AF37]/40 bg-[#D4AF37]/[0.06] p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#B8941F] mb-2">
          {np ? "के हेर्ने / छुने" : "What to see and feel"}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {CHECKPOINTS.map((c) => (
            <span key={c.en} className="text-[11px] font-semibold bg-white border border-[#D4AF37]/40 rounded-full px-2.5 py-1 text-[#0A2540]">
              {np ? c.np : c.en}
            </span>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-gray-700">{np ? nearest.look.np : nearest.look.en}</p>
      </div>

      {/* Advice */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#0A2540] mb-2">
          {np ? "व्यवस्थापन सुझाव" : "Management advice"}
        </p>
        <p className="text-sm leading-relaxed text-gray-700">{np ? nearest.advice.np : nearest.advice.en}</p>
        <p className="text-[11px] text-gray-400 mt-3 flex items-start gap-1.5">
          <Info size={12} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
          {np
            ? "गाई/भैंसीका लागि एडमोन्सन (१९८९) को ५-अंक प्रणाली। दुग्ध गाईको लक्ष्य: ब्याउँदा ३–३.५। महिनाको एक पटक अंक दिनुहोस्।"
            : "Edmondson et al. (1989) 5-point scale for cattle/buffalo. Dairy target: 3–3.5 at calving. Re-score monthly."}
        </p>
      </div>

      <ResultCardActions
        np={np}
        toolId="bcs"
        label={np ? `शरीर अवस्था अंक ${fmtS(score)}` : `Body condition score ${fmtS(score)}`}
        summary={`BCS ${fmtS(score)} — ${np ? nearest.np : nearest.en}`}
        detail={np ? nearest.look.np.slice(0, 90) : nearest.look.en.slice(0, 90)}
      />
    </div>
  );
}
