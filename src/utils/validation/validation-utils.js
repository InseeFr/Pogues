import merge from 'lodash.merge';

import {
  COMPONENT_TYPE,
  QUESTION_TYPE_ENUM,
  CODES_LIST_INPUT_ENUM,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
} from 'constants/pogues-constants';
import {
  required,
  requiredSelect,
  uniqueCode,
  emptyCodes,
  emptyMeasures,
  name as validName,
  minValue,
} from 'layout/forms/validation-rules';

const { QUESTIONNAIRE } = COMPONENT_TYPE;
const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { NEW, QUESTIONNAIRE: QUEST } = CODES_LIST_INPUT_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;

/**
 * This method will validate a code. In case validation errors are found, they are added to the validation errors
 * list with the path to the element where show the error.
 *
 * @param {object}  values    The values of the code.
 * @param {string}  path      The code path in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
function validateCode(values, path) {
  const validationErrors = [];
  const { code, label } = values;
  const isValidCode = validName(code);
  const codeRequired = required(code);
  const labelRequired = required(label);

  if (codeRequired) validationErrors.push([`${path}.code`, codeRequired]);
  if (isValidCode) validationErrors.push([`${path}.code`, isValidCode]);
  if (labelRequired) validationErrors.push([`${path}.label`, labelRequired]);

  return validationErrors;
}

/**
 * This method will validate a codes list. In case validation errors are found, they are added to the validation errors
 * list with the path to the element where show the error.
 *
 * @param {object}  values    The values of the codes list.
 * @param {string}  path      The codes list path in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
function validateCodesList(values, path) {
  const { type, [type]: codesListValues } = values;
  let validationErrors = [];

  if (type === NEW) {
    const labelRequired = required(codesListValues.label);
    const notEmptyCodes = emptyCodes(codesListValues.codes);
    const uniqueCodes = uniqueCode()(codesListValues.codes);

    if (labelRequired) {
      validationErrors.push([`${path}.${NEW}.label`, labelRequired]);
    } else if (notEmptyCodes) {
      validationErrors.push([`${path}.${NEW}.label`, notEmptyCodes]);
    } else if (uniqueCodes) {
      validationErrors.push([`${path}.${NEW}.label`, uniqueCodes]);
    }

    codesListValues.codes.forEach((code, index) => {
      validationErrors = [...validationErrors, ...validateCode(code, `${path}.${NEW}.codes.${index}`)];
    });
  } else if (type === QUEST) {
    const requiredSelectCodesList = requiredSelect(codesListValues.codesListId);

    if (requiredSelectCodesList) validationErrors.push([`${path}.${QUEST}.codesListId`, requiredSelectCodesList]);
  }

  return validationErrors;
}

/**
 * This method will validate the values for a response format table with type LIST. In case validation errors are
 * found, they are added to the validation errors list with the path to the element where show the error.
 *
 * @param {object}  values    The values of the items in the response format table with type LIST.
 * @param {string}  path      The path to the response format table with type LIST in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
function validateList(values, path) {
  const validationErrors = [];
  const { numLinesMin, numLinesMax } = values;
  const numLinesMinFromZero = minValue(0)(numLinesMin);
  const numLinesMaxFromOne = minValue(1)(numLinesMax);

  if (numLinesMinFromZero) validationErrors.push([`${path}.numLinesMin`, numLinesMinFromZero]);
  if (numLinesMaxFromOne) validationErrors.push([`${path}.numLinesMax`, numLinesMaxFromOne]);

  return validationErrors;
}

function validateTotalLabel(values, path) {
  const validationErrors = [];
  const { showTotalLabel, totalLabel } = values;

  if (showTotalLabel !== '0') {
    const totalLabelRequired = required(totalLabel);

    if (totalLabelRequired) validationErrors.push([`${path}.totalLabel`, totalLabelRequired]);
  }

  return validationErrors;
}

/**
 * This method will validate the values for a response format table MEASURE. In case validation errors are
 * found, they are added to the validation errors list with the path to the element where show the error.
 *
 * @param {object}  values    The values of the measure.
 * @param {string}  path      The measure path in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
function validateMeasure(values, path) {
  let validationErrors = [];
  const { label: measureLabel, type: measureType, [measureType]: measure } = values;

  const measureLabelRequired = required(measureLabel);

  if (measureLabelRequired) validationErrors.push([`${path}.label`, measureLabelRequired]);

  if (measureType === SINGLE_CHOICE) {
    validationErrors = [...validationErrors, ...validateCodesList(measure, `${path}.${SINGLE_CHOICE}`)];
  }

  return validationErrors;
}

/**
 * This method obtains the number of codes from a codes list form.
 *
 * @param {object}  values          The codes list form values.
 * @param {object}  codesListStore  The codes lists store.
 *
 * @return {number} The number of codes.
 */
