import { SET_INVALID_ITEMS, REMOVE_INVALID_ITEM } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setInvalidItems(state, { invalidItems }) {
  return invalidItems;
}

export function removeInvalidItem(state, { invalidItemIdToRemove }) {
  const { [invalidItemIdToRemove]: remove, ...newInvalidItemsState } = state;
  return newInvalidItemsState;
}

actionHandlers[SET_INVALID_ITEMS] = setInvalidItems;
actionHandlers[REMOVE_INVALID_ITEM] = removeInvalidItem;

export default createActionHandlers(actionHandlers);
