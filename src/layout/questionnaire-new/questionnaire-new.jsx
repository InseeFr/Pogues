import PropTypes from 'prop-types';

import { useOidc } from '../../utils/oidc';
import { validateQuestionnaireForm } from '../../utils/validation/validate';
import {
  Questionnaire,
  QuestionnaireNewEdit,
} from '../../widgets/questionnaire-new-edit';

// Utils

function validateAndSubmit(action, validate, transformer, onSuccess, token) {
  return function (values) {
    validate(values);

    return action(transformer.formToState(values), token).then((result) => {
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
  createQuestionnaire,
  setErrors,
}) {
  const oidc = useOidc();
  const token = oidc.oidcTokens.accessToken;

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
};

export default QuestionnaireNew;
