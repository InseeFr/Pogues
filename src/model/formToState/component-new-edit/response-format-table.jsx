import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

import {
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_CALCULATION,
  DIMENSION_FORMATS,
  DIMENSION_LENGTH,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
} from '../../../constants/pogues-constants';
import { uuid, verifyVariable } from '../../../utils/utils';
import {
  defaultForm as CodesListDefaultForm,
  defaultState as CodesListDefaultState,
  Factory as CodesListFactory,
} from '../codes-lists/codes-list';

const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { DYNAMIC_LENGTH, DYNAMIC_FIXED } = DIMENSION_LENGTH;
const { NUMBER, FORMULA } = DIMENSION_CALCULATION;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { DATE, NUMERIC, TEXT, BOOLEAN, DURATION } = DATATYPE_NAME;
const { RADIO } = DATATYPE_VIS_HINT;

export const defaultMeasureSimpleState = {
  mandatory: undefined,
  type: TEXT,
  [TEXT]: {
    maxLength: 249,
  },
  [NUMERIC]: {
    maximum: '',
    minimum: '',
    decimals: '',
  },
  [DATE]: {
    maximum: '',
    minimum: '',
    format: '',
  },
  [BOOLEAN]: {},
  [DURATION]: {
    minimum: '',
    maximum: '',
    mihours: '',
    miminutes: '',
    miyears: '',
    mimonths: '',
    mahours: '',
    maminutes: '',
    mayears: '',
    mamonths: '',
    format: '',
  },
};

export const defaultMeasureState = {
  label: '',
  hasFilter: false,
  conditionFilter: undefined,
  isReadOnly: false,
  conditionReadOnly: undefined,
  type: SIMPLE,
  [SIMPLE]: defaultMeasureSimpleState,
  [SINGLE_CHOICE]: {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: merge(
      cloneDeep(CodesListDefaultState),
      { id: uuid() },
    ),
    visHint: RADIO,
  },
};

export const defaultMeasureForm = {
  label: '',
  hasFilter: false,
  conditionFilter: undefined,
  isReadOnly: false,
  conditionReadOnly: undefined,
  type: SIMPLE,
  [SIMPLE]: defaultMeasureSimpleState,
  [SINGLE_CHOICE]: {
    allowArbitraryResponse: false,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListDefaultForm),
    visHint: RADIO,
  },
};

const defaultPrimaryListState = {
  type: NUMBER,
  [NUMBER]: {
    type: DYNAMIC_FIXED,
    [DYNAMIC_LENGTH]: {
      minimum: '1',
      maximum: '1',
    },
    [DYNAMIC_FIXED]: {
      size: '1',
    },
  },
  [FORMULA]: {
    type: DYNAMIC_FIXED,
    [DYNAMIC_LENGTH]: {
      minimum: '',
      maximum: '',
    },
    [DYNAMIC_FIXED]: {
      size: '',
    },
  },
};

export const defaultState = {
  [PRIMARY]: {
    type: LIST,
    [LIST]: defaultPrimaryListState,
    [CODES_LIST]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListDefaultState),
    },
  },
  [SECONDARY]: {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListDefaultState),
    showSecondaryAxis: false,
  },
  [LIST_MEASURE]: {
    ...defaultMeasureState,
    measures: [],
  },
  [MEASURE]: defaultMeasureState,
};

export function formToStatePrimary(form, codesListPrimary) {
  const { type, [type]: primaryForm } = form;

  const state = {
    type,
  };

  if (type === LIST) {
    const {
      type: listType,
      [listType]: { minimum, maximum, size },
    } = primaryForm;

    state[LIST] = {
      type: listType,
      [listType]: listType === DYNAMIC_LENGTH ? { minimum, maximum } : { size },
    };
  } else {
    const { [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm } = primaryForm;
    state[CODES_LIST] = {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]:
        codesListPrimary.formToStateComponent(codesListForm),
    };
  }

  return state;
}

export function formToStateSecondary(form, codesListSecondary) {
  const {
    showSecondaryAxis,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
  } = form;
  return {
    showSecondaryAxis,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      codesListSecondary.formToStateComponent(codesListForm),
  };
}

