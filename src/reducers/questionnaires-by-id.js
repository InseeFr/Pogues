import   { 
  CREATE_QUESTIONNAIRE, CREATE_QUESTIONNAIRE_SUCCESS,
  CREATE_QUESTIONNAIRE_FAILURE, LOAD_QUESTIONNAIRE_SUCCESS, EDIT_QUESTIONNAIRE
} from '../actions/questionnaire'

import questionnaire from './questionnaire'

//TODO think about consistency : sometimes, we're tempted to update directly
//a child state (the questionnaire state here) from the parent reducer (for
//instance, when we just want to add a property to the child state, like
//when we handle the CREATE_QUESTIONNAIRE_SUCCESS action) because it seems
//easier to write it this than to pass the action to the questionnaire reducer
//to do this same little operation. But it might be better to always pass
//action to the child reducer, for the sake of code consistency.
export default function (state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_QUESTIONNAIRE:
    case LOAD_QUESTIONNAIRE_SUCCESS:
      return {
        ...state,
        [payload.id]: questionnaire(undefined, action)
      }    

    case EDIT_QUESTIONNAIRE:    
      // Update questionnaire properties (name, label)
      return {
        ...state,
        [payload.id]: questionnaire(state[payload.id], action)
      }    
    case CREATE_QUESTIONNAIRE_SUCCESS:
      // Do not try to pudate the local id since there is a risk to create
      // unconsistencies : this id is also used by components. Just keep
      // track of the remote id, and we will replace the local id with the
      // remote id when we save the questionnaire.
      const { [payload.id]: qr } = state
      // Add property for `newId`, with `newId` as questionnaire `id`.
      return {
        ...state,
        [payload.id]: {...qr, remoteId: payload.newId }
      }
    case CREATE_QUESTIONNAIRE_FAILURE:
      //TODO not implemnted yed
      return state
    default:
      return state
  }
}

