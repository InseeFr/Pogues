// @TODO: Refactor to avoid similar validation functions

import { validate, getErrorsObject } from './validation-utils';
import {
  questionnaireRules,
  questionRules,
  sequenceRules,
  controlRules,
  declarationRules,
  redirectionRules,
  externalVariableRules,
  calculatedVariableRules,
  collectedVariableRules,
} from './validation-rules';
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

export function validateControlForm(values, setErrors) {
  const errors = validate(values, controlRules);

  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    setErrors(errors);
    return false;
  }
  return true;
}

export function validateDeclarationForm(values, setErrors) {
  const errors = validate(values, declarationRules);

  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    setErrors(errors);
    return false;
  }
  return true;
}

export function validateRedirectionForm(values, setErrors, stores) {
  const errors = validate(values, redirectionRules, stores);

  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    setErrors(errors);
    return false;
  }
  return true;
}

export function validateCalculatedVariableForm(values, setErrors) {
  const errors = validate(values, calculatedVariableRules);

  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    setErrors(errors);
    return false;
  }
  return true;
}

export function validateExternalVariableForm(values, setErrors) {
  const errors = validate(values, externalVariableRules);

  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    setErrors(errors);
    return false;
  }
  return true;
}

export function validateCollectedVariableForm(values, setErrors) {
  const errors = validate(values, collectedVariableRules);

  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    setErrors(errors);
    return false;
  }
  return true;
}
