import * as rules from 'layout/forms/validation-rules';
import Dictionary from 'utils/dictionary/dictionary';

export function getUrlFromCriterias(criterias = {}) {
  let url = '';
  const keys = Object.keys(criterias).filter(key => criterias[key]);

  if (keys.length > 0) {
    url = `?${keys
      .reduce((acc, key) => {
        return [...acc, `${key}=${criterias[key]}`];
      }, [])
      .join('&')}`;
  }

  return url;
}

export function validate(scheme, values, path) {
  return Object.keys(scheme).reduce((acc, name) => {
    const errors = [];

    scheme[name].forEach(rule => {
      let errorMessage = rules[rule.name](values[name], values);
      if (errorMessage) {
        errorMessage = rule.dictionary ? Dictionary[rule.dictionary] : errorMessage;
        errors.push([errorMessage, `${path}${name}`]);
      }
    });

    return [...acc, ...errors];
  }, []);
}

export function storeToArray(store = {}) {
  return Object.keys(store).map(key => store[key]);
}

export function nestedStoreToFlat(store = {}) {
  const joinedItems = Object.keys(store).reduce((acc, key) => {
    return {
      ...acc,
      ...store[key],
    };
  }, {});

  return storeToArray(joinedItems);
}

export const uuid = () => (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
