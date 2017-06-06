import { getCodeListSpecs } from 'utils/remote-api';
import codeListSpecsToState from 'utils/model/model-to-state-code-list-specs';

export const LOAD_CLIST_SPECS = 'LOAD_CLIST_SPECS';
export const LOAD_CLIST_SPECS_SUCCESS = 'LOAD_CLIST_SPECS_SUCCESS';
export const LOAD_CLIST_SPECS_FAILURE = 'LOAD_CLIST_SPECS_FAILURE';

/**
 * Value code list specifications returned by the remote call
 *
 * @param   {string} specs code list specifications
 * @returns {object}       LOAD_CLIST_SPECS_SUCCESS action
 */
export const loadCodeListSpecsSuccess = specs => ({
  type: LOAD_CLIST_SPECS_SUCCESS,
  payload: specs,
});

/**
 * Track error when loading code list specifications failed
 *
 * @param   {string} err   error message
 * @returns {object}       LOAD_CLIST_FAILURE action
 */
export const loadCodeListSpecsFailure = err => ({
  type: LOAD_CLIST_SPECS_FAILURE,
  payload: {
    err,
  },
});

/**
 * Load code list specifications
 *
 * Asyncrhonous, relies on Redux Thunk to be processed.
 *
 * The raw specifications returned by the remote call will be processed
 * to comply to the state requirements.
 *
 * @returns {function}        thunk which dispatches LOAD_CLIST_SUCCESS and
 *                            LOAD_CLIST_FAILURE actions
 */
export const loadCodeListSpecs = () => dispatch => {
  dispatch({
    type: LOAD_CLIST_SPECS,
  });
  return getCodeListSpecs()
    .then(rawCListSpecs => codeListSpecsToState(rawCListSpecs))
    .then(specs => {
      dispatch(loadCodeListSpecsSuccess(specs));
      return specs;
    })
    .catch(err => dispatch(loadCodeListSpecsFailure(err)));
};
