import _ from 'lodash';

import {
  COMPONENT_TYPE,
  QUESTION_TYPE_ENUM,
  CODES_LIST_INPUT_ENUM,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
} from 'constants/pogues-constants';
import { getLocale } from 'reducers/dictionary';
import Dictionary from 'utils/dictionary/dictionary';
import {
  required,
  requiredSelect,
  uniqueCode,
  emptyCodes,
  emptyMeasures,
  name as validName,
  minValue,
} from 'layout/forms/validation-rules';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;
const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { NEW, QUESTIONNAIRE: QUEST } = CODES_LIST_INPUT_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;

/**
 * This method return true if the component passed as a parameter is a QUESTION
 *
 * @param {object} component The component we should test
 */
export function isQuestion(component) {
  return component && component.type === QUESTION;
}

/**
 * This method return true if the component passed as a parameter is a SUBSEQUENCE
 *
 * @param {object} component The component we should test
 */
export function isSubSequence(component) {
  return component && component.type === SUBSEQUENCE;
}

/**
 * This method return true if the component passed as a parameter is a SEQUENCE
 *
 * @param {object} component The component we should test
 */
export function isSequence(component) {
  return component && component.type === SEQUENCE;
}

/**
  * This method return true if the component passed as a parameter is a QUESTIONNAIRE
  *
  * @param {object} component The component we should test
  */
export function isQuestionnaire(component) {
  return component && component.type === QUESTIONNAIRE;
}

/**
 * This method will return an array of component based of the ids passed as parameter
 *
 * @param {string[]} ids The list of IDs
 * @param {object} activesComponents The object representing the activated components
 */
export function toComponents(ids, activesComponents) {
  return ids.map(id => activesComponents[id]);
}

/**
 * This method will return an array of component's id
 *
 * @param {object[]} components The list of components
 */
export function toId(components) {
  return components.map(c => c.id);
}

/**
  * We can only move as a sibling two components of the same type.
  *
  * @param {object} droppedComponent the component we are moving
  * @param {object} draggedComponent the previous sibling of the moved component
  */
export function couldInsertToSibling(droppedComponent, draggedComponent) {
  return droppedComponent.type === draggedComponent.type;
}

/**
 * This method will check if in a specific use case, we can drag
 * a component inside another one.
 * This is possible when the dropped zone is a SEQUENCE or SUBSEQUENCE.
 *
 * @param {object} droppedComponent the dropped component
 * @param {object} draggedComponent the dragged component
 */
export function couldInsertAsChild(droppedComponent, draggedComponent) {
  return (
    (isSequence(droppedComponent) && isQuestion(draggedComponent)) ||
    (isSequence(droppedComponent) && isSubSequence(draggedComponent)) ||
    (isSubSequence(droppedComponent) && isQuestion(draggedComponent))
  );
}

/**
 * This method will return a sorted list of children ID, based on the parent
 * component passed as a parameter
 *
 * @param {object} components The list of components
 * @param {string} parent The ID of the component of the children we are looking for
 */
export function getSortedChildren(components, parent) {
  return Object.keys(components).filter(key => components[key].parent === parent).sort((key, nextKey) => {
    if (components[key].weight < components[nextKey].weight) return -1;
    if (components[key].weight > components[nextKey].weight) return 1;
    return 0;
  });
}

function getTargetsFromSequence(components, parent, weight, currentComponentId) {
  return components[parent].children.filter(id => currentComponentId !== id && components[id].weight > weight).reduce(
    (acc, key) => [
      ...acc,
      key,
      ...components[key].children.reduce((acu, id) => {
        return [...acu, id, ...components[id].children];
      }, []),
    ],
    []
  );
}

function getTargetsFromComponent(components, parent, weight, currentComponentId) {
  if (!components[parent].children) return [];

  return components[parent].children
    .filter(id => id !== currentComponentId && components[id].weight >= weight)
    .reduce((acc, id) => {
      return [...acc, id, ...(components[id].children || [])];
    }, []);
}

export function getTargets(
  components,
  componentType,
  selectedComponentId,
  componentParent,
  componentWeight,
  isNewComponent
) {
  let ids = [];
  let currentComponentId = selectedComponentId;
  let currentComponentType = componentType;
  let currentComponentParent = componentParent;
  let currentComponentWeight = componentWeight;

  if (!isNewComponent && selectedComponentId !== '') {
    if (currentComponentType === SEQUENCE) {
      ids = [
        ...components[selectedComponentId].children.reduce((acc, id) => {
          return [...acc, id, ...(components[id].children || [])];
        }, []),
      ];
    } else if (currentComponentType === SUBSEQUENCE) {
      ids = components[selectedComponentId].children;
    }
  }

  do {
    if (currentComponentType !== SEQUENCE) {
      ids = [
        ...ids,
        ...getTargetsFromComponent(components, currentComponentParent, currentComponentWeight, currentComponentId),
      ];
    } else {
      ids = [
        ...ids,
        ...getTargetsFromSequence(components, currentComponentParent, currentComponentWeight, currentComponentId),
      ];
    }

    currentComponentId = components[currentComponentParent].id;
    currentComponentType = components[currentComponentParent].type;
    currentComponentWeight = components[currentComponentParent].weight;
    currentComponentParent = components[currentComponentParent].parent;
  } while (currentComponentParent !== '');

  return ids;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat(getLocale(), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function getState(final) {
  return final ? Dictionary.stateValidated : Dictionary.stateProvisional;
}

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
    return _.merge(acc, getNestedErrorFromPath(error[0], error[1]));
  }, {});
}

/**
 * This function is called when we add a component to a parent
 *
 * @param {object[]} activeComponents The list of components
 * @param {string} parentId The id of the parent we should update
 * @param {string} newComponentId The id of the created component
 */
export function updateNewComponentParent(activeComponents, parentId, newComponentId) {
  const parent = activeComponents[parentId];
  return {
    [parentId]: {
      ...parent,
      children: [...parent.children, newComponentId],
    },
  };
}
