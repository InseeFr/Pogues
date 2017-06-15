export const SET_ACTIVE_QUESTIONNAIRE = 'SET_ACTIVE_QUESTIONNAIRE';
export const SET_ACTIVE_COMPONENTS = 'SET_ACTIVE_COMPONENTS';
export const SET_SELECTED_COMPONENT = 'SET_SELECTED_COMPONENT';

/**
 * Set the active questionnaire
 *
 * @param  {string} questionnaire questionnaire id
 * @return {object}    SET_ACTIVE_COMPONENT action
 */
export const setActiveQuestionnaire = questionnaire => ({
  type: SET_ACTIVE_QUESTIONNAIRE,
  payload: questionnaire,
});

/**
 * Set the active components
 *
 * @param  {object} activeComponents The active components
 * @return {object}    SET_ACTIVE_COMPONENT action
 */
export const setActiveComponents = activeComponents => ({
  type: SET_ACTIVE_COMPONENTS,
  payload: activeComponents,
});

/**
 * Set the selected component in the questionnaire
 *
 * @param  {string} id component id
 * @return {object}    SET_ACTIVE_COMPONENT action
 */
export const setSelectedComponent = id => ({
  type: SET_SELECTED_COMPONENT,
  payload: id,
});
