import { uuid } from '../utils/data-utils'

export const CREATE_CODE = 'CREATE_CODE'
export const REMOVE_CODE = 'REMOVE_CODE'
export const EDIT_CODE = 'EDIT_CODE'
export const MOVE_UP_CODE = 'MOVE_UP_CODE'
export const MOVE_DOWN_CODE = 'MOVE_DOWN_CODE'


//TODO add value (check if backend is ready for this)
export function createCode(codeListId, label) {
  return {
    type: CREATE_CODE,
    payload: {
      id: uuid(),
      codeListId,
      label,
      value: ''
    }
  }
}

export function editCode(id, update) {
  return {
    type: EDIT_CODE,
    payload: {
      id,
      update
    }
  }
}

export function removeCode(id, codeListId) {
  return {
    type: REMOVE_CODE,
    payload: {
      id,
      codeListId
    }
  }
}

export function moveUpCode(id, codeListId) {
  return {
    type: MOVE_UP_CODE,
    payload: {
      id,
      codeListId
    }
  }
}
export function moveDownCode(id, codeListId) {
  return {
    type: MOVE_DOWN_CODE,
    payload: {
      id,
      codeListId
    }
  }
}