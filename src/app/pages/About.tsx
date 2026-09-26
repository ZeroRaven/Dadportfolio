import { GraduationCap, Briefcase, Award, Globe2, Target, Heart, TrendingUp, Users2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import drShahHeadshot from "@/imports/portrait.webp";
import imgKathmandu from "@/imports/img-kathmandu.webp";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { toNepaliDigits } from "../i18n/format";

export function About() {
  const { language } = useLanguage();
  const np = language === "np";
  const educationEn = [
    {
      degree: "Master of Science (M.Sc.)",
      field: "Animal Nutrition",
      institution: "Institute of Agriculture and Animal Science, Tribhuvan University",
      location: "Chitwan, Nepal",
      years: "2008 - 2010",
      thesis: "Productive performance of Mulato II (Brachiaria hybrid CIAT 36087) with respect to delayed planting in Chitwan"
    },
    {
      degree: "Postgraduate Diploma",
      field: "Tropical Animal Production",
      institution: "Larenstein University of Professional Education",
      location: "Deventer, Netherlands",
      years: "2003 - 2004",
      highlight: "International advanced training in tropical animal production systems"
    },
    {
      degree: "Bachelor's Degree",
      field: "Veterinary Sciences/Veterinary Clinical Sciences",
      institution: "Institute of Agriculture and Animal Science, Tribhuvan University",
      location: "Chitwan, Nepal",
      years: "1989 - 1996",
      highlight: "Foundation in veterinary medicine and animal health"
    }
  ];

  const educationNp = [
    {
      degree: "मास्टर अफ साइन्स (एम.एस्सी.)",
      field: "पशु पोषण",
      institution: "कृषि तथा पशु विज्ञान संस्थान, त्रिभुवन विश्वविद्यालय",
      location: "चितवन, नेपाल",
      years: "२००८ - २०१०",
      thesis: "चितवनमा ढिलो रोपाइँको सन्दर्भमा मुलाटो II (Brachiaria hybrid CIAT 36087) को उत्पादन प्रदर्शन"
    },
    {
      degree: "स्नातकोत्तर डिप्लोमा",
      field: "उष्णकटिबन्धीय पशु उत्पादन",
      institution: "लारेन्स्टाइन विश्वविद्यालय अफ प्रोफेसनल एजुकेसन",
      location: "डेभेन्टर, नेदरल्यान्ड्स",
      years: "२००३ - २००४",
      highlight: "उष्णकटिबन्धीय पशु उत्पादन प्रणालीमा अन्तर्राष्ट्रिय उन्नत प्रशिक्षण"
    },
    {
      degree: "स्नातक उपाधि",
      field: "पशु चिकित्सा विज्ञान / पशु चिकित्सा क्लिनिकल विज्ञान",
      institution: "कृषि तथा पशु विज्ञान संस्थान, त्रिभुवन विश्वविद्यालय",
      location: "चितवन, नेपाल",
      years: "१९८९ - १९९६",
      highlight: "पशु चिकित्सा र पशु स्वास्थ्यमा आधारभूत ज्ञान"
    }
  ];

  const education = np ? educationNp : educationEn;

  const coreValuesEn = [
    {
      icon: Target,
      title: "Field First",
      description: "From Sarlahi to Doti to Panchthar — 29 years of decisions made at the farm gate, not the desk"
    },
    {
      icon: Heart,
      title: "Farmer-Centred",
      description: "Every program Dr. Shah designed — from the World Bank TLDP to Bagamati's disease control — put the farmer's livelihood at the centre"
    },
    {
      icon: TrendingUp,
      title: "Evidence-Based",
      description: "M.Sc. research on Brachiaria hybrid forage and a PG Diploma in the Netherlands brought science into every field intervention"
    },
    {
      icon: Users2,
      title: "Institution Builder",
      description: "Established farmer groups, livestock associations, and monitoring systems that outlast any individual program"
    }
  ];

  const coreValuesNp = [
    {
      icon: Target,
      title: "क्षेत्र सर्वप्रथम",
      description: "सर्लाहीदेखि डोटीसम्म, पाँचथरसम्म — २९ वर्षका निर्णयहरू डेस्कमा नभई खेतको ढोकामा लिइयो"
    },
    {
      icon: Heart,
      title: "किसानकेन्द्रित",
      description: "डा. शाहले डिजाइन गरेका प्रत्येक कार्यक्रम — विश्व बैंकको TLDP देखि बागमतीको रोग नियन्त्रणसम्म — किसानको जीविकोपार्जनलाई केन्द्रमा राख्यो"
    },
    {
      icon: TrendingUp,
      title: "प्रमाणमा आधारित",
      description: "ब्राकियारिया हाइब्रिड घाँसमा एम.एस्सी. अनुसन्धान र नेदरल्यान्ड्समा स्नातकोत्तर डिप्लोमाले हरेक क्षेत्रीय हस्तक्षेपमा विज्ञान ल्यायो"
    },
    {
      icon: Users2,
      title: "संस्था निर्माता",
      description: "किसान समूह, पशुपालन सङ्घ र अनुगमन प्रणालीहरू स्थापना गरे जुन कुनै पनि व्यक्तिगत कार्यक्रमभन्दा लामो समयसम्म टिकिरहे"
    }
  ];

  const coreValues = np ? coreValuesNp : coreValuesEn;

  return (
    <>
      <SEO
        title="About Dr. Mogal Prasad Shah"
        description="Learn about Dr. Mogal Prasad Shah's distinguished career in livestock development, his education, and his commitment to rural agricultural transformation in Nepal."
        keywords="Dr. Mogal Prasad Shah, livestock expert biography, Nepal veterinary professional, M.Sc Animal Nutrition, Tribhuvan University, agricultural leader Nepal"
        path="/about"
        type="profile"
      />

      <div className="pt-20">
        {/* Header Section */}
        <section className="relative bg-gradient-to-br from-[#0A2540] via-[#1A3A5C] to-[#0A2540] py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {np ? "डा. शाहको बारेमा" : "About Dr. Shah"}
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {np ? "नेपालभरि पशुपालन विकास परिवर्तन र ग्रामीण समुदाय सशक्तीकरणमा समर्पित विशिष्ट करियर" : "A distinguished career dedicated to transforming livestock development and empowering rural communities across Nepal"}
            </p>
          </motion.div>
        </section>

        {/* Professional Journey */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative mb-10 lg:mb-0"
              >
                <div className="relative h-[380px] sm:h-[480px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src={drShahHeadshot}
                    alt="Dr. Mogal Prasad Shah, Livestock Development Expert"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl p-4 sm:p-6 shadow-2xl">
                  <div className="text-center text-[#0A2540]">
                    <div className="text-3xl sm:text-4xl font-display font-bold">{np ? toNepaliDigits("29+") : "29+"}</div>
                    <div className="text-xs sm:text-sm font-medium">{np ? "वर्ष नेतृत्व" : "Years Leadership"}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl font-bold text-[#0A2540] mb-6">
                  {np ? "व्यावसायिक यात्रा" : "Professional Journey"}
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    {np
                      ? "डा. मोगल प्रसाद शाह पशुपालन विकासका एक विशिष्ट विशेषज्ञ हुनुहुन्छ, जसले पशु चिकित्सा विज्ञान, पशु पोषण र ग्रामीण कृषि परिवर्तनमा २९ वर्षभन्दा बढीको वरिष्ठ नेतृत्व अनुभव राख्नुहुन्छ। नेपालभरि कृषक समुदायको जीविकोपार्जन सुधारमा उहाँको गहिरो प्रतिबद्धताले उहाँको करियरलाई परिभाषित गरेको छ।"
                      : "Dr. Mogal Prasad Shah is a distinguished livestock development expert with over 29 years of senior leadership experience in veterinary sciences, animal nutrition, and rural agricultural transformation. His career has been defined by a deep commitment to improving the livelihoods of farming communities across Nepal."}
                  </p>
                  <p>
                    {np
                      ? "पशुपालन तथा मत्स्यपालन विकास निर्देशनालयका पूर्व निर्देशकको रूपमा डा. शाहले बागमती प्रदेशका बाह्र सरकारी कार्यालयहरूलाई रणनीतिक नेतृत्व प्रदान गर्दै कार्यक्रम योजना, अनुगमन र मूल्यांकनको जिम्मेवारी सम्हाल्नुभयो। उहाँको कार्यले गरिबी न्यूनीकरण, खाद्य सुरक्षा र दिगो पशुपालन प्रणाली विकासमा प्रत्यक्ष योगदान पुर्‍याएको छ।"
                      : "As the former Director of the Directorate of Livestock and Fisheries Development, Dr. Shah provided strategic leadership to twelve government offices, overseeing program planning, monitoring, and evaluation across the Bagamati Province. His work has directly contributed to poverty alleviation, food security, and the development of sustainable livestock systems."}
                  </p>
                  <p>
                    {np
                      ? "आफ्नो करियरभर डा. शाहले विश्व बैंक, सरकारी निकाय, शैक्षिक संस्था, गैरसरकारी संस्था र निजी क्षेत्रका साझेदारहरू सहित अन्तर्राष्ट्रिय संगठनहरूसँग सहकार्य गर्नुभएको छ। उहाँको बहुविषयक दृष्टिकोण र सांस्कृतिक संवेदनशीलताले उहाँलाई जटिल विकासकार्य वातावरणमा एक प्रभावकारी नेताको रूपमा स्थापित गरेको छ।"
                      : "Throughout his career, Dr. Shah has collaborated with international organizations including the World Bank, government agencies, academic institutions, NGOs, and private sector partners. His multidisciplinary approach and cultural sensitivity have made him an effective leader in complex development environments."}
                  </p>
                  <p>
                    {np
                      ? "हाल जिओकृषिमा पशु स्वास्थ्य सल्लाहकारको रूपमा सेवारत डा. शाहले नेपाल र त्यसपारि पशुपालन विकास र ग्रामीण कृषि नवाचारलाई अगाडि बढाउन आफ्नो विशेषज्ञता योगदान दिइरहनुभएको छ।"
                      : "Currently serving as an Animal Health Advisor at GeoKrishi, Dr. Shah continues to contribute his expertise to advancing livestock development and rural agricultural innovation in Nepal and beyond."}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                {np ? "शैक्षिक उत्कृष्टता" : "Academic Excellence"}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {np ? "प्रतिष्ठित संस्थाहरूबाट पशु चिकित्सा विज्ञान र पशु पोषणमा बलियो आधार" : "A strong foundation in veterinary sciences and animal nutrition from prestigious institutions"}
              </p>
            </motion.div>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl bg-white">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-2xl flex items-center justify-center">
                            <GraduationCap className="text-[#D4AF37]" size={32} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                            <div>
                              <h3 className="font-display text-2xl font-bold text-[#0A2540] mb-1">
                                {edu.degree}
                              </h3>
                              <p className="text-lg text-[#D4AF37] font-semibold mb-2">{edu.field}</p>
                            </div>
                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                              {edu.years}
                            </span>
                          </div>
                          <p className="text-gray-700 font-medium mb-2">{edu.institution}</p>
                          <p className="text-gray-500 text-sm mb-3">{edu.location}</p>
                          {edu.thesis && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#D4AF37]">
                              <p className="text-sm font-medium text-gray-700">
                                <span className="text-[#0A2540] font-semibold">{np ? "थेसिस: " : "Thesis: "}</span>
                                {edu.thesis}
                              </p>
                            </div>
                          )}
                          {edu.highlight && (
                            <div className="mt-4 p-4 bg-[#D4AF37]/5 rounded-lg">
                              <p className="text-sm text-gray-700">{edu.highlight}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                {np ? "मूल मूल्यहरू" : "Core Values"}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {np ? "हरेक पहल र साझेदारीलाई मार्गदर्शन गर्ने सिद्धान्तहरू" : "Guiding principles that drive every initiative and partnership"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="h-full text-center border-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl bg-white">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <Icon className="text-[#D4AF37]" size={32} />
                        </div>
                        <h3 className="font-display text-xl font-bold text-[#0A2540] mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact Showcase */}
        <section className="py-24 bg-gradient-to-br from-[#0A2540] to-[#1A3A5C] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-white"
              >
                <h2 className="font-display text-4xl font-bold mb-6">
                  {np ? "नेपालमा प्रभाव" : "Impact Across Nepal"}
                </h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {np
                    ? "डा. शाहको कार्यले तराईका मैदानदेखि पहाडी जिल्लाहरूसम्म नेपालका विविध भौगोलिक क्षेत्रहरूमा हजारौं मानिसको जीवन छोएको छ। उहाँका परियोजनाहरूले दिगो विकास, रोग नियन्त्रण र कृषक समुदायको आर्थिक सशक्तीकरणमा ध्यान केन्द्रित गरेका छन्।"
                    : "Dr. Shah's work has touched thousands of lives across Nepal's diverse geographical regions, from the Terai plains to the mountain districts. His projects have focused on sustainable development, disease control, and economic empowerment of farming communities."}
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {(np ? [
                    { icon: Globe2, label: "१३ जिल्ला", desc: "बागमती प्रदेश कभरेज" },
                    { icon: Users2, label: "५०,०००+", desc: "किसानहरू सहयोग पाएका" },
                    { icon: Briefcase, label: "१००+", desc: "परियोजनाहरूको नेतृत्व" },
                    { icon: Award, label: "२९ वर्ष", desc: "नेतृत्व अनुभव" },
                  ] : [
                    { icon: Globe2, label: "13 Districts", desc: "Bagamati Province Coverage" },
                    { icon: Users2, label: "50,000+", desc: "Farmers Supported" },
                    { icon: Briefcase, label: "100+", desc: "Projects Led" },
                    { icon: Award, label: "29+ Years", desc: "Leadership Experience" },
                  ]).map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                      >
                        <Icon className="text-[#D4AF37] mb-3" size={32} />
                        <div className="text-2xl font-display font-bold mb-1">{stat.label}</div>
                        <div className="text-sm text-gray-300">{stat.desc}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-[280px] sm:h-[380px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <ImageWithFallback
                  src={imgKathmandu}
                  alt="Nepal Landscape"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 to-transparent"></div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}