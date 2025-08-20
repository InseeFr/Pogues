/*
Trigger the validations rules to survey's components (sequences, questions, etc.)
when one create or update a component in the questionnaire.
*/
import get from 'lodash.get';
import { SubmissionError } from 'redux-form';

import {
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '../../constants/pogues-constants';
import { Component } from '../../model';
import {
  calculatedVariableRules,
  collectedVariableRules,
  controlRules,
  declarationRules,
  durationRulesPTnHnM,
  durationRulesPnYnM,
  externalVariableRules,
  filterRules,
  loopRules,
  questionRules,
  questionnaireRules,
  redirectionRules,
  roundaboutRules,
  sequenceRules,
  tableListMeasuresRules,
} from './rules';
import { getErrorsObject, validate } from './validate-utils';

export function validateQuestionnaireForm(values, setErrors) {
  const errors = validate(values, questionnaireRules);

  if (errors.length > 0) {
    setErrors(errors);
    throw new SubmissionError(getErrorsObject(errors));
  }
}

const { SIMPLE } = QUESTION_TYPE_ENUM;
const { DURATION } = DATATYPE_NAME;
const { RESPONSE_FORMAT } = TABS_PATHS;

export function validateQuestionForm(values, setErrors, codesListsStore) {
  let errors;

  const durationFormat = get(
    values,
    `${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.format`,
  );
  if (durationFormat === 'PTnHnM') {
    errors = validate(
      values,
      { ...questionRules, ...durationRulesPTnHnM },
      { codesListsStore },
    );
  } else if (durationFormat === 'PnYnM') {
    errors = validate(
      values,
      { ...questionRules, ...durationRulesPnYnM },
      { codesListsStore },
    );
  } else {
    errors = validate(values, questionRules, { codesListsStore });
  }
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

export function validateRoundaboutForm(values, setErrors) {
  const errors = validate(values, roundaboutRules);
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
