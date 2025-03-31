import { uuid, verifyVariable } from '../../../utils/utils';

export const defaultState = {
  label: '',
  condition: '',
  message: '',
  criticity: 'WARN',
  during_collect: false,
  post_collect: false,
  id: null,
  scope: 'DYNAMIC_ARRAY',
};

export const defaultForm = {
  label: '',
  condition: '',
  message: '',
  criticity: 'WARN',
  during_collect: false,
  post_collect: false,
  controls: [],
  scope: 'DYNAMIC_ARRAY',
};

export function formToState(form) {
  const {
    label,
    condition,
    message,
    criticity,
    during_collect,
    post_collect,
    scope,
  } = form;
  const id = form.id || uuid();

  return {
    id,
    label,
    condition: verifyVariable(condition),
    message: verifyVariable(message),
    criticity,
    during_collect,
    post_collect,
    scope,
  };
}

export function formToComponentState(form) {
  const { controls } = form;

  return controls.reduce((acc, control) => {
    const state = formToState(control);

    return {
      ...acc,
      [state.id]: state,
    };
  }, {});
}

export function stateToForm(currentState) {
  const controls = [];

  Object.keys(currentState).forEach((key) => {
    const {
      id,
      label,
      condition,
      message,
      criticity,
      during_collect,
      post_collect,
      scope,
    } = currentState[key];
    controls.push({
      id,
      label,
      condition,
      message,
      criticity,
      during_collect,
      post_collect,
      scope,
    });
  });

  return {
    ...defaultForm,
    controls,
  };
}

const Factory = (currentState = []) => {
  return {
    formToComponentState: (form) => {
      if (form) currentState = formToComponentState(form);
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState);
    },
  };
};

export default Factory;
