import { validate, getErrorsObject } from './validation-utils';
import { questionnaireRules, questionRules, sequenceRules } from './validation-rules';
import { SubmissionError } from 'redux-form';

export function validateQuestionnaireForm(values, setErrors) {
  const errors = validate(values, questionnaireRules);

  if (errors.length > 0) {
    setErrors(errors);
    throw new SubmissionError(getErrorsObject(errors));
  }
}

export function validateQuestionForm(values, setErrors, codesListsStore) {
  const errors = validate(values, questionRules, { codesListsStore });

  if (errors.length > 0) {
    setErrors(errors);
    throw new SubmissionError(getErrorsObject(errors));
  }
}

export function validateSequenceForm(values, setErrors) {
  const errors = validate(values, sequenceRules);

  if (errors.length > 0) {
    setErrors(errors);
    throw new SubmissionError(getErrorsObject(errors));
  }
}
