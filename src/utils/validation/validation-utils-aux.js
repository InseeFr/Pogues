import merge from 'lodash.merge';

import {
  QUESTION_TYPE_ENUM,
  CODES_LIST_INPUT_ENUM,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';
import {
  required,
  requiredSelect,
  emptyCodes,
  emptyMeasures,
  name as validName,
  minValue,
  maxValue,
} from 'forms/validation-rules';

import Dictionary from 'utils/dictionary/dictionary';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { NEW, QUEST } = CODES_LIST_INPUT_ENUM;
const { NEW, QUEST } = CODES_LIST_INcPUT_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { NUMERIC, TEXT } = DATATYPE_NAME;



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
// function validateCode(values, path) {
//   const validationErrors = [];
//   const { code, label } = values;
//   const isValidCode = validName(code);
//   const codeRequired = required(code);
//   const labelRequired = required(label);
//
//   if (codeRequired) validationErrors.push([`${path}.code`, codeRequired]);
//   if (isValidCode) validationErrors.push([`${path}.code`, isValidCode]);
//   if (labelRequired) validationErrors.push([`${path}.label`, labelRequired]);
//
//   return validationErrors;
// }

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



/**
 * This method obtains the number of codes from a codes list form.
 *
 * @param {object}  values          The codes list form values.
 * @param {object}  codesListStore  The codes lists store.
 *
 * @return {number} The number of codes.
 */
function getNumCodes(values, codesListStore) {
  const { [DEFAULT_CODES_LIST_SELECTOR_PATH]: { panel, codes, id } } = values;
  let numCodes = 0;

  if (panel === NEW) {
    numCodes = codes.length;
  } else if (panel === QUEST) {
    const codesList = codesListStore[id] || {};
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
    validationErrors.push([`${path}.label`, Dictionary.validation_collectedvariable_need_reset]);

  return validationErrors;
}
