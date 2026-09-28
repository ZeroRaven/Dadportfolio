import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { CalendarHeart, Clock3, Download, Check, HeartPulse, Baby, FileCheck2 } from "lucide-react";
import { Input } from "../ui/input";
import { toNepaliDigits } from "../../i18n/format";
import { ResultCardActions } from "./ResultActions";

/**
 * ESTRUS & BREEDING PLANNER — from one observed heat to the whole service
 * calendar. Species constants are the published physiology:
 *
 *   · Cattle: estrous cycle 18–24 d (avg 21), standing heat 12–18 h,
 *     ovulation 10–14 h after heat ends, best AI 9–24 h after onset
 *     (MSD/Merck Vet Manual; SDSU Extension).
 *   · Buffalo: cycle 18–24 d, heat 18–24 h, ovulation ~10 h after heat
 *     ends, signs peak at night, silent heat common (celkau.in,
 *     pashusandesh.com). Gestation 310 d (Murrah/Nili-Ravi, FAO).
 *   · Goat: cycle 17–21 d, heat 24–48 h, serve twice ~12 h apart; 150 d
 *     gestation (Merck).
 *   · AM/PM rule: seen standing in the morning → serve the same evening;
 *     seen in the afternoon → serve the next morning.
 *   · Non-return 24–26 d · pregnancy check: US ~30 d, palpation 35–45 d ·
 *     rebreeding after calving: 45–60 d (cattle).
 */

interface Spec {
  id: string;
  en: string;
  np: string;
  cycle: number;
  cycleRange: [number, number];
  heat: string;
  aiNote: { en: string; np: string };
  gestation: number;
  rebreed: [number, number];
}

const SPECS: Spec[] = [
  {
    id: "cow", en: "Cow", np: "गाई", cycle: 21, cycleRange: [18, 24],
    heat: "12–18 h",
    aiNote: { en: "Serve 9–24 h after she first stands.", np: "पहिलो पटक बोका चढ्न दिएपछिको ९–२४ घण्टामा मिलन।" },
    gestation: 283, rebreed: [45, 60],
  },
  {
    id: "buffalo", en: "Buffalo", np: "भैंसी", cycle: 21, cycleRange: [18, 24],
    heat: "18–24 h",
    aiNote: { en: "Night-active — check at dusk; silent heats are common.", np: "रात-सक्रिय — साँझ हेर्नुहोस्; मूक यात्रा बढी हुन्छ।" },
    gestation: 310, rebreed: [60, 90],
  },
  {
    id: "goat", en: "Goat / doe", np: "बाख्री", cycle: 19, cycleRange: [17, 21],
    heat: "24–48 h",
    aiNote: { en: "Serve at detection and again ~12 h later.", np: "देखिएकै बेला र ~१२ घण्टापछि फेरि मिलन।" },
    gestation: 150, rebreed: [45, 60],
  },
];

const isoLocal = (d: Date) =>
  [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");

const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

const NP_MONTHS = ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"];
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const pretty = (d: Date, np: boolean) =>
  `${d.getDate()} ${np ? NP_MONTHS[d.getMonth()] : EN_MONTHS[d.getMonth()]} ${np ? toNepaliDigits(String(d.getFullYear())) : d.getFullYear()}`;

export function EstrusPlanner({ np }: { np: boolean }) {
  const [specId, setSpecId] = useState("cow");
  const [lastHeat, setLastHeat] = useState("");
  const [seenPeriod, setSeenPeriod] = useState<"am" | "pm">("am");
  const [bred, setBred] = useState(true);

  const spec = SPECS.find((s) => s.id === specId) ?? SPECS[0];

  const base = useMemo(() => {
    if (!lastHeat) return null;
    const d = new Date(`${lastHeat}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [lastHeat]);

  /* Optimal AI window for the observed heat: 9–24 h after onset.
     Seen in the morning (≈6 AM) → 3 PM same day → 6 AM next day.
     Seen in the afternoon (≈3 PM) → midnight → 3 PM next day. */
  const aiWindow = useMemo(() => {
    if (!base) return null;
    const onsetHour = seenPeriod === "am" ? 6 : 15;
    const start = addDays(base, onsetHour + 9 >= 24 ? 1 : 0);
    start.setHours((onsetHour + 9) % 24, 0, 0, 0);
    const end = addDays(base, onsetHour + 24 >= 24 ? 1 : 0);
    end.setHours((onsetHour + 24) % 24, 0, 0, 0);
    return { start, end };
  }, [base, seenPeriod]);

  /* AI date used for the bred timeline: middle of the window. */
  const aiDate = useMemo(() => {
    if (!aiWindow) return null;
    const mid = new Date((aiWindow.start.getTime() + aiWindow.end.getTime()) / 2);
    mid.setHours(12, 0, 0, 0); // keep a calendar date
    return mid;
  }, [aiWindow]);

  const nextHeats = useMemo(() => {
    if (!base) return [];
    return [1, 2, 3].map((n) => {
      const expected = addDays(base, spec.cycle * n);
      return {
        n,
        expected,
        from: addDays(base, spec.cycle * n - (spec.cycle - spec.cycleRange[0])),
        to: addDays(base, spec.cycle * n + (spec.cycleRange[1] - spec.cycle)),
      };
    });
  }, [base, spec]);

  const fmtTime = (h: number) => `${String(h).padStart(2, "0")}:00`;
  const fmtN = (v: number) => (np ? toNepaliDigits(String(v)) : String(v));

  /* .ics — a reminder the evening before the NEXT expected heat (+ preg-check if bred) */
  const buildIcs = (): string => {
    if (!nextHeats.length || !aiDate) return "";
    const today = new Date();
    const stamp =
      isoLocal(today).replace(/-/g, "") +
      "T" + String(today.getUTCHours()).padStart(2, "0") + String(today.getUTCMinutes()).padStart(2, "0") + "00Z";
    const d1 = (d: Date) => isoLocal(d).replace(/-/g, "");
    const events: string[] = [];
    const heat = nextHeats[0];
    const heatTitle = np ? `अर्को यात्रा अपेक्षित — ${spec.np}` : `Next expected heat — ${spec.en}`;
    events.push(
      "BEGIN:VEVENT",
      `UID:estrus-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@drmogalshah.com.np`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${d1(heat.from)}`,
      `DTEND;VALUE=DATE:${d1(addDays(heat.to, 1))}`,
      `SUMMARY:${heatTitle}`,
      `DESCRIPTION:${np ? "यात्रा सुरु हुने दायरा — बिहान-साँझ बीस मिनेट शान्त हेर्नुहोस्। drmogalshah.com.np/tools/estrus" : "Heat window opens — watch quietly 20 min at dawn & dusk. drmogalshah.com.np/tools/estrus"}`,
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${heatTitle}`,
      "END:VALARM",
      "END:VEVENT"
    );
    if (bred) {
      const pregTitle = np ? `गर्भ जाँच — ${spec.np}` : `Pregnancy check — ${spec.en}`;
      const check = addDays(aiDate, 40);
      events.push(
        "BEGIN:VEVENT",
        `UID:pregcheck-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@drmogalshah.com.np`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${d1(check)}`,
        `DTEND;VALUE=DATE:${d1(addDays(check, 1))}`,
        `SUMMARY:${pregTitle}`,
        `DESCRIPTION:${np ? "मिलन भएको ३५–४५ दिनमा गर्भ पक्का गर्नुहोस् (अल्ट्रासाउन्ड ~३० दिनदेखि)।" : "Confirm pregnancy 35–45 days after AI (ultrasound from ~day 30)."}`,
        "BEGIN:VALARM",
        "TRIGGER:-P1D",
        "ACTION:DISPLAY",
        `DESCRIPTION:${pregTitle}`,
        "END:VALARM",
        "END:VEVENT"
      );
    }
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//drmogalshah com np//Breeding Planner//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      ...events,
      "END:VCALENDAR",
    ].join("\r\n");
  };

  const [downloaded, setDownloaded] = useState(false);
  const download = () => {
    if (!base || !aiDate) return;
    const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `estrus-${spec.id}-${isoLocal(base).replace(/-/g, "")}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  const summary =
    base && aiWindow
      ? np
        ? `${spec.np} · यात्रा ${pretty(base, np)} → अर्को यात्रा ${pretty(nextHeats[0].expected, np)} (${fmtN(spec.cycle)} दिन चक्र)`
        : `${spec.en} · heat ${pretty(base, false)} → next heat ${pretty(nextHeats[0].expected, false)} (${spec.cycle}-day cycle)`
      : "";

  return (
    <div className="space-y-5">
      {/* ── Inputs ───────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-gray-100 bg-white p-5 sm:p-6">
        <p className="flex items-center gap-2 text-sm font-bold text-[#0A2540] mb-4">
          <CalendarHeart size={17} className="text-[#B8941F]" aria-hidden="true" />
          {np ? "यात्रा देखिएको विवरण" : "The heat you saw"}
        </p>
        <div className="space-y-4">
          <div>
            <span className="block text-xs font-semibold text-gray-700 mb-1.5">{np ? "पशुको जात" : "Species"}</span>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label={np ? "जात छान्नुहोस्" : "Choose species"}>
              {SPECS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={specId === s.id}
                  onClick={() => setSpecId(s.id)}
                  className={`py-2.5 px-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                    specId === s.id
                      ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#0A2540]"
                      : "border-gray-200 text-gray-500 hover:border-[#D4AF37]/50 hover:text-[#0A2540]"
                  }`}
                >
                  {np ? s.np : s.en}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-xs font-semibold text-gray-700 mb-1.5">
                {np ? "यात्रा देखिएको मिति" : "Date heat was seen"}
              </span>
              <Input
                type="date"
                value={lastHeat}
                onChange={(e) => setLastHeat(e.target.value)}
                aria-label={np ? "यात्राको मिति" : "Heat date"}
                className="border-2 border-gray-200 focus:border-[#D4AF37] text-sm font-semibold"
              />
            </label>
            <div>
              <span className="block text-xs font-semibold text-gray-700 mb-1.5">
                {np ? "कति बेला देखियो?" : "When did you see it?"}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { v: "am", en: "Morning", np: "बिहान" },
                  { v: "pm", en: "Afternoon", np: "दिउँसो/बेलुका" },
                ] as const).map((x) => (
                  <button
                    key={x.v}
                    type="button"
                    aria-pressed={seenPeriod === x.v}
                    onClick={() => setSeenPeriod(x.v)}
                    className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                      seenPeriod === x.v
                        ? "border-[#0A2540] bg-[#0A2540] text-white"
                        : "border-gray-200 text-gray-500 hover:border-[#D4AF37]/50 hover:text-[#0A2540]"
                    }`}
                  >
                    {np ? x.np : x.en}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={bred}
              onChange={(e) => setBred(e.target.checked)}
              className="accent-[#D4AF37] w-4 h-4"
            />
            {np ? "यही यात्रामा मिलन/AI गराइएको छ" : "She was inseminated (AI) this heat"}
          </label>
        </div>
        <p className="mt-4 flex items-start gap-2 text-[11px] text-gray-500 leading-relaxed">
          <Clock3 size={13} className="mt-0.5 flex-shrink-0 text-[#B8941F]" aria-hidden="true" />
          {np ? spec.aiNote.np : spec.aiNote.en}
          {np
            ? ` · ${spec.np}को चक्र ${fmtN(spec.cycleRange[0])}–${fmtN(spec.cycleRange[1])} दिन, यात्रा ${spec.heat}।`
            : ` · ${spec.en} cycle ${spec.cycleRange[0]}–${spec.cycleRange[1]} d, standing heat ${spec.heat}.`}
        </p>
      </div>

      {!base ? (
        <div className="rounded-2xl bg-white border-2 border-gray-100 p-8 text-center">
          <HeartPulse className="mx-auto text-gray-300 mb-2" size={30} aria-hidden="true" />
          <p className="text-sm text-gray-500">
            {np ? "मिति राख्नासाथ पूरै पात्रो यहाँ देखिन्छ।" : "Enter the heat date and the whole calendar appears here."}
          </p>
        </div>
      ) : (
        <>
          {/* ── AI window ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-5 sm:p-6"
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold mb-1.5">
              {np ? "यही यात्राका लागि" : "For this heat"}
            </p>
            <p className="font-display text-xl sm:text-2xl font-bold leading-snug mb-2">
              {np ? "मिलनको उत्तम झ्याल" : "Optimal insemination window"}
            </p>
            <p className="text-sm text-gray-200 leading-relaxed">
              {np
                ? `बोका चढ्न दिएको ${seenPeriod === "am" ? "बिहान" : "दिउँसो"} देखिएपछिको ९–२४ घण्टा: `
                : `9–24 h after first standing (${seenPeriod === "am" ? "morning" : "afternoon"}): `}
              <strong className="text-[#D4AF37]">
                {pretty(aiWindow!.start, np)}, {fmtTime(aiWindow!.start.getHours())}
              </strong>
              {" → "}
              <strong className="text-[#D4AF37]">
                {pretty(aiWindow!.end, np)}, {fmtTime(aiWindow!.end.getHours())}
              </strong>
            </p>
            <p className="mt-2 text-xs text-gray-300 leading-relaxed">
              {np
                ? "पुरानो नियम: बिहान देखियो → त्यही बेलुका मिलन; दिउँसो देखियो → अर्को बिहान। अन्डा यात्रा सकिएको १०–१४ घण्टापछि निस्कन्छ — बीउलाई तयार हुन कयौं घण्टा चाहिन्छ।"
                : "The old rule: seen in the morning → serve the same evening; seen in the afternoon → serve next morning. The egg releases 10–14 h after heat ends — and semen needs hours to ready itself."}
            </p>
          </motion.div>

          {/* ── Next heats ─────────────────────────────────────── */}
          <div className="rounded-2xl border-2 border-gray-100 bg-white overflow-hidden">
            <div className="px-5 py-3.5 bg-[#0A2540] text-white flex items-center gap-2">
              <CalendarHeart size={16} className="text-[#D4AF37]" aria-hidden="true" />
              <p className="text-sm font-bold">
                {np ? "अर्का तीन यात्राको अपेक्षा" : "Next three expected heats"}
              </p>
            </div>
            <div className="divide-y divide-gray-50">
              {nextHeats.map((h, i) => (
                <div key={h.n} className="px-5 py-3.5 flex items-center gap-3.5">
                  <span className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B8941F] flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {fmtN(h.n)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#0A2540]">{pretty(h.expected, np)}</p>
                    <p className="text-xs text-gray-500">
                      {np ? "दायरा" : "Range"}: {pretty(h.from, np)} – {pretty(h.to, np)}
                    </p>
                  </div>
                  {i === 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1 flex-shrink-0">
                      {np ? "सबैभन्दा नजिक" : "Next up"}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-500 leading-relaxed">
              {np
                ? "चक्र भित्र-बाहिर हुन सक्छ — यात्रा दायराभित्रै जुनसुकै दिन आउँदा असर गर्दैन। यात्रा नआएकै ३५+ दिन भयो भने पशुलाई नजिकबाट हेर्नुहोस् (वा गर्भवती होला — जाँच गराउनुहोस्)।"
                : "Cycles drift — any day inside the range is normal. An animal over ~35 days with no observed heat deserves a close look (or is quietly pregnant — get her checked)."}
            </p>
          </div>

          {/* ── Bred timeline ──────────────────────────────────── */}
          {bred && aiDate && (
            <div className="rounded-2xl border-2 border-gray-100 bg-white overflow-hidden">
              <div className="px-5 py-3.5 bg-[#0A2540] text-white flex items-center gap-2">
                <FileCheck2 size={16} className="text-[#D4AF37]" aria-hidden="true" />
                <p className="text-sm font-bold">
                  {np ? "मिलन भएपछिको पात्रो" : "After the service"}
                </p>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  {
                    icon: Clock3,
                    d: addDays(aiDate, 24), d2: addDays(aiDate, 26),
                    title: np ? "न-फर्किने जाँच" : "Non-return check",
                    body: np ? "यतिसम्म यात्रा फर्किएन भने गर्भ बसेको मान्नुहोस् — पक्का गर्न तलको जाँच सम्झनुहोस्।" : "No heat returned by now → assume pregnant until the check below proves it.",
                  },
                  {
                    icon: FileCheck2,
                    d: addDays(aiDate, 30), d2: addDays(aiDate, 45),
                    title: np ? "गर्भ पुष्टि" : "Pregnancy confirmation",
                    body: np ? "अल्ट्रासाउन्ड ~३० दिनदेखि; छामेर जाँच ३५–४५ दिनमा सबैभन्दा भरपर्दा।" : "Ultrasound from ~day 30; rectal palpation is most reliable at 35–45 days.",
                  },
                  {
                    icon: Baby,
                    d: addDays(aiDate, spec.gestation), d2: null,
                    title: np ? `अपेक्षित प्रसूति (~${fmtN(spec.gestation)} दिन)` : `Expected delivery (~${spec.gestation} days)`,
                    body: np ? "गर्भावधिको दायरा र व्यवस्थापनका लागि Gestation औजार हेर्नुहोस्।" : "See the Gestation tool for the calving range and dry-off management.",
                  },
                  {
                    icon: HeartPulse,
                    d: addDays(addDays(aiDate, spec.gestation), spec.rebreed[0]),
                    d2: addDays(addDays(aiDate, spec.gestation), spec.rebreed[1]),
                    title: np ? "प्रसूतिपछि पुन: मिलन सुरु" : "Rebreeding window after calving",
                    body: spec.id === "buffalo"
                      ? np ? "भैंसीमा जाडो महिनामा निषेचन राम्रो — मौसम पनि हेर्नुहोस्।" : "Buffalo conceive best in cooler months — mind the season too."
                      : np ? "पाठेघर पूर्ण आरामपछि मात्र — शरीर-अवस्था पनि राम्रो हुनुपर्छ।" : "Only after the uterus has fully rested — and body condition must be right.",
                  },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div key={i} className="px-5 py-3.5 flex items-start gap-3.5">
                      <span className="w-9 h-9 rounded-lg bg-[#0A2540] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#0A2540]">{row.title}</p>
                        <p className="text-xs font-semibold text-[#B8941F] mt-0.5">
                          {row.d2
                            ? `${pretty(row.d, np)} – ${pretty(row.d2, np)}`
                            : pretty(row.d, np)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{row.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Actions ────────────────────────────────────────── */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={download}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0A2540] hover:bg-[#12365C] text-white text-sm font-semibold transition-colors"
            >
              {downloaded ? <Check size={16} aria-hidden="true" /> : <Download size={16} aria-hidden="true" />}
              {downloaded
                ? np ? "डाउनलोड भयो — फाइल खोलेर पात्रोमा थप्नुहोस्" : "Downloaded — open the file to add to your calendar"
                : np ? "क्यालेन्डर सम्झना डाउनलोड गर्नुहोस् (.ics)" : "Download calendar reminders (.ics)"}
            </button>
            {downloaded && (
              <p className="text-[11px] text-gray-400 text-center leading-snug">
                {np
                  ? "अर्को यात्राको दायरा र गर्भ-जाँचका दिन — दुवै सम्झना आउँछ।"
                  : "Both the next heat window and the pregnancy-check date are included."}
              </p>
            )}
            <ResultCardActions
              toolId="estrus"
              np={np}
              label={`${np ? spec.np : spec.en} · ${np ? (seenPeriod === "am" ? "बिहान" : "दिउँसो") : seenPeriod === "am" ? "morning" : "afternoon"} · ${pretty(base, np)}`}
              summary={summary}
              detail={
                (np ? `मिलन झ्याल: ${pretty(aiWindow!.start, np)} ${fmtTime(aiWindow!.start.getHours())} → ${pretty(aiWindow!.end, np)} ${fmtTime(aiWindow!.end.getHours())}\n` : `Serve window: ${pretty(aiWindow!.start, false)} ${fmtTime(aiWindow!.start.getHours())} → ${pretty(aiWindow!.end, false)} ${fmtTime(aiWindow!.end.getHours())}\n`) +
                nextHeats.map((h) => (np ? `अर्को यात्रा ${fmtN(h.n)}: ${pretty(h.expected, np)}\n` : `Heat ${h.n}: ${pretty(h.expected, false)}\n`)).join("") +
                (bred && aiDate
                  ? np
                    ? `गर्भ जाँच: ${pretty(addDays(aiDate, 30), np)} – ${pretty(addDays(aiDate, 45), np)}\nप्रसूति: ~${pretty(addDays(aiDate, spec.gestation), np)}\n`
                    : `Preg check: ${pretty(addDays(aiDate, 30), false)} – ${pretty(addDays(aiDate, 45), false)}\nDelivery: ~${pretty(addDays(aiDate, spec.gestation), false)}\n`
                  : "") +
                "drmogalshah.com.np/tools/estrus"
              }
            />
          </div>

          <p className="flex items-start gap-2 text-[11px] text-gray-400 leading-relaxed">
            <Clock3 size={12} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
            {np
              ? "स्रोत: MSD/Merck Veterinary Manual (चक्र १८–२४ दिन, यात्रा १२–१८ घण्टा, AI समय); SDSU Extension; भैंसी: celkau.in (ताप १८–२४ घण्टा, अन्डा यात्रा सकिएको ~१० घण्टापछि); pashusandesh.com (भैंसीको रात-यात्रा)।"
              : "Sources: MSD/Merck Veterinary Manual (cycle 18–24 d, heat 12–18 h, AI timing); SDSU Extension; buffalo: celkau.in (heat 18–24 h, ovulation ~10 h after end); pashusandesh.com (buffalo night estrus)."}
          </p>
        </>
      )}
    </div>
  );
}
