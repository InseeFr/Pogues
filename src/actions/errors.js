export const ADD_VALIDATION_ERRORS = 'ADD_VALIDATION_ERRORS';
export const SET_VALIDATION_ERRORS = 'SET_VALIDATION_ERRORS';
export const REMOVE_VALIDATION_ERRORS = 'REMOVE_VALIDATION_ERRORS';
export const CLEAR_VALIDATION_ERRORS = 'CLEAR_VALIDATION_ERRORS';
export const ADD_SUBFORM_VALIDATION_ERRORS = 'ADD_SUBFORM_VALIDATION_ERRORS';
export const SET_SUBFORM_VALIDATION_ERRORS = 'SET_SUBFORM_VALIDATION_ERRORS';
export const REMOVE_SUBFORM_VALIDATION_ERRORS =
  'REMOVE_SUBFORM_VALIDATION_ERRORS';
export const CLEAR_SUBFORM_VALIDATION_ERRORS = 'CLEAR_VALIDATION_ERRORS';
export const REMOVE_INTEGRITY_ERROR = 'REMOVE_INTEGRITY_ERROR';
export const SET_ERRORS_BY_COMPONENT = 'SET_ERRORS_BY_COMPONENT';
export const addValidationErrors = errors => {
  return {
    type: ADD_VALIDATION_ERRORS,
    payload: { errors },
  };
};

export const setValidationErrors = errors => {
  return {
    type: SET_VALIDATION_ERRORS,
    payload: { errors },
  };
};

export const removeValidationErrors = paths => {
  return {
    type: REMOVE_VALIDATION_ERRORS,
    payload: paths,
  };
};

export const clearValidationErrors = () => {
  return {
    type: CLEAR_VALIDATION_ERRORS,
    payload: null,
  };
};

export const addSubformValidationErrors = errors => {
  return {
    type: ADD_SUBFORM_VALIDATION_ERRORS,
    payload: { errors },
  };
};

export const setSubformValidationErrors = errors => {
  return {
    type: SET_SUBFORM_VALIDATION_ERRORS,
    payload: { errors },
  };
};

export const removeSubformValidationErrors = paths => {
  return {
    type: REMOVE_SUBFORM_VALIDATION_ERRORS,
    payload: paths,
  };
};

export const clearSubformValidationErrors = () => {
  return {
    type: CLEAR_SUBFORM_VALIDATION_ERRORS,
    payload: null,
  };
};

export const removeIntegrityError = (componentId, typeError, itemListId) => {
  return {
    type: REMOVE_INTEGRITY_ERROR,
    payload: {
      componentId,
      typeError,
      itemListId,
    },
  };
};
