import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Award } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A2540] text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center space-x-3 mb-6 justify-center md:justify-start">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center">
                <Award className="text-[#0A2540]" size={24} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">Dr. Mogal Prasad Shah</h3>
                <p className="text-xs text-[#D4AF37]">Livestock Development Expert</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              27+ years of excellence in veterinary sciences, livestock development, and rural agricultural innovation.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h4 className="font-display text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Expertise", path: "/services" },
                { label: "Experience", path: "/gallery" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
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
            className="text-center md:text-left"
          >
            <h4 className="font-display text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 justify-center md:justify-start">
                <Phone size={16} className="mt-1 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300">+977 XXX-XXXX-XXX</span>
              </li>
              <li className="flex items-start space-x-3 justify-center md:justify-start">
                <Mail size={16} className="mt-1 text-[#D4AF37] flex-shrink-0" />
                <a href="mailto:info@drmogalshah.com.np" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  info@drmogalshah.com.np
                </a>
              </li>
              <li className="flex items-start space-x-3 justify-center md:justify-start">
                <MapPin size={16} className="mt-1 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300">Bagamati Province<br />Nepal</span>
              </li>
            </ul>
          </motion.div>

          {/* Professional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center md:text-left"
          >
            <h4 className="font-display text-lg font-bold mb-6">Professional</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>✓ M.Sc. Animal Nutrition</li>
              <li>✓ PG Diploma (Netherlands)</li>
              <li>✓ Former Director, DLFD</li>
              <li>✓ 27+ Years Experience</li>
            </ul>
            <div className="flex space-x-3 mt-6 justify-center md:justify-start">
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
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-center md:text-left">
            <p className="text-gray-400">&copy; {currentYear} Dr. Mogal Prasad Shah. All rights reserved.</p>
            <div className="flex items-center space-x-2 flex-wrap justify-center">
              <span className="text-gray-400">Site developed with love</span>
              <span className="text-red-500 animate-pulse text-lg">❤️</span>
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