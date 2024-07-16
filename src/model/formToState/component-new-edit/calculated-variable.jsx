import { uuid } from '../../../utils/utils';
import { DATATYPE_NAME } from '../../../constants/pogues-constants';
import { defaultTypageForm } from './typage';

const { TEXT } = DATATYPE_NAME;

export const defaultState = {
  id: null,
  label: '',
  name: '',
  formula: '',
  type: TEXT,
  scope: '',
};

export const defaultForm = {
  label: '',
  name: '',
  formula: '',
  scope: '',
  calculatedVariables: [],
  ...defaultTypageForm,
};

export function formToState(form) {
  const { label, name, formula, scope, type, [type]: simpleForm } = form;
  const id = form.id || uuid();

  return {
    id,
    label,
    name,
    formula,
    type,
    scope,
    [type]: { ...simpleForm },
  };
}

export function formToStore(form) {
  const { calculatedVariables } = form;

  return calculatedVariables.reduce((acc, cv) => {
    const state = formToState(cv);
    return {
      ...acc,
      [state.id]: state,
    };
  }, {});
}

export function storeToForm(currentStore) {
  const calculatedVariables = [];

  Object.keys(currentStore).forEach(key => {
    const {
      id,
      label,
      name,
      formula,
      type,
      scope,
      [type]: simpleState,
    } = currentStore[key];
    calculatedVariables.push({
      id,
      label,
      name,
      formula,
      type,
      scope,
      [type]: {
        ...simpleState,
      },
    });
  });

  return {
    ...defaultForm,
    calculatedVariables,
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
