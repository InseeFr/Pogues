import { SET_ACTIVE_CODE_LISTS } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveCodeLists(state, { activeCodeLists }) {
  return activeCodeLists;
}

actionHandlers[SET_ACTIVE_CODE_LISTS] = setActiveCodeLists;

export default createActionHandlers(actionHandlers);
