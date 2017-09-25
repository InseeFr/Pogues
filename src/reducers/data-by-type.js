import { LOAD_DATA_SUCCESS } from 'actions/data';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadData(state, { type, data }) {
  return {
    ...state,
    [type]: data,
  };
}

actionHandlers[LOAD_DATA_SUCCESS] = loadData;

export default createActionHandlers(actionHandlers);
