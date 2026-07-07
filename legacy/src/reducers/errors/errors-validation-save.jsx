import {
  ADD_VALIDATION_AT_SAVE_ERROR,
  REMOVE_VALIDATION_AT_SAVE_ERROR,
} from '../../actions/errors';
import { createActionHandlers } from '../../utils/reducer/actions-handlers';

const actionHandlers = {};

export function addValidationAtSaveError(state, { error }) {
  return {
    ...state,
    showValidationAtSaveErrorPopup: error?.details,
  };
}

export function removeValidationAtSaveError(state) {
  return {
    ...state,
    showValidationAtSaveErrorPopup: undefined,
  };
}

actionHandlers[ADD_VALIDATION_AT_SAVE_ERROR] = addValidationAtSaveError;
actionHandlers[REMOVE_VALIDATION_AT_SAVE_ERROR] = removeValidationAtSaveError;

export default createActionHandlers(actionHandlers);
