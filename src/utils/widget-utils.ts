import React, { Children } from 'react';

/** Compute a control id key with a name and value if provided. */
export function getControlId(
  type: string,
  name?: string,
  value?: string,
): string {
  let id = '';
  if (name) id = `${type}-${name}`;
  if (value) id = `${id}-${value.replace(/\s/g, '-')}`;
  return id;
}

/**
 * Compute custom options values from an <Option> component by using its
 * children as label.
 */
export function getValuesFromGenericOptions(
  options: React.ReactElement<{
    children: unknown;
    value: unknown;
    [key: string]: unknown;
  }>,
): { label: unknown; value: unknown; [key: string]: unknown }[] {
  return Children.map(options, (op) => {
    const { children: label, value, ...otherProps } = op.props;
    return {
      label: label,
      value: value,
      ...otherProps,
    } as { label: string; value: string; [key: string]: unknown };
  });
}

/** Add or remove a value to an array of string */
export function toggleValueInList(list: string[], value: string): string[] {
  let newList = [...list];
  const valuePosition = list.indexOf(value);

  if (valuePosition === -1) {
    newList = [...list, value];
  } else {
    newList.splice(valuePosition, 1);
  }

  return newList;
}

export function getCurrentSelectorPath(selectorPath: string = ''): string {
  return selectorPath !== '' ? `${selectorPath}.` : selectorPath;
}

/** Get the store values that have the provided property at a set value. */
export function filterStoreByProp(
  store: { [key: string]: { [prop: string]: unknown } } = {},
  propName: string,
  value: unknown,
): { [prop: string]: unknown }[] {
  return Object.keys(store)
    .filter((key) => store[key][propName] === value)
    .map((key) => store[key]);
}

/**
 * Compute a string into a kebabe-case key. For example "My plate of spaghetti"
 * will become "my-plate-of-spaghetti".
 */
export function getKey(str: string): string {
  return str.replace(/\s+/g, '-').toLowerCase();
}

/** Get the index of the item from a list that match all attributes */
export function getIndexItemsByAttrs(
  attrs: { [key: string]: unknown },
  items: { [key: string]: unknown }[],
): number | undefined {
  const searchedKey = Object.keys(attrs)
    .map((attrKey) => attrs[attrKey])
    .join('');

  const index = items
    .map((i) =>
      Object.keys(attrs)
        .map((attrKey) => i[attrKey])
        .join(''),
    )
    .indexOf(searchedKey);

  return index !== -1 ? index : undefined;
}
