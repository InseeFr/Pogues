import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';

import { uuid } from '../../../utils/utils';

export const defaultState = {
  id: '',
  label: '',
  codes: [],
};

export const defaultForm = {
  id: '',
  label: '',
  codes: [],
  panel: 'NEW',
  precisionid: '',
  precisionlabel: '',
  precisionsize: '',
};

export function formToState(form) {
  const { id, label, codes } = form;
  const codesStore = (codes || []).reduce((acc, c) => {
    return {
      ...acc,
      [c.value]: { ...c },
    };
  }, {});
  return {
    id: id || uuid(),
    label: label || '',
    codes: codesStore,
  };
}

export function stateComponentToForm({ id, label, codes }) {
  const codesList = Object.keys(codes || {}).map(key => codes[key]);
  return merge(cloneDeep(defaultForm), {
    id: id || '',
    label: label || '',
    codes: codesList,
  });
}

export const Factory = (currentState = {}, codesListsStore) => {
  if (codesListsStore && currentState.id) {
    currentState = merge(
      cloneDeep(defaultState),
      codesListsStore[currentState.id],
    );
  } else {
    currentState = merge(cloneDeep(defaultState), { id: uuid() });
  }

  return {
    formToStateComponent: form => {
      if (form) currentState = formToState(form);
      return {
        id: currentState.id,
      };
    },
    formToState: form => {
      if (form) currentState = formToState(form);
      return currentState;
    },
    stateComponentToForm: () => {
      return stateComponentToForm(currentState);
    },
    getStore: () => {
      return {
        [currentState.id]: currentState,
      };
    },
  };
};
