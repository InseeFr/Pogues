import {
  CREATE_GOTO, REMOVE_GOTO, EDIT_GOTO
} from '../actions/goTo'
import {
  LOAD_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'

const emptyGoTo = {
  description: '',
  expression: '',
  ifTrue: null, //ifTrue and ifFalse can be used to store a label, which can be
                //an empty string, so we use `null` as a default value
  ifFalse: null,
  ifTrueIsAName: false,
  ifFalseIsAName: false
}

const actionsHndlrs = {
  CREATE_GOTO: createGoTo,
  REMOVE_GOTO: removeGoTo,
  EDIT_GOTO: editGoTo,
  LOAD_QUESTIONNAIRE_SUCCESS: loadQuestionnaireSuccess
}


export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload, action) : state
}


function removeGoTo(goTos, { id }) {
  const { [id]: toRemove, ...toKeep } = goTos
  return toKeep
}

function createGoTo(goTos, { id }) {
  return {
    ...goTos,
    [id]: {
      id,
      ...emptyGoTo
    }
  }
}

function editGoTo(goTos, { id, update }) {
  return {
    ...goTos,
    [id]: {
      ...goTos[id],
      ...update
    }
  }
}

function loadQuestionnaireSuccess(goTos, { update: { goToById }}) {
  return goToById
}
