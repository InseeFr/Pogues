import errorsByComponent from './errors-by-component';
import errorsIntegrity from './errors-integrity';
import errorsValidation from './errors-validation';
import errorsSubformValidation from './errors-subform-validation';
import errorsVisualization from './errors-visualization';

const defaultState = {
  errorsByFormPath: {},
  errorsIntegrity: {},
  errorsValidation: {},
  errorsSubformValidation: {},
};

const actionHandlers = {};

export default function (state = defaultState, action) {
  if (!action) return state;
  const { type, payload } = action;
  const hndlr = actionHandlers[type];
  return {
    ...(hndlr ? hndlr(state, payload) : state),
    errorsByComponent: errorsByComponent(state.errorsByComponent, action),
    errorsIntegrity: errorsIntegrity(state.errorsIntegrity, action),
    errorsValidation: errorsValidation(state.errorsValidation, action),
    errorsSubformValidation: errorsSubformValidation(
      state.errorsSubformValidation,
      action,
    ),
    errorsVisualization: errorsVisualization(state.errorsVisualization, action),
  };
}
