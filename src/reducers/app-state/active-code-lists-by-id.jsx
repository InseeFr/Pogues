import {
  SET_ACTIVE_CODE_LISTS,
  DELETE_APPSTATE,
} from '../../actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from '../../actions/component';
import { createActionHandlers } from '../../utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveCodeLists(state, { activeCodeLists }) {
  return activeCodeLists;
}

export function updateActiveCodeLists(
  state,
  { update: { activeCodeListsById } },
) {
  return {
    ...state,
    ...activeCodeListsById,
  };
}

export function deleteActiveCodeLists() {
  return {};
}

actionHandlers[SET_ACTIVE_CODE_LISTS] = setActiveCodeLists;
actionHandlers[CREATE_COMPONENT] = updateActiveCodeLists;
actionHandlers[UPDATE_COMPONENT] = updateActiveCodeLists;
actionHandlers[DELETE_APPSTATE] = deleteActiveCodeLists;

export default createActionHandlers(actionHandlers);
