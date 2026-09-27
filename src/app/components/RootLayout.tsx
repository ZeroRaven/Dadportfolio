import { useEffect } from "react";
import { useLocation } from "react-router";
import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { FloatingDock } from "./FloatingDock";
import { WhatsAppButton } from "./WhatsAppButton";
import { SpeechPlayer } from "./SpeechPlayer";
import { ReadingGuide } from "./ReadingGuide";
import { useLanguage } from "../context/LanguageContext";
import { useSpeech } from "../context/SpeechContext";

export function RootLayout() {
  const { language } = useLanguage();
  const location = useLocation();
  const speech = useSpeech();

  // Navigating away stops any read-aloud session (its highlight belongs to
  // the previous page's DOM).
  useEffect(() => {
    speech.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip link — first focusable element on every page (WCAG 2.4.1) */}
      <a href="#main-content" className="skip-link">
        {language === "np" ? "मुख्य सामग्रीमा जानुहोस्" : "Skip to main content"}
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      {/* Right-hand dock: scroll-to-top + accessibility (panel opens above) */}
      <FloatingDock />
      {/* Read-aloud mini-player (appears while a session is active) */}
      <SpeechPlayer />
      {/* Cursor-following reading band (panel toggle, fine pointers only) */}
      <ReadingGuide />
    </div>
  );
}
