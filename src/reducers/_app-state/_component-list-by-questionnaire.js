import { LOAD_QUESTIONNAIRE_SUCCESS } from 'actions/_questionnaire';
import { CREATE_COMPONENT } from 'actions/_component';
import { createActionHandlers } from 'utils/reducer/actions-handlers';
import { createComponent as createComp } from 'utils/model/model-to-state-utils';

const actionHandlers = {};

export function loadQuestionnaireSuccess(state, { id, update }) {
  return {
    ...state,
    [id]: update.componentById,
  };
}

export function createComponent(state, { questionnaireId, component, parentId }) {
  return {
    ...state,
    [questionnaireId]: {
      ...state[questionnaireId],
      [component.id]: createComp(component, parentId),
      [parentId]: {
        ...state[questionnaireId][parentId],
        children: [...state[questionnaireId][parentId].children, component.id],
      },
    },
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[CREATE_COMPONENT] = createComponent;

export default createActionHandlers(actionHandlers);
