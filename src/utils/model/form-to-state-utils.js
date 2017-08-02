import { DIMENSION_TYPE, DIMENSION_FORMATS, QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;

function addToState(responseFormatState, state = {}) {
  const { type, [type]: { codesList, codes } } = responseFormatState;
  const codesStates = codes.reduce((acc, code) => {
    return {
      ...acc,
      [code.id]: { ...code },
    };
  }, {});

  return {
    codesLists: {
      ...state.codesLists,
      [codesList.id]: {
        ...codesList,
        codes: codes.map(c => c.id),
      },
    },
    codes: {
      ...state.codes,
      ...codesStates,
    },
  };
}

function getCodesListsFromMultiple(responseFormatState) {
  const { [PRIMARY]: responseFormatPrimaryForm, [MEASURE]: { type, [type]: responseFormatMeasureForm } } = responseFormatState;
  let state = addToState(responseFormatPrimaryForm);
  if (type === CODES_LIST) {
    state = addToState(responseFormatMeasureForm, state);
  }
  return state;
}

function getCodesListsFromTable(responseFormatState) {
  let state = {
    codesLists: {},
    codes: {},
  };

  const {
    [PRIMARY]: { type: typePrimary, [typePrimary]: primaryState },
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = responseFormatState;

  if (typePrimary === CODES_LIST) {
    state = addToState(primaryState, state);
  }

  if (secondaryState && secondaryState.showSecondaryAxis) {
    state = addToState(secondaryState, state);
  }

  if (measureState && measureState.type === SINGLE_CHOICE) {
    state = addToState(measureState, state);
  }

  if (listMeasuresState) {
    listMeasuresState.forEach(m => {
      const { type: typeMeasureItem, [typeMeasureItem]: measureStateItem } = m;

      if (typeMeasureItem === SINGLE_CHOICE) {
        state = addToState(measureStateItem, state);
      }
    });
  }

  return state;
}

export function getCodesListsAndCodesFromQuestion(responseFormat) {
  let state = {
    codesLists: {},
    codes: {},
  };

  if (responseFormat) {
    const { type, [type]: responseFormatState } = responseFormat;

    if (type === SINGLE_CHOICE) {
      state = addToState(responseFormatState, state);
    } else if (type === MULTIPLE_CHOICE) {
      state = getCodesListsFromMultiple(responseFormatState);
    } else if (type === TABLE) {
      state = getCodesListsFromTable(responseFormatState);
    }
  }
  return state;
}

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
