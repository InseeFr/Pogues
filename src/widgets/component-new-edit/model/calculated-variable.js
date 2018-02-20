import { uuid } from 'utils/utils';

export const defaultState = {
  id: null,
  label: '',
  name: '',
  formula: ''
};

export const defaultForm = {
  label: '',
  name: '',
  formula: '',
  calculatedVariables: []
};

export function formToState(form) {
  const { label, name, formula } = form;
  const id = form.id || uuid();

  return {
    id,
    label,
    name,
    formula
  };
}

export function formToStore(form) {
  const { calculatedVariables } = form;

  return calculatedVariables.reduce((acc, cv) => {
    const state = formToState(cv);

    return {
      ...acc,
      [state.id]: state
    };
  }, {});
}

export function storeToForm(currentStore) {
  const calculatedVariables = [];

  Object.keys(currentStore).forEach(key => {
    const { id, label, name, formula } = currentStore[key];
    calculatedVariables.push({
      id,
      label,
      name,
      formula
    });
  });

  return {
    ...defaultForm,
    calculatedVariables
  };
}

const Factory = (currentStore = {}) => {
  return {
    formToStore: form => {
      if (form) currentStore = formToStore(form);
      return currentStore;
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
