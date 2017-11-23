/**
 * Enhance a reducer by adding integrity checks based on the current state
 *
 * It adds an an array of error descriptions to the state, as the `integrity`
 * property. These errors are the result of applying `checker` to the
 * current state.
 *
 * @param  {Function} reducer the initial reducer function
 * @param  {Function} checker state checker
 * @return {Function}         enhanced reducer
 */
function integrityChecker(reducer, checkers) {
  return function(state, action) {
    const checker = checkers[action.type];
    const newState = reducer(state, action);
    if (!checker) return newState;

    const errorsByComponent = checker(newState);

    return {
      ...newState,
      errors: {
        ...newState.errors,
        errorsByComponent: {
          ...newState.errorsByComponent,
          ...errorsByComponent,
        },
      },
    };
  };
}
export default integrityChecker;
