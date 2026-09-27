import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * ACCESSIBILITY SETTINGS — site-wide, persisted, one place.
 *
 * Powers the floating Accessibility panel (bottom-right dock):
 *   · Text size: 100% / 112.5% / 125% / 140%   (rem-based UI scales cleanly)
 *   · Readable font: swaps UI type to Atkinson Hyperlegible (designed for
 *     low vision; Devanagari text keeps its Noto/Mukta fallback)
 *   · Dyslexia-friendly spacing: WCAG 1.4.12 letter/word/line spacing
 *   · High contrast: layout-preserving dark high-contrast theme
 *   · Reduce motion: CSS kill-switch + MotionConfig reducedMotion="always"
 *     (also auto-on when the OS requests prefers-reduced-motion)
 *   · Underline links: for low-vision scanning
 *   · Reading guide: a translucent band that follows the cursor
 *   · Read aloud: see SpeechContext — a full player with highlight,
 *     speed and voice controls
 *
 * Settings persist in localStorage under `a11y-settings` and are applied
 * as classes on <html> so they survive route changes and reloads.
 */

export type FontScale = 1 | 1.125 | 1.25 | 1.4;

export interface A11ySettings {
  fontScale: FontScale;
  highContrast: boolean;
  reduceMotion: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
  dyslexiaSpacing: boolean;
  readingGuide: boolean;
}

const STORAGE_KEY = "a11y-settings";

const DEFAULTS: A11ySettings = {
  fontScale: 1,
  highContrast: false,
  reduceMotion: false,
  underlineLinks: false,
  readableFont: false,
  dyslexiaSpacing: false,
  readingGuide: false,
};

function readStored(): A11ySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<A11ySettings>) };
  } catch {
    /* corrupted or unavailable — fall through to defaults */
  }
  // Honour OS-level preferences on first visit (WCAG 2.3.3 / 1.4.12 spirit)
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const prefersContrast = window.matchMedia?.("(prefers-contrast: more)").matches ?? false;
  if (localStorage.getItem(STORAGE_KEY) === null && (prefersReduced || prefersContrast)) {
    return { ...DEFAULTS, reduceMotion: prefersReduced, highContrast: prefersContrast };
  }
  return { ...DEFAULTS, reduceMotion: prefersReduced && !localStorage.getItem(STORAGE_KEY) };
}

function applyClasses(s: A11ySettings) {
  const el = document.documentElement;
  el.classList.toggle("a11y-font-lg", s.fontScale === 1.125);
  el.classList.toggle("a11y-font-xl", s.fontScale === 1.25);
  el.classList.toggle("a11y-font-xxl", s.fontScale === 1.4);
  el.classList.toggle("a11y-contrast", s.highContrast);
  el.classList.toggle("a11y-reduce-motion", s.reduceMotion);
  el.classList.toggle("a11y-underline", s.underlineLinks);
  el.classList.toggle("a11y-readable-font", s.readableFont);
  el.classList.toggle("a11y-dyslexia", s.dyslexiaSpacing);
  el.classList.toggle("a11y-reading-guide", s.readingGuide);
}

interface A11yContextValue extends A11ySettings {
  setFontScale: (v: FontScale) => void;
  setHighContrast: (v: boolean) => void;
  setReduceMotion: (v: boolean) => void;
  setUnderlineLinks: (v: boolean) => void;
  setReadableFont: (v: boolean) => void;
  setDyslexiaSpacing: (v: boolean) => void;
  setReadingGuide: (v: boolean) => void;
  resetAll: () => void;
}

const A11yContext = createContext<A11yContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const hydrated = useRef(false);

  // Hydrate once (SSR-safe pattern for this client-only SPA)
  useEffect(() => {
    const stored = readStored();
    hydrated.current = true;
    setSettings(stored);
    applyClasses(stored);
  }, []);

  // Persist + apply on every change
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* private mode — settings stay for the session */
    }
    applyClasses(settings);
  }, [settings]);

  const patch = useCallback((p: Partial<A11ySettings>) => {
    setSettings((prev) => ({ ...prev, ...p }));
  }, []);

  const setFontScale = useCallback((v: FontScale) => patch({ fontScale: v }), [patch]);
  const setHighContrast = useCallback((v: boolean) => patch({ highContrast: v }), [patch]);
  const setReduceMotion = useCallback((v: boolean) => patch({ reduceMotion: v }), [patch]);
  const setUnderlineLinks = useCallback((v: boolean) => patch({ underlineLinks: v }), [patch]);
  const setReadableFont = useCallback((v: boolean) => patch({ readableFont: v }), [patch]);
  const setDyslexiaSpacing = useCallback((v: boolean) => patch({ dyslexiaSpacing: v }), [patch]);
  const setReadingGuide = useCallback((v: boolean) => patch({ readingGuide: v }), [patch]);
  const resetAll = useCallback(() => setSettings({ ...DEFAULTS }), []);

  const value = useMemo<A11yContextValue>(
    () => ({
      ...settings,
      setFontScale,
      setHighContrast,
      setReduceMotion,
      setUnderlineLinks,
      setReadableFont,
      setDyslexiaSpacing,
      setReadingGuide,
      resetAll,
    }),
    [settings, setFontScale, setHighContrast, setReduceMotion, setUnderlineLinks,
      setReadableFont, setDyslexiaSpacing, setReadingGuide, resetAll],
  );

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}

export function useA11y(): A11yContextValue {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used inside AccessibilityProvider");
  return ctx;
}
