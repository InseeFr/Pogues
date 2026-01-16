import { createListFactory } from '../lists/utils';

export const defaultState = {
  id: '',
  label: '',
  name: '',
};

export function formToState(form) {
  const { id, label, name } = form;
  return {
    id,
    name,
    label,
  };
}

export function stateComponentToForm({ id = '', name = '', label = '' }) {
  return {
    id,
    name,
    label,
  };
}

export const Factory = (variablesStore, currentState) => {
  return createListFactory(
    defaultState,
    formToState,
    stateComponentToForm,
    variablesStore,
    currentState,
  );
};

export default Factory;
