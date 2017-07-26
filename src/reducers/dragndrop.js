import { DRAGGED_COMPONENT } from 'actions/dragndrop';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setDraggedPosition(state, position) {
  return {
    ...state,
    ...position,
  };
}
actionHandlers[DRAGGED_COMPONENT] = setDraggedPosition;

export default createActionHandlers(actionHandlers);
