import { QUESTION_TYPE_ENUM, DIMENSION_TYPE, DIMENSION_FORMATS } from 'constants/pogues-constants';

const { SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, LIST_MEASURE, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;

/**
 * This function is called when we add a component to a parent
 *
 * @param {object[]} activeComponents The liste of components
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

export function getActiveCodesListsStore(responseFormat) {
  const codesListsStore = {};
  const responseFormatName = responseFormat.type;
  let codesListId;
  let codesList;

  if (responseFormatName === SINGLE_CHOICE) {
    codesListId = responseFormat[SINGLE_CHOICE].codesListId;
    codesList = responseFormat[SINGLE_CHOICE].codesList;
    codesListsStore[codesListId] = codesList;
  } else if (responseFormatName === MULTIPLE_CHOICE) {
    const multipleChoice = responseFormat[MULTIPLE_CHOICE];
    codesListId = multipleChoice[PRIMARY].codesListId;
    codesList = multipleChoice[PRIMARY].codesList;
    codesListsStore[codesListId] = codesList;

    if (multipleChoice[MEASURE].type === CODES_LIST) {
      codesListId = multipleChoice[MEASURE][CODES_LIST].codesListId;
      codesList = multipleChoice[MEASURE][CODES_LIST].codesList;
      codesListsStore[codesListId] = codesList;
    }
  } else if (responseFormatName === TABLE) {
    const table = responseFormat[TABLE];

    if (table[PRIMARY].type === CODES_LIST) {
      codesListId = table[PRIMARY][CODES_LIST].codesListId;
      codesList = table[PRIMARY][CODES_LIST].codesList;
      codesListsStore[codesListId] = codesList;

      if (table[SECONDARY] && table[SECONDARY].showSecondaryAxis) {
        codesListId = table[SECONDARY].codesListId;
        codesList = table[SECONDARY].codesList;
        codesListsStore[codesListId] = codesList;

        // @TODO
        if (table[MEASURE].type === SINGLE_CHOICE) {
          codesListId = table[MEASURE][SINGLE_CHOICE].codesListId;
          codesList = table[MEASURE][SINGLE_CHOICE].codesList;
          codesListsStore[codesListId] = codesList;
        }
      }
    }

    if (!table[SECONDARY]) {
      table[LIST_MEASURE].forEach(measure => {
        if (measure.type === SINGLE_CHOICE) {
          codesListId = measure[SINGLE_CHOICE].codesListId;
          codesList = measure[SINGLE_CHOICE].codesList;
          codesListsStore[codesListId] = codesList;
        }
      });
    }
  }

  return codesListsStore;
}
