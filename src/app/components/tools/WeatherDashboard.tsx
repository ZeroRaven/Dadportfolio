import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  MapPin, LocateFixed, RefreshCw, Thermometer, Wind, Droplets, Sun, CloudSun,
  Cloud, CloudFog, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Loader2,
  WifiOff, TriangleAlert, Sunrise, Sunset, SprayCan, Snowflake, Flame, CalendarDays,
} from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ResultCardActions } from "./ResultActions";
import { DISTRICTS } from "../../data/nepalDistricts";
import { DISTRICT_COORDS, coordByName, nearestDistrict } from "../../data/districtCoords";
import { toNepaliDigits } from "../../i18n/format";

/* ─────────────────────────────────────────────────────────────────────────────
 *  WEATHER SMART — farm weather intelligence for livestock keepers.
 *
 *  Live data: Open-Meteo (https://open-meteo.com) — free for non-commercial
 *  use, no API key, CORS-enabled. Current conditions + 7-day daily forecast.
 *
 *  Derived intelligence (verified sources, see notes/release8-plan.md):
 *   · THI — NRC (1971) formula: 0.8·T + RH·(0.8·T − 14.4) + 46.4
 *     (T = daily max °C, RH = mean relative humidity as a fraction).
 *     Dairy heat stress begins at THI ≥ 68, beef at ≥ 78 (extension guidance).
 *   · Poultry — ambient-temperature bands (watch 25 °C, stress 30 °C, danger 35 °C).
 *   · Spraying window — wind ≤ 12 km/h, rain ≤ 0.5 mm, temp 10–32 °C.
 *   · Newborn cold stress — overnight min < 8 °C.
 *
 *  A 30-minute localStorage cache keeps repeat visits within the API's
 *  fair-use envelope; everything else runs fully in the browser.
 * ──────────────────────────────────────────────────────────────────────────── */

interface WeatherData {
  fetchedAt: number;
  timezone: string;
  current: {
    temperature: number;
    apparent: number;
    humidity: number;
    precipitation: number;
    wind: number;
    code: number;
    isDay: boolean;
  };
  daily: {
    time: string[];
    code: number[];
    tMax: number[];
    tMin: number[];
    precip: number[];
    windMax: number[];
    humidityMean: number[];
    sunrise: string[];
    sunset: string[];
  };
}

const CACHE_KEY = "weather-cache-v1";
const CACHE_TTL_MS = 30 * 60 * 1000;

const THI_BANDS = [
  { max: 68, en: "Comfortable", np: "आरामदायी", color: "#16A34A", adviceEn: "No heat-stress measures needed — normal shade and water.", adviceNp: "ताप तनावको जरुरत छैन — सामान्य छहारी र पानी पर्याप्त।" },
  { max: 72, en: "Watch (dairy)", np: "सतर्क (गाई)", color: "#CA8A04", adviceEn: "Dairy cows feel mild stress above THI 68 — check shade and water troughs.", adviceNp: "थन ६८ माथि गाईमा हल्का तनाव सुरु हुन्छ — छहारी र पानीको भाँडो जाँच्नुहोस्।" },
  { max: 80, en: "Moderate stress", np: "मध्यम तनाव", color: "#EA580C", adviceEn: "Provide deep shade, extra water, and cool drinking water; avoid midday handling.", adviceNp: "गहिरो छहारी, बढी पानी र चिसो पिउने पानी मिलाउनुहोस्; दिउँसो नचलाउनुहोस्।" },
  { max: 90, en: "High stress", np: "उच्च तनाव", color: "#DC2626", adviceEn: "Active cooling needed — fans, body washing, grazing only in early morning and evening.", adviceNp: "सक्रिय चिसो गर्नुपर्छ — पंखा, शरीर धुने, चरन बिहान र साँझ मात्र।" },
  { max: Infinity, en: "Danger", np: "खतरा", color: "#7F1D1D", adviceEn: "Emergency-level heat — continuous cooling, watch for open-mouth panting, call the vet early.", adviceNp: "आकस्मिक गर्मी — निरन्तर चिसो, मुख खोलेर सास फेर्ने हेर्नुहोस्, चिकित्सकलाई चाँडै बोलाउनुहोस्।" },
];

function thiBand(thi: number) {
  return THI_BANDS.find((b) => thi < b.max) ?? THI_BANDS[THI_BANDS.length - 1];
}

/** NRC (1971) temperature-humidity index — T in °C, RH in %. */
function thi(tC: number, rhPercent: number): number {
  const rh = Math.min(100, Math.max(0, rhPercent)) / 100;
  return 0.8 * tC + rh * (0.8 * tC - 14.4) + 46.4;
}

const WMO: { codes: number[]; en: string; np: string; Icon: typeof Sun; day?: boolean }[] = [
  { codes: [0], en: "Clear sky", np: "पूरै घाम", Icon: Sun },
  { codes: [1], en: "Mainly clear", np: "प्रायः शान्त", Icon: Sun },
  { codes: [2], en: "Partly cloudy", np: "आंशिक बादल", Icon: CloudSun },
  { codes: [3], en: "Overcast", np: "पूरै बादल", Icon: Cloud },
  { codes: [45, 48], en: "Fog", np: "कुहिरो", Icon: CloudFog },
  { codes: [51, 53, 55, 56, 57], en: "Drizzle", np: "झिरी", Icon: CloudDrizzle },
  { codes: [61, 63, 65, 66, 67, 80, 81, 82], en: "Rain", np: "वर्षा", Icon: CloudRain },
  { codes: [71, 73, 75, 77, 85, 86], en: "Snow", np: "हिमपात", Icon: CloudSnow },
  { codes: [95, 96, 99], en: "Thunderstorm", np: "मुसलधारे/चिसो पानी", Icon: CloudLightning },
];

function wmoInfo(code: number) {
  return WMO.find((w) => w.codes.includes(code)) ?? WMO[3];
}

function weekday(dateStr: string, np: boolean): string {
  const d = new Date(`${dateStr}T00:00:00`);
  const en = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
  const npD = ["आइत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"][d.getDay()];
  return np ? npD : en;
}

function f(value: number, np: boolean, digits = 0): string {
  const s = value.toFixed(digits);
  return np ? toNepaliDigits(s) : s;
}

export function WeatherDashboard({ np }: { np: boolean }) {
  const [district, setDistrict] = useState<string>("Kathmandu");
  const [useGeo, setUseGeo] = useState(false);
  const [geoLabel, setGeoLabel] = useState<string>("");
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stale, setStale] = useState(false);
  const coordsRef = useRef<{ lat: number; lon: number }>({ lat: 27.72, lon: 85.32 });
  const cacheKeyRef = useRef<string>("");

  const districtOptions = useMemo(() => {
    const seen = new Set(DISTRICT_COORDS.map((d) => d.name));
    return DISTRICTS.filter((d) => seen.has(d.name));
  }, []);

  const load = useCallback(async (force: boolean) => {
    const key = `${coordsRef.current.lat.toFixed(2)},${coordsRef.current.lon.toFixed(2)}`;
    cacheKeyRef.current = key;
    if (!force) {
      try {
        const cached = localStorage.getItem(`${CACHE_KEY}:${key}`);
        if (cached) {
          const parsed = JSON.parse(cached) as WeatherData;
          if (Date.now() - parsed.fetchedAt < CACHE_TTL_MS) {
            setData(parsed);
            setError(null);
            setStale(false);
            return;
          }
          setData(parsed); // show stale data while refreshing
          setStale(true);
        }
      } catch {
        /* cache is best-effort */
      }
    }
    setLoading(true);
    setError(null);
    try {
      const { lat, lon } = coordsRef.current;
      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        "&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day" +
        "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,relative_humidity_2m_mean,sunrise,sunset" +
        "&timezone=auto&forecast_days=7";
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = (await res.json()) as {
        current: Record<string, number>;
        daily: Record<string, (string | number)[]>;
        timezone: string;
      };
      const parsed: WeatherData = {
        fetchedAt: Date.now(),
        timezone: j.timezone,
        current: {
          temperature: j.current.temperature_2m as number,
          apparent: j.current.apparent_temperature as number,
          humidity: j.current.relative_humidity_2m as number,
          precipitation: j.current.precipitation as number,
          wind: j.current.wind_speed_10m as number,
          code: j.current.weather_code as number,
          isDay: (j.current.is_day as number) === 1,
        },
        daily: {
          time: j.daily.time as string[],
          code: j.daily.weather_code as number[],
          tMax: j.daily.temperature_2m_max as number[],
          tMin: j.daily.temperature_2m_min as number[],
          precip: j.daily.precipitation_sum as number[],
          windMax: j.daily.wind_speed_10m_max as number[],
          humidityMean: j.daily.relative_humidity_2m_mean as number[],
          sunrise: j.daily.sunrise as string[],
          sunset: j.daily.sunset as string[],
        },
      };
      setData(parsed);
      setStale(false);
      try {
        localStorage.setItem(`${CACHE_KEY}:${key}`, JSON.stringify(parsed));
      } catch {
        /* storage full / private mode — ignore */
      }
    } catch {
      setError(
        np
          ? "मौसम डाटा ल्याउन सकिएन — इन्टरनेट जाँचेर पुनः प्रयास गर्नुहोस्।"
          : "Could not load weather data — check your connection and retry."
      );
    } finally {
      setLoading(false);
    }
  }, [np]);

  // Initial load for the default district
  useEffect(() => {
    const c = coordByName(district);
    if (c) {
      coordsRef.current = { lat: c.lat, lon: c.lon };
      load(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickDistrict = (name: string) => {
    setUseGeo(false);
    setDistrict(name);
    const c = coordByName(name);
    if (c) {
      coordsRef.current = { lat: c.lat, lon: c.lon };
      load(false);
    }
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError(np ? "यो ब्राउजरमा स्थान सेवा उपलब्ध छैन।" : "Location services are not available in this browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        coordsRef.current = { lat: latitude, lon: longitude };
        const near = nearestDistrict(latitude, longitude);
        setUseGeo(true);
        setGeoLabel(np ? `मेरो स्थान (${near.name} नजिक)` : `My location (near ${near.name})`);
        load(true);
      },
      () => {
        setLoading(false);
        setError(
          np
            ? "स्थान पत्ता लगाउन सकिएन — अनुमति दिनुहोस् वा जिल्ला छान्नुहोस्।"
            : "Could not get your location — allow permission or pick a district instead."
        );
      },
      { timeout: 10000, maximumAge: 600000 }
    );
  };

  const day0 = data?.daily;
  const todayThi = day0 ? thi(day0.tMax[0], day0.humidityMean[0]) : null;
  const todayBand = todayThi !== null ? thiBand(todayThi) : null;
  const todayPoultry = day0 ? day0.tMax[0] : null;
  const sprayOk = day0
    ? day0.windMax[0] <= 12 && day0.precip[0] <= 0.5 && day0.tMax[0] >= 10 && day0.tMax[0] <= 32
    : null;
  const coldRisk = day0 ? day0.tMin[0] < 8 : null;
  const placeLabel = useGeo ? geoLabel : district;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Location picker */}
      <div>
        <Label htmlFor="weather-district" className="text-sm font-semibold text-[#0A2540] mb-2 flex items-center gap-1.5">
          <MapPin size={15} aria-hidden="true" />
          {np ? "जिल्ला छान्नुहोस्" : "Pick a district"}
        </Label>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <select
            id="weather-district"
            value={useGeo ? "" : district}
            onChange={(e) => pickDistrict(e.target.value)}
            className="flex-1 rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] px-3.5 py-2.5 text-sm font-semibold text-[#0A2540] bg-white"
          >
            {useGeo && <option value="">{geoLabel}</option>}
            {districtOptions.map((d) => (
              <option key={d.name} value={d.name}>
                {np ? d.np : d.name}
              </option>
            ))}
          </select>
          <Button
            onClick={useMyLocation}
            variant="outline"
            className="border-2 border-gray-200 hover:border-[#D4AF37] font-semibold"
            disabled={loading}
          >
            <LocateFixed size={15} className="mr-1.5" aria-hidden="true" />
            {np ? "मेरो स्थान" : "My location"}
          </Button>
          <Button
            onClick={() => load(true)}
            variant="outline"
            className="border-2 border-gray-200 hover:border-[#D4AF37] font-semibold"
            disabled={loading}
            aria-label={np ? "पुनः लोड गर्नुहोस्" : "Refresh"}
          >
            {loading ? (
              <Loader2 size={15} className="animate-spin" aria-hidden="true" />
            ) : (
              <RefreshCw size={15} aria-hidden="true" />
            )}
          </Button>
        </div>
        <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
          {np
            ? "लाइभ पूर्वानुमान — Open-Meteo (निःशुल्क, कुनै खाता चाहिँदैन)। ३० मिनेसम्म पुरानो डाटा क्यासबाट देखाइन्छ।"
            : "Live forecast by Open-Meteo (free, no account). Data up to 30 minutes old is served from cache."}
        </p>
      </div>

      {/* Error / loading */}
      {error && (
        <div className="rounded-2xl border-2 border-red-100 bg-red-50 p-4 flex items-start gap-3">
          <TriangleAlert className="text-red-500 mt-0.5 flex-shrink-0" size={18} aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm text-red-700 font-medium">{error}</p>
            {data && (
              <p className="text-xs text-red-500 mt-1">
                {np ? "तल पुरानो पूर्वानुमान देखाइँदैछ।" : "Showing the last successful forecast below."}
              </p>
            )}
          </div>
        </div>
      )}
      {loading && !data && (
        <div className="rounded-2xl border-2 border-gray-100 p-10 flex flex-col items-center gap-3 text-gray-400">
          <Loader2 size={28} className="animate-spin" aria-hidden="true" />
          <p className="text-sm">{np ? "मौसम लोड हुँदैछ…" : "Loading weather…"}</p>
        </div>
      )}

      {data && day0 && (
        <>
          {/* Current conditions */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-1">
                  {np ? "अहिलेको मौसम" : "Right now"}
                </p>
                <p className="text-sm text-gray-300 flex items-center gap-1.5">
                  <MapPin size={13} aria-hidden="true" />
                  {placeLabel}
                </p>
              </div>
              {(() => {
                const info = wmoInfo(data.current.code);
                const Icon = info.Icon;
                return (
                  <div className="flex items-center gap-2.5">
                    <Icon size={34} className="text-[#D4AF37]" aria-hidden="true" />
                    <div>
                      <p className="text-3xl font-bold leading-none font-display">
                        {f(data.current.temperature, np, 1)}°
                      </p>
                      <p className="text-xs text-gray-300 mt-1">{np ? info.np : info.en}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {[
                { Icon: Thermometer, label: np ? "महसुस" : "Feels like", val: `${f(data.current.apparent, np, 1)}°C` },
                { Icon: Droplets, label: np ? "आर्द्रता" : "Humidity", val: `${f(data.current.humidity, np)}%` },
                { Icon: Wind, label: np ? "हावा" : "Wind", val: `${f(data.current.wind, np, 1)} km/h` },
                { Icon: CloudRain, label: np ? "वर्षा" : "Rain", val: `${f(data.current.precipitation, np, 1)} mm` },
              ].map(({ Icon, label, val }) => (
                <div key={label} className="rounded-xl bg-white/[0.07] border border-white/10 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <Icon size={11} aria-hidden="true" />
                    {label}
                  </p>
                  <p className="text-sm font-semibold mt-0.5">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-[11px] text-gray-300">
              <span className="flex items-center gap-1"><Sunrise size={12} className="text-[#D4AF37]" aria-hidden="true" />{np ? "उदाउँछ" : "Sunrise"} {toNepaliDigits(day0.sunrise[0]?.slice(11, 16) ?? "")}</span>
              <span className="flex items-center gap-1"><Sunset size={12} className="text-[#D4AF37]" aria-hidden="true" />{np ? "अस्ताउँछ" : "Sunset"} {toNepaliDigits(day0.sunset[0]?.slice(11, 16) ?? "")}</span>
              {stale && <span className="ml-auto text-amber-300">{np ? "क्यासबाट" : "from cache"}</span>}
            </div>
          </div>

          {/* THI heat-stress card */}
          {todayThi !== null && todayBand && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 p-5"
              style={{ borderColor: `${todayBand.color}55`, background: `${todayBand.color}0D` }}
            >
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5" style={{ color: todayBand.color }}>
                  <Flame size={14} aria-hidden="true" />
                  {np ? "ताप-आर्द्रता सूचक (THI)" : "Temperature-Humidity Index (THI)"}
                </p>
                <div className="text-right">
                  <span className="font-display text-3xl font-bold" style={{ color: todayBand.color }}>
                    {f(todayThi, np, 0)}
                  </span>
                  <span className="ml-2 text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: todayBand.color }}>
                    {np ? todayBand.np : todayBand.en}
                  </span>
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full overflow-hidden bg-gray-100" role="img" aria-label={np ? `थन ${f(todayThi, np)}` : `THI ${f(todayThi, np)}`}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.max(4, ((todayThi - 50) / 50) * 100))}%`, background: todayBand.color }}
                />
              </div>
              <p className="text-sm mt-3 leading-relaxed text-gray-700">{np ? todayBand.adviceNp : todayBand.adviceEn}</p>
              {todayPoultry !== null && (
                <p className="text-xs mt-2.5 leading-relaxed text-gray-500 flex items-start gap-1.5">
                  <Sun size={12} className="mt-0.5 flex-shrink-0 text-amber-500" aria-hidden="true" />
                  {np
                    ? `कुखुरा: आजको अधिकतम ${f(todayPoultry, np, 0)}°C — ${todayPoultry < 25 ? "आरामदायी" : todayPoultry < 30 ? "हेर्नुहोस्" : todayPoultry < 35 ? "तनाव — भेन्टिलेसन र पानी बढाउनुहोस्" : "खतरा — चिसो बतास र पानी तत्काल"}।`
                    : `Poultry: today's max ${f(todayPoultry, np, 0)}°C — ${todayPoultry < 25 ? "comfortable" : todayPoultry < 30 ? "watch" : todayPoultry < 35 ? "stress — boost ventilation and water" : "danger — cool airflow and water immediately"}.`}
                </p>
              )}
              <p className="text-[10px] text-gray-400 mt-2.5 leading-relaxed">
                {np
                  ? "सूत्र: NRC (१९७१) — ०.८×T + आर्द्रता×(०.८×T−१४.४) + ४६.४। गाईको तनाव थन ६८ देखि, मासुजन्य पशुको ७८ देखि सुरु हुन्छ।"
                  : "Formula: NRC (1971) — 0.8×T + RH×(0.8×T−14.4) + 46.4. Dairy stress starts at THI 68, beef at 78."}
              </p>
            </motion.div>
          )}

          {/* Farm advisories today */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className={`rounded-2xl border-2 p-4 ${sprayOk ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-gray-50"}`}>
              <p className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 mb-2 text-emerald-700">
                <SprayCan size={13} aria-hidden="true" />
                {np ? "छर्कने उपयुक्त समय" : "Spraying window"}
              </p>
              <p className={`text-lg font-bold ${sprayOk ? "text-emerald-700" : "text-gray-500"}`}>
                {sprayOk ? (np ? "आज ठीक छ" : "Good today") : np ? "आज उपयुक्त छैन" : "Not today"}
              </p>
              <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                {np
                  ? "हावा १२ किमी/घण्टाभन्दा कम, वर्षा ०.५ मिमीभन्दा कम र ताप १०–३२°C भए उपयुक्त।"
                  : "Good when wind ≤ 12 km/h, rain ≤ 0.5 mm and 10–32°C — protects drift and operator safety."}
              </p>
            </div>
            <div className={`rounded-2xl border-2 p-4 ${coldRisk ? "border-sky-200 bg-sky-50" : "border-gray-200 bg-gray-50"}`}>
              <p className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 mb-2 text-sky-700">
                <Snowflake size={13} aria-hidden="true" />
                {np ? "बच्चाको चिसो जोखिम" : "Newborn cold risk"}
              </p>
              <p className={`text-lg font-bold ${coldRisk ? "text-sky-700" : "text-gray-500"}`}>
                {day0 && (
                  <>
                    {np ? "न्यूनतम " : "Min "}
                    {f(day0.tMin[0], np, 0)}°C
                  </>
                )}
              </p>
              <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                {coldRisk
                  ? np
                    ? "८°C भन्दा तल — नवजात बच्चालाई गहिरो ओछ्यान र न्यानो आश्रय चाहिन्छ।"
                    : "Below 8°C — newborn lambs, kids and calves need deep bedding and a wind-free shelter."
                  : np
                    ? "आज चिसो जोखिम कम छ।"
                    : "Low cold risk today."}
              </p>
            </div>
          </div>

          {/* 7-day strip */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#B8941F] mb-3 flex items-center gap-1.5">
              <CalendarDays size={13} aria-hidden="true" />
              {np ? "७ दिनको पूर्वानुमान" : "7-day outlook"}
            </p>
            <div className="grid grid-cols-7 gap-1.5">
              {day0.time.map((t, i) => {
                const info = wmoInfo(day0.code[i]);
                const Icon = info.Icon;
                const dayThi = thi(day0.tMax[i], day0.humidityMean[i]);
                const band = thiBand(dayThi);
                return (
                  <div key={t} className="rounded-xl border border-gray-100 bg-gray-50/70 px-1 py-2.5 text-center min-w-0">
                    <p className="text-[10px] font-bold text-gray-500 uppercase truncate">
                      {i === 0 ? (np ? "आज" : "Today") : weekday(t, np)}
                    </p>
                    <Icon size={18} className="mx-auto my-1.5 text-[#0A2540]" aria-hidden="true" />
                    <p className="text-[11px] font-bold text-[#0A2540] leading-tight">{f(day0.tMax[i], np, 0)}°</p>
                    <p className="text-[10px] text-gray-400 leading-tight">{f(day0.tMin[i], np, 0)}°</p>
                    <div className="h-1 rounded-full mt-1.5 bg-gray-200 overflow-hidden" title={`THI ${f(dayThi, np)}`}>
                      <div className="h-full" style={{ width: "100%", background: band.color, opacity: 0.75 }} />
                    </div>
                    {day0.precip[i] > 0.5 && (
                      <p className="text-[9px] text-sky-600 font-semibold mt-1 flex items-center justify-center gap-0.5">
                        <Droplets size={8} aria-hidden="true" />
                        {f(day0.precip[i], np, 0)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
              {np
                ? "हरेक दिनको रङ्गीन पट्टी त्यो दिनको THI (ताप-आर्द्रता तनाव) जनाउँछ — रातो भन्दा गहिरो, तनाव भन्दा बढी।"
                : "The coloured bar under each day is that day's THI (heat stress) — the deeper the red, the higher the stress."}
            </p>
          </div>

          {/* Save result */}
          {todayThi !== null && todayBand && (
            <ResultCardActions
              np={np}
              toolId="weather"
              label={np ? `मौसम · ${placeLabel}` : `Weather · ${placeLabel}`}
              summary={`${placeLabel}: ${f(data.current.temperature, np, 0)}°C · THI ${f(todayThi, np)}`}
              detail={
                np
                  ? `${todayBand.np} — ${f(day0.tMax[0], np, 0)}°/${f(day0.tMin[0], np, 0)}°, वर्षा ${f(day0.precip[0], np, 1)} मिमी`
                  : `${todayBand.en} — ${f(day0.tMax[0], np, 0)}°/${f(day0.tMin[0], np, 0)}°, rain ${f(day0.precip[0], np, 1)} mm`
              }
            />
          )}
        </>
      )}

      {/* Offline hint (PWA) */}
      <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
        <WifiOff size={11} aria-hidden="true" />
        {np
          ? "इन्टरनेट नभएमा यो औजारले पछिल्लो सफल पूर्वानुमान देखाउँछ।"
          : "When offline, this tool shows the last successful forecast."}
      </p>
    </div>
  );
}
