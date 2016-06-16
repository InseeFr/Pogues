import { nbQuestionsChecker } from './checkers'


export default function integrityChecker(reducer, checkers) {
  return function (state={}, action) {
    const { integrity: oldIntegrity, ...stateMinusIntegrity } = state
    const stateToCheck = reducer(stateMinusIntegrity, action)
    const integrity = nbQuestionsChecker(stateToCheck)
    return {
      ...stateToCheck,
      integrity
    }
  }
}

