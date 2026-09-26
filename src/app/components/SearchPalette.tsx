import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, CornerDownLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEARCH_INDEX, scoreItem, type SearchItem } from "./SiteSearch";

/**
 * SearchPalette — a ⌘K / Ctrl+K command-palette that puts site search on
 * every page, not just the 404. Shares the bilingual index and scoring with
 * the inline SiteSearch component. Opens from the navbar search button or
 * the keyboard shortcut; closes on Escape, backdrop click or selection.
 */

export function SearchPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { language, t } = useLanguage();
  const np = language === "np";
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    return SEARCH_INDEX.map((item) => ({ item, score: scoreItem(item, q) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7)
      .map((r) => r.item);
  }, [query]);

  /* Focus + reset whenever the palette opens */
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => setActive(0), [results.length]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active].path);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-[#0A2540]/60 backdrop-blur-sm flex items-start justify-center px-4 pt-[14vh] sm:pt-[18vh]"
        role="dialog"
        aria-modal="true"
        aria-label={t("not_found_search_label")}
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: -14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Input row */}
          <div className="flex items-center gap-3 px-4 border-b border-gray-100">
            <Search size={18} className="text-[#B8941F] shrink-0" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t("not_found_search_ph")}
              className="flex-1 py-4 text-base text-[#0A2540] placeholder:text-gray-400 bg-transparent focus:outline-none"
              aria-label={t("not_found_search_label")}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[46vh] overflow-y-auto">
            {query.trim().length >= 2 && results.length === 0 && (
              <p className="px-5 py-6 text-sm text-gray-500">{t("not_found_search_none")}</p>
            )}
            {query.trim().length < 2 && (
              <div className="px-5 py-6 text-sm text-gray-400">{t("not_found_search_hint")}</div>
            )}
            <ul className="py-1.5">
              {results.map((r, i) => {
                const Icon = r.icon;
                return (
                  <li key={`${r.path}-${r.title.en}-${i}`}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(r.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        i === active ? "bg-[#D4AF37]/10" : "bg-white"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${
                          i === active ? "bg-[#D4AF37]/20 text-[#B8941F]" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-[#0A2540] truncate">
                          {np ? r.title.np : r.title.en}
                        </span>
                        <span className="block text-xs text-gray-500 truncate">
                          {np ? r.desc.np : r.desc.en}
                        </span>
                      </span>
                      {i === active && (
                        <span className="hidden sm:flex items-center gap-1 text-[10px] text-gray-400 shrink-0">
                          <CornerDownLeft size={11} />
                          Enter
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Footer hint */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-white font-mono">↑↓</kbd>
              navigate
              <kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-white font-mono ml-1">↵</kbd>
              open
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-white font-mono">Esc</kbd>
              close
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/** Hook: global ⌘K / Ctrl+K shortcut + optional "/" quick key. */
export function useSearchPaletteShortcut(openSetter: (open: boolean) => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSetter(true);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        openSetter(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSetter]);
}

export type { SearchItem };
