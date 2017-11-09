import { uuid } from 'utils/utils';
import { VARIABLES_TYPES } from 'constants/pogues-constants';

const { COLLECTED } = VARIABLES_TYPES;

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

export function remoteToComponentState(remote = []) {
  return remote.filter(r => r.CollectedVariableReference).map(r => r.CollectedVariableReference);
}

export function storeToRemote(store) {
  const collectedVariables = [];

  Object.keys(store).forEach(key => {
    const { id, name: Name, label: Label } = store[key];
    collectedVariables.push({
      id,
      Name,
      Label,
      type: COLLECTED,
    });
  });

  return collectedVariables;
}
