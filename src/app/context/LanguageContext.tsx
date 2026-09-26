import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Lang, type TranslationKey } from "../i18n/translations";

interface LanguageContextValue {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (key) => translations.en[key],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem("site_lang") as Lang) || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = language === "np" ? "ne" : "en";
    if (language === "np") {
      document.documentElement.classList.add("lang-np");
    } else {
      document.documentElement.classList.remove("lang-np");
    }
    // Devanagari fonts need no on-demand injection: they are self-hosted in
    // public/fonts/fonts.css with unicode-range, so browsers only fetch the
    // Devanagari binaries when Devanagari glyphs actually render on screen.
  }, [language]);

  const setLanguage = (lang: Lang) => {
    setLang(lang);
    try {
      localStorage.setItem("site_lang", lang);
    } catch {
      // ignore
    }
  };

  const t = (key: TranslationKey): string => {
    return (translations[language] as Record<string, string>)[key] ?? translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
