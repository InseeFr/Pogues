import { uuid } from '../../utils/utils';

export function remoteToState(remote = []) {
  return remote.reduce((acc, control) => {
    const {
      Description: label,
      Expression: condition,
      FailMessage: message,
      criticity,
      during_collect,
      post_collect,
    } = control;
    const id = control.id || uuid();

    return {
      ...acc,
      [id]: {
        id,
        label,
        condition,
        message,
        criticity,
        during_collect,
        post_collect,
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
      message: FailMessage,
      criticity,
      during_collect,
      post_collect,
    } = state[key];

    return {
      id,
      Description,
      Expression,
      FailMessage,
      criticity,
      during_collect,
      post_collect,
    };
  });
}
