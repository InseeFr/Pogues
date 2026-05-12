import { createListFactory } from './utils';

export const defaultState = {
  id: '',
  label: '',
  name: '',
  scope: '',
  optionFilter: '',
};

export function formToState(form) {
  const { id, label, name, scope, optionFilter } = form;

  return {
    id,
    name,
    label,
    scope,
    optionFilter,
  };
}

export function stateComponentToForm({
  id = '',
  name = '',
  label = '',
  scope = '',
  optionFilter = '',
}) {
  return {
    id,
    name,
    label,
    scope,
    optionFilter,
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
