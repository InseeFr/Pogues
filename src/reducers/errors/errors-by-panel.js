import { SET_ERRORS } from 'actions/errors';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

import { ERROR_TYPES } from 'constants/pogues-constants';

const { PANEL } = ERROR_TYPES;

const actionHandlers = {};

export function setErrorsPanel(state, { errors }) {
  if (!errors) return state;
  const result = errors.filter(e => e.type === PANEL).reduce((acc, e) => {
    if (!acc[e.path]) acc[e.path] = [];

    return {
      ...acc,
      [e.path]: [...acc[e.path], e.error],
    };
  }, {});

  return result;
}

actionHandlers[SET_ERRORS] = setErrorsPanel;

export default createActionHandlers(actionHandlers);
