import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

/**
 * SCROLL-TO-TOP BUTTON — dock variant (no fixed positioning of its own).
 * Rendered inside FloatingDock's right-hand column, above the accessibility
 * launcher, so the two floating buttons can never overlap each other.
 */
export function ScrollToTopButton({ onTop }: { onTop: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const smooth = !document.documentElement.classList.contains("a11y-reduce-motion");
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    onTop();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="pointer-events-auto w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-[#0A2540] rounded-full shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center group"
          whileTap={{ scale: 0.9 }}
          aria-label={document.documentElement.classList.contains("lang-np") ? "माथि जानुहोस्" : "Scroll to top"}
        >
          <ArrowUp size={22} className="group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Kept for any external use/tests. */
export function hasScrolledPast(px: number) {
  return typeof window !== "undefined" && window.scrollY > px;
}
