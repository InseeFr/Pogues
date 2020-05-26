import { uuid } from 'utils/utils';
import { DATATYPE_NAME } from 'constants/pogues-constants';
import { defaultTypageForm } from './typage';

const { TEXT } = DATATYPE_NAME;

export const defaultState = {
  id: null,
  name: '',
  label: '',
  type: TEXT,
};

export const defaultForm = {
  name: '',
  label: '',
  externalVariables: [],
  ...defaultTypageForm,
};

export function formToState(form) {
  const { name, label, type, [type]: simpleForm } = form;
  const id = form.id || uuid();

  return {
    id,
    name,
    label,
    type,
    [type]: { ...simpleForm },
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
    const { id, name, label, type, [type]: simpleState } = currentStore[key];
    externalVariables.push({
      id,
      name,
      label,
      type,
      [type]: {
        ...simpleState,
      },
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