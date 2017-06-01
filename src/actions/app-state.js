export const SET_DEFAULT_STATE_QUESTIONNAIRE = 'SET_DEFAULT_STATE_QUESTIONNAIRE';
export const SET_ACTIVE_COMPONENT = 'SET_ACTIVE_COMPONENT';

/**
 * Set a the default state of a questionnaire
 *
 * @param  {string} id questionnaire id
 * @return {object}    SET_DEFAULT_STATE_QUESTIONNAIRE action
 */
export const setDefaultStateQuestionnaire = id => ({
  type: SET_DEFAULT_STATE_QUESTIONNAIRE,
  payload: id,
});

/**
 * Set the current active component
 *
 * @param  {string} id component id
 * @return {object}    SET_ACTIVE_COMPONENT action
 */
export const setActiveComponent = id => ({
  type: SET_ACTIVE_COMPONENT,
  payload: id,
});
