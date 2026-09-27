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
 * SPEECH READER — a proper text-to-speech engine for the whole site.
 *
 * Replaces the old single-shot "read this page" button with a real player:
 *   · Walks <main>, splits content into sentence-sized reading blocks
 *   · Speaks them one by one with a live highlight + auto-scroll (respects
 *     the Accessibility panel's reduce-motion switch)
 *   · Play / pause / resume / stop / next / previous / jump
 *   · Reading speed control (0.75× – 1.5×) and a voice picker
 *   · Language aware: Nepali voice when available, Hindi voice as the
 *     Devanagari fallback, English voices otherwise — user choice persists
 *
 * Robustness notes (Web Speech API quirks this handles):
 *   · getVoices() is async → re-read on `voiceschanged`
 *   · Utterances must stay referenced or Chrome GCs them mid-speech
 *   · speak() right after cancel() is ignored on some engines → tiny delay
 *   · Sentence-sized chunks dodge the Chrome long-utterance cutoff
 *   · Pause is emulated with cancel()+resume-from-block because native
 *     pause()/resume() is broken on Android Chrome / some Windows builds
 */

export type SpeechStatus = "idle" | "playing" | "paused";

interface SpeechBlock {
  el: HTMLElement;
  text: string;
}

const RATE_KEY = "speech-rate";
const VOICE_KEY_PREFIX = "speech-voice-";

/* Content elements the reader is allowed to voice. */
const BLOCK_SELECTOR = [
  "main h1", "main h2", "main h3", "main h4",
  "main p", "main li", "main blockquote", "main figcaption",
  "main dt", "main dd", "main td", "main th",
].join(", ");

/* Elements whose text should never be spoken. */
const SKIP_SELECTOR = '[aria-hidden="true"], nav, button, a, select, label, .speech-player, [data-no-speech]';

/** Split text into speakable sentences (Devanagari danda + Latin stops). */
function splitSentences(text: string): string[] {
  const parts = text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[।!?\.])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  // Group tiny fragments (< 25 chars) with their neighbour so the player
  // doesn't jump the highlight every two words.
  const merged: string[] = [];
  for (const p of parts) {
    if (merged.length && (p.length < 25 || merged[merged.length - 1].length < 25)) {
      merged[merged.length - 1] = `${merged[merged.length - 1]} ${p}`;
    } else {
      merged.push(p);
    }
  }
  return merged;
}

/** Collect reading blocks from a root element, in visual order. */
function collectBlocks(root: HTMLElement): SpeechBlock[] {
  const blocks: SpeechBlock[] = [];
  const seen = new Set<HTMLElement>();
  const candidates = Array.from(root.querySelectorAll<HTMLElement>(BLOCK_SELECTOR));
  for (const el of candidates) {
    if (seen.has(el)) continue;
    // Skip elements inside navigation / controls / hidden subtrees
    if (el.closest(SKIP_SELECTOR)) continue;
    // Skip invisible (display:none, collapsed) elements
    if (!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)) continue;
    const text = (el.innerText ?? "").trim();
    if (text.length < 2) continue;
    seen.add(el);
    for (const sentence of splitSentences(text)) {
      blocks.push({ el, text: sentence.slice(0, 320) });
    }
  }
  return blocks;
}

interface SpeechContextValue {
  /** Web Speech API present in this browser. */
  supported: boolean;
  status: SpeechStatus;
  /** A reading session exists (playing or paused). */
  active: boolean;
  blockIndex: number;
  blockCount: number;
  /** Short label of what is being read (document title / h1). */
  title: string;
  rate: number;
  voices: SpeechSynthesisVoice[];
  voiceURI: string | null;
  /** "ne" or "en" — derived from <html lang>. */
  lang: "ne" | "en";
  start: (root?: HTMLElement | null) => void;
  toggle: () => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  setRate: (r: number) => void;
  setVoiceURI: (uri: string) => void;
}

const SpeechContext = createContext<SpeechContextValue | null>(null);

