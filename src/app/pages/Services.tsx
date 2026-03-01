import { Sprout, TrendingUp, Shield, Users, DollarSign, Leaf, HeartHandshake, BarChart3, MapPin, Target, Lightbulb, FileCheck } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

export function Services() {
  const expertiseAreas = [
    {
      icon: Sprout,
      title: "Livestock Development & Production",
      description: "Comprehensive livestock and poultry development programs focused on productivity enhancement and sustainable practices",
      image: "https://images.unsplash.com/photo-1761284724050-3541146cd0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlc3RvY2slMjBhbmltYWwlMjBodXNiYW5kcnklMjBmYXJtaW5nfGVufDF8fHx8MTc3MjM3ODUwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
      image: "https://images.unsplash.com/photo-1771962152057-4c3015841488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlc3RvY2slMjBjYXR0bGUlMjBkYWlyeSUyMGZhcm1pbmd8ZW58MXx8fHwxNzcyMzc4MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
      image: "https://images.unsplash.com/photo-1759174469221-71382a2b5bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwc2VjdXJpdHklMjBhZ3JpY3VsdHVyZSUyMGNyb3BzfGVufDF8fHx8MTc3MjM3ODUwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
      image: "https://images.unsplash.com/photo-1760992004202-7df4128f7ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwc3VzdGFpbmFibGUlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NzIzNzg1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
      image: "https://images.unsplash.com/photo-1768595701593-c84fd8143aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGRldmVsb3BtZW50JTIwY29tbXVuaXR5JTIwZW1wb3dlcm1lbnR8ZW58MXx8fHwxNzcyMzc4NTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
      image: "https://images.unsplash.com/photo-1635183067334-c0dbdac46c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGxpdmVzdG9jayUyMGRldmVsb3BtZW50JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjM3ODA3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      capabilities: [
        "World Bank project management",
        "Program design and implementation",
        "Monitoring and evaluation systems",
        "Results-based reporting"
      ]
    }
  ];

  const services = [
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

  return (
    <>
      <SEO
        title="Expertise & Services"
        description="Comprehensive livestock development, food security, climate-resilient agriculture, and rural livelihood services. Expert consulting and project management for sustainable development."
        keywords="livestock development services, animal health consulting, food security programs, climate agriculture, rural development expertise"
        canonical="https://drmogalshah.com.np/services"
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
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Expertise & Services
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions for livestock development, food security, and sustainable rural transformation
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
                Core Expertise Areas
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized knowledge and proven experience across multiple domains of agricultural development
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
                      <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl group">
                        <ImageWithFallback
                          src={area.image}
                          alt={area.title}
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
                Service Offerings
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive support for organizations and communities seeking to advance agricultural development
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
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to Collaborate?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Whether you need strategic consulting, technical expertise, or project management support, let's discuss how we can work together
            </p>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold text-lg px-10 py-6">
                  Get in Touch
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
}