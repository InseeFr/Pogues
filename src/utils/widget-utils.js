import { Children } from 'react';

export function getControlId(type, name, value) {
  let id = '';
  if (name) id = `${type}-${name}`;
  if (value) id = `${id}-${value.replace(/\s/g, '-')}`;
  return id;
}

export function getValuesFromGenericOptions(options) {
  return Children.map(options, op => {
    const { children: label, value, ...otherProps } = op.props;
    return {
      label,
      value,
      ...otherProps,
    };
  });
}

export function toggleValueInList(list, value) {
  let newList = [...list];
  const valuePosition = list.indexOf(value);

  if (valuePosition === -1) {
    newList = [...list, value];
  } else {
    newList.splice(valuePosition, 1);
  }

  return newList;
}

export function getCurrentSelectorPath(selectorPath = '') {
  return selectorPath !== '' ? `${selectorPath}.` : selectorPath;
}

export function filterStoreByProp(store = {}, propName, value) {
  return Object.keys(store)
    .filter(key => store[key][propName] === value)
    .map(key => store[key]);
}

export function storeToArray(store = {}) {
  return Object.keys(store).map(key => store[key]);
}

export const uuid = () => (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
