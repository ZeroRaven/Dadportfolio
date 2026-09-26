import { Link } from "react-router";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Award, TrendingUp, Users, Globe, BookOpen, Briefcase, GraduationCap, Target, ArrowRight, Download, Mail, Linkedin, Quote, Facebook, PawPrint, ChevronDown, CalendarCheck, Calculator, Map as MapIcon, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { OpenStatusChip } from "../components/OpenStatusChip";
import logoGoN from "@/imports/logo-gon.webp";
import logoWorldBank from "@/imports/logo-worldbank.webp";
import logoTU from "@/imports/logo-tu.webp";
import logoDLFD from "@/imports/logo-dlfd.webp";
import logoLarenstein from "@/imports/logo-larenstein.webp";
import logoGeoKrishi from "@/imports/logo-geokrishi.webp";
import imgCattle from "@/imports/img-cattle.webp";
import imgTerraces from "@/imports/img-terraces.webp";
import imgRural from "@/imports/img-rural.webp";
import imgProfessional from "@/imports/img-professional.webp";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import drShahPhoto from "@/imports/portrait.webp";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { StructuredData } from "../components/StructuredData";
import { motion } from "motion/react";

/** Accessible FAQ accordion row with animated expansion. */
function FaqItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl border-2 transition-colors duration-300 bg-white ${
        isOpen ? "border-[#D4AF37]/60 shadow-lg" : "border-gray-100 hover:border-[#D4AF37]/30 shadow-sm"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-7 py-4 sm:py-5"
      >
        <span className="text-sm sm:text-base font-semibold text-[#0A2540] leading-relaxed">{question}</span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen ? "bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-[#0A2540]" : "bg-gray-100 text-gray-500"
          }`}
        >
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown size={16} />
          </motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 sm:px-7 pb-5 sm:pb-6 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Home() {
  const { language } = useLanguage();
  const np = language === "np";
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const expertise = np ? [
    { icon: TrendingUp, title: "पशुपालन विकास", description: "नेपालभरि परिवर्तनकारी पशुपालन र ग्रामीण विकास पहलहरूमा २९+ वर्षको नेतृत्व" },
    { icon: Globe,      title: "रणनीतिक नेतृत्व", description: "DLFD का पूर्व निर्देशक, राष्ट्रिय स्तरमा नीति र कार्यक्रम उत्कृष्टता सुनिश्चित गर्दै" },
    { icon: Users,      title: "खाद्य सुरक्षा",    description: "खाद्य प्रणाली, पोषण सुरक्षा र दिगो कृषि अभ्यासमा विशेषज्ञ" },
    { icon: Target,     title: "जलवायु समाधान",    description: "जोखिमयुक्त समुदायहरूको लागि जलवायु-अनुकूल पशुपालन रणनीतिहरूमा अग्रणी" },
  ] : [
    { icon: TrendingUp, title: "Livestock Development", description: "29+ years leading transformative livestock and rural development initiatives across Nepal" },
    { icon: Globe,      title: "Strategic Leadership",  description: "Former Director at DLFD, driving policy and program excellence at national level" },
    { icon: Users,      title: "Food Security",         description: "Expert in food systems, nutrition security, and sustainable agricultural practices" },
    { icon: Target,     title: "Climate Solutions",     description: "Pioneering climate-resilient livestock strategies for vulnerable communities" },
  ];

  // Achievement numbers — rendered with Devanagari digits in Nepali mode.
  const achievements = [
    { number: np ? "२९+"    : "29+",   label: np ? "वर्षको अनुभव"         : "Years Experience",  icon: Award },
    { number: np ? "१००+"   : "100+",  label: np ? "परियोजनाहरू नेतृत्व"  : "Projects Led",      icon: Briefcase },
    { number: np ? "५०,०००+" : "50K+", label: np ? "किसानहरू लाभान्वित"   : "Lives Impacted",    icon: Users },
    { number: np ? "१३+"    : "13+",   label: np ? "जिल्ला समेटिएका"      : "Districts Covered", icon: Globe },
  ];

  const partners = [
    { src: logoGoN,        name: "Government of Nepal",         nameNp: "नेपाल सरकार",                      clip: true  },
    { src: logoWorldBank,  name: "World Bank",                   nameNp: "विश्व बैंक",                        clip: false },
    { src: logoTU,         name: "Tribhuvan University",         nameNp: "त्रिभुवन विश्वविद्यालय",            clip: false },
    { src: logoDLFD,       name: "Dept. of Livestock Services",  nameNp: "पशुपालन सेवा विभाग",               clip: false },
    { src: logoLarenstein, name: "Larenstein University",        nameNp: "लारेन्स्टाइन विश्वविद्यालय",         clip: false },
    { src: logoGeoKrishi,  name: "GeoKrishi",                    nameNp: "जिओकृषि",                          clip: false },
  ];

  const testimonials = [
    {
      quote: "Dr. Shah's strategic oversight of our livestock programs across Bagamati Province was exceptional. His ability to coordinate twelve government offices while maintaining focus on outcomes for farmers set a standard for provincial leadership.",
      name: "Ram Prasad Adhikari",
      title: "Senior Program Officer",
      org: "Bagamati Province Government"
    },
    {
      quote: "We worked with Dr. Shah on the Third Livestock Development Project and were consistently impressed by his technical depth and his genuine commitment to the farmers he served. A rare combination in senior government roles.",
      name: "Dr. Sunita Karmacharya",
      title: "Project Coordinator",
      org: "World Bank Nepal"
    },
    {
      quote: "Dr. Shah brought real-world field knowledge into the classroom. His guest lectures on zoonotic disease management at IAAS drew on decades of provincial work that textbooks simply cannot replicate.",
      name: "Prof. Bishnu Prasad Shrestha",
      title: "Faculty, Animal Science",
      org: "IAAS, Tribhuvan University"
    }
  ];

  const faqs = np ? [
    {
      question: "डा. मोगल प्रसाद शाहको विशेषज्ञता क्षेत्र के हो?",
      answer: "डा. मोगल प्रसाद शाह पशु पोषणमा एम.एस्सी. गर्नुभएका र नेपालभरि पशुपालन विकास, खाद्य सुरक्षा, ग्रामीण विकास र जलवायु-अनुकूल कृषिमा २९+ वर्षको अनुभव भएका पशुपालन विकास विशेषज्ञ हुनुहुन्छ।"
    },
    {
      question: "डा. शाहले कुन कुन पदहरू सम्हाल्नुभएको छ?",
      answer: "डा. शाह पशुपालन तथा मत्स्यपालन विकास निर्देशनालय (DLFD) का पूर्व निर्देशक हुनुहुन्छ र नेपालभरि कृषि तथा ग्रामीण विकास कार्यक्रमहरूमा वरिष्ठ नेतृत्व पदहरू सम्हाल्नुभएको छ — जसमा विश्व बैंक परियोजनाहरूसँगको कार्य पनि समावेश छ।"
    },
    {
      question: "डा. शाहले कुन सेवाहरू प्रदान गर्नुहुन्छ?",
      answer: "डा. शाह पशुपालन विकास, कृषि नीति निर्माण, परियोजना डिजाइन र व्यवस्थापन, प्राविधिक मूल्याङ्कन, क्षमता विकास कार्यक्रम र अनुसन्धान साझेदारीमा रणनीतिक परामर्श तथा सल्लाहकार सेवा प्रदान गर्नुहुन्छ।"
    },
    {
      question: "डा. शाह कहाँ आधारित हुनुहुन्छ?",
      answer: "डा. शाह बागमती प्रदेश, नेपालमा आधारित हुनुहुन्छ र नेपाल तथा दक्षिण एसियाभरि नै पशुपालन विकास र खाद्य सुरक्षा परियोजनाहरूमा कार्यरत हुनुहुन्छ।"
    },
    {
      question: "म डा. शाहसँग कसरी सहकार्य गर्न सक्छु?",
      answer: "परामर्श अवसर र साझेदारीका लागि डा. शाहलाई info@drmogalshah.com.np मा इमेल गर्नुहोस्, फोन/WhatsApp मार्फत सम्पर्क गर्नुहोस् वा LinkedIn मार्फत जोडिनुहोस्। पशुपालन विकास र कृषि नवाचारमा छोटो र लामो अवधिका लागि उपलब्ध हुनुहुन्छ।"
    }
  ] : [
    {
      question: "What is Dr. Mogal Prasad Shah's area of expertise?",
      answer: "Dr. Mogal Prasad Shah is a livestock development expert with M.Sc. in Animal Nutrition and 29+ years of experience in livestock development, food security, rural development, and climate-resilient agriculture across Nepal."
    },
    {
      question: "What positions has Dr. Shah held?",
      answer: "Dr. Shah served as Director at the Directorate of Livestock and Fisheries Development (DLFD) and has held senior leadership positions in agricultural and rural development programs across Nepal, including work with World Bank projects."
    },
    {
      question: "What services does Dr. Shah offer?",
      answer: "Dr. Shah offers strategic consulting and advisory services in livestock development, agricultural policy formulation, project design and management, technical assessments, capacity building programs, and research partnerships."
    },
    {
      question: "Where is Dr. Shah based?",
      answer: "Dr. Shah is based in Bagamati Province, Nepal, and works on livestock development and food security projects across Nepal and the broader South Asian region."
    },
    {
      question: "How can I collaborate with Dr. Shah?",
      answer: "You can reach Dr. Shah for consulting opportunities and partnerships via email at info@drmogalshah.com.np, by phone or WhatsApp, or connect via LinkedIn. He is available for short-term and long-term engagements in livestock development and agricultural innovation."
    }
  ];

  return (
    <>
      <SEO
        title="Dr. Mogal Prasad Shah - Livestock Development Expert"
        description="Dr. Mogal Prasad Shah - M.Sc. Animal Nutrition with 29+ years of senior leadership in livestock development, food security, and rural agricultural innovation in Nepal."
        keywords="livestock development, animal nutrition, food security, rural development, Nepal agriculture expert, veterinary sciences, climate change agriculture"
        path="/"
        type="profile"
      />
      <StructuredData faqs={faqs} />

      <div>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#1A3A5C] to-[#0A2540]">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTIsMTc1LDU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-white"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-flex items-center space-x-2 bg-[#D4AF37]/20 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border border-[#D4AF37]/30"
                >
                  <Award className="text-[#D4AF37]" size={18} />
                  <span className="text-sm font-medium">{np ? "एम.एस्सी. | २९+ वर्षको उत्कृष्टता" : "M.Sc. | 29+ Years Excellence"}</span>
                </motion.div>

                <h1 className="hero-name text-4xl sm:text-5xl md:text-7xl mb-4 leading-tight">
                  <span className="text-white">{np ? "डा. मोगल" : "Dr. Mogal"}</span>
                  <br />
                  <span className="text-[#D4AF37]">{np ? "प्रसाद शाह" : "Prasad Shah"}</span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 leading-relaxed">
                  {np ? "पशुपालन विकास विशेषज्ञ" : "Livestock Development Expert"}
                </p>
                <p className="text-base sm:text-lg text-gray-400 mb-6 leading-relaxed max-w-xl">
                  {np
                    ? "नवाचारी पशुपालन समाधान, खाद्य सुरक्षा पहल र नेपालभरि दिगो कृषि अभ्यासद्वारा ग्रामीण जीविकोपार्जन रूपान्तरण।"
                    : "Transforming rural livelihoods through innovative livestock solutions, food security initiatives, and sustainable agricultural practices across Nepal."}
                </p>

                {/* Mobile portrait — visible only below lg */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="flex justify-center lg:hidden mb-8"
                >
                  <div className="relative">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-4 ring-[#D4AF37] shadow-2xl">
                      <img
                        src={drShahPhoto}
                        alt="Dr. Mogal Prasad Shah"
                        width={144}
                        height={144}
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl px-3 py-1.5 shadow-lg">
                      <span className="text-[#0A2540] text-xs font-bold">{np ? "२९+ वर्ष" : "29+ Yrs"}</span>
                    </div>
                  </div>
                </motion.div>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <Link to="/booking">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-xl">
                        <CalendarCheck className="mr-2" size={18} />
                        {np ? "परामर्श बुक गर्नुहोस्" : "Book a Consultation"}
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/contact">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" variant="outline" className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A2540] hover:border-[#D4AF37] text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300">
                        <Mail className="mr-2" size={18} />
                        {np ? "सम्पर्क गर्नुहोस्" : "Get in Touch"}
                      </Button>
                    </motion.div>
                  </Link>
                </div>

                {/* Live clinic status (Nepal Time) */}
                <div className="mt-5">
                  <OpenStatusChip />
                </div>

                <div className="mt-6 flex items-center space-x-4">
                  <span className="text-sm text-gray-400">{np ? "जोडिनुहोस्:" : "Connect:"}</span>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="https://www.linkedin.com/in/dr-mogal-prasad-shah/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={18} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="https://www.facebook.com/mpsah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="mailto:info@drmogalshah.com.np"
                    className="w-10 h-10 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Send Email"
                  >
                    <Mail size={18} />
                  </motion.a>
                </div>
              </motion.div>

              {/* Right Image — desktop only */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/30 to-transparent rounded-3xl transform rotate-6"></div>
                  <div className="relative h-[560px] xl:h-[620px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/20">
                    <ImageWithFallback
                      src={drShahPhoto}
                      alt="Dr. Mogal Prasad Shah, Livestock Development Expert"
                      width={850}
                      height={1024}
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 to-transparent"></div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-2xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center">
                        <GraduationCap className="text-[#0A2540]" size={28} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#0A2540]">{np ? "२९+" : "29+"}</div>
                        <div className="text-sm text-gray-600">{np ? "वर्षको नेतृत्व" : "Years Leading"}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-8 h-12 border-2 border-[#D4AF37]/30 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        </section>

        {/* Achievements Bar */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {achievements.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="text-center"
                  >
                    <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-[#0A2540] mx-auto mb-2 sm:mb-3" />
                    <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#0A2540] mb-1 sm:mb-2">{stat.number}</div>
                    <div className="text-xs sm:text-base text-[#0A2540]/80 font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Institutions & Partners */}
        <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-4">
                <PawPrint size={13} className="text-[#B8941F]" />
                <span className={`text-[11px] font-bold text-[#B8941F] ${np ? "" : "uppercase tracking-[0.18em]"}`}>
                  {np ? "विश्वसनीय साझेदारी" : "Trusted Network"}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0A2540]">
                {np ? "संस्थाहरू र साझेदारहरू" : "Institutions & Partners"}
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
                {np
                  ? "सरकारी निकाय, विकास संस्थान, विश्वविद्यालय र नवाचार प्लेटफर्मसँगको लामो सहकार्य"
                  : "Two decades of collaboration across government, development institutions, academia and innovation platforms"}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {partners.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -6 }}
                  className="group"
                >
                  <div
                    className="aspect-square rounded-2xl flex items-center justify-center p-5 sm:p-6 shadow-sm bg-white border border-gray-200/80 transition-all duration-300 group-hover:shadow-xl group-hover:border-[#D4AF37]/60 group-hover:bg-white"
                  >
                    <img
                      src={p.src}
                      alt={np ? p.nameNp : p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain grayscale opacity-75 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                      style={p.clip ? { clipPath: "circle(46% at 50% 50%)" } : undefined}
                    />
                  </div>
                  <p className="mt-2.5 text-[11px] sm:text-xs font-semibold text-gray-500 text-center leading-snug group-hover:text-[#0A2540] transition-colors">
                    {np ? p.nameNp : p.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Expertise */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                {np ? "मुख्य विशेषज्ञता" : "Core Expertise"}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {np ? "पशुपालन विकास र ग्रामीण कृषि प्रणालीमा परिवर्तनकारी नेतृत्व" : "Leading transformative change in livestock development and rural agricultural systems"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full border-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-2xl bg-white">
                      <CardContent className="p-6 sm:p-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                          <Icon className="text-[#D4AF37]" size={28} />
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A2540] mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-10 sm:mt-12"
            >
              <Link to="/services">
                <Button className="bg-[#0A2540] hover:bg-[#1A3A5C] text-white px-7 py-5 sm:px-8 sm:py-6 text-base sm:text-lg">
                  {np ? "सबै विशेषज्ञता क्षेत्रहरू" : "Explore All Expertise Areas"}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Professional Showcase */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0A2540] mb-5">
                  {np ? "दिगो विकासमा अग्रणी" : "Pioneering Sustainable Development"}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                  {np
                    ? "२९ वर्षभन्दा बढीको विशिष्ट करियरमा, डा. शाह पशुपालन र ग्रामीण विकास पहलहरूमा अग्रणी भूमिकामा रहनुभएको छ — नेपालभरि कृषि परिदृश्य रूपान्तरण र समुदाय सशक्तीकरण गर्दै।"
                    : "With a distinguished career spanning over 29 years, Dr. Shah has been at the forefront of livestock and rural development initiatives, transforming agricultural landscapes and empowering communities across Nepal."}
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  {(np ? [
                    "पूर्व निर्देशक, पशुपालन तथा मत्स्यपालन विकास निर्देशनालय",
                    "बागमती प्रदेश कार्यक्रमहरूको लागि रणनीतिक नेतृत्व",
                    "जलवायु-अनुकूल पशुपालन प्रणालीमा विशेषज्ञ",
                    "विश्व बैंक परियोजना व्यवस्थापन उत्कृष्टता",
                  ] : [
                    "Former Director, Directorate of Livestock & Fisheries Development",
                    "Strategic Leadership for Bagamati Province Programs",
                    "Expert in Climate-Resilient Livestock Systems",
                    "World Bank Project Management Excellence",
                  ]).map((point, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#0A2540] text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-sm sm:text-base">{point}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link to="/about">
                  <Button className="mt-7 bg-[#0A2540] hover:bg-[#1A3A5C] text-white">
                    {np ? "पूर्ण प्रोफाइल हेर्नुहोस्" : "Explore Full Profile"}
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
              </motion.div>

              {/* Photo grid — 2 cols on sm+, single col on xs */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <div className="h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src={imgCattle}
                      alt="Livestock Development"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-36 sm:h-40 lg:h-48 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src={imgTerraces}
                      alt="Nepal Agriculture"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 sm:pt-12">
                  <div className="h-36 sm:h-40 lg:h-48 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src={imgRural}
                      alt="Rural Development"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src={imgProfessional}
                      alt="Professional Work"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                {np ? "सहकर्मीहरूको भनाइ" : "What Colleagues Say"}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {np ? "डा. शाहको विशिष्ट करियरका साझेदारहरू र सहकर्मीहरूका दृष्टिकोण" : "Perspectives from partners and peers across Dr. Shah's distinguished career"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((t, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -6 }}
                >
                  <Card className="h-full border-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl bg-white">
                    <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                      <Quote className="text-[#D4AF37] mb-4 flex-shrink-0" size={28} />
                      <p className="text-gray-600 leading-relaxed flex-1 mb-6 text-sm sm:text-base italic">
                        "{t.quote}"
                      </p>
                      <div className="flex items-center space-x-3 border-t border-gray-100 pt-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-[#D4AF37] font-bold text-sm">{t.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-[#0A2540] text-sm">{t.name}</div>
                          <div className="text-xs text-gray-500">{t.title}</div>
                          <div className="text-xs text-[#D4AF37] font-medium">{t.org}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Farmer Resources — free tools, knowledge base, Nepal agri-map */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A2540] to-[#12365C] relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-5">
                <Sparkles className="text-[#D4AF37]" size={14} />
                <span className="text-xs sm:text-sm font-semibold text-[#D4AF37] tracking-wide">
                  {np ? "निःशुल्क · वैज्ञानिक स्रोतमा आधारित" : "Free · built on published science"}
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                {np ? "किसान तथा पशुपालकका लागि स्रोतहरू" : "Resources for Farmers & Livestock Keepers"}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {np
                  ? "डा. शाहको फिल्ड अनुभव र प्रमाणित अनुसन्धानबाट तयार पारिएका औजार, ज्ञान र नक्सा — निःशुल्क, द्विभाषी र फोनमै चल्ने।"
                  : "Tools, knowledge and maps distilled from Dr. Shah's field career and verified research — free, bilingual, and working on any phone."}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  path: "/tools",
                  icon: Calculator,
                  title: np ? "कृषि औजारहरू" : "Farm Tools & Calculators",
                  desc: np
                    ? "तौल अनुमान, गर्भावधि, रोपनी-बिघा रूपान्तरण, चारा हिसाब, खुराक र खोप सम्झना — ८ औजार।"
                    : "Weight estimator, gestation planner, Ropani↔Bigha converter, feed rations, dosage checks, vaccination reminders — 8 tools.",
                  points: np ? ["औजार: ८ वटा", "निःशुल्क, साइन-अप नचाहिने"] : ["8 calculators", "No sign-up, runs offline-fast"],
                },
                {
                  path: "/knowledge",
                  icon: BookOpen,
                  title: np ? "ज्ञान भण्डार" : "Knowledge Base",
                  desc: np
                    ? "खोप तालिका, बाख्रा-कुखुरा-गाईभैंसी पालन, बाली मौसुम, सिलेज, जलवायु अनुकूलन — २० लेख, स्रोतसहित।"
                    : "Vaccination calendars, goat-poultry-dairy systems, crop seasons, silage, climate adaptation — 20 cited articles.",
                  points: np ? ["लेख: २०", "हरेक तथ्य स्रोतसहित"] : ["20 guides", "Every figure sourced"],
                },
                {
                  path: "/agromap",
                  icon: MapIcon,
                  title: np ? "नेपाल कृषि नक्सा" : "Nepal Agriculture Map",
                  desc: np
                    ? "७७ जिल्ला, ७ प्रदेश — हरेक क्षेत्रको बाली, पशुपालन र जलवायु परिवर्तनको असर एकै नक्सामा।"
                    : "77 districts, 7 provinces — each region's crops, livestock and climate pressure on one interactive map.",
                  points: np ? ["जिल्ला: ७७", "प्रमाणित तथ्याङ्क"] : ["77 districts", "Verified statistics"],
                },
              ].map((r, index) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.path}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 }}
                    whileHover={{ y: -6 }}
                  >
                    <Link to={r.path} className="block h-full">
                      <div className="h-full bg-white/[0.06] backdrop-blur-sm border-2 border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 group">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center mb-5 shadow-lg">
                          <Icon className="text-[#0A2540]" size={26} />
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                          {r.title}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed mb-5">{r.desc}</p>
                        <ul className="space-y-1.5 mb-6">
                          {r.points.map((p) => (
                            <li key={p} className="flex items-center gap-2 text-xs text-gray-400">
                              <span className="w-1 h-1 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                              {p}
                            </li>
                          ))}
                        </ul>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] group-hover:gap-3 transition-all">
                          {np ? "खोल्नुहोस्" : "Open"}
                          <ArrowRight size={15} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-4">
                <BookOpen size={13} className="text-[#B8941F]" />
                <span className={`text-[11px] font-bold text-[#B8941F] ${np ? "" : "uppercase tracking-[0.18em]"}`}>
                  {np ? "जानकारी" : "Good to Know"}
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0A2540] mb-4">
                {np ? "बारम्बार सोधिने प्रश्नहरू" : "Frequently Asked Questions"}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {np
                  ? "डा. शाहको विशेषज्ञता, अनुभव र सहकार्यका बारेमा सामान्य जिज्ञासाहरू"
                  : "Quick answers about Dr. Shah's expertise, experience and ways to collaborate"}
              </p>
            </motion.div>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0A2540] via-[#1A3A5C] to-[#0A2540] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-5 sm:mb-6">
              {np ? "प्रभावको लागि सहकार्य गरौं" : "Let's Collaborate for Impact"}
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
              {np
                ? "पशुपालन विकास र खाद्य सुरक्षा पहलहरूमा परामर्श, सल्लाहकार भूमिकाहरू र रणनीतिक साझेदारीको लागि उपलब्ध"
                : "Available for consulting, advisory roles, and strategic partnerships in livestock development and food security initiatives"}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold text-base sm:text-lg px-7 sm:px-10 py-4 sm:py-6">
                    {np ? "कुराकानी सुरु गर्नुहोस्" : "Start a Conversation"}
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="/cv.html" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-base sm:text-lg px-7 sm:px-10 py-4 sm:py-6">
                    <Download className="mr-2" size={18} />
                    {np ? "CV डाउनलोड" : "Download CV"}
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
