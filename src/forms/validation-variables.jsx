import { QUESTION_TYPE_ENUM } from '../constants/pogues-constants';
import Dictionary from '../utils/dictionary/dictionary';
import { generateCollectedVariables } from '../utils/variables/collected-variables-utils';

const { SINGLE_CHOICE, SIMPLE, TABLE, MULTIPLE_CHOICE, PAIRING } =
  QUESTION_TYPE_ENUM;

/**
 * Check if the current collected variables are valid with the provided form
 * or if the user needs to regenerate them.
 */
export function validCollectedVariables(
  currentVariables,
  { form, stores: { codesListsStore } },
) {
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

  /**
   * for Single Choice Response, we check if the codeListReference for each
   * variable are in the same order as the ones expected
   */
  const isCodesTheSame = checkIfCodesListTheSame(
    expectedVariables.map((e) => e.codeListReference),
    currentVariables.map((e) => e.codeListReference),
  );

  if (
    !isCodesTheSame ||
    !expectedVariables ||
    currentVariables.length !== expectedVariables.length
  ) {
    return Dictionary.validation_collectedvariable_need_reset;
  }

  return undefined;
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
