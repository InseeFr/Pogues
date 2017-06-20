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

/**
 * Switch response format
 * 
 * @param   {string} id   response id
 * @param   {type}   type response format (SIMPLE, SINGLE, MULTIPLE or TABLE)
 * @returns {object}      SWITCH_FORMAT action
 */
export const switchFormat = (id, type) => ({
  type: SWITCH_FORMAT,
  payload: {
    id,
    type
  }
})

/**
 * Update a response
 * 
 * @param   {string} id     response id
 * @param   {object} update properties to update
 * @returns {object}        UPDATE_RESPONSE action
 */
export const updateResponse = (id, update) => ({
  type: UPDATE_RESPONSE,
  payload: {
    id,
    update
  }
})

/**
 * Update a response format
 * 
 * @param   {string} id      response format id
 * @param   {object} update  properties to update
 * @returns {object}         UPDATE_FORMAT action
 */
export const updateFormat = (id, update) => ({
  type: UPDATE_FORMAT,
  payload: {
    id,
    update
  }
})

/**
 * Update the datatype used in a response format
 * 
 * For SIMPLE response format and TABLE response format (related to one measure)
 * 
 * @param   {string}  id     response format id
 * @param   {object}  update properties to update
 * @param   {integer} index  rank of the measure concerned for TABLE response
 *                           format
 * @returns {object}         UPDATE_DATATYPE action
 */
export const updateDatatype = (id, update, index) => ({
  type: UPDATE_DATATYPE,
  payload: {
    id,
    update,
    index
  }
})

/**
 * Create a code list and use it within a response format
 * 
 * Usage may differ depending of the response format the code list is created
 * for (SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE).
 * 
 * @param   {string} id   response format id
 * @param   {string} qrId questionnaire id
 * @param   {string} ctx  which measure to update (INFO, MEASURE for
 *                        MULTIPLE_CHOICE, FIRST_INFO or SCND_INFO for a TABLE)
 * @returns {object}      NEW_CODE_LIST_FORMAT action
 */
export const newCodeListFormat = (id, qrId, ctx) => ({
  type: NEW_CODE_LIST_FORMAT,
  payload: {
    id,
    qrId,
    ctx,
    createdClId: uuid()
  }
})

/**
 * Update a measure from a TABLE response format
 * 
 * @param   {string}  id     response format id
 * @param   {update}  object update to apply to the measure
 * @param   {integer} index  rank of the measure
 * @returns {object}         UPDATE_MEASURE action
 */
export const updateMeasure = (id, update, index) => ({
  type: UPDATE_MEASURE,
  payload: {
    id, index, update
  }
})

/**
 * Update the format of a measure from a TABLE response format
 * 
 * @param   {string}  id     response format id
 * @param   {update}  object update to apply to the measure format
 * @param   {integer} index  rank of the measure
 * @returns {object}         UPDATE_MEASURE_FORMAT action
 */
export const updateMeasureFormat = (id, update, index) => ({
  type: UPDATE_MEASURE_FORMAT,
  payload: {
    id, index, update
  }
})

/**
 * Add a measure from a TABLE response format
 * 
 * @param   {string} id    response format id
 * @param   {number} index where to add the measure (rank)
 * @returns {object}       ADD_MEASURE action
 */
export const addMeasure = (id, index) => ({
  type: ADD_MEASURE,
  payload: {
    id,
    index
  }
})

/**
 * Remove a measure from a TABLE response format
 * @param   {string} id    response format id
 * @param   {number} index rank of the measure to remove
 * @returns {object}       REMOVE_MEASURE action
 */
export const removeMeasure = (id, index) => ({
  type: REMOVE_MEASURE,
  payload: {
    id,
    index
  }
})
