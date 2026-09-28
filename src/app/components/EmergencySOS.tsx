import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Wind, FlaskConical, Baby, Sun, Droplets, Milk,
  Phone, MessageCircle, X, Siren, CheckCircle2, AlertTriangle,
} from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../context/LanguageContext";
import { EMERGENCIES, SOS_DISCLAIMER, SOS_WHATSAPP_MESSAGE, type EmergencyEntry } from "../data/emergencies";
import { siteConfig, whatsappLink, telLink } from "../config/site";

const ICONS = {
  wind: Wind,
  flask: FlaskConical,
  baby: Baby,
  sun: Sun,
  drop: Droplets,
  milk: Milk,
} as const;

/**
 * EMERGENCY SOS — floating red button (bottom slot of the floating dock)
 * plus a full-screen modal with first-aid guidance for six farm
 * emergencies, and one-tap Call / WhatsApp actions.
 *
 * Accessibility: role="dialog" + aria-modal, Escape closes, focus moves
 * into the modal on open and returns to the launcher on close, scroll
 * lock while open.
 */
export function EmergencySOS() {
  const { language } = useLanguage();
  const np = language === "np";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<EmergencyEntry | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const smooth = !document.documentElement.classList.contains("a11y-reduce-motion");

  /* Escape + scroll lock while open */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  /* Focus management: into the dialog on open, back to launcher on close */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => dialogRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    if (active === null) launcherRef.current?.focus();
  }, [open, active]);

  const close = () => {
    setOpen(false);
    setActive(null);
  };

  const tel = telLink();
  const wa = whatsappLink(np ? SOS_WHATSAPP_MESSAGE.np : SOS_WHATSAPP_MESSAGE.en);

  return (
    <>
      <motion.button
        ref={launcherRef}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(true)}
        aria-label={np ? "आकस्मिक पशु सहयोग" : "Emergency animal help"}
        title={np ? "आकस्मिक पशु सहयोग" : "Emergency animal help"}
        className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#C0392B] to-[#8B1E12] text-white shadow-xl ring-2 ring-white/70 flex items-center justify-center relative"
      >
        {/* Attention pulse — disabled under the a11y reduce-motion switch */}
        {!document.documentElement.classList.contains("a11y-reduce-motion") && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full ring-2 ring-[#C0392B]/60"
            animate={{ scale: [1, 1.28], opacity: [0.7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <Siren className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6"
              style={{ backgroundColor: "rgba(10,20,35,0.62)", backdropFilter: "blur(4px)" }}
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              <motion.div
                ref={dialogRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={np ? "आकस्मिक प्राथमिक उपचार" : "Emergency first aid"}
                initial={{ y: smooth ? 60 : 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: smooth ? 60 : 0, opacity: 0 }}
                transition={{ type: "spring", damping: 26, stiffness: 300 }}
                className="w-full sm:max-w-2xl max-h-[92svh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col outline-none overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-br from-[#C0392B] to-[#8B1E12] text-white px-6 py-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/15 border border-white/30 flex items-center justify-center flex-shrink-0">
                    <Siren size={22} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold leading-tight">
                      {np ? "आकस्मिक प्राथमिक उपचार" : "Emergency First Aid"}
                    </h2>
                    <p className="text-white/85 text-xs sm:text-sm mt-0.5">
                      {np ? "पशु स्थिर राख्ने कदमहरू — तुरुन्तै चिकित्सक बोलाउनुहोस्" : "Steps to stabilize the animal — call the vet right away"}
                    </p>
                  </div>
                  <button
                    onClick={close}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label={np ? "बन्द गर्नुहोस्" : "Close"}
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>

                {/* Body — chooser or active emergency */}
                <div className="overflow-y-auto px-5 sm:px-6 py-5 flex-1">
                  <AnimatePresence mode="wait">
                    {!active ? (
                      <motion.div
                        key="chooser"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                          {np ? "के भयो?" : "What happened?"}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {EMERGENCIES.map((em) => {
                            const Icon = ICONS[em.icon];
                            return (
                              <button
                                key={em.id}
                                type="button"
                                onClick={() => setActive(em)}
                                className="text-left rounded-2xl border-2 border-gray-100 hover:border-[#C0392B]/50 bg-gray-50/60 hover:bg-[#C0392B]/[0.04] p-4 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-9 h-9 rounded-xl bg-[#C0392B]/10 text-[#C0392B] flex items-center justify-center flex-shrink-0">
                                    <Icon size={18} aria-hidden="true" />
                                  </span>
                                  <span className="font-semibold text-[#0A2540] text-sm group-hover:text-[#C0392B]">
                                    {np ? em.title.np : em.title.en}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                  {np ? em.tagline.np : em.tagline.en}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={active.id}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                      >
                        <button
                          type="button"
                          onClick={() => setActive(null)}
                          className="text-xs font-semibold text-[#C0392B] hover:text-[#8B1E12] mb-4 inline-flex items-center gap-1"
                        >
                          <X size={13} aria-hidden="true" />
                          {np ? "अरू आकस्मिक अवस्था हेर्नुहोस्" : "See other emergencies"}
                        </button>

                        <h3 className="text-base sm:text-lg font-bold text-[#0A2540] mb-1.5">
                          {np ? active.title.np : active.title.en}
                        </h3>
                        <p className="text-xs text-gray-500 mb-5">
                          {np ? active.tagline.np : active.tagline.en}
                        </p>

                        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 mb-5">
                          <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2.5">
                            <AlertTriangle size={13} aria-hidden="true" />
                            {np ? active.signsLabel.np : active.signsLabel.en}
                          </p>
                          <ul className="space-y-1.5">
                            {(np ? active.signs.np : active.signs.en).map((s) => (
                              <li key={s} className="text-sm text-amber-900/90 flex gap-2 leading-relaxed">
                                <span className="text-amber-500 mt-0.5" aria-hidden="true">•</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className="flex items-center gap-1.5 text-xs font-semibold text-[#0A2540] uppercase tracking-widest mb-2.5">
                          <CheckCircle2 size={13} className="text-emerald-600" aria-hidden="true" />
                          {np ? active.stepsLabel.np : active.stepsLabel.en}
                        </p>
                        <ol className="space-y-3 mb-2">
                          {(np ? active.steps.np : active.steps.en).map((s, i) => (
                            <li key={s} className="flex gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#C0392B]/10 text-[#C0392B] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                                {np ? ["१", "२", "३", "४", "५"][i] ?? i + 1 : i + 1}
                              </span>
                              <span className="text-sm text-gray-700 leading-relaxed">{s}</span>
                            </li>
                          ))}
                        </ol>

                        <p className="text-[11px] text-gray-400 leading-relaxed mt-4 pt-4 border-t border-gray-100">
                          {SOS_DISCLAIMER[np ? "np" : "en"]}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer — one-tap contact */}
                <div className="border-t border-gray-100 px-5 sm:px-6 py-4 bg-gray-50/80 flex flex-col sm:flex-row gap-2.5 sm:items-center">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 leading-snug">
                      {np ? "कदम गर्दै गर्नुहोस् — र तुरुन्तै सम्पर्क गर्नुहोस्" : "Follow the steps — and make contact now"}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                      {np ? `डा. एम.पी. शाह · ${siteConfig.phone}` : `Dr. M.P. Shah · ${siteConfig.phone}`}
                    </p>
                  </div>
                  <div className="flex gap-2.5">
                    {tel && (
                      <Button
                        asChild
                        className="bg-gradient-to-r from-[#C0392B] to-[#8B1E12] hover:from-[#A93226] text-white font-semibold"
                      >
                        <a href={tel}>
                          <Phone size={15} className="mr-1.5" aria-hidden="true" />
                          {np ? "फोन गर्नुहोस्" : "Call"}
                        </a>
                      </Button>
                    )}
                    {wa && (
                      <Button
                        asChild
                        variant="outline"
                        className="border-2 border-[#25D366] text-[#128C4B] hover:bg-[#25D366]/10 font-semibold"
                      >
                        <a href={wa} target="_blank" rel="noreferrer">
                          <MessageCircle size={15} className="mr-1.5" aria-hidden="true" />
                          {np ? "ह्वाट्सएप" : "WhatsApp"}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
