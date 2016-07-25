import {
  SWITCH_FORMAT, CHANGE_DATATYPE_PARAM, UPDATE_SINGLE
  SWITCH_FORMAT, CHANGE_DATATYPE_PARAM, CHANGE_DATATYPE_NAME,
  UPDATE_SINGLE, NEW_CODE_LIST_SINGLE,
} from '../actions/response-format'

import { LOAD_QUESTIONNAIRE_SUCCESS } from '../actions/questionnaire'
import { CREATE_COMPONENT } from '../actions/component'

import { RESPONSE_FORMAT, COMPONENT_TYPE } from '../constants/pogues-constants'
import { emptyTextDatatype, emptyDatatypeFactory } from './datatype-utils'

const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT

/**
 * Default value for a response format. We create an entry for each type of
 * format. This will allow recovering of previously filled parameters if the
 * user mistakenly switches between format types.
 * @type {Object}
 */
const emptyFormat = {
  type: SIMPLE,
  [SIMPLE]: emptyTextDatatype,
  [SINGLE]: {
    codeListReference: '',
    visHint: ''
  },
  [MULTIPLE]: {

  },
  [TABLE]: {

  }
}

/**
 * Produce a reducing function from a format update function
 *
 * It takes a function that updates a format based on an action payload and
 * produces a reducing function that takes all the response formats and updates
 * only the format corresponding to the current `id` (extracted from the
 * payload) and the relevant format based on the current type (SIMPLE, SINGLE,
 * MULTIPLE or TABLE) for this response format.
 *
 * The reducing function is not attached to a special type of format: if an
 * action assigned to this function is dispatched, then it should make sense for
 * the current type. An other option would be to process not the format
 * corresponding to the current type, but the format this function has been
 * registered for.
 *
 * @param  {Function} fn Function that updates a format based on a payload
 * @return {Function}    A reducing function for the `response-format-by-id`
 *                       reducer
 */
function fromFormatHndlr(fn) {
  return function (formats, payload) {
    const { id } = payload
    const format = formats[id]
    const { type } = format
    return {
      ...formats,
      [id]: {
        ...format,
        [type]: fn(format[type], payload)
      }
    }
  }
}

const actionsHndlrs = {
  CREATE_COMPONENT: createComponent,
  SWITCH_FORMAT: switchFormat,
  CHANGE_DATATYPE_PARAM: fromFormatHndlr(changeDatatypeParam),
  CHANGE_DATATYPE_NAME: fromFormatHndlr(changeDatatypeName),
  UPDATE_SINGLE: fromFormatHndlr(updateSingle),
  NEW_CODE_LIST_SINGLE: fromFormatHndlr(newCodeListSingle),
  LOAD_QUESTIONNAIRE_SUCCESS: loadQuestionnaireSuccess
  [CREATE_COMPONENT]: createComponent,
  [SWITCH_FORMAT]: switchFormat,
  [CHANGE_DATATYPE_PARAM]: fromFormatHndlr(changeDatatypeParam),
  [CHANGE_DATATYPE_NAME]: fromFormatHndlr(changeDatatypeName),
  [UPDATE_SINGLE]: fromFormatHndlr(updateSingle),
  [NEW_CODE_LIST_SINGLE]: fromFormatHndlr(newCodeListSingle),
  [LOAD_QUESTIONNAIRE_SUCCESS]: loadQuestionnaireSuccess
}

export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload, action) : state
}

function switchFormat(formats, { id, type }) {
  return {
    ...formats,
    [id]: {
      ...formats[id],
      type
    }
  }
}

function createComponent(formats, { id, type }) {
  if (type !== COMPONENT_TYPE.QUESTION) return formats
  // We use the `id` of the question for the default datatype
  return {
    ...formats,
    [id]: {
      id,
      ...emptyFormat
    }
  }
}

/**
 * Update SINGLE format
 *
 * Properties to update can include `codeListReference` and `visHint`
 *
 * @param  {Object} format             initial format
 * @param  {Object} payload            action payload
 * @param  {String} payload.update     properties to update
 * @return {Object}                    updated format
 */
function updateSingle(format, { update }) {
  return {
    ...format,
    ...update
  }
}

function newCodeListSingle(format, { createdClId }) {
  return {
    ...format,
    codeListReference: createdClId
  }
}
function changeDatatypeName(format, { typeName }) {
  if (format.typeName === typeName) return format
  return {
    typeName,
    ...emptyDatatypeFactory[typeName]
  }
}

function changeDatatypeParam(format, { update }) {
  return {
    ...format,
    ...update
  }
}

// id is the code list id
function createCodeList(formats, { responseId, id }) {
  return {
    ...formats,
    [responseId]: {
      ...formats[responseId],
      codeListReference: id
    }
  }
}

function loadQuestionnaireSuccess(responses, { update: { responseFormatById } }) {
  return responseFormatById
}
