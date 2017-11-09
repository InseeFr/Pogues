import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';

import { CodesListModel } from 'widgets/codes-lists';
import {
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';

const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;
const { CHECKBOX } = DATATYPE_VIS_HINT;

export const defaultMeasureSimpleState = {
  mandatory: undefined,
  type: TEXT,
  [TEXT]: {
    maxLength: 255,
    pattern: '',
  },
  [NUMERIC]: {
    maximum: '',
    minimum: '',
    decimals: '',
  },
  [DATE]: {},
  [BOOLEAN]: {},
};

export const defaultMeasureState = {
  label: '',
  type: SIMPLE,
  [SIMPLE]: defaultMeasureSimpleState,
  [SINGLE_CHOICE]: {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListModel.defaultState),
    visHint: CHECKBOX,
  },
};

export const defaultMeasureForm = {
  label: '',
  type: SIMPLE,
  [SIMPLE]: defaultMeasureSimpleState,
  [SINGLE_CHOICE]: {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListModel.defaultForm),
    visHint: CHECKBOX,
  },
};

export const defaultState = {
  [PRIMARY]: {
    showTotalLabel: '0',
    totalLabel: '',
    type: LIST,
    [LIST]: {
      numLinesMin: 0,
      numLinesMax: 0,
    },
    [CODES_LIST]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListModel.defaultState),
    },
  },
  [SECONDARY]: {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListModel.defaultState),
    showSecondaryAxis: false,
    showTotalLabel: '0',
    totalLabel: '',
  },
  [LIST_MEASURE]: {
    ...defaultMeasureState,
    measures: [],
  },
  [MEASURE]: defaultMeasureState,
};

