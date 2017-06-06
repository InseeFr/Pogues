import { uuid } from 'utils/data-utils';

export const CREATE_CODE = 'CREATE_CODE';
export const REMOVE_CODE = 'REMOVE_CODE';
export const EDIT_CODE = 'EDIT_CODE';
export const MOVE_UP_CODE = 'MOVE_UP_CODE';
export const MOVE_DOWN_CODE = 'MOVE_DOWN_CODE';

/**
 * Create code
 *
 * @param   {string} codeListId  id of the code list the code will be added to
 * @param   {string} label       code label
 * @returns {object}             CREATE_CODE action
 */
export function createCode(codeListId, label) {
  return {
    type: CREATE_CODE,
    payload: {
      id: uuid(),
      codeListId,
      label,
      value: '',
    },
  };
}

/**
 * Edit code
 *
 * `update` is an object holding all the properties to update and their new
 * value.
 *
 * @param   {string} id          code id
 * @param   {object} update      properties which need to be updated
 * @returns {object}             EDIT_CODE action
 */
export function editCode(id, update) {
  return {
    type: EDIT_CODE,
    payload: {
      id,
      update,
    },
  };
}

/**
 * Remove code
 *
 * @param   {string} id          code id
 * @param   {string} codeListId  code list id
 * @returns {object}             REMOVE_CODE action
 */
export function removeCode(id, codeListId) {
  return {
    type: REMOVE_CODE,
    payload: {
      id,
      codeListId,
    },
  };
}

/**
 * Move up code
 *
 * @param   {string} id          code id
 * @param   {string} codeListId  code list id
 * @returns {object}             MOVE_UP_CODE action
 */
export function moveUpCode(id, codeListId) {
  return {
    type: MOVE_UP_CODE,
    payload: {
      id,
      codeListId,
    },
  };
}

/**
 * Move down code
 *
 * @param   {string} id          code id
 * @param   {string} codeListId  code list id
 * @returns {object}             MOVE_DOWN_CODE action
 */
export function moveDownCode(id, codeListId) {
  return {
    type: MOVE_DOWN_CODE,
    payload: {
      id,
      codeListId,
    },
  };
}
