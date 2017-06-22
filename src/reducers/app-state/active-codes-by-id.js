import { SET_ACTIVE_CODE_LISTS } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from 'actions/component';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveCodes(state, { activeCodes }) {
  return activeCodes;
}

export function updateActiveCodes(state, { update: { activeCodesById } }) {
  return {
    ...state,
    ...activeCodesById,
  };
}

actionHandlers[SET_ACTIVE_CODE_LISTS] = setActiveCodes;
actionHandlers[CREATE_COMPONENT] = updateActiveCodes;
actionHandlers[UPDATE_COMPONENT] = updateActiveCodes;

export default createActionHandlers(actionHandlers);
