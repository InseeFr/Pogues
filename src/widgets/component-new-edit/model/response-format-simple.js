import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';

import { DATATYPE_NAME } from 'constants/pogues-constants';

const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;

export const defaultForm = {
  mandatory: false,
  type: TEXT,
  [TEXT]: {
    maxLength: 255,
    pattern: '',
  },
  [NUMERIC]: {
    minimum: '',
    maximum: '',
    decimals: '',
    unit: '',
  },
  [DATE]: {},
  [BOOLEAN]: {},
};

export function formToState(form) {
  const { type, mandatory, [type]: simpleForm } = form;

  return {
    type,
    mandatory,
    [type]: { ...simpleForm },
  };
}

export function stateToForm(currentState) {
  const { mandatory, type, [type]: simpleState } = currentState;

  return merge(cloneDeep(defaultForm), {
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
