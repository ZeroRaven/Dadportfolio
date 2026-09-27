import { useEffect, useRef, useState } from "react";
import { useA11y } from "../context/AccessibilityContext";

/**
 * READING GUIDE — a translucent horizontal band that follows the cursor,
 * helping low-vision and dyslexic readers track the line they are on.
 *
 * · Rendered only when the accessibility panel enables it AND the device
 *   has a fine pointer (mouse/trackpad) — it is meaningless on touch.
 * · Pure transform movement (rAF-throttled) so it never blocks or janks.
 * · pointer-events: none — it can't intercept clicks.
 */
export function ReadingGuide() {
  const { readingGuide } = useA11y();
  const bandRef = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    // any-pointer: shows on touch-laptops too, where a mouse coexists
    // with touch — the guide tracks the mouse, so any fine pointer counts.
    const mq = window.matchMedia("(any-pointer: fine)");
    setFinePointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!readingGuide || !finePointer) return;

    let raf = 0;
    let lastY = -100;
    const BAND_HEIGHT = 40;

    const apply = () => {
      raf = 0;
      if (bandRef.current) {
        bandRef.current.style.transform = `translate3d(0, ${lastY - BAND_HEIGHT / 2}px, 0)`;
      }
    };

    const onMove = (e: MouseEvent) => {
      lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    // Slide in from the top on first enable
    lastY = 120;
    apply();
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [readingGuide, finePointer]);

  if (!readingGuide || !finePointer) return null;

  return (
    <div
      ref={bandRef}
      aria-hidden="true"
      data-no-speech
      className="fixed left-0 right-0 top-0 h-10 z-[35] pointer-events-none reading-guide-band"
      style={{ willChange: "transform" }}
    />
  );
}
