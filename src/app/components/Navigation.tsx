import { Link, useLocation } from "react-router";
import { Menu, X, CalendarCheck, Search, ChevronDown, Calculator, BookOpen, Map } from "lucide-react";
import { useState, useEffect, useCallback, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import drShahIllustration from "@/imports/avatar.webp";
import { useLanguage } from "../context/LanguageContext";
import { SearchPalette, useSearchPaletteShortcut } from "./SearchPalette";

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const isHomePage = location.pathname === "/";

  /* Global ⌘K / Ctrl+K / "/" shortcut for the search palette */
  useSearchPaletteShortcut(setSearchOpen);

  const openSearch = useCallback(() => {
    setIsOpen(false); // close the mobile menu if it's open
    setSearchOpen(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { path: string; label: string; labelEn: string }[] = [
    { path: "/",            label: t("nav_home"),        labelEn: "Home" },
    { path: "/about",       label: t("nav_about"),       labelEn: "About" },
    { path: "/services",    label: t("nav_expertise"),   labelEn: "Expertise" },
    { path: "/experience",  label: t("nav_experience"),  labelEn: "Experience" },
    { path: "/publications", label: t("nav_publications"), labelEn: "Publications" },
    { path: "/contact",     label: t("nav_contact"),     labelEn: "Contact" },
  ];

  /* Farmer-resource pages — grouped under one nav entry so the bar never
     overflows on narrower desktops. Each has an icon + bilingual blurb. */
  const resourceItems: { path: string; label: string; labelEn: string; icon: typeof Calculator; blurb: string }[] = [
    {
      path: "/tools",
      label: t("nav_tools"),
      labelEn: "Tools",
      icon: Calculator,
      blurb: language === "np" ? "तौल, गर्भावधि, जग्गा, चारा, खुराक क्यालकुलेटर" : "Weight, gestation, land, feed & dosage calculators",
    },
    {
      path: "/knowledge",
      label: t("nav_knowledge"),
      labelEn: "Knowledge",
      icon: BookOpen,
      blurb: language === "np" ? "कृषि तथा पशुपालन ज्ञान भण्डार" : "Agriculture & livestock knowledge base",
    },
    {
      path: "/agromap",
      label: t("nav_agromap"),
      labelEn: "Nepal Map",
      icon: Map,
      blurb: language === "np" ? "अन्तरक्रियात्मक कृषि नक्सा — ७ प्रदेश" : "Interactive agriculture map — 7 provinces",
    },
  ];
  const isResourceActive = resourceItems.some((r) => location.pathname === r.path);

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
              <div
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden ring-2 ring-[#D4AF37] ring-offset-2 shadow-lg"
                style={{ "--tw-ring-offset-color": isHomePage && !scrolled ? "#0A2540" : "#ffffff" } as CSSProperties}
              >
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
              <div
                className={`font-display text-xl font-bold transition-colors ${textColorClass === 'light' ? 'text-white' : 'text-[#0A2540]'}`}
              >
                {t("nav_name")}
              </div>
              <div className="text-xs text-[#D4AF37] font-medium tracking-wide">
                {t("nav_tagline")}
              </div>
            </div>

            {/* Mobile Logo Text - Compact Version */}
            <div className="block md:hidden">
              <div
                className={`font-display text-base font-bold transition-colors leading-tight ${textColorClass === 'light' ? 'text-white' : 'text-[#0A2540]'}`}
              >
                {language === "np" ? "डा. एम.पी. शाह" : "Dr. M.P. Shah"}
              </div>
              <div className="text-[10px] text-[#D4AF37] font-medium tracking-wide">
                {t("nav_mobile_tagline")}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.path}>
                <Link to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`nav-link relative px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
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
              </div>
            ))}

            {/* Resources dropdown — Tools · Knowledge · Nepal Agro-Map */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setResourcesOpen((v) => !v)}
                aria-expanded={resourcesOpen}
                aria-haspopup="menu"
                className={`nav-link relative flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isResourceActive
                    ? textColorClass === 'light'
                      ? "text-white font-semibold"
                      : "text-[#0A2540] font-semibold"
                    : textColorClass === 'light'
                    ? "text-gray-200 hover:text-white"
                    : "text-gray-700 hover:text-[#0A2540]"
                }`}
              >
                {t("nav_resources")}
                <motion.span animate={{ rotate: resourcesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} />
                </motion.span>
                {isResourceActive && (
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
              </button>
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 py-2"
                  >
                    {resourceItems.map((r) => {
                      const Icon = r.icon;
                      const active = location.pathname === r.path;
                      return (
                        <Link key={r.path} to={r.path} role="menuitem" onClick={() => setResourcesOpen(false)}>
                          <div
                            className={`flex items-start gap-3 px-4 py-3 mx-2 rounded-xl transition-colors ${
                              active ? "bg-[#D4AF37]/10" : "hover:bg-gray-50"
                            }`}
                          >
                            <span
                              className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                active ? "bg-[#D4AF37]/20 text-[#B8941F]" : "bg-[#0A2540]/[0.06] text-[#0A2540]"
                              }`}
                            >
                              <Icon size={17} />
                            </span>
                            <span className="min-w-0">
                              <span className={`block text-sm font-semibold ${active ? "text-[#B8941F]" : "text-[#0A2540]"}`}>
                                {r.label}
                              </span>
                              <span className="block text-xs text-gray-500 leading-snug mt-0.5">{r.blurb}</span>
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Site search (⌘K) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={openSearch}
              title="Search (Ctrl+K)"
              aria-label="Search the site"
              className={`ml-2 flex items-center justify-center w-10 h-10 rounded-lg border transition-all ${
                textColorClass === "light"
                  ? "border-white/25 text-white/70 hover:text-white hover:border-white/50"
                  : "border-gray-300 text-gray-500 hover:text-[#0A2540] hover:border-[#D4AF37]"
              }`}
            >
              <Search size={17} />
            </motion.button>

            {/* Language switcher */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === "en" ? "np" : "en")}
              className="ml-3 flex items-center gap-0.5 rounded-lg border border-[#D4AF37]/40 overflow-hidden text-xs font-semibold"
              title="Switch language / भाषा बदल्नुहोस्"
            >
              <span className={`px-2.5 py-2 transition-colors ${language === "en" ? "bg-[#D4AF37] text-[#0A2540]" : textColorClass === "light" ? "text-white/60 hover:text-white" : "text-gray-400 hover:text-gray-700"}`}>
                EN
              </span>
              <span className={`px-2.5 py-2 transition-colors ${language === "np" ? "bg-[#D4AF37] text-[#0A2540]" : textColorClass === "light" ? "text-white/60 hover:text-white" : "text-gray-400 hover:text-gray-700"}`}>
                NP
              </span>
            </motion.button>

            <Link to="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 flex items-center px-5 sm:px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <CalendarCheck className="mr-1.5" size={15} />
                {t("nav_booking")}
              </motion.button>
            </Link>
          </div>

          {/* Mobile Search Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={openSearch}
            aria-label="Search the site"
            className={`lg:hidden p-2 mr-1 rounded-lg ${
              textColorClass === 'light' ? "text-white" : "text-gray-900"
            }`}
          >
            <Search size={24} />
          </motion.button>

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
                      {language === "np" ? "डा. मोगल प्रसाद शाह" : "Dr. Mogal Prasad Shah"}
                    </div>
                    <div className="text-xs text-[#D4AF37] font-medium">
                      {language === "np" ? "पशुपालन विकास विशेषज्ञ" : "Livestock Development Expert"}
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="py-4 space-y-1 px-2">
                {/* Search trigger — opens the ⌘K palette */}
                <motion.button
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.12 }}
                  onClick={openSearch}
                  className="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 hover:border-[#D4AF37]/60 hover:text-[#0A2540] transition-all"
                >
                  <Search size={17} className="text-[#B8941F]" />
                  <span className="text-sm">{t("not_found_search_ph")}</span>
                </motion.button>
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
                        <span className="leading-relaxed">{item.label}</span>
                        {isActive(item.path) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-[#D4AF37] rounded-full"
                          />
                        )}
                      </div>
                      {/* Roman subtitle — bilingual wayfinding under Devanagari labels */}
                      {language === "np" && (
                        <span className="block mt-0.5 text-[11px] font-normal text-gray-400 leading-tight">
                          {item.labelEn}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Farmer resources — Tools · Knowledge · Nepal Agro-Map */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.08 + 0.15 }}
                  className="px-4 pt-4 pb-2"
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#B8941F]">
                    {t("nav_resources")}
                  </p>
                </motion.div>
                {resourceItems.map((r, index) => {
                  const Icon = r.icon;
                  const active = location.pathname === r.path;
                  return (
                    <motion.div
                      key={r.path}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: navItems.length * 0.08 + 0.2 + index * 0.06 }}
                    >
                      <Link
                        to={r.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                          active
                            ? "bg-gradient-to-r from-[#D4AF37]/15 to-[#D4AF37]/5 text-[#0A2540] font-semibold border-l-4 border-[#D4AF37]"
                            : "text-gray-700 hover:bg-gray-50 hover:pl-5"
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "bg-[#D4AF37]/20 text-[#B8941F]" : "bg-[#0A2540]/[0.06] text-[#0A2540]"}`}>
                          <Icon size={16} />
                        </span>
                        <span className="min-w-0">
                          <span className="block leading-relaxed">{r.label}</span>
                          <span className="block mt-0.5 text-[11px] font-normal text-gray-400 leading-tight truncate">
                            {r.blurb}
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Mobile Language Switcher */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.08 + 0.15 }}
                  className="px-2 pt-2"
                >
                  <button
                    onClick={() => setLanguage(language === "en" ? "np" : "en")}
                    className="w-full flex items-center justify-center gap-0 rounded-lg border border-[#D4AF37]/40 overflow-hidden text-sm font-semibold"
                  >
                    <span className={`font-deva flex-1 py-3 transition-colors ${language === "en" ? "bg-[#D4AF37] text-[#0A2540]" : "text-gray-500"}`}>
                      English
                    </span>
                    <span className={`font-deva flex-1 py-3 transition-colors ${language === "np" ? "bg-[#D4AF37] text-[#0A2540]" : "text-gray-500"}`}>
                      नेपाली
                    </span>
                  </button>
                </motion.div>

                {/* Mobile CTA Button — the booking wizard */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.08 + 0.2 }}
                  className="pt-2"
                >
                  <Link to="/booking" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-4 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] rounded-lg text-base font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                      <CalendarCheck size={17} />
                      <span>{language === "np" ? "परामर्श बुक गर्नुहोस्" : "Book a Consultation"}</span>
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

      {/* Global ⌘K search palette — available on every page */}
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </motion.nav>
  );
}