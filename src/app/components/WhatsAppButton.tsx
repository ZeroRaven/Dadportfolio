import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { whatsappLink, whatsappHandle } from "../config/site";

/**
 * Floating WhatsApp contact button (bottom-left; ScrollToTop sits bottom-right).
 * Renders only when a WhatsApp username/number is configured in
 * src/app/config/site.ts — otherwise it stays completely out of the DOM
 * (no broken links, ever).
 */
export function WhatsAppButton() {
  const [showLabel, setShowLabel] = useState(false);
  const [hovering, setHovering] = useState(false);
  const link = whatsappLink();
  const handle = whatsappHandle();
  const np = document.documentElement.classList.contains("lang-np");

  useEffect(() => {
    // Auto-reveal the "Chat on WhatsApp" label only where hover exists (desktop).
    // On small/touch screens the pill would crowd page content — the circle
    // button alone is the established mobile pattern.
    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    if (!isDesktop) return;
    const t1 = setTimeout(() => setShowLabel(true), 1500);
    const t2 = setTimeout(() => setShowLabel(false), 8000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!link) return null;

  const label = np ? "WhatsApp मा कुराकानी" : "Chat on WhatsApp";
  const labelVisible = showLabel || hovering;

  return (
    <AnimatePresence>
      <motion.a
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.6 }}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        className="fixed bottom-8 left-6 sm:left-8 z-40"
      >
        {/* Label pill floats ABOVE the circle — never reaches sideways into page content */}
        <AnimatePresence>
          {labelVisible && (
            <motion.span
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              className="absolute bottom-full left-0 mb-3 block bg-white text-[#0A2540] text-sm font-semibold px-4 py-2 rounded-xl shadow-xl whitespace-nowrap"
            >
              {label}
              {handle && handle.startsWith("@") && (
                <span className="ml-1.5 font-mono text-xs text-[#25D366]">{handle}</span>
              )}
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-xl"
        >
          {/* Online dot */}
          <span className="absolute top-1 right-1 w-3 h-3 bg-green-100 rounded-full border-2 border-[#25D366]" aria-hidden="true"></span>
          {/* WhatsApp brand glyph */}
          <svg viewBox="0 0 32 32" width="30" height="30" fill="#FFFFFF" aria-hidden="true">
            <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.594 4.466 1.72 6.412L3.2 28.8l6.564-1.68a12.74 12.74 0 0 0 6.24 1.612h.005c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.732-12.805-12.732zm0 23.06h-.004a10.6 10.6 0 0 1-5.406-1.482l-.388-.23-4.024 1.03 1.076-3.922-.253-.402a10.57 10.57 0 0 1-1.624-5.656c0-5.864 4.774-10.634 10.638-10.634 2.844 0 5.516 1.108 7.522 3.116a10.57 10.57 0 0 1 3.11 7.522c-.002 5.864-4.776 10.636-10.643 10.636zm5.834-7.946c-.32-.16-1.892-.934-2.186-1.04-.292-.108-.506-.162-.718.16-.214.32-.826 1.04-1.012 1.254-.186.212-.374.24-.694.08-.32-.16-1.352-.498-2.574-1.588-.952-.848-1.594-1.894-1.78-2.214-.186-.32-.02-.494.14-.652.144-.144.32-.374.48-.56.16-.188.212-.32.32-.534.106-.212.052-.4-.028-.56-.08-.16-.718-1.732-.982-2.372-.258-.62-.52-.536-.718-.546-.186-.01-.4-.01-.614-.01-.212 0-.56.08-.852.4-.292.32-1.118 1.092-1.118 2.664s1.144 3.09 1.304 3.304c.16.212 2.252 3.44 5.452 4.824.762.328 1.356.524 1.818.672.764.242 1.458.208 2.008.126.614-.092 1.892-.774 2.158-1.522.266-.748.266-1.388.186-1.522-.078-.134-.292-.212-.612-.372z" />
          </svg>
        </motion.span>
      </motion.a>
    </AnimatePresence>
  );
}

/** Exposed for tests / conditional rendering elsewhere. */
export function hasWhatsApp(): boolean {
  return Boolean(whatsappHandle());
}
