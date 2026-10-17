import i18next, { type i18n } from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import de from './locales/de.json';
import en from './locales/en.json';

export const LANGS = ['fr', 'de', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'fr';

export const resources = {
  fr: { translation: fr },
  de: { translation: de },
  en: { translation: en },
};

export function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang);
}

// La langue vient toujours du chemin de la page : une instance dédiée par rendu.
export function createI18n(lang: Lang): i18n {
  const instance = i18next.createInstance();
  instance.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
    initAsync: false,
  });
  return instance;
}
