import {
  QUESTION_TYPE_ENUM,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
} from 'constants/pogues-constants';

const { SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;

function getCodesListsStoreSingle(form) {
  const codesList = form[DEFAULT_CODES_LIST_SELECTOR_PATH];
  return {
    [codesList.id]: codesList,
  };
}

function getCodesListsStoreMultiple(form) {
  const { [PRIMARY]: primaryForm, [MEASURE]: { type, [type]: measureForm } } = form;
  const codesListPrimary = primaryForm[DEFAULT_CODES_LIST_SELECTOR_PATH];
  let codesListsStore = {
    [codesListPrimary.id]: codesListPrimary,
  };

  if (type === CODES_LIST) {
    const codesListMeasure = measureForm[DEFAULT_CODES_LIST_SELECTOR_PATH];
    codesListsStore = {
      ...codesListsStore,
      [codesListMeasure.id]: codesListMeasure,
    };
  }

  return codesListsStore;
}

function getCodesListsStoreTable(form) {
  let codesListsStore = {};
  const {
    [PRIMARY]: { type: typePrimary, [typePrimary]: primaryForm },
    [SECONDARY]: secondaryForm,
    [MEASURE]: measureForm,
    [LIST_MEASURE]: measuresListForm,
  } = form;

  if (typePrimary === CODES_LIST) {
    const codesListPrimary = primaryForm[DEFAULT_CODES_LIST_SELECTOR_PATH];
    codesListsStore = {
      [codesListPrimary.id]: codesListPrimary,
    };
  }

  if (secondaryForm) {
    const codesListSecondary = secondaryForm[DEFAULT_CODES_LIST_SELECTOR_PATH];
    codesListsStore = {
      ...codesListsStore,
      [codesListSecondary.id]: codesListSecondary,
    };
  }

  if (measureForm) {
    const { type: typeMeasure, [typeMeasure]: singleChoiceForm } = measureForm;

    if (typeMeasure === SINGLE_CHOICE) {
      const codesListMeasure = singleChoiceForm[DEFAULT_CODES_LIST_SELECTOR_PATH];

      codesListsStore = {
        ...codesListsStore,
        [codesListMeasure.id]: codesListMeasure,
      };
    }
  }

  if (measuresListForm) {
  }

  return codesListsStore;
}

export function getCodesListsStore(form) {
  let codesListsStore = {};
  const { type, [type]: responseFormatForm } = form;

  if (type === SINGLE_CHOICE) {
    codesListsStore = getCodesListsStoreSingle(responseFormatForm);
  } else if (type === MULTIPLE_CHOICE) {
    codesListsStore = getCodesListsStoreMultiple(responseFormatForm);
  } else if (type === TABLE) {
    codesListsStore = getCodesListsStoreTable(responseFormatForm);
  }

  return codesListsStore;
}
