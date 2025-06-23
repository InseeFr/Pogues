import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fr from './locales/fr.json';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      convertDetectedLanguage: (lng) => lng.split('-')[0],
    },
    supportedLngs: ['fr', 'en'],
    resources: {
      fr: {
        translation: fr,
      },
      en: {
        translation: en,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
