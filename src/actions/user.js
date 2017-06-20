import { getUserAttributes } from 'utils/remote-api';

export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

/**
 * Load user success
 *
 * It's executed after the remote fetch of a user data.
 *
 * It will update the stores:
 * - appState.user
 *
 * @param   {object} user The user data.
 * @returns {object}      LOAD_USER_SUCCESS action.
 */
export const loadUserSuccess = user => ({
  type: LOAD_USER_SUCCESS,
  payload: user,
});

/**
 * Load user failure
 *
 * It's executed after the fail of a remote user's fetch.
 *
 * @param   {string} err   The error returned for the fetch process.
 * @return  {object}       LOAD_USER_FAILURE action
 */
export const loadUserFailure = err => ({
  type: LOAD_USER_FAILURE,
  payload: err,
});

/**
 * Load user
 *
 * Asyc action that fetch an user data.
 *
 * @return  {function}  Thunk which may dispatch LOAD_USER_SUCCESS or LOAD_USER_FAILURE
 */
export const loadUser = () => dispatch => {
  dispatch({
    type: LOAD_USER,
    payload: null,
  });
  return getUserAttributes()
    .then(({ user }) => {
      return dispatch(loadUserSuccess(user));
    })
    .catch(err => dispatch(loadUserFailure(err)));
};
