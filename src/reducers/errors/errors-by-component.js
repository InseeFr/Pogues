import { SET_ERRORS_BY_COMPONENT } from 'actions/errors';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setErrorsByComponent(state, { errors }) {
}

actionHandlers[SET_ERRORS_BY_COMPONENT] = setErrorsByComponent;

export default createActionHandlers(actionHandlers);
