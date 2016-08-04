import { CONTROL_CRITICITY } from '../constants/pogues-constants'

import {
  CREATE_CONDITION, REMOVE_CONDITION, EDIT_CONDITION
} from '../actions/condition'

import {
  LOAD_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'


//ATTENTION : never update text expression in place !!!
const emptyCondition = {
  label: '',
  condition: ''
}

export default function (state={}, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_CONDITION:
      return {
        ...state,
        [payload.id]: {
          id: payload.id,
          ...emptyCondition,
        }
      }
    case EDIT_CONDITION:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload.update
        }
      }
    case REMOVE_CONDITION:
      const { [payload.id]: toRemove, ...toKeep } = state
      return toKeep
    case LOAD_QUESTIONNAIRE_SUCCESS:
      return payload.update.conditionById
    default:
      return state
  }
}