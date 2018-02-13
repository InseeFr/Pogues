import { uuid } from 'utils/utils';
import { VARIABLES_TYPES } from 'constants/pogues-constants';

const { CALCULATED } = VARIABLES_TYPES;

export function remoteToStore(remote = []) {
  return remote.reduce((acc, cv) => {
    const { Label: label, Name: name, Formula: formula } = cv;
    const id = cv.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        label,
        name,
        formula
      }
    };
  }, {});
}

export function storeToRemote(store) {
  const calculatedVariables = [];

  Object.keys(store).forEach(key => {
    const { id, label: Label, name: Name, formula: Formula } = store[key];
    calculatedVariables.push({
      id,
      Label,
      Name,
      Formula,
      type: CALCULATED
    });
  });

  return calculatedVariables;
}