export function formToStatePrimary(form, codesListPrimary) {
  const { showTotalLabel, totalLabel, type, [type]: primaryForm } = form;

  const state = {
    showTotalLabel,
    totalLabel,
    type,
  };

  if (type === LIST) {
    const { numLinesMin, numLinesMax } = primaryForm;
    state[LIST] = { numLinesMin, numLinesMax };
  } else {
    const { [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm } = primaryForm;
    state[CODES_LIST] = {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListPrimary.formToStateComponent(codesListForm),
    };
  }

  return state;
}

export function formToStateSecondary(form, codesListSecondary) {
  const { showSecondaryAxis, showTotalLabel, totalLabel, [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm } = form;
  return {
    showSecondaryAxis,
    showTotalLabel,
    totalLabel,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListSecondary.formToStateComponent(codesListForm),
  };
}

export function formToStateMeasure(form, codesListMeasure) {
  const { label, type, [type]: measureForm } = form;
  const state = {
    label,
    type,
  };

  if (type === SIMPLE) {
    const { type: simpleType, [simpleType]: simpleForm } = measureForm;

    state[SIMPLE] = {
      type: simpleType,
      [simpleType]: { ...simpleForm },
    };
  } else {
    const { visHint, [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm } = measureForm;
    const codesList = codesListMeasure
      ? codesListMeasure.formToStateComponent(codesListForm)
      : CodesListModel.Factory().formToState(codesListForm);

    state[SINGLE_CHOICE] = {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesList,
    };
  }
  return state;
}

export function formToStateMeasureList(form) {
  const { measures } = form;
  return measures.map(measure => {
    return formToStateMeasure(measure);
  });
}

export function formToState(form, transformers) {
  const {
    [PRIMARY]: primaryForm,
    [SECONDARY]: secondaryForm,
    [MEASURE]: measureForm,
    [LIST_MEASURE]: listMeasureForm,
  } = form;

  const state = {
    [PRIMARY]: formToStatePrimary(primaryForm, transformers.codesListPrimary),
  };

  if (secondaryForm.showSecondaryAxis && primaryForm.type === CODES_LIST) {
    state[SECONDARY] = formToStateSecondary(secondaryForm, transformers.codesListSecondary);
    state[MEASURE] = formToStateMeasure(measureForm, transformers.codesListMeasure);
  } else {
    state[LIST_MEASURE] = formToStateMeasureList(listMeasureForm);
  }

  return state;
}

export function stateToFormPrimary(currentState, codesListPrimary) {
  const { showTotalLabel, totalLabel, type, [LIST]: listState } = currentState;

  return {
    showTotalLabel,
    totalLabel,
    type,
    [LIST]: { ...listState },
    [CODES_LIST]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListPrimary.stateComponentToForm(),
    },
  };
}

export function stateToFormSecondary(currentState, codesListSecondary) {
  const { showSecondaryAxis, showTotalLabel, totalLabel } = currentState;
  return {
    showSecondaryAxis,
    showTotalLabel,
    totalLabel,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListSecondary.stateComponentToForm(),
  };
}

export function stateToFormMeasure(currentState, codesListsStore, codesListMeasure) {
  const {
    label,
    type,
    [SIMPLE]: simpleState,
    [SINGLE_CHOICE]: { visHint, [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListState },
  } = currentState;
  let codesListForm;

  if (codesListMeasure) {
    codesListForm = codesListMeasure.stateComponentToForm();
  } else {
    codesListForm = CodesListModel.Factory(codesListState, codesListsStore).stateComponentToForm();
  }

  return {
    label,
    type,
    [SIMPLE]: simpleState,
    [SINGLE_CHOICE]: {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
    },
  };
}

export function stateToFormMeasureList(currentState, codesListsStore) {
  const { measures } = currentState;
  return {
    ...currentState,
    measures: measures.map(m => stateToFormMeasure(m, codesListsStore)),
  };
}

export function stateToForm(currentState, transformers, codesListsStore) {
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasureState,
  } = currentState;
  let secondaryForm = {};
  let measureForm = {};
  let listMeasureForm = {};

  if (secondaryState) {
    secondaryForm = stateToFormSecondary(secondaryState, transformers.codesListSecondary);
  }

  if (measureState) {
    measureForm = stateToFormMeasure(measureState, codesListsStore, transformers.codesListMeasure);
  }

  if (listMeasureState) {
    listMeasureForm = stateToFormMeasureList(listMeasureState, codesListsStore);
  }

  return {
    [PRIMARY]: stateToFormPrimary(primaryState, transformers.codesListPrimary),
    [SECONDARY]: secondaryForm,
    [MEASURE]: measureForm,
    [LIST_MEASURE]: listMeasureForm,
  };
}

const Factory = (initialState = {}, codesListsStore) => {
  const { [LIST_MEASURE]: measures, ...otherState } = initialState;
  let currentState = merge(cloneDeep(defaultState), { ...otherState, [LIST_MEASURE]: { measures } });

  currentState[LIST_MEASURE].measures = currentState[LIST_MEASURE].measures.map(m => {
    const { type, label, [type]: measureState } = m;
    const state = {
      type,
      label,
    };

    if (type === SINGLE_CHOICE) {
      state[SINGLE_CHOICE] = {
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListsStore[measureState[DEFAULT_CODES_LIST_SELECTOR_PATH].id],
      };
    } else {
      state[SIMPLE] = measureState;
    }

    return merge(cloneDeep(defaultState[MEASURE]), state);
  });

  const transformers = {
    codesListPrimary: CodesListModel.Factory(
      currentState[PRIMARY][CODES_LIST][DEFAULT_CODES_LIST_SELECTOR_PATH],
      codesListsStore
    ),
    codesListSecondary: CodesListModel.Factory(
      currentState[SECONDARY][DEFAULT_CODES_LIST_SELECTOR_PATH],
      codesListsStore
    ),
    codesListMeasure: CodesListModel.Factory(
      currentState[MEASURE][SINGLE_CHOICE][DEFAULT_CODES_LIST_SELECTOR_PATH],
      codesListsStore
    ),
  };

  return {
    formToState: form => {
      if (form) currentState = formToState(form, transformers, codesListsStore);
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState, transformers, codesListsStore);
    },
    getCodesListStore: () => {
      let codesLists = {};

      if (currentState[PRIMARY] && currentState[PRIMARY].type === CODES_LIST) {
        codesLists = transformers.codesListPrimary.getStore();
      }

      if (currentState[SECONDARY] && currentState[SECONDARY].showSecondaryAxis) {
        codesLists = {
          ...codesLists,
          ...transformers.codesListSecondary.getStore(),
        };
      }

      if (currentState[MEASURE] && currentState[MEASURE].type === SINGLE_CHOICE) {
        codesLists = {
          ...codesLists,
          ...transformers.codesListMeasure.getStore(),
        };
      }

      if (currentState[LIST_MEASURE]) {
        currentState[LIST_MEASURE].forEach(m => {
          if (m.type === SINGLE_CHOICE) {
            const codesListState = m[SINGLE_CHOICE][DEFAULT_CODES_LIST_SELECTOR_PATH];
            codesLists = {
              ...codesLists,
              [codesListState.id]: codesListState,
            };
          }
        });
      }

      return codesLists;
    },
  };
};

export default Factory;
