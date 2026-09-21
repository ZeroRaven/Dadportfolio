import { GraduationCap, Briefcase, Award, Globe2, Target, Heart, TrendingUp, Users2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import drShahHeadshot from "@/imports/image.png";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { motion } from "motion/react";

export function About() {
  const education = [
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

  const coreValues = [
    {
      icon: Target,
      title: "Impact-Driven",
      description: "Focused on creating measurable, sustainable change in rural communities"
    },
    {
      icon: Heart,
      title: "Compassionate Leadership",
      description: "Empowering farmers and communities with dignity and respect"
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Leveraging modern solutions to traditional agricultural challenges"
    },
    {
      icon: Users2,
      title: "Collaborative",
      description: "Building partnerships across government, NGOs, and private sectors"
    }
  ];

  return (
    <>
      <SEO
        title="About Dr. Mogal Prasad Shah"
        description="Learn about Dr. Mogal Prasad Shah's distinguished career in livestock development, his education, and his commitment to rural agricultural transformation in Nepal."
        keywords="Dr. Mogal Prasad Shah, livestock expert biography, Nepal veterinary professional, M.Sc Animal Nutrition, Tribhuvan University, agricultural leader Nepal"
        canonical="https://drmogalshah.com.np/about"
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
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              About Dr. Shah
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A distinguished career dedicated to transforming livestock development and empowering rural communities across Nepal
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
                className="relative"
              >
                <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src={drShahHeadshot}
                    alt="Dr. Mogal Prasad Shah, Livestock Development Expert"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl p-6 shadow-2xl">
                  <div className="text-center text-[#0A2540]">
                    <div className="text-4xl font-display font-bold">27+</div>
                    <div className="text-sm font-medium">Years Leadership</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl font-bold text-[#0A2540] mb-6">
                  Professional Journey
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    Dr. Mogal Prasad Shah is a distinguished livestock development expert with over 27 years of senior leadership experience in veterinary sciences, animal nutrition, and rural agricultural transformation. His career has been defined by a deep commitment to improving the livelihoods of farming communities across Nepal.
                  </p>
                  <p>
                    As the former Director of the Directorate of Livestock and Fisheries Development, Dr. Shah provided strategic leadership to twelve government offices, overseeing program planning, monitoring, and evaluation across the Bagamati Province. His work has directly contributed to poverty alleviation, food security, and the development of sustainable livestock systems.
                  </p>
                  <p>
                    Throughout his career, Dr. Shah has collaborated with international organizations including the World Bank, government agencies, academic institutions, NGOs, and private sector partners. His multidisciplinary approach and cultural sensitivity have made him an effective leader in complex development environments.
                  </p>
                  <p>
                    Currently serving as an Animal Health Advisor at GeoKrishi, Dr. Shah continues to contribute his expertise to advancing livestock development and rural agricultural innovation in Nepal and beyond.
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
                Academic Excellence
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A strong foundation in veterinary sciences and animal nutrition from prestigious institutions
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
                                <span className="text-[#0A2540] font-semibold">Thesis: </span>
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
                Core Values
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Guiding principles that drive every initiative and partnership
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
                  Impact Across Nepal
                </h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Dr. Shah's work has touched thousands of lives across Nepal's diverse geographical regions, from the Terai plains to the mountain districts. His projects have focused on sustainable development, disease control, and economic empowerment of farming communities.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Globe2, label: "13 Districts", desc: "Bagamati Province Coverage" },
                    { icon: Users2, label: "50,000+", desc: "Farmers Supported" },
                    { icon: Briefcase, label: "100+", desc: "Projects Led" },
                    { icon: Award, label: "27 Years", desc: "Leadership Experience" },
                  ].map((stat, idx) => {
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
                className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1754932814698-b6f9152ad60a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbCUyMGthdGhtYW5kdSUyMHZhbGxleSUyMGxhbmRzY2FwZSUyMG1vdW50YWluc3xlbnwxfHx8fDE3NzIzNzg0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Nepal Landscape"
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