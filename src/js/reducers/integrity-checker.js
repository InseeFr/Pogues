export default function integrityChecker(reducer, checker) {
  return function (state={}, action) {
    const { integrity: oldIntegrity, ...stateMinusIntegrity } = state
    const stateToCheck = reducer(stateMinusIntegrity, action)
    const integrity = {
      errors: checker(stateToCheck)
    } 
    return {
      ...stateToCheck,
      integrity
    }
  }
}

