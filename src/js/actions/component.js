import { uuid } from '../utils/data-utils'

//TODO normalize naming (UPDATE vs EDIT)
export const EDIT_COMPONENT = 'EDIT_COMPONENT'
export const editComponent = (id, update) => ({
  type: EDIT_COMPONENT,
  payload: {
    id,
    update
  }
})

export const TOGGLE_ACTIVE_COMPONENT = 'TOGGLE_ACTIVE_COMPONENT'
export const toggleActiveComponent = id => ({
  type: TOGGLE_ACTIVE_COMPONENT,
  payload: id
})

export const CREATE_COMPONENT = 'CREATE_COMPONENT'

//TODO for now, parent is the qrId, but in a future, we could need parent and
//qrId to handle creation within a questionnaire (in this context, qrId will
//still be needed to reset the generic input)
export const createComponent = (parent, label, type, depth) => {
  return {
    type: CREATE_COMPONENT,
    payload: {
      id: uuid(),
      parent,
      label,
      type,
      depth
    }
  }
}


export const REMOVE_COMPONENT = 'REMOVE_COMPONENT'
export const removeComponent = (id, parent) => ({
  type: REMOVE_COMPONENT,
  payload: {
    parent,
    id
  }
})

export const MOVE_COMPONENT = 'MOVE_COMPONENT'
export const moveComponent = (qrId, origin, dest, previous) => ({
  type: MOVE_COMPONENT,
  payload: {
    origin,
    dest,
    previous,
    qrId
  }
})

export const MOVE_UP_COMPONENT = 'MOVE_UP_COMPONENT'
export const moveUpComponent = (id, parent) => ({
  type: MOVE_UP_COMPONENT,
  payload: {
    id,
    parent,
  }
})

export const MOVE_DOWN_COMPONENT = 'MOVE_DOWN_COMPONENT'
export const moveDownComponent = (id, parent) => ({
  type: MOVE_DOWN_COMPONENT,
  payload: {
    id,
    parent
  }
})
