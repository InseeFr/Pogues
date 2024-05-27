import { uuid, verifyVariable } from 'utils/utils';

const commonDeclarationFormProperties = {
  declarationType: 'HELP',
  label: '',
  position: 'AFTER_QUESTION_TEXT',
  TargetMode: '',
};

const defaultForm = {
  ...commonDeclarationFormProperties,
  declarations: [],
};

export const defaultDeclaration = {
  ...commonDeclarationFormProperties,
  id: null,
};

export function defaultCustum(activeQuestionnaire, form) {
  form.TargetMode =
    Object.values(activeQuestionnaire).length > 0
      ? activeQuestionnaire.TargetMode.join()
      : '';
  return form;
}

export function formToState(form) {
  const { declarationType, label, position, TargetMode } = form;
  const id = form.id || uuid();

  return {
    id,
    label: verifyVariable(label),
    declarationType,
    position,
    TargetMode: TargetMode.split(','),
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

export function stateToForm(currentState, activeQuestionnaire) {
  const declarations = [];
  Object.keys(currentState).forEach(key => {
    const { id, declarationType, label, position, TargetMode } =
      currentState[key];
    declarations.push({
      id,
      label,
      declarationType,
      position,
      TargetMode: TargetMode.join(),
    });
  });
  return {
    ...defaultCustum(activeQuestionnaire, defaultForm),
    declarations,
  };
}

const Factory = (currentState = [], activeQuestionnaire = {}) => {
  return {
    formToComponentState: form => {
      if (form) currentState = formToComponentState(form);
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState, activeQuestionnaire);
    },
  };
};

export default Factory;
