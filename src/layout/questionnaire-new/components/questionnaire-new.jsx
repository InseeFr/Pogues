import React from 'react';
import PropTypes from 'prop-types';
import { TCM } from 'constants/pogues-constants';
import {
  QuestionnaireNewEdit,
  Questionnaire,
} from 'widgets/questionnaire-new-edit';
import { validateQuestionnaireForm } from 'utils/validation/validate';

// Utils

function validateAndSubmit(action, validate, transformer, onSuccess, token) {
  return function (values) {
    validate(values);

    return action(transformer.formToState(values), token).then(result => {
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
  stamp,
  token,
  createQuestionnaire,
  setErrors,
  isTcm,
}) {
  const validate = setErrorsAction => values =>
    validateQuestionnaireForm(values, setErrorsAction);

  // Initial values

  const initialState = isTcm
    ? { owner: stamp, serie: TCM.id, operation: TCM.id, campaigns: [TCM.id] }
    : { owner: stamp };
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
        token,
      )}
    />
  );
}

QuestionnaireNew.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  stamp: PropTypes.string.isRequired,
  createQuestionnaire: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  isTcm: PropTypes.bool,
};

QuestionnaireNew.defaultProps = {
  isTcm: false,
};

export default QuestionnaireNew;
