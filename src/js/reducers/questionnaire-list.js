import {
  LOAD_QLIST, LOAD_QLIST_SUCCESS, LOAD_QLIST_FAILURE
} from '../actions/questionnaire-list'


import {
  REMOVE_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'

import {
  SET_QLIST_FILTER
} from '../actions/app-state'

//TODO check consistency with questionnaires that have been already loaded
export default function (state={}, action) {
  if (!action) return state
  if (action.type === LOAD_QLIST_SUCCESS) return {
    ...state,
    ...action.payload // payload is a questionnaire list
    //TODO might be safer to replace state, and not just update it with the
    //questionnaire list (but if the questionnaire label has been edited and
    //the questionnaire not saved, the new label would not appear).
  }
  if (action.type === REMOVE_QUESTIONNAIRE_SUCCESS) {
    const { [action.payload]: toRemove, ...toKeep } = state
    return toKeep
  }
  return state
}

