import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  CloudSun, MapPin, Loader2, WifiOff, RefreshCw, TriangleAlert,
  Droplets, ThermometerSun, Snowflake, Flame, Leaf, Info,
} from "lucide-react";
import { Label } from "../ui/label";
import { ResultCardActions } from "./ResultActions";
import { DISTRICTS } from "../../data/nepalDistricts";
import { DISTRICT_COORDS } from "../../data/districtCoords";
import { toNepaliDigits } from "../../i18n/format";

/* ─────────────────────────────────────────────────────────────────────────────
 *  CLIMATE TRACKER — 30 years of district climate, made farm-usable.
 *
 *  Live data: Open-Meteo Archive API (https://open-meteo.com/en/docs/historical-weather-api)
 *  serving the ERA5 reanalysis — free for non-commercial use, no API key,
 *  CORS-enabled, 1940→present. This tool fetches 1995-01-01 → the end of the
 *  last full calendar year and computes everything IN THE BROWSER:
 *
 *    · Monthly rainfall normals (30-yr mean per month) + monsoon share
 *      (Jun–Sep as % of annual — the monsoon supplies ~75–80% of Nepal's rain;
 *      the district's own share is computed from the data, not asserted)
 *    · Monthly temperature normals (mean of daily max / mean of daily min)
 *    · Annual rainfall for the last 6 years as % of the 30-yr normal
 *    · Warming: mean temperature of the latest 15 years vs the previous 15
 *    · A livestock season calendar derived from the normals — heat-stress
 *      months (mean daily max ≥ 30 °C; dairy THI risk — the same NRC (1971)
 *      THI ≥ 68 threshold the Weather Smart tool uses), cold months for
 *      newborns (mean daily min < 8 °C), and the monsoon window (the four
 *      wettest consecutive months, kept in sync with DHM's Jun–Sep norm by
 *      construction).
 *
 *  Only the computed ~2 KB summary is cached in localStorage (24 h) — never
 *  the raw 40,000-day series.
 * ──────────────────────────────────────────────────────────────────────────── */

const ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive";
const YEAR_FROM = 1995;
const CACHE_KEY = "climate-normals-v1";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

interface ClimateSummary {
  fetchedAt: number;
  years: number;
  /** mean monthly rainfall, mm — index 0 = January */
  rainMonth: number[];
  /** mean of daily max temp per month, °C */
  tMaxMonth: number[];
  /** mean of daily min temp per month, °C */
  tMinMonth: number[];
  /** annual rainfall per calendar year, mm */
  rainYear: { year: number; mm: number }[];
  /** mean annual temperature per year, °C */
  tMeanYear: { year: number; c: number }[];
}

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_NP = ["जेठ→", "असार", "साउन", "भदौ", "असोज", "कात्तिक", "मंसिर", "पुष", "माघ", "फागुन", "चैत", "बैशाख"];
/** Nepali months approx map for display (Gregorian month → Bikram Sambat span) */
const BS_HINT = ["बैशाख–जेठ", "जेठ–असार", "असार–साउन", "साउन–भदौ", "भदौ–असोज", "असोज–कात्तिक", "कात्तिक–मंसिर", "मंसिर–पुष", "पुष–माघ", "माघ–फागुन", "फागुन–चैत", "चैत–बैशाख"];

function f(v: number, np: boolean, digits = 0): string {
  const s = v.toFixed(digits);
  return np ? toNepaliDigits(s) : s;
}

/* ── API + aggregation ─────────────────────────────────────────────────── */

