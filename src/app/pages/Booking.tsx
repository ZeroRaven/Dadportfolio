import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Stethoscope, Syringe, Wheat, Activity, GraduationCap, PawPrint,
  Building2, Tractor, PhoneCall, ArrowLeft, ArrowRight, CheckCircle2,
  CalendarCheck, User, MessageCircle, Home, Siren, Pencil,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { OpenStatusChip } from "../components/OpenStatusChip";
import { siteConfig, telLink, whatsappLink } from "../config/site";
import { toNepaliDigits } from "../i18n/format";

/* ─────────────────────────────────────────────────────────────────────────────
 *  BOOKING WIZARD — a real site function, not just a section.
 *  4 guided steps (service → schedule → details → review), per-step
 *  validation, a draft auto-saved to localStorage, and a WhatsApp/mailto
 *  handoff with a fully structured bilingual request message.
 * ──────────────────────────────────────────────────────────────────────────── */

const SERVICES = [
  { value: "consult",     icon: Stethoscope,   en: "General consultation",        np: "सामान्य परामर्श",
    descEn: "Health check, advice, routine matters",       descNp: "स्वास्थ्य जाँच, सल्लाह र नियमित काम" },
  { value: "vaccination", icon: Syringe,       en: "Vaccination & prevention",     np: "खोप तथा रोगथाम",
    descEn: "FMD, HS, anthrax & routine shots",            descNp: "एफएमडी, एचएस, एन्थ्राक्स लगायत" },
  { value: "nutrition",   icon: Wheat,         en: "Nutrition & feed planning",    np: "पोषण र दाना योजना",
    descEn: "Rations, minerals, feed budgets",             descNp: "खाना, खनिज र दाना लागत" },
  { value: "disease",     icon: Activity,      en: "Disease diagnosis & treatment", np: "रोग निदान र उपचार",
    descEn: "Sick animals, outbreaks, follow-ups",         descNp: "बिरामी पशु, रोग प्रकोप, फलोअप" },
  { value: "training",    icon: GraduationCap, en: "Training & workshops",        np: "तालिम र कार्यशाला",
    descEn: "Farmer groups, cooperatives, projects",       descNp: "किसान समूह, सहकारी, परियोजना" },
  { value: "other",       icon: PawPrint,      en: "Something else",              np: "अन्य काम",
    descEn: "Documents, reports, partnerships",            descNp: "कागजात, प्रतिवेदन, साझेदारी" },
] as const;

const ANIMALS = [
  { value: "cattle",  en: "Cattle / Buffalo", np: "गाई / भैंसी" },
  { value: "goat",    en: "Goat / Sheep",     np: "बाख्रा / भेडा" },
  { value: "poultry", en: "Poultry",          np: "कुखुरा" },
  { value: "pig",     en: "Pig",              np: "सुँगुर" },
  { value: "pet",     en: "Dog / Cat",        np: "कुकुर / बिरालो" },
  { value: "other",   en: "Other / Mixed",    np: "अन्य / मिश्रित" },
] as const;

const VISIT_TYPES = [
  { value: "clinic", icon: Building2, en: "Clinic visit",      np: "क्लिनिक आगमन" },
  { value: "farm",   icon: Tractor,   en: "On-farm visit",     np: "फारम भ्रमण" },
  { value: "remote", icon: PhoneCall, en: "Phone / WhatsApp",  np: "फोन / व्हाट्सएप" },
] as const;

const TIME_SLOTS = [
  { value: "morning",   en: "Morning · 9–12",   np: "बिहान · ९–१२" },
  { value: "midday",    en: "Midday · 12–2",    np: "मध्याह्न · १२–२" },
  { value: "afternoon", en: "Afternoon · 2–5",  np: "साँझ · २–५" },
] as const;

interface Draft {
  service: string;
  animal: string;
  visitType: string;
  date: string;
  slot: string;
  name: string;
  phone: string;
  location: string;
  notes: string;
}

const EMPTY_DRAFT: Draft = {
  service: "", animal: "", visitType: "", date: "", slot: "",
  name: "", phone: "", location: "", notes: "",
};

const DRAFT_KEY = "booking-draft-v1";

