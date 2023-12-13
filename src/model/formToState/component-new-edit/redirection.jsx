import { uuid } from '../../../utils/utils';

export const defaultState = {
  label: '',
  condition: '',
  cible: '',
  id: null,
};

export const defaultForm = {
  label: '',
  condition: '',
  cible: '',
  redirections: [],
};

export function formToState(form) {
  const { label, condition, cible } = form;
  const id = form.id || uuid();
  const redirection = true;
  return {
    id,
    label,
    condition,
    cible,
    redirection,
  };
}

export function formToComponentState(form) {
  const { redirections } = form;

  return redirections.reduce((acc, redirection) => {
    const state = formToState(redirection);

    return {
      ...acc,
      [state.id]: state,
    };
  }, {});
}

export function stateToForm(currentState) {
  const redirections = [];
  Object.keys(currentState).forEach(key => {
    const { id, label, condition, cible } = currentState[key];
    redirections.push({
      id,
      label,
      condition,
      cible,
    });
  });

  return {
    ...defaultForm,
    redirections,
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
