import {
  CREATE_DECLARATION, REMOVE_DECLARATION, EDIT_DECLARATION
} from '../actions/declaration'

import {
  LOAD_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'

const emptyDeclaration = {
  type: '',
  disjoignable: true,
  text: ''
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