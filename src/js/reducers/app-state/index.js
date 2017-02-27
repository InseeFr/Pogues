//TODO this reduce could be partly replaced by react-router

import {
  SWITCH_TO_QUESTIONNAIRE, SWITCH_TO_PICKER, SWITCH_TO_CONFIG,
  TOGGLE_SHOW_CONTROLS
} from '../../actions/app-state'

import {
  CREATE_QUESTIONNAIRE, CREATE_QUESTIONNAIRE_SUCCESS
} from '../../actions/questionnaire'

import {
  SET_QLIST_FILTER
} from '../../actions/questionnaire-list'

import {
  COMPONENT_TYPE, REMOTE_EVENT, VIEW_TYPE
} from '../../constants/pogues-constants'

// import {
//   EDIT_RESPONSE_CHOOSE_CODE_LIST
// } from '../../actions/response-format'

import activeCmpnts from './active-components-by-id'
import questionnaires from './questionnaires-by-id'
import gi from './generic-input-by-questionnaire-id'

const { QUESTION, SEQUENCE } = COMPONENT_TYPE
const { FAILED, LOADED, PENDING } = REMOTE_EVENT
const { QUESTIONNAIRE, EDITION, PICKER, CONFIG } = VIEW_TYPE

const defaultAppState = {
  view: PICKER,
  showControls: true,
  questionnaireListFilter: '',
  questionnaire: null,
  clLoadedById: {}
}

// We did not use combineReducers to keep the `view`, `questionnaire` and
// `questionnaireListFilter` at the top level of the reducer (we could have
// made a 'misc' reducer to handle them, but unecessary)

export default function (state=defaultAppState, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHnlrs[type]
  return {
    ...(hndlr ? hndlr(state, payload) : state),
    activecomponentById: activeCmpnts(state.activecomponentById, action),
    questionnaireById: questionnaires(state.questionnaireById, action),
    giById: gi(state.giById, action)
  }
}

//TODO see if you want to active automatically the code list editor when we
//choose a code list for a response (EDIT_RESPONSE_CHOOSE_CODE_LIST)
const actionsHnlrs = {
  SWITCH_TO_CONFIG: switchToConfig,
  SWITCH_TO_PICKER: switchToPicker,
  SWITCH_TO_QUESTIONNAIRE: switchToQuestionnaire,
  CREATE_QUESTIONNAIRE: switchToQuestionnaireAfterCreation,
  // CREATE_QUESTIONNAIRE_SUCCESS: changeIdAfterCreation,
  SET_QLIST_FILTER: setQuestionnaireListFilter,
  TOGGLE_SHOW_CONTROLS: toggleShowControls
}

function toggleShowControls(state) {
  return {
    ...state,
    showControls: !state.showControls
  }
}

function switchToPicker(state) {
  return {
    ...state,
    questionnaire: null,
    view: PICKER
  }
}

function switchToQuestionnaire(state, id) {
  return {
    ...state,
    questionnaire: id,
    view: QUESTIONNAIRE
  }
}

function switchToConfig(state) {
  return {
    ...state,
    questionnaire: null,
    view: CONFIG
  }
}

//payload shape differs from SWITCH_TO_QUESTIONNAIRE
function switchToQuestionnaireAfterCreation(state, { id }) {
  return {
    ...state,
    questionnaire: id,
    view: QUESTIONNAIRE
  }
}

// function changeIdAfterCreation(state, { newId }) {
//   //TODO since we're dealing with asyncrhonous actions, we should check we are
//   //still on the questionnaire associated to this action. Something like
//   //`questionnaire === id`
//   return {
//     ...state,
//     id: newId
//   }
// }
function setQuestionnaireListFilter(state, filter) {
  return {
    ...state,
    questionnaireListFilter: filter
  }
}
