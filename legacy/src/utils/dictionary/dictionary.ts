import dictionary from '@/constants/dictionary';

/**
 * Based on the locale passed as a paremeter, this function will return
 * the corresponding dictionary.
 *
 * @param {string} lang the lang of the user
 */
export function createDictionary(lang: 'fr' | 'en'): { [key: string]: string } {
  return Object.keys(dictionary).reduce(
    (locale: { [key: string]: string }, k) => {
      locale[k] = dictionary[k][lang];
      return locale;
    },
    {},
  );
}

/**
 * This function will return only the lang part of a locale
 * For example, with fr-FR, will return fr
 * If the lang is not fr, will return en
 * @param {string} lang the lang of the user
 */
export function getLang(locale: string): 'fr' | 'en' {
  const result = locale.split('-')[0];
  if (result !== 'fr') return 'en';
  return 'fr';
}

const result = createDictionary(getLang(navigator.language));

export default result;
