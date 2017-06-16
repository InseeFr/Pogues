import { serializeUpdateQuestionnaire } from 'utils/model/state-to-model-utils';
import { putQuestionnaire } from 'utils/remote-api';
import { normalizeQuestionnaire } from 'utils/model/model-to-state-utils';

export const SET_ACTIVE_QUESTIONNAIRE = 'SET_ACTIVE_QUESTIONNAIRE';
export const SET_ACTIVE_COMPONENTS = 'SET_ACTIVE_COMPONENTS';
export const SET_SELECTED_COMPONENT = 'SET_SELECTED_COMPONENT';
export const SAVE_ACTIVE_QUESTIONNAIRE = 'SAVE_ACTIVE_QUESTIONNAIRE';
export const SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS = 'SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS';
export const SAVE_ACTIVE_QUESTIONNAIRE_FAILURE = 'SAVE_ACTIVE_QUESTIONNAIRE_FAILURE';
export const UPDATE_ACTIVE_QUESTIONNAIRE = 'UPDATE_ACTIVE_QUESTIONNAIRE';

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

export const saveActiveQuestionnaireSuccess = (id, update) => ({
  type: SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS,
  payload: {
    id,
    update,
  },
});

export const saveActiveQuestionnaireFailure = (err, validation) => ({
  type: SAVE_ACTIVE_QUESTIONNAIRE_FAILURE,
  payload: { err, validation },
});

export const saveActiveQuestionnaire = () => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: SAVE_ACTIVE_QUESTIONNAIRE,
    payload: null,
  });
  const serializedQuestionnaire = serializeUpdateQuestionnaire(
    state.appState.activeQuestionnaire,
    state.appState.activeComponentsById,
  );

  return putQuestionnaire(serializedQuestionnaire.id, serializedQuestionnaire)
    .then(() => {
      return dispatch(
        saveActiveQuestionnaireSuccess(serializedQuestionnaire.id, normalizeQuestionnaire(serializedQuestionnaire))
      );
    })
    .catch(err => {
      return dispatch(saveActiveQuestionnaireFailure(err, err.errors));
    });
};

export const updateActiveQuestionnaire = (id, name, label) => ({
  type: UPDATE_ACTIVE_QUESTIONNAIRE,
  payload: {
    id,
    name,
    label,
  },
});
