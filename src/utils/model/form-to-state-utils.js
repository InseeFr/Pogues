import { DIMENSION_TYPE, DIMENSION_FORMATS, QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;

function addToState(form, state = {}) {
  const { type, [type]: { codesList, codes } } = form;
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

function getCodesListsFromMultiple(form) {
  const { [PRIMARY]: responseFormatPrimaryForm, [MEASURE]: { type, [type]: responseFormatMeasureForm } } = form;
  let state = addToState(responseFormatPrimaryForm);
  if (type === CODES_LIST) {
    state = addToState(responseFormatMeasureForm, state);
  }
  return state;
}

function getCodesListsFromTable(form) {
  let state = {
    codesLists: {},
    codes: {},
  };

  const {
    [PRIMARY]: { type: typePrimary, [typePrimary]: primaryForm },
    [SECONDARY]: { showSecondaryAxis, ...codesListSecondaryForm },
    [MEASURE]: { measures, type: typeMeasure, [typeMeasure]: measureForm },
  } = form;

  if (typePrimary === CODES_LIST) {
    state = addToState(primaryForm, state);
  }

  if (showSecondaryAxis) {
    state = addToState(codesListSecondaryForm, state);

    if (typeMeasure === SINGLE_CHOICE) {
      state = addToState(measureForm, state);
    }
  } else {
    measures.forEach(m => {
      const { type: typeMeasureItem, [typeMeasureItem]: measureFormItem } = m;

      if (typeMeasureItem === SINGLE_CHOICE) {
        state = addToState(measureFormItem, state);
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
    const { type, [type]: responseFormatForm } = responseFormat;

    if (type === SINGLE_CHOICE) {
      state = addToState(responseFormatForm, state);
    } else if (type === MULTIPLE_CHOICE) {
      state = getCodesListsFromMultiple(responseFormatForm);
    } else if (type === TABLE) {
      state = getCodesListsFromTable(responseFormatForm);
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
