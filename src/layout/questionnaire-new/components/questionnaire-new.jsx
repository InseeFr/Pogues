import React from 'react';
import PropTypes from 'prop-types';

import {
  QuestionnaireNewEdit,
  Questionnaire,
} from 'widgets/questionnaire-new-edit';
import { validateQuestionnaireForm } from 'utils/validation/validate';

// PropTypes and defaultProps

export const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  createQuestionnaire: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
};

// Utils

function validateAndSubmit(action, validate, transformer, onSuccess) {
  return function(values) {
    validate(values);

    return action(transformer.formToState(values)).then(result => {
      const {
        payload: { id },
      } = result;
      if (onSuccess) onSuccess(id);
    });
  };
}

// Component

function QuestionnaireNew({
  onCancel,
  onSuccess,
  user,
  createQuestionnaire,
  setErrors,
}) {
  const validate = setErrorsAction => values =>
    validateQuestionnaireForm(values, setErrorsAction);

  // Initial values

  const initialState = { owner: user.permission };
  const questionnaireTransformer = Questionnaire(initialState);
  const initialValues = questionnaireTransformer.stateToForm();

  // Validation and submit

  return (
    <QuestionnaireNewEdit
      onCancel={onCancel}
      initialValues={initialValues}
      onSubmit={validateAndSubmit(
        createQuestionnaire,
        validate(setErrors),
        questionnaireTransformer,
        onSuccess,
      )}
    />
  );
}

QuestionnaireNew.propTypes = propTypes;

export default QuestionnaireNew;
