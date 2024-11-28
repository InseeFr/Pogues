import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

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
  const {
    id,
    label,
    codes = [],
    name = '',
    urn = '',
    suggesterParameters = {},
  } = form;
  const codesStore = codes.reduce((acc, c) => {
    return {
      ...acc,
      [c.value]: { ...c },
    };
  }, {});
  return urn === ''
    ? {
        id: id || uuid(),
        label: label || '',
        codes: codesStore,
      }
    : {
        id,
        name,
        label,
        urn,
        suggesterParameters,
      };
}

export function stateComponentToForm({
  id = '',
  name = '',
  label = '',
  codes = {},
  urn = '',
  suggesterParameters = {},
}) {
  return urn !== ''
    ? {
        id,
        name,
        label,
        urn,
        suggesterParameters,
      }
    : merge(cloneDeep(defaultForm), {
        id,
        label,
        codes: Object.keys(codes).map((key) => codes[key]),
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
    formToStateComponent: (form) => {
      if (form) currentState = formToState(form);
      return {
        id: currentState.id,
      };
    },
    formToState: (form) => {
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
