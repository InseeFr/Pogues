import {
  SWITCH_FORMAT, CHANGE_DATATYPE_PARAM, CHANGE_DATATYPE_NAME,
  UPDATE_SINGLE, NEW_CODE_LIST_SINGLE,
  UPDATE_MULTIPLE, NEW_CODE_LIST_MULTIPLE, SWITCH_BOOLEAN_MULTIPLE
} from '../actions/response-format'

import { LOAD_QUESTIONNAIRE_SUCCESS } from '../actions/questionnaire'
import { CREATE_COMPONENT } from '../actions/component'

import { RESPONSE_FORMAT, COMPONENT_TYPE } from '../constants/pogues-constants'
import { emptyTextDatatype, emptyDatatypeFactory } from './datatype-utils'
import { AXIS } from '../constants/pogues-constants'

const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT
const { INFO, MEASURE } = AXIS
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
    infoCodeList: '',
    measureBoolean: false,
    measureCodeList: '',
    measureVisHint: false
  },
  [TABLE]: {
    infos: [],
    measures: []
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
  [CREATE_COMPONENT]: createComponent,
  [SWITCH_FORMAT]: switchFormat,
  [CHANGE_DATATYPE_PARAM]: fromFormatHndlr(changeDatatypeParam),
  [CHANGE_DATATYPE_NAME]: fromFormatHndlr(changeDatatypeName),
  [UPDATE_SINGLE]: fromFormatHndlr(updateSingle),
  [UPDATE_MULTIPLE]: fromFormatHndlr(updateMultiple),
  [SWITCH_BOOLEAN_MULTIPLE]: fromFormatHndlr(switchBooleanMultiple),
  [NEW_CODE_LIST_SINGLE]: fromFormatHndlr(newCodeListSingle),
  [NEW_CODE_LIST_MULTIPLE]: fromFormatHndlr(newCodeListMultiple),
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
 * Create a new code list and assign it to a SIMPLE format
 * @param  {Object} format               initial format
 * @param  {Object} payload              action payload
 * @param  {String} payload.createdClId  id of the code list to create
 * @return {Object}                      updated format
 */
function newCodeListSingle(format, { createdClId }) {
  return {
    ...format,
    codeListReference: createdClId
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

/**
 * Update MULTIPLE format
 *
 * Updatable properties are `infoCodeList`, `measureCodeList` and
 * `measureVisualizationHint`.
 *
 * To switch `measureBoolean`, use `switchBooleanMultiple`.
 *
 * In practice, only one property will be present in `update`.
 *
 * @param  {Object} format             initial format
 * @param  {Object} payload            action payload
 * @param  {String} payload.update     properties to update
 * @return {Object}                    updated format
 */
function updateMultiple(format, { update }) {
  return {
    ...format,
    ...update
  }
}
/**
 * Switch measure boolean
 *
 * Toggle `measureCodeList`. `measureCodeList` and `measureVisHint`
 * will keep their value (but it's supposed to be hidden in the ui), so if the
 * user changes it mind, they will be restored.
 *
 * In fact, since we do not reinitialize anything, there's no logic here and we
 * could have used instead the simple `updateMultiple` handler.
 *
 * @param  {Object} format             initial format
 * @return {Object}                    updated format
 */
function switchBooleanMultiple(format) {
  let { measureCodeList, measureVisualizationHint, measureBoolean } = format
  measureBoolean = !measureBoolean
  return {
    ...format,
    measureBoolean,
  }
}

/**
 * Create a new code list and assign it to a MULTIPLE format
 *
 * We specify what the code list will be used for via `forWhat`.
 * Valid values for `forWhat` are `'INFO'` or `'MEASURE'`.
 *
 * @param  {Object}        format                 initial format
 * @param  {Object}        payload                action payload
 * @param  {String}        payload.createdClId    id of the code list to create
 * @param  {String}        payload.forWhat        for each property will the
 *                                                created code list be used for
 * @return {Object}                               updated format
 */
function newCodeListMultiple(format, { createdClId, forWhat }) {
  const newFormat = {...format}
  if (forWhat === INFO) return {
    ...format,
    infoCodeList: createdClId
  }
  // `forWhat` is MEASURE
  else return {
    ...format,
    measureCodeList: createdClId
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
