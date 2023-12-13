import { getQuestionnaireList } from '../utils/remote-api';
import { questionnaireListRemoteToStores } from '../model/remote-to-stores';

export const LOAD_QLIST = 'LOAD_QLIST';
export const LOAD_QLIST_SUCCESS = 'LOAD_QLIST_SUCCESS';
export const LOAD_QLIST_FAILURE = 'LOAD_QLIST_FAILURE';

export const DELETE_QLIST_SUCCESS = 'DELETE_QLIST_SUCCESS';

/**
 * Load questionnaire list success
 *
 * It's executed after the remote fetch of a list of questionnaires.
 *
 * The parameter "updateList" is an array of complex object. For each object, entries correspond to reducers,
 * they contain an update to apply to the piece of state handled by the reducer to represent locally the questionnaire.
 *
 * It will update the stores:
 * - questionnaireById
 * - componentById
 * - componentByQuestionnaire
 * - conditionById
 *
 * @param   {array} updatesList The new values to update in the different stores affected.
 * @return  {object}            LOAD_QLIST_SUCCESS action.
 */
export const loadQuestionnaireListSuccess = updatesList => ({
  type: LOAD_QLIST_SUCCESS,
  payload: updatesList,
});

/**
 * Load questionnaire list failure
 *
 * It's executed after the fail of a remote questionnaires list fetch.
 *
 * @param   {string} err   The error returned for the fetch process.
 * @return  {object}       LOAD_QLIST_FAILURE action
 */
export const loadQuestionnaireListFailure = err => ({
  type: LOAD_QLIST_FAILURE,
  payload: err,
});

/**
 * Load questionnaire list
 *
 * Asyc action that fetch a questionnaires list.
 *
 * @return  {function}  Thunk which may dispatch LOAD_QLIST_SUCCESS or LOAD_QLIST_FAILURE
 */
export const loadQuestionnaireList = (stamp, token) => async dispatch => {
  dispatch({
    type: LOAD_QLIST,
    payload: null,
  });
  try {
    const qrList = await getQuestionnaireList(stamp, token);
    return dispatch(
      loadQuestionnaireListSuccess(questionnaireListRemoteToStores(qrList)),
    );
  } catch (err) {
    return dispatch(loadQuestionnaireListFailure(err));
  }
};

export const deleteQuestionnaireList = () => dispatch => {
  dispatch({
    type: DELETE_QLIST_SUCCESS,
  });
};
