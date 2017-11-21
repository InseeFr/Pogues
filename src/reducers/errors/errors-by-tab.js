import { SET_ERROR } from 'actions/errors';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

import { ERROR_TYPES } from 'constants/pogues-constants';

const { PANEL } = ERROR_TYPES;

const actionHandlers = {};

export function setError(state, { type, error }) {
  return {};
}

actionHandlers[SET_ERROR] = setError;

export default createActionHandlers(actionHandlers);
