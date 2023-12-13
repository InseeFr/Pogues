import {
  SET_INVALID_ITEMS,
  REMOVE_INVALID_ITEM,
  ADD_LIST_INVALID_ITEMS,
} from '../../actions/app-state';
import { createActionHandlers } from '../../utils/reducer/actions-handlers';

const actionHandlers = {};

export function setInvalidItems(state, { invalidItems }) {
  return invalidItems;
}

export function removeInvalidItem(state, { invalidItemIdToRemove }) {
  const { [invalidItemIdToRemove]: remove, ...newInvalidItemsState } = state;
  return newInvalidItemsState;
}

export function addListInvalidItem(state, invalidItems) {
  return {
    ...state,
    ...invalidItems.reduce((acc, it) => {
      const [id] = it;
      const type = id.split('.')[0];
      return {
        ...acc,
        [id]: {
          id,
          type,
        },
      };
    }, {}),
  };
}

actionHandlers[SET_INVALID_ITEMS] = setInvalidItems;
actionHandlers[REMOVE_INVALID_ITEM] = removeInvalidItem;
actionHandlers[ADD_LIST_INVALID_ITEMS] = addListInvalidItem;

export default createActionHandlers(actionHandlers);
