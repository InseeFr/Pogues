import _ from 'lodash';

export const defaultDeclarationForm = {
  declarationType: 'INSTRUCTION',
  label: '',
  position: 'AFTER_QUESTION_TEXT',
  declarations: [],
};

export const defaultDeclarationState = [];

export const defaultDeclarationModel = {
  declarations: [],
};

function formToState(form) {
  const { declarations } = form;
  return _.cloneDeep(declarations);
}

function stateToForm(state) {
  return {
    ...defaultDeclarationForm,
    declarations: _.cloneDeep(state),
  };
}

function stateToModel(state) {
  return {
    declarations: state.map(d => {
      const { declarationType, label, position } = d;
      return {
        text: label,
        declarationType,
        position,
      };
    }),
  };
}

function modelToState(model) {
  const state = [];
  const { declarations } = model;
  declarations.forEach(d => {
    const { declarationType, text, position } = d;
    state.push({
      label: text,
      declarationType,
      position,
    });
  });
  return state;
}

export default {
  formToState,
  stateToForm,
  stateToModel,
  modelToState,
};
