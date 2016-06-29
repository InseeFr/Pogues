
export const CREATE_DATATYPE = 'ADD_DATATYPE'
export const EDIT_DATATYPE = 'EDIT_DATATYPE'
export const REMOVE_DATATYPE = 'REMOVE_DATATYPE'

function createDatatype(cmpntId, datatypeDscr) {
  return {
    type: CREATE_DATATYPE,
    id: uuid(),
    cmpntId,
    datatypeDscr
  }
}

function editDatatype(id, update) {
  return {
    type: EDIT_DATATYPE,
    id, //gotoId
    update
  }
}

function removeDatatype(id, responseId) {
  return {
    type: REMOVE_DATATYPE,
    id,
    responseId
  }
}