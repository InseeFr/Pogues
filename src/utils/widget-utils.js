import { Children } from 'react';

export function getControlId(type, name, value) {
  let id = '';
  if (name) id = `${type}-${name}`;
  if (value) id = `${id}-${value.replace(/\s/g, '-')}`;
  return id;
}

export function getValuesFromControlOptions(options) {
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
