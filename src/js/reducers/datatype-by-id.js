/**
A response Datatype
*/
import { emptyTextDatatype } from './datatype-utils'

const actionsHndlrs = {
  CREATE_RESPONSE: createResponse,
  REMOVE_RESPONSE: removeResponse,
  EDIT_DATATYPE: editDatatype
}

export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload, action) : state
}

// we set the response id to the datatype (one to one relationship)
function createResponse(datatypes, { id }) {
  return {
    ...datatypes,
    [id]: emptyTextDatatype   
  }
}

function removeResponse(datatypes, { id }) {
  // eslint-disable-next-line
  const { [id]: toRemove, ...toKeep } = datatypes
  return toKeep
}

function editDatatype(datatypes, { id, update }) {
  return {
    ...datatypes,
    [id]: {
      ...datatypes[id],
      update
    }
  }
}
