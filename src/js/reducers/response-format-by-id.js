//   this._simple = object._simple;
//   this._mandatory = object._mandatory;
//   this._codeListReference = object._codeListReference;
//   this._datatype = object._datatype;
//   this._datatype = createDatatype(object._datatype._typeName, object._datatype);
//   this._values = object._values;
// } else {
//   this._simple = true;
//   this._mandatory = false;
//   this._codeListReference = null;
//   this._datatype = new TextDatatypeModel();
//   this._values = [];

import {
  SWITCH_FORMAT
} from '../actions/response-format'

import {
  LOAD_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'

import { RESPONSE_FORMAT, COMPONENT_TYPE } from '../constants/pogues-constants'
import { emptyTextDatatype, emptyDatatypeFactory } from './datatype-utils'

const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT

const emptyFormat = {
  type: SIMPLE
}

const actionsHndlrs = {
  CREATE_COMPONENT: createComponent,
  SWITCH_FORMAT: switchFormat,
  LOAD_QUESTIONNAIRE_SUCCESS: loadQuestionnaireSuccess
}

export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload, action) : state
}

function switchFormat(formats, { id, format }) {
  return {
    ...formats,
    [id]: {
      type: format
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

function changeDatatypeName(responses, { id, typeName }) {
  const response = responses[id]
  const { datatype } = response
  if (datatype.typeName === typeName) return responses
  return {
    ...responses,
    [id]: {
      ...response,
      datatype: {
        typeName,
        ...emptyDatatypeFactory[typeName]
      }
    }
  }
}

function changeDatatypeParam(responses, { id, update }) {
  return {
    ...responses,
    [id]: {
      ...responses[id],
      datatype: {
        ...responses[id].datatype,
        ...update
      }
    }
  }
}

// id is the code list id
function createCodeList(responses, { responseId, id }) {
  return {
    ...responses,
    [responseId]: {
      ...responses[responseId],
      codeListReference: id
    }
  }
}

function loadQuestionnaireSuccess(responses, { update: { responseFormatById } }) {
  return responseFormatById
}
