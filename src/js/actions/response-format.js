export const EDIT_RESPONSE = 'EDIT_RESPONSE'
export const CHANGE_DATATYPE_NAME = 'CHANGE_DATATYPE_NAME'
export const CHANGE_DATATYPE_PARAM = 'CHANGE_DATATYPE_PARAM'
export const EDIT_RESPONSE_CHOOSE_CODE_LIST = 'EDIT_RESPONSE_CHOOSE_CODE_LIST'
export const SWITCH_FORMAT = 'SWITCH_FORMAT'
export const UPDATE_SINGLE = 'UPDATE_SINGLE'
export const UPDATE_MULTIPLE = 'UPDATE_MULTIPLE'
export const NEW_CODE_LIST_SINGLE = 'NEW_CODE_LIST_SINGLE'
export const NEW_CODE_LIST_MULTIPLE = 'NEW_CODE_LIST_MULTIPLE'
export const SWITCH_BOOLEAN_MULTIPLE = 'SWITCH_BOOLEAN_MULTIPLE'

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


export const updateMultiple = (id, update) => ({
  type: UPDATE_MULTIPLE,
  payload: {
    id,
    update
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

export const newCodeListMultiple = (id, qrId, forWhat) => ({
  type: NEW_CODE_LIST_MULTIPLE,
  payload: {
    id,
    qrId,
    forWhat,
    createdClId: uuid()
  }
})

export const switchBooleanMultiple = id => ({
  type: SWITCH_BOOLEAN_MULTIPLE,
  //usually we would have passed `id` as a payload (not a property of a paylaod
  //object), but we use a generic handler in the reducer which expects `id` to
  //be a property of the payload
  payload: { id }
})