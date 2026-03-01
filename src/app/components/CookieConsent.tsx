import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

// Optional: Cookie Consent Banner for GDPR compliance
// Enable this if you want to show a cookie consent banner

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after 2 seconds
      setTimeout(() => setShowBanner(true), 2000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
    // Note: You'd need to disable analytics here if declined
    // For now, this just hides the banner
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                  <Cookie className="text-[#D4AF37]" size={24} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0A2540] mb-2">
                    Cookie Preferences
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We use cookies and analytics tools to understand how you interact with our website. 
                    This helps us improve your experience. We use Google Analytics and Microsoft Clarity 
                    to analyze website traffic and user behavior.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={acceptCookies}
                      className="bg-[#0A2540] hover:bg-[#1A3A5C] text-white px-6 py-2"
                    >
                      Accept All
                    </Button>
                    <Button
                      onClick={declineCookies}
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
                    >
                      Decline
                    </Button>
                  </div>
                </div>

                <button
                  onClick={() => setShowBanner(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
