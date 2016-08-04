import { uuid } from '../utils/data-utils'

export const CREATE_CONDITION = 'CREATE_CONDITION'
export const EDIT_CONDITION = 'EDIT_CONDITION'
export const REMOVE_CONDITION = 'REMOVE_CONDITION'

export const createCondition = (cmpntId) => ({
  type: CREATE_CONDITION,
  payload: {
    id: uuid(),
    cmpntId
  }
})

export function editCondition(id, update) {
  return {
    type: EDIT_CONDITION,
    payload: {
      id,
      update
    }
  }
}

export const removeCondition = (id, cmpntId) => ({
  type: REMOVE_CONDITION,
  payload: {
    id,
    cmpntId
  }
})