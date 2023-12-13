import { REMOVE_INTEGRITY_ERROR } from '../../actions/errors';
import { createActionHandlers } from '../../utils/reducer/actions-handlers';

const actionHandlers = {};

export function removeError(state, { componentId, typeError, itemListId }) {
  const removeIndex = state[componentId][typeError]
    .map(e => e.itemListId)
    .indexOf(itemListId);

  state[componentId][typeError].splice(removeIndex, 1);

  return state;
}

actionHandlers[REMOVE_INTEGRITY_ERROR] = removeError;

export default createActionHandlers(actionHandlers);
