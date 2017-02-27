import { uuid } from '../utils/data-utils'

export const CREATE_CONTROL = 'ADD_CONTROL'
export const EDIT_CONTROL = 'EDIT_CONTROL'
export const REMOVE_CONTROL = 'REMOVE_CONTROL'

export function createControl(cmpntId, controlDscr) {
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

export function editControl(id, update) {
  return {
    type: EDIT_CONTROL,
    payload: {
      id,
      update
    }
  }
}

export function removeControl(id, cmpntId) {
  return {
    type: REMOVE_CONTROL,
    payload: {
      id,
      cmpntId
    }
  }
}