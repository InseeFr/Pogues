import { uuid, verifyVariable } from 'utils/utils';

export const defaultState = {
  declarationType: 'INSTRUCTION',
  label: '',
  position: 'AFTER_QUESTION_TEXT',
  id: null,
};

export const defaultForm = {
  declarationType: 'INSTRUCTION',
  label: '',
  position: 'AFTER_QUESTION_TEXT',
  declarations: [],
};

export function formToState(form) {
  const { declarationType, label, position } = form;
  const id = form.id || uuid();

  return {
    id,
    label: verifyVariable(label),
    declarationType,
    position,
  };
}

export function formToComponentState(form) {
  const { declarations } = form;

  return declarations.reduce((acc, declaration) => {
    const state = formToState(declaration);

    return {
      ...acc,
      [state.id]: state,
    };
  }, {});
}

export function stateToForm(currentState) {
  const declarations = [];

  Object.keys(currentState).forEach(key => {
    const { id, declarationType, label, position } = currentState[key];
    declarations.push({
      id,
      label,
      declarationType,
      position,
    });
  });

  return {
    ...defaultForm,
    declarations,
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
