import {
  SWITCH_FORMAT, CHANGE_DATATYPE_PARAM
} from '../actions/response-format'

import {
  LOAD_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'

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
    hint: ''
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
  LOAD_QUESTIONNAIRE_SUCCESS: loadQuestionnaireSuccess
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


function editResponse(formats, { id, update }) {
  return {
    ...formats,
    [id]: {
      ...formats[id],
      ...update
    }
  }
}

function editResponseChooseCodeList(formats, { id, codeListId }) {
  return editResponse(
    formats,
    { id,
      update: { codeListReference: codeListId }
    })
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
