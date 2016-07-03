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
export default function integrityChecker(reducer, checker) {
  return function (state={}, action) {
    // remove `integrity` entry (which is the former integrity checks)
    const { integrity: oldIntegrity, ...stateMinusIntegrity } = state
    // proccess the new state without integrity checks
    const stateToCheck = reducer(stateMinusIntegrity, action)
    // check the new state
    const integrity = {
      errors: checker(stateToCheck)
    }
    // add the results of integrity checks to the state
    return {
      ...stateToCheck,
      integrity
    }
  }
}

