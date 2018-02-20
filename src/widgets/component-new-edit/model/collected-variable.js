import { uuid } from 'utils/utils';
import { sortByYAndX } from 'utils/variables/collected-variables-utils';

export const defaultState = {
  name: '',
  label: '',
  x: '',
  y: ''
};

export const defaultForm = {
  name: '',
  label: '',
  x: '',
  y: '',
  collectedVariables: []
};

export function formToState(form) {
  const { name, label, x, y } = form;
  const id = form.id || uuid();

  return {
    id,
    name,
    label,
    x,
    y
  };
}

export function formToStore(form) {
  const { collectedVariables } = form;

  return collectedVariables.reduce((acc, cv) => {
    const state = formToState(cv);

    return {
      ...acc,
      [state.id]: state
    };
  }, {});
}

export function storeToForm(currentStore) {
  const collectedVariables = Object.keys(currentStore)
    .sort(sortByYAndX(currentStore))
    .map(key => {
      const { id, name, label, x, y } = currentStore[key];
      return {
        id,
        name,
        label,
        x,
        y
      };
    });

  return {
    ...defaultForm,
    collectedVariables
  };
}

const Factory = (currentState = [], collectedVariablesStore) => {
  let currentStore = currentState.reduce((acc, key) => {
    return {
      ...acc,
      [key]: collectedVariablesStore[key]
    };
  }, {});

  return {
    formToStore: form => {
      if (form) currentStore = formToStore(form);
      return currentStore;
    },
    formToComponentState: form => {
      if (form) currentStore = formToStore(form);
      currentState = Object.keys(currentStore);
      return currentState;
    },
    storeToForm: () => {
      return storeToForm(currentStore);
    },
    getStore: () => {
      return currentStore;
    }
  };
};

export default Factory;
