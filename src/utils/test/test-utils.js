import dictionary from 'constants/dictionary';
import { DEFAULT_LANG } from 'constants/pogues-constants';

export function getLocale(lang) {
  if (!lang) lang = DEFAULT_LANG;

  return Object.keys(dictionary).reduce((locale, k) => {
    locale[k] = dictionary[k][lang];
    return locale;
  }, {});
}

export default undefined;
