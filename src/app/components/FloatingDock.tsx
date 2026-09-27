import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Accessibility } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ScrollToTopButton } from "./ScrollToTopButton";
import { AccessibilityPanel } from "./AccessibilityPanel";

/**
 * FLOATING DOCK — one right-hand column for ALL floating controls so they
 * can never overlap each other:
 *
 *      ┌──────────────────────┐
 *      │   ↑ scroll-to-top    │  (appears after 300 px of scrolling)
 *      │   ♿ accessibility    │  (launcher — Alt+A also opens it)
 *      └──────────────────────┘
 *        panel opens ABOVE this column
 *
 * WhatsApp keeps bottom-left; the speech player is bottom-centre and lifts
 * above the dock on phones. The dock container itself ignores pointer
 * events — only the buttons are interactive, so page clicks pass through.
 */
export function FloatingDock() {
  const { language } = useLanguage();
  const np = language === "np";
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  /* Click-outside closes the panel (the launcher + panel are one subtree) */
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dockRef.current && !dockRef.current.contains(target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  /* Alt+A opens/closes the panel from anywhere (skips while typing) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey || (e.key !== "a" && e.key !== "A")) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      e.preventDefault();
      setOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={dockRef}
      className="fixed right-4 sm:right-6 bottom-4 sm:bottom-5 z-40 flex flex-col items-center gap-3 pointer-events-none"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <ScrollToTopButton onTop={() => setOpen(false)} />

      {/* Launcher + panel are one anchored subtree so the panel never
          moves when the scroll-to-top button appears/disappears */}
      <div className="relative pointer-events-auto">
        <motion.button
          ref={launcherRef}
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={np ? "पहुँचयोग्यता सेटिङ (Alt+A)" : "Accessibility settings (Alt+A)"}
          title={np ? "पहुँचयोग्यता सेटिङ (Alt+A)" : "Accessibility settings (Alt+A)"}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white shadow-xl ring-2 ring-[#D4AF37]/60 flex items-center justify-center hover:ring-[#D4AF37] transition-all"
        >
          <Accessibility size={24} aria-hidden="true" />
        </motion.button>

        <AccessibilityPanel open={open} onClose={() => setOpen(false)} launcherRef={launcherRef} />
      </div>
    </div>
  );
}
