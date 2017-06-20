export const TOGGLE_TYPE = 'TOGGLE_TYPE'
export const DECREASE_DEPTH = 'DECREASE_DEPTH'
export const INCREASE_DEPTH = 'INCREASE_DEPTH'
export const UPDATE_GI = 'UPDATE_GI'

/**
 * Increase the depth of the generic input for a given questionnaire
 * 
 * @param   {string}   id questionnaire id
 * @returns {object}      INCREASE_DEPTH action
 */
export function increaseDepth(id) {
  return {
    type: INCREASE_DEPTH,
    payload: id
  }
} 

/**
 * Decrease the depth of the generic input for a given questionnaire
 * 
 * @param   {string}   id questionnaire id
 * @returns {object}      DECREASE_DEPTH action
 */
export function decreaseDepth(id) {
  return {
    type: DECREASE_DEPTH,
    payload: id
  }
}

/**
 * Swith the generic input for a given questionnaire from question to sequence
 * and vice versa
 * 
 * @param   {string}   id questionnaire id
 * @returns {object}    TOGGLE_TYPE action
 */
export function toggleType(id) {
  return {
    type: TOGGLE_TYPE,
    payload: id
  }
}

/**
 * Update the value of the generic input for a given questionnaire
 * 
 * @param   {string}   id    questionnaire id
 * @param   {string}   value the value of the generic input
 * @returns {object}         UPDATE_GI action
 */
export function update(id, value) {
  return {
    type: UPDATE_GI,
    payload: {
      id,
      value
    }
  }
}