import { SET_ACTIVE_CODE_LISTS } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveCodes(state, { activeCodes }) {
  return activeCodes;
}

actionHandlers[SET_ACTIVE_CODE_LISTS] = setActiveCodes;

export default createActionHandlers(actionHandlers);
