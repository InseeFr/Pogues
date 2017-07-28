import _ from 'lodash';

export const defaultDeclarationForm = {
  declarationType: '',
  label: '',
  position: '',
  declarations: [],
};

export const defaultDeclarationState = {
  declarations: [],
};

export const defaultDeclarationModel = {
  declarations: [],
};

function formToState(form) {
  const { declarations } = form;
  return {
    ...defaultDeclarationState,
    declarations,
  };
}

function stateToForm(state) {
  const { declarations } = state;
  return {
    ...defaultDeclarationForm,
    declarations: _.cloneDeep(declarations),
  };
}

function stateToModel(state) {
  const { declarations } = state;
  return {
    ...defaultDeclarationModel,
    declarations: _.cloneDeep(declarations),
  };
}

function modelToState(model) {
  const { declarations } = model;
  return {
    ...defaultDeclarationState,
    declarations: _.cloneDeep(declarations),
  };
}

export default {
  formToState,
  stateToForm,
  stateToModel,
  modelToState,
};
