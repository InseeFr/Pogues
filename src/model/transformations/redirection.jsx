import { uuid } from '../../utils/utils';

export function remoteToState(remote = []) {
  return remote.reduce((acc, redirection) => {
    const {
      Description: label,
      Expression: condition,
      IfTrue: cible,
    } = redirection;
    const id = redirection.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        label,
        condition,
        cible,
      },
    };
  }, {});
}

export function stateToRemote(state) {
  return Object.keys(state).map(key => {
    const {
      id,
      label: Description,
      condition: Expression,
      cible: IfTrue,
      flowControlType,
    } = state[key];
    const redirection = {
      id,
      Description,
      Expression,
      IfTrue,
    };
    if (flowControlType && flowControlType !== undefined) {
      redirection.flowControlType = flowControlType;
    }
    return redirection;
  });
}
