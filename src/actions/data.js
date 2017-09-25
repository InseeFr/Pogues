import { getUnitsList } from 'utils/remote-api';

export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';

/**
 * Load units success
 *
 * It's executed after the remote fetch of the units list
 *
 * It will update the stores:
 * - dataByType
 *
 * @param   {array}   unitsList The list of units
 * @returns {object}  LOAD_DATA_SUCCESS action.
 */
export const loadUnitsSuccess = unitsList => ({
  type: LOAD_DATA_SUCCESS,
  payload: {
    type: 'units',
    data: unitsList,
  },
});

/**
 * Load units failure
 *
 * It's executed after the fail of a remote units fetch.
 *
 * @param   {string} err   The error returned for the fetch process.
 * @return  {object}       LOAD_DATA_FAILURE action
 */
export const loadUnitsFailure = err => ({
  type: LOAD_DATA_FAILURE,
  payload: err,
});

/**
 * Load units
 *
 * Asyc action that fetch the units list
 *
 * @return  {function}  Thunk which may dispatch LOAD_DATA_SUCCESS or LOAD_DATA_FAILURE
 */
export const loadUnits = () => dispatch => {
  dispatch({
    type: LOAD_DATA,
    payload: null,
  });
  return getUnitsList()
    .then(unitsList => {
      return dispatch(loadUnitsSuccess(unitsList));
    })
    .catch(err => dispatch(loadUnitsFailure(err)));
};
