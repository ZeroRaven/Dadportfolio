import { Link } from "react-router";
import { Award, TrendingUp, Users, Globe, BookOpen, Briefcase, GraduationCap, Target, ArrowRight, Download, Mail, Linkedin, Quote, Facebook } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import logoGoN from "@/imports/image-2.png";
import logoWorldBank from "@/imports/image-3.png";
import logoTU from "@/imports/image-4.png";
import logoDLFD from "@/imports/image-5.png";
import logoLarenstein from "@/imports/image-6.png";
import logoGeoKrishi from "@/imports/image-7.png";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import drShahPhoto from "@/imports/image.png";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { StructuredData } from "../components/StructuredData";
import { motion } from "motion/react";

export function Home() {
  const { language } = useLanguage();
  const np = language === "np";

  const expertise = np ? [
    { icon: TrendingUp, title: "पशुपालन विकास", description: "नेपालभरि परिवर्तनकारी पशुपालन र ग्रामीण विकास पहलहरूमा २७+ वर्षको नेतृत्व" },
    { icon: Globe,      title: "रणनीतिक नेतृत्व", description: "DLFD का पूर्व निर्देशक, राष्ट्रिय स्तरमा नीति र कार्यक्रम उत्कृष्टता सुनिश्चित गर्दै" },
    { icon: Users,      title: "खाद्य सुरक्षा",    description: "खाद्य प्रणाली, पोषण सुरक्षा र दिगो कृषि अभ्यासमा विशेषज्ञ" },
    { icon: Target,     title: "जलवायु समाधान",    description: "जोखिमयुक्त समुदायहरूको लागि जलवायु-अनुकूल पशुपालन रणनीतिहरूमा अग्रणी" },
  ] : [
    { icon: TrendingUp, title: "Livestock Development", description: "27+ years leading transformative livestock and rural development initiatives across Nepal" },
    { icon: Globe,      title: "Strategic Leadership",  description: "Former Director at DLFD, driving policy and program excellence at national level" },
    { icon: Users,      title: "Food Security",         description: "Expert in food systems, nutrition security, and sustainable agricultural practices" },
    { icon: Target,     title: "Climate Solutions",     description: "Pioneering climate-resilient livestock strategies for vulnerable communities" },
  ];

  const achievements = [
    { number: "27+",  label: np ? "वर्षको अनुभव"         : "Years Experience",  icon: Award },
    { number: "100+", label: np ? "परियोजनाहरू नेतृत्व"  : "Projects Led",      icon: Briefcase },
    { number: "50K+", label: np ? "किसानहरू लाभान्वित"   : "Lives Impacted",    icon: Users },
    { number: "13+",  label: np ? "जिल्ला समेटिएका"      : "Districts Covered", icon: Globe },
  ];

  const partners = [
    { src: logoGoN,        name: "Government of Nepal",         clip: true  },
    { src: logoWorldBank,  name: "World Bank",                   clip: false },
    { src: logoTU,         name: "Tribhuvan University",         clip: false },
    { src: logoDLFD,       name: "Dept. of Livestock Services",  clip: false },
    { src: logoLarenstein, name: "Larenstein University",        clip: false },
    { src: logoGeoKrishi,  name: "GeoKrishi",                    clip: false },
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

  const faqs = [
    {
      question: "What is Dr. Mogal Prasad Shah's area of expertise?",
      answer: "Dr. Mogal Prasad Shah is a livestock development expert with M.Sc. in Animal Nutrition and 27+ years of experience in livestock development, food security, rural development, and climate-resilient agriculture across Nepal."
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
      answer: "You can reach Dr. Shah for consulting opportunities and partnerships via email at info@drmogalshah.com.np or connect via LinkedIn. He is available for short-term and long-term engagements in livestock development and agricultural innovation."
    }
  ];

  return (
    <>
      <SEO
        title="Dr. Mogal Prasad Shah - Livestock Development Expert"
        description="Dr. Mogal Prasad Shah - M.Sc. Animal Nutrition with 27+ years of senior leadership in livestock development, food security, and rural agricultural innovation in Nepal."
        keywords="livestock development, animal nutrition, food security, rural development, Nepal agriculture expert, veterinary sciences, climate change agriculture"
        canonical="https://drmogalshah.com.np/"
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

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
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
                  <span className="text-sm font-medium">{np ? "एम.एस्सी. | २७+ वर्षको उत्कृष्टता" : "M.Sc. | 27+ Years Excellence"}</span>
                </motion.div>

                <h1
                  className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight"
                  style={np ? { fontFamily: "'Khand', 'Noto Sans Devanagari', sans-serif", letterSpacing: "0.04em", fontWeight: 700 } : undefined}
                >
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
                    <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden ring-4 ring-[#D4AF37] shadow-2xl">
                      <img
                        src={drShahPhoto}
                        alt="Dr. Mogal Prasad Shah"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl px-3 py-1.5 shadow-lg">
                      <span className="text-[#0A2540] text-xs font-bold">{np ? "२७+ वर्ष" : "27+ Yrs"}</span>
                    </div>
                  </div>
                </motion.div>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <Link to="/contact">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-xl">
                        <Mail className="mr-2" size={18} />
                        {np ? "सम्पर्क गर्नुहोस्" : "Get in Touch"}
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/about">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" variant="outline" className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A2540] hover:border-[#D4AF37] text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300">
                        {np ? "प्रोफाइल हेर्नुहोस्" : "View Profile"}
                        <ArrowRight className="ml-2" size={18} />
                      </Button>
                    </motion.div>
                  </Link>
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
                        <div className="text-2xl font-bold text-[#0A2540]">{np ? "२७+" : "27+"}</div>
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

        {/* Institutions & Partners Strip */}
        <section className="py-10 sm:py-14 bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
              {np ? "संस्थाहरू र साझेदारहरू" : "Institutions & Partners"}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-5">
              {partners.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center gap-2.5 group"
                >
                  <div
                    className="w-full aspect-square rounded-xl flex items-center justify-center p-2.5 sm:p-3 shadow-sm border border-gray-100 bg-white transition-all duration-200 group-hover:shadow-md group-hover:scale-105"
                  >
                    <img
                      src={p.src}
                      alt={p.name}
                      className="w-full h-full object-contain"
                      style={p.clip ? { clipPath: "circle(46% at 50% 50%)" } : undefined}
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-gray-500 leading-tight text-center">
                    {p.name}
                  </span>
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
                    ? "२७ वर्षभन्दा बढीको विशिष्ट करियरमा, डा. शाह पशुपालन र ग्रामीण विकास पहलहरूमा अग्रणी भूमिकामा रहनुभएको छ — नेपालभरि कृषि परिदृश्य रूपान्तरण र समुदाय सशक्तीकरण गर्दै।"
                    : "With a distinguished career spanning over 27 years, Dr. Shah has been at the forefront of livestock and rural development initiatives, transforming agricultural landscapes and empowering communities across Nepal."}
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
                      src="https://images.unsplash.com/photo-1771962152057-4c3015841488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlc3RvY2slMjBjYXR0bGUlMjBkYWlyeSUyMGZhcm1pbmd8ZW58MXx8fHwxNzcyMzc4MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Livestock Development"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-36 sm:h-40 lg:h-48 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1757311475960-aa4f1b0dca40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbCUyMGFncmljdWx0dXJlJTIwZmllbGQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcyMzc4MDczfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Nepal Agriculture"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 sm:pt-12">
                  <div className="h-36 sm:h-40 lg:h-48 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1761296787557-5797a6897297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGRldmVsb3BtZW50JTIwZm9vZCUyMHNlY3VyaXR5fGVufDF8fHx8MTc3MjM3ODA3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Rural Development"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1635183067334-c0dbdac46c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGxpdmVzdG9jayUyMGRldmVsb3BtZW50JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjM3ODA3Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Professional Work"
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
