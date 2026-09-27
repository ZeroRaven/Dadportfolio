import { useMemo, useState } from "react";
import { Search, Download, ArrowUpDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import {
  DISTRICTS, PROVINCES_WITH_DISTRICTS, districtByName,
} from "../../data/nepalDistricts";
import { metaFor, ZONE_LABELS, CROP_TAGS, LIVESTOCK_TAGS, type Zone } from "../../data/nepalDistrictMeta";
import { toNepaliDigits } from "../../i18n/format";

/**
 * DATA EXPLORER — the whole 77-district dataset as one searchable,
 * sortable table, with a one-click CSV export (transparent, offline,
 * no server needed). Clicking a row opens that district on the map.
 */

type SortKey = "name" | "province" | "zone" | "hq";

/* Tag id → bilingual label, so search matches "tea" AND "चिया". */
const TAG_LOOKUP = new Map<string, { en: string; np: string }>();
for (const t of [...CROP_TAGS, ...LIVESTOCK_TAGS]) TAG_LOOKUP.set(t.id, { en: t.en, np: t.np });

const tagMatches = (ids: string[], q: string, raw: string) =>
  ids.some((id) => {
    if (id.toLowerCase().includes(q)) return true;
    const tag = TAG_LOOKUP.get(id);
    return !!tag && (tag.en.toLowerCase().includes(q) || tag.np.includes(raw));
  });

export function DataExplorer({ np, onPick }: { np: boolean; onPick: (name: string) => void }) {
  const [query, setQuery] = useState("");
  const [zoneFilter, setZoneFilter] = useState<Zone | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const provinceOf = (name: string) =>
    PROVINCES_WITH_DISTRICTS.find((p) => p.districts.some((d) => d.name === name))?.id ?? "—";

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = DISTRICTS.map((d) => {
      const meta = metaFor(d.name);
      return {
        d,
        province: provinceOf(d.name),
        zone: meta.zone,
        crops: meta.crops,
        livestock: meta.livestock,
      };
    });
    if (q) {
      const raw = query.trim();
      list = list.filter((r) =>
        r.d.name.toLowerCase().includes(q) ||
        r.d.np.includes(raw) ||
        r.d.hq.en.toLowerCase().includes(q) ||
        r.d.hq.np.includes(raw) ||
        r.province.toLowerCase().includes(q) ||
        r.d.knownFor.en.toLowerCase().includes(q) ||
        r.zone.toLowerCase().includes(q) ||
        tagMatches(r.crops, q, raw) ||
        tagMatches(r.livestock, q, raw)
      );
    }
    if (zoneFilter !== "All") list = list.filter((r) => r.zone === zoneFilter);
    const dir = sortAsc ? 1 : -1;
    list.sort((a, b) => {
      const key =
        sortKey === "name" ? a.d.name.localeCompare(b.d.name)
        : sortKey === "province" ? a.province.localeCompare(b.province)
        : sortKey === "zone" ? a.zone.localeCompare(b.zone)
        : a.d.hq.en.localeCompare(b.d.hq.en);
      return key * dir;
    });
    return list;
  }, [query, zoneFilter, sortKey, sortAsc]);

  const sortButton = (key: SortKey, label: string) => (
    <button
      type="button"
      onClick={() => {
        if (sortKey === key) setSortAsc((v) => !v);
        else { setSortKey(key); setSortAsc(true); }
      }}
      aria-label={`${label} — ${np ? "क्रमबद्ध गर्नुहोस्" : "sort"}`}
      className={`inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] transition-colors ${
        sortKey === key ? "text-[#B8941F]" : "text-gray-400 hover:text-[#0A2540]"
      }`}
    >
      {label}
      <ArrowUpDown size={11} aria-hidden="true" />
    </button>
  );

  const downloadCsv = () => {
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const header = [
      np ? "जिल्ला" : "District",
      np ? "जिल्ला (नेपाली)" : "District (Nepali)",
      np ? "प्रदेश" : "Province",
      np ? "हेडक्वार्टर" : "Headquarters",
      np ? "भेग" : "Zone",
      np ? "परिचय" : "Known for",
      np ? "बाली" : "Crops",
      np ? "पशुपालन" : "Livestock",
      np ? "जलवायु दबाब" : "Climate pressure",
    ].join(",");
    const body = DISTRICTS.map((d) => {
      const m = metaFor(d.name);
      return [
        d.name, d.np, provinceOf(d.name),
        np ? d.hq.np : d.hq.en,
        ZONE_LABELS[m.zone].en,
        np ? d.knownFor.np : d.knownFor.en,
        m.crops.join("; "),
        m.livestock.join("; "),
        m.climate.join("; "),
      ].map(esc).join(",");
    }).join("\n");
    const blob = new Blob([`\uFEFF${header}\n${body}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nepal-agriculture-districts.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B8941F]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={np ? "जिल्ला, हेडक्वार्टर वा बाली खोज्नुहोस्…" : "Search district, HQ or signature crop…"}
            aria-label={np ? "जिल्ला खोज्नुहोस्" : "Search districts"}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm text-[#0A2540] focus:border-[#D4AF37] outline-none transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          {(["All", "Terai", "Hill", "Mountain"] as const).map((z) => (
            <button
              key={z}
              type="button"
              onClick={() => setZoneFilter(z)}
              aria-pressed={zoneFilter === z}
              className={`px-3 py-2 rounded-full text-xs font-semibold border-2 transition-all ${
                zoneFilter === z
                  ? "border-[#0A2540] bg-[#0A2540] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#D4AF37]/60 hover:text-[#0A2540]"
              }`}
            >
              {z === "All" ? (np ? "सबै" : "All") : np ? ZONE_LABELS[z].np : z}
            </button>
          ))}
          <button
            type="button"
            onClick={downloadCsv}
            className="ml-auto sm:ml-1 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#D4AF37]/15 border-2 border-[#D4AF37]/40 text-[#0A2540] text-xs font-semibold hover:bg-[#D4AF37]/25 transition-colors whitespace-nowrap"
            aria-label={np ? "CSV डाउनलोड गर्नुहोस्" : "Download CSV"}
          >
            <Download size={13} aria-hidden="true" />
            CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-lg bg-white">
        <table className="w-full text-sm min-w-[46rem]">
          <thead>
            <tr className="bg-[#0A2540] text-white text-left">
              <th className="px-4 py-3">{sortButton("name", np ? "जिल्ला" : "District")}</th>
              <th className="px-4 py-3">{sortButton("province", np ? "प्रदेश" : "Province")}</th>
              <th className="px-4 py-3">{sortButton("hq", np ? "हेडक्वार्टर" : "HQ")}</th>
              <th className="px-4 py-3">{sortButton("zone", np ? "भेग" : "Zone")}</th>
              <th className="px-4 py-3 hidden md:table-cell">{np ? "बाली ट्याग" : "Crop tags"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const zone = ZONE_LABELS[r.zone];
              return (
                <tr
                  key={r.d.name}
                  onClick={() => onPick(r.d.name)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onPick(r.d.name)}
                  className={`cursor-pointer transition-colors ${i % 2 ? "bg-gray-50/60" : "bg-white"} hover:bg-[#D4AF37]/10 focus:bg-[#D4AF37]/10 outline-none`}
                  aria-label={`${r.d.name} — ${np ? "नक्सामा हेर्नुहोस्" : "open on map"}`}
                >
                  <td className="px-4 py-2.5">
                    <span className="font-semibold text-[#0A2540]">{np ? r.d.np : r.d.name}</span>
                    <span className="block text-[11px] text-gray-400">{np ? r.d.name : r.d.np}</span>
                  </td>
                  <td className="px-4 py-2.5 text-gray-600">{r.province}</td>
                  <td className="px-4 py-2.5 text-gray-600">{np ? r.d.hq.np : r.d.hq.en}</td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A2540]">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: zone.color }} aria-hidden="true" />
                      {np ? zone.np : zone.en}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 hidden md:table-cell">
                    <span className="text-xs text-gray-500 leading-relaxed">
                      {r.crops.slice(0, 4).map((c) => (np ? "· " + c : "· " + c)).join(" ")}
                    </span>
                  </td>
                </tr>
              );
            })}
            {!rows.length && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                  {np ? "कुनै जिल्ला भेटिएन" : "No districts match that search"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-500 flex flex-wrap items-center gap-x-2">
        <span>
          {np
            ? `${toNepaliDigits(rows.length)} / ${toNepaliDigits(DISTRICTS.length)} जिल्ला देखाइएको — खाँचो परे CSV मा पूरै तथ्याङ्क डाउनलोड गर्नुहोस्।`
            : `${rows.length} of ${DISTRICTS.length} districts shown — download the full dataset as CSV when you need it offline.`}
        </span>
      </p>
    </div>
  );
}
