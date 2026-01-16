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
  console.log('stateComponentToForm - VARIABLE', id, label);
  return {
    id,
    name,
    label,
  };
}

export const Factory = (currentState) => {
  return createListFactory(
    defaultState,
    formToState,
    stateComponentToForm,
    currentState,
  );
};

export default Factory;
