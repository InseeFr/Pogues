import { createListFactory } from './utils';

export const defaultState = {
  id: '',
  label: '',
};

export function formToState(form) {
  return form;
}

export function stateComponentToForm(nomenclature) {
  return nomenclature;
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
