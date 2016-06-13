import {
  CREATE_COMPONENT, EDIT_COMPONENT
} from '../actions/component'

import {
  CREATE_GOTO, REMOVE_GOTO
} from '../actions/goTo'

import {
  CREATE_DECLARATION, REMOVE_DECLARATION
} from '../actions/declaration'

import {
  CREATE_QUESTIONNAIRE, LOAD_QUESTIONNAIRE_SUCCESS, CREATE_QUESTIONNAIRE_SUCCESS
} from '../actions/questionnaire'

import {
  CREATE_CONTROL, REMOVE_CONTROL  
} from '../actions/control'

import {
  CREATE_RESPONSE, REMOVE_RESPONSE
} from '../actions/response'


import { appendComponent } from '../utils/tree-utils'
import * as cmpntUtils from './component-utils'

import { COMPONENT_UTIL } from '../constants/pogues-constants'
const { CREATE, REMOVE } = COMPONENT_UTIL

const subs = [
  [CREATE_DECLARATION, 'declarations', CREATE],
  [CREATE_GOTO, 'goTos', CREATE],
  [CREATE_CONTROL, 'controls', CREATE],
  [CREATE_RESPONSE, 'responses', CREATE],
  [REMOVE_DECLARATION, 'declarations', REMOVE],
  [REMOVE_GOTO, 'goTos', REMOVE],
  [REMOVE_CONTROL, 'controls', REMOVE],
  [REMOVE_RESPONSE, 'responses', REMOVE]
]

const actionsHndlrs = {
  CREATE_COMPONENT: createComponent,
  CREATE_QUESTIONNAIRE: createQuestionnaire,
  EDIT_COMPONENT: editComponent,
  LOAD_QUESTIONNAIRE_SUCCESS: loadQuestionnaireSuccess,
  ...makeSubsHndlrs(subs)
}


export default function (state={}, action) {
  if (!action) return state
  const { type, payload } = action
  const hndlr = actionsHndlrs[type]
  return hndlr ? hndlr(state, payload, action) : state
}


function createQuestionnaire(cmpntsById, { id, name, label }) {
  return {
    ...cmpntsById,
    [id]: cmpntUtils.createQuestionnaire({ id, name, label })
  }
}

function createComponent(cmpntsById, { id, label, type, parent, depth }) {
  const cmpnt = cmpntUtils.createComponent({ id, label, type})
  const { parentId, childCmpnts } =
    appendComponent(parent, cmpnt, cmpntsById, depth)
  return {  
    ...cmpntsById,
    [id]: cmpnt,
    [parentId]: {
      ...cmpntsById[parentId],
      childCmpnts
    }
  }
  return 
}

function editComponent(cmpntsById, { id, update }) {
  return {
    ...cmpntsById,
    [id]: cmpntUtils.editComponent(cmpntsById[id], { update })
  }
}

function loadQuestionnaireSuccess(
    cmpntsById, { update: { componentById } }) {
  //TODO might be more secure to keep only new components (for instance if we
  //are not sure all names are distinct)
  return {
    ...cmpntsById,
    ...componentById
  }
}

function makeSubsHndlrs(subs) {
  return subs.reduce((hndlrs, [actionType, entityArrName, op]) => {
    const fn = cmpntUtils.createOrRemoveSubEntity(entityArrName, op)
    hndlrs[actionType] = (cmpntsById, { cmpntId: id, id: entityId }) => ({
      ...cmpntsById,
      [id]: fn(cmpntsById[id], entityId)
    })
    return hndlrs
  }, {})
}





