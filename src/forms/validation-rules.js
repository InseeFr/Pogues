import cloneDeep from 'lodash.clonedeep';

import Dictionary from 'utils/dictionary/dictionary';
import { CODES_LIST_INPUT_ENUM } from 'constants/pogues-constants';
import { getComponentsTargetsByComponent } from 'utils/model/redirections-utils';
import { generateCollectedVariables } from 'utils/variables/collected-variables-utils';

const { NEW } = CODES_LIST_INPUT_ENUM;

export function required(value = '') {
  const val = value.trim ? value.trim().replace(/[^\w\s]/gi, '') : value;

  if (typeof val === 'string' || val instanceof String) {
    return val.length > 0 ? undefined : Dictionary.validationRequired;
  }
  return val ? undefined : Dictionary.validationRequired;
}

export function unique(property) {
  return function(values) {
    if (values.length <= 1) {
      return undefined;
    }
    const orderList = values.map(v => v[property]).sort((v1, v2) => v1 > v2);
    for (let i = 0; i < orderList.length; i += 1) {
      if (orderList[i + 1] && orderList[i] === orderList[i + 1]) {
        return 'unique';
      }
    }
    return undefined;
  };
}

export function uniqueCode() {
  return unique('code');
}

export function maxLength(max) {
  return function(value) {
    return value && value.length > max ? `Must be ${max} characters or less` : undefined;
  };
}

export function maxLength15() {
  return maxLength(15);
}

export function number(value) {
  return value && isNaN(Number(value)) ? Dictionary.validationNumber : undefined;
}

export function minValue(min) {
  return function(value) {
    if (value === undefined || value === '') return `${Dictionary.validationMinNumber} ${min}`;
    return parseInt(value, 10) < min ? `${Dictionary.validationMinNumber} ${min}` : undefined;
  };
}

export function maxValue(max) {
  return function(value) {
    if (value === undefined || value === '') return `${Dictionary.validationMaxNumber} ${max}`;
    return parseInt(value, 10) > max ? `${Dictionary.validationMaxNumber} ${max}` : undefined;
  };
}

export function email(value) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
}

export function requiredSelect(value = '') {
  return value !== '' ? undefined : Dictionary.validationRequired;
}

export function requiredSelectMultiple(value = []) {
  return value.length > 0 ? undefined : Dictionary.validationRequiredMultiple;
}

export function requiredListCheckboxes(value) {
  return value !== '' ? undefined : Dictionary.validationRequiredMultiple;
}

export function name(value = '') {
  return value !== '' && !/^[A-Z0-9\-_]+$/i.test(value) ? Dictionary.validationInvalidName : undefined;
}

export function nameSize(value) {
  return value && value.length > 16 ? Dictionary.validationInvalidNameSize : undefined;
}

export function emptyCodes(codes = []) {
  return codes.length === 0 ? 'No codes' : undefined;
}

export function emptyMeasures(measures) {
  return measures.length === 0 ? 'No measures' : undefined;
}

export function uniqueCodeAttr(value, { editing, previousValue, codes }) {
  if (editing && value === previousValue) {
    return undefined;
  }
  return codes.filter(code => code.value === value).length > 0 ? 'unique' : undefined;
}

export function validCodesList(codesList) {
  const { id, label, codes, panel } = codesList;
  const errors = [];
  let errorRequired;
  let errorNoCodes;

  if (panel === NEW) {
    errorRequired = required(label);
    errorNoCodes = emptyCodes(codes);
  } else {
    errorRequired = required(id);
  }

  if (errorRequired) errors.push(errorRequired);
  if (errorNoCodes) errors.push(errorNoCodes);

  return errors;
}

export function validCollectedVariables(value, { form, stores: { codesListsStore } }) {
  // @TODO: Improve this validation testing the coordinates of the variables
  const { name: nameComponent, responseFormat: { type, [type]: responseFormatValues } } = form;
  let expectedVariables;

  if (nameComponent !== '' && type !== '') {
    expectedVariables = generateCollectedVariables(type, nameComponent, responseFormatValues, codesListsStore);
  }
  return expectedVariables && value.length === expectedVariables.length
    ? undefined
    : Dictionary.validation_collectedvariable_need_reset;
}

export function validateEarlyTarget(value, { stores: { componentsStore, editingComponentId } }) {
  const allowedTargets = getComponentsTargetsByComponent(componentsStore, componentsStore[editingComponentId]);
  return value !== '' && componentsStore[value] && allowedTargets.indexOf(value) === -1
    ? Dictionary.errorGoToEarlierTgt
    : undefined;
}

export function validateExistingTarget(value, { stores: { componentsStore } }) {
  return value !== '' && !componentsStore[value] ? Dictionary.errorGoToNonExistingTgt : undefined;
}

export function validateDuplicates(value, { form }) {
  return value !== '' && form.filter(i => i.name === value).length > 0 ? 'Duplicated' : undefined;
}

export function validateDuplicatesCalculated(
  value,
  { form: { calculatedVariables: values }, state: { selectedItemIndex } }
) {
  const listItems = cloneDeep(values.calculatedVariables);

  // We need to remove the element from the list
  if (selectedItemIndex !== undefined) {
    listItems.splice(selectedItemIndex, 1);
  }

  return validateDuplicates(value, { form: listItems });
}

export function validateDuplicatesExternal(
  value,
  { form: { externalVariables: values }, state: { selectedItemIndex } }
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
  { form: { collectedVariables: values }, state: { selectedItemIndex } }
) {
  const listItems = cloneDeep(values.collectedVariables);

  // We need to remove the element from the list
  if (selectedItemIndex !== undefined) {
    listItems.splice(selectedItemIndex, 1);
  }

  return validateDuplicates(value, { form: listItems });
}