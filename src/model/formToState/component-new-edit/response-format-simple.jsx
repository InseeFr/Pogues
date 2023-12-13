import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';

import { DATATYPE_NAME } from '../../../constants/pogues-constants';

const { DATE, NUMERIC, TEXT, BOOLEAN, DURATION } = DATATYPE_NAME;

export const defaultState = {};

export const defaultForm = {
  mandatory: false,
  type: TEXT,
  [TEXT]: {
    maxLength: 249,
    pattern: '',
  },
  [NUMERIC]: {
    minimum: '',
    maximum: '',
    decimals: '',
    unit: '',
  },
  [DATE]: {
    minimum: '',
    maximum: '',
    format: '',
  },
  [BOOLEAN]: {},

  [DURATION]: {
    minimum: '',
    maximum: '',
    mihours: '',
    miminutes: '',
    mihundhours: '',
    mihundredths: '',
    miyears: '',
    mimonths: '',
    mahours: '',
    maminutes: '',
    mahundhours: '',
    mahundredths: '',
    mayears: '',
    mamonths: '',
    format: '',
  },
};

export function formToState(form) {
  const { type, mandatory, [type]: simpleForm, id } = form;

  return {
    id,
    type,
    mandatory,
    [type]: { ...simpleForm },
  };
}

export function stateToForm(currentState) {
  const { mandatory, type, [type]: simpleState, id } = currentState;

  return merge(cloneDeep(defaultForm), {
    id,
    mandatory,
    type,
    [type]: {
      ...simpleState,
    },
  });
}

const Factory = (initialState = {}) => {
  let currentState = merge(cloneDeep(defaultForm), initialState);

  return {
    formToState: form => {
      const state = formToState(form);
      currentState = merge(cloneDeep(currentState), state);
      return state;
    },
    stateToForm: () => {
      return stateToForm(currentState);
    },
    getNormalizedValues: form => {
      // Values ready to be validated
      const { type, [type]: simpleType } = form;

      return {
        type,
        [type]: simpleType,
      };
    },
  };
};

export default Factory;
