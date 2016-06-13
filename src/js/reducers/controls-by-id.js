import { CONTROL_CRITICITY } from '../constants/pogues-constants'

import {
  CREATE_CONTROL, REMOVE_CONTROL, EDIT_CONTROL
} from '../actions/control'
import {
  LOAD_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'


//ATTENTION : never update text expression in place !!!
const emptyControl = {
  description: '',
  expression: {
    text: ''
  },
  failMessage: '',
  criticity: CONTROL_CRITICITY.INFO // INFO by default
}

export default function (state={}, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_CONTROL:
      return {
        ...state,
        [payload.id]: {
          id: payload.id,
          ...emptyControl,
        }
      }
    case EDIT_CONTROL:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload.update
        }
      }
    case REMOVE_CONTROL:
      const { [payload.id]: toRemove, ...toKeep } = state
      return toKeep
    case LOAD_QUESTIONNAIRE_SUCCESS: 
      return payload.update.controlById      
    default:
      return state
  }
}