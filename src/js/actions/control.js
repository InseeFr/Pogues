import { uuid } from '../utils/data-utils'

export const CREATE_CONTROL = 'ADD_CONTROL'
export const EDIT_CONTROL = 'EDIT_CONTROL'
export const REMOVE_CONTROL = 'REMOVE_CONTROL'

/**
 * Create control
 * 
 * @param   {string} cmpntId id of the component the control is added to
 * @returns {object}         CREATE_CONTROL action
 */
export function createControl(cmpntId) {
  return {
    type: CREATE_CONTROL,
    payload: {
      id: uuid(),
      cmpntId,
      controlDscr: ''
    }
  }
}

/**
 * Edit control
 * 
 * `update` is an object holding all the properties to update and their new
 * value
 * 
 * @param   {string} id      id of the control to be updated
 * @param   {object} update  properties to update
 * @returns {object}         EDIT_CONTROL action
 */
export function editControl(id, update) {
  return {
    type: EDIT_CONTROL,
    payload: {
      id,
      update
    }
  }
}

/**
 * Remove control
 * 
 * @param   {string} id      id of the control to remove
 * @param   {string} cmpntId id of the component which holds this control
 * @returns {object}         REMOVE_CONTROL action
 */
export function removeControl(id, cmpntId) {
  return {
    type: REMOVE_CONTROL,
    payload: {
      id,
      cmpntId
    }
  }
}