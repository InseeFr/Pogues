import { useContext } from 'react';

import PropTypes from 'prop-types';

import { AuthContext } from '@/auth/context';

import { validateQuestionnaireForm } from '../../utils/validation/validate';
import {
  Questionnaire,
  QuestionnaireNewEdit,
} from '../../widgets/questionnaire-new-edit';

// Utils

function validateAndSubmit(
  action,
  validate,
  transformer,
  onSuccess,
  getAccessToken,
) {
  return function (values) {
    validate(values);

    return getAccessToken().then((token) =>
      action(transformer.formToState(values), token).then((result) => {
        const {
          payload: { id },
        } = result;
        if (onSuccess) onSuccess(id);
      }),
    );
  };
}

// Component

function QuestionnaireNew({
  onCancel,
  onSuccess,
  createQuestionnaire,
  setErrors,
}) {
  const { getAccessToken, decodedIdToken } = useContext(AuthContext);

  const stamp = decodedIdToken.timbre;

  const validate = (setErrorsAction) => (values) =>
    validateQuestionnaireForm(values, setErrorsAction);

  // Initial values

  const initialState = { owner: stamp };
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
        getAccessToken,
      )}
      stamp={stamp}
    />
  );
}

QuestionnaireNew.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  createQuestionnaire: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default QuestionnaireNew;
