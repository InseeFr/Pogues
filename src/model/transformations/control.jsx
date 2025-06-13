import { uuid } from '../../utils/utils';

export function remoteToState(remote = []) {
  const res = {};
  for (const control of remote) {
    const {
      Description: label,
      Expression: condition,
      FailMessage: message,
      criticity,
      during_collect,
      post_collect,
      scope,
    } = control;

    const id = control.id || uuid();

    res[id] = {
      id,
      label,
      condition,
      message,
      criticity,
      during_collect,
      post_collect,
      scope:
        scope === 'line' || scope === 'occurrence' ? 'OCCURRENCE' : 'WHOLE',
    };
  }
  return res;
}

export function stateToRemote(state) {
  return Object.keys(state).map((key) => {
    const {
      id,
      label: Description,
      condition: Expression,
      message: FailMessage,
      criticity,
      during_collect,
      post_collect,
      scope,
    } = state[key];

    return {
      id,
      Description,
      Expression,
      FailMessage,
      criticity,
      during_collect,
      post_collect,
      scope: scope === 'OCCURRENCE' ? 'occurrence' : 'whole',
    };
  });
}
