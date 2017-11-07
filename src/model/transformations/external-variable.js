import { uuid } from 'utils/utils';
import { VARIABLES_TYPES } from 'constants/pogues-constants';

const { EXTERNAL } = VARIABLES_TYPES;

export function remoteToStore(remote = []) {
  return remote.reduce((acc, ev) => {
    const { Name: name, Label: label } = ev;
    const id = ev.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        name,
        label,
      },
    };
  }, {});
}

export function storeToRemote(store) {
  const externalVariables = [];

  Object.keys(store).forEach(key => {
    const { id, name: Name, label: Label } = store[key];
    externalVariables.push({
      id,
      Name,
      Label,
      type: EXTERNAL,
    });
  });

  return externalVariables;
}
