import cloneDeep from 'lodash.clonedeep';

import { DATATYPE_NAME } from '../constants/pogues-constants';
import Dictionary from '../utils/dictionary/dictionary';
import { getComponentsTargetsByComponent } from '../utils/model/redirections-utils';

const { NUMERIC } = DATATYPE_NAME;

/**
 * Validates that a form field has a meaningful, non-empty value.
 *
 * It returns an error message if the value is:
 *  - `null` or `undefined`
 *  - An empty string, or a string that contains only special characters or whitespace
 *
 * It accepts `0`, `false`, and other falsy but valid inputs.
 */
export function required(value = '') {
  if (value === null || value === undefined) {
    return Dictionary.validationRequired;
  }

  if (typeof value === 'string') {
    // we clean the string to ensure this is not a fake non empty string (for example ' ')
    const cleanedValue = value.trim().replace(/[^\w\s]/gi, '');
    return cleanedValue === '' ? Dictionary.validationRequired : undefined;
  }

  return undefined;
}

export function maxLength(max) {
  return function (value) {
    return value && value.length > max
      ? `Must be ${max} characters or less`
      : undefined;
  };
}

export function number(value) {
  return value && isNaN(Number(value))
    ? Dictionary.validationNumber
    : undefined;
}

export function minValue(min) {
  return function (value) {
    if (value === undefined || value === '')
      return `${Dictionary.validationMinNumber} ${min}`;
    return parseInt(value, 10) < min
      ? `${Dictionary.validationMinNumber} ${min}`
      : undefined;
  };
}

export function maxValue(max) {
  return function (value) {
    if (value === undefined || value === '')
      return `${Dictionary.validationMaxNumber} ${max}`;
    return parseInt(value, 10) > max
      ? `${Dictionary.validationMaxNumber} ${max}`
      : undefined;
  };
}

export function requiredSelect(value = '') {
  return value !== '' ? undefined : Dictionary.validationRequired;
}

export function name(value = '') {
  return value !== '' && !/^[A-Z0-9\-_]+$/i.test(value)
    ? Dictionary.validationInvalidName
    : undefined;
}

export function nameLoop(value = '') {
  return name(value);
}

export function minimumRequired(value, { form: { maximum } }) {
  return maximum && !value;
}

export function maximumRequired(value, { form: { minimum } }) {
  return minimum && !value;
}

export function nameSize(value) {
  return value && value.length > 32
    ? Dictionary.validationInvalidNameSize
    : undefined;
}

export function emptyMeasures(measures) {
  return measures.length === 0 ? Dictionary.noMeasureYet : undefined;
}

export function validateEarlyTarget(
  value,
  { stores: { componentsStore, editingComponentId } },
) {
  let result;

  if (editingComponentId !== '') {
    result =
      value !== '' &&
      componentsStore[value] &&
      getComponentsTargetsByComponent(
        componentsStore,
        componentsStore[editingComponentId],
      ).indexOf(value) === -1
        ? Dictionary.errorGoToEarlierTgt
        : undefined;
  }

  return result;
}

export function validateExistingTarget(value, { stores: { componentsStore } }) {
  return value !== '' && !componentsStore[value]
    ? Dictionary.errorGoToNonExistingTgt
    : undefined;
}

export function validateDuplicates(value, { form }) {
  return value !== '' && form.filter((i) => i.name === value).length > 0
    ? 'Duplicated'
    : undefined;
}

export function validateDuplicatesCalculated(
  value,
  { form: { calculatedVariables: values }, state: { selectedItemIndex } },
) {
  const listItems = cloneDeep(values.calculatedVariables);

  // We need to remove the element from the list
  if (selectedItemIndex !== undefined) {
    listItems.splice(selectedItemIndex, 1);
  }

  return validateDuplicates(value, { form: listItems });
}

export function typeExternal({ form: { externalVariables: values } }) {
  return values.type === NUMERIC;
}
export function typeCalculated({ form: { calculatedVariables: values } }) {
  return values.type === NUMERIC;
}
export function validateDuplicatesExternal(
  value,
  { form: { externalVariables: values }, state: { selectedItemIndex } },
) {
  const listItems = cloneDeep(values.externalVariables);

  // We need to remove the element from the list
  if (selectedItemIndex !== undefined) {
    listItems.splice(selectedItemIndex, 1);
  }

  return validateDuplicates(value, { form: listItems });
}

export function validateDuplicatesCollected(
  value,
  { form: { collectedVariables: values }, state: { selectedItemIndex } },
) {
  const listItems = cloneDeep(values.collectedVariables);

  // We need to remove the element from the list
  if (selectedItemIndex !== undefined) {
    listItems.splice(selectedItemIndex, 1);
  }

  return validateDuplicates(value, { form: listItems });
}

// We need to check is element start with a number
export function letterStart(value) {
  return value && !isNaN(Number(value.charAt(0)))
    ? Dictionary.IsNotLetter
    : undefined;
}

export function cartCodeModeCollecte(
  value,
  { form: { declarations: values } },
) {
  return (
    value === 'CODECARD' &&
    (values.TargetMode.split(',').includes('CAWI') ||
      values.TargetMode.split(',').includes('PAPI') ||
      values.TargetMode.length === 0)
  );
}
