import { uuid } from '../utils/data-utils'

export const CREATE_DECLARATION = 'ADD_DECLARATION'
export const EDIT_DECLARATION = 'EDIT_DECLARATION'
export const REMOVE_DECLARATION = 'REMOVE_DECLARATION'

/**
 * Create declaration
 * 
 * @param   {string}  cmpntId    id of the component the declaration is added to
 * @param   {boolean} isQuestion `tru`` if the component is a question, `false`
 *                               if it is a sequence
 * @returns {object}             CREATE_DECLARATION action
 */
export function createDeclaration(cmpntId, isQuestion) {
  return {
    type: CREATE_DECLARATION,
    payload: {
      id: uuid(),
      cmpntId,
      isQuestion,
    }
  }
}

/**
 * Edit declaration
 * 
 * `update` is an object holding all the properties to update and their new
 * value
 * 
 * @param   {string} id      id of the declaration to be updated
 * @param   {object} update  properties to update
 * @returns {object}         EDIT_DECLARATION action
 */
export function editDeclaration(id, update) {
  return {
    type: EDIT_DECLARATION,
    payload: {
      id, 
      update
    }
  }
}

/**
 * Remove declaration
 * 
 * @param   {string} id      id of the declaration to remove
 * @param   {string} cmpntId id of the component which holds this control
 * @returns {object}         REMOVE_DECLARATION action
 */
export function removeDeclaration(id, cmpntId) {
  return {
    type: REMOVE_DECLARATION,
    payload: {
      id,
      cmpntId
    }
  }
}