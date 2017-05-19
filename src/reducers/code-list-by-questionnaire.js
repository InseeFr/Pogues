/**
 * Keep track of code list created within a questionnaire (ignore code list
 * specifiactions)
 */

//This reducer will not update if we remove the only response using a code
//list.
//TODO implement remove code list (with integrity controls to check if the
//code list is not used by any response)
import { NEW_CODE_LIST_FORMAT } from '../actions/response-format'

import {
  CREATE_QUESTIONNAIRE, LOAD_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'

export default function (state={}, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_QUESTIONNAIRE:
      return {
        ...state,
        [payload.id]: []
      }
    case NEW_CODE_LIST_FORMAT:
      return {
        ...state,
        [payload.qrId]: [...state[payload.qrId], payload.createdClId]
      }
    case LOAD_QUESTIONNAIRE_SUCCESS:
      return {
        ...state,
        ...payload.update.codeListByQuestionnaire
      }
    default:
      return state
  }
}