import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Beef, Milk, Plus, Trash2, Download, ClipboardList, TrendingUp, Sigma,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toNepaliDigits } from "../../i18n/format";

/* ─────────────────────────────────────────────────────────────────────────────
 *  HERD & MILK LEDGER — simple on-device record keeping for smallholders.
 *
 *  Two localStorage collections:
 *    herd-animals-v1 : { id, tag, species, note }
 *    herd-milk-v1     : { id, date, animalId, am, pm }   (litres)
 *
 *  Everything stays in THIS browser (device-local ledger) — exported on
 *  demand as CSV. Smallholder dairy extension literature consistently
 *  identifies record keeping as the top lever for feeding and breeding
 *  decisions, which is exactly what this tab enables.
 * ──────────────────────────────────────────────────────────────────────────── */

interface Animal {
  id: string;
  tag: string;
  species: "cattle" | "buffalo" | "goat" | "sheep";
  note?: string;
}
interface MilkLog {
  id: string;
  date: string; // YYYY-MM-DD
  animalId: string;
  am: number;
  pm: number;
}

const ANIMALS_KEY = "herd-animals-v1";
const MILK_KEY = "herd-milk-v1";

const SPECIES: { value: Animal["species"]; en: string; np: string }[] = [
  { value: "cattle", en: "Cow", np: "गाई" },
  { value: "buffalo", en: "Buffalo", np: "भैंसी" },
  { value: "goat", en: "Goat", np: "बाख्रा" },
  { value: "sheep", en: "Sheep", np: "भेडा" },
];

function load<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]") as T[];
  } catch {
    return [];
  }
}
function save(key: string, items: unknown[]) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    /* storage full / private mode */
  }
}
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const todayStr = () => new Date().toISOString().slice(0, 10);

function f(v: number, np: boolean, d = 0): string {
  const s = v.toFixed(d);
  return np ? toNepaliDigits(s) : s;
}

