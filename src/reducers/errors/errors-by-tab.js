import { SET_ERRORS_BY_TAB } from 'actions/errors';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setErrorsByTab(state, { integrityErrors }) {
  const integrityErrorsWithPath = Object.keys(integrityErrors)
    .reduce((acc, keyError) => {
      return [...acc, ...integrityErrors[keyError]];
    }, [])
    .filter(ie => ie.path);

  return integrityErrorsWithPath.reduce((acc, ie) => {
    const matches = ie.path.match(/^(.+)\./);
    return {
      ...acc,
      [matches[1]]: acc[matches[1]] ? [...acc[matches[1]], ie] : [ie],
    };
  }, {});
}

actionHandlers[SET_ERRORS_BY_TAB] = setErrorsByTab;

export default createActionHandlers(actionHandlers);