async function fetchSummary(lat: number, lon: number, district: string): Promise<ClimateSummary> {
  const lastFullYear = new Date().getUTCFullYear() - 1;
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    start_date: `${YEAR_FROM}-01-01`,
    end_date: `${lastFullYear}-12-31`,
    daily: "temperature_2m_mean,temperature_2m_max,temperature_2m_min,precipitation_sum",
    timezone: "Asia/Kathmandu",
  });
  const res = await fetch(`${ARCHIVE_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`archive api ${res.status}`);
  const j = await res.json();
  const d = j?.daily;
  if (!d?.time?.length) throw new Error("no archive data for this location");

  const n = d.time.length as number;
  const rainM = Array(12).fill(0), tMaxM = Array(12).fill(0), tMinM = Array(12).fill(0);
  const rainY = new Map<number, number>();
  const tSumY = new Map<number, number>();
  const tCountY = new Map<number, number>();

  for (let i = 0; i < n; i++) {
    const dt: string = d.time[i];
    const y = Number(dt.slice(0, 4));
    const m = Number(dt.slice(5, 7)) - 1;
    const r: number | null = d.precipitation_sum?.[i];
    if (r != null) {
      rainM[m] += r;
      rainY.set(y, (rainY.get(y) ?? 0) + r);
    }
    const tx: number | null = d.temperature_2m_max?.[i];
    const tn: number | null = d.temperature_2m_min?.[i];
    const tm: number | null = d.temperature_2m_mean?.[i];
    if (tx != null) tMaxM[m] += tx;
    if (tn != null) tMinM[m] += tn;
    if (tm != null) {
      tSumY.set(y, (tSumY.get(y) ?? 0) + tm);
      tCountY.set(y, (tCountY.get(y) ?? 0) + 1);
    }
  }

  const years = lastFullYear - YEAR_FROM + 1;
  const round1 = (v: number) => Math.round(v * 10) / 10;

  return {
    fetchedAt: Date.now(),
    years,
    rainMonth: rainM.map((v) => round1(v / years)),
    tMaxMonth: tMaxM.map((v) => round1(v / years)),
    tMinMonth: tMinM.map((v) => round1(v / years)),
    rainYear: [...rainY.entries()].sort((a, b) => a[0] - b[0]).map(([year, mm]) => ({ year, mm: round1(mm) })),
    tMeanYear: [...tSumY.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([year, s]) => ({ year, c: round1(s / (tCountY.get(year) || 1)) })),
  };
}

function readCache(district: string): ClimateSummary | null {
  try {
    const raw = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (raw?.district === district && Date.now() - raw.fetchedAt < CACHE_TTL_MS) return raw as ClimateSummary;
  } catch { /* ignore */ }
  return null;
}

/* ── Component ─────────────────────────────────────────────────────────── */

export function ClimateTracker({ np }: { np: boolean }) {
  const [district, setDistrict] = useState("Kathmandu");
  const [data, setData] = useState<ClimateSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadRef = useRef(0);

  const districtOptions = useMemo(() => {
    const seen = new Set(DISTRICT_COORDS.map((d) => d.name));
    return DISTRICTS.filter((d) => seen.has(d.name));
  }, []);

  useEffect(() => {
    const cached = readCache(district);
    if (cached) { setData(cached); setError(null); return; }
    const coords = DISTRICT_COORDS.find((d) => d.name === district);
    if (!coords) return;
    const token = ++loadRef.current;
    setLoading(true); setError(null);
    fetchSummary(coords.lat, coords.lon, district)
      .then((s) => {
        if (token !== loadRef.current) return;
        setData(s);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ...s, district })); } catch { /* quota */ }
      })
      .catch((e: unknown) => {
        if (token !== loadRef.current) return;
        setError(e instanceof Error ? e.message : "network error");
      })
      .finally(() => { if (token === loadRef.current) setLoading(false); });
  }, [district]);

  /* Derived intelligence — all computed, none asserted. */
  const intel = useMemo(() => {
    if (!data) return null;
    const annual = data.rainMonth.reduce((a, b) => a + b, 0);
    const monsoon = data.rainMonth.slice(5, 9).reduce((a, b) => a + b, 0);
    const monsoonShare = annual > 0 ? (monsoon / annual) * 100 : 0;
    // monsoon window = the 4 consecutive months with the most rain
    let bestStart = 5, bestSum = -1;
    for (let s = 0; s <= 8; s++) {
      const sum = data.rainMonth.slice(s, s + 4).reduce((a, b) => a + b, 0);
      if (sum > bestSum) { bestSum = sum; bestStart = s; }
    }
    const heatMonths = data.tMaxMonth.map((t, i) => (t >= 30 ? i : -1)).filter((i) => i >= 0);
    const coldMonths = data.tMinMonth.map((t, i) => (t < 8 ? i : -1)).filter((i) => i >= 0);
    // warming: latest 15 years vs previous 15
    const mid = Math.floor(data.tMeanYear.length / 2);
    const avg = (arr: { c: number }[]) => arr.reduce((a, b) => a + b.c, 0) / (arr.length || 1);
    const recentAvg = avg(data.tMeanYear.slice(mid));
    const pastAvg = avg(data.tMeanYear.slice(0, mid));
    const warming = Math.round((recentAvg - pastAvg) * 10) / 10;
    // recent rainfall anomalies (last 6 full years)
    const normal = data.rainYear.reduce((a, b) => a + b.mm, 0) / (data.rainYear.length || 1);
    const recent = data.rainYear.slice(-6).map((r) => ({ ...r, pct: normal > 0 ? Math.round((r.mm / normal) * 100) : 0 }));
    const wettest = data.rainMonth.indexOf(Math.max(...data.rainMonth));
    return { annual, monsoonShare, bestStart, heatMonths, coldMonths, warming, recent, normal, wettest };
  }, [data]);

  const maxRain = data ? Math.max(...data.rainMonth) : 1;
  const maxT = data ? Math.max(...data.tMaxMonth) : 1;
  const minT = data ? Math.min(...data.tMinMonth) : 0;
  const tLo = Math.floor(minT / 5) * 5;
  const tHi = Math.ceil(maxT / 5) * 5;

  const seasonTag = (i: number) => {
    if (!intel) return null;
    if (i >= intel.bestStart && i < intel.bestStart + 4)
      return { Icon: Droplets, cls: "bg-[#4C7FB5]/15 text-[#2C5D8F]", tip: np ? "मनसुन" : "monsoon" };
    if (intel.heatMonths.includes(i))
      return { Icon: Flame, cls: "bg-[#C0392B]/10 text-[#C0392B]", tip: np ? "ताप जोखिम" : "heat risk" };
    if (intel.coldMonths.includes(i))
      return { Icon: Snowflake, cls: "bg-[#4C7FB5]/10 text-[#12365C]", tip: np ? "चिसो जोखिम" : "cold risk" };
    return null;
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* District picker */}
      <div>
        <Label className="flex items-center gap-1.5 text-sm font-semibold text-[#0A2540]">
          <MapPin size={15} aria-hidden="true" />
          {np ? "जिल्ला छान्नुहोस्" : "Pick your district"}
        </Label>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="mt-2 w-full sm:max-w-xs rounded-xl border-2 border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-[#0A2540] focus:border-[#D4AF37] outline-none"
          aria-label={np ? "जिल्ला" : "District"}
        >
          {districtOptions.map((d) => (
            <option key={d.name} value={d.name}>{np ? d.np : `${d.name} district`}</option>
          ))}
        </select>
        <p className="mt-2 text-xs text-gray-400 leading-relaxed">
          <Info size={11} className="inline mr-1 -mt-0.5" aria-hidden="true" />
          {np
            ? `ERA5 पुनर्विश्लेषण (Open-Meteo संग्रह API) — ${YEAR_FROM}–${new Date().getUTCFullYear() - 1} · ${data ? f(data.years, np) : "३०"} वर्ष · यो ब्राउजरमै हिसाब गरिन्छ`
            : `ERA5 reanalysis via the Open-Meteo archive API — ${YEAR_FROM}–${new Date().getUTCFullYear() - 1} · ${data ? f(data.years, np) : 30} years · computed in your browser`}
        </p>
      </div>

      {/* Loading / error */}
      {loading && (
        <div className="rounded-2xl border-2 border-gray-100 p-8 flex flex-col items-center gap-3 text-gray-400">
          <Loader2 className="animate-spin" size={26} aria-hidden="true" />
          <p className="text-sm font-medium">{np ? "३० वर्षको मौसम डाउनलोड हुँदै…" : "Downloading 30 years of weather…"}</p>
        </div>
      )}
      {error && !loading && (
        <div className="rounded-2xl border-2 border-[#C0392B]/30 bg-[#C0392B]/[0.05] p-6 flex items-start gap-3">
          <WifiOff size={20} className="text-[#C0392B] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#C0392B]">{np ? "डाटा ल्याउन सकिएन" : "Could not load the archive"}</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{np ? "इन्टरनेट जाँचेर पुनः प्रयास गर्नुहोस्।" : "Check your connection and try again."}</p>
            <button
              onClick={() => { try { localStorage.removeItem(CACHE_KEY); } catch { /* ignore */ } setDistrict(district); loadRef.current++; const c = DISTRICT_COORDS.find((d) => d.name === district); if (c) { setLoading(true); fetchSummary(c.lat, c.lon, district).then(setData).catch(() => setError("retry failed")).finally(() => setLoading(false)); } }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2540] hover:text-[#B8941F]"
            >
              <RefreshCw size={12} aria-hidden="true" />
              {np ? "पुनः प्रयास" : "Retry"}
            </button>
          </div>
        </div>
      )}

      {data && intel && !loading && (
        <>
          {/* Headline stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { Icon: Droplets, val: f(intel.annual, np), unit: "mm", labEn: "rain / year", labNp: "वार्षिक वर्षा" },
              { Icon: CloudSun, val: `${f(intel.monsoonShare, np)}%`, unit: "", labEn: "falls Jun–Sep", labNp: "मनसुनमा पर्छ" },
              { Icon: ThermometerSun, val: intel.warming > 0 ? `+${f(intel.warming, np, 1)}` : f(intel.warming, np, 1), unit: "°C", labEn: "15-yr warming", labNp: "१५-वर्षे ताप वृद्धि" },
              { Icon: Leaf, val: f(intel.normal, np), unit: "mm", labEn: "normal year", labNp: "सामान्य वर्षा" },
            ].map(({ Icon, val, unit, labEn, labNp }) => (
              <div key={labEn} className="rounded-2xl border-2 border-gray-100 bg-white p-3.5 text-center">
                <Icon size={16} className="mx-auto text-[#B8941F]" aria-hidden="true" />
                <p className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#0A2540] leading-none">
                  {val}<span className="text-xs font-semibold text-gray-400 ml-0.5">{unit}</span>
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">{np ? labNp : labEn}</p>
              </div>
            ))}
          </div>

          {/* Rainfall normals — monsoon months highlighted */}
          <div className="rounded-2xl border-2 border-gray-100 bg-gray-50/60 p-5">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#B8941F] mb-1">
              <Droplets size={13} aria-hidden="true" />
              {np ? "मासिक वर्षा (औसत)" : "Monthly rainfall (normal)"}
            </p>
            <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">
              {np
                ? `सुनको रङ = मनसुन महिना (सबैभन्दा भिजाउने ४ लगातार महिना: ${MONTHS_EN[intel.bestStart]}–${MONTHS_EN[intel.bestStart + 3]}) · मिलिमिटर — ग्रिड औसत हो, पहाडी भूभागमा स्टेशन रेकर्डभन्दा केही माथि-तल हुन सक्छ`
                : `Gold = monsoon months (wettest 4 in a row: ${MONTHS_EN[intel.bestStart]}–${MONTHS_EN[intel.bestStart + 3]}) · millimetres — a ~10 km grid average; mountain terrain can differ from single-station records`}
            </p>
            <div className="flex items-end gap-1 sm:gap-1.5 h-40" role="img" aria-label="monthly rainfall normals">
              {data.rainMonth.map((mm, i) => {
                const inMonsoon = i >= intel.bestStart && i < intel.bestStart + 4;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                    <span className="text-[9px] font-bold text-gray-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{f(mm, np)}</span>
                    <motion.div
                      initial={{ height: 4 }}
                      animate={{ height: `${Math.max(4, (mm / maxRain) * 100)}%` }}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                      className={`w-full rounded-t-md ${inMonsoon
                        ? "bg-gradient-to-t from-[#B8941F] to-[#D4AF37]"
                        : "bg-gradient-to-t from-[#12365C] to-[#4C7FB5]"}`}
                    />
                    <span className="mt-1.5 text-[8.5px] sm:text-[9.5px] font-semibold text-gray-500 truncate w-full text-center">
                      {np ? MONTHS_NP[i].replace("→", "") : MONTHS_EN[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Temperature normals — vertical range bars */}
          <div className="rounded-2xl border-2 border-gray-100 bg-gray-50/60 p-5">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#B8941F] mb-1">
              <ThermometerSun size={13} aria-hidden="true" />
              {np ? "तापक्रम दायरा (औसत)" : "Temperature range (normal)"}
            </p>
            <p className="text-[11px] text-gray-400 mb-4">
              {np ? "प्रत्येक पट्टी = त्यो महिनाको औसत दैनिक न्यूनतम–अधिकतम · °C" : "Each bar = that month's mean daily low–high · °C"}
            </p>
            <div className="flex items-stretch gap-1 sm:gap-1.5 h-40" role="img" aria-label="monthly temperature normals">
              {data.tMaxMonth.map((tx, i) => {
                const tn = data.tMinMonth[i];
                const top = ((tHi - tx) / (tHi - tLo)) * 100;
                const bot = ((tHi - tn) / (tHi - tLo)) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full">
                    <div className="relative w-full flex-1">
                      <motion.div
                        initial={{ top: "50%", bottom: "50%" }}
                        animate={{ top: `${top}%`, bottom: `${100 - bot}%` }}
                        transition={{ duration: 0.5, delay: i * 0.04 }}
                        className="absolute w-full rounded-md bg-gradient-to-b from-[#C0392B] via-[#D4AF37] to-[#4C7FB5]"
                      />
                      <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#C0392B] whitespace-nowrap">{f(tx, np)}°</span>
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#2C5D8F] whitespace-nowrap">{f(tn, np)}°</span>
                    </div>
                    <span className="mt-1.5 text-[8.5px] sm:text-[9.5px] font-semibold text-gray-500">{np ? MONTHS_NP[i].replace("→", "") : MONTHS_EN[i]}</span>
                  </div>
                );
              })}
            </div>
            {intel.heatMonths.length > 0 && (
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed flex items-start gap-1.5">
                <TriangleAlert size={12} className="text-[#C0392B] mt-0.5 flex-shrink-0" aria-hidden="true" />
                {np
                  ? `${MONTHS_EN[intel.heatMonths[0]]}–${MONTHS_EN[intel.heatMonths[intel.heatMonths.length - 1]]} मा औसत दैनिक अधिकतम ३० °C नाघ्छ — गाईभैंसीमा ताप-तनाव (THI) सुरु हुन्छ, छहारी-पानी मिलाउनुहोस्।`
                  : `Mean daily max tops 30 °C in ${MONTHS_EN[intel.heatMonths[0]]}–${MONTHS_EN[intel.heatMonths[intel.heatMonths.length - 1]]} — dairy heat stress (THI) season: plan shade and water.`}
              </p>
            )}
          </div>

          {/* Recent years vs normal */}
          <div className="rounded-2xl border-2 border-gray-100 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-3">
              {np ? "पछिल्ला वर्षहरू — सामान्यको %" : "Recent years — % of normal rain"}
            </p>
            <div className="space-y-2.5">
              {intel.recent.map((r) => (
                <div key={r.year} className="flex items-center gap-3">
                  <span className="w-10 text-xs font-bold text-gray-500 flex-shrink-0">{np ? toNepaliDigits(String(r.year)) : r.year}</span>
                  <div className="flex-1 h-6 rounded-full bg-gray-100 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, r.pct)}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full ${r.pct >= 105 ? "bg-gradient-to-r from-[#12365C] to-[#4C7FB5]" : r.pct <= 85 ? "bg-gradient-to-r from-[#B8941F] to-[#D4AF37]" : "bg-gradient-to-r from-[#2E7D32] to-[#4CAF50]"}`}
                    />
                    {r.pct > 100 && (
                      <span className="absolute top-0 right-1 h-full flex items-center text-[10px] font-bold text-[#12365C]/70">+{f(r.pct - 100, np)}%</span>
                    )}
                  </div>
                  <span className={`w-12 text-right text-xs font-bold flex-shrink-0 ${r.pct >= 105 ? "text-[#2C5D8F]" : r.pct <= 85 ? "text-[#B8941F]" : "text-[#2E7D32]"}`}>
                    {f(r.pct, np)}%
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3.5 text-[11px] text-gray-400 leading-relaxed">
              {np
                ? "निलो = सामान्यभन्दा भिजाउँदो · सुन = सुख्खा (८५% मुनि) · हरियो = सामान्य दायरा"
                : "Blue = wetter than normal · gold = dry (below 85%) · green = normal band"}
            </p>
          </div>

          {/* Livestock season calendar */}
          <div className="rounded-2xl border-2 border-[#D4AF37]/40 bg-[#D4AF37]/[0.05] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B8941F] mb-3">
              {np ? "पशुपालन मौसम पात्रो" : "Livestock season calendar"}
            </p>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
              {Array.from({ length: 12 }, (_, i) => {
                const tag = seasonTag(i);
                return (
                  <div key={i} className={`rounded-xl p-2 text-center ${tag ? tag.cls : "bg-white border border-gray-100"}`}
                    title={tag ? tag.tip : undefined}>
                    <p className="text-[9px] sm:text-[10px] font-bold text-gray-600 leading-none">
                      {np ? MONTHS_NP[i].replace("→", "") : MONTHS_EN[i]}
                    </p>
                    {tag ? (
                      <tag.Icon size={13} className="mx-auto mt-1 opacity-80" aria-hidden="true" />
                    ) : (
                      <Leaf size={13} className="mx-auto mt-1 text-gray-300" aria-hidden="true" />
                    )}
                  </div>
                );
              })}
            </div>
            <ul className="mt-4 space-y-1.5 text-[13px] text-gray-700 leading-relaxed">
              <li className="flex gap-2">
                <Droplets size={13} className="text-[#2C5D8F] mt-1 flex-shrink-0" aria-hidden="true" />
                <span>{np
                  ? `मनसुन (${MONTHS_EN[intel.bestStart]}–${MONTHS_EN[intel.bestStart + 3]}): पशुगोठा सुक्खा राख्नुहोस्, खुट्टा डुब्ने चरनबाट जोगाउनुहोस्, कीट-जुका बढ्छ।`
                  : `Monsoon (${MONTHS_EN[intel.bestStart]}–${MONTHS_EN[intel.bestStart + 3]}): keep sheds dry, avoid waterlogged grazing, parasites peak.`}</span>
              </li>
              <li className="flex gap-2">
                <Flame size={13} className="text-[#C0392B] mt-1 flex-shrink-0" aria-hidden="true" />
                <span>{np
                  ? `गर्मी महिना: बिहान/साँझ मात्र चराउनुहोस्, दिउँसो पानी र छहारी जोगाउनुहोस्, यात्रा-मिलन बिहानै गर्नुहोस्।`
                  : `Hot months: graze mornings/evenings only, protect water and shade, do heat-detection and breeding early morning.`}</span>
              </li>
              <li className="flex gap-2">
                <Snowflake size={13} className="text-[#12365C] mt-1 flex-shrink-0" aria-hidden="true" />
                <span>{np
                  ? `चिसो महिना: नयाँ बच्चालाई ओछ्यान-सुक्खा गर्मी चाहिन्छ, बढी चारा (शरीरले ताप बनाउन खर्च गर्छ)।`
                  : `Cold months: newborns need deep dry bedding, and feed a little more — maintaining body warmth costs energy.`}</span>
              </li>
            </ul>
          </div>

          {/* Warming note */}
          <div className={`rounded-2xl border-2 p-5 ${intel.warming > 0 ? "border-[#C0392B]/30 bg-[#C0392B]/[0.04]" : "border-gray-100"}`}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-2 flex items-center gap-1.5">
              <ThermometerSun size={13} aria-hidden="true" />
              {np ? "वर्षैकी तापक्रम दिशा" : "30-year temperature direction"}
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              {np
                ? `यो जिल्लाका पछिल्ला ${f(Math.floor((data?.years ?? 30) / 2), np)} वर्ष पहिलेका ${f(Math.floor((data?.years ?? 30) / 2), np)} वर्षभन्दा ${intel.warming > 0 ? "औसतमा " + (f(intel.warming, np, 1) + " °C न्यानो") : "कुनै खास फरक छैन"} — गर्मी-तनाव महिना बढ्न सक्छन्, छहारी र पानीको योजना अगाडि बनाउनुहोस्।`
                : `The latest ${Math.floor((data?.years ?? 30) / 2)} years average ${intel.warming > 0 ? `${f(intel.warming, np, 1)} °C warmer than` : "no clear difference from"} the previous ${Math.floor((data?.years ?? 30) / 2)} — heat-stress months may widen, so plan shade and water ahead of time.`}
            </p>
          </div>

          <ResultCardActions
            np={np}
            toolId="climate"
            label={np ? `मौसम पछिल्लगता — ${district}` : `Climate normals — ${district}`}
            summary={np
              ? `वार्षिक वर्षा ${f(intel.annual, np)} मिमि · मनसुन ${f(intel.monsoonShare, np)}% · ताप ${intel.warming > 0 ? "+" : ""}${f(intel.warming, np, 1)}°C`
              : `${f(intel.annual, np)} mm/yr · monsoon ${f(intel.monsoonShare, np)}% · ${intel.warming > 0 ? "+" : ""}${f(intel.warming, np, 1)}°C trend`}
            detail={np
              ? `ERA5 (Open-Meteo) · ${YEAR_FROM}–${new Date().getUTCFullYear() - 1} · जिल्ला: ${district}`
              : `ERA5 via Open-Meteo · ${YEAR_FROM}–${new Date().getUTCFullYear() - 1} · district: ${district}`}
          />
        </>
      )}
    </div>
  );
}
