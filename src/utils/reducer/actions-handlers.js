/**
 * This utility method will manage the execution of the right reducer based
 * on the triggered action.
 *
 * @param {object} actionHandlers redux actions/reducers
 */
export function createActionHandlers(actionHandlers, initialState = {}) {
  return function (state = initialState, action) {
    if (!action) return state;
    const { type, payload } = action;
    const hndlr = actionHandlers[type];
    return hndlr ? hndlr(state, payload, action) : state;
  };
}
