// Types for the virtual module come from vite-plugin-pwa/react.d.ts.
import { useRegisterSW } from "virtual:pwa-register/react";
import { RefreshCw, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "./ui/button";

/**
 * PWA UPDATE PROMPT — appears when a new service worker is waiting.
 *
 * registerType "prompt" means we never silently swap the app underneath the
 * visitor mid-session; this small banner asks first. Accepting reloads onto
 * the new build (complements RouteErrorBoundary's stale-chunk recovery —
 * with this prompt, stale chunks become rare in the first place).
 */
export function PWAUpdatePrompt() {
  const { language } = useLanguage();
  const np = language === "np";
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW() {
      /* registered — nothing else to do */
    },
    onRegisterError() {
      /* SW registration failed (e.g. non-HTTPS) — stay invisible */
    },
  });

  if (!needRefresh) return null;

  const close = () => updateServiceWorker(false);

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] sm:w-auto print:hidden"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-2xl bg-[#0A2540] text-white shadow-2xl ring-1 ring-[#D4AF37]/40 px-4 py-3">
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#D4AF37]/20 ring-1 ring-[#D4AF37]/50 shrink-0">
          <RefreshCw size={16} className="text-[#D4AF37]" aria-hidden="true" />
        </span>
        <p className="text-sm font-medium text-gray-100">
          {np
            ? "नयाँ संस्करण उपलब्ध छ — अद्यावधिक गर्नुहोस्?"
            : "A new version is available — update now?"}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={() => updateServiceWorker(true)}
            className="h-8 px-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] hover:brightness-110 text-xs font-bold"
          >
            {np ? "अद्यावधिक" : "Update"}
          </Button>
          <button
            type="button"
            onClick={close}
            aria-label={np ? "बन्द गर्नुहोस्" : "Dismiss"}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