export function HerdTracker({ np }: { np: boolean }) {
  const [animals, setAnimals] = useState<Animal[]>(() => load<Animal>(ANIMALS_KEY));
  const [logs, setLogs] = useState<MilkLog[]>(() => load<MilkLog>(MILK_KEY));

  const [tag, setTag] = useState("");
  const [species, setSpecies] = useState<Animal["species"]>("cattle");
  const [note, setNote] = useState("");

  const [mAnimal, setMAnimal] = useState("");
  const [mDate, setMDate] = useState(todayStr());
  const [mAm, setMAm] = useState("");
  const [mPm, setMPm] = useState("");

  useEffect(() => save(ANIMALS_KEY, animals), [animals]);
  useEffect(() => save(MILK_KEY, logs), [logs]);
  useEffect(() => {
    if (!mAnimal && animals.length) setMAnimal(animals[0].id);
  }, [animals, mAnimal]);

  const addAnimal = () => {
    const clean = tag.trim();
    if (!clean) return;
    setAnimals((prev) => [...prev, { id: uid(), tag: clean, species, note: note.trim() || undefined }]);
    setTag("");
    setNote("");
  };
  const removeAnimal = (id: string) => {
    setAnimals((prev) => prev.filter((a) => a.id !== id));
    setLogs((prev) => prev.filter((l) => l.animalId !== id));
  };
  const addLog = () => {
    if (!mAnimal || (!mAm && !mPm)) return;
    const am = Math.max(0, Number(mAm) || 0);
    const pm = Math.max(0, Number(mPm) || 0);
    if (am + pm === 0) return;
    setLogs((prev) => [
      ...prev.filter((l) => !(l.date === mDate && l.animalId === mAnimal)),
      { id: uid(), date: mDate, animalId: mAnimal, am, pm },
    ]);
    setMAm("");
    setMPm("");
  };
  const removeLog = (id: string) => setLogs((prev) => prev.filter((l) => l.id !== id));

  const dayTotal = (date: string) =>
    logs.filter((l) => l.date === date).reduce((s, l) => s + l.am + l.pm, 0);

  const stats = useMemo(() => {
    const today = todayStr();
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const last7: { date: string; total: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      last7.push({ date: d, total: dayTotal(d) });
    }
    const weekTotal = last7.reduce((s, d) => s + d.total, 0);
    const milkAnimals = new Set(logs.map((l) => l.animalId)).size;
    return {
      today: dayTotal(today),
      yesterday: dayTotal(yesterday),
      avg7: weekTotal / 7,
      perMilker: milkAnimals > 0 ? weekTotal / 7 / milkAnimals : 0,
      milkAnimals,
      last7,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs]);

  const chart = useMemo(() => {
    // 14-day daily totals, simple SVG bars
    const days: { date: string; total: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      days.push({ date: d, total: dayTotal(d) });
    }
    const max = Math.max(1, ...days.map((d) => d.total));
    return { days, max };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs]);

  const exportCsv = () => {
    const lines: string[] = [];
    lines.push(np ? "मिति,पशु,प्रजाति,बिहान (लि),साँझ (लि),जम्मा (लि),टिपोट" : "Date,Animal,Species,Morning (L),Evening (L),Total (L),Note");
    const sorted = [...logs].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    for (const l of sorted) {
      const a = animals.find((x) => x.id === l.animalId);
      const sp = SPECIES.find((s) => s.value === (a?.species ?? "cattle"));
      lines.push([l.date, a?.tag ?? "?", sp ? (np ? sp.np : sp.en) : "", String(l.am), String(l.pm), String(l.am + l.pm), a?.note ?? ""].join(","));
    }
    const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const el = document.createElement("a");
    el.href = url;
    el.download = `herd-milk-${todayStr()}.csv`;
    document.body.appendChild(el);
    el.click();
    el.remove();
    URL.revokeObjectURL(url);
  };

  const animalLabel = (a: Animal) => {
    const sp = SPECIES.find((s) => s.value === a.species);
    return `${a.tag} · ${sp ? (np ? sp.np : sp.en) : ""}`;
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { Icon: Milk, label: np ? "आज जम्मा" : "Today total", val: `${f(stats.today, np, 1)} L` },
          { Icon: TrendingUp, label: np ? "७ दिनको औसत" : "7-day average", val: `${f(stats.avg7, np, 1)} L/d` },
          { Icon: Sigma, label: np ? "प्रति दुधालु" : "Per milker", val: `${f(stats.perMilker, np, 1)} L/d` },
        ].map(({ Icon, label, val }) => (
          <div key={label} className="rounded-2xl border-2 border-gray-100 bg-gray-50/70 p-3.5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-center gap-1">
              <Icon size={11} aria-hidden="true" />
              {label}
            </p>
            <p className="font-display text-xl sm:text-2xl font-bold text-[#0A2540] mt-1.5">{val}</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {animals.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center">
          <Beef size={30} className="mx-auto text-gray-300 mb-3" aria-hidden="true" />
          <p className="text-sm font-semibold text-[#0A2540] mb-1">
            {np ? "आफ्नो पशु थप्नुहोस्" : "Add your first animal"}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
            {np
              ? "तालिका र दुध अभिलेख यही ब्राउजरमा सुरक्षित राखिन्छ — कुनै खाता चाहिँदैन, CSV मा निर्यात गर्न सकिन्छ।"
              : "The ledger lives in this browser — no account needed, export to CSV any time."}
          </p>
        </div>
      )}

      {/* Add animal */}
      <div className="rounded-2xl border-2 border-gray-100 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#B8941F] mb-3 flex items-center gap-1.5">
          <Plus size={13} aria-hidden="true" />
          {np ? "पशु थप्नुहोस्" : "Add an animal"}
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="flex-1">
            <Label htmlFor="herd-tag" className="text-xs text-gray-500 mb-1">
              {np ? "ट्याग / नाम" : "Tag / name"}
            </Label>
            <Input
              id="herd-tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder={np ? "जस्तै: गाई १, भैंसी २…" : "e.g. Cow 1, Buffalo 2…"}
              className="rounded-xl border-2 border-gray-200 focus:border-[#D4AF37]"
              maxLength={30}
            />
          </div>
          <div className="sm:w-36">
            <Label htmlFor="herd-species" className="text-xs text-gray-500 mb-1">
              {np ? "प्रजाति" : "Species"}
            </Label>
            <select
              id="herd-species"
              value={species}
              onChange={(e) => setSpecies(e.target.value as Animal["species"])}
              className="w-full rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] px-3 py-2 text-sm font-semibold text-[#0A2540] bg-white h-10"
            >
              {SPECIES.map((s) => (
                <option key={s.value} value={s.value}>
                  {np ? s.np : s.en}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:w-40 flex items-end">
            <Button
              onClick={addAnimal}
              disabled={!tag.trim()}
              className="w-full bg-[#0A2540] hover:bg-[#1A3A5C] text-white font-semibold rounded-xl"
            >
              <Plus size={15} className="mr-1" aria-hidden="true" />
              {np ? "थप्नुहोस्" : "Add"}
            </Button>
          </div>
        </div>
      </div>

      {/* Animal list */}
      {animals.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#B8941F] flex items-center gap-1.5">
              <ClipboardList size={13} aria-hidden="true" />
              {np ? `मेरो पशु (${f(animals.length, np)})` : `My animals (${f(animals.length, np)})`}
            </p>
            {logs.length > 0 && (
              <Button onClick={exportCsv} variant="outline" size="sm" className="h-8 text-xs border-2 border-gray-200 hover:border-[#D4AF37] font-semibold">
                <Download size={13} className="mr-1" aria-hidden="true" />
                {np ? "CSV निर्यात" : "Export CSV"}
              </Button>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            <AnimatePresence initial={false}>
              {animals.map((a) => (
                <motion.div
                  key={a.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="rounded-xl border-2 border-gray-100 bg-gray-50/70 px-3.5 py-2.5 flex items-center gap-3"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 text-[#B8941F] flex items-center justify-center flex-shrink-0">
                    <Beef size={16} aria-hidden="true" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0A2540] truncate">{animalLabel(a)}</p>
                    {a.note && <p className="text-[11px] text-gray-400 truncate">{a.note}</p>}
                  </div>
                  <button
                    onClick={() => removeAnimal(a.id)}
                    className="w-7 h-7 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center flex-shrink-0 transition-colors"
                    aria-label={np ? `${a.tag} हटाउनुहोस्` : `Remove ${a.tag}`}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Milk entry */}
      {animals.length > 0 && (
        <div className="rounded-2xl border-2 border-gray-100 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#B8941F] mb-3 flex items-center gap-1.5">
            <Milk size={13} aria-hidden="true" />
            {np ? "दुध अभिलेख" : "Milk log"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="col-span-2">
              <Label htmlFor="milk-animal" className="text-xs text-gray-500 mb-1">
                {np ? "पशु" : "Animal"}
              </Label>
              <select
                id="milk-animal"
                value={mAnimal}
                onChange={(e) => setMAnimal(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] px-3 py-2 text-sm font-semibold text-[#0A2540] bg-white h-10"
              >
                {animals.map((a) => (
                  <option key={a.id} value={a.id}>
                    {animalLabel(a)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="milk-date" className="text-xs text-gray-500 mb-1">
                {np ? "मिति" : "Date"}
              </Label>
              <Input
                id="milk-date"
                type="date"
                value={mDate}
                max={todayStr()}
                onChange={(e) => setMDate(e.target.value)}
                className="rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] h-10"
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor="milk-am" className="text-xs text-gray-500 mb-1">
                  {np ? "बिहान (लि)" : "AM (L)"}
                </Label>
                <Input
                  id="milk-am"
                  type="number"
                  min={0}
                  step={0.25}
                  value={mAm}
                  onChange={(e) => setMAm(e.target.value)}
                  className="rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] h-10"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="milk-pm" className="text-xs text-gray-500 mb-1">
                  {np ? "साँझ (लि)" : "PM (L)"}
                </Label>
                <Input
                  id="milk-pm"
                  type="number"
                  min={0}
                  step={0.25}
                  value={mPm}
                  onChange={(e) => setMPm(e.target.value)}
                  className="rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] h-10"
                />
              </div>
            </div>
          </div>
          <Button
            onClick={addLog}
            disabled={!mAnimal || (!mAm && !mPm)}
            className="mt-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold rounded-xl"
          >
            <Plus size={15} className="mr-1" aria-hidden="true" />
            {np ? "अभिलेख थप्नुहोस्" : "Log entry"}
          </Button>
          <p className="text-[11px] text-gray-400 mt-2">
            {np ? "एउटै मितिको प्रविष्टि दोहोर्‍याए पुरानो ठाउँ लिन्छ।" : "Re-logging the same date replaces that day's entry for the animal."}
          </p>
        </div>
      )}

      {/* 14-day chart */}
      {logs.length > 0 && (
        <div className="rounded-2xl border-2 border-gray-100 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#B8941F] mb-4 flex items-center gap-1.5">
            <TrendingUp size={13} aria-hidden="true" />
            {np ? "१४ दिनको दुध उत्पादन (लिटर)" : "14-day milk yield (litres)"}
          </p>
          <div className="flex items-end gap-1.5 h-28" role="img" aria-label={np ? "१४ दिनको दैनिक दुध चार्ट" : "14-day daily milk chart"}>
            {chart.days.map((d) => (
              <div key={d.date} className="flex-1 h-full flex flex-col justify-end min-w-0" title={`${d.date}: ${f(d.total, np, 1)} L`}>
                {d.total > 0 && (
                  <p className="text-[9px] text-gray-400 font-semibold text-center mb-0.5">{f(d.total, np, 0)}</p>
                )}
                <div
                  className={`rounded-t-md ${d.total > 0 ? "bg-gradient-to-t from-[#B8941F] to-[#D4AF37]" : "bg-gray-100"}`}
                  style={{ height: `${Math.max(4, (d.total / chart.max) * 100)}%`, minHeight: 4 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-gray-400 mt-1.5">
            <span>{np ? toNepaliDigits("13") + " दिनअघि" : "13 days ago"}</span>
            <span>{np ? "आज" : "today"}</span>
          </div>
        </div>
      )}

      {/* Recent entries */}
      {logs.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#B8941F] mb-2.5">
            {np ? "पछिल्ला अभिलेखहरू" : "Recent entries"}
          </p>
          <ul className="space-y-2">
            {[...logs]
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .slice(0, 6)
              .map((l) => {
                const a = animals.find((x) => x.id === l.animalId);
                return (
                  <li key={l.id} className="rounded-xl border border-gray-100 bg-white px-3.5 py-2.5 flex items-center gap-3 text-sm">
                    <span className="font-semibold text-[#0A2540] min-w-0 truncate flex-1">
                      {a?.tag ?? "—"} <span className="text-gray-400 font-normal">· {np ? toNepaliDigits(l.date) : l.date}</span>
                    </span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {f(l.am, np, 1)} + {f(l.pm, np, 1)} = <b className="text-[#0A2540]">{f(l.am + l.pm, np, 1)} L</b>
                    </span>
                    <button
                      onClick={() => removeLog(l.id)}
                      className="w-6 h-6 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center flex-shrink-0 transition-colors"
                      aria-label={np ? "अभिलेख हटाउनुहोस्" : "Remove entry"}
                    >
                      <Trash2 size={13} aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}

      <p className="text-[11px] text-gray-400 leading-relaxed">
        {np
          ? "अभिलेख यही यन्त्रको ब्राउजरमा मात्र राखिन्छ — सरुवा गर्न CSV निर्यात प्रयोग गर्नुहोस्।"
          : "Records stay in this browser only — use Export CSV to move them anywhere."}
      </p>
    </div>
  );
}
