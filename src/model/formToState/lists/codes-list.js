import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

import { createListFactory } from '../lists/utils';

export const defaultState = {
  id: '',
  label: '',
  codes: [],
};

export const defaultForm = {
  id: '',
  label: '',
  codes: [],
  precisionid: '',
  precisionlabel: '',
  precisionsize: '',
};

export function formToState(form) {
  const { id = '', label = '', codes = [] } = form;
  let codesStore = {};
  if (Array.isArray(codes)) {
    for (const code of codes) {
      codesStore[code.value] = code;
    }
  } else {
    codesStore = codes;
  }
  return {
    id: id,
    label: label,
    codes: codesStore,
  };
}

export function stateComponentToForm({ id = '', label = '', codes = {} }) {
  return merge(cloneDeep(defaultForm), {
    id,
    label,
    codes: Object.keys(codes).map((key) => codes[key]),
  });
}

export const Factory = (codesListsStore, currentState) => {
  return createListFactory(
    defaultState,
    formToState,
    stateComponentToForm,
    codesListsStore,
    currentState,
  );
};

export default Factory;
