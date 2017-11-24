import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';

// @TODO: Move to questionnaire-new-edit component
import { QuestionnaireNewEdit, Questionnaire } from 'widgets/questionnaire-new-edit';
import { getQuestionnaireValidationErrors, getErrorsObject } from 'utils/validation/validation-utils';

// PropTypes and defaultProps

export const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  createQuestionnaire: PropTypes.func.isRequired,
};

// Utils

function validateAndSubmit(action, transformer, onSuccess) {
  return function(values) {
    const validationErrors = getQuestionnaireValidationErrors(values);

    if (validationErrors.length > 0) throw new SubmissionError(getErrorsObject(validationErrors));

    return action(transformer.formToState(values)).then(result => {
      const { payload: { id } } = result;
      if (onSuccess) onSuccess(id);
    });
  };
}

// Component

function QuestionnaireNew({ onCancel, onSuccess, user, createQuestionnaire }) {
  // Initial values

  const initialState = { owner: user.permission };
  const questionnaireTransformer = Questionnaire(initialState);
  const initialValues = questionnaireTransformer.stateToForm();

  // Validation and submit

  return (
    <QuestionnaireNewEdit
      onCancel={onCancel}
      initialValue={initialValues}
      onSubmit={validateAndSubmit(createQuestionnaire, questionnaireTransformer, onSuccess)}
    />
  );
}

QuestionnaireNew.propTypes = propTypes;

export default QuestionnaireNew;
