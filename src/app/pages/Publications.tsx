import {
  GraduationCap,
  BookOpen,
  FileText,
  Award,
  Presentation,
  Landmark,
  ScrollText,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router";
import { useLanguage } from "../context/LanguageContext";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PUBLICATIONS PAGE
 *  ─────────────────────────────────────────────────────────────────────────────
 *  Academic credentials below are VERIFIED (Tribhuvan University records,
 *  LinkedIn). The "Professional & Technical Contributions" entries are
 *  representative of the roles documented on this site —
 *
 *  ➤ EDIT HERE: replace/extend the `contributionsEn` / `contributionsNp`
 *    arrays with Dr. Shah's full publication list (journal papers, training
 *    manuals, policy briefs, conference presentations).
 * ─────────────────────────────────────────────────────────────────────────────
 */

const academicsEn = [
  {
    icon: GraduationCap,
    title: "M.Sc. Animal Nutrition",
    org: "Tribhuvan University, Nepal · 2010",
    detail:
      "Thesis research on nutritional evaluation of Brachiaria hybrid forage for improving livestock feed systems in Nepalese farming conditions.",
  },
  {
    icon: BookOpen,
    title: "B.V.Sc. & A.H.",
    org: "Tribhuvan University, Nepal · 1996",
    detail:
      "Bachelor of Veterinary Science and Animal Husbandry — the foundation of a 29+ year career in livestock health and development.",
  },
  {
    icon: Award,
    title: "Postgraduate Diploma",
    org: "The Netherlands · Research Programme",
    detail:
      "Specialised training completed in the Netherlands, bringing international best practice into every subsequent field intervention.",
  },
];

const academicsNp = [
  {
    icon: GraduationCap,
    title: "एम.एस्सी. पशु पोषण",
    org: "त्रिभुवन विश्वविद्यालय, नेपाल · २०१०",
    detail:
      "नेपाली कृषि प्रणालीमा पशुआहार सुधारका लागि ब्राकिआरिया हाइब्रिड घाँसको पोषणीय मूल्याङ्कनमा आधारित शोधपत्र।",
  },
  {
    icon: BookOpen,
    title: "बी.भी.एस्सी. र ए.एच.",
    org: "त्रिभुवन विश्वविद्यालय, नेपाल · १९९६",
    detail:
      "पशु चिकित्सा विज्ञान र पशुपालन स्नातक — २९ वर्षभन्दा लामो पशुपालन विकास करियरको आधार।",
  },
  {
    icon: Award,
    title: "स्नातकोत्तर डिप्लोमा",
    org: "नेदरल्यान्ड्स · अनुसन्धान कार्यक्रम",
    detail:
      "नेदरल्यान्ड्समा सम्पन्न विशेष प्रशिक्षण — अन्तर्राष्ट्रिय उत्तम अभ्यासलाई क्षेत्रीय कार्यमा उतार्ने अवसर।",
  },
];

/* ➤ EDIT HERE: Dr. Shah's publications & technical outputs. */
const contributionsEn = [
  {
    icon: FileText,
    kind: "Research",
    title: "Nutritional evaluation of Brachiaria hybrid forage under Nepalese farm conditions",
    venue: "M.Sc. Thesis · Tribhuvan University",
    year: "2010",
  },
  {
    icon: ScrollText,
    kind: "Policy",
    title: "Livestock development policy formulation for infectious & zoonotic disease control",
    venue: "Bagamati Province Government · Task-force lead",
    year: "2022",
  },
  {
    icon: Presentation,
    kind: "Training",
    title: "Capacity-building programmes for livestock officers and farmer entrepreneurship",
    venue: "Directorate of Livestock & Fisheries Development",
    year: "Ongoing",
  },
  {
    icon: Landmark,
    kind: "Strategy",
    title: "Self-sufficiency strategies for milk, meat and egg production in Bagamati Province",
    venue: "Provincial planning & monitoring programme",
    year: "2022",
  },
];

const contributionsNp = [
  {
    icon: FileText,
    kind: "अनुसन्धान",
    title: "नेपाली कृषि अवस्थामा ब्राकिआरिया हाइब्रिड घाँसको पोषणीय मूल्याङ्कन",
    venue: "एम.एस्सी. शोधपत्र · त्रिभुवन विश्वविद्यालय",
    year: "२०१०",
  },
  {
    icon: ScrollText,
    kind: "नीति",
    title: "संक्रामक तथा जुन्नुरोग नियन्त्रणका लागि पशुपालन विकास नीति निर्माण",
    venue: "बागमती प्रदेश सरकार · कार्यदल संयोजक",
    year: "२०२२",
  },
  {
    icon: Presentation,
    kind: "तालिम",
    title: "पशुपालन अधिकृत र कृषक उद्यमशीलताका क्षमता विकास कार्यक्रमहरू",
    venue: "पशुपालन तथा मत्स्य विकास निदेशालय",
    year: "निरन्तर",
  },
  {
    icon: Landmark,
    kind: "रणनीति",
    title: "बागमती प्रदेशमा दूध, मासु र अण्डा आत्मनिर्भरता रणनीति",
    venue: "प्रदेश स्तरीय योजना तथा अनुगमन कार्यक्रम",
    year: "२०२२",
  },
];

const kindColor: Record<string, string> = {
  Research: "bg-[#0A2540]/10 text-[#0A2540]",
  Policy: "bg-[#D4AF37]/15 text-[#8a6d1a]",
  Training: "bg-emerald-500/10 text-emerald-700",
  Strategy: "bg-blue-500/10 text-blue-700",
};

export function Publications() {
  const { language } = useLanguage();
  const np = language === "np";
  const academics = np ? academicsNp : academicsEn;
  const contributions = np ? contributionsNp : contributionsEn;

  return (
    <>
      <SEO
        title={np ? "प्रकाशनहरू र अनुसन्धान" : "Publications & Research"}
        description={
          np
            ? "डा. मोगल प्रसाद शाहका शैक्षिक योग्यता, अनुसन्धान र प्राविधिक योगदानहरू — ब्राकिआरिया घाँस अनुसन्धानदेखि प्रदेश स्तरीय पशुपालन नीति सम्म।"
            : "Dr. Mogal Prasad Shah's academic credentials, research and technical contributions — from Brachiaria forage research to provincial livestock policy formulation."
        }
        keywords="publications, research, Brachiaria forage, animal nutrition Nepal, livestock policy, veterinary research"
        path="/publications"
      />

      <div className="pt-20">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-[#0A2540] via-[#1A3A5C] to-[#0A2540] py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {np ? "प्रकाशनहरू र अनुसन्धान" : "Publications & Research"}
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {np
                ? "विज्ञानलाई खेतबारीसम्म पुर्‍याउँदै — अनुसन्धान, नीति र प्राविधिक योगदानको दशकौँको यात्रा"
                : "Bringing science to the field — decades of research, policy and technical contributions"}
            </p>
          </motion.div>
        </section>

        {/* Academic Credentials */}
        <section className="py-16 sm:py-20 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0A2540] mb-3">
                {np ? "शैक्षिक तथा अनुसन्धान आधार" : "Academic & Research Foundation"}
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                {np
                  ? "त्रिभुवन विश्वविद्यालय र नेदरल्यान्ड्सबाट प्राप्त औपचारिक योग्यताहरू"
                  : "Formal qualifications from Tribhuvan University and the Netherlands"}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {academics.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-[#D4AF37]">
                      <CardContent className="p-6 sm:p-7">
                        <div className="w-12 h-12 rounded-xl bg-[#0A2540]/5 flex items-center justify-center mb-5">
                          <Icon className="w-6 h-6 text-[#0A2540]" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-[#0A2540] mb-1">{a.title}</h3>
                        <p className="text-sm font-semibold text-[#D4AF37] mb-3">{a.org}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{a.detail}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Professional & Technical Contributions */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0A2540] mb-3">
                {np ? "प्राविधिक योगदानहरू" : "Professional & Technical Contributions"}
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                {np
                  ? "अनुसन्धान, नीति र तालिम मार्फत नेपालको पशुपालन क्षेत्रमा योगदान"
                  : "Contributions to Nepal's livestock sector through research, policy and training"}
              </p>
            </motion.div>

            <div className="space-y-4">
              {contributions.map((c, i) => {
                const Icon = c.icon;
                const colorCls = kindColor[c.kind] ?? "bg-[#0A2540]/10 text-[#0A2540]";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-5 sm:p-6 flex items-start gap-4 sm:gap-5">
                        <div className="hidden sm:flex w-11 h-11 rounded-lg bg-[#0A2540]/5 items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#0A2540]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span
                              className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${colorCls}`}
                            >
                              {c.kind}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">{c.year}</span>
                          </div>
                          <h3 className="font-semibold text-[#0A2540] leading-snug mb-1">{c.title}</h3>
                          <p className="text-sm text-gray-500">{c.venue}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center text-xs text-gray-400 mt-8"
            >
              {np
                ? "पूर्ण प्रकाशन सूची अद्यावधिक हुँदै — विस्तृत जानकारीका लागि सम्पर्क गर्नुहोस्।"
                : "A complete publication list is being compiled — contact us for detailed records."}
            </motion.p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0A2540] via-[#1A3A5C] to-[#0A2540] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              {np ? "सहकार्य गरौँ" : "Let's Collaborate"}
            </h2>
            <p className="text-gray-300 mb-8">
              {np
                ? "अनुसन्धान सहकार्य, परामर्श वा तालिमका लागि छलफल गरौँ।"
                : "Research partnerships, consulting engagements or training programmes — start a conversation."}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-transform"
            >
              {np ? "सम्पर्क गर्नुहोस्" : "Get in Touch"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
}
