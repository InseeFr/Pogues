import {
  ADD_VALIDATION_ERRORS,
  SET_VALIDATION_ERRORS,
  REMOVE_VALIDATION_ERRORS,
  CLEAR_VALIDATION_ERRORS,
} from '../../actions/errors';
import { createActionHandlers } from '../../utils/reducer/actions-handlers';

const actionHandlers = {};

export function addValidationErrors(state, { errors }) {
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

export function setValidationErrors(state, { errors }) {
  return errors.reduce((acc, e) => {
    return {
      ...acc,
      [e.path]: acc[e.path] ? [...acc[e.path], e.errors] : [...e.errors],
    };
  }, {});
}

export function removeValidationErrors(state, paths) {
  return paths.reduce((acc, p) => {
    const { [p]: remove, ...others } = acc;
    return others;
  }, state);
}

export function clearValidationErrors() {
  return {};
}

actionHandlers[ADD_VALIDATION_ERRORS] = addValidationErrors;
actionHandlers[SET_VALIDATION_ERRORS] = setValidationErrors;
actionHandlers[REMOVE_VALIDATION_ERRORS] = removeValidationErrors;
actionHandlers[CLEAR_VALIDATION_ERRORS] = clearValidationErrors;

export default createActionHandlers(actionHandlers);
