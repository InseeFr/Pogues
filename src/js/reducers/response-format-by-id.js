import {
  SWITCH_FORMAT, UPDATE_FORMAT, UPDATE_DATATYPE,
  NEW_CODE_LIST_FORMAT,
} from '../actions/response-format'

import { LOAD_QUESTIONNAIRE_SUCCESS } from '../actions/questionnaire'
import { CREATE_COMPONENT } from '../actions/component'

import { RESPONSE_FORMAT, COMPONENT_TYPE } from '../constants/pogues-constants'
import { emptyDatatypeFactory } from './datatype-utils'
import { AXIS } from '../constants/pogues-constants'

const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT
const { INFO, MEASURE } = AXIS

/**
 * Default value for a response format. We create an entry for each type of
 * format. This will allow recovering of previously filled parameters if the
 * user mistakenly switches between format types.
 */
const emptyFormat = {
  type: SIMPLE,
  [SIMPLE]: emptyDatatypeFactory,
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
 * Produce a reducing function from a function that updates a response format
 *
 * It takes a function that updates a format based on an action payload and
 * produces a reducing function that takes all the response formats and updates
 * only the format corresponding to the current `id` (extracted from the
 * payload) and the relevant format based on the current type (SIMPLE, SINGLE,
 * MULTIPLE or TABLE) for this response format.
 *
 * The reducing function is not attached to a special type of format: if an
 * action assigned to this function is dispatched, then it should make sense for
 * the current type.
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
        [type]: fn(format[type], payload, type)
      }
    }
  }
}

const actionsHndlrs = {
  [CREATE_COMPONENT]: createComponent,
  [SWITCH_FORMAT]: switchFormat,
  [UPDATE_DATATYPE]: fromFormatHndlr(updateDatatype),
  [UPDATE_FORMAT]: fromFormatHndlr(updateFormat),
  [NEW_CODE_LIST_FORMAT]: fromFormatHndlr(newCodeListFormat),
  [LOAD_QUESTIONNAIRE_SUCCESS]: loadQuestionnaireSuccess,
}

export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload, action) : state
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

function switchFormat(formats, { id, type }) {
  return {
    ...formats,
    [id]: {
      ...formats[id],
      type
    }
  }
}

/**
 * Update format
 *
 * Properties that can be updated depend on the target.
 *
 * For a SIMPLE format:
 * - `typeName` ;
 * - `length` when dealing with `TextDatatype` ;
 * - `pattern` when dealing with `TextDatatype` ;
 * - `min` when dealing with `NumericDatatype` ;
 * - `max` when dealing with `NumericDatatype` ;
 * - `precision` when dealing with `NumericDatatype`.
 *
 * For a single format: `visHint`.
 *
 * For a MUTLIPLE format: `infoCodeList`, `measureCodeList`,
 *  `measureVisHint` and `switchBooleanMultiple`.
 *
 * For a TABLE format
 *
 * @param  {Object} format             initial format
 * @param  {Object} payload            action payload
 * @param  {String} payload.update     properties to update
 * @return {Object}                    updated format
 */

function updateFormat(format, { update  }) {
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
