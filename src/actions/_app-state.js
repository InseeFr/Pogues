export const SET_DEFAULT_STATE_QUESTIONNAIRE = 'SET_DEFAULT_STATE_QUESTIONNAIRE';
export const SET_ACTIVE_COMPONENT = 'SET_ACTIVE_COMPONENT';
export const SET_LAST_COMPONENT_EDITED = 'SET_LAST_COMPONENT_EDITED';

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

/**
 * Set the last component edited or created
 *
 * @param  {string} questionnaireId questionnaire id
 * @param  {string} componentId component id
 * @return {object}    SET_LAST_COMPONENT_EDITED action
 */
export const setLastComponentEdited = (questionnaireId, componentId) => ({
  type: SET_LAST_COMPONENT_EDITED,
  payload: { questionnaireId, componentId },
});
