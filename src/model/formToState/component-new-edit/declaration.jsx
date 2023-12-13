import { uuid, verifyVariable } from '../../../utils/utils';

export const defaultState = {
  declarationType: 'HELP',
  label: '',
  position: 'AFTER_QUESTION_TEXT',
  id: null,
  TargetMode: '',
};

export const defaultForm = {
  declarationType: 'HELP',
  label: '',
  position: 'AFTER_QUESTION_TEXT',
  declarations: [],
  TargetMode: [],
};

function defaultCustum(activeQuestionnaire) {
  const form = defaultForm;
  form.TargetMode =
    Object.values(activeQuestionnaire).length > 0
      ? activeQuestionnaire.TargetMode.join()
      : [];
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
    ...defaultCustum(activeQuestionnaire),
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
