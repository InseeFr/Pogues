import cloneDeep from 'lodash.clonedeep';
import uniq from 'lodash.uniq';

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

    const checkerResult = checker(newState);
    const currentErrorsByComponent = cloneDeep(newState.errors.errorsByComponent);
    const componentsIds = uniq([...Object.keys(currentErrorsByComponent), ...Object.keys(checkerResult)]);

    const errorsByComponent = componentsIds.reduce((acc, key) => {
      return {
        ...acc,
        [key]: {
          ...(currentErrorsByComponent[key] || {}),
          ...(checkerResult[key] || {}),
        },
      };
    }, {});

    return {
      ...newState,
      errors: {
        ...newState.errors,
        errorsByComponent,
      },
    };
  };
}
export default integrityChecker;
