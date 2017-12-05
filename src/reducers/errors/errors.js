import errorsByComponent from './errors-by-component';
import errorsIntegrity from './errors-integrity';
import errorsValidation from './errors-validation';

const defaultState = {
  errorsByFormPath: {},
  errorsByComponent: {},
  errorsByTab: {},
};

const actionHandlers = {};

export default function(state = defaultState, action) {
  if (!action) return state;
  const { type, payload } = action;
  const hndlr = actionHandlers[type];
  return {
    ...(hndlr ? hndlr(state, payload) : state),
    errorsByComponent: errorsByComponent(state.errorsByComponent, action),
    errorsIntegrity: errorsIntegrity(state.errorsIntegrity, action),
    errorsValidation: errorsValidation(state.errorsValidation, action),
  };
}
