import _ from 'lodash';
import { uuid } from 'utils/data-utils';

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
  return redirections.map(r => {
    const { id, label, condition, cible } = r;
    return {
      id: id || uuid(),
      label,
      condition,
      cible,
    };
  });
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
      const { id, label, condition, cible } = r;
      return {
        id: id || uuid(),
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
