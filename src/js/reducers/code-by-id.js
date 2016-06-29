import {
  CREATE_CODE, REMOVE_CODE, EDIT_CODE
} from '../actions/code'

import { LOAD_QUESTIONNAIRE_SUCCESS } from '../actions/questionnaire'
import { LOAD_CODE_LIST_SUCCESS } from '../actions/code-list'

const actionsHndlrs = {
  CREATE_CODE: createCode,
  REMOVE_CODE: removeCode,
  EDIT_CODE: editCode,
  LOAD_CODE_LIST_SUCCESS: loadCodeList,
  LOAD_QUESTIONNAIRE_SUCCESS: loadQuestionnaireSuccess
}

export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload, action) : state
}

function createCode(codes, { id, label, value }) {
  return {
    ...codes,
    [id]: {
      id, label, value
    }
  }
}

function removeCode(codes, { id }) {
  const { [id]: toRemove, ...toKeep } = codes
  return toKeep
}

function editCode(codes, { id, update }) {
  return {
    ...codes,
    [id]: {
      ...codes[id],
      ...update
    }
  }
}
// payload is a codeList (an object with a `codes` property)
function loadCodeList(codes, { codes: newCodes }) {
  return newCodes.reduce((codes, code) => {
      codes[code.id] = code
      return codes
    }, {...codes})
}

function loadQuestionnaireSuccess(codes, { update: { codeById } }) {
  return {
    ...codes,
    ...codeById
  }
}