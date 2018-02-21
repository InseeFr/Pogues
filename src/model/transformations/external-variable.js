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
        label
      }
    };
  }, {});
}

export function storeToRemote(store) {
  return Object.keys(store).map(key => {
    const { id, name: Name, label: Label } = store[key];
    return {
      id,
      Name,
      Label,
      type: EXTERNAL
    };
  });
}
