import { uuid } from '../utils/data-utils'

export const CREATE_DECLARATION = 'ADD_DECLARATION'
export const EDIT_DECLARATION = 'EDIT_DECLARATION'
export const REMOVE_DECLARATION = 'REMOVE_DECLARATION'

export function createDeclaration(cmpntId, declarationDscr) {
  return {
    type: CREATE_DECLARATION,
    payload: {
      id: uuid(),
      cmpntId,
      declarationDscr      
    }
  }
}

export function editDeclaration(id, update) {
  return {
    type: EDIT_DECLARATION,
    payload: {
      id, 
      update
    }
  }
}

export function removeDeclaration(id, cmpntId) {
  return {
    type: REMOVE_DECLARATION,
    payload: {
      id,
      cmpntId
    }
  }
}