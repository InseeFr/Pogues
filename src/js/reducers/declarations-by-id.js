import {
  CREATE_DECLARATION, REMOVE_DECLARATION, EDIT_DECLARATION
} from '../actions/declaration'

import {
  LOAD_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'

import { DECLARATION_TYPE, DECLARATION_POSITION } from '../constants/pogues-constants'
const { INSTRUCTION } = DECLARATION_TYPE
const { AFTER_QUESTION_TEXT } = DECLARATION_POSITION

const emptyDeclaration = {
  type: INSTRUCTION,
  position: AFTER_QUESTION_TEXT,
  text: '',
  isQuestion: false
}

export default function (state={}, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_DECLARATION:
      return {
        ...state,
        [payload.id]: {
          id: payload.id,
          ...emptyDeclaration,
          isQuestion: payload.isQuestion
        }
      }
    case EDIT_DECLARATION:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload.update
        }
      }
    case REMOVE_DECLARATION:
      const { [payload.id]: toRemove, ...toKeep } = state
      return toKeep
    case LOAD_QUESTIONNAIRE_SUCCESS: 
      return payload.update.declarationById
    default:
      return state
  }
}