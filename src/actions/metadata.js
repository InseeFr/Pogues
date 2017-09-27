import { getUnitsList } from 'utils/remote-api';

export const LOAD_METADATA = 'LOAD_METADATA';
export const LOAD_METADATA_SUCCESS = 'LOAD_METADATA_SUCCESS';
export const LOAD_METADATA_FAILURE = 'LOAD_METADATA_FAILURE';

/**
 * Load units success
 *
 * It's executed after the remote fetch of the units list
 *
 * It will update the stores:
 * - metadataByType
 *
 * @param   {array}   unitsList The list of units
 * @returns {object}  LOAD_METADATA_SUCCESS action.
 */
export const loadUnitsSuccess = unitsList => ({
  type: LOAD_METADATA_SUCCESS,
  payload: {
    type: 'units',
    metadata: unitsList,
  },
});

/**
 * Load units failure
 *
 * It's executed after the fail of a remote units fetch.
 *
 * @param   {string} err   The error returned for the fetch process.
 * @return  {object}       LOAD_METADATA_FAILURE action
 */
export const loadUnitsFailure = err => ({
  type: LOAD_METADATA_FAILURE,
  payload: err,
});

/**
 * Load units
 *
 * Asyc action that fetch the units list
 *
 * @return  {function}  Thunk which may dispatch LOAD_METADATA_SUCCESS or LOAD_METADATA_FAILURE
 */
export const loadUnits = () => dispatch => {
  dispatch({
    type: LOAD_METADATA,
    payload: null,
  });
  return getUnitsList()
    .then(unitsList => {
      return dispatch(loadUnitsSuccess(unitsList.map(unit => ({ id: unit.uri, label: unit.label }))));
    })
    .catch(err => dispatch(loadUnitsFailure(err)));
};
