import { uuid } from '../utils/data-utils'

export const CREATE_CONDITION = 'CREATE_CONDITION'
export const EDIT_CONDITION = 'EDIT_CONDITION'
export const REMOVE_CONDITION = 'REMOVE_CONDITION'

/**
 * Create condition
 * 
 * @param   {string} cmpntId id of the component the condition is added to
 * @returns {object}         CREATE_CONDITION action
 */
export const createCondition = (cmpntId) => ({
  type: CREATE_CONDITION,
  payload: {
    id: uuid(),
    cmpntId
  }
})

/**
 * Edit condition
 * 
 * `update` is an object holding all the properties to update and their new
 * value
 * 
 * @param   {string} id      id of the condition to be updated
 * @param   {object} update  properties to update
 * @returns {object}         EDIT_CONDITION action
 */
export function editCondition(id, update) {
  return {
    type: EDIT_CONDITION,
    payload: {
      id,
      update
    }
  }
}

/**
 * Remove condition
 * 
 * @param   {string} id      id of the condition to remove
 * @param   {string} cmpntId id of the component which holds this condition
 * @returns {object}         REMOVE_CONDITION action
 */
export const removeCondition = (id, cmpntId) => ({
  type: REMOVE_CONDITION,
  payload: {
    id,
    cmpntId
  }
})