import { LOAD_METADATA_SUCCESS } from '../actions/metadata';
import { createActionHandlers } from '../utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadMetadata(state, { type, metadataByTypeStore }) {
  return {
    ...state,
    [type]: {
      ...state[type],
      ...metadataByTypeStore,
    },
  };
}

actionHandlers[LOAD_METADATA_SUCCESS] = loadMetadata;

export default createActionHandlers(actionHandlers);