export function SpeechProvider({ children }: { children: ReactNode }) {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [blockIndex, setBlockIndex] = useState(0);
  const [blockCount, setBlockCount] = useState(0);
  const [title, setTitle] = useState("");
  const [rate, setRateState] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURIState] = useState<string | null>(null);
  const [lang, setLang] = useState<"ne" | "en">(
    () => (typeof document !== "undefined" && document.documentElement.lang === "ne" ? "ne" : "en"),
  );

  const blocksRef = useRef<SpeechBlock[]>([]);
  const indexRef = useRef(0);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const stopFlagRef = useRef(false);
  const rateRef = useRef(rate);
  const voiceRef = useRef<string | null>(voiceURI);
  const langRef = useRef(lang);

  rateRef.current = rate;
  voiceRef.current = voiceURI;
  langRef.current = lang;

  /* ── Voice list (async in every engine) ─────────────────────────────── */
  useEffect(() => {
    if (!supported) return;
    const load = () => {
      const list = window.speechSynthesis.getVoices();
      if (list.length) setVoices(list);
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    // Safari sometimes needs a delayed second read
    const t = setTimeout(load, 500);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      clearTimeout(t);
    };
  }, [supported]);

  /* ── Persisted rate + per-language voice choice ─────────────────────── */
  useEffect(() => {
    try {
      const r = parseFloat(localStorage.getItem(RATE_KEY) ?? "");
      if (r >= 0.5 && r <= 2) setRateState(r);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(RATE_KEY, String(rate));
    } catch {
      /* ignore */
    }
  }, [rate]);

  /* Track document language changes (EN ↔ NP switch) */
  useEffect(() => {
    const sync = () => {
      const isNe = document.documentElement.lang === "ne";
      setLang(isNe ? "ne" : "en");
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => obs.disconnect();
  }, []);

  /* Restore a saved voice for the active language */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(VOICE_KEY_PREFIX + lang);
      if (saved) setVoiceURIState(saved);
      else setVoiceURIState(null);
    } catch {
      /* ignore */
    }
  }, [lang]);

  /* ── Highlight helpers ──────────────────────────────────────────────── */
  const clearHighlight = useCallback(() => {
    document.querySelectorAll(".speech-active").forEach((el) => el.classList.remove("speech-active"));
  }, []);

  const highlight = useCallback((el: HTMLElement | undefined) => {
    if (!el) return;
    clearHighlight();
    el.classList.add("speech-active");
    // Only scroll when the block is actually out of view (avoids jumpiness)
    const rect = el.getBoundingClientRect();
    if (rect.top < 96 || rect.bottom > window.innerHeight - 140) {
      const smooth = !document.documentElement.classList.contains("a11y-reduce-motion");
      el.scrollIntoView({ block: "center", behavior: smooth ? "smooth" : "auto" });
    }
  }, [clearHighlight]);

  /* ── Core speak loop (one utterance per block, chained via onend) ───── */
  const speakFrom = useCallback(
    (i: number) => {
      if (!supported) return;
      const blocks = blocksRef.current;
      if (i >= blocks.length) {
        // Finished the whole page
        setStatus("idle");
        setBlockIndex(blocks.length);
        clearHighlight();
        return;
      }
      indexRef.current = i;
      setBlockIndex(i);
      setStatus("playing");

      const { el, text } = blocks[i];
      highlight(el);

      const utter = new SpeechSynthesisUtterance(text);
      utterRef.current = utter; // keep referenced — GC bug workaround
      utter.lang = langRef.current === "ne" ? "ne-NP" : "en-US";
      utter.rate = rateRef.current;
      utter.pitch = 1;
      utter.volume = 1;

      // Voice resolution: explicit user pick → best match for the language
      const all = window.speechSynthesis.getVoices();
      const l = langRef.current;
      const prefixOf = (p: string) => (v: SpeechSynthesisVoice) => v.lang?.toLowerCase().startsWith(p) ?? false;
      const chosen: SpeechSynthesisVoice | null =
        (voiceRef.current ? all.find((v) => v.voiceURI === voiceRef.current) : undefined) ??
        (l === "ne"
          ? (all.find(prefixOf("ne")) ?? all.find(prefixOf("hi")) ?? all.find(prefixOf("en")))
          : (all.find(prefixOf("en")) ?? all.find(prefixOf("hi")) ?? all.find(prefixOf("ne")))) ??
        null;
      if (chosen) {
        // Stale/invalid voice objects throw a TypeError in some engines —
        // fall back to language-only selection if that happens.
        try {
          utter.voice = chosen;
          utter.lang = chosen.lang;
        } catch {
          /* keep utter.lang, drop the explicit voice */
        }
      }

      utter.onend = () => {
        if (stopFlagRef.current) return;
        speakFrom(i + 1);
      };
      utter.onerror = (e) => {
        // "interrupted"/"canceled" happen on our own stop/pause → ignore
        const err = (e as SpeechSynthesisErrorEvent).error;
        if (stopFlagRef.current || err === "interrupted" || err === "canceled") return;
        // Real failure (e.g. no voice) → stop gracefully
        setStatus("idle");
        clearHighlight();
      };

      window.speechSynthesis.cancel();
      // speak() immediately after cancel() is dropped by some engines
      setTimeout(() => {
        if (!stopFlagRef.current) window.speechSynthesis.speak(utter);
      }, 40);
    },
    [supported, clearHighlight, highlight],
  );

  /* ── Public controls ────────────────────────────────────────────────── */
  const stop = useCallback(() => {
    if (!supported) return;
    stopFlagRef.current = true;
    window.speechSynthesis.cancel();
    setStatus("idle");
    clearHighlight();
    setBlockIndex(0);
    indexRef.current = 0;
    // Release the stop flag after the cancellation settles
    setTimeout(() => (stopFlagRef.current = false), 120);
  }, [supported, clearHighlight]);

  const start = useCallback(
    (root?: HTMLElement | null) => {
      if (!supported) return;
      stopFlagRef.current = true;
      window.speechSynthesis.cancel();
      setTimeout(() => {
        stopFlagRef.current = false;
        const scope = root ?? document.querySelector("main") ?? document.body;
        const blocks = collectBlocks(scope instanceof HTMLElement ? scope : document.body);
        if (!blocks.length) return;
        blocksRef.current = blocks;
        setBlockCount(blocks.length);
        const h1 = scope.querySelector("h1");
        setTitle(
          (h1?.innerText?.trim() || document.title.split("|")[0].trim() || "Page").slice(0, 60),
        );
        speakFrom(0);
      }, 60);
    },
    [supported, speakFrom],
  );

  const toggle = useCallback(() => {
    if (status === "playing") {
      // Emulated pause: cancel + remember position (native pause() is broken
      // on Android Chrome / several Windows engines)
      stopFlagRef.current = true;
      window.speechSynthesis.cancel();
      setStatus("paused");
      setTimeout(() => (stopFlagRef.current = false), 120);
    } else if (status === "paused") {
      speakFrom(indexRef.current);
    } else {
      start();
    }
  }, [status, speakFrom, start]);

  const next = useCallback(() => {
    if (!blocksRef.current.length) return;
    const target = Math.min(indexRef.current + 1, blocksRef.current.length - 1);
    stopFlagRef.current = true;
    window.speechSynthesis.cancel();
    setTimeout(() => {
      stopFlagRef.current = false;
      speakFrom(target);
    }, 60);
  }, [speakFrom]);

  const prev = useCallback(() => {
    if (!blocksRef.current.length) return;
    const target = Math.max(indexRef.current - 1, 0);
    stopFlagRef.current = true;
    window.speechSynthesis.cancel();
    setTimeout(() => {
      stopFlagRef.current = false;
      speakFrom(target);
    }, 60);
  }, [speakFrom]);

  const setRate = useCallback((r: number) => {
    setRateState(r);
    rateRef.current = r;
    // Re-speak the current block at the new speed if mid-session
    if (status === "playing") {
      stopFlagRef.current = true;
      window.speechSynthesis.cancel();
      setTimeout(() => {
        stopFlagRef.current = false;
        speakFrom(indexRef.current);
      }, 60);
    }
  }, [status, speakFrom]);

  const setVoiceURI = useCallback(
    (uri: string) => {
      setVoiceURIState(uri);
      voiceRef.current = uri;
      try {
        localStorage.setItem(VOICE_KEY_PREFIX + langRef.current, uri);
      } catch {
        /* ignore */
      }
      if (status === "playing") {
        stopFlagRef.current = true;
        window.speechSynthesis.cancel();
        setTimeout(() => {
          stopFlagRef.current = false;
          speakFrom(indexRef.current);
        }, 60);
      }
    },
    [status, speakFrom],
  );

  /* Stop when leaving the page / unmounting */
  useEffect(() => {
    if (!supported) return;
    const onUnload = () => window.speechSynthesis.cancel();
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
      stopFlagRef.current = true;
      window.speechSynthesis.cancel();
      clearHighlight();
    };
  }, [supported, clearHighlight]);

  const value = useMemo<SpeechContextValue>(
    () => ({
      supported,
      status,
      active: status !== "idle",
      blockIndex,
      blockCount,
      title,
      rate,
      voices,
      voiceURI,
      lang,
      start,
      toggle,
      stop,
      next,
      prev,
      setRate,
      setVoiceURI,
    }),
    [supported, status, blockIndex, blockCount, title, rate, voices, voiceURI, lang,
      start, toggle, stop, next, prev, setRate, setVoiceURI],
  );

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
}

export function useSpeech(): SpeechContextValue {
  const ctx = useContext(SpeechContext);
  if (!ctx) throw new Error("useSpeech must be used inside SpeechProvider");
  return ctx;
}

/** Voices relevant for the current site language, best first. */
export function relevantVoices(voices: SpeechSynthesisVoice[], lang: "ne" | "en") {
  const score = (v: SpeechSynthesisVoice) => {
    const l = v.lang?.toLowerCase() ?? "";
    if (lang === "ne") {
      if (l.startsWith("ne")) return 0;
      if (l.startsWith("hi")) return 1;
      if (l.startsWith("en-in")) return 2;
      if (l.startsWith("en")) return 3;
      return 9;
    }
    if (l.startsWith("en-us") || l.startsWith("en-gb")) return 0;
    if (l.startsWith("en")) return 1;
    if (l.startsWith("hi") || l.startsWith("ne")) return 2;
    return 9;
  };
  return voices
    .map((v) => ({ v, s: score(v) }))
    .filter((x) => x.s < 9)
    .sort((a, b) => a.s - b.s)
    .map((x) => x.v);
}
