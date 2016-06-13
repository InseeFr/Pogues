import {
  CREATE_GOTO, REMOVE_GOTO, EDIT_GOTO
} from '../actions/goTo'
import {
  LOAD_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'

const emptyGoTo = {
  description: '',
  expression: '',
  ifTrue: null, //ifTrue and ifFalse can be used to store a label, which can be
                //an empty string, so we use `null` as a default value
  ifFalse: null,
  ifTrueIsALabel: false,
  ifFalseIsALabael: false
}

export default function (state={}, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_GOTO:
      return {
        ...state,
        [payload.id]: {
          id: payload.id,
          ...emptyGoTo
        }
      }
    case EDIT_GOTO:
      //TODO inspect ifTrue and ifFalse to replace empty strings by `null`.
      //Anyway, we should decide how to handle components with no label in
      //goTo edition
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload.update
        }
      }
    case REMOVE_GOTO:
      const { [payload.id]: toRemove, ...toKeep } = state
      return toKeep
    case LOAD_QUESTIONNAIRE_SUCCESS: 
      return payload.update.goToById    
    default:
      return state
  }
}