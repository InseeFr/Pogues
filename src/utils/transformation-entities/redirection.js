import _ from 'lodash';

export const defaultRedirectionForm = {
  label: '',
  condition: '',
  cible: '',
  redirections: [],
};

export const defaultRedirectionState = [];

export const defaultRedirectionModel = {
  redirections: [],
};

function formToState(form) {
  const { redirections } = form;
  return _.cloneDeep(redirections);
}

function stateToForm(state) {
  return {
    ...defaultRedirectionForm,
    redirections: _.cloneDeep(state),
  };
}

function stateToModel(state) {
  return {
    redirections: state.map(r => {
      const { label, condition, cible } = r;
      return {
        label,
        condition,
        cible,
      };
    }),
  };
}

function modelToState(model) {
  const state = [];
  const { redirections } = model;
  redirections.forEach(d => {
    state.push(_.cloneDeep(d));
  });
  return state;
}

export default {
  formToState,
  stateToForm,
  stateToModel,
  modelToState,
};
