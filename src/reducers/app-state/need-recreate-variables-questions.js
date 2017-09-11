import { ADD_RECREATE_COLLECTED_VARIABLES, REMOVE_RECREATE_COLLECTED_VARIABLES } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function addNeedRecreateVariables(state, questionsId) {
  return [...state, questionsId];
}

export function removeNeedRecreateVariables(state, questionsId) {
  const newState = [...state];
  const index = newState.indexOf(questionsId);

  if (index !== -1) {
    newState.splice(index, 1);
  }

  return newState;
}

actionHandlers[ADD_RECREATE_COLLECTED_VARIABLES] = addNeedRecreateVariables;
actionHandlers[REMOVE_RECREATE_COLLECTED_VARIABLES] = removeNeedRecreateVariables;

export default createActionHandlers(actionHandlers);
