export const SET_ERRORS_BY_COMPONENT = 'SET_ERRORS_BY_COMPONENT';
export const SET_ERRORS_BY_FORM_PATH = 'SET_ERRORS_BY_FORM_PATH';
export const SET_ERRORS_BY_FORM_PATHS = 'SET_ERRORS_BY_FORM_PATHS';
export const SET_ERRORS_BY_TAB = 'SET_ERRORS_BY_TAB';
export const CLEAR_ERRORS_BY_FORM_PATHS = 'CLEAR_ERRORS_BY_FORM_PATHS';

export const setErrorsByComponent = errors => {
  return {
    type: SET_ERRORS_BY_COMPONENT,
    payload: { errors },
  };
};

export const setErrorsByFormPath = errors => {
  return {
    type: SET_ERRORS_BY_FORM_PATH,
    payload: { errors },
  };
};

export const setErrorsByFormPaths = errors => {
  return {
    type: SET_ERRORS_BY_FORM_PATHS,
    payload: { errors },
  };
};

export const setErrorsByTab = integrityErrors => {
  return {
    type: SET_ERRORS_BY_TAB,
    payload: { integrityErrors },
  };
};

export const clearErrorsByFormPaths = paths => {
  return {
    type: CLEAR_ERRORS_BY_FORM_PATHS,
    payload: paths,
  };
};
