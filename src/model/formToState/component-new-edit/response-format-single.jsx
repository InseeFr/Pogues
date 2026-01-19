import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

import {
  CHOICE_TYPE,
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DEFAULT_NOMENCLATURE_SELECTOR_PATH,
  DEFAULT_VARIABLE_SELECTOR_PATH,
} from '../../../constants/pogues-constants';
import { Factory as CodesListFactory } from '../lists/codes-list';
import { Factory as NomenclatureFactory } from '../lists/nomenclature';
import { Factory as VariableFactory } from '../lists/variables';

const { RADIO, SUGGESTER } = DATATYPE_VIS_HINT;
const { CODE_LIST } = CHOICE_TYPE;

export const defaultState = {
  allowArbitraryResponse: false,
  mandatory: false,
  type: CODE_LIST,
  visHint: RADIO,
};

export const defaultForm = {
  allowArbitraryResponse: false,
  mandatory: false,
  type: CODE_LIST,
  visHint: RADIO,
};

export function formToState(form, transformers) {
  const {
    id,
    allowArbitraryResponse,
    mandatory,
    type,
    visHint,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
    [DEFAULT_NOMENCLATURE_SELECTOR_PATH]: nomenclatureForm,
    [DEFAULT_VARIABLE_SELECTOR_PATH]: variableForm,
  } = form;

  return {
    id,
    allowArbitraryResponse,
    // for suggester we do not handle mandatory question
    mandatory: type !== SUGGESTER ? mandatory : false,
    type,
    visHint,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      transformers.codesList.formToStateComponent(codesListForm),
    [DEFAULT_NOMENCLATURE_SELECTOR_PATH]:
      transformers.nomenclature.formToStateComponent(nomenclatureForm),
    [DEFAULT_VARIABLE_SELECTOR_PATH]:
      transformers.variable.formToStateComponent(variableForm),
  };
}

export function stateToForm(currentState, transformers) {
  const { id, allowArbitraryResponse, visHint, mandatory, type } = currentState;
  return {
    id,
    allowArbitraryResponse,
    mandatory,
    visHint,
    type,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      transformers.codesList.stateComponentToForm(),
    [DEFAULT_NOMENCLATURE_SELECTOR_PATH]:
      transformers.nomenclature.stateComponentToForm(),
    [DEFAULT_VARIABLE_SELECTOR_PATH]:
      transformers.variable.stateComponentToForm(),
  };
}

export const Factory = (initialState = {}, codesListsStore) => {
  let currentState = merge(cloneDeep(defaultState), initialState);
  const transformers = {
    codesList: CodesListFactory(
      codesListsStore,
      cloneDeep(currentState[DEFAULT_CODES_LIST_SELECTOR_PATH]),
    ),
    nomenclature: NomenclatureFactory(
      codesListsStore,
      cloneDeep(currentState[DEFAULT_NOMENCLATURE_SELECTOR_PATH]),
    ),
    variable: VariableFactory(
      codesListsStore,
      cloneDeep(currentState[DEFAULT_VARIABLE_SELECTOR_PATH]),
    ),
  };
  return {
    formToState: (form) => {
      const state = formToState(form, transformers);
      currentState = merge(cloneDeep(currentState), state);
      return state;
    },
    stateToForm: () => {
      console.log(
        'response-format-single stateToForm - THIS IS OK ',
        currentState,
      );
      return stateToForm(currentState, transformers);
    },
    getCodesListStore: () => {
      console.log('current state in response format single', currentState);
      if (currentState.type === CHOICE_TYPE.SUGGESTER)
        return transformers.nomenclature.getStore();
      else if (currentState.type === CHOICE_TYPE.VARIABLE)
        return transformers.variable.getStore();
      return transformers.codesList.getStore();
    },
    getNormalizedValues: (form) => {
      // Values ready to be validated
      return form;
    },
  };
};

export default Factory;
