import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Accessibility, X, Type, Contrast, Zap, Underline, Volume2, Square,
  RotateCcw, Check, BookOpenText, TextQuote, Highlighter, Keyboard,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useA11y, type FontScale } from "../context/AccessibilityContext";
import { useSpeech } from "../context/SpeechContext";

/**
 * ACCESSIBILITY PANEL — opens from the floating dock (bottom-right).
 *
 * Organised in three plain-language groups so people can find the help
 * they need without knowing WCAG numbers:
 *
 *   SEE            text size (4 steps) · readable font · high contrast
 *   READ           read aloud (opens the speech player) · reading guide ·
 *                  dyslexia spacing · underline links
 *   MOTION         reduce motion
 *
 * Everything persists in localStorage; Reset returns to defaults.
 * Keyboard: Alt+A toggles the panel, Esc closes, focus returns to the
 * launcher, Tab is trapped while open.
 */

function ToggleRow({
  icon: Icon,
  label,
  hint,
  checked,
  onChange,
}: {
  icon: typeof Contrast;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
    >
      <Icon size={17} className={checked ? "text-[#B8941F]" : "text-gray-400"} aria-hidden="true" />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[#0A2540] leading-tight">{label}</span>
        {hint && <span className="block text-[11px] text-gray-400 leading-snug mt-0.5">{hint}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${
          checked ? "bg-[#D4AF37]" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
            checked ? "left-[1.15rem]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}

function SectionLabel({ icon: Icon, children }: { icon: typeof Contrast; children: string }) {
  return (
    <p className="px-3 pt-3 pb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-bold text-[#B8941F]">
      <Icon size={12} aria-hidden="true" />
      {children}
    </p>
  );
}

export function AccessibilityPanel({
  open,
  onClose,
  launcherRef,
}: {
  open: boolean;
  onClose: () => void;
  launcherRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const { language } = useLanguage();
  const np = language === "np";
  const a11y = useA11y();
  const speech = useSpeech();
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc closes + focus return; Tab stays inside while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        launcherRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, launcherRef]);

  const fontScales: { v: FontScale; label: string; title: string }[] = [
    { v: 1, label: "A", title: np ? "सामान्य आकार" : "Normal size" },
    { v: 1.125, label: "A+", title: np ? "ठूलो" : "Large" },
    { v: 1.25, label: "A++", title: np ? "अझ ठूलो" : "Larger" },
    { v: 1.4, label: "A+++", title: np ? "सबैभन्दा ठूलो" : "Largest" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-label={np ? "पहुँचयोग्यता सेटिङ" : "Accessibility settings"}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.18 }}
          className="a11y-panel absolute bottom-full right-0 mb-2 z-50 w-[19.5rem] max-w-[calc(100vw-2rem)] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden outline-none"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white px-4 py-3.5 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold">
                {np ? "सबैका लागि" : "For everyone"}
              </p>
              <h2 className="font-display text-base font-bold leading-tight">
                {np ? "पहुँचयोग्यता" : "Accessibility"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                launcherRef.current?.focus();
              }}
              aria-label={np ? "बन्द गर्नुहोस्" : "Close"}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X size={17} />
            </button>
          </div>

          <div className="p-2.5 max-h-[min(70vh,34rem)] overflow-y-auto overscroll-contain">
            {/* ── SEE ─────────────────────────────────────────────── */}
            <SectionLabel icon={Contrast}>{np ? "देख्न" : "See"}</SectionLabel>

            <div className="px-3 pb-1.5">
              <p className="text-sm font-semibold text-[#0A2540] flex items-center gap-2">
                <Type size={16} className="text-[#B8941F]" aria-hidden="true" />
                {np ? "अक्षरको आकार" : "Text size"}
              </p>
            </div>
            <div className="grid grid-cols-4 gap-1.5 px-3 pb-2" role="group" aria-label={np ? "अक्षरको आकार" : "Text size"}>
              {fontScales.map((f) => {
                const active = a11y.fontScale === f.v;
                return (
                  <button
                    key={f.v}
                    type="button"
                    aria-pressed={active}
                    title={f.title}
                    onClick={() => a11y.setFontScale(f.v)}
                    className={`py-2 rounded-xl border-2 font-bold transition-all ${
                      active
                        ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#0A2540]"
                        : "border-gray-200 text-gray-500 hover:border-[#D4AF37]/50 hover:text-[#0A2540]"
                    } ${f.v >= 1.25 ? "text-base" : "text-sm"}`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            <ToggleRow
              icon={BookOpenText}
              label={np ? "पढ्न सजिलो फन्ट" : "Readable font"}
              hint={np ? "अक्षर छुट्टिएर देखिने फन्ट" : "Letterforms built for low vision"}
              checked={a11y.readableFont}
              onChange={a11y.setReadableFont}
            />
            <ToggleRow
              icon={Contrast}
              label={np ? "उच्च भिन्नता (कन्ट्रास्ट)" : "High contrast"}
              hint={np ? "डार्क थिम, चम्किलो अक्षर" : "Dark theme, brighter text"}
              checked={a11y.highContrast}
              onChange={a11y.setHighContrast}
            />

            {/* ── READ ────────────────────────────────────────────── */}
            <div className="border-t border-gray-100 my-1.5" aria-hidden="true" />
            <SectionLabel icon={BookOpenText}>{np ? "पढ्न" : "Read"}</SectionLabel>

            {speech.supported && (
              <div className="px-3 pb-2">
                <p className="text-sm font-semibold text-[#0A2540] flex items-center gap-2">
                  <Volume2 size={16} className="text-[#B8941F]" aria-hidden="true" />
                  {np ? "पढेर सुनाउने" : "Read aloud"}
                </p>
                {np && (
                  <p className="text-[11px] text-gray-400 leading-snug mt-0.5">
                    ब्राउजरमा नेपाली आवाज छ भने नेपालीमै पढ्छ
                  </p>
                )}
                <div className="flex gap-2 mt-2">
                  {!speech.active ? (
                    <button
                      type="button"
                      onClick={() => speech.start()}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0A2540] text-white text-sm font-semibold hover:bg-[#12365C] transition-colors"
                    >
                      <Volume2 size={15} aria-hidden="true" />
                      {np ? "यो पृष्ठ पढ्नुहोस्" : "Read this page"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={speech.stop}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
                    >
                      <Square size={14} aria-hidden="true" />
                      {np ? "रोक्नुहोस्" : "Stop reading"}
                    </button>
                  )}
                </div>
              </div>
            )}

            <ToggleRow
              icon={Highlighter}
              label={np ? "पढ्ने गाइड" : "Reading guide"}
              hint={np ? "माउससँगै चल्ने पट्टी (कम्प्युटरमा)" : "A bar that follows your cursor"}
              checked={a11y.readingGuide}
              onChange={a11y.setReadingGuide}
            />
            <ToggleRow
              icon={TextQuote}
              label={np ? "डिस्लेक्सिया-मैत्री फाँट" : "Dyslexia spacing"}
              hint={np ? "अक्षर र पंक्तिबीच बढी ठाउँ" : "Extra letter & line spacing"}
              checked={a11y.dyslexiaSpacing}
              onChange={a11y.setDyslexiaSpacing}
            />
            <ToggleRow
              icon={Underline}
              label={np ? "लिङ्कमा अन्डरलाइन" : "Underline links"}
              hint={np ? "लिङ्क छुट्टिएर देखिन्छन्" : "Makes links easier to spot"}
              checked={a11y.underlineLinks}
              onChange={a11y.setUnderlineLinks}
            />

            {/* ── MOTION ──────────────────────────────────────────── */}
            <div className="border-t border-gray-100 my-1.5" aria-hidden="true" />
            <SectionLabel icon={Zap}>{np ? "चाल" : "Motion"}</SectionLabel>
            <ToggleRow
              icon={Zap}
              label={np ? "एनिमेसन बन्द" : "Reduce motion"}
              hint={np ? "चालयुक्त प्रभाव हटाउँछ" : "Stops moving effects"}
              checked={a11y.reduceMotion}
              onChange={a11y.setReduceMotion}
            />

            {/* ── Footer ──────────────────────────────────────────── */}
            <div className="border-t border-gray-100 my-1.5" aria-hidden="true" />
            <div className="px-3 pb-2 pt-1 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={a11y.resetAll}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0A2540] transition-colors"
              >
                <RotateCcw size={13} aria-hidden="true" />
                {np ? "पूर्वनिर्धारितमा फर्काउनुहोस्" : "Reset to defaults"}
              </button>
              <span className="hidden sm:flex items-center gap-1 text-[10px] text-gray-400">
                <Check size={11} aria-hidden="true" />
                {np ? "सेटिङ सुरक्षित हुन्छ" : "Saved automatically"}
              </span>
            </div>
          </div>

          {/* Keyboard hint */}
          <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
            <Keyboard size={13} className="text-[#B8941F]" aria-hidden="true" />
            <p className="text-[11px] text-gray-500">
              {np ? (
                <>कुनै पनि ठाउँबाट <kbd className="font-mono font-bold text-[#0A2540]">Alt + A</kbd> थिच्नुहोस्</>
              ) : (
                <>Press <kbd className="font-mono font-bold text-[#0A2540]">Alt + A</kbd> anywhere to open this panel</>
              )}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Small launcher icon label helper (not rendered). */
export const A11Y_ICON = Accessibility;
