import { LOAD_METADATA_SUCCESS } from 'actions/metadata';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadMetadata(state, { type, metadata }) {
  return {
    ...state,
    [type]: metadata,
  };
}

actionHandlers[LOAD_METADATA_SUCCESS] = loadMetadata;

export default createActionHandlers(actionHandlers);
