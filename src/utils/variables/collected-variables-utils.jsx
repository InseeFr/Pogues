import {
  COMPONENT_TYPE,
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM,
} from '../../constants/pogues-constants';
import { uuid } from '../utils';
import { getCollectedVariablesMultiple } from './collected-variables-multiple';
import { getCollectedVariablesSingle } from './collected-variables-single';
import { getCollectedVariablesTable } from './collected-variables-table';

const { QUESTION } = COMPONENT_TYPE;
const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE, PAIRING } =
  QUESTION_TYPE_ENUM;
const { TEXT } = DATATYPE_NAME;

/**
 * This method will recursively sort an array of code.
 * A code has a depth, a weight and maybe a parent.
 * We will first sort codes with the depth=1, and recursively for each code, sort its direct children.
 */
export function sortCodes(codes = [], depth = 1, parent = '') {
  const filtered = codes.filter(
    (code) => code.depth === depth && code.parent === parent,
  );
  if (filtered.length === 0) {
    return [];
  }
  return filtered
    .sort((code1, code2) => code1.weight - code2.weight)
    .map((code) => [code, ...sortCodes(codes, depth + 1, code.value)])
    .reduce((acc, res) => [...acc, ...res], []);
}

export function getReponsesValues(measure) {
  let reponseFormatValues = {};

  if (measure.type === SIMPLE) {
    reponseFormatValues = {
      codeListReference: '',
      codeListReferenceLabel: '',
      type: measure[SIMPLE].type,
      // measure[SIMPLE].type is BOOLEAN or TEXT or NUMERIC or DATE or DURATION ; for BOOLEAN, this means : BOOLEAN: measure[SIMPLE].BOOLEAN
      [measure[SIMPLE].type]: measure[SIMPLE][measure[SIMPLE].type],
    };
  }
  if (measure.type === SINGLE_CHOICE) {
    reponseFormatValues = {
      codeListReference: measure[SINGLE_CHOICE].CodesList.id,
      codeListReferenceLabel: measure[SINGLE_CHOICE].CodesList.label,
      type: TEXT,
      [TEXT]: {
        maxLength: 1,
      },
    };
  }
  return reponseFormatValues;
}

export function sortByYXAndZ(store) {
  return (id1, id2) => {
    let c1 = id1;
    let c2 = id2;
    if (store) {
      c1 = store[id1];
      c2 = store[id2];
    }
    return (
      (c1.y || 99) * 10000 -
      (c2.y || 99) * 10000 +
      (c1.x || 99) * 100 -
      (c2.x || 99) * 100 +
      (c1.z || 0) -
      (c2.z || 0)
    );
  };
}

export function getCollectedVariable(
  name,
  label,
  coordinates,
  reponseFormatValues = {},
  alternativeLabel = '',
  arbitraryVariableOfVariableId = undefined,
  id = undefined,
) {
  let collectedVariable = {
    ...reponseFormatValues,
    id: id ?? uuid(),
    name,
    label,
  };

  if (coordinates) collectedVariable = { ...collectedVariable, ...coordinates };
  if (alternativeLabel)
    collectedVariable = { ...collectedVariable, ...alternativeLabel };
  if (arbitraryVariableOfVariableId)
    collectedVariable = {
      ...collectedVariable,
      arbitraryVariableOfVariableId: arbitraryVariableOfVariableId,
    };
  return collectedVariable;
}

export function generateCollectedVariables(
  responseFormat,
  questionName,
  form,
  codesListStore,
  existingVariableIds = new Set(),
) {
  switch (responseFormat) {
    case SIMPLE:
      return [
        getCollectedVariable(
          questionName,
          `${questionName} label`,
          undefined,
          form,
        ),
      ];
    case SINGLE_CHOICE:
    case PAIRING:
      return getCollectedVariablesSingle(
        questionName,
        form,
        existingVariableIds,
      );
    case MULTIPLE_CHOICE:
      return getCollectedVariablesMultiple(
        questionName,
        form,
        codesListStore,
        existingVariableIds,
      );
    case TABLE:
      return getCollectedVariablesTable(questionName, form);
    default:
      return [];
  }
}

/**
 * Used to correctly load a questionnaire by pairing collected variables and
 * questions on init.
 */
export function getCollectedVariablesByQuestion(
  components = {},
  collectedVariables = {},
) {
  const componentIds = Object.keys(components)
    .filter((key) => components[key].type === QUESTION)
    .filter((key) => components[key].collectedVariables.length > 0);

  const res = {};
  for (const componentId of componentIds) {
    const innerRes = {};
    for (const collectedVariableId of components[componentId]
      .collectedVariables) {
      innerRes[collectedVariableId] = {
        ...collectedVariables[collectedVariableId],
      };
    }
    res[componentId] = innerRes;
  }

  return res;
}
