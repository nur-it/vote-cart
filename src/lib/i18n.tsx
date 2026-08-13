"use client";

import { createContext, useContext, useEffect, useState } from "react";
import en, { type Locale } from "@/locales/en";
import ru from "@/locales/ru";

export type Lang = "en" | "ru";

const LOCALES: Record<Lang, Locale> = { en, ru };
const STORAGE_KEY = "lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Locale;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && stored in LOCALES) setLangState(stored);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: LOCALES[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
