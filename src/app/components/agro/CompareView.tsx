import { useMemo } from "react";
import { ArrowLeftRight, MapPin, Landmark, Layers, Sparkles, Wheat, HeartPulse, CloudSun } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import {
  DISTRICTS, PROVINCES_WITH_DISTRICTS, districtByName, type DistrictProfile,
} from "../../data/nepalDistricts";
import { metaFor, ZONE_LABELS, CROP_TAGS, LIVESTOCK_TAGS, CLIMATE_TAGS, CLIMATE_TAG_COLORS } from "../../data/nepalDistrictMeta";

/**
 * DISTRICT COMPARISON — pick any two districts and see their factsheets
 * side by side (belt, headquarters, signature agriculture, livestock
 * systems, climate pressure). Phone: stacked cards; ≥md: two columns.
 */

function tagChips(ids: string[], kind: "crops" | "livestock" | "climate", np: boolean) {
  const defs = kind === "crops" ? CROP_TAGS : kind === "livestock" ? LIVESTOCK_TAGS : CLIMATE_TAGS;
  const palette = kind === "climate" ? CLIMATE_TAG_COLORS : null;
  return ids.map((id) => {
    const def = defs.find((t) => t.id === id);
    const color = palette?.[id];
    return (
      <span
        key={id}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border"
        style={
          color
            ? { backgroundColor: `${color}1A`, borderColor: `${color}66`, color: "#0A2540" }
            : { backgroundColor: "rgba(212,175,55,0.10)", borderColor: "rgba(212,175,55,0.35)", color: "#0A2540" }
        }
      >
        {color && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />}
        {np ? def?.np : def?.en}
      </span>
    );
  });
}

function DistrictCard({ d, side, np }: { d: DistrictProfile | null; side: "A" | "B"; np: boolean }) {
  if (!d) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/60 p-5 flex flex-col items-center justify-center min-h-[18rem] text-center">
        <MapPin size={26} className="text-gray-300 mb-2" aria-hidden="true" />
        <p className="text-sm font-semibold text-gray-400">
          {np ? `${side === "A" ? "पहिलो" : "दोस्रो"} जिल्ला छान्नुहोस्` : `Pick ${side === "A" ? "the first" : "the second"} district`}
        </p>
      </div>
    );
  }
  const meta = metaFor(d.name);
  const zone = ZONE_LABELS[meta.zone];
  return (
    <div className="rounded-2xl border border-gray-100 shadow-lg bg-white overflow-hidden">
      <div className="px-5 py-4 text-white" style={{ background: `linear-gradient(135deg, ${zone.color}, ${zone.color}CC)` }}>
        <p className="text-[10px] uppercase tracking-[0.25em] font-bold opacity-80">
          {side === "A" ? (np ? "जिल्ला १" : "District 1") : np ? "जिल्ला २" : "District 2"}
        </p>
        <h3 className="font-display text-2xl font-bold leading-tight mt-0.5">{np ? d.np : d.name}</h3>
        <p className="text-xs opacity-90 mt-1">
          {PROVINCES_WITH_DISTRICTS.find((p) => p.districts.some((x) => x.name === d.name))?.id}
          {" · "}
          {np ? zone.np : zone.en}
        </p>
      </div>
      <div className="p-5 space-y-3.5 text-sm">
        <div className="flex items-start gap-2.5">
          <Landmark size={15} className="mt-0.5 text-[#B8941F] flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold text-[#0A2540] leading-snug">{np ? "प्रशासनिक हेडक्वार्टर" : "Headquarters"}</p>
            <p className="text-gray-600">{np ? d.hq.np : d.hq.en}</p>
          </div>
        </div>
        <div className="rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-3.5 py-2.5">
          <p className="flex items-start gap-2 text-[13px] font-semibold text-[#0A2540] leading-relaxed">
            <Sparkles size={13} className="mt-0.5 text-[#B8941F] flex-shrink-0" aria-hidden="true" />
            {np ? d.knownFor.np : d.knownFor.en}
          </p>
        </div>
        <div>
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
            <Wheat size={12} aria-hidden="true" /> {np ? "बाली" : "CROPS"}
          </p>
          <div className="flex flex-wrap gap-1.5">{tagChips(meta.crops, "crops", np)}</div>
        </div>
        <div>
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
            <HeartPulse size={12} aria-hidden="true" /> {np ? "पशुपालन" : "LIVESTOCK"}
          </p>
          <div className="flex flex-wrap gap-1.5">{tagChips(meta.livestock, "livestock", np)}</div>
        </div>
        <div>
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
            <CloudSun size={12} aria-hidden="true" /> {np ? "जलवायु दबाब" : "CLIMATE PRESSURE"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {meta.climate.length ? tagChips(meta.climate, "climate", np) : (
              <span className="text-xs text-gray-400">{np ? "प्रमुख दबाब तोकिएको छैन" : "No dominant pressure flagged"}</span>
            )}
          </div>
        </div>
        <div className="border-t border-gray-100 pt-3 flex items-start gap-2 text-[13px] text-gray-600 leading-relaxed">
          <Layers size={14} className="mt-0.5 text-[#B8941F] flex-shrink-0" aria-hidden="true" />
          <span>{np ? d.belt.np : d.belt.en}</span>
        </div>
      </div>
    </div>
  );
}

export function CompareView({
  a, b, setA, setB, np,
}: {
  a: string | null;
  b: string | null;
  setA: (name: string | null) => void;
  setB: (name: string | null) => void;
  np: boolean;
}) {
  const dA = a ? districtByName(a) ?? null : null;
  const dB = b ? districtByName(b) ?? null : null;

  const groups = useMemo(() => PROVINCES_WITH_DISTRICTS, []);

  const Select = ({ value, onChange, label }: { value: string | null; onChange: (v: string | null) => void; label: string }) => (
    <label className="block flex-1 min-w-[12rem]">
      <span className="block text-xs font-semibold text-[#0A2540] mb-1">{label}</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        aria-label={label}
        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-[#0A2540] focus:border-[#D4AF37] outline-none transition-colors"
      >
        <option value="">{np ? "— जिल्ला छान्नुहोस् —" : "— choose a district —"}</option>
        {groups.map((p) => (
          <optgroup key={p.id} label={`${p.id}${np ? ` · ${p.npName}` : ""}`}>
            {p.districts.map((d) => (
              <option key={d.name} value={d.name}>
                {np ? d.np : d.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-end gap-3 mb-5">
        <Select value={a} onChange={setA} label={np ? "जिल्ला १" : "District 1"} />
        <button
          type="button"
          onClick={() => { setA(b); setB(a); }}
          aria-label={np ? "जिल्ला साट्नुहोस्" : "Swap districts"}
          className="self-center sm:self-end mb-0.5 w-10 h-10 rounded-xl border-2 border-[#D4AF37]/40 text-[#B8941F] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeftRight size={16} aria-hidden="true" />
        </button>
        <Select value={b} onChange={setB} label={np ? "जिल्ला २" : "District 2"} />
      </div>

      <div className="grid md:grid-cols-2 gap-5 items-start">
        <DistrictCard d={dA} side="A" np={np} />
        <DistrictCard d={dB} side="B" np={np} />
      </div>

      {dA && dB && (
        <p className="mt-4 text-xs text-gray-500 text-center">
          {np
            ? `दुवै जिल्ला ${DISTRICTS.length} जिल्लाको प्रमाणित प्रोफाइलबाट — तल स्रोत हेर्नुहोस्।`
            : "Both factsheets come from the verified 77-district profiles — sources listed below."}
        </p>
      )}
    </div>
  );
}