function getNumCodes(values, codesListStore) {
  const { type, [NEW]: { codes }, [QUESTIONNAIRE]: { codesListId } } = values;
  let numCodes = 0;

  if (type === NEW) {
    numCodes = codes.length;
  } else if (type === QUEST) {
    const codesList = codesListStore[codesListId] || {};
    numCodes = Object.keys(codesList.codes || {}).length;
  }

  return numCodes;
}

/**
 * This method obtains the number of collected variables expected from a response format of type MULTIPLE
 *
 * @param {object}  values          The response format MULTIPLE form values.
 * @param {object}  codesListStore  The codes lists store.
 *
 * @return {number} The number of collected variables expected.
 */
function getNumCollectedVariablesMultiple(values, codesListStore) {
  const { [PRIMARY]: primary } = values;
  return getNumCodes(primary, codesListStore);
}

/**
 * This method obtains the number of collected variables expected from a response format of type TABLE
 *
 * @param {object}  values          The response format TABLE form values.
 * @param {object}  codesListStore  The codes lists store.
 *
 * @return {number} The number of collected variables expected.
 */
function getNumCollectedVariablesTable(values, codesListStore) {
  let numCollectedVariables;
  const { [PRIMARY]: primaryState, [SECONDARY]: secondaryState, [LIST_MEASURE]: listMeasuresState } = values;

  if (primaryState.type === CODES_LIST) {
    const { [CODES_LIST]: primaryCodesList } = primaryState;
    const numCodesPrimary = getNumCodes(primaryCodesList, codesListStore);

    if (secondaryState.showSecondaryAxis) {
      const numCodesSecondary = getNumCodes(secondaryState, codesListStore);
      numCollectedVariables = numCodesPrimary * numCodesSecondary;
    } else {
      numCollectedVariables = numCodesPrimary * listMeasuresState.measures.length;
    }
  } else {
    const { LIST: { numLinesMin, numLinesMax } } = primaryState;
    const numLines = numLinesMax - numLinesMin + 1;
    numCollectedVariables = numLines * listMeasuresState.measures.length;
  }

  return numCollectedVariables;
}

/**
 * This method validate that the number of collected variables expected is the same that the number of collected
 * variables existent.
 *
 * @param {object}  values          The codes list form values.
 * @param {object}  codesListStore  The codes lists store.
 * @param {string}  path            The collected variables path in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
function validateCollectedVariables(values, codesListStore, path) {
  const validationErrors = [];
  let numExpectedCollectedVariables;
  const { responseFormat: { type, [type]: responseFormat }, collectedVariables: { collectedVariables } } = values;

  if (type === SIMPLE || type === SINGLE_CHOICE) {
    numExpectedCollectedVariables = 1;
  } else if (type === MULTIPLE_CHOICE) {
    numExpectedCollectedVariables = getNumCollectedVariablesMultiple(responseFormat, codesListStore);
  } else {
    numExpectedCollectedVariables = getNumCollectedVariablesTable(responseFormat, codesListStore);
  }

  if (numExpectedCollectedVariables !== collectedVariables.length)
    validationErrors.push([`${path}.label`, 'Necesitas recrear']);

  return validationErrors;
}

/**
 * This method validate that the response format values are valids.
 *
 * @param {object}  values  The codes list form values.
 * @param {string}  path    The collected variables path in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
function validateResponseFormat(values, path) {
  const { responseFormat: { type, [type]: responseFormat } } = values;
  const responseFormatRequired = requiredSelect(type);
  let validationErrors = [];

  if (responseFormatRequired) {
    validationErrors.type = 'formato de respuesta obligatorio';
    validationErrors.push([`${path}.type`, 'formato de respuesta obligatorio']);
  } else if (type === SINGLE_CHOICE) {
    validationErrors = validateCodesList(responseFormat, `${path}.${type}`);
  } else if (type === MULTIPLE_CHOICE) {
    const { type: measureType, [measureType]: measure } = responseFormat[MEASURE];

    validationErrors = validateCodesList(responseFormat[PRIMARY], `${path}.${MULTIPLE_CHOICE}.${PRIMARY}`);

    if (measureType === CODES_LIST) {
      validationErrors = [
        ...validationErrors,
        ...validateCodesList(measure, `${path}.${MULTIPLE_CHOICE}.${MEASURE}.${CODES_LIST}`),
      ];
    }
  } else if (type === TABLE) {
    const {
      [PRIMARY]: { type: primaryType, [primaryType]: primary, ...primaryTotalLabel },
      [SECONDARY]: { showSecondaryAxis, ...secondary },
      [MEASURE]: measure,
      [LIST_MEASURE]: { measures },
    } = responseFormat;

    validationErrors = validateTotalLabel(primaryTotalLabel, `${path}.${TABLE}.${PRIMARY}`);

    if (primaryType === LIST) {
      validationErrors = [...validationErrors, ...validateList(primary, `${path}.${TABLE}.${PRIMARY}.${LIST}`)];
    } else {
      validationErrors = [
        ...validationErrors,
        ...validateCodesList(primary, `${path}.${TABLE}.${PRIMARY}.${CODES_LIST}`),
      ];

      if (showSecondaryAxis) {
        validationErrors = [
          ...validationErrors,
          ...validateTotalLabel(secondary, `${path}.${TABLE}.${SECONDARY}`),
          ...validateCodesList(secondary, `${path}.${TABLE}.${SECONDARY}`),
        ];
      }
    }

    if (showSecondaryAxis) {
      validationErrors = [...validationErrors, ...validateMeasure(measure, `${path}.${TABLE}.${MEASURE}`)];
    } else {
      const notEmptyMeasures = emptyMeasures(measures);

      if (notEmptyMeasures) validationErrors.push([`${path}.${TABLE}.${LIST_MEASURE}.label`, notEmptyMeasures]);
    }
  }

  return validationErrors;
}

/**
 * This method build a nested object using the keys passed in path and add a message to the deeper object key.
 *
 * @param {string} path     The string with the object keys joined by points (foo.bar.xyz).
 * @param {string} message  The message that will be added to the deeper key.
 *
 * @return {object} The builded object.
 */
function getNestedErrorFromPath(path, message) {
  const keys = path.split('.');

  function getErrorFromKeys(listKeys, errorMessage, errors) {
    const key = listKeys.shift();

    if (keys.length > 0) {
      errors = {
        [key]: getErrorFromKeys(keys, errorMessage),
      };
    } else {
      errors = {
        [key]: message,
      };
    }

    return errors;
  }

  return getErrorFromKeys(keys, message, {});
}

/**
 * This method validate that question form values are valids.
 *
 * @param {object}  values          The form values.
 * @param {object}  codesListStore  The codes lists store.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
export function getValidationErrors(values, codesListStore) {
  let validationErrors = validateResponseFormat(values, 'responseFormat');

  // The collected variables are validated only when response format is valid.
  if (validationErrors.length === 0) {
    validationErrors = validateCollectedVariables(values, codesListStore, 'collectedVariables');
  }

  return validationErrors;
}

/**
 * This method builds an errors object from a list of validation errors.
 *
 * @param {array}  errors The validation errors.
 *
 * @return {object} The errors object.
 */
export function getErrorsObject(errors) {
  return errors.reduce((acc, error) => {
    return merge(acc, getNestedErrorFromPath(error[0], error[1]));
  }, {});
}
