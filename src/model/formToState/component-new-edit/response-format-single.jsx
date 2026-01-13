import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

import {
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DEFAULT_NOMENCLATURE_SELECTOR_PATH,
  CHOICE_TYPE
} from '../../../constants/pogues-constants';
import { Factory as CodesListFactory } from '../lists/codes-list';
import { Factory as NomenclatureFactory } from '../lists/nomenclature';

const { RADIO, SUGGESTER } = DATATYPE_VIS_HINT;
const { CODE_LIST } = CHOICE_TYPE;

export const defaultState = {
  allowArbitraryResponse: false,
  mandatory: false,
  choiceType: CODE_LIST,  
  visHint: RADIO,
};

export const defaultForm = {
  allowArbitraryResponse: false,
  mandatory: false,
  choiceType: CODE_LIST,
  visHint: RADIO,
};

export function formToState(form, transformers) {
  const {
    id,
    allowArbitraryResponse,
    mandatory,
    choiceType, 
    visHint,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
    [DEFAULT_NOMENCLATURE_SELECTOR_PATH]: nomenclatureForm,
  } = form;

  return {
    id,
    allowArbitraryResponse,
    // for suggester we do not handle mandatory question
    mandatory: visHint !== SUGGESTER ? mandatory : false,
    choiceType,
    visHint,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      transformers.codesList.formToStateComponent(codesListForm),
    [DEFAULT_NOMENCLATURE_SELECTOR_PATH]:
      transformers.nomenclature.formToStateComponent(nomenclatureForm),
    // TODO: create this
    // [DEFAULT_VARIABLE_SELECTOR_PATH]:
    //   transformers.variable.formToStateComponent(variableForm),
  };
}

export function stateToForm(currentState, transformers) {
  const { id, allowArbitraryResponse, visHint, mandatory } = currentState;

  return {
    id,
    allowArbitraryResponse,
    mandatory,
    visHint,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]:
      transformers.codesList.stateComponentToForm(),
    [DEFAULT_NOMENCLATURE_SELECTOR_PATH]:
      transformers.nomenclature.stateComponentToForm(),
    // TODO: create this
    // [DEFAULT_VARIABLE_SELECTOR_PATH]:
    //   transformers.variable.stateComponentToForm(),
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
    //TODO create variable factory
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
      if (currentState.visHint === DATATYPE_VIS_HINT.SUGGESTER)
        return transformers.nomenclature.getStore();
      return transformers.codesList.getStore();
    },
    getNormalizedValues: (form) => {
      // Values ready to be validated
      return form;
    },
  };
};

export default Factory;
