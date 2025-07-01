import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

import { Factory as CodesListFactory } from '../..';
import {
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from '../../../constants/pogues-constants';

const { DROPDOWN } = DATATYPE_VIS_HINT;

export const defaultState = {
  scope: '',
  visHint: DROPDOWN,
  // [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListDefaultState),
};

export const defaultForm = {
  scope: '',
  visHint: DROPDOWN,
  // [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListDefaultForm),
};

export function formToState(form, transformers) {
  const {
    id,
    visHint,
    scope,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
  } = form;

  return {
    id,
    visHint,
    scope,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      transformers.codesList.formToStateComponent(codesListForm),
  };
}

export function stateToForm(currentState, transformers) {
  const { id, visHint, scope } = currentState;

  return {
    id,
    visHint,
    scope,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      transformers.codesList.stateComponentToForm(),
  };
}

export const Factory = (initialState = {}, codesListsStore) => {
  let currentState = merge(cloneDeep(defaultState), initialState);
  const transformers = {
    codesList: CodesListFactory(
      codesListsStore,
      cloneDeep(currentState[DEFAULT_CODES_LIST_SELECTOR_PATH]),
    ),
  };
  return {
    formToState: (form) => {
      const state = formToState(form, transformers);
      currentState = merge(cloneDeep(currentState), state);
      return state;
    },
    stateToForm: () => {
      return stateToForm(currentState, transformers);
    },
    getCodesListStore: () => {
      return transformers.codesList.getStore();
    },
    getNormalizedValues: (form) => {
      // Values ready to be validated
      return form;
    },
  };
};

export default Factory;
