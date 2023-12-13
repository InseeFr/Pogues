import Dictionary from '../../constants/dictionary';

/**
 * Based on the locale passed as a paremeter, this function will return
 * the corresponding dictionary.
 *
 * @param {string} lang the lang of the user
 */
export function createDictionary(lang) {
  return Object.keys(Dictionary).reduce((locale, k) => {
    locale[k] = Dictionary[k][lang];
    return locale;
  }, {});
}

/**
 * This function will return only the lang part of a locale
 * For example, with fr-FR, will return fr
 * If the lang is not fr, will return en
 * @param {string} lang the lang of the user
 */
export function getLang(locale) {
  let result = locale.split('-')[0];
  if (result !== 'fr') result = 'en';
  return result;
}

const result = createDictionary(
  getLang(navigator.language || navigator.browserLanguage),
);

export default result;
