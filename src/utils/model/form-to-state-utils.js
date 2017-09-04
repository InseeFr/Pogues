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

  function addCodeListId(id, list) {
    if (id) codesListsStore[id] = list;
  }
  if (responseFormatName === SINGLE_CHOICE) {
    addCodeListId(responseFormat[SINGLE_CHOICE].codesListId, responseFormat[SINGLE_CHOICE].codesList);
  } else if (responseFormatName === MULTIPLE_CHOICE) {
    const multipleChoice = responseFormat[MULTIPLE_CHOICE];
    addCodeListId(multipleChoice[PRIMARY].codesListId, multipleChoice[PRIMARY].codesList);

    if (multipleChoice[MEASURE].type === CODES_LIST) {
      addCodeListId(multipleChoice[MEASURE][CODES_LIST].codesListId, multipleChoice[MEASURE][CODES_LIST].codesList);
    }
  } else if (responseFormatName === TABLE) {
    const table = responseFormat[TABLE];

    if (table[PRIMARY].type === CODES_LIST) {
      addCodeListId(table[PRIMARY][CODES_LIST].codesListId, table[PRIMARY][CODES_LIST].codesList);

      if (table[SECONDARY] && table[SECONDARY].showSecondaryAxis) {
        addCodeListId(table[SECONDARY].codesListId, table[SECONDARY].codesList);

        if (table[MEASURE].type === SINGLE_CHOICE) {
          addCodeListId(table[MEASURE][SINGLE_CHOICE].codesListId, table[MEASURE][SINGLE_CHOICE].codesList);
        }
      }
    }

    if (!table[SECONDARY]) {
      table[LIST_MEASURE].forEach(measure => {
        if (measure.type === SINGLE_CHOICE) {
          addCodeListId(measure[SINGLE_CHOICE].codesListId, measure[SINGLE_CHOICE].codesList);
        }
      });
    }
  }

  return codesListsStore;
}
