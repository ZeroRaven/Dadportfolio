import { Mail, Phone, MapPin, Linkedin, Facebook } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import drShahIllustration from "@/imports/image-1.png";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const np = language === "np";

  return (
    <footer className="relative bg-[#0A2540] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-10 sm:mb-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center sm:text-left"
          >
            <div className="flex items-center space-x-3 mb-5 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#D4AF37] flex-shrink-0">
                <img
                  src={drShahIllustration}
                  alt="Dr. Mogal Prasad Shah"
                  className="w-full h-full object-cover object-top scale-110"
                  style={{ filter: "sepia(0.25) contrast(1.1) brightness(1.03) saturate(1.1)" }}
                />
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold leading-tight">{np ? "डा. मोगल प्रसाद शाह" : "Dr. Mogal Prasad Shah"}</h3>
                <p className="text-xs text-[#D4AF37]">{np ? "पशुपालन विकास विशेषज्ञ" : "Livestock Development Expert"}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {np ? "पशु चिकित्सा विज्ञान, पशुपालन विकास र ग्रामीण कृषि नवाचारमा २७+ वर्षको उत्कृष्टता।" : "27+ years of excellence in veterinary sciences, livestock development, and rural agricultural innovation."}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center sm:text-left"
          >
            <h4 className="font-display text-base sm:text-lg font-bold mb-5">{np ? "द्रुत लिङ्कहरू" : "Quick Links"}</h4>
            <ul className="space-y-3 text-sm">
              {(np ? [
                { label: "गृह", path: "/" },
                { label: "परिचय", path: "/about" },
                { label: "विशेषज्ञता", path: "/services" },
                { label: "अनुभव", path: "/experience" },
                { label: "सम्पर्क", path: "/contact" },
              ] : [
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Expertise", path: "/services" },
                { label: "Experience", path: "/experience" },
                { label: "Contact", path: "/contact" },
              ]).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#D4AF37] transition-colors inline-flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2 group-hover:w-3 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center sm:text-left"
          >
            <h4 className="font-display text-base sm:text-lg font-bold mb-5">{np ? "सम्पर्क" : "Contact"}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 justify-center sm:justify-start">
                <Phone size={15} className="mt-0.5 text-[#D4AF37] flex-shrink-0" />
                <a href="tel:+977XXXXXXXXX" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  +977 XXX-XXXX-XXX
                </a>
              </li>
              <li className="flex items-start space-x-3 justify-center sm:justify-start">
                <Mail size={15} className="mt-0.5 text-[#D4AF37] flex-shrink-0" />
                <a href="mailto:info@drmogalshah.com.np" className="text-gray-300 hover:text-[#D4AF37] transition-colors break-all">
                  info@drmogalshah.com.np
                </a>
              </li>
              <li className="flex items-start space-x-3 justify-center sm:justify-start">
                <MapPin size={15} className="mt-0.5 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300">{np ? "बागमती प्रदेश" : "Bagamati Province"}<br />{np ? "नेपाल" : "Nepal"}</span>
              </li>
            </ul>
          </motion.div>

          {/* Professional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center sm:text-left"
          >
            <h4 className="font-display text-base sm:text-lg font-bold mb-5">{np ? "योग्यताहरू" : "Credentials"}</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {(np ? [
                "एम.एस्सी. पशु पोषण",
                "स्नातकोत्तर डिप्लोमा (नेदरल्याण्ड्स)",
                "पूर्व निर्देशक, DLFD",
                "२७+ वर्षको अनुभव",
              ] : [
                "M.Sc. Animal Nutrition",
                "PG Diploma (Netherlands)",
                "Former Director, DLFD",
                "27+ Years Experience",
              ]).map((cred) => (
                <li key={cred} className="flex items-center space-x-2 justify-center sm:justify-start">
                  <span className="text-[#D4AF37] text-xs">✓</span>
                  <span>{cred}</span>
                </li>
              ))}</ul>
            <div className="flex space-x-3 mt-5 justify-center sm:justify-start">
              <a
                href="https://www.linkedin.com/in/dr-mogal-prasad-shah/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.facebook.com/mpsah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:info@drmogalshah.com.np"
                className="w-10 h-10 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-6 sm:pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-sm text-center">
            <p className="text-gray-400">&copy; {currentYear} {np ? "डा. मोगल प्रसाद शाह। सर्वाधिकार सुरक्षित।" : "Dr. Mogal Prasad Shah. All rights reserved."}</p>
            <div className="flex items-center space-x-2 flex-wrap justify-center">
              <span className="text-gray-400">Site developed with love</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span className="text-gray-400">by</span>
              <a
                href="https://www.amreshshah.com.np"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#E5C158] font-semibold transition-colors hover:underline"
              >
                Amresh Shah
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
