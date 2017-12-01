import errorsByFormPath from './errors-by-form-path';
import errorsByComponent from './errors-by-component';
import errorsByTab from './errors-by-tab';

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
    errorsByFormPath: errorsByFormPath(state.errorsByFormPath, action),
    errorsByComponent: errorsByComponent(state.errorsByComponent, action),
    errorsByTab: errorsByTab(state.errorsByTab, action),
  };
}
