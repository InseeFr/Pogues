import dictionary from 'constants/dictionary';
// Should be done on the server ?
// TODO we cannot change language for now (see if it's important).
// TODO To avoid some boilerplate with passing `locale` to each component, we
// could pass it from context :
// https://facebook.github.io/react/docs/context.html, but it might be
// more difficult to update the state after.

let language = (navigator.language || navigator.browserLanguage).split('-')[0];
if (language !== 'fr') language = 'en';

const locale = Object.keys(dictionary).reduce((locale, k) => {
  locale[k] = dictionary[k][language];
  return locale;
}, {});

export default function() {
  return locale;
}

export function getLocale() {
  return language;
}
