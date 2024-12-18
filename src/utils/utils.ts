/** Compute search parameters based on provided object. */
export function getUrlFromCriterias(
  criteria: { [key: string]: string | undefined } = {},
): string {
  let url = '';

  for (const key in criteria) {
    const v = criteria[key];
    if (v) {
      if (url === '') {
        url += '?';
      } else {
        url += '&';
      }
      url += `${key}=${encodeURIComponent(v)}`;
    }
  }

  return url;
}

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

/** Generate a random uuid of 36 characters. */
export function uuid() {
  return self.crypto.randomUUID();
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
