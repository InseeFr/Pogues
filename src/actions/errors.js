export const SET_ERRORS = 'SET_ERRORS';

export const setErrors = errors => {
  return {
    type: SET_ERRORS,
    payload: { errors },
  };
};
