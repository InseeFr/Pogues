import { createI18nApi, declareComponentKeys } from 'i18nifty';

import type { ComponentKey } from './types';

export { declareComponentKeys };

const languages = ['fr', 'en'] as const;

export const fallbackLanguage = 'en';

export type Language = (typeof languages)[number];

export const {
  useTranslation,
  resolveLocalizedString,
  useLang,
  $lang,
  useResolveLocalizedString,
  getTranslation,
} = createI18nApi<ComponentKey>()(
  {
    languages,
    fallbackLanguage,
  },
  {
    en: () => import('./locales/en').then(({ translations }) => translations),
    fr: () => import('./locales/fr').then(({ translations }) => translations),
  },
);
