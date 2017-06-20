// View (we should use react router instead)
export const SWITCH_TO_QUESTIONNAIRE = 'SWITCH_TO_QUESTIONNAIRE'
export const SWITCH_TO_PICKER = 'SWITCH_TO_PICKER'
export const SWITCH_TO_CONFIG = 'SWITCH_TO_CONFIG'
export const TOGGLE_SHOW_CONTROLS = 'TOGGLE_SHOW_CONTROLS'
export const SET_QLIST_FILTER = 'SET_QLIST_FILTER'
export const SET_QUESTIONNAIRE_FILTER = 'SET_QUESTIONNAIRE_FILTER'
export const TOGGLE_ACTIVE_COMPONENT = 'TOGGLE_ACTIVE_COMPONENT'

/**
 * Switch to questionnaire view and show the given questionnaire
 * 
 * @param  {string} id questionnaire id
 * @return {object}    SWITCH_TO_QUESTIONNAIRE action 
 */
export const switchToQuestionnaire = id => (
  {
    type: SWITCH_TO_QUESTIONNAIRE,
    payload: id
  }
)

/**
 * Switch to questionnaire picker view
 * 
 * @return {object} SWITCH_TO_PICKER action 
 */
export const switchToPicker = () => (
  {
    type: SWITCH_TO_PICKER
  }
)

/**
 * Switch to config view
 * 
 * @return {object} SWITCH_TO_CONFIG action 
 */
export const switchToConfig = () => (
  {
    type: SWITCH_TO_CONFIG
  }
)

/**
 * Toggle visibility of integrity checks
 * 
 * @returns {object}        TOGGLE_SHOW_CONTROLS action
 */
export const toggleShowControls = () => ({
  type: TOGGLE_SHOW_CONTROLS
})


/**
 * Filter questionnaire list
 * 
 * Only the questionnaires matching this filter will be shown in the welcome
 * screen.
 * 
 * @param   {string} filter filter query
 * @returns {object}        SET_QLIST_FILTER action
 */
export function setQuestionnaireListFilter(filter) {
  return {
    type: SET_QLIST_FILTER,
    payload: filter
  }
}

/**
 * Filter components
 * 
 * @param   {string} id     questionnaire id
 * @param   {string} filter filter to apply to questionnaire components
 * @returns {object}        SET_QUESTIONNAIRE_FILTER atcion
 */
export function setQuestionnaireFilter(id, filter) {
  return {
    type: SET_QUESTIONNAIRE_FILTER,
    payload: {
      id,
      filter
    }
  }
}

/**
 * Toggle active component component
 * 
 * @param   {string} id     component id
 * @returns {object}        TOGGLE_ACTIVE_COMPONENT action
 */
export const toggleActiveComponent = id => ({
  type: TOGGLE_ACTIVE_COMPONENT,
  payload: id
})