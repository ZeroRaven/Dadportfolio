import { Link } from "react-router";
import { Award, TrendingUp, Users, Globe, BookOpen, Briefcase, GraduationCap, Target, ArrowRight, Download, Mail, Linkedin } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { StructuredData } from "../components/StructuredData";
import { motion } from "motion/react";

export function Home() {
  const expertise = [
    {
      icon: TrendingUp,
      title: "Livestock Development",
      description: "27+ years leading transformative livestock and rural development initiatives across Nepal"
    },
    {
      icon: Globe,
      title: "Strategic Leadership",
      description: "Former Director at DLFD, driving policy and program excellence at national level"
    },
    {
      icon: Users,
      title: "Food Security",
      description: "Expert in food systems, nutrition security, and sustainable agricultural practices"
    },
    {
      icon: Target,
      title: "Climate Solutions",
      description: "Pioneering climate-resilient livestock strategies for vulnerable communities"
    }
  ];

  const achievements = [
    { number: "27+", label: "Years Experience", icon: Award },
    { number: "100+", label: "Projects Led", icon: Briefcase },
    { number: "50K+", label: "Lives Impacted", icon: Users },
    { number: "15+", label: "Publications", icon: BookOpen },
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
        {/* Hero Section - Full Screen */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#1A3A5C] to-[#0A2540]">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTIsMTc1LDU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                  className="inline-flex items-center space-x-2 bg-[#D4AF37]/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-[#D4AF37]/30"
                >
                  <Award className="text-[#D4AF37]" size={20} />
                  <span className="text-sm font-medium">M.Sc. | 27+ Years Excellence</span>
                </motion.div>

                <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-white">Dr. Mogal</span>
                  <br />
                  <span className="text-[#D4AF37]">Prasad Shah</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed">
                  Livestock Development Expert
                </p>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                  Transforming rural livelihoods through innovative livestock solutions, food security initiatives, and sustainable agricultural practices across Nepal.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold text-lg px-8 py-6 shadow-xl">
                        <Mail className="mr-2" size={20} />
                        Get in Touch
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/about">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" variant="outline" className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A2540] hover:border-[#D4AF37] text-lg px-8 py-6 transition-all duration-300">
                        View Profile
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </motion.div>
                  </Link>
                </div>

                {/* Quick Connect */}
                <div className="mt-8 flex items-center space-x-4">
                  <span className="text-sm text-gray-400">Connect:</span>
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
                    href="mailto:info@drmogalshah.com.np"
                    className="w-10 h-10 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Send Email"
                  >
                    <Mail size={18} />
                  </motion.a>
                </div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/30 to-transparent rounded-3xl transform rotate-6"></div>
                  <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/20">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1635183067334-c0dbdac46c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGxpdmVzdG9jayUyMGRldmVsb3BtZW50JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjM3ODA3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Dr. Mogal Prasad Shah"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 to-transparent"></div>
                  </div>
                  
                  {/* Floating Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center">
                        <GraduationCap className="text-[#0A2540]" size={32} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#0A2540]">27+</div>
                        <div className="text-sm text-gray-600">Years Leading</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
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
        <section className="py-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#0A2540] mx-auto mb-3" />
                    <div className="text-4xl md:text-5xl font-display font-bold text-[#0A2540] mb-2">{stat.number}</div>
                    <div className="text-sm md:text-base text-[#0A2540]/80 font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Core Expertise */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
                Core Expertise
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Leading transformative change in livestock development and rural agricultural systems
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <Icon className="text-[#D4AF37]" size={32} />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-[#0A2540] mb-3">{item.title}</h3>
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
              className="text-center mt-12"
            >
              <Link to="/services">
                <Button className="bg-[#0A2540] hover:bg-[#1A3A5C] text-white px-8 py-6 text-lg">
                  Explore All Expertise Areas
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Visual Showcase */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl font-bold text-[#0A2540] mb-6">
                  Pioneering Sustainable Development
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  With a distinguished career spanning over 27 years, Dr. Shah has been at the forefront of livestock and rural development initiatives, transforming agricultural landscapes and empowering communities across Nepal.
                </p>
                <ul className="space-y-4">
                  {[
                    "Former Director, Directorate of Livestock & Fisheries Development",
                    "Strategic Leadership for Bagamati Province Programs",
                    "Expert in Climate-Resilient Livestock Systems",
                    "World Bank Project Management Excellence"
                  ].map((point, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#0A2540] text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{point}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link to="/about">
                  <Button className="mt-8 bg-[#0A2540] hover:bg-[#1A3A5C] text-white">
                    Explore Full Profile
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <div className="h-64 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1771962152057-4c3015841488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlc3RvY2slMjBjYXR0bGUlMjBkYWlyeSUyMGZhcm1pbmd8ZW58MXx8fHwxNzcyMzc4MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Livestock Development"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-48 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1757311475960-aa4f1b0dca40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbCUyMGFncmljdWx0dXJlJTIwZmllbGQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcyMzc4MDczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Nepal Agriculture"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="h-48 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1761296787557-5797a6897297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGRldmVsb3BtZW50JTIwZm9vZCUyMHNlY3VyaXR5fGVufDF8fHx8MTc3MjM3ODA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Rural Development"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-64 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1635183067334-c0dbdac46c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGxpdmVzdG9jayUyMGRldmVsb3BtZW50JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjM3ODA3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Professional Work"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </motion.div>
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
              Let's Collaborate for Impact
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Available for consulting, advisory roles, and strategic partnerships in livestock development and food security initiatives
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold text-lg px-10 py-6">
                    Start a Conversation
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-lg px-10 py-6">
                  <Download className="mr-2" size={20} />
                  Download CV
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}