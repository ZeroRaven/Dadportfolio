import { useState } from "react";
import { Share2, Copy, Printer, Check, BookmarkPlus, History, Trash2, ChevronDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useResultHistory, relativeStamp } from "../../hooks/useResultHistory";
import { whatsappLink } from "../../config/site";

/**
 * RESULT ACTIONS — the shared footer for every calculator's result card:
 *   · Save → bounded per-tool "Recent results" list (localStorage, survives
 *     refresh — nothing leaves the browser, matching the site's promise)
 *   · Copy / Share (Web Share API on mobile; WhatsApp fallback on desktop)
 *   · Print (paired with the print stylesheet that hides page chrome)
 *
 * One drop-in per tool — the calculations themselves never change.
 * `light` renders for white panels (e.g. the AgroMap district factsheet).
 */
export function ResultCardActions({
  toolId,
  label,
  summary,
  detail,
  np,
  light = false,
}: {
  toolId: string;
  /** Short input recap, e.g. "Cattle · 178 cm girth · 145 cm length" */
  label: string;
  /** The headline number, e.g. "≈ 412 kg live weight" */
  summary: string;
  /** Optional extra lines included in copy/share text */
  detail?: string;
  np: boolean;
  light?: boolean;
}) {
  const { language } = useLanguage();
  const _ = language; // re-render on language switch
  const { entries, save, clear } = useResultHistory(toolId);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const fullText = [
    np ? "डा. मोगल प्रसाद शाह — कृषि औजार" : "Dr. Mogal Prasad Shah — Farm Tools",
    label,
    summary,
    ...(detail ? [detail] : []),
    "drmogalshah.com.np/tools",
  ].join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — share/print still available */
    }
  };

  // navigator.share is missing on desktop Chrome/Firefox — always render the
  // copy + WhatsApp fallbacks, never ONLY a Web Share button.
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: fullText });
        return; // shared (or user cancelled — not an error)
      } catch {
        return; // user cancelled — not an error
      }
    }
    const wa = whatsappLink(fullText);
    if (wa) window.open(wa, "_blank", "noopener");
  };

  const onSave = () => {
    save({ label, summary, raw: { detail: detail ?? "" } });
    setSaved(true);
    setHistoryOpen(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const btn = light
    ? "inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 border border-gray-200 bg-white hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 text-[#0A2540] transition-colors"
    : "inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-colors";

  return (
    <div className="mt-5 print:hidden">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={onSave} className={btn} title={np ? "नतिजा सुरक्षित गर्नुहोस्" : "Save this result"}>
          {saved ? <Check size={13} className="text-emerald-300" /> : <BookmarkPlus size={13} className="text-[#D4AF37]" />}
          {saved ? (np ? "सुरक्षित भयो" : "Saved") : np ? "सुरक्षित" : "Save"}
        </button>
        <button type="button" onClick={copy} className={btn}>
          {copied ? <Check size={13} className="text-emerald-300" /> : <Copy size={13} className="text-[#D4AF37]" />}
          {copied ? (np ? "प्रतिलिपि भयो" : "Copied") : np ? "प्रतिलिपि" : "Copy"}
        </button>
        <button type="button" onClick={share} className={btn}>
          <Share2 size={13} className="text-[#D4AF37]" />
          {np ? "साझा" : "Share"}
        </button>
        <button type="button" onClick={() => window.print()} className={btn}>
          <Printer size={13} className="text-[#D4AF37]" />
          {np ? "प्रिन्ट" : "Print"}
        </button>
      </div>

      {/* Recent results — collapsible, per-tool */}
      {entries.length > 0 && (
        <div
          className={
            light
              ? "mt-4 rounded-xl border border-gray-100 bg-gray-50/70 overflow-hidden"
              : "mt-4 rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
          }
        >
          <button
            type="button"
            onClick={() => setHistoryOpen((v) => !v)}
            aria-expanded={historyOpen}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold transition-colors ${
              light ? "text-gray-600 hover:text-[#0A2540]" : "text-gray-300 hover:text-white"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <History size={13} className={light ? "text-[#B8941F]" : "text-[#D4AF37]"} />
              {np ? `हालका (${entries.length})` : `Recent (${entries.length})`}
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform ${historyOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
          {historyOpen && (
            <div className="px-4 pb-3">
              <ul className={light ? "divide-y divide-gray-100" : "divide-y divide-white/5"}>
                {entries.slice(0, 8).map((e) => (
                  <li key={e.id} className="py-2 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-medium truncate ${
                          light ? "text-gray-700" : "text-gray-200"
                        }`}
                      >
                        {e.label}
                      </p>
                      <p
                        className={`text-xs font-semibold truncate ${
                          light ? "text-[#B8941F]" : "text-[#D4AF37]"
                        }`}
                      >
                        {e.summary}
                      </p>
                      <p
                        className={`text-[10px] mt-0.5 ${
                          light ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {relativeStamp(e.timestamp, np)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={clear}
                className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={11} />
                {np ? "इतिहास मेटाउनुहोस्" : "Clear history"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
