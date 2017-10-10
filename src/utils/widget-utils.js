import { Children } from 'react';

export function getControlId(type, name, value) {
  let id = '';
  if (name && value) id = `${type}-${name}-${value.replace(/\s/g, '-')}`;
  return id;
}

export function getValuesFromControlOptions(option) {
  return Children.map(option, op => {
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