function loadDraft(): Draft {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return EMPTY_DRAFT;
    return { ...EMPTY_DRAFT, ...JSON.parse(raw) } as Draft;
  } catch {
    return EMPTY_DRAFT;
  }
}

const TODAY = new Date();
const ISO = (d: Date) => d.toISOString().slice(0, 10);
const MIN_DATE = ISO(TODAY);
const MAX_DATE = ISO(new Date(TODAY.getTime() + 90 * 86400_000));

export function Booking() {
  const { language } = useLanguage();
  const np = language === "np";
  const num = (n: number | string) => (np ? toNepaliDigits(n) : String(n));

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(loadDraft);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Auto-save the draft — refreshes / accidents never lose the visitor's place.
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* storage unavailable — the wizard still works, just without resume */
    }
  }, [draft]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setError(null);
  };

  const animal = ANIMALS.find((a) => a.value === draft.animal);
  const service = SERVICES.find((s) => s.value === draft.service);
  const visitType = VISIT_TYPES.find((v) => v.value === draft.visitType);
  const slot = TIME_SLOTS.find((s) => s.value === draft.slot);

  const prettyDate = () => {
    if (!draft.date) return "—";
    return np ? toNepaliDigits(draft.date) : draft.date;
  };

  /* ── Per-step validation ──────────────────────────────────────────────── */
  const stepValid = (n: number): string | null => {
    if (n === 0 && !draft.service)
      return np ? "कृपया एउटा सेवा छान्नुहोस्।" : "Please choose a service to continue.";
    if (n === 1) {
      if (!draft.animal) return np ? "कृपया पशुको प्रकार छान्नुहोस्।" : "Please choose the animal type.";
      if (!draft.visitType) return np ? "कृपया भ्रमणको प्रकार छान्नुहोस्।" : "Please choose a visit type.";
      if (!draft.date) return np ? "कृपया मनपर्ने मिति रोज्नुहोस्।" : "Please pick a preferred date.";
      if (draft.date < MIN_DATE || draft.date > MAX_DATE)
        return np ? "मिति आजदेखि ९० दिनभित्रको हुनुपर्छ।" : "The date must be within the next 90 days.";
      if (!draft.slot) return np ? "कृपया समय रोज्नुहोस्।" : "Please choose a time preference.";
    }
    if (n === 2) {
      if (draft.name.trim().length < 2)
        return np ? "कृपया आफ्नो पूरा नाम लेख्नुहोस्।" : "Please enter your full name.";
      const digits = draft.phone.replace(/\D/g, "");
      if (digits.length < 7 || digits.length > 15)
        return np ? "फोन नम्बर मिल्दो छैन (७–१५ अङ्क)।" : "That phone number doesn't look right (7–15 digits).";
    }
    return null;
  };

  const next = () => {
    const err = stepValid(step);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  /* ── Structured WhatsApp / mailto handoff ─────────────────────────────── */
  const messageBody = () => {
    if (np) {
      return [
        "नमस्ते डा. शाह, वेबसाइटबाट परामर्श बुकिङ अनुरोध:",
        "",
        `नाम: ${draft.name}`,
        `फोन: ${draft.phone}`,
        `स्थान: ${draft.location || "—"}`,
        `पशुको प्रकार: ${animal?.np ?? "—"}`,
        `चाहिने सेवा: ${service?.np ?? "—"}`,
        `भ्रमणको प्रकार: ${visitType?.np ?? "—"}`,
        `मनपर्ने मिति: ${prettyDate()}`,
        `समय: ${slot?.np ?? "—"}`,
        `टिप्पणी: ${draft.notes.trim() || "—"}`,
      ].join("\n");
    }
    return [
      "Hello Dr. Shah, a consultation request from the website:",
      "",
      `Name: ${draft.name}`,
      `Phone: ${draft.phone}`,
      `Location: ${draft.location || "—"}`,
      `Animal type: ${animal?.en ?? "—"}`,
      `Service needed: ${service?.en ?? "—"}`,
      `Visit type: ${visitType?.en ?? "—"}`,
      `Preferred date: ${prettyDate()}`,
      `Time preference: ${slot?.en ?? "—"}`,
      `Notes: ${draft.notes.trim() || "—"}`,
    ].join("\n");
  };

  const sendRequest = () => {
    const wa = whatsappLink(messageBody());
    if (wa) {
      window.open(wa, "_blank", "noopener,noreferrer");
    } else {
      const subject = encodeURIComponent(np ? "परामर्श बुकिङ अनुरोध" : "Consultation booking request");
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(messageBody())}`;
    }
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setDraft(EMPTY_DRAFT);
    setStep(0);
    setDone(false);
    setError(null);
  };

  const steps = [
    { en: "Service", np: "सेवा" },
    { en: "Schedule", np: "तालिका" },
    { en: "Details", np: "विवरण" },
    { en: "Confirm", np: "पुष्टि" },
  ];

  return (
    <>
      <SEO
        title="Book a Consultation"
        description="Book a veterinary consultation with Dr. Mogal Prasad Shah — livestock health, vaccination, nutrition and training. Choose a service, pick a time, and send your request in under a minute."
        keywords="book veterinary consultation, livestock advisor appointment, vet consultation Nepal, animal health visit, Dr. Mogal Shah booking, पशु परामर्श बुकिङ"
        path="/booking"
      />
      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Header band */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white pt-28 pb-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-[#D4AF37]/30"
            >
              <CalendarCheck className="text-[#D4AF37]" size={16} />
              <span className="text-sm font-medium">
                {np ? "चार चरणमा बुकिङ — १ मिनेटभित्र" : "Four quick steps · under a minute"}
              </span>
            </motion.div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {np ? "परामर्श बुक गर्नुहोस्" : "Book a Consultation"}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mb-5 leading-relaxed">
              {np
                ? "सेवा छान्नुहोस्, समय मिलाउनुहोस्, विवरण दिनुहोस् — अनुरोध सिधै व्हाट्सएपमा तयार हुन्छ।"
                : "Pick a service, choose a time, share your details — your request opens ready-to-send on WhatsApp."}
            </p>
            <OpenStatusChip />
          </div>
        </div>

        {/* Wizard */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {done ? (
                  /* ── Success ────────────────────────────────────────────── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="text-emerald-600" size={40} />
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0A2540] mb-3">
                      {np ? "बुकिङ अनुरोध तयार भयो!" : "Your request is ready!"}
                    </h2>
                    <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
                      {np
                        ? "व्हाट्सएप नयाँ ट्याबमा खुलेको हुनुपर्छ — सन्देशमा तपाईंको सबै विवरण पहिले नै भरिएको छ, पठाउनुहोस् र भित्र २४ घण्टामा जवाफ पाउनुहुनेछ।"
                        : "WhatsApp should have opened in a new tab with every detail pre-filled — just press send and you'll hear back within 24 hours."}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {(() => {
                        const wa = whatsappLink(messageBody());
                        return wa ? (
                          <a href={wa} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-[#25D366] hover:bg-[#1FB857] text-white font-semibold px-6">
                              <MessageCircle className="mr-2" size={18} />
                              {np ? "फेरि व्हाट्सएपमा खोल्नुहोस्" : "Open WhatsApp again"}
                            </Button>
                          </a>
                        ) : null;
                      })()}
                      <Button variant="outline" onClick={reset} className="font-semibold px-6">
                        {np ? "नयाँ अनुरोध" : "New request"}
                      </Button>
                      <Link to="/">
                        <Button variant="ghost" className="font-semibold px-6">
                          <Home className="mr-2" size={18} />
                          {np ? "गृहपृष्ठ" : "Home"}
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="wizard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Stepper */}
                    <div className="flex items-center justify-between mb-8 sm:mb-10">
                      {steps.map((s, i) => {
                        const active = i === step;
                        const complete = i < step;
                        return (
                          <div key={s.en} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-1.5">
                              <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                                  complete
                                    ? "bg-[#D4AF37] border-[#D4AF37] text-[#0A2540]"
                                    : active
                                    ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10"
                                    : "border-gray-200 text-gray-400 bg-white"
                                }`}
                              >
                                {complete ? <CheckCircle2 size={18} /> : num(i + 1)}
                              </div>
                              <span
                                className={`text-[11px] sm:text-xs font-medium whitespace-nowrap ${
                                  active ? "text-[#0A2540]" : "text-gray-400"
                                }`}
                              >
                                {np ? s.np : s.en}
                              </span>
                            </div>
                            {i < steps.length - 1 && (
                              <div className={`h-0.5 flex-1 mx-2 sm:mx-3 rounded ${i < step ? "bg-[#D4AF37]" : "bg-gray-200"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Step content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.25 }}
                      >
                        {step === 0 && (
                          /* ── Step 1 · Service ─────────────────────────── */
                          <fieldset>
                            <legend className="font-display text-xl sm:text-2xl font-bold text-[#0A2540] mb-2">
                              {np ? "कुन सेवा चाहिन्छ?" : "What do you need?"}
                            </legend>
                            <p className="text-sm text-gray-500 mb-6">
                              {np ? "तपाईंको पशु वा परियोजनाका लागि उपयुक्त छान्नुहोस्।" : "Pick what fits your animals or your project."}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {SERVICES.map(({ value, icon: Icon, en, np: npLabel, descEn, descNp }) => {
                                const selected = draft.service === value;
                                return (
                                  <button
                                    key={value}
                                    type="button"
                                    onClick={() => set("service", value)}
                                    aria-pressed={selected}
                                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                                      selected
                                        ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-md"
                                        : "border-gray-200 bg-white hover:border-[#D4AF37]/50 hover:shadow-sm"
                                    }`}
                                  >
                                    <div className="flex items-center gap-3 mb-1.5">
                                      <span
                                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                          selected ? "bg-[#D4AF37] text-[#0A2540]" : "bg-gray-100 text-[#0A2540]"
                                        }`}
                                      >
                                        <Icon size={18} />
                                      </span>
                                      <span className="font-semibold text-[#0A2540] text-sm sm:text-base">
                                        {np ? npLabel : en}
                                      </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500 pl-12">{np ? descNp : descEn}</p>
                                  </button>
                                );
                              })}
                            </div>
                          </fieldset>
                        )}

                        {step === 1 && (
                          /* ── Step 2 · Schedule ────────────────────────── */
                          <div className="space-y-7">
                            <div>
                              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A2540] mb-2">
                                {np ? "कुन पशु, कहाँ, कहिले?" : "Which animals, where and when?"}
                              </h2>
                              <p className="text-sm text-gray-500 mb-6">
                                {np ? "भ्रमणको प्रकार र सहज समय रोज्नुहोस्।" : "Choose the visit type and a comfortable time."}
                              </p>
                            </div>

                            {/* Animal type */}
                            <div>
                              <Label className="text-sm font-semibold text-[#0A2540] mb-3 block">
                                {np ? "पशुको प्रकार" : "Animal type"}
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {ANIMALS.map((a) => (
                                  <button
                                    key={a.value}
                                    type="button"
                                    onClick={() => set("animal", a.value)}
                                    aria-pressed={draft.animal === a.value}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                                      draft.animal === a.value
                                        ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#0A2540]"
                                        : "border-gray-200 text-gray-600 hover:border-[#D4AF37]/50"
                                    }`}
                                  >
                                    {np ? a.np : a.en}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Visit type */}
                            <div>
                              <Label className="text-sm font-semibold text-[#0A2540] mb-3 block">
                                {np ? "भ्रमणको प्रकार" : "Visit type"}
                              </Label>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {VISIT_TYPES.map(({ value, icon: Icon, en, np: npLabel }) => {
                                  const selected = draft.visitType === value;
                                  return (
                                    <button
                                      key={value}
                                      type="button"
                                      onClick={() => set("visitType", value)}
                                      aria-pressed={selected}
                                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                        selected
                                          ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-md"
                                          : "border-gray-200 hover:border-[#D4AF37]/50"
                                      }`}
                                    >
                                      <Icon size={20} className={selected ? "text-[#B8941F]" : "text-gray-400"} />
                                      <span className="text-sm font-medium text-[#0A2540]">{np ? npLabel : en}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Date */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="booking-date" className="text-sm font-semibold text-[#0A2540] mb-2 block">
                                  {np ? "मनपर्ने मिति" : "Preferred date"}
                                </Label>
                                <Input
                                  id="booking-date"
                                  type="date"
                                  min={MIN_DATE}
                                  max={MAX_DATE}
                                  value={draft.date}
                                  onChange={(e) => set("date", e.target.value)}
                                  className="border-2 border-gray-200 focus:border-[#D4AF37] rounded-xl"
                                />
                              </div>
                              {/* Time slot */}
                              <div>
                                <Label className="text-sm font-semibold text-[#0A2540] mb-2 block">
                                  {np ? "समय (नेपाल समय)" : "Time preference (NPT)"}
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                  {TIME_SLOTS.map((s) => (
                                    <button
                                      key={s.value}
                                      type="button"
                                      onClick={() => set("slot", s.value)}
                                      aria-pressed={draft.slot === s.value}
                                      className={`px-3.5 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                                        draft.slot === s.value
                                          ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#0A2540]"
                                          : "border-gray-200 text-gray-600 hover:border-[#D4AF37]/50"
                                      }`}
                                    >
                                      {np ? s.np : s.en}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          /* ── Step 3 · Details ─────────────────────────── */
                          <div className="space-y-6">
                            <div>
                              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A2540] mb-2">
                                {np ? "तपाईंको विवरण" : "Your details"}
                              </h2>
                              <p className="text-sm text-gray-500">
                                {np ? "जवाफ दिन मात्र प्रयोग हुन्छ — अरू कतै पठाइँदैन।" : "Used only to get back to you — never shared."}
                              </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="bk-name" className="text-sm font-semibold text-[#0A2540] mb-2 block">
                                  {np ? "पूरा नाम *" : "Full name *"}
                                </Label>
                                <Input
                                  id="bk-name"
                                  value={draft.name}
                                  onChange={(e) => set("name", e.target.value)}
                                  placeholder={np ? "जस्तै: राम बहादुर थापा" : "e.g. Ram Bahadur Thapa"}
                                  className="border-2 border-gray-200 focus:border-[#D4AF37] rounded-xl"
                                />
                              </div>
                              <div>
                                <Label htmlFor="bk-phone" className="text-sm font-semibold text-[#0A2540] mb-2 block">
                                  {np ? "फोन / मोबाइल *" : "Phone / Mobile *"}
                                </Label>
                                <Input
                                  id="bk-phone"
                                  type="tel"
                                  inputMode="tel"
                                  value={draft.phone}
                                  onChange={(e) => set("phone", e.target.value)}
                                  placeholder={np ? "जस्तै: ९८XXXXXXXX" : "e.g. 98XXXXXXXX"}
                                  className="border-2 border-gray-200 focus:border-[#D4AF37] rounded-xl"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="bk-location" className="text-sm font-semibold text-[#0A2540] mb-2 block">
                                {np ? "जिल्ला / ठेगाना" : "District / Location"}
                              </Label>
                              <Input
                                id="bk-location"
                                value={draft.location}
                                onChange={(e) => set("location", e.target.value)}
                                placeholder={np ? "जस्तै: काभ्रे, बनेपा" : "e.g. Kavre, Banepa"}
                                className="border-2 border-gray-200 focus:border-[#D4AF37] rounded-xl"
                              />
                            </div>
                            <div>
                              <Label htmlFor="bk-notes" className="text-sm font-semibold text-[#0A2540] mb-2 block">
                                {np ? "थप जानकारी" : "Anything else? "}
                              </Label>
                              <Textarea
                                id="bk-notes"
                                rows={4}
                                value={draft.notes}
                                onChange={(e) => set("notes", e.target.value)}
                                placeholder={
                                  np
                                    ? "पशुको संख्या, लक्षण, विशेष अवस्था…"
                                    : "Number of animals, symptoms, special context…"
                                }
                                className="border-2 border-gray-200 focus:border-[#D4AF37] rounded-xl"
                              />
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          /* ── Step 4 · Review ──────────────────────────── */
                          <div>
                            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A2540] mb-2">
                              {np ? "जाँच गरेर पठाउनुहोस्" : "Review and send"}
                            </h2>
                            <p className="text-sm text-gray-500 mb-6">
                              {np ? "सबै ठीक छ? पुष्टि गर्नुहोस् — अनुरोध व्हाट्सएपमा खुल्छ।" : "Everything look right? Confirm and the request opens on WhatsApp."}
                            </p>
                            <div className="rounded-2xl border-2 border-gray-100 divide-y divide-gray-100 bg-gray-50/50">
                              {[
                                { labelEn: "Service", labelNp: "सेवा", value: np ? service?.np : service?.en, editStep: 0 },
                                { labelEn: "Animal type", labelNp: "पशुको प्रकार", value: np ? animal?.np : animal?.en, editStep: 1 },
                                { labelEn: "Visit type", labelNp: "भ्रमणको प्रकार", value: np ? visitType?.np : visitType?.en, editStep: 1 },
                                { labelEn: "Preferred date", labelNp: "मनपर्ने मिति", value: prettyDate(), editStep: 1 },
                                { labelEn: "Time preference", labelNp: "समय", value: np ? slot?.np : slot?.en, editStep: 1 },
                                { labelEn: "Your name", labelNp: "तपाईंको नाम", value: draft.name, editStep: 2 },
                                { labelEn: "Phone", labelNp: "फोन", value: np ? toNepaliDigits(draft.phone) : draft.phone, editStep: 2 },
                                { labelEn: "Location", labelNp: "ठेगाना", value: draft.location || "—", editStep: 2 },
                              ].map((row) => (
                                <div key={row.labelEn} className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3">
                                  <span className="text-xs sm:text-sm text-gray-500 font-medium flex-shrink-0">
                                    {np ? row.labelNp : row.labelEn}
                                  </span>
                                  <span className="text-sm font-semibold text-[#0A2540] text-right truncate">
                                    {row.value || "—"}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setStep(row.editStep)}
                                    className="text-gray-400 hover:text-[#B8941F] flex-shrink-0"
                                    aria-label={np ? "सम्पादन गर्नुहोस्" : "Edit"}
                                  >
                                    <Pencil size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Error message */}
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-5 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3"
                        role="alert"
                      >
                        {error}
                      </motion.p>
                    )}

                    {/* Footer controls */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-3">
                      <Button
                        variant="ghost"
                        onClick={back}
                        disabled={step === 0}
                        className="font-semibold text-gray-600"
                      >
                        <ArrowLeft className="mr-1" size={16} />
                        {np ? "पछाडि" : "Back"}
                      </Button>
                      {step < 3 ? (
                        <Button
                          onClick={next}
                          className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold px-7"
                        >
                          {np ? "अगाडि" : "Continue"}
                          <ArrowRight className="ml-1" size={16} />
                        </Button>
                      ) : (
                        <Button
                          onClick={sendRequest}
                          className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold px-7"
                        >
                          <MessageCircle className="mr-2" size={16} />
                          {np ? "पुष्टि र पठाउनुहोस्" : "Confirm & Send"}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Emergency shortcut */}
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 px-4 py-3.5">
            <Siren className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-red-800 leading-relaxed">
              {np ? "आकस्मिक अवस्था? कुरै नगरी सिधै फोन गर्नुहोस् — " : "Emergency? Skip the form and call directly — "}
              {(() => {
                const tel = telLink();
                return tel ? (
                  <a href={tel} className="font-bold underline underline-offset-2">
                    {np ? toNepaliDigits(siteConfig.phone) : siteConfig.phone}
                  </a>
                ) : (
                  <span>{siteConfig.phone}</span>
                );
              })()}
            </p>
          </div>

          <p className="mt-5 text-center text-xs text-gray-400">
            <User className="inline mr-1" size={12} />
            {np
              ? "तपाईंको ड्राफ्ट यो ब्राउजरमा स्वतः सुरक्षित हुन्छ — पृष्ठ फेरबदल गरे पनि हराँदैन।"
              : "Your answers are auto-saved in this browser — close the tab and pick up right where you left off."}
          </p>
        </div>
      </div>
    </>
  );
}
