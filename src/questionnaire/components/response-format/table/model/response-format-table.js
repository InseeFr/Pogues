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
      type,
      [type]: { ...simpleForm },
    };
  } else {
    const { visHint, [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm } = measureForm;
    state[SINGLE_CHOICE] = {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListMeasure.formToStateComponent(codesListForm),
    };
  }
  return state;
}

export function formToStateMeasureList(form, codesListMeasureList, codesListsStore) {
  const { measures } = form;
  return measures.map((measure, index) => {
    if (measure.type === SINGLE_CHOICE) {
      codesListMeasureList.push(
        CodesListModel.Factory(measure[SINGLE_CHOICE][DEFAULT_CODES_LIST_SELECTOR_PATH], codesListsStore)
      );
    }
    return formToStateMeasure(measure, codesListMeasureList[index]);
  });
}

export function formToState(form, transformers, codesListsStore) {
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
    state[LIST_MEASURE] = formToStateMeasureList(listMeasureForm, transformers.codesListsMeasureList, codesListsStore);
  }

  return state;
}

export function stateToFormPrimary(currentState, codesListPrimary) {
  const { showTotalLabel, totalLabel, type, [type]: primaryState } = currentState;
  const form = {
    showTotalLabel,
    totalLabel,
    type,
  };

  if (type === LIST) {
    const { numLinesMin, numLinesMax } = primaryState;
    form[LIST] = {
      numLinesMin,
      numLinesMax,
    };
  } else {
    form[CODES_LIST] = {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListPrimary.stateComponentToForm(),
    };
  }

  return form;
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

export function stateToFormMeasure(currentState, codesListMeasure) {
  const { label, type, [type]: measureState } = currentState;
  const form = {
    label,
    type,
  };

  if (type === SIMPLE) {
    const { type: typeSimple, [typeSimple]: simpleState } = currentState;

    form[SIMPLE] = merge(cloneDeep(defaultMeasureSimpleState), {
      type: typeSimple,
      [typeSimple]: {
        ...simpleState,
      },
    });
  }
  const { visHint } = measureState;
  form[SINGLE_CHOICE] = {
    visHint,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListMeasure.stateComponentToForm(),
  };

  return form;
}

export function stateToFormMeasureList(currentState, codesListsMeasureList) {
  const { measures } = currentState;
  return {
    ...currentState,
    measures: measures.map((m, index) => stateToFormMeasure(m, codesListsMeasureList[index])),
  };
}

export function stateToForm(currentState, transformers) {
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
    measureForm = stateToFormMeasure(measureState, transformers.codesListMeasure);
  }

  if (listMeasureState) {
    listMeasureForm = stateToFormMeasureList(listMeasureState, transformers.codesListsMeasureList);
  }

  return {
    [PRIMARY]: stateToFormPrimary(primaryState, transformers.codesListPrimary),
    [SECONDARY]: secondaryForm,
    [MEASURE]: measureForm,
    [LIST_MEASURE]: listMeasureForm,
  };
}

const Factory = (initialState = {}, codesListsStore) => {
  let currentState = merge(cloneDeep(defaultState), initialState);

  currentState[LIST_MEASURE].measures = currentState[LIST_MEASURE].measures.map(m => {
    return merge(cloneDeep(defaultState[MEASURE]), m);
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
    codesListsMeasureList: currentState[LIST_MEASURE].measures.map(m => {
      return CodesListModel.Factory(m[SINGLE_CHOICE][DEFAULT_CODES_LIST_SELECTOR_PATH], codesListsStore);
    }),
  };

  return {
    formToState: form => {
      if (form) currentState = formToState(form, transformers, codesListsStore);
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState, transformers);
    },
    getCodesListStore: () => {
      let codesLists;

      if (currentState[PRIMARY].type === CODES_LIST) {
        codesLists = transformers.codesListPrimary.getStore();

        if (currentState[SECONDARY].showSecondaryAxis) {
          codesLists = {
            ...codesLists,
            ...transformers.codesListSecondary.getStore(),
            ...transformers.codesListMeasure.getStore(),
          };
        } else {
          codesLists = {
            ...codesLists,
            ...transformers.codesListsMeasureList.map(trans => trans.getStore()),
          };
        }
      } else {
        codesLists = transformers.codesListsMeasureList.map(trans => trans.getStore());
      }

      return codesLists;
    },
  };
};

export default Factory;
