// @TODO: Refactor to avoid similar validation functions
import { SubmissionError } from 'redux-form';
import {
  questionnaireRules,
  questionRules,
  sequenceRules,
  loopRules,
  filterRules,
  controlRules,
  declarationRules,
  redirectionRules,
  externalVariableRules,
  calculatedVariableRules,
  collectedVariableRules,
  tableListMeasuresRules,
} from './validation-rules';
import { Component } from '../../model';
import { validate, getErrorsObject } from './validation-utils';

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

export function validateLoopForm(values, setErrors) {
  const errors = validate(values, loopRules);
  if (errors.length > 0) {
    setErrors(errors);
    throw new SubmissionError(getErrorsObject(errors));
  }
}

export function validateFilterForm(values, setErrors) {
  const errors = validate(values, filterRules);
  if (errors.length > 0) {
    setErrors(errors);
    throw new SubmissionError(getErrorsObject(errors));
  }
}

// Subforms validation

export function validateControlForm(values, addErrors) {
  const errors = validate(values, controlRules);

  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    addErrors(errors);
    return false;
  }
  return true;
}

export function validateDeclarationForm(values, addErrors) {
  const errors = validate(values, declarationRules);

  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    addErrors(errors);
    return false;
  }
  return true;
}

export function validateRedirectionForm(values, addErrors, stores) {
  const errors = validate(values, redirectionRules, stores);

  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    addErrors(errors);
    return false;
  }
  return true;
}

export function validateCalculatedVariableForm(values, addErrors, state) {
  const errors = validate(values, calculatedVariableRules, {}, state);

  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    addErrors(errors);
    return false;
  }
  return true;
}

export function validateExternalVariableForm(values, addErrors, state) {
  const errors = validate(values, externalVariableRules, {}, state);
  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    addErrors(errors);
    return false;
  }
  return true;
}

export function validateCollectedVariableForm(values, addErrors, state) {
  const errors = validate(values, collectedVariableRules, {}, state);

  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    addErrors(errors);
    return false;
  }
  return true;
}

export function validateTableListMeasuresForm(values, addErrors) {
  const normalizedValues = Component().getNormalizedValues(values);
  const errors = validate(normalizedValues, tableListMeasuresRules);
  // SubmissionError can't be used in subforms validations
  if (errors.length > 0) {
    addErrors(errors);
    return false;
  }
  return true;
}
