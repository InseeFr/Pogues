export const SWITCH_FORMAT = 'SWITCH_FORMAT'
export const UPDATE_FORMAT = 'UPDATE_FORMAT'
export const UPDATE_DATATYPE = 'UPDATE_DATATYPE'

export const NEW_CODE_LIST_FORMAT = 'NEW_CODE_LIST_FORMAT'

export const UPDATE_RESPONSE = 'UPDATE_RESPONSE'
export const UPDATE_MEASURE = 'UPDATE_MEASURE'
export const UPDATE_MEASURE_FORMAT = 'UPDATE_MEASURE_FORMAT'

export const ADD_MEASURE = 'ADD_MEASURE'
export const REMOVE_MEASURE = 'REMOVE_MEASURE'

import { uuid } from '../utils/data-utils'

export const switchFormat = (id, type) => ({
  type: SWITCH_FORMAT,
  payload: {
    id,
    type
  }
})

export const updateResponse = (id, update) => ({
  type: UPDATE_RESPONSE,
  payload: {
    id,
    update
  }
})


export const updateFormat = (id, update) => ({
  type: UPDATE_FORMAT,
  payload: {
    id,
    update
  }
})

export const updateDatatype = (id, update, index) => ({
  type: UPDATE_DATATYPE,
  payload: {
    id,
    update,
    index
  }
})

export const newCodeListFormat = (id, qrId, ctx) => ({
  type: NEW_CODE_LIST_FORMAT,
  payload: {
    id,
    qrId,
    ctx,
    createdClId: uuid()
  }
})

export const updateMeasure = (id, update, index) => ({
  type: UPDATE_MEASURE,
  payload: {
    id, index, update
  }
})

export const updateMeasureFormat = (id, update, index) => ({
  type: UPDATE_MEASURE_FORMAT,
  payload: {
    id, index, update
  }
})

export const addMeasure = (id, index) => ({
  type: ADD_MEASURE,
  payload: {
    id,
    index
  }
})

export const removeMeasure = (id, index) => ({
  type: REMOVE_MEASURE,
  payload: {
    id,
    index
  }
})
