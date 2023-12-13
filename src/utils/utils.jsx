import * as rules from '../forms/validation-rules';
import Dictionary from './dictionary/dictionary';

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
        errorMessage = rule.dictionary
          ? Dictionary[rule.dictionary]
          : errorMessage;
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

export const uuid = () =>
  (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

export function nameFromLabel(label) {
  return label
    .replace(/[^a-z0-9_]/gi, '')
    .toUpperCase()
    .slice(0, 10);
}

export function updateNameField(currentValueLabel, currentValueName) {
  const value = currentValueName;

  if (currentValueName === '') {
    return nameFromLabel(currentValueLabel);
  }

  return value;
}

export function verifyVariable(label) {
  const expression = /\$([^\s]+)/g;
  const variables = label.match(expression);
  if (variables) {
    variables.forEach(variable => {
      const find = variable.search(/[/\-*?^{€"%,}[\]@&'&=><+()!.:[\\]/g);
      let variable1 = variable;
      if (find !== -1 && variable[find - 1] !== '$') {
        variable1 = [variable.slice(0, find), '$', variable.slice(find)].join(
          '',
        );
      } else if (find === -1 && variable[variable.length - 1] !== '$') {
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

export function getSupWeight(components) {
  let sup = 1;
  Object.values(components)
    .filter(component => component.type === 'SEQUENCE')
    .forEach(compo => {
      if (compo.weight && compo.weight > sup) sup = compo.weight;
    });
  return sup + 1;
}
