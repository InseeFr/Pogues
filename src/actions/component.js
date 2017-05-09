import { uuid } from '../utils/data-utils'

export const CREATE_COMPONENT = 'CREATE_COMPONENT'
export const MOVE_COMPONENT = 'MOVE_COMPONENT'
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT'
export const EDIT_COMPONENT = 'EDIT_COMPONENT'

//TODO for now, parent is the qrId, but in a future, we could need parent and
//qrId to handle creation within a questionnaire (in this context, qrId will
//still be needed to reset the generic input)
/**
 * Create component
 * 
 * `update` is an object holding all the properties to update and their new
 * value.
 * 
 * @param   {string}  parent parent component id
 * @param   {string}  label  label for the newly created component
 * @param   {string}  type   type (question or sequence)
 * @param   {integer} depth  depth
 * @returns {object}         CREATE_COMPONENT action
 */
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

/**
 * Edit component
 * 
 * `update` is an object holding all the properties to update and their new
 * value.
 * 
 * @param   {string} id     component id
 * @param   {object} update properties which need to be updated
 * @returns {object}        EDIT_COMPONENT action
 */
export const editComponent = (id, update) => ({
  type: EDIT_COMPONENT,
  payload: {
    id,
    update
  }
})

/**
 * Remove component
 * 
 * `previous` is the component before the component to removed when dealing
 * with a flat chronological representation of the questionnaire.
 * 
 * @param   {string} id       component id
 * @param   {string} parent   parent component id
 * @param   {string} previous component before the removed component
 * @returns {object}          REMOVE_COMPONENT action
 */
export const removeComponent = (id, parent, previous) => ({
  type: REMOVE_COMPONENT,
  payload: {
    parent,
    id,
    previous
  }
})

/**
 * Move component
 * 
 * `dest` serves as an anchor, the component will be moved before or after this
 * anchor depending on the relative positions of `origin` and `dest` (see.
 * reducer implementation).
 * 
 * @param   {string} qrId     questionnaire id
 * @param   {string} origin   component being moved
 * @param   {string} dest     component where (before or after) the component
 *                            will be moved
 * @param   {string} previous the component just before the component being 
 *                            moved (before being moved)
 * @returns {object}          MOVE_COMPONENT action
 */
export const moveComponent = (qrId, origin, dest, previous) => ({
  type: MOVE_COMPONENT,
  payload: {
    origin,
    dest,
    previous,
    qrId
  }
})