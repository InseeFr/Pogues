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
  CREATE_RESPONSE, EDIT_RESPONSE, REMOVE_RESPONSE,
  CHANGE_DATATYPE_NAME, CHANGE_DATATYPE_PARAM, EDIT_RESPONSE_CHOOSE_CODE_LIST
} from '../actions/response'

import {
  LOAD_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'


import { CREATE_CODE_LIST } from '../actions/code-list'

import { COMPONENT_TYPE } from '../constants/pogues-constants'
import { emptyTextDatatype, emptyDatatypeFactory } from './datatype-utils'

const emptyResponse = {
  simple: true,
  mandatory: false,
  codeListReference: '',
  values: [],
  datatype: emptyTextDatatype
}

const actionsHndlrs = {
  CREATE_COMPONENT: createComponent,
  CREATE_RESPONSE: createResponse,
  CREATE_CODE_LIST: createCodeList,
  EDIT_RESPONSE: editResponse,
  EDIT_RESPONSE_CHOOSE_CODE_LIST: editResponseChooseCodeList,
  REMOVE_RESPONSE: removeResponse,
  CHANGE_DATATYPE_NAME: changeDatatypeName,
  CHANGE_DATATYPE_PARAM: changeDatatypeParam,
  LOAD_QUESTIONNAIRE_SUCCESS: loadQuestionnaireSuccess
}

export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload, action) : state
}

function createComponent(responses, { id, type }) {
  if (type !== COMPONENT_TYPE.QUESTION) return responses
  // We use the `id` of the question for the default datatype
  return {
    ...responses,
    [id]: {
      id,
      ...emptyResponse
    }
  }
}

function createResponse(responses, { id }) {
  return {
    ...responses,
    [id]: {
      id,
      ...emptyResponse
    }
  }
}

function editResponse(responses, { id, update }) {
  return {
    ...responses,
    [id]: {
      ...responses[id],
      ...update
    }
  }
}

function editResponseChooseCodeList(responses, { id, codeListId }) {
  return editResponse(
    responses,
    { id,
      update: { codeListReference: codeListId }
    })
}

function removeResponse(responses, { id }) {
  const { [id]: toRemove, ...toKeep } = responses
  return toKeep
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
