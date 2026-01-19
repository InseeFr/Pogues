import { createListFactory } from '../lists/utils';

export const defaultState = {
  id: '',
  label: '',
};

export function formToState(form) {
  const { id, label, name = '', urn = '', suggesterParameters = {} } = form;
  return {
    id,
    name,
    label,
    urn,
    suggesterParameters,
  };
}

export function stateComponentToForm({
  id = '',
  name = '',
  label = '',
  urn = '',
  suggesterParameters = {},
}) {
  return {
    id,
    name,
    label,
    urn,
    suggesterParameters,
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
