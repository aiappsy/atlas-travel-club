'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, Translations, NO_TRANSLATIONS, EN_TRANSLATIONS } from '@/lib/i18n/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('no'); // Default to Norwegian per brand founder

  useEffect(() => {
    try {
      const saved = localStorage.getItem('atlas_locale') as Locale | null;
      if (saved === 'no' || saved === 'en') {
        setLocaleState(saved);
        return;
      }
      // Auto-detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('nb') || browserLang.startsWith('nn') || browserLang.startsWith('no')) {
        setLocaleState('no');
      } else {
        setLocaleState('no'); // Keep Norwegian as default, easily switchable to English
      }
    } catch {
      // Ignore
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('atlas_locale', newLocale);
    } catch {
      // Ignore
    }
  };

  const t = locale === 'no' ? NO_TRANSLATIONS : EN_TRANSLATIONS;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
