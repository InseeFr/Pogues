export const EDIT_RESPONSE = 'EDIT_RESPONSE'
export const CHANGE_DATATYPE_NAME = 'CHANGE_DATATYPE_NAME'
export const CHANGE_DATATYPE_PARAM = 'CHANGE_DATATYPE_PARAM'
export const EDIT_RESPONSE_CHOOSE_CODE_LIST = 'EDIT_RESPONSE_CHOOSE_CODE_LIST'
export const SWITCH_FORMAT = 'SWITCH_FORMAT'
export const UPDATE_SINGLE = 'UPDATE_SINGLE'
export const NEW_CODE_LIST_SINGLE = 'NEW_CODE_LIST_SINGLE'

import { uuid } from '../utils/data-utils'

export const switchFormat = (id, type) => ({
  type: SWITCH_FORMAT,
  payload: {
    id,
    type
  }
})

export const updateSingle = (id, update) => ({
  type: UPDATE_SINGLE,
  payload: {
    id,
    update
  }
})

export const newCodeListSingle = (id, qrId) => ({
  type: NEW_CODE_LIST_SINGLE,
  payload: {
    id,
    qrId,
    createdClId: uuid()
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
