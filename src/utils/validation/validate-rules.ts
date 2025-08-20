/*
Common business rules logic to be applied to the form's values.
*/
import cloneDeep from 'lodash.clonedeep';

import { DATATYPE_NAME } from '@/constants/pogues-constants';
import Dictionary from '@/utils/dictionary/dictionary';
import { getComponentsTargetsByComponent } from '@/utils/model/redirections-utils';

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
export function required(
  value: string | null | undefined | number = '',
): string | undefined {
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

/** Check that the provided value is below min. */
export function minValue(
  min: number,
): (value?: string | number) => string | undefined {
  return function (value) {
    if (value === undefined || value === '') {
      return `${Dictionary.validationMinNumber} ${min}`;
    }
    return parseInt(`${value}`, 10) < min
      ? `${Dictionary.validationMinNumber} ${min}`
      : undefined;
  };
}

/** Check that the provided value is above max. */
export function maxValue(
  max: number,
): (value?: string | number) => string | undefined {
  return function (value) {
    if (value === undefined || value === '') {
      return `${Dictionary.validationMaxNumber} ${max}`;
    }
    return parseInt(`${value}`, 10) > max
      ? `${Dictionary.validationMaxNumber} ${max}`
      : undefined;
  };
}

export function requiredSelect(value: string | string[] = '') {
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

export function nameSize(value: string): string | undefined {
  return value && value.length > 32
    ? Dictionary.validationInvalidNameSize
    : undefined;
}

export function emptyMeasures(measures: unknown[]): string | undefined {
  return measures.length === 0 ? Dictionary.noMeasureYet : undefined;
}

export function validateEarlyTarget(
  value: string,
  {
    stores: { componentsStore, editingComponentId },
  }: {
    stores: {
      componentsStore: { [key: string]: never };
      editingComponentId: string;
    };
  },
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

export function validateExistingTarget(
  value: string,
  {
    stores: { componentsStore },
  }: { stores: { componentsStore: { [key: string]: unknown } } },
): string | undefined {
  return value !== '' && !componentsStore[value]
    ? Dictionary.errorGoToNonExistingTgt
    : undefined;
}

export function validateDuplicates(
  value: string,
  { form }: { form: { name: string }[] },
): string | undefined {
  return value !== '' && form.filter((i) => i.name === value).length > 0
    ? 'Duplicated'
    : undefined;
}

export function validateDuplicatesCalculated(
  value: string,
  {
    form: { calculatedVariables: values },
    state: { selectedItemIndex },
  }: {
    form: { calculatedVariables: { calculatedVariables: { name: string }[] } };
    state: { selectedItemIndex: number };
  },
) {
  const listItems = cloneDeep(values.calculatedVariables);

  // We need to remove the element from the list
  if (selectedItemIndex !== undefined) {
    listItems.splice(selectedItemIndex, 1);
  }

  return validateDuplicates(value, { form: listItems });
}

export function typeExternal({
  form: { externalVariables: values },
}: {
  form: { externalVariables: { type: string } };
}) {
  return values.type === NUMERIC;
}

export function typeCalculated({
  form: { calculatedVariables: values },
}: {
  form: { calculatedVariables: { type: string } };
}) {
  return values.type === NUMERIC;
}

export function validateDuplicatesExternal(
  value: string,
  {
    form: { externalVariables: values },
    state: { selectedItemIndex },
  }: {
    form: { externalVariables: { externalVariables: { name: string }[] } };
    state: { selectedItemIndex: number };
  },
) {
  const listItems = cloneDeep(values.externalVariables);

  // We need to remove the element from the list
  if (selectedItemIndex !== undefined) {
    listItems.splice(selectedItemIndex, 1);
  }

  return validateDuplicates(value, { form: listItems });
}

export function validateDuplicatesCollected(
  value: string,
  {
    form: { collectedVariables: values },
    state: { selectedItemIndex },
  }: {
    form: { collectedVariables: { collectedVariables: { name: string }[] } };
    state: { selectedItemIndex: number };
  },
) {
  const listItems = cloneDeep(values.collectedVariables);

  // We need to remove the element from the list
  if (selectedItemIndex !== undefined) {
    listItems.splice(selectedItemIndex, 1);
  }

  return validateDuplicates(value, { form: listItems });
}

/** We need to check is element start with a number. */
export function letterStart(value?: string): string | undefined {
  return value && !isNaN(Number(value.charAt(0)))
    ? Dictionary.IsNotLetter
    : undefined;
}

export function cartCodeModeCollecte(
  value: string,
  {
    form: { declarations: values },
  }: { form: { declarations: { TargetMode: string } } },
) {
  return (
    value === 'CODECARD' &&
    (values.TargetMode.split(',').includes('CAWI') ||
      values.TargetMode.split(',').includes('PAPI') ||
      values.TargetMode.length === 0)
  );
}
