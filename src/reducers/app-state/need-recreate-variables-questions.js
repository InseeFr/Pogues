import { SET_NEED_RECREATE_COLLECTED_VARIABLES } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setQuestionsNeedRecreateVariables(state, questionsIds) {
  return {
    ...state,
    ...questionsIds,
  };
}

actionHandlers[SET_NEED_RECREATE_COLLECTED_VARIABLES] = setQuestionsNeedRecreateVariables;

export default createActionHandlers(actionHandlers);
