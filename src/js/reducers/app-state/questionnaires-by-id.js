import { REMOTE_EVENT } from '../../constants/pogues-constants'

// const { FAILED, LOADED, PENDING } = REMOTE_EVENT

const defaultQrState = {
  filter: '',
  publishUrl: '',
  publishTimestamp: '',
  loaded: false
}


const actionsHnlrs = {
  CREATE_QUESTIONNAIRE: createQuestionnaire,
  CREATE_QUESTIONNAIRE_SUCCES: createQuestionnaireSuccess,
  CREATE_QUESTIONNAIRE_FAILURE: createQuestionnaireFailure,
  LOAD_QUESTIONNAIRE: loadQuestionnaire,
  LOAD_QUESTIONNAIRE_SUCCESS: loadQuestionnaireSuccess,
  LOAD_QUESTIONNAIRE_FAILURE: loadQuestionnaireFailure,
  PUBLISH_QUESTIONNAIRE: publishQuestionnaire,
  PUBLISH_QUESTIONNAIRE_SUCCESS: publishQuestionnaireSuccess,
  SET_QUESTIONNAIRE_FILTER: setQuestionnaireFilter,
  SWITCH_TO_QUESTIONNAIRE: setActiveQuestionnaire
}

/**
 * Questionnaires state by id reducer
 *
 * We deal with an object of action handlers since the actions have very
 * different signatures and it's more readable than a `swith` statement.
 * 
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHnlrs[type]
  return hndlr ? hndlr(state, payload) : state
}

function setActiveQuestionnaire(state, id) {
  if (state.hasOwnProperty(id)) return state
  else return {
    ...state,
    [id]: defaultQrState
  }
}

function createQuestionnaire(state, { id }) {
  return {
    ...state,
    [id]: {
      ...defaultQrState,
      loaded: true
    }
  }
}

export function createQuestionnaireSuccess(state, { id /*, newId */ }) {
  const { [id]: qrState, ...toKeep } = state
  return {
    ...toKeep,
    [id /* newId */ ]: {
      ...qrState,
      // id: newId,
      //remote: LOADED
    }
  }
}

export function createQuestionnaireFailure(state, { id }) {
  const qrState = state[id]
  return {
    ...state,
    [id]: {
      ...qrState,
      //remote: FAILED
    }
  }
}

export function loadQuestionnaire(state, id) {
  const qrState = state[id]
  return {
    ...state,
    [id]: {
      ...qrState,
      //remote: PENDING
    }
  }
}

export function loadQuestionnaireSuccess(state, { id }) {
  const qrState = state[id]
  return {
    ...state,
    [id]: {
      ...qrState,
      loaded: true
    }
  }
}


export function loadQuestionnaireFailure(state, { id }) {
  const qrState = state[id]
  return {
    ...state,
    [id]: {
      ...qrState,
      loaded: false
    }
  }
}

export function publishQuestionnaireSuccess(state, { id, url }) {
  const qrState = state[id]
  const date = new Date()
  return {
    ...state,
    [id]: {
      ...qrState,
       url,
      timestamp:
          `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
    }
  }
}

export function publishQuestionnaire(state, { id }) {
  const qrState = state[id]
  return {
    ...state,
    [id]: {
      ...qrState,
      url: 'pending',
      timestamp: 'pending'
    }
  }
}

function setQuestionnaireFilter(state, { id, filter }) {
  const qrState = state[id]
  return {
    ...state,
    [id]: {
      ...qrState,
      filter
    }
  }
}