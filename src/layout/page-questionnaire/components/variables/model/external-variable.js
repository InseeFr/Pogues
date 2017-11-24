import { uuid } from 'utils/utils';

export const defaultForm = {
  name: '',
  label: '',
  externalVariables: [],
};

export function formToState(form) {
  const { name, label } = form;
  const id = form.id || uuid();

  return {
    id,
    name,
    label,
  };
}

export function formToStore(form) {
  const { externalVariables } = form;

  return externalVariables.reduce((acc, cv) => {
    const state = formToState(cv);

    return {
      ...acc,
      [state.id]: state,
    };
  }, {});
}

export function storeToForm(currentStore) {
  const externalVariables = [];

  Object.keys(currentStore).forEach(key => {
    const { id, name, label } = currentStore[key];
    externalVariables.push({
      id,
      name,
      label,
    });
  });

  return {
    ...defaultForm,
    externalVariables,
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
    },
  };
};

export default Factory;
