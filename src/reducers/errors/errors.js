import errorsByPanel from './errors-by-panel';
import errorsByComponent from './errors-by-component';
import errorsByTab from './errors-by-tab';

const defaultState = {
  errorsByPanel: {},
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
    errorsByPanel: errorsByPanel(state.errorsByPanel, action),
    errorsByComponent: errorsByComponent(state.errorsByComponent, action),
    errorsByTab: errorsByTab(state.errorsByTab, action),
  };
}
