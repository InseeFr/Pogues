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

export function getKey(str) {
  return str.replace(/\s+/g, '-').toLowerCase();
}

export function getIndexItemsByAttrs(attrs, items) {
  const searchedKey = Object.keys(attrs)
    .map(attrKey => attrs[attrKey])
    .join('');

  const index = items
    .map(i =>
      Object.keys(attrs)
        .map(attrKey => i[attrKey])
        .join(''),
    )
    .indexOf(searchedKey);

  return index !== -1 ? index : undefined;
}
