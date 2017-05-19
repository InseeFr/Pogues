
export const CREATE_GOTO = 'CREATE_GOTO'
export const EDIT_GOTO = 'EDIT_GOTO'
export const REMOVE_GOTO = 'REMOVE_GOTO'
import { uuid } from '../utils/data-utils'


/**
 * Create a goto
 * 
 * @param   {string} cmpntId id of the component the goto is added to
 * @returns {object}         CREATE_GOTO action
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

/**
 * Edit a goto
 * 
 * `update` is an object holding all the properties to update and their new
 * value
 * 
 * @param   {string} id      id of the goto to be updated
 * @param   {object} update  properties to update
 * @returns {object}         EDIT_GOTO action
 */
export function editGoTo(id, update) {
  return {
    type: EDIT_GOTO,
    payload: {
      id,
      update
    }
  }
}

/**
 * Remove a goto
 * 
 * @param   {string} id      id of the goto to remove
 * @param   {string} cmpntId id of the component which holds this goto
 * @returns {object}         REMOVE_GOTO action
 */
export function removeGoTo(id, cmpntId) {
  return {
    type: REMOVE_GOTO,
    payload: {
      id,
      cmpntId
    }
  }
}