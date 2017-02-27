import { uuid } from '../utils/data-utils'

export const MOVE_COMPONENT = 'MOVE_COMPONENT'
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT'
export const EDIT_COMPONENT = 'EDIT_COMPONENT'

export const editComponent = (id, update) => ({
  type: EDIT_COMPONENT,
  payload: {
    id,
    update
  }
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

export const removeComponent = (id, parent, previous) => ({
  type: REMOVE_COMPONENT,
  payload: {
    parent,
    id,
    previous
  }
})

export const moveComponent = (qrId, origin, dest, previous) => ({
  type: MOVE_COMPONENT,
  payload: {
    origin,
    dest,
    previous,
    qrId
  }
})