import { SET_ERRORS_BY_FORM_PATH, SET_ERRORS_BY_FORM_PATHS, CLEAR_ERRORS_BY_FORM_PATHS } from 'actions/errors';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setErrorsByFormPath(state, { errors }) {
  return errors.reduce((acc, e) => {
    return {
      ...acc,
      [e.path]: acc[e.path] ? [...acc[e.path], e.errors] : [...e.errors],
    };
  }, {});
}

export function setErrorsByFormPaths(state, { errors }) {
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

export function clearErrorsByFormPaths(state, paths) {
  return paths.reduce((acc, p) => {
    const { [p]: remove, ...others } = acc;
    return others;
  }, state);
}

actionHandlers[SET_ERRORS_BY_FORM_PATH] = setErrorsByFormPath;
actionHandlers[SET_ERRORS_BY_FORM_PATHS] = setErrorsByFormPaths;
actionHandlers[CLEAR_ERRORS_BY_FORM_PATHS] = clearErrorsByFormPaths;

export default createActionHandlers(actionHandlers);
