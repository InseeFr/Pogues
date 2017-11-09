import { uuid } from 'utils/utils';

export function remoteToState(remote = []) {
  return remote.reduce((acc, declaration) => {
    const { declarationType, Text: label, position } = declaration;
    const id = declaration.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        label,
        declarationType,
        position,
      },
    };
  }, {});
}

export function stateToRemote(state) {
  const declarations = [];

  Object.keys(state).forEach(key => {
    const { id, declarationType, label: Text, position } = state[key];
    declarations.push({
      id,
      Text,
      declarationType,
      position,
    });
  });

  return declarations;
}
