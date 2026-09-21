import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import drShahIllustration from "@/imports/image-1.png";

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Expertise" },
    { path: "/gallery", label: "Experience" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Determine nav bar style based on page and scroll state
  const getNavStyle = () => {
    if (isHomePage) {
      return scrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg"
        : "bg-[#0A2540]/80 backdrop-blur-sm";
    }
    return "bg-white/95 backdrop-blur-md shadow-lg";
  };

  const getTextColor = () => {
    if (isHomePage && !scrolled) {
      return "light"; // White text on dark background
    }
    return "dark"; // Dark text on white background
  };

  const textColorClass = getTextColor();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${getNavStyle()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative flex-shrink-0"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-transparent shadow-lg">
                <img
                  src={drShahIllustration}
                  alt="Dr. Mogal Prasad Shah portrait"
                  className="w-full h-full object-cover object-top scale-110"
                  style={{ filter: "sepia(0.25) contrast(1.1) brightness(1.03) saturate(1.1)" }}
                />
              </div>
            </motion.div>
            
            {/* Desktop Logo Text */}
            <div className="hidden md:block">
              <div className={`text-xl font-bold transition-colors ${textColorClass === 'light' ? 'text-white' : 'text-[#0A2540]'}`}>
                Dr. Mogal Prasad Shah
              </div>
              <div className="text-xs text-[#D4AF37] font-medium tracking-wide">
                M.Sc. | 27+ Years Excellence
              </div>
            </div>
            
            {/* Mobile Logo Text - Compact Version */}
            <div className="block md:hidden">
              <div className={`text-base font-bold transition-colors leading-tight ${textColorClass === 'light' ? 'text-white' : 'text-[#0A2540]'}`}>
                Dr. M.P. Shah
              </div>
              <div className="text-[10px] text-[#D4AF37] font-medium tracking-wide">
                Livestock Expert
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? textColorClass === 'light'
                        ? "text-white font-semibold" 
                        : "text-[#0A2540] font-semibold"
                      : textColorClass === 'light'
                      ? "text-gray-200 hover:text-white"
                      : "text-gray-700 hover:text-[#0A2540]"
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute inset-0 rounded-lg ${
                        textColorClass === 'light'
                          ? "bg-white/10 border-2 border-white/20" 
                          : "bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30"
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Get in Touch
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              textColorClass === 'light' ? "text-white" : "text-gray-900"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white/98 backdrop-blur-md border-t border-gray-200 shadow-xl"
            >
              {/* Mobile Menu Header with Full Name */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="px-4 pt-4 pb-3 border-b border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#D4AF37] shadow-md flex-shrink-0">
                    <img
                      src={drShahIllustration}
                      alt="Dr. Mogal Prasad Shah portrait"
                      className="w-full h-full object-cover object-top scale-110"
                      style={{ filter: "sepia(0.25) contrast(1.1) brightness(1.03) saturate(1.1)" }}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0A2540]">
                      Dr. Mogal Prasad Shah
                    </div>
                    <div className="text-xs text-[#D4AF37] font-medium">
                      Livestock Development Expert
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="py-4 space-y-1 px-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08 + 0.2 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                        isActive(item.path)
                          ? "bg-gradient-to-r from-[#D4AF37]/15 to-[#D4AF37]/5 text-[#0A2540] font-semibold border-l-4 border-[#D4AF37]"
                          : "text-gray-700 hover:bg-gray-50 hover:pl-5"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {isActive(item.path) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-[#D4AF37] rounded-full"
                          />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.08 + 0.2 }}
                  className="pt-4"
                >
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-4 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] rounded-lg text-base font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                      <span>Get in Touch</span>
                      <motion.svg
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}