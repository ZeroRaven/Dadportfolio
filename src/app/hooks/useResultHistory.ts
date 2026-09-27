import { useEffect, useState } from "react";

/**
 * RESULT HISTORY — per-device, per-tool recent-results list (localStorage).
 *
 * Every calculator's result is currently ephemeral: a useState + useMemo
 * that vanishes on refresh. This hook gives each tool a bounded "recent
 * results" list that survives reloads — matching the site's own promise
 * that no data ever leaves the browser.
 *
 * Storage failures (private browsing, quota) fail silently: the tool keeps
 * working, only the history feature degrades.
 */

export interface ResultHistoryEntry {
  id: string;           // crypto.randomUUID()
  toolId: string;       // "weight" | "gestation" | … — matches TABS values
  timestamp: number;
  label: string;        // e.g. "Cattle · 178 cm girth"
  summary: string;      // e.g. "≈ 412 kg live weight"
  raw: Record<string, unknown>; // whatever inputs/outputs the tool keeps
}

const KEY = "farm-tools-history";
const MAX_ENTRIES = 50; // a recent-results list, not a ledger

function readAll(): ResultHistoryEntry[] {
  try {
    const all: ResultHistoryEntry[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(all) ? all.filter((e) => e && e.toolId && e.label) : [];
  } catch {
    return [];
  }
}

function writeAll(entries: ResultHistoryEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
  } catch {
    /* ignore — see header */
  }
}

export function useResultHistory(toolId: string) {
  const [entries, setEntries] = useState<ResultHistoryEntry[]>(() =>
    readAll().filter((e) => e.toolId === toolId)
  );

  // Cross-tab sync: saving in one tab refreshes the list in another.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY) return;
      setEntries(readAll().filter((en) => en.toolId === toolId));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [toolId]);

  const save = (entry: Omit<ResultHistoryEntry, "id" | "timestamp" | "toolId">) => {
    const full: ResultHistoryEntry = {
      ...entry,
      id: typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      toolId,
    };
    writeAll([full, ...readAll()]);
    setEntries([full, ...readAll().filter((e) => e.toolId === toolId)]);
  };

  const clear = () => {
    writeAll(readAll().filter((e) => e.toolId !== toolId));
    setEntries([]);
  };

  return { entries, save, clear };
}

/** "3 min ago"-style relative stamp, bilingual. */
export function relativeStamp(ts: number, np: boolean): string {
  const mins = Math.max(1, Math.round((Date.now() - ts) / 60000));
  if (mins < 60) {
    return np ? `${mins} मिनेट अघि` : `${mins} min ago`;
  }
  const hours = Math.round(mins / 60);
  if (hours < 24) {
    return np ? `${hours} घण्टा अघि` : `${hours} h ago`;
  }
  const days = Math.round(hours / 24);
  return np ? `${days} दिन अघि` : `${days} d ago`;
}
