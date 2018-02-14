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
  return Object.keys(store).map(key => {
    const { id, label: Label, name: Name, formula: Formula } = store[key];
    return {
      id,
      Label,
      Name,
      Formula,
      type: CALCULATED
    };
  });
}
