import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { useLanguage } from "../context/LanguageContext";

/**
 * COOKIE CONSENT BANNER — bilingual, gated-analytics companion.
 *
 * Wired via App.tsx: analytics (Google Analytics + Microsoft Clarity) only
 * mount once consent === "granted" (see hooks/useConsent.ts). Declining
 * persists and analytics never loads for that browser. The dismiss (X)
 * button hides the banner for this visit WITHOUT recording a choice —
 * analytics stay off and the banner returns next visit.
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

  const declineCookies = () => {
    onConsent("denied");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 print:hidden"
          role="dialog"
          aria-label={np ? "कुकी सहमति" : "Cookie consent"}
        >
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                  <Cookie className="text-[#D4AF37]" size={24} aria-hidden="true" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0A2540] mb-2">
                    {np ? "कुकी प्राथमिकता" : "Cookie Preferences"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {np
                      ? "हामी तपाईंले वेबसाइटसँग कसरी अन्तरक्रिया गर्नुहुन्छ भनी बुझ्न कुकी र विश्लेषण उपकरणहरू प्रयोग गर्छौं। यसले तपाईंको अनुभव सुधार्न मद्दत गर्छ। हामी वेबसाइट ट्राफिक र प्रयोगकर्ताको व्यवहार विश्लेषण गर्न Google Analytics र Microsoft Clarity प्रयोग गर्छौं। तपाईंको छनोट यो ब्राउजरमा सुरक्षित राखिन्छ — अस्वीकार गर्दा विश्लेषण कहिल्यै लोड हुँदैन।"
                      : "We use cookies and analytics tools to understand how you interact with our website. This helps us improve your experience. We use Google Analytics and Microsoft Clarity to analyze website traffic and user behavior. Your choice is stored in this browser — declining means analytics never loads."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={acceptCookies}
                      className="bg-[#0A2540] hover:bg-[#1A3A5C] text-white px-6 py-2"
                    >
                      {np ? "सबै स्वीकार्नुहोस्" : "Accept All"}
                    </Button>
                    <Button
                      onClick={declineCookies}
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
                    >
                      {np ? "अस्वीकार्नुहोस्" : "Decline"}
                    </Button>
                  </div>
                </div>

                <button
                  onClick={() => setShowBanner(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={np ? "बन्द गर्नुहोस् (छनोट बिना)" : "Close without choosing"}
                  title={np ? "छनोट बिना बन्द — पछिल्लो भ्रमणमा फेरि देखिन्छ" : "Close without choosing — shows again next visit"}
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
