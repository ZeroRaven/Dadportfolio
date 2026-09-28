import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { useLanguage } from "../context/LanguageContext";

/**
 * COOKIE NOTICE — bilingual, informational.
 *
 * Wired via App.tsx: shown once per browser ("accepted" is remembered in
 * localStorage via hooks/useConsent.ts). Accepting simply dismisses the
 * notice for good; the close (X) button hides it for this visit only and
 * it returns next visit.
 */
export function CookieConsent({ onConsent }: { onConsent: (v: "granted" | "denied") => void }) {
  const { language } = useLanguage();
  const np = language === "np";
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // No choice recorded yet → show the banner after a short delay.
    try {
      if (!localStorage.getItem("cookie-consent")) {
        const t = setTimeout(() => setShowBanner(true), 2000);
        return () => clearTimeout(t);
      }
    } catch {
      /* private browsing — show the banner anyway */
      const t = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const acceptCookies = () => {
    onConsent("granted");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[65] p-4 md:p-6 print:hidden"
          role="dialog"
          aria-label={np ? "कुकी सूचना" : "Cookie notice"}
        >
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                  <Cookie className="text-[#D4AF37]" size={24} aria-hidden="true" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0A2540] mb-2">
                    {np ? "कुकीहरू प्रयोग हुन्छन्" : "We use cookies"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {np
                      ? "यो वेबसाइटले तपाईंलाई राम्रो अनुभव दिन र साइट सहज रूपमा चलाउन कुकीहरू प्रयोग गर्छ। कुकीहरू तपाईंको ब्राउजरमा थोरै जानकारी भण्डारण गर्छन्, जसले पेज छिटो खुल्न र तपाईंका सेटिङ (जस्तै भाषा र पाठ आकार) सुरक्षित राख्न मद्दत गर्छ।"
                      : "This website uses cookies to keep things working smoothly and improve your experience. Cookies store small bits of information in your browser that help pages load faster and remember your preferences — such as your language and text-size settings."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={acceptCookies}
                      className="bg-[#0A2540] hover:bg-[#1A3A5C] text-white px-6 py-2"
                    >
                      {np ? "ठिक छ" : "Got it"}
                    </Button>
                  </div>
                </div>

                <button
                  onClick={() => setShowBanner(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={np ? "बन्द गर्नुहोस्" : "Close"}
                  title={np ? "अहिलेका लागि बन्द" : "Close for now"}
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