export function formToStateMeasure(form, codesListMeasure) {
  const {
    label,
    conditionFilter,
    conditionReadOnly,
    type,
    [type]: measureForm,
  } = form;
  const state = {
    label: verifyVariable(label),
    conditionFilter: conditionFilter
      ? verifyVariable(conditionFilter)
      : conditionFilter,
    conditionReadOnly: conditionReadOnly
      ? verifyVariable(conditionReadOnly)
      : conditionReadOnly,
    type,
  };

  if (type === SIMPLE) {
    const { type: simpleType, [simpleType]: simpleForm } = measureForm;

    state[SIMPLE] = {
      type: simpleType,
      [simpleType]: { ...simpleForm },
    };
  } else {
    const { visHint, [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm } =
      measureForm;
    const codesList = codesListMeasure
      ? codesListMeasure.formToStateComponent(codesListForm)
      : CodesListFactory().formToState(codesListForm);

    state[SINGLE_CHOICE] = {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesList,
    };
  }
  return state;
}

export function formToStateMeasureList(form) {
  const { measures } = form;
  return measures.map((measure) => {
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
    state[SECONDARY] = formToStateSecondary(
      secondaryForm,
      transformers.codesListSecondary,
    );
    state[MEASURE] = formToStateMeasure(
      measureForm,
      transformers.codesListMeasure,
    );
  } else {
    state[LIST_MEASURE] = formToStateMeasureList(listMeasureForm);
  }

  return state;
}

export function stateToFormPrimary(currentState, codesListPrimary) {
  const { type, [LIST]: listState } = currentState;

  return {
    type,
    [LIST]: { ...listState },
    [CODES_LIST]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]:
        codesListPrimary.stateComponentToForm(),
    },
  };
}

export function stateToFormSecondary(currentState, codesListSecondary) {
  const { showSecondaryAxis } = currentState;
  return {
    showSecondaryAxis,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      codesListSecondary.stateComponentToForm(),
  };
}

export function stateToFormMeasure(
  currentState,
  codesListsStore,
  codesListMeasure,
) {
  const {
    label,
    conditionFilter,
    conditionReadOnly,
    type,
    [SIMPLE]: simpleState,
    [SINGLE_CHOICE]: {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListState,
    },
  } = currentState;

  // since we do not have hasFilter in the model, we create the boolean here : true if conditionFilter has a value
  const hasFilter = !!conditionFilter;
  const isReadOnly = !!conditionReadOnly;

  let codesListForm;

  if (codesListMeasure) {
    codesListForm = codesListMeasure.stateComponentToForm();
  } else {
    codesListForm = CodesListFactory(
      codesListState,
      codesListsStore,
    ).stateComponentToForm();
  }

  return {
    label,
    hasFilter,
    conditionFilter,
    isReadOnly,
    conditionReadOnly,
    type,
    [SIMPLE]: simpleState,
    [SINGLE_CHOICE]: {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
    },
  };
}

