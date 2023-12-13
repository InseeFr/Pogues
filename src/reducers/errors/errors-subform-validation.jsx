import {
  ADD_SUBFORM_VALIDATION_ERRORS,
  SET_SUBFORM_VALIDATION_ERRORS,
  REMOVE_SUBFORM_VALIDATION_ERRORS,
  CLEAR_SUBFORM_VALIDATION_ERRORS,
} from '../../actions/errors';
import { createActionHandlers } from '../../utils/reducer/actions-handlers';

const actionHandlers = {};

export function addSubformValidationErrors(state, { errors }) {
  return {
    ...state,
    ...errors.reduce((acc, e) => {
      return {
        ...acc,
        [e.path]: acc[e.path] ? [...acc[e.path], e.errors] : [...e.errors],
      };
    }, {}),
  };
}

export function setSubformValidationErrors(state, { errors }) {
  return errors.reduce((acc, e) => {
    return {
      ...acc,
      [e.path]: acc[e.path] ? [...acc[e.path], e.errors] : [...e.errors],
    };
  }, {});
}

export function removeSubformValidationErrors(state, paths) {
  return paths.reduce((acc, p) => {
    const { [p]: remove, ...others } = acc;
    return others;
  }, state);
}

export function clearSubformValidationErrors() {
  return {};
}

actionHandlers[ADD_SUBFORM_VALIDATION_ERRORS] = addSubformValidationErrors;
actionHandlers[SET_SUBFORM_VALIDATION_ERRORS] = setSubformValidationErrors;
actionHandlers[REMOVE_SUBFORM_VALIDATION_ERRORS] =
  removeSubformValidationErrors;
actionHandlers[CLEAR_SUBFORM_VALIDATION_ERRORS] = clearSubformValidationErrors;

export default createActionHandlers(actionHandlers);
