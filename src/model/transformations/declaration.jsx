import { uuid } from '../../utils/utils';

export function remoteToState(remote = []) {
  return remote.reduce((acc, declaration) => {
    const {
      declarationType,
      Text: label,
      position,
      DeclarationMode,
    } = declaration;
    const id = declaration.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        label: label.replace(/&#xd;/gi, '\n\n'),
        declarationType,
        position,
        TargetMode: DeclarationMode || [],
      },
    };
  }, {});
}

export function stateToRemote(state) {
  return Object.keys(state).map(key => {
    const {
      id,
      declarationType,
      label: Text,
      position,
      TargetMode,
    } = state[key];
    return {
      id,
      Text: Text.replace(/\n\n/gi, '&#xd;'),
      declarationType,
      position,
      DeclarationMode: TargetMode,
    };
  });
}
