export const DRAGGED_COMPONENT = 'DRAGGED_COMPONENT';

export const setPlaceholder = payload => dispatch => {
  return dispatch({
    type: DRAGGED_COMPONENT,
    payload,
  });
};
