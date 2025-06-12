import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

import { Factory as CodesListFactory } from '../..';
import {
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_FORMATS,
  DIMENSION_TYPE,
} from '../../../constants/pogues-constants';

const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST, BOOL } = DIMENSION_FORMATS;
const { CHECKBOX } = DATATYPE_VIS_HINT;

export const defaultState = {
  [PRIMARY]: {},
  [MEASURE]: {
    type: BOOL,
    [BOOL]: {},
    [CODES_LIST]: {
      visHint: CHECKBOX,
    },
  },
};

export const defaultForm = {
  [PRIMARY]: {},
  [MEASURE]: {
    type: BOOL,
    [BOOL]: {},
    [CODES_LIST]: {
      visHint: CHECKBOX,
    },
  },
};

export function formToStateMeasure(form, codesListMeasure) {
  const { type, [type]: measureForm } = form;
  const state = {
    type,
  };

  if (type === CODES_LIST) {
    const { visHint, [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm } =
      measureForm;
    state[CODES_LIST] = {
      visHint,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]:
        codesListMeasure.formToStateComponent(codesListForm),
    };
  } else {
    state[BOOL] = {};
  }

  return state;
}

export function formToState(form, transformers) {
  const {
    [PRIMARY]: { [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm },
    [MEASURE]: measureForm,
  } = form;
  return {
    [PRIMARY]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]:
        transformers.codesListPrimary.formToStateComponent(codesListForm),
    },
    [MEASURE]: formToStateMeasure(measureForm, transformers.codesListMeasure),
  };
}

export function stateToForm(currentState, transformers) {
  const {
    [MEASURE]: {
      type,
      [type]: { visHint },
    },
  } = currentState;

  return {
    [PRIMARY]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]:
        transformers.codesListPrimary.stateComponentToForm(),
    },
    [MEASURE]: {
      type,
      [BOOL]: {},
      [CODES_LIST]: {
        visHint,
        [DEFAULT_CODES_LIST_SELECTOR_PATH]:
          transformers.codesListMeasure.stateComponentToForm(),
      },
    },
  };
}

const Factory = (initialState = {}, codesListsStore) => {
  let currentState = merge(cloneDeep(defaultState), initialState);
  const transformers = {
    codesListPrimary: CodesListFactory(
      cloneDeep(currentState[PRIMARY][DEFAULT_CODES_LIST_SELECTOR_PATH]),
      codesListsStore,
    ),
    codesListMeasure: CodesListFactory(
      cloneDeep(
        currentState[MEASURE][CODES_LIST][DEFAULT_CODES_LIST_SELECTOR_PATH],
      ),
      codesListsStore,
    ),
  };

  return {
    formToState: (form) => {
      if (form) currentState = formToState(form, transformers);
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState, transformers);
    },
    getCodesListStore: () => {
      let codesLists = transformers.codesListPrimary.getStore();

      if (currentState[MEASURE].type === CODES_LIST) {
        codesLists = {
          ...codesLists,
          ...transformers.codesListMeasure.getStore(),
        };
      }

      return codesLists;
    },
    getNormalizedValues: (form) => {
      // Values ready to be validated
      const {
        [MEASURE]: { type, [type]: measure },
        ...others
      } = form;

      return {
        ...others,
        [MEASURE]: {
          type,
          [type]: measure,
        },
      };
    },
  };
};

export default Factory;
