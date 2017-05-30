export const LOAD_QLIST = 'LOAD_QLIST';
export const LOAD_QLIST_SUCCESS = 'LOAD_QLIST_SUCCESS';
export const LOAD_QLIST_FAILURE = 'LOAD_QLIST_FAILURE';
import { getQuestionnaireList } from 'utils/remote-api';
import { removeUnderscore } from 'utils/model/model-to-state-utils';

/**
 * Value the questionnaire list returned by the remote call
 *
 * @param   {string} qrList   questionnaire list returned by the remote API
 * @returns {object}          LOAD_QLIST_SUCCESS action
 */
export const loadQuestionnaireListSuccess = qrList => ({
  type: LOAD_QLIST_SUCCESS,
  payload: qrList,
});

/**
 * Track error when loading questionnaire list failed
 *
 * @param   {string} err   error message
 * @returns {object}       LOAD_QLIST_FAILURE action
 */
export const loadQuestionnaireListFailure = err => ({
  type: LOAD_QLIST_FAILURE,
  payload: err,
});

/**
 * Load questionnaire list
 *
 * Asyncrhonous, relies on Redux Thunk to be processed.
 *
 * The raw questionnaire list returned by the remote call will be processed to
 * comply to the reducer requirements.
 *
 * @returns {function}        thunk which dispatches LOAD_QLIST_SUCCESS and
 *                            LOAD_QLIST_FAILURE actions
 */
export const loadQuestionnaireList = () => dispatch => {
  dispatch({
    type: LOAD_QLIST,
    payload: null,
  });
  return getQuestionnaireList()
    .then(removeUnderscore) // @TODO: removeUnderscore should be removed after model changes.
    .then(qrList => dispatch(loadQuestionnaireListSuccess(qrList)))
    .catch(err => dispatch(loadQuestionnaireListFailure(err)));
};
