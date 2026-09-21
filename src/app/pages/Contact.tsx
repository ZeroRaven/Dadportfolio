import { useState, type ElementType } from "react";
import { useLanguage } from "../context/LanguageContext";
import { MapPin, Phone, Mail, Send, Linkedin, MessageCircle, Facebook } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { motion } from "motion/react";

export function Contact() {
  const { language } = useLanguage();
  const np = language === "np";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Organization: ${formData.organization || 'N/A'}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:info@drmogalshah.com.np?subject=${subject}&body=${body}`;
    
    // Clear form after opening email client
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  type ContactInfo = { icon: ElementType; title: string; primary: string; secondary: string; href?: string };
  const contactInfo: ContactInfo[] = np ? [
    {
      icon: Phone,
      title: "फोन",
      primary: "+977 XXX-XXXX-XXX",
      secondary: "सोम-शुक्र, बिहान ९ - साँझ ५ उपलब्ध",
      href: "tel:+977XXXXXXXXX"
    },
    {
      icon: Mail,
      title: "इमेल",
      primary: "info@drmogalshah.com.np",
      secondary: "२४ घण्टाभित्र जवाफ",
      href: "mailto:info@drmogalshah.com.np"
    },
    {
      icon: MapPin,
      title: "स्थान",
      primary: "बागमती प्रदेश",
      secondary: "नेपाल",
      href: undefined
    }
  ] : [
    {
      icon: Phone,
      title: "Phone",
      primary: "+977 XXX-XXXX-XXX",
      secondary: "Available Mon-Fri, 9AM-5PM",
      href: "tel:+977XXXXXXXXX"
    },
    {
      icon: Mail,
      title: "Email",
      primary: "info@drmogalshah.com.np",
      secondary: "Response within 24 hours",
      href: "mailto:info@drmogalshah.com.np"
    },
    {
      icon: MapPin,
      title: "Location",
      primary: "Bagamati Province",
      secondary: "Nepal",
      href: undefined
    }
  ];

  const collaborationAreas = np ? [
    "रणनीतिक परामर्श र सल्लाह",
    "परियोजना डिजाइन र व्यवस्थापन",
    "प्राविधिक मूल्यांकन",
    "नीति निर्माण",
    "क्षमता निर्माण कार्यक्रम",
    "अनुसन्धान साझेदारी"
  ] : [
    "Strategic Consulting & Advisory",
    "Project Design & Management",
    "Technical Assessments",
    "Policy Formulation",
    "Capacity Building Programs",
    "Research Partnerships"
  ];

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Dr. Mogal Prasad Shah for consulting, advisory services, strategic partnerships, or collaboration opportunities in livestock development and food security."
        keywords="contact livestock expert, agricultural consultant Nepal, veterinary consultant, partnership opportunities"
        canonical="https://drmogalshah.com.np/contact"
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
              {np ? "सम्पर्कमा रहौं" : "Let's Connect"}
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {np
                ? "पशुपालन विकास र कृषि नवाचारमा परामर्श अवसर, रणनीतिक साझेदारी र सहकार्य पहलहरूका लागि खुला"
                : "Open to consulting opportunities, strategic partnerships, and collaborative initiatives in livestock development and agricultural innovation"}
            </p>
          </motion.div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center border-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl bg-white">
                      <CardContent className="p-6 sm:p-8">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                          <Icon className="text-[#D4AF37]" size={28} />
                        </div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#0A2540] mb-2">{info.title}</h3>
                        {info.href ? (
                          <a href={info.href} className="text-gray-900 font-semibold mb-1 hover:text-[#D4AF37] transition-colors block break-all">
                            {info.primary}
                          </a>
                        ) : (
                          <p className="text-gray-900 font-semibold mb-1">{info.primary}</p>
                        )}
                        <p className="text-sm text-gray-600">{info.secondary}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Form and Info Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                <Card className="border-2 border-[#D4AF37]/20 shadow-xl bg-white">
                  <CardContent className="p-5 sm:p-8 md:p-12">
                    <h2 className="font-display text-3xl font-bold text-[#0A2540] mb-3">{np ? "सन्देश पठाउनुहोस्" : "Send a Message"}</h2>
                    <p className="text-gray-600 mb-8">
                      {np
                        ? "सहकार्यमा रुचि छ वा कुनै प्रश्न छ? तल फारम भर्नुहोस् र म छिट्टै जवाफ दिनेछु।"
                        : "Interested in collaboration or have a question? Fill out the form below and I'll respond promptly."}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-[#0A2540]">{np ? "पूरा नाम *" : "Full Name *"}</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder={np ? "तपाईंको नाम" : "Your name"}
                            className="mt-2 border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-[#0A2540]">{np ? "इमेल ठेगाना *" : "Email Address *"}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            className="mt-2 border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="organization" className="text-[#0A2540]">{np ? "संगठन" : "Organization"}</Label>
                          <Input
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder={np ? "तपाईंको संगठन" : "Your organization"}
                            className="mt-2 border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                        </div>

                        <div>
                          <Label htmlFor="subject" className="text-[#0A2540]">{np ? "विषय *" : "Subject *"}</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder={np ? "संक्षिप्त विषय" : "Brief subject"}
                            className="mt-2 border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-[#0A2540]">{np ? "सन्देश *" : "Message *"}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder={np ? "तपाईंको सोधपुछ, परियोजना वा सहकार्य अवसरबारे बताउनुहोस्..." : "Tell me about your inquiry, project, or collaboration opportunity..."}
                          rows={6}
                          className="mt-2 resize-none border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg"
                        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold text-lg"
                      >
                        <Send className="mr-2" size={20} />
                        {np ? "सन्देश पठाउनुहोस्" : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sidebar Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-8"
              >
                {/* Collaboration Areas */}
                <Card className="bg-gradient-to-br from-[#0A2540] to-[#1A3A5C] text-white border-0 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="font-display text-2xl font-bold mb-6">{np ? "सहकार्य क्षेत्रहरू" : "Collaboration Areas"}</h3>
                    <ul className="space-y-3">
                      {collaborationAreas.map((area, idx) => (
                        <motion.li
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
                          <span className="text-gray-200">{area}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Social Connect */}
                <Card className="border-2 border-[#D4AF37]/20 shadow-xl bg-white">
                  <CardContent className="p-8">
                    <h3 className="font-display text-2xl font-bold text-[#0A2540] mb-4">{np ? "सामाजिक सञ्जालमा जोडिनुहोस्" : "Connect on Social"}</h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      {np ? "परियोजनाहरू र अन्तर्दृष्टिमा अपडेटका लागि पछ्याउनुहोस् र जोडिनुहोस्" : "Follow and connect for updates on projects and insights"}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://www.linkedin.com/in/dr-mogal-prasad-shah/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 px-3 py-3 bg-[#0077B5] hover:bg-[#006399] text-white rounded-lg transition-colors min-w-[100px]"
                      >
                        <Linkedin size={18} />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                      <a
                        href="https://www.facebook.com/mpsah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 px-3 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg transition-colors min-w-[100px]"
                      >
                        <Facebook size={18} />
                        <span className="text-sm font-medium">Facebook</span>
                      </a>
                      <a
                        href="mailto:info@drmogalshah.com.np"
                        className="w-full flex items-center justify-center space-x-2 px-3 py-3 bg-[#D4AF37] hover:bg-[#B8941F] text-[#0A2540] rounded-lg transition-colors"
                      >
                        <Mail size={18} />
                        <span className="text-sm font-medium">Email</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Availability */}
                <Card className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] border-0 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <MessageCircle size={48} className="text-[#0A2540] mx-auto mb-4" />
                    <h3 className="font-display text-xl font-bold text-[#0A2540] mb-2">
                      {np ? "परामर्शका लागि उपलब्ध" : "Available for Consulting"}
                    </h3>
                    <p className="text-sm text-[#0A2540]/80">
                      {np ? "अल्पकालीन र दीर्घकालीन संलग्नताका लागि खुला" : "Open to short-term and long-term engagements"}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}