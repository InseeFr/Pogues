export const CREATE_RESPONSE = 'CREATE_RESPONSE'
export const REMOVE_RESPONSE = 'REMOVE_RESPONSE'
export const EDIT_RESPONSE = 'EDIT_RESPONSE'
export const CHANGE_DATATYPE_NAME = 'CHANGE_DATATYPE_NAME'
export const CHANGE_DATATYPE_PARAM = 'CHANGE_DATATYPE_PARAM'
export const TOGGLE_CLIST_EDITION = 'TOGGLE_CLIST_EDITION'
export const EDIT_RESPONSE_CHOOSE_CODE_LIST = 'EDIT_RESPONSE_CHOOSE_CODE_LIST'

import { uuid } from '../utils/data-utils'

export const createResponse = cmpntId => ({
  type: CREATE_RESPONSE,
  payload: {
    id: uuid(),
    cmpntId
  }
})

export const removeResponse = (id, cmpntId) => ({
  type: REMOVE_RESPONSE,
  payload: {
    id,
    cmpntId
  }
})

export const editResponse = (id, update) => ({
  type: EDIT_RESPONSE,
  payload: {
    id,
    update
  }
})

export const editResponseChooseCodeList = (id, codeListId) => ({
  type: EDIT_RESPONSE_CHOOSE_CODE_LIST,
  payload: {
    id,
    codeListId
  }
})

export const changeDatatypeName = (id, typeName) => ({
  type: CHANGE_DATATYPE_NAME,
  payload: {
    id,
    typeName
  }
})

export const changeDatatypeParam = (id, update) => ({
  type: CHANGE_DATATYPE_PARAM,
  payload: {
    id,
    update
  }
})

export const toggleCListEdition = id => ({
  type: TOGGLE_CLIST_EDITION,
  payload: id
})