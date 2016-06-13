import {
  CREATE_RESPONSE, REMOVE_RESPONSE, EDIT_RESPONSE
} from '../actions/response'

const emptyResponse = {
  simple: true,
  mandatory: false,
  codeListReference: null,
  values: []
}

export default function (state=emptyResponse, action) {
  const { type, payload } = action
  const { id } = payload  
  switch (type) {
    case CREATE_RESPONSE:
      return {
        ...state,
        [id]: {
          id,
          ...emptyResponse,
          ...payload.dscr
        }
      }
    case EDIT_RESPONSE:
      return {
        ...state,
        [id]: {
          ...state[id],
          ...payload.update
        }
      }
    case REMOVE_RESPONSE:
      const { [id]: responseToRemove, ...responsesToKeep } = state
      return responsesToKeep
    default:
      return state
  }
}