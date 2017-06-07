import { getCodeList } from 'utils/remote-api';
import codeListToState from 'utils/model/model-to-state-code-list';
import { uuid } from 'utils/data-utils';

export const CREATE_CODE_LIST = 'CREATE_CODE_LIST';
export const REMOVE_CODE_LIST = 'REMOVE_CODE_LIST';
export const EDIT_CODE_LIST = 'EDIT_CODE_LIST';
export const LOAD_CODE_LIST = 'LOAD_CODE_LIST';
export const LOAD_CODE_LIST_SUCCESS = 'LOAD_CODE_LIST_SUCCESS';
export const LOAD_CODE_LIST_FAILURE = 'LOAD_CODE_LIST_FAILURE';

/**
 * Create code list
 *
 * @param   {string} name       name of the code list
 * @param   {string} responseId id ot the response the code list was created for
 * @param   {string} qrId       id of the questionnaire the code list will be
 *                              created in
 * @returns {object}            CREATE_CODE_LIST action
 */
export const createCodeList = (name, responseId, qrId) => ({
  type: CREATE_CODE_LIST,
  payload: {
    id: uuid(),
    responseId,
    qrId,
    name: name,
  },
});

/**
 * Edit code list
 *
 * `update` is an object holding all the properties to update.
 *
 * @param   {string} id         code list id
 * @param   {object} update     properties which need to be updated
 * @returns {object}            EDIT_CODE_LIST action
 */
export const editCodeList = (id, update) => ({
  type: EDIT_CODE_LIST,
  payload: {
    id,
    update,
  },
});

/**
 * Remove code list action creator
 *
 * @param   {string} id       code list id
 * @returns {object}          REMOVE_CODE_LIST_ACTION
 */
export const removeCodeList = id => ({
  type: REMOVE_CODE_LIST,
  payload: {
    id,
  },
});

/**
 * Load code list success
 *
 * @param   {string} id       code list id
 * @param   {array}  codes    codes returned by the remote API and processed
 *                            to comply with the state shape
 * @returns {object}          LOAD_CODE_LIST_SUCCESS action
 */
export const loadCodeListSuccess = (id, codes) => ({
  type: LOAD_CODE_LIST_SUCCESS,
  payload: { id, codes },
});

/**
 * Load code list failure
 *
 * @param   {string} id    code list id
 * @param   {string} err   error message
 * @returns {object}       LOAD_CODE_LIST_FAILURE action
 */
export const loadCodeListFailure = (id, err) => ({
  type: LOAD_CODE_LIST_FAILURE,
  payload: { id, err },
});

/**
 * Load code list
 *
 * Asyncrhonous, relies on Redux Thunk to be processed
 *
 * @param   {string} id       code list id
 * @returns {function}        thunk which dispatches LOAD_CODE_LIST_SUCCESS
 *                            or LOAD_CODE_LIST_FAILURE actions
 */
export const loadCodeList = (id, retrievalQuery) => dispatch => {
  dispatch({
    type: LOAD_CODE_LIST,
    payload: id,
  });
  return getCodeList(retrievalQuery)
    .then(cl => {
      dispatch(loadCodeListSuccess(id, codeListToState(cl)));
    })
    .catch(err => {
      dispatch(loadCodeListFailure(id, err.toString()));
    });
};

/**
 * Load code list if needed
 *
 * Relies on Redux Thunk to be processed
 *
 * @param   {string} id       code list id
 * @returns {function}        thunk which dispatches LOAD_CODE_LIST
 */
export const loadCodeListIfNeeded = id => (dispatch, getState) => {
  const state = getState();
  const cl = state.codeListById[id];
  if (cl.isSpec && !cl.loaded) dispatch(loadCodeList(id, cl.retrievalQuery));
};
