import _ from 'lodash';

export const defaultRedirectionForm = {
  label: '',
  condition: '',
  cible: '',
  redirections: [],
};

export const defaultRedirectionState = {
  redirections: [],
};

export const defaultRedirectionModel = {
  redirections: [],
};

function formToState(form) {
  const { redirections } = form;
  return {
    ...defaultRedirectionState,
    redirections,
  };
}

function stateToForm(state) {
  const { redirections } = state;
  return {
    ...defaultRedirectionForm,
    redirections: _.cloneDeep(redirections),
  };
}

function stateToModel(state) {
  const { redirections } = state;
  return {
    ...defaultRedirectionModel,
    redirections: _.cloneDeep(redirections),
  };
}

function modelToState(model) {
  const { redirections } = model;
  return {
    ...defaultRedirectionState,
    redirections: _.cloneDeep(redirections),
  };
}

export default {
  formToState,
  stateToForm,
  stateToModel,
  modelToState,
};
