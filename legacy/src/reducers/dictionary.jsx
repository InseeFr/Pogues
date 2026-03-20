import dictionary from '../constants/dictionary';

let language = (navigator.language || navigator.browserLanguage).split('-')[0];
if (language !== 'fr') language = 'en';

const locale = Object.keys(dictionary).reduce((localeInner, k) => {
  localeInner[k] = dictionary[k][language];
  return localeInner;
}, {});

export default function () {
  return locale;
}

export function getLocale() {
  return language;
}
