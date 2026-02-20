import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

import { Factory as CodesListFactory } from '../..';
import {
  CHOICE_TYPE,
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from '../../../constants/pogues-constants';

const { DROPDOWN } = DATATYPE_VIS_HINT;
const { CODE_LIST } = CHOICE_TYPE;

export const defaultState = {
  visHint: DROPDOWN,
  // As pairwise questions has some common functions with single choice questions, we set the same default choiceType but it will be ignored in the component
  choiceType: CODE_LIST,
  sourceVariableReferences: {
    name: '',
    gender: '',
    age: '',
  },
  // [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListDefaultState),
};

export const defaultForm = {
  visHint: DROPDOWN,
  choiceType: CODE_LIST,
  nameSourceVariable: '',
  genderSourceVariable: '',
  ageSourceVariable: '',
  // [DEFAULT_CODES_LIST_SELECTOR_PATH]: cloneDeep(CodesListDefaultForm),
};

export function formToState(form, transformers) {
  const {
    id,
    visHint,
    scope,
    nameSourceVariable,
    genderSourceVariable,
    ageSourceVariable,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
  } = form;

  return {
    id,
    visHint,
    scope,
    choiceType: CODE_LIST,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      transformers.codesList.formToStateComponent(codesListForm),
    sourceVariableReferences: {
      name: nameSourceVariable,
      gender: genderSourceVariable,
      age: ageSourceVariable,
    },
  };
}

export function stateToForm(currentState, transformers) {
  const { id, visHint, sourceVariableReferences } = currentState;

  return {
    id,
    visHint,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      transformers.codesList.stateComponentToForm(),
    nameSourceVariable: sourceVariableReferences.name,
    genderSourceVariable: sourceVariableReferences.gender,
    ageSourceVariable: sourceVariableReferences.age,
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
