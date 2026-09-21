import { Briefcase, MapPin, Calendar, Award, TrendingUp, Users, Target } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function Gallery() {
  const { language } = useLanguage();
  const np = language === "np";
  const positionsEn = [
    {
      title: "Animal Health Advisor",
      organization: "GeoKrishi",
      type: "Part-time",
      duration: "Dec 2022 - Present",
      location: "Kathmandu, Bāgmatī, Nepal",
      current: true,
      description: "Providing expert advisory services in animal health and livestock development strategies.",
      achievements: [
        "Strategic guidance on livestock health programs",
        "Technical support for agricultural innovation",
        "Policy recommendations for sustainable development"
      ]
    },
    {
      title: "Ex-Director",
      organization: "Directorate of Livestock and Fisheries Development",
      type: "Full-time",
      duration: "Feb 2022 - Jun 2022",
      location: "Hetauda, Makwanpur, Nepal",
      description: "Led strategic initiatives for livestock and fisheries development across Bagamati Province.",
      achievements: [
        "Oversaw Program Planning, Monitoring, and Evaluation of twelve Government Offices related to Livestock and Fisheries Development",
        "Executed Administrative and Technical support to the Bagmati Province Government for poverty alleviation of Livestock Farmers through entrepreneurship development",
        "Designed and Incorporated strategies that promoted self-sufficiency in milk, meat, and egg production in Bagmati province",
        "Enforced and coordinated the human, technical, and logistical resources for Infectious and Zoonotic disease control of the 13 districts of the Bagmati Province",
        "Spearheaded a task force of 10 people on policy formulation about control and containment of Infectious and Zoonotic diseases"
      ]
    },
    {
      title: "Senior Livestock Development Officer",
      organization: "Veterinary Hospital and Livestock Service Expert Center",
      type: "Full-time",
      duration: "2013 - 2022",
      location: "Lalitpur; Panchthar; Kavrepalanchowk",
      description: "Comprehensive livestock development oversight across multiple districts with focus on disease management and farmer support.",
      achievements: [
        "Oversaw Program planning, Implementation, Monitoring, Evaluation and Technical backup support related to Livestock development",
        "Treatment and control of infectious Livestock diseases",
        "Technical advice to the livestock farmers and extension services new technology dissemination",
        "Mobilised resources for disease diagnosis, treatment, and immunization through coordination with local government livestock sections",
        "Maximized distribution of resources (Medicine and seeds) to the farmers for the forage and fodder development",
        "Provision of training and workshops to farmers and entrepreneurs for commercial farm development which resulted in employment generation"
      ]
    },
    {
      title: "Livestock Development Officer",
      organization: "District Livestock Services Office",
      type: "Full-time",
      duration: "1997 - 2013",
      location: "Sarlahi; Doti; Makwanpur; Jhapa; Rautahat; Lalitpur",
      description: "Foundation role leading World Bank-supported livestock development initiatives across six districts.",
      achievements: [
        "Coordinated the Livestock and poultry production activities of Third Livestock development Project (TLDP) as part of World Bank Support Program",
        "Assisted as coordinator of HMG/Nepal- Special Poverty alleviation semi-commercial Goat development Project and Self-employment generation commercial Poultry development project at Regional Project Management Office",
        "Influenced Agro-processing and market development program to change the traditional system of marketing into commercialized and large-scale enterprise development",
        "Assisted to uplift the economic status of Livestock farmers through day-to-day treatment of livestock and poultry diseases, diagnosis and extension services",
        "Strengthened the capacity and capability of livestock services to implement the program and establish effective monitoring and evaluation",
        "Established farmers group and formation of Livestock industry related association to link extension programs, services and the need of farmers"
      ]
    }
  ];

  const positionsNp = [
    {
      title: "पशु स्वास्थ्य सल्लाहकार",
      organization: "जिओकृषि",
      type: "अंशकालिक",
      duration: "डिसे. २०२२ - हालसम्म",
      location: "काठमाडौं, बागमती, नेपाल",
      current: true,
      description: "पशु स्वास्थ्य र पशुपालन विकास रणनीतिहरूमा विशेषज्ञ सल्लाहकार सेवाहरू प्रदान गर्दै।",
      achievements: [
        "पशुपालन स्वास्थ्य कार्यक्रमहरूमा रणनीतिक मार्गदर्शन",
        "कृषि नवाचारका लागि प्राविधिक सहयोग",
        "दिगो विकासका लागि नीति सिफारिसहरू"
      ]
    },
    {
      title: "पूर्व निर्देशक",
      organization: "पशुपालन तथा मत्स्यपालन विकास निर्देशनालय",
      type: "पूर्णकालिक",
      duration: "फेब्रु. २०२२ - जुन २०२२",
      location: "हेटौडा, मकवानपुर, नेपाल",
      description: "बागमती प्रदेशमा पशुपालन र मत्स्यपालन विकासका लागि रणनीतिक पहलहरूको नेतृत्व गर्नुभयो।",
      achievements: [
        "पशुपालन र मत्स्यपालन विकाससँग सम्बन्धित बाह्र सरकारी कार्यालयहरूको कार्यक्रम योजना, अनुगमन र मूल्यांकन सम्हाल्नुभयो",
        "उद्यमशीलता विकासमार्फत पशुपालन किसानहरूको गरिबी न्यूनीकरणका लागि बागमती प्रदेश सरकारलाई प्रशासनिक र प्राविधिक सहयोग पुर्‍याउनुभयो",
        "बागमती प्रदेशमा दूध, मासु र अण्डा उत्पादनमा आत्मनिर्भरता प्रवर्द्धन गर्ने रणनीतिहरू डिजाइन र समावेश गर्नुभयो",
        "बागमती प्रदेशका १३ जिल्लाहरूको संक्रामक र जुनोटिक रोग नियन्त्रणका लागि मानवीय, प्राविधिक र तार्किक स्रोतहरूको समन्वय र लागू गर्नुभयो",
        "संक्रामक र जुनोटिक रोगहरूको नियन्त्रण र रोकथामबारे नीति निर्माणमा १० जनाको टास्क फोर्सको नेतृत्व गर्नुभयो"
      ]
    },
    {
      title: "वरिष्ठ पशुपालन विकास अधिकारी",
      organization: "पशु अस्पताल तथा पशु सेवा विशेषज्ञ केन्द्र",
      type: "पूर्णकालिक",
      duration: "२०१३ - २०२२",
      location: "ललितपुर; पाँचथर; काभ्रेपलाञ्चोक",
      description: "रोग व्यवस्थापन र किसान सहयोगमा ध्यान केन्द्रित गर्दै धेरै जिल्लाहरूमा व्यापक पशुपालन विकास निरीक्षण।",
      achievements: [
        "पशुपालन विकाससँग सम्बन्धित कार्यक्रम योजना, कार्यान्वयन, अनुगमन, मूल्यांकन र प्राविधिक समर्थन सहयोगको निरीक्षण",
        "संक्रामक पशु रोगहरूको उपचार र नियन्त्रण",
        "पशुपालन किसानहरूलाई प्राविधिक सल्लाह र नयाँ प्रविधि प्रसारका लागि विस्तार सेवाहरू",
        "स्थानीय सरकारी पशुपालन शाखाहरूसँग समन्वयमार्फत रोग निदान, उपचार र खोपीकरणका लागि स्रोत परिचालन",
        "घाँस र चारा विकासका लागि किसानहरूलाई स्रोत (औषधी र बीउ) वितरण अधिकतम बनाउनु",
        "व्यावसायिक खेत विकास र रोजगार सृजनाको परिणाम दिने किसान र उद्यमीहरूलाई प्रशिक्षण र कार्यशाला प्रदान"
      ]
    },
    {
      title: "पशुपालन विकास अधिकारी",
      organization: "जिल्ला पशुपालन सेवा कार्यालय",
      type: "पूर्णकालिक",
      duration: "१९९७ - २०१३",
      location: "सर्लाही; डोटी; मकवानपुर; झापा; रौतहट; ललितपुर",
      description: "छ जिल्लाहरूमा विश्व बैंक-समर्थित पशुपालन विकास पहलहरूको नेतृत्व गर्ने आधारभूत भूमिका।",
      achievements: [
        "विश्व बैंक समर्थन कार्यक्रमको अंशको रूपमा तेस्रो पशुपालन विकास परियोजना (TLDP) को पशुपालन र कुखुरापालन उत्पादन गतिविधिहरू समन्वय गर्नुभयो",
        "क्षेत्रीय परियोजना व्यवस्थापन कार्यालयमा HMG/नेपाल-विशेष गरिबी न्यूनीकरण अर्ध-व्यावसायिक बाख्रा विकास परियोजना र स्वरोजगार सृजन व्यावसायिक कुखुरापालन विकास परियोजनाको समन्वयकर्ताको रूपमा सहयोग गर्नुभयो",
        "परम्परागत बजार प्रणालीलाई व्यावसायिक र ठूलो उद्यम विकासमा परिवर्तन गर्न कृषि प्रशोधन र बजार विकास कार्यक्रमलाई प्रभावित पार्नुभयो",
        "दैनिक पशुपालन र कुखुरा रोग उपचार, निदान र विस्तार सेवाहरूमार्फत पशुपालन किसानहरूको आर्थिक स्थिति उकास्न सहयोग गर्नुभयो",
        "कार्यक्रम कार्यान्वयन र प्रभावकारी अनुगमन तथा मूल्यांकन स्थापनाका लागि पशुपालन सेवाहरूको क्षमता र सामर्थ्य सुदृढ गर्नुभयो",
        "विस्तार कार्यक्रम, सेवाहरू र किसानहरूको आवश्यकतालाई जोड्न किसान समूह गठन र पशु उद्योग सम्बन्धित सङ्घहरू स्थापना गर्नुभयो"
      ]
    }
  ];

  const positions = np ? positionsNp : positionsEn;

  const stats = np ? [
    { icon: Briefcase, number: "४", label: "प्रमुख पदहरू", color: "from-[#D4AF37] to-[#B8941F]" },
    { icon: MapPin, number: "१३+", label: "जिल्ला समेटिएका", color: "from-[#0A2540] to-[#1A3A5C]" },
    { icon: Calendar, number: "२७+", label: "वर्षको अनुभव", color: "from-[#D4AF37] to-[#B8941F]" },
    { icon: Users, number: "५०,०००+", label: "किसानहरू लाभान्वित", color: "from-[#0A2540] to-[#1A3A5C]" },
  ] : [
    { icon: Briefcase, number: "4", label: "Major Positions", color: "from-[#D4AF37] to-[#B8941F]" },
    { icon: MapPin, number: "13+", label: "Districts Covered", color: "from-[#0A2540] to-[#1A3A5C]" },
    { icon: Calendar, number: "27+", label: "Years Experience", color: "from-[#D4AF37] to-[#B8941F]" },
    { icon: Users, number: "50K+", label: "Farmers Impacted", color: "from-[#0A2540] to-[#1A3A5C]" },
  ];

  const impactAreas = np ? [
    {
      icon: TrendingUp,
      title: "पशुपालन उत्पादकता",
      description: "रणनीतिक हस्तक्षेपमार्फत दूध, मासु र अण्डा उत्पादनमा वृद्धि"
    },
    {
      icon: Target,
      title: "रोग नियन्त्रण",
      description: "व्यापक संक्रामक र जुनोटिक रोग व्यवस्थापन प्रणाली"
    },
    {
      icon: Users,
      title: "क्षमता निर्माण",
      description: "हजारौं किसान र उद्यमीहरूको प्रशिक्षण र सशक्तीकरण"
    },
    {
      icon: Award,
      title: "नीति नेतृत्व",
      description: "महत्वपूर्ण पशुपालन विकास नीति र रणनीतिहरूको निर्माण"
    }
  ] : [
    {
      icon: TrendingUp,
      title: "Livestock Productivity",
      description: "Enhanced milk, meat, and egg production through strategic interventions"
    },
    {
      icon: Target,
      title: "Disease Control",
      description: "Comprehensive infectious and zoonotic disease management systems"
    },
    {
      icon: Users,
      title: "Capacity Building",
      description: "Training and empowerment of thousands of farmers and entrepreneurs"
    },
    {
      icon: Award,
      title: "Policy Leadership",
      description: "Formulation of critical livestock development policies and strategies"
    }
  ];

  return (
    <>
      <SEO
        title="Professional Experience"
        description="Explore Dr. Mogal Prasad Shah's 27+ years of professional experience in livestock development, from grassroots field work to senior leadership positions in Nepal."
        keywords="work experience, livestock development career, veterinary career Nepal, agriculture leadership"
        canonical="https://drmogalshah.com.np/experience"
      />

      <div className="pt-20">
        {/* Header Section */}
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
              {np ? "व्यावसायिक अनुभव" : "Professional Experience"}
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {np ? "पशुपालन विकासमा क्षेत्रीय कार्यान्वयनदेखि कार्यकारी नेतृत्वसम्म, २७ वर्षको परिवर्तनकारी कार्यको यात्रा" : "A journey from field-level implementation to executive leadership, spanning 27 years of transformative work in livestock development"}
            </p>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
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
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    <div className="text-4xl font-display font-bold text-[#0A2540] mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Career Timeline */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                {np ? "करियर यात्रा" : "Career Journey"}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full"></div>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#D4AF37] to-[#B8941F]"></div>

              <div className="space-y-12">
                {positions.map((position, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8">
                      <div className="w-6 h-6 bg-[#D4AF37] rounded-full border-4 border-white shadow-lg"></div>
                    </div>

                    <Card className={`lg:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'lg:ml-0' : 'lg:ml-auto'} border-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl bg-white`}>
                      <CardContent className="p-8">
                        {position.current && (
                          <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] rounded-full text-sm font-semibold mb-4">
                              {np ? "हालको पद" : "Current Position"}
                          </div>
                        )}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-display text-2xl font-bold text-[#0A2540] mb-2">
                              {position.title}
                            </h3>
                            <p className="text-lg text-[#D4AF37] font-semibold mb-1">
                              {position.organization}
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Briefcase className="text-[#D4AF37]" size={24} />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-[#D4AF37]" />
                            <span>{position.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} className="text-[#D4AF37]" />
                            <span>{position.location}</span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {position.description}
                        </p>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-[#0A2540] mb-3">{np ? "मुख्य उपलब्धिहरू:" : "Key Achievements:"}</h4>
                          {position.achievements.map((achievement, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start space-x-3"
                            >
                              <div className="w-5 h-5 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-[#0A2540] text-xs font-bold">✓</span>
                              </div>
                              <span className="text-sm text-gray-600 leading-relaxed">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Areas */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                {np ? "प्रभावका क्षेत्रहरू" : "Areas of Impact"}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {np ? "डा. शाहको कार्यले स्थायी परिवर्तन ल्याएका मुख्य क्षेत्रहरू" : "Key domains where Dr. Shah's work has created lasting transformation"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactAreas.map((area, index) => {
                const Icon = area.icon;
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
                          {area.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{area.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}