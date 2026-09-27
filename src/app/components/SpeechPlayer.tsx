import { AnimatePresence, motion } from "motion/react";
import {
  Volume2, X, Play, Pause, Square, SkipBack, SkipForward, Gauge, Mic2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useSpeech, relevantVoices } from "../context/SpeechContext";

/**
 * SPEECH PLAYER — floating mini-player shown while a read-aloud session is
 * active (playing or paused). Bottom-centre; on phones it floats above the
 * floating dock + WhatsApp buttons so nothing ever overlaps.
 *
 * Controls: previous block · play/pause · next block · stop · speed · voice.
 * Fully keyboard operable; the highlighting + auto-scroll live in
 * SpeechContext.
 */

const RATES = [0.75, 1, 1.25, 1.5];

export function SpeechPlayer() {
  const { language } = useLanguage();
  const np = language === "np";
  const s = useSpeech();

  if (!s.supported) return null;

  const pct = s.blockCount ? Math.round((s.blockIndex / s.blockCount) * 100) : 0;
  const voices = relevantVoices(s.voices, s.lang);

  const cycleRate = () => {
    const i = RATES.indexOf(s.rate);
    s.setRate(RATES[(i + 1) % RATES.length] ?? 1);
  };

  return (
    <AnimatePresence>
      {s.active && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          role="region"
          aria-label={np ? "पढेर सुनाउने प्लेयर" : "Read-aloud player"}
          className="speech-player fixed left-1/2 -translate-x-1/2 bottom-[5.75rem] md:bottom-6 z-40 w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-10rem)] md:w-auto md:max-w-[34rem] rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white shadow-2xl ring-1 ring-[#D4AF37]/40 overflow-hidden"
        >
          {/* Header: what is being read */}
          <div className="flex items-center gap-3 px-4 pt-3 pb-2">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#D4AF37]/20 ring-1 ring-[#D4AF37]/50 flex-shrink-0">
              <Volume2 size={16} className="text-[#D4AF37]" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold leading-none">
                {s.status === "playing"
                  ? np ? "पढ्दै…" : "Reading…"
                  : np ? "पज गरिएको" : "Paused"}
              </p>
              <p className="text-sm font-semibold truncate leading-tight mt-1">{s.title}</p>
            </div>
            <button
              type="button"
              onClick={s.stop}
              aria-label={np ? "प्लेयर बन्द गर्नुहोस्" : "Close player"}
              className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          {/* Progress */}
          <div className="px-4">
            <div
              className="h-1.5 rounded-full bg-white/15 overflow-hidden"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={s.blockCount}
              aria-valuenow={s.blockIndex}
              aria-label={np ? "पढाइको प्रगति" : "Reading progress"}
            >
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-full transition-[width] duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-1 mb-1 text-[11px] text-gray-300 tabular-nums">
              {np ? `खण्ड ${s.blockIndex + 1} / ${s.blockCount}` : `Section ${s.blockIndex + 1} of ${s.blockCount}`}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 px-3 pb-3">
            <button
              type="button"
              onClick={s.prev}
              aria-label={np ? "अघिल्लो खण्ड" : "Previous section"}
              className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <SkipBack size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={s.toggle}
              aria-label={s.status === "playing" ? (np ? "पज गर्नुहोस्" : "Pause") : np ? "पढाइ जारी राख्नुहोस्" : "Resume"}
              className="w-12 h-10 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] hover:brightness-110 flex items-center justify-center transition-all flex-shrink-0"
            >
              {s.status === "playing" ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={s.next}
              aria-label={np ? "अर्को खण्ड" : "Next section"}
              className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <SkipForward size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={s.stop}
              aria-label={np ? "रोक्नुहोस्" : "Stop"}
              className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Square size={15} aria-hidden="true" />
            </button>

            <div className="mx-1 w-px h-6 bg-white/15" aria-hidden="true" />

            {/* Speed */}
            <button
              type="button"
              onClick={cycleRate}
              title={np ? "पढाइको गति" : "Reading speed"}
              aria-label={`${np ? "पढाइको गति" : "Reading speed"}: ${s.rate}×`}
              className="h-10 px-3 rounded-xl border border-white/20 hover:border-[#D4AF37]/60 hover:bg-white/5 flex items-center gap-1.5 text-sm font-bold tabular-nums transition-colors"
            >
              <Gauge size={14} className="text-[#D4AF37]" aria-hidden="true" />
              {s.rate}×
            </button>

            {/* Voice picker (hidden when the engine offers no choice) */}
            {voices.length > 1 && (
              <div className="relative min-w-0 flex-1 sm:flex-none">
                <Mic2
                  size={13}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none"
                  aria-hidden="true"
                />
                <select
                  value={s.voiceURI ?? ""}
                  onChange={(e) => s.setVoiceURI(e.target.value)}
                  aria-label={np ? "आवाज छान्नुहोस्" : "Choose voice"}
                  className="w-full sm:w-44 h-10 pl-7 pr-2 rounded-xl border border-white/20 bg-transparent text-white text-xs font-medium truncate focus:border-[#D4AF37] outline-none appearance-none cursor-pointer [&>option]:text-[#0A2540]"
                >
                  <option value="">
                    {np ? "स्वतः उत्तम आवाज" : "Auto — best available"}
                  </option>
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name.replace(/Microsoft |Google |Natural|Neural/gi, "").trim().slice(0, 26)}
                      {" · "}
                      {v.lang}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
