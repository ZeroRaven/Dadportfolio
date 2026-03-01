import { Link, useLocation } from "react-router";
import { Menu, X, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#0A2540] to-[#1A3A5C] rounded-xl flex items-center justify-center shadow-lg">
                <Award className="text-[#D4AF37]" size={28} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] rounded-full animate-pulse"></div>
            </motion.div>
            <div className="hidden md:block">
              <div className={`text-xl font-bold transition-colors ${textColorClass === 'light' ? 'text-white' : 'text-[#0A2540]'}`}>
                Dr. Mogal Prasad Shah
              </div>
              <div className="text-xs text-[#D4AF37] font-medium tracking-wide">
                M.Sc. | 27+ Years Excellence
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
              className="lg:hidden overflow-hidden bg-white border-t"
            >
              <div className="py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive(item.path)
                          ? "bg-[#D4AF37]/10 text-[#0A2540] font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <motion.button
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] rounded-lg text-base font-semibold"
                  >
                    Get in Touch
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}