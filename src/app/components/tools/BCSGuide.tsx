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
 *
 *  Illustration (r11): a hand-drafted anatomical side-profile line
 *  illustration. The figure is built from layered vector paths whose
 *  geometry is driven by per-score POSE parameters — belly depth, topline
 *  dip, short-rib visibility, hook/pin protrusion and tailhead cavity /
 *  fat folds — so the cow visibly fattens and thins the way the real
 *  anatomy does, with the four scoring checkpoints labelled on the figure.
 * ──────────────────────────────────────────────────────────────────────────── */

const SCORES: {
  score: number;
  en: string;
  np: string;
  look: { en: string; np: string };
  advice: { en: string; np: string };
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
  },
];

/* ── Per-score illustration geometry ────────────────────────────────────────
   belly   — Y of the deepest belly point (138 tucked-up → 158 deep)
   backDip — extra sag of the mid topline (thin spine ridge sits LOWER)
   rib     — visibility of the 6 short-rib strokes on the barrel
   hook    — hook-bone protrusion above the topline, px (7 sharp → 0 buried)
   hookOp  — hook-bone outline strength
   cavity  — tailhead cavity shadow (1 deep → 0 none)
   folds   — tailhead fat folds (0 none → 1 heavy)
   thigh   — inner-thigh hollow visibility
   neckC   — neck crest concavity (thin = hollow crest)                */
const POSES: Record<number, {
  belly: number; backDip: number; rib: number; hook: number; hookOp: number;
  cavity: number; folds: number; thigh: number; neckC: number;
}> = {
  1: { belly: 140, backDip: 6,  rib: 1,    hook: 7, hookOp: 0.95, cavity: 1,    folds: 0,    thigh: 0.85, neckC: 5 },
  2: { belly: 146, backDip: 3.5, rib: 0.8,  hook: 5, hookOp: 0.7,  cavity: 0.55, folds: 0,    thigh: 0.5,  neckC: 3 },
  3: { belly: 151, backDip: 1.5, rib: 0.45, hook: 3, hookOp: 0.42, cavity: 0.2,  folds: 0.1,  thigh: 0.2,  neckC: 1.5 },
  4: { belly: 156, backDip: 0.5, rib: 0.18, hook: 1.5, hookOp: 0.22, cavity: 0,  folds: 0.55, thigh: 0.05, neckC: 0.5 },
  5: { belly: 161, backDip: 0,   rib: 0.06, hook: 0.5, hookOp: 0.1,  cavity: 0,  folds: 1,    thigh: 0,    neckC: 0 },
};

const CHECKPOINTS = [
  { en: "Backbone", np: "ढाडको हाड्डी" },
  { en: "Ribs", np: "खेप्रा" },
  { en: "Hooks (hip bones)", np: "कुहिनो (हिप)" },
  { en: "Tailhead", np: "पुच्छरमुनि" },
];

const BODY_FILL = "#F7ECD9";
const BODY_STROKE = "#B8941F";
const FAR_FILL = "#E7D8BA";
const LINE = "#8A6D1F";

