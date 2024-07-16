import { SET_SELECTED_STAMP } from '../actions/general';
import { createActionHandlers } from '../utils/reducer/actions-handlers';

const actionHandlers = {};

export function setSelectedStamp(state, payload) {
  return {
    ...state,
    selectedStamp: payload,
  };
}

actionHandlers[SET_SELECTED_STAMP] = setSelectedStamp;

export default createActionHandlers(actionHandlers, { selectedStamp: '' });
