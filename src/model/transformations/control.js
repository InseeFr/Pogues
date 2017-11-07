import { uuid } from 'utils/utils';

export function remoteToState(remote = []) {
  return remote.reduce((acc, control) => {
    const {
      Description: label,
      Expression: condition,
      FailMessage: message,
      type,
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
        type,
        during_collect,
        post_collect,
      },
    };
  }, {});
}

export function stateToRemote(state) {
  const controls = [];

  Object.keys(state).forEach(key => {
    const {
      id,
      label: Description,
      condition: Expression,
      message: FailMessage,
      type,
      during_collect,
      post_collect,
    } = state[key];

    controls.push({
      id,
      Description,
      Expression,
      FailMessage,
      type,
      during_collect,
      post_collect,
    });
  });

  return controls;
}
