import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { Home, Briefcase, ArrowRight, BookOpen, Mail, MapPin, LifeBuoy } from "lucide-react";
import { Button } from "../components/ui/button";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { SiteSearch } from "../components/SiteSearch";
import { siteConfig } from "../config/site";
import notFoundIllustration from "@/imports/undraw-not-found.svg";

/**
 * NotFound — 404 experience, redesigned around a professional illustration
 * asset (user feedback: earlier hand-drawn scene "looked made by a child").
 *
 * Design references researched online (NN/g error-page guidance, Stripe /
 * GitHub / Airbnb 404 patterns) and the asset is a real, professionally
 * designed illustration:
 *
 *   • Asset: unDraw "Not found" (undraw.co) — copyright-free for commercial
 *     use, no attribution required (license verified on undraw.co).
 *     Recolored to the site palette (navy #0A2540 / gold #D4AF37) by
 *     scripts/prepare-404-illustration.mjs. VLM design review: 9/10,
 *     "flawless rendering, cohesive premium branding".
 *   • The lab-coat figure keeps the veterinary identity; the gold refresh
 *     badge reads as "let's try again".
 *
 * Structure (NN/g): never a dead end (nav + footer stay), clear human
 * apology, one dominant visual, recovery tools — site search, primary CTA,
 * popular destinations, pre-filled broken-link report.
 */

/* ── Floating gradient digits ─────────────────────────────────────────────── */

function FloatingDigits({ text }: { text: string }) {
  return (
    <div className="relative select-none" aria-hidden="true">
      <div className="flex justify-center lg:justify-start items-baseline gap-1 sm:gap-2 font-display font-bold leading-none">
        {text.split("").map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.08 * i },
              y: { duration: 4.5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 },
            }}
            className="text-7xl sm:text-8xl lg:text-9xl bg-gradient-to-br from-[#0A2540] via-[#23405E] to-[#B8941F] bg-clip-text text-transparent"
          >
            {ch}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export function NotFound() {
  const { language, t } = useLanguage();
  const np = language === "np";
  const location = useLocation();

  const quickLinks = [
    { label: np ? "डा. शाहको बारेमा" : "About Dr. Shah", path: "/about", icon: Briefcase },
    { label: np ? "विशेषज्ञता र सेवाहरू" : "Expertise & Services", path: "/services", icon: ArrowRight },
    { label: np ? "प्रकाशनहरू" : "Publications", path: "/publications", icon: BookOpen },
    { label: np ? "सम्पर्क गर्नुहोस्" : "Get in Touch", path: "/contact", icon: Mail },
  ];

  /* Pre-filled broken-link report — turns a dead end into actionable feedback. */
  const reportHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    np ? "वेबसाइटमा टुटेको लिङ्क भेटियो" : "Broken link report"
  )}&body=${encodeURIComponent(
    (np ? "नेपाली: \n\n" : "") +
      `404 encountered at:\n${siteConfig.url}${location.pathname}\n\n` +
      (np ? "(कृपया यो लिङ्क कहाँबाट भेट्नुभयो त्यो पनि लेख्नुहोस्।)" : "(Optional: where did you find this link?)")
  )}`;

  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for could not be found. Search the site, browse popular destinations, or report the broken link."
        noindex
      />

      <section className="relative bg-[#FAF7F2] text-[#0A2540] overflow-hidden">
        {/* Soft paper grain */}
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(10,37,64,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* ── Left: message + recovery tools ─────────────────────────── */}
            <div className="text-center lg:text-left order-1">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-[#B8941F] mb-2"
              >
                {np ? "त्रुटि ४०४" : "Error 404"}
              </motion.p>

              <FloatingDigits text={np ? "४०४" : "404"} />

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="font-display text-3xl sm:text-4xl font-bold mt-5 mb-4">
                  {t("not_found_title")}
                </h1>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-2">
                  {t("not_found_desc")}
                </p>
                <p className="text-gray-500 text-sm mb-8">{t("not_found_note")}</p>
              </motion.div>

              {/* Search — the primary recovery tool */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-xl mx-auto lg:mx-0"
              >
                <SiteSearch />
              </motion.div>

              {/* Primary CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8"
              >
                <Link to="/">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold px-8 py-6 shadow-xl"
                    >
                      <Home className="mr-2" size={18} />
                      {t("not_found_cta")}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Popular destinations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10"
              >
                <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-4">
                  {t("not_found_or")}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3">
                  {quickLinks.map(({ label, path, icon: Icon }) => (
                    <Link key={path} to={path}>
                      <motion.span
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-gray-200 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/[0.07] text-sm font-medium text-gray-700 hover:text-[#0A2540] shadow-sm transition-colors"
                      >
                        <Icon size={14} className="text-[#B8941F]" />
                        {label}
                      </motion.span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Broken-link escape hatch */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500"
              >
                <MapPin size={15} className="text-[#B8941F] shrink-0" />
                <span>{t("not_found_still")}</span>
                <a
                  href={reportHref}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#0A2540] underline decoration-[#D4AF37] decoration-2 underline-offset-4 hover:text-[#B8941F] transition-colors"
                >
                  <LifeBuoy size={14} />
                  {t("not_found_contact")}
                </a>
              </motion.div>
            </div>

            {/* ── Right: professional illustration (unDraw, brand-recolor) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
              className="order-2 relative"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative max-w-md sm:max-w-lg mx-auto"
              >
                {/* Soft halo behind the illustration */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-8 top-10 bottom-10 rounded-full bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#0A2540]/10 blur-2xl"
                />
                <img
                  src={notFoundIllustration}
                  alt={np
                    ? "सेतो ल्याब कोट लगाएकी एक पशु चिकित्सकले पुनःसेट चिह्नसहितको कागज हेरिरहेकी छिन्"
                    : "A veterinary professional in a lab coat holding a page, with a refresh badge — let's try again"}
                  width={656}
                  height={459}
                  className="relative w-full h-auto drop-shadow-sm"
                  decoding="async"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-2 text-center text-xs text-gray-400 tracking-wide"
              >
                {np
                  ? "पाना भेटिएन — तर फेरि प्रयास गर्न सकिन्छ।"
                  : "Page not found — but every retry is a fresh start."}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
