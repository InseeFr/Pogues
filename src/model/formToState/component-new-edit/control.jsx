import { uuid, verifyVariable } from '../../../utils/utils';

export const defaultState = {
  label: '',
  condition: '',
  message: '',
  criticity: 'INFO',
  during_collect: false,
  post_collect: false,
  id: null,
};

export const defaultForm = {
  label: '',
  condition: '',
  message: '',
  criticity: 'INFO',
  during_collect: false,
  post_collect: false,
  controls: [],
};

export function formToState(form) {
  const { label, condition, message, criticity, during_collect, post_collect } =
    form;
  const id = form.id || uuid();

  return {
    id,
    label,
    condition: verifyVariable(condition),
    message: verifyVariable(message),
    criticity,
    during_collect,
    post_collect,
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

  Object.keys(currentState).forEach(key => {
    const {
      id,
      label,
      condition,
      message,
      criticity,
      during_collect,
      post_collect,
    } = currentState[key];
    controls.push({
      id,
      label,
      condition,
      message,
      criticity,
      during_collect,
      post_collect,
    });
  });

  return {
    ...defaultForm,
    controls,
  };
}

const Factory = (currentState = []) => {
  return {
    formToComponentState: form => {
      if (form) currentState = formToComponentState(form);
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState);
    },
  };
};

export default Factory;
