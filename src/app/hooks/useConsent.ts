import { useEffect, useState } from "react";

/**
 * COOKIE CONSENT — persisted, cross-tab-synced consent state.
 *
 * Values: "granted" | "denied" | null (no choice made yet).
 * Analytics scripts are gated on `consent === "granted"` in App.tsx, so
 * nothing fires before a choice — and declining persists across visits.
 *
 * The "storage" listener keeps multiple open tabs in agreement: accepting
 * in one tab un-gates analytics everywhere, without a reload.
 */
const CONSENT_KEY = "cookie-consent";
type Consent = "granted" | "denied" | null;

export function useConsent(): [Consent, (v: "granted" | "denied") => void] {
  const [consent, setConsentState] = useState<Consent>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      // Legacy values written by the dormant banner ("accepted"/"declined")
      // are mapped onto the same scale rather than reset to null.
      if (stored === "granted" || stored === "accepted") return "granted";
      if (stored === "denied" || stored === "declined") return "denied";
      return null;
    } catch {
      return null;
    }
  });

  const setConsent = (v: "granted" | "denied") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, v);
    } catch {
      /* private browsing — the in-memory state still gates this session */
    }
    setConsentState(v);
  };

  useEffect(() => {
    // React to consent changes from another tab.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== CONSENT_KEY) return;
      if (e.newValue === "granted" || e.newValue === "accepted") setConsentState("granted");
      else if (e.newValue === "denied" || e.newValue === "declined") setConsentState("denied");
      else setConsentState(null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return [consent, setConsent];
}
