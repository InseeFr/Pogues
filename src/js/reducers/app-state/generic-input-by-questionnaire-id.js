import { COMPONENT_TYPE } from '../../constants/pogues-constants'
const { QUESTION, SEQUENCE } = COMPONENT_TYPE

import {
  INCREASE_DEPTH, DECREASE_DEPTH, TOGGLE_TYPE, UPDATE_GI
} from '../../actions/generic-input'

const defaultGiState = {
  parent: '',
  before: '',
  depth: 1,
  label: '',
  type: SEQUENCE
}

const actionsHndlrs = {
  CREATE_QUESTIONNAIRE: create,
  CREATE_COMPONENT: resetAfterCreation,
  SWITCH_TO_QUESTIONNAIRE: createIfNeeded,
  UPDATE_GI: update,
  TOGGLE_TYPE: toggleType,
  INCREASE_DEPTH: increaseDepth,
  DECREASE_DEPTH: decreaseDepth
}

export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload) : state
}

//See createQuestionnaire action creator signature
function create(state, { id }) {
  return { 
    ...state,
    [id]: defaultGiState
  }
}

function createIfNeeded(state, id) {
  if (state.hasOwnProperty(id)) return state
  return { 
    ...state,
    [id]: defaultGiState
  }  
}

function update(state, { id, value }) {
  const gi = state[id]
  return {
    ...state,
    [id]: {
      ...gi,
      label: value
    }
  }
}

function increaseDepth(state, id) {
  const gi = state[id]
  return {
    ...state,
    [id]: {
      ...gi,
      depth: Math.min(gi.depth + 1, gi.type === SEQUENCE ? 2 : 3)
    }
  }
}

function decreaseDepth(state, id) {
  const gi = state[id]
  return {
    ...state,
    [id]: {
      ...gi,
      depth: Math.max(gi.depth - 1, 1)
    }
  }
}

function toggleType(state, id) {
  const gi = state[id]
  const type = gi.type === SEQUENCE ? QUESTION : SEQUENCE
  // A sequence cannot have a depth of 3, a question cannot have a depth of 1
  // (we cannot add directly a question at the root of the questionnaire)
  const depth = type === SEQUENCE ?
    Math.min(gi.depth, 2) :
    Math.max(2, gi.depth)
  return {
    ...state,
    [id]: {
      ...gi,
      depth,
      type
    }
  }
}
//See createComponent action signature
function resetAfterCreation(state, { parent: id }) {
  // For now, parent is the questionnaire id, but the generic input actions
  // might change to handle creation within the questionnaire, and not only
  // at the end of it.
  return {
    ...state,
    [id]: defaultGiState
  }
}