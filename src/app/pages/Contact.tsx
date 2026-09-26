import { useState, type ElementType } from "react";
import { Link } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { MapPin, Phone, Mail, Send, Linkedin, MessageCircle, Facebook, CheckCircle2, AlertCircle, Info, Loader2, ExternalLink, CalendarClock, Siren, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { SEO } from "../components/SEO";
import { siteConfig, telLink, whatsappLink, whatsappHandle } from "../config/site";
import { motion } from "motion/react";

type FormStatus = "idle" | "sending" | "success" | "error" | "mailto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  const [status, setStatus] = useState<FormStatus>("idle");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const mailtoHref = () => {
    const subject = encodeURIComponent(
      formData.subject || (np ? "वेबसाइट मार्फत सोधपुछ" : "Website inquiry")
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Organization: ${formData.organization || "N/A"}\n\n` +
        `Message:\n${formData.message}`
    );
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  /** Attempt delivery through the configured form service (Web3Forms / Formspree). */
  const deliverViaService = async (): Promise<boolean> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      let res: Response;
      if (siteConfig.formWeb3FormsKey) {
        res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: siteConfig.formWeb3FormsKey,
            subject: `${np ? "वेबसाइट सोधपुछ" : "Website inquiry"}: ${formData.subject}`,
            name: formData.name,
            email: formData.email,
            organization: formData.organization || "N/A",
            message: formData.message,
          }),
        });
        const data = await res.json().catch(() => ({ success: false }));
        return res.ok && data.success === true;
      }
      if (siteConfig.formspreeEndpoint) {
        res = await fetch(siteConfig.formspreeEndpoint, {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            organization: formData.organization || "N/A",
            subject: formData.subject,
            message: formData.message,
          }),
        });
        return res.ok;
      }
      return false;
    } catch {
      return false;
    } finally {
      clearTimeout(timeout);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Basic client-side validation with explicit feedback
    if (!formData.name.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setValidationError(np ? "कृपया अनिवार्य (*) भरिएका सबै विवरणहरू भर्नुहोस्।" : "Please fill in all required (*) fields.");
      return;
    }
    if (!EMAIL_RE.test(formData.email.trim())) {
      setValidationError(np ? "कृपया मान्य इमेल ठेगाना भर्नुहोस्।" : "Please enter a valid email address.");
      return;
    }

    // Honeypot filled → silently pretend success (spam bot)
    if (honeypot) {
      setStatus("success");
      return;
    }

    const hasService = Boolean(siteConfig.formWeb3FormsKey || siteConfig.formspreeEndpoint);

    if (hasService) {
      setStatus("sending");
      const delivered = await deliverViaService();
      if (delivered) {
        setStatus("success");
        setFormData({ name: "", email: "", organization: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
      return;
    }

    // No form service configured yet → graceful mailto handoff WITH feedback
    window.location.href = mailtoHref();
    setStatus("mailto");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setStatus("idle");
    setValidationError(null);
  };

  const phone = telLink();
  const wa = whatsappLink(np
    ? "नमस्ते डा. शाह, म तपाईंको वेबसाइटमार्फत सम्पर्क गर्दैछु।"
    : undefined);

  type ContactInfo = { icon: ElementType; title: string; primary: string; secondary: string; href?: string };
  const contactInfo: ContactInfo[] = [
    ...(phone
      ? [
          {
            icon: Phone,
            title: np ? "फोन" : "Phone",
            primary: siteConfig.phone,
            secondary: siteConfig.availability[np ? "np" : "en"],
            href: phone,
          },
        ]
      : [
          {
            icon: Linkedin,
            title: np ? "लिङ्कडइन" : "LinkedIn",
            primary: "in/dr-mogal-prasad-shah",
            secondary: np ? "व्यावसायिक प्रोफाइल र सिफारिसहरू" : "Professional profile & recommendations",
            href: siteConfig.linkedin,
          },
        ]),
    ...(wa
      ? [
          {
            icon: MessageCircle,
            title: "WhatsApp",
            primary: whatsappHandle() ?? siteConfig.phone,
            secondary: np ? "चाँडै सन्देश पठाउनुहोस्" : "Quick chat — usually replies fast",
            href: wa,
          },
        ]
      : []),
    {
      icon: Mail,
      title: np ? "इमेल" : "Email",
      primary: siteConfig.email,
      secondary: np ? "२४ घण्टाभित्र जवाफ" : "Response within 24 hours",
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: MapPin,
      title: np ? "स्थान" : "Location",
      primary: siteConfig.location[np ? "np" : "en"].primary,
      secondary: siteConfig.location[np ? "np" : "en"].secondary,
      href: undefined,
    },
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
        path="/contact"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                          <a
                            href={info.href}
                            target={info.href.startsWith("http") ? "_blank" : undefined}
                            rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-gray-900 font-semibold mb-1 hover:text-[#D4AF37] transition-colors block break-all"
                          >
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
            {/* Emergency guidance strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 rounded-2xl bg-red-50 border border-red-200/80 px-5 sm:px-7 py-4 flex flex-col sm:flex-row items-center gap-4 justify-between"
              role="note"
            >
              <div className="flex items-center gap-4 text-center sm:text-left">
                <span className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Siren className="text-red-600" size={21} />
                </span>
                <div>
                  <p className="font-semibold text-red-900 leading-snug">
                    {np ? "पशुको स्वास्थ्य आकस्मिक अवस्था?" : "Animal health emergency?"}
                  </p>
                  <p className="text-sm text-red-700/80 leading-snug">
                    {np ? "फारम नभर्नुहोस् — सिधै फोन गर्नुहोस्।" : "Skip the form — call directly for urgent cases."}
                  </p>
                </div>
              </div>
              {phone && (
                <a
                  href={phone}
                  className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-red-600/20 transition-colors"
                >
                  <Phone size={16} />
                  {siteConfig.phone}
                </a>
              )}
            </motion.div>

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
                    <h2 className="font-display text-3xl font-bold text-[#0A2540] mb-3">
                      {np ? "सन्देश पठाउनुहोस्" : "Send a Message"}
                    </h2>
                    <p className="text-gray-600 mb-8">
                      {np
                        ? "सहकार्यमा रुचि छ वा कुनै प्रश्न छ? तल फारम भर्नुहोस् र म छिट्टै जवाफ दिनेछु।"
                        : "Interested in collaboration or have a question? Fill out the form below and I'll respond promptly."}
                    </p>

                    {/* Booking wizard shortcut — the full guided flow lives at /booking */}
                    <Link to="/booking" className="block mb-8 group">
                      <div className="flex items-center justify-between gap-4 rounded-xl border-2 border-[#D4AF37]/30 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/60 px-5 py-4 transition-all">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-[#0A2540] flex items-center justify-center flex-shrink-0">
                            <CalendarClock size={20} />
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-[#0A2540] text-sm sm:text-base">
                              {np ? "परामर्श चाहियो? बुकिङ विजार्ड खोल्नुहोस्" : "Need an appointment? Open the booking wizard"}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                              {np ? "सेवा · समय · विवरण — १ मिनेटमा पुरा" : "Service · time · details — all in under a minute"}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="text-[#B8941F] group-hover:translate-x-1 transition-transform flex-shrink-0" size={18} />
                      </div>
                    </Link>

                    {status === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-xl border-2 border-green-200 bg-green-50 p-8 text-center"
                        role="status"
                      >
                        <CheckCircle2 className="mx-auto mb-4 text-green-600" size={48} />
                        <h3 className="font-display text-2xl font-bold text-[#0A2540] mb-2">
                          {np ? "सन्देश पठाइयो!" : "Message Sent!"}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {np
                            ? "तपाईंको सन्देश सफलतापूर्वक पठाइयो। म २४ घण्टाभित्र जवाफ दिनेछु। धन्यवाद!"
                            : "Your message was delivered successfully. I will get back to you within 24 hours. Thank you!"}
                        </p>
                        <Button onClick={resetForm} variant="outline" className="border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white">
                          {np ? "अर्को सन्देश पठाउनुहोस्" : "Send Another Message"}
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="name" className="text-[#0A2540]">{np ? "पूरा नाम *" : "Full Name *"}</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              autoComplete="name"
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
                              autoComplete="email"
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
                              autoComplete="organization"
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

                        {/* Honeypot — hidden from humans, catches spam bots */}
                        <input
                          type="text"
                          name="botcheck"
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          className="hidden"
                          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                        />

                        {validationError && (
                          <div className="flex items-start space-x-3 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
                            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-sm text-red-700">{validationError}</p>
                          </div>
                        )}

                        {status === "error" && (
                          <div className="flex items-start space-x-3 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
                            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                            <div className="text-sm text-red-700">
                              <p className="font-semibold mb-1">{np ? "पठाउन असफल भयो" : "Sending failed"}</p>
                              <p>
                                {np
                                  ? "सञ्जाल समस्याका कारण सन्देश पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोस् वा "
                                  : "The message could not be delivered due to a network issue. Please try again, or "}
                                <a href={mailtoHref()} className="font-semibold underline hover:text-red-900">
                                  {np ? "सिधै इमेल गर्नुहोस्" : "email directly"}
                                </a>
                                {np ? "।" : "."}
                              </p>
                            </div>
                          </div>
                        )}

                        {status === "mailto" && (
                          <div className="flex items-start space-x-3 rounded-lg border border-blue-200 bg-blue-50 p-4" role="status">
                            <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                            <div className="text-sm text-blue-800">
                              <p className="font-semibold mb-1">{np ? "इमेल एप खुल्दैछ…" : "Opening your email app…"}</p>
                              <p>
                                {np
                                  ? "तपाईंको सन्देश इमेल एपमा तयार गरिएको छ। यदि केही खुलेन भने, "
                                  : "Your message has been prepared in your email application. If nothing opened, "}
                                <a href={mailtoHref()} className="font-semibold underline hover:text-blue-900">
                                  {np ? "यहाँ क्लिक गर्नुहोस्" : "click here"}
                                </a>
                                {np
                                  ? " वा " + siteConfig.email + " मा सिधै लेख्नुहोस्।"
                                  : " or write to " + siteConfig.email + " directly."}
                              </p>
                            </div>
                          </div>
                        )}

                        <Button
                          type="submit"
                          size="lg"
                          disabled={status === "sending"}
                          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {status === "sending" ? (
                            <>
                              <Loader2 className="mr-2 animate-spin" size={20} />
                              {np ? "पठाउँदै…" : "Sending…"}
                            </>
                          ) : (
                            <>
                              <Send className="mr-2" size={20} />
                              {np ? "सन्देश पठाउनुहोस्" : "Send Message"}
                            </>
                          )}
                        </Button>
                      </form>
                    )}
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
                        href={siteConfig.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 px-3 py-3 bg-[#0077B5] hover:bg-[#006399] text-white rounded-lg transition-colors min-w-[100px]"
                      >
                        <Linkedin size={18} />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                      <a
                        href={siteConfig.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 px-3 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg transition-colors min-w-[100px]"
                      >
                        <Facebook size={18} />
                        <span className="text-sm font-medium">Facebook</span>
                      </a>
                      <a
                        href={`mailto:${siteConfig.email}`}
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
