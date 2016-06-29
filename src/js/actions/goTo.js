
export const CREATE_GOTO = 'CREATE_GOTO'
export const EDIT_GOTO = 'EDIT_GOTO'
export const REMOVE_GOTO = 'REMOVE_GOTO'
import { uuid } from '../utils/data-utils'
/**
 * action creator to add a goTo
 * Add a goTo a component in a questionnarire.
 * @param {Object} id               component id
 * @param {string} cmpntId          component id
 * @param {Object} goTo             goTo description
 * @param {string} goTo.id          goTo id
 * @param {string} goTo.ifTrue      goTo id
 * @param {string} goTo.ifFalse     goTo id
 * @param {string} goTo.description goTo id
 * @param {string} goTo.expression  goTo id
 * 
 */
export function createGoTo(cmpntId) {
  return {
    type: CREATE_GOTO,
    payload: {
      id: uuid(),
      cmpntId
    }
  }
}

export function editGoTo(id, update) {
  return {
    type: EDIT_GOTO,
    payload: {
      id, //gotoId
      update
    }
  }
}

export function removeGoTo(id, cmpntId) {
  return {
    type: REMOVE_GOTO,
    payload: {
      id,
      cmpntId
    }
  }
}