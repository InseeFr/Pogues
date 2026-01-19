import { createListFactory } from '../lists/utils';

export const defaultState = {
  id: '',
  label: '',
  name: '',
  scope: '',
};

export function formToState(form) {
  const { id, label, name, scope } = form;

  return {
    id,
    name,
    label,
    scope,
  };
}

export function stateComponentToForm({
  id = '',
  name = '',
  label = '',
  scope = '',
}) {
  return {
    id,
    name,
    label,
    scope,
  };
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