/** The anatomical cow figure — geometry driven by the POSE parameters. */
function CowFigure({ p, np }: { p: (typeof POSES)[number]; np: boolean }) {
  const t = (s: string) => (np ? s : s);

  /* Body+neck+head silhouette — one closed path. Control points derive from
     the pose so the barrel visibly deepens and the topline re-shapes.
     r11 refinement: deeper heart-girth that rises toward the flank, smooth
     withers junction (no neck/shoulder kink), longer horizontal head. */
  const body = [
    // poll (top of head) — start; head carried forward and level
    "M 56 68",
    // forehead → muzzle carried horizontally
    "C 48 66, 40 70, 34 78",
    "C 30 83, 30 90, 33 95",
    // muzzle front → jaw underline → throat, with dewlap slack at thin scores
    `C 36 101, 42 106, 50 108`,
    `C 62 111, 76 112, 88 114`,
    // throat → brisket rising (dewlap underline)
    `C 102 ${116 + p.neckC * 0.4}, 112 124, 118 130`,
    // brisket → deep heart girth (fullest at x≈142) → rising belly to flank
    `C 128 ${p.belly + 2}, 140 ${p.belly + 3}, 154 ${p.belly + 1}`,
    `C 172 ${p.belly - 2}, 192 ${p.belly - 5}, 210 ${p.belly - 9}`,
    `C 224 ${p.belly - 12}, 234 ${p.belly - 14}, 242 ${p.belly - 15}`,
    // flank → stifle → rear thigh
    "C 252 156, 258 158, 264 158",
    "C 272 158, 278 156, 284 152",
    "C 292 146, 298 136, 302 126",
    // pin region → tailhead rear edge (fat folds bulge outward at BCS 4–5)
    `C 305 ${118 - p.folds * 2}, 306 ${108 - p.folds * 3}, 304 ${100 - p.folds * 3}`,
    `C 301 ${92 - p.folds * 2}, 293 ${87 - p.folds}, 285 84`,
    // rump top → hook bump (protrusion shrinks as fat covers it)
    `C 279 ${82 - p.hook * 0.4}, 274 ${80 - p.hook}, 270 ${80 - p.hook}`,
    `C 266 ${80 - p.hook}, 262 ${80 - p.hook * 0.45}, 258 80`,
    // loin → mid-back; sag = backDip (thin animals show a sunken topline)
    `C 244 81, 224 ${82 + p.backDip}, 200 ${82 + p.backDip}`,
    `C 178 ${82 + p.backDip}, 160 ${81 + p.backDip * 0.6}, 146 80`,
    // withers — smooth shoulder junction, crest concavity driven by neckC
    `C 130 78, 108 ${70 + p.neckC * 0.5}, 92 ${64 + p.neckC * 0.6}`,
    `C 82 ${61 + p.neckC * 0.4}, 70 ${62 + p.neckC * 0.2}, 62 ${65 + p.neckC * 0.1}`,
    "C 59 65, 57 66, 56 68",
    "Z",
  ].join(" ");

  /* 6 short-rib strokes on the barrel — opacity = pose.rib. r11: each rib
     angles down-and-FORWARD like real costal cartilage and follows the
     barrel curvature (longer mid-barrel, shorter toward the flank). */
  const ribs = [156, 168, 180, 192, 203, 213].map((x, i) => {
    const top = 92 + i * 0.8;
    const len = (p.belly - 108) * (i === 0 || i === 5 ? 0.82 : i === 1 || i === 4 ? 0.95 : 1);
    const fwd = 9 + i * 1.2; // bottom of each rib sweeps forward
    return {
      d: `M ${x} ${top} q -2 ${len / 2} ${-fwd} ${len}`,
      key: x,
    };
  });

  const label = (x: number, y: number, text: string, anchor: "start" | "end" = "start") => (
    <text x={x} y={y} textAnchor={anchor} fontSize={9.5} fontWeight={700}
      fill="#6B7280" style={{ letterSpacing: np ? 0 : 0.4 }}>
      {t(text)}
    </text>
  );

  return (
    <svg viewBox="0 0 380 232" className="w-full max-w-lg mx-auto" role="img"
      aria-label={np ? `शरीर अवस्था चित्र — अंक अनुसार` : `BCS figure — body changes with the score`}>
      {/* ground shadow */}
      <ellipse cx="186" cy="212" rx="138" ry="7" fill="#0A2540" opacity="0.07" />

      {/* far-side legs (behind the body, visibly lighter + offset) */}
      <g fill={FAR_FILL} stroke={BODY_STROKE} strokeWidth="1.8" opacity="0.9">
        <path d="M 128 138 C 126 160 125 178 126 198 L 136 198 C 138 178 139 158 142 136 Z" />
        <path d="M 250 156 C 252 168 253 184 252 200 L 261 200 C 261 184 259 168 258 154 Z" />
        <rect x="124" y="196" width="15" height="10" rx="2" />
        <rect x="250" y="198" width="14" height="9" rx="2" />
      </g>

      {/* tail (behind body near-side; set just below the tailhead peak) */}
      <path d="M 301 103 C 312 122 315 143 311 166" fill="none"
        stroke={BODY_STROKE} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="310" cy="172" rx="5.5" ry="9" fill={LINE} opacity="0.85" />

      {/* body silhouette */}
      <path d={body} fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="3"
        strokeLinejoin="round" style={{ transition: "d .45s ease, opacity .3s" }} />

      {/* near-side legs — front leg with knee articulation + taper; hind
          leg with a clear angular hock (thigh → pointed hock → cannon) */}
      <g fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="2.6" strokeLinejoin="round">
        {/* front: shoulder → knee (slight forward bend) → tapered cannon → hoof */}
        <path d="M 130 132 C 130 150 129 166 126 180 C 124 188 123 193 123 198 L 143 198 C 146 186 148 170 149 152 C 150 143 151 135 151 130 Z" />
        {/* hind: thigh sweeps back, sharp hock at (262,170), cannon drops vertically */}
        <path d="M 240 154 C 252 158 260 164 264 172 C 266 176 264 180 262 184 C 259 190 257 195 256 202 L 272 202 C 274 192 275 182 274 170 C 272 160 262 154 252 148 Z" />
        <rect x="119" y="194" width="27" height="11" rx="2.5" />
        <rect x="253" y="200" width="22" height="10" rx="2.5" />
      </g>

      {/* udder hint — fuller with condition */}
      <path d={`M 216 ${p.belly - 11} C 222 ${p.belly - 2}, 234 ${p.belly - 3}, 242 ${p.belly - 12}
                C 238 ${p.belly - 17}, 224 ${p.belly - 18}, 216 ${p.belly - 11} Z`}
        fill="#F0E2C4" stroke={BODY_STROKE} strokeWidth="2" opacity="0.95" />

      {/* horn + ear + face (head carried level, larger, forward) */}
      <path d="M 60 68 C 56 60, 54 54, 56 49" fill="none" stroke={LINE} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M 66 66 C 73 60, 79 58, 85 60 C 80 64, 73 66, 66 68 Z" fill={FAR_FILL} stroke={BODY_STROKE} strokeWidth="2" />
      <circle cx="44" cy="78" r="2.6" fill="#0A2540" />
      <path d="M 34 88 q -3 1.5 -0.5 3" fill="none" stroke="#0A2540" strokeWidth="1.6" strokeLinecap="round" />

      {/* ——— anatomy markers, all pose-driven ——— */}
      {/* backbone ridge — spinous-process bumps along the topline; sharper
          and more visible in thin animals */}
      <path d={`M 150 82 C 172 ${84 + p.backDip}, 198 ${84 + p.backDip}, 222 ${83 + p.backDip * 0.5}`}
        fill="none" stroke={LINE} strokeWidth={2.6} opacity={Math.min(1, p.rib + 0.15)} strokeLinecap="round"
        style={{ transition: "opacity .3s" }} />
      {[158, 172, 186, 200, 214].map((x) => (
        <path key={x} d={`M ${x - 3} ${85 + p.backDip * (x < 226 ? 1 : 0.5)} l 6 -3.4`}
          stroke={LINE} strokeWidth="2" strokeLinecap="round" opacity={p.rib * 0.8}
          style={{ transition: "opacity .3s" }} />
      ))}

      {/* short ribs on the barrel */}
      {ribs.map((r) => (
        <path key={r.key} d={r.d} fill="none" stroke={LINE} strokeWidth="2.7"
          strokeLinecap="round" opacity={p.rib} style={{ transition: "opacity .3s" }} />
      ))}

      {/* hook (hip) bone — outline + protrusion (sharper at low BCS) */}
      <path d={`M 262 ${82 - p.hook * 0.5} C 264 ${80 - p.hook}, 268 ${80 - p.hook}, 270 ${82 - p.hook * 0.5}`}
        fill="none" stroke={LINE} strokeWidth="2.8" strokeLinecap="round"
        opacity={p.hookOp} style={{ transition: "opacity .3s" }} />

      {/* tailhead cavity shadow (thin) */}
      <path d="M 297 104 C 300 108, 301 113, 299 118 C 296 114, 295 109, 297 104 Z"
        fill="#0A2540" opacity={p.cavity * 0.35} style={{ transition: "opacity .3s" }} />
      {/* tailhead fat folds (overcondition) */}
      <g stroke={LINE} strokeWidth="2.2" fill="none" opacity={p.folds} strokeLinecap="round"
        style={{ transition: "opacity .3s" }}>
        <path d="M 296 104 q 5 3 4 8" />
        <path d="M 291 110 q 4 3 3 7" />
      </g>

      {/* pin bone notch */}
      <path d="M 300 124 q 4 -2 5 -6" fill="none" stroke={LINE} strokeWidth="2.2"
        opacity={p.hookOp * 0.8} strokeLinecap="round" style={{ transition: "opacity .3s" }} />

      {/* inner-thigh hollow */}
      <path d="M 274 152 C 278 157, 277 163, 272 166" fill="none" stroke={LINE}
        strokeWidth="2.2" opacity={p.thigh * 0.7} strokeLinecap="round"
        style={{ transition: "opacity .3s" }} />

      {/* ——— checkpoint labels with leader lines (the teaching layer) ———
          Solid leaders with terminal dots, none crossing the body. */}
      <g stroke="#9CA3AF" strokeWidth="1" fill="#9CA3AF">
        <path d="M 188 74 L 200 60" fill="none" />
        <circle cx="188" cy="74" r="1.8" />
        <path d="M 172 126 L 150 148" fill="none" />
        <circle cx="172" cy="126" r="1.8" />
        <path d="M 270 72 L 288 56" fill="none" />
        <circle cx="270" cy="72" r="1.8" />
        <path d="M 299 116 L 316 116" fill="none" />
        <circle cx="299" cy="116" r="1.8" />
      </g>
      {label(203, 59, np ? "ढाडको हाड्डी" : "Backbone")}
      {label(148, 158, np ? "खेप्रा" : "Short ribs", "end")}
      {label(291, 55, np ? "कुहिनो (हिप)" : "Hook bones")}
      {label(319, 115, np ? "पुच्छरमुनि" : "Tailhead")}
    </svg>
  );
}

export function BCSGuide({ np }: { np: boolean }) {
  const [score, setScore] = useState(3);
  const nearest = SCORES.reduce((a, b) => (Math.abs(b.score - score) < Math.abs(a.score - score) ? b : a));
  const pose = POSES[nearest.score] ?? POSES[3];

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

      {/* Anatomical figure */}
      <div className="rounded-2xl border-2 border-gray-100 bg-gradient-to-b from-gray-50/80 to-white p-4 sm:p-5">
        <CowFigure p={pose} np={np} />
        <p className="text-[10px] text-gray-400 text-center mt-1 leading-relaxed">
          {np
            ? "साइड-प्रोफाइल चित्र — अंक बढ्दा बोसोले हाड्डी ढाक्दै जान्छ (मध्यम अवस्था = आदर्श)"
            : "Side profile — as the score rises, fat covers the bony landmarks (Moderate = ideal)"}
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
