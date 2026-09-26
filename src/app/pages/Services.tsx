import { Sprout, TrendingUp, Shield, Users, DollarSign, Leaf, HeartHandshake, BarChart3, MapPin, Target, Lightbulb, FileCheck } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import imgHusbandry from "@/imports/img-husbandry.webp";
import imgCattle from "@/imports/img-cattle.webp";
import imgCrops from "@/imports/img-crops.webp";
import imgClimate from "@/imports/img-climate.webp";
import imgCommunity from "@/imports/img-community.webp";
import imgProfessional from "@/imports/img-professional.webp";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

export function Services() {
  const { language } = useLanguage();
  const np = language === "np";
  const expertiseAreasEn = [
    {
      icon: Sprout,
      title: "Livestock Development & Production",
      description: "Comprehensive livestock and poultry development programs focused on productivity enhancement and sustainable practices",
      image: imgHusbandry,
      capabilities: [
        "Dairy and meat value chain development",
        "Poultry production systems",
        "Breed improvement programs",
        "Forage and fodder management"
      ]
    },
    {
      icon: Shield,
      title: "Animal Health & Disease Management",
      description: "Expert leadership in infectious and zoonotic disease control, veterinary services, and animal health policy formulation",
      image: imgCattle,
      capabilities: [
        "Disease surveillance and control",
        "Vaccination and immunization programs",
        "Veterinary diagnostic services",
        "Emergency response coordination"
      ]
    },
    {
      icon: DollarSign,
      title: "Food Security & Nutrition",
      description: "Strategic initiatives for food systems strengthening, nutrition security, and poverty alleviation through agricultural innovation",
      image: imgCrops,
      capabilities: [
        "Food system transformation",
        "Self-sufficiency in milk, meat, and eggs",
        "Nutrition-sensitive agriculture",
        "Market linkage development"
      ]
    },
    {
      icon: Leaf,
      title: "Climate-Resilient Agriculture",
      description: "Developing and implementing climate-smart livestock systems that enhance resilience and adaptation in vulnerable communities",
      image: imgClimate,
      capabilities: [
        "Climate adaptation strategies",
        "Sustainable grazing management",
        "Resource optimization",
        "Environmental impact mitigation"
      ]
    },
    {
      icon: HeartHandshake,
      title: "Rural Livelihood Enhancement",
      description: "Community-centered programs for poverty reduction, entrepreneurship development, and economic empowerment",
      image: imgCommunity,
      capabilities: [
        "Farmer group formation and capacity building",
        "Commercial farm development",
        "Employment generation programs",
        "Cooperative strengthening"
      ]
    },
    {
      icon: BarChart3,
      title: "Project Management & M&E",
      description: "Expertise in designing, implementing, and evaluating large-scale development projects funded by international donors",
      image: imgProfessional,
      capabilities: [
        "World Bank project management",
        "Program design and implementation",
        "Monitoring and evaluation systems",
        "Results-based reporting"
      ]
    }
  ];

  const expertiseAreasNp = [
    {
      icon: Sprout,
      title: "पशुपालन विकास र उत्पादन",
      description: "उत्पादकता वृद्धि र दिगो अभ्यासमा केन्द्रित व्यापक पशुपालन र कुखुरापालन विकास कार्यक्रमहरू",
      image: imgHusbandry,
      capabilities: [
        "डेरी र मासु मूल्य श्रृङ्खला विकास",
        "कुखुरापालन उत्पादन प्रणाली",
        "नस्ल सुधार कार्यक्रम",
        "घाँस र चारा व्यवस्थापन"
      ]
    },
    {
      icon: Shield,
      title: "पशु स्वास्थ्य र रोग व्यवस्थापन",
      description: "संक्रामक र जुनोटिक रोग नियन्त्रण, पशुचिकित्सा सेवाहरू र पशु स्वास्थ्य नीति निर्माणमा विशेषज्ञ नेतृत्व",
      image: imgCattle,
      capabilities: [
        "रोग निगरानी र नियन्त्रण",
        "खोप र प्रतिरक्षण कार्यक्रमहरू",
        "पशुचिकित्सा निदान सेवाहरू",
        "आपतकालीन प्रतिक्रिया समन्वय"
      ]
    },
    {
      icon: DollarSign,
      title: "खाद्य सुरक्षा र पोषण",
      description: "खाद्य प्रणाली सुदृढीकरण, पोषण सुरक्षा र कृषि नवाचारमार्फत गरिबी न्यूनीकरणका रणनीतिक पहलहरू",
      image: imgCrops,
      capabilities: [
        "खाद्य प्रणाली परिवर्तन",
        "दूध, मासु र अण्डामा आत्मनिर्भरता",
        "पोषण-संवेदनशील कृषि",
        "बजार सम्बन्ध विकास"
      ]
    },
    {
      icon: Leaf,
      title: "जलवायु-अनुकूलित कृषि",
      description: "कमजोर समुदायहरूमा लचकता र अनुकूलन बढाउने जलवायु-स्मार्ट पशुपालन प्रणालीहरूको विकास र कार्यान्वयन",
      image: imgClimate,
      capabilities: [
        "जलवायु अनुकूलन रणनीतिहरू",
        "दिगो चरन व्यवस्थापन",
        "स्रोत अनुकूलन",
        "वातावरणीय प्रभाव न्यूनीकरण"
      ]
    },
    {
      icon: HeartHandshake,
      title: "ग्रामीण जीविकोपार्जन सुधार",
      description: "गरिबी न्यूनीकरण, उद्यमशीलता विकास र आर्थिक सशक्तीकरणका समुदायकेन्द्रित कार्यक्रमहरू",
      image: imgCommunity,
      capabilities: [
        "किसान समूह गठन र क्षमता निर्माण",
        "व्यावसायिक खेत विकास",
        "रोजगार सृजना कार्यक्रम",
        "सहकारी सुदृढीकरण"
      ]
    },
    {
      icon: BarChart3,
      title: "परियोजना व्यवस्थापन र M&E",
      description: "अन्तर्राष्ट्रिय दाताहरूद्वारा वित्तपोषित ठूला विकास परियोजनाहरूको डिजाइन, कार्यान्वयन र मूल्यांकनमा विशेषज्ञता",
      image: imgProfessional,
      capabilities: [
        "विश्व बैंक परियोजना व्यवस्थापन",
        "कार्यक्रम डिजाइन र कार्यान्वयन",
        "अनुगमन र मूल्यांकन प्रणाली",
        "परिणाम-आधारित प्रतिवेदन"
      ]
    }
  ];

  const expertiseAreas = np ? expertiseAreasNp : expertiseAreasEn;

  const servicesEn = [
    {
      icon: Lightbulb,
      title: "Strategic Consulting",
      description: "Expert advisory services for policy development, program design, and strategic planning"
    },
    {
      icon: Users,
      title: "Capacity Building",
      description: "Training programs and technical support for government agencies, NGOs, and communities"
    },
    {
      icon: MapPin,
      title: "On-Ground Implementation",
      description: "Direct project management and field-level program execution across diverse regions"
    },
    {
      icon: FileCheck,
      title: "Technical Assessments",
      description: "Feasibility studies, baseline surveys, and impact evaluations for development initiatives"
    }
  ];

  const servicesNp = [
    {
      icon: Lightbulb,
      title: "रणनीतिक परामर्श",
      description: "नीति विकास, कार्यक्रम डिजाइन र रणनीतिक योजनाका लागि विशेषज्ञ सल्लाहकार सेवाहरू"
    },
    {
      icon: Users,
      title: "क्षमता निर्माण",
      description: "सरकारी निकाय, गैरसरकारी संस्था र समुदायहरूका लागि प्रशिक्षण कार्यक्रम र प्राविधिक सहयोग"
    },
    {
      icon: MapPin,
      title: "क्षेत्रीय कार्यान्वयन",
      description: "विविध क्षेत्रहरूमा प्रत्यक्ष परियोजना व्यवस्थापन र क्षेत्रस्तरीय कार्यक्रम कार्यान्वयन"
    },
    {
      icon: FileCheck,
      title: "प्राविधिक मूल्यांकन",
      description: "विकास पहलहरूका लागि व्यवहार्यता अध्ययन, आधारभूत सर्वेक्षण र प्रभाव मूल्यांकन"
    }
  ];

  const services = np ? servicesNp : servicesEn;

  return (
    <>
      <SEO
        title="Expertise & Services"
        description="Comprehensive livestock development, food security, climate-resilient agriculture, and rural livelihood services. Expert consulting and project management for sustainable development."
        keywords="livestock development services, animal health consulting, food security programs, climate agriculture, rural development expertise"
        path="/services"
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
              {np ? "विशेषज्ञता र सेवाहरू" : "Expertise & Services"}
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {np ? "पशुपालन विकास, खाद्य सुरक्षा र दिगो ग्रामीण परिवर्तनका लागि व्यापक समाधानहरू" : "Comprehensive solutions for livestock development, food security, and sustainable rural transformation"}
            </p>
          </motion.div>
        </section>

        {/* Core Expertise Areas */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                {np ? "मुख्य विशेषज्ञता क्षेत्रहरू" : "Core Expertise Areas"}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {np ? "कृषि विकासका धेरै क्षेत्रहरूमा विशेष ज्ञान र प्रमाणित अनुभव" : "Specialized knowledge and proven experience across multiple domains of agricultural development"}
              </p>
            </motion.div>

            <div className="space-y-16">
              {expertiseAreas.map((area, index) => {
                const Icon = area.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    {/* Image */}
                    <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative h-[240px] sm:h-[320px] lg:h-[400px] rounded-3xl overflow-hidden shadow-xl group">
                        <ImageWithFallback
                          src={area.image}
                          alt={area.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 to-transparent"></div>
                        <div className="absolute top-6 left-6">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                            <Icon className="text-[#D4AF37]" size={32} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <h3 className="font-display text-3xl font-bold text-[#0A2540] mb-4">
                        {area.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        {area.description}
                      </p>
                      <div className="space-y-3">
                        {area.capabilities.map((capability, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[#0A2540] text-xs font-bold">✓</span>
                            </div>
                            <span className="text-gray-700">{capability}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Offerings */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                {np ? "सेवा प्रस्तावहरू" : "Service Offerings"}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {np ? "कृषि विकास अगाडि बढाउन खोज्ने संस्था र समुदायहरूका लागि व्यापक सहयोग" : "Comprehensive support for organizations and communities seeking to advance agricultural development"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
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
                          {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-[#0A2540] via-[#1A3A5C] to-[#0A2540] relative overflow-hidden">
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
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {np ? "सहकार्य गर्न तयार हुनुहुन्छ?" : "Ready to Collaborate?"}
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {np ? "रणनीतिक परामर्श, प्राविधिक विशेषज्ञता वा परियोजना व्यवस्थापन सहयोगको आवश्यकता भए पनि, हामी सँगै कसरी काम गर्न सक्छौं भन्ने बारे छलफल गरौं" : "Whether you need strategic consulting, technical expertise, or project management support, let's discuss how we can work together"}
            </p>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold text-lg px-10 py-6">
                  {np ? "सम्पर्कमा आउनुहोस्" : "Get in Touch"}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
}