import cloneDeep from 'lodash.clonedeep';

import {
  CODES_LIST_INPUT_ENUM,
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM,
} from '../constants/pogues-constants';
import Dictionary from '../utils/dictionary/dictionary';
import { getComponentsTargetsByComponent } from '../utils/model/redirections-utils';
import { generateCollectedVariables } from '../utils/variables/collected-variables-utils';

const { NEW } = CODES_LIST_INPUT_ENUM;
const { NUMERIC } = DATATYPE_NAME;

const { SINGLE_CHOICE, SIMPLE, TABLE, MULTIPLE_CHOICE, PAIRING } =
  QUESTION_TYPE_ENUM;

export function required(value = '') {
  const val = value.trim ? value.trim().replace(/[^\w\s]/gi, '') : value;

  if (typeof val === 'string' || val instanceof String) {
    return val.length > 0 ? undefined : Dictionary.validationRequired;
  }
  return val ? undefined : Dictionary.validationRequired;
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

export function emptyCodes(codes = [], urn = '') {
  return codes.length === 0 && urn === '' ? 'No codes' : undefined;
}

export function emptyMeasures(measures) {
  return measures.length === 0 ? Dictionary.noMeasureYet : undefined;
}

export function validCodesList(codesList) {
  const { id, label, codes, panel, urn } = codesList;
  const errors = [];
  let errorRequired;
  let errorNoCodes;

  if (panel === NEW) {
    errorRequired = required(label);
    errorNoCodes = emptyCodes(codes, urn);
  } else {
    errorRequired = required(id);
  }

  if (errorRequired) errors.push(errorRequired);
  if (errorNoCodes) errors.push(errorNoCodes);

  return errors;
}

function checkIfCodesListTheSame(expected, values) {
  if (!expected[0]) {
    return true;
  }
  return (
    expected.filter((e) => e !== undefined && e !== '' && !values.includes(e))
      .length === 0
  );
}

function collectedVariableCompare(object1, object2) {
  if (typeof object1 !== 'object' && typeof object2 !== 'object')
    return object1 === object2;
  let equal = true;
  if (object2) {
    Object.keys(object1).forEach((p) => {
      if (
        (object1[p] === '' && object2[p] !== undefined && object2[p] !== '') ||
        (object1[p] !== '' && object2[p] === undefined)
      ) {
        equal = false;
      }
      // id is regenerated ; name and label can be personalized
      if (
        object1[p] !== '' &&
        object2[p] !== undefined &&
        p !== 'id' &&
        p !== 'name' &&
        p !== 'label' &&
        p !== 'isCollected' &&
        p !== 'alternativeLabel' &&
        !collectedVariableCompare(object1[p], object2[p])
      ) {
        equal = false;
      }
    });
  }
  return equal;
}

/**
 * Check if the current collected variables are valid with the provided form
 * or if the user needs to regenerate them.
 */
export function validCollectedVariables(
  currentVariables,
  { form, stores: { codesListsStore } },
) {
  // @TODO: Improve this validation testing the coordinates of the variables
  const {
    name: nameComponent,
    responseFormat: { type, [type]: responseFormatValues },
  } = form;
  let expectedVariables;

  const existingVariableIds = new Set();
  for (const variable of currentVariables) {
    existingVariableIds.add(variable.id);
  }

  expectedVariables = generateCollectedVariables(
    type,
    nameComponent,
    responseFormatValues,
    codesListsStore,
    existingVariableIds,
  );

  /**
   * for Single Choice Response, we check if the codeListReference for each
   * variable are in the same order as the ones expected
   */
  const isCodesTheSame = checkIfCodesListTheSame(
    expectedVariables.map((e) => e.codeListReference),
    currentVariables.map((e) => e.codeListReference),
  );

  if (
    currentVariables[0] &&
    expectedVariables.length !== currentVariables.length
  ) {
    return Dictionary.validation_collectedvariable_need_reset;
  }
  if (
    (type === SINGLE_CHOICE || type === PAIRING || type === MULTIPLE_CHOICE) &&
    currentVariables[0] &&
    ((currentVariables[0].codeListReference !==
      expectedVariables[0].codeListReference &&
      (!!currentVariables[0].codeListReference ||
        !!expectedVariables[0].codeListReference)) ||
      (currentVariables[0].codeListReferenceLabel !==
        expectedVariables[0].codeListReferenceLabel &&
        (!!currentVariables[0].codeListReferenceLabel ||
          !!expectedVariables[0].codeListReferenceLabel)))
  ) {
    return Dictionary.validation_collectedvariable_need_reset;
  }

  if ((type === TABLE || type === SIMPLE) && currentVariables[0]) {
    if (!collectedVariableCompare(expectedVariables, currentVariables)) {
      return Dictionary.validation_collectedvariable_need_reset;
    }
  }

  /**
   * For Multiple Choice Reponse, we check if all the codes of a code list
   * are in the right order.
   */
  const isTheSameOrder = true;

  if (
    expectedVariables &&
    currentVariables.length === 0 &&
    expectedVariables.length > 0
  ) {
    return Dictionary.validation_collectedvariable_need_creation;
  }
  if (
    expectedVariables &&
    currentVariables.length === 1 &&
    expectedVariables.length === 1
  ) {
    return false;
  }
  return isCodesTheSame &&
    isTheSameOrder &&
    expectedVariables &&
    currentVariables.length === expectedVariables.length
    ? undefined
    : Dictionary.validation_collectedvariable_need_reset;
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
