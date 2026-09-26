import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getClinicStatus } from "../utils/clinicStatus";
import { toNepaliDigits } from "../i18n/format";

/**
 * Live "Open now / Closed now" chip, driven by Nepal Standard Time and the
 * office hours configured in site.ts. Re-checks every 30 seconds so a page
 * left open stays truthful across the 9:00 / 17:00 NPT boundaries.
 */
export function OpenStatusChip({ dark = false }: { dark?: boolean }) {
  const { language } = useLanguage();
  const np = language === "np";
  const [status, setStatus] = useState(getClinicStatus);

  useEffect(() => {
    const id = setInterval(() => setStatus(getClinicStatus()), 30_000);
    return () => clearInterval(id);
  }, []);

  const timeLabel = np ? toNepaliDigits(status.timeLabel) : status.timeLabel;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm ${
        status.open
          ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300"
          : dark
          ? "bg-amber-500/10 border-amber-400/30 text-amber-300"
          : "bg-amber-500/10 border-amber-500/30 text-amber-700"
      }`}
      title={np ? "नेपाल मानक समय अनुसार" : "According to Nepal Standard Time"}
    >
      {/* Pulsing status dot */}
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full ${
            status.open ? "bg-emerald-400" : "bg-amber-400"
          } opacity-75 animate-ping`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            status.open ? "bg-emerald-400" : "bg-amber-400"
          }`}
        />
      </span>
      {status.open
        ? np
          ? `अहिले खुला छ · ${timeLabel} NPT`
          : `Open now · ${timeLabel} NPT`
        : np
        ? `अहिले बन्द छ · ${timeLabel} NPT`
        : `Closed now · ${timeLabel} NPT`}
    </span>
  );
}
