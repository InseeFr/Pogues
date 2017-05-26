import { getQuestionnaire } from 'utils/remote-api';
import { normalizeQuestionnaire, removeUnderscore } from 'utils/model/questionnaire-model-utils';

export const LOAD_QUESTIONNAIRE = 'LOAD_QUESTIONNAIRE';
export const LOAD_QUESTIONNAIRE_SUCCESS = 'LOAD_QUESTIONNAIRE_SUCCESS';
export const LOAD_QUESTIONNAIRE_FAILURE = 'LOAD_QUESTIONNAIRE_FAILURE';

/**
 * Value the questionnaire returned to update the state
 *
 * `update` is a complex object. Entries correspond to reducers, they contain
 * an update to apply to the piece of state handled by the reducer to
 * represent locally the questionnaire.
 *
 * @param   {string} id     questionnaire id
 * @param   {object} update update to apply to the state in order to store the
 *                          questionnaire
 * @returns {object}        LOAD_QUESTIONNAIRE_SUCCESS action
 */
export const loadQuestionnaireSuccess = (id, update) => ({
  type: LOAD_QUESTIONNAIRE_SUCCESS,
  payload: { id, update },
});

/**
 * Track error when loading questionnaire failed
 *
 * @param   {string} id    questionnaire id
 * @param   {string} err   error message
 * @returns {object}       LOAD_QUESTIONNAIRE_FAILURE action
 */
export const loadQuestionnaireFailure = (id, err) => ({
  type: LOAD_QUESTIONNAIRE_FAILURE,
  payload: { id, err },
});

/**
 * Load the questionnaire
 *
 * Asynchronous, relies on Redux Thunk.
 *
 * The questionnaire returned by the server will be processed to comply with
 * the reducers requirements.
 *
 * @param   {string} id questionnaire id
 * @returns {function}  thunk which may dispatch LOAD_QUESTIONNAIRE_SUCCESS or
 *                      LOAD_QUESTIONNAIRE_FAILURE
 */
export const loadQuestionnaire = id => dispatch => {
  dispatch({
    type: LOAD_QUESTIONNAIRE,
    payload: id,
  });
  return getQuestionnaire(id)
    .then(qr => {
      // dispatch(loadQuestionnaireSuccess(id, normalizeQuestionnaire(qr)));
      dispatch(loadQuestionnaireSuccess(id, normalizeQuestionnaire(removeUnderscore(qr))));
    })
    .catch(err => {
      debugger;
      dispatch(loadQuestionnaireFailure(id, err));
    });
};

/**
 * Load the questionnaire if not present in the state
 *
 * Relies on Redux Thunk
 *
 * @param {id} id questionnaire id
 * @returns {function} thunk which may dispatch LOAD_QUESTIONNAIRE
 */
export const loadQuestionnaireIfNeeded = id => (dispatch, getState) => {
  const state = getState();
  const qr = state.questionnaireById[id];
  if (!qr) dispatch(loadQuestionnaire(id));
};