export function stateToFormMeasureList(currentState, codesListsStore) {
  const {
    [SINGLE_CHOICE]: {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListState,
    },
    measures,
  } = currentState;
  const codesListForm = CodesListFactory(
    codesListState,
    codesListsStore,
  ).stateComponentToForm();

  return {
    ...currentState,
    [SINGLE_CHOICE]: {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
    },
    measures: measures.map((m) => stateToFormMeasure(m, codesListsStore)),
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
    secondaryForm = stateToFormSecondary(
      secondaryState,
      transformers.codesListSecondary,
    );
  }

  if (measureState) {
    measureForm = stateToFormMeasure(
      measureState,
      codesListsStore,
      transformers.codesListMeasure,
    );
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

export function getNormalizedMeasureValues(measure) {
  const { type, [type]: measureType, label } = measure;
  const normalized = {
    label,
    type,
  };

  if (type === SIMPLE) {
    const { type: typeSimple, [typeSimple]: simple } = measureType;
    normalized[SIMPLE] = {
      type: typeSimple,
      [typeSimple]: simple,
    };
  } else {
    normalized[SINGLE_CHOICE] = measureType;
  }

  return normalized;
}

const Factory = (initialState = {}, codesListsStore) => {
  const { [LIST_MEASURE]: measures, ...otherState } = initialState;
  let currentState = merge(cloneDeep(defaultState), {
    ...otherState,
    [LIST_MEASURE]: { measures },
  });
  currentState[LIST_MEASURE].measures = currentState[LIST_MEASURE].measures.map(
    (m) => {
      const {
        type,
        label,
        conditionFilter,
        conditionReadOnly,
        [type]: measureState,
      } = m;
      const state = {
        type,
        label,
        conditionFilter,
        conditionReadOnly,
      };

      if (type === SINGLE_CHOICE) {
        state[SINGLE_CHOICE] = {
          [DEFAULT_CODES_LIST_SELECTOR_PATH]:
            codesListsStore[measureState[DEFAULT_CODES_LIST_SELECTOR_PATH].id],
          visHint: measureState.visHint,
        };
      } else {
        state[SIMPLE] = measureState;
      }

      return merge(cloneDeep(defaultState[MEASURE]), state);
    },
  );

  const transformers = {
    codesListPrimary: CodesListFactory(
      currentState[PRIMARY][CODES_LIST][DEFAULT_CODES_LIST_SELECTOR_PATH],
      codesListsStore,
    ),
    codesListSecondary: CodesListFactory(
      currentState[SECONDARY][DEFAULT_CODES_LIST_SELECTOR_PATH],
      codesListsStore,
    ),
    codesListMeasure: CodesListFactory(
      currentState[MEASURE][SINGLE_CHOICE][DEFAULT_CODES_LIST_SELECTOR_PATH],
      codesListsStore,
    ),
  };

  return {
    formToState: (form) => {
      if (form) currentState = formToState(form, transformers);
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState, transformers, codesListsStore);
    },
    getCodesListStore: () => {
      let codesLists = {};

      if (currentState[PRIMARY]?.type === CODES_LIST) {
        codesLists = transformers.codesListPrimary.getStore();
      }

      if (currentState[SECONDARY]?.showSecondaryAxis) {
        codesLists = {
          ...codesLists,
          ...transformers.codesListSecondary.getStore(),
        };
      }

      if (currentState[MEASURE]?.type === SINGLE_CHOICE) {
        codesLists = {
          ...codesLists,
          ...transformers.codesListMeasure.getStore(),
        };
      }

      if (currentState[LIST_MEASURE]) {
        currentState[LIST_MEASURE].forEach((m) => {
          if (m.type === SINGLE_CHOICE) {
            const codesListState =
              m[SINGLE_CHOICE][DEFAULT_CODES_LIST_SELECTOR_PATH];
            codesLists = {
              ...codesLists,
              [codesListState.id]: codesListState,
            };
          }
        });
      }

      return codesLists;
    },
    getNormalizedValues: (form) => {
      // Values ready to be validated
      const {
        [PRIMARY]: { type: typePrimary, [typePrimary]: primary },
        [SECONDARY]: { showSecondaryAxis, ...others },
        [MEASURE]: measure,
        [LIST_MEASURE]: { measures: listMeasures, ...listMeasuresInput },
      } = form;

      // Normalized primary axis values

      const normalized = {};

      if (typePrimary === CODES_LIST) {
        normalized[PRIMARY] = {
          type: typePrimary,
          [typePrimary]: primary,
        };
      }
      if (typePrimary === LIST) {
        const { type: listType, [listType]: listContent } = primary;
        normalized[PRIMARY] = {
          type: typePrimary,
          [typePrimary]: { type: listType, [listType]: listContent },
        };
      }

      if (typePrimary === CODES_LIST && showSecondaryAxis) {
        // Normalized secondary axis values

        normalized[SECONDARY] = {
          ...others,
          showSecondaryAxis,
        };

        // Normalized measure axis values

        normalized[MEASURE] = getNormalizedMeasureValues(measure);
      }

      // Normalized measures list axis

      if (
        typePrimary === LIST ||
        (typePrimary === CODES_LIST && !showSecondaryAxis)
      ) {
        normalized[LIST_MEASURE] = {
          ...getNormalizedMeasureValues(listMeasuresInput),
          measures: listMeasures,
        };
      }
      return normalized;
    },
  };
};

export default Factory;
