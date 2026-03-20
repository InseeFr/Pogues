import { uuid } from '../../utils/utils';

export function remoteToState(remote = []) {
  const res = {};
  for (const declaration of remote) {
    const {
      declarationType,
      Text: label,
      position,
      DeclarationMode,
    } = declaration;

    const id = declaration.id || uuid();

    res[id] = {
      id,
      label: label.replace(/&#xd;/gi, '\n\n'),
      declarationType,
      position,
      TargetMode: DeclarationMode || [],
    };
  }
  return res;
}

export function stateToRemote(state) {
  return Object.keys(state).map((key) => {
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
