/** Make a store into an array of its values. */
export function storeToArray(
  store: { [key: string]: unknown } = {},
): unknown[] {
  return [...Object.values(store)];
}

/** Make a nested store into an array of its substores values. */
export function nestedStoreToFlat(
  store: { [key: string]: { [key: string]: unknown } } = {},
): unknown[] {
  const joinedItems = Object.keys(store).reduce((acc, key) => {
    return {
      ...acc,
      ...store[key],
    };
  }, {});

  return storeToArray(joinedItems);
}

/**
 * Generate a uid of 8 characters from current date and random number
 * in base 36 (e.g. "m5noru0h").
 *
 * We cannot use a true uuid for now because of back-end limitations.
 */
export function uuid() {
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
}

/** A label is made of 10 uppercased alphanumeric characters. */
export function nameFromLabel(label: string): string {
  return label
    .replace(/[^a-z0-9_]/gi, '')
    .toUpperCase()
    .slice(0, 10);
}

export function updateNameField(
  currentValueLabel: string,
  currentValueName: string,
): string {
  const value = currentValueName;

  if (currentValueName === '') {
    return nameFromLabel(currentValueLabel);
  }

  return value;
}

/** Add a `$` at the end of a variable if it is missing. */
export function verifyVariable(label: string): string {
  const expression = /\$([^\s]+)/g;
  const variables = label.match(expression);
  if (variables) {
    variables.forEach((variable) => {
      const find = variable.search(/[/\-*?^{€"%,}[\]@&'&=><+()!.:[\\]/g);
      let variable1 = variable;
      if (find !== -1 && variable[find - 1] !== '$') {
        variable1 = [variable.slice(0, find), '$', variable.slice(find)].join(
          '',
        );
      } else if (find === -1 && !variable.endsWith('$')) {
        variable1 = [
          variable.slice(0, variable.length),
          '$',
          variable.slice(variable.length),
        ].join('');
      }
      label = label.split(variable).join(variable1);
    });
  }
  return label;
}

/** Compute a weight superior to the other sequences. */
export function getSupWeight(
  components: {
    type?: string;
    weight?: number;
  }[],
): number {
  let sup = 1;
  Object.values(components)
    .filter((component) => component.type === 'SEQUENCE')
    .forEach((compo) => {
      if (compo.weight && compo.weight > sup) sup = compo.weight;
    });
  return sup + 1;
}
