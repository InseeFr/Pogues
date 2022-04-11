import { createActionHandlers } from 'utils/reducer/actions-handlers';

import {
  ADD_VISUALIZATION_ERROR,
  REMOVE_VISUALIZATION_ERROR,
} from 'actions/errors';

const actionHandlers = {};

export function addVisualizationError(state) {
  return {
    ...state,
    showErrorVisualizationPopup: true,
  };
}

export function removeVisualizationError(state) {
  return {
    ...state,
    showErrorVisualizationPopup: false,
  };
}

actionHandlers[ADD_VISUALIZATION_ERROR] = addVisualizationError;
actionHandlers[REMOVE_VISUALIZATION_ERROR] = removeVisualizationError;

export default createActionHandlers(actionHandlers);
