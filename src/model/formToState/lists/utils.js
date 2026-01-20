import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';

export function createListFactory(
  defaultState,
  formToState,
  stateComponentToForm,
  codesListsStore,
  currentState = {},
) {
  if (codesListsStore && currentState.id) {
    currentState = merge(
      cloneDeep(defaultState),
      codesListsStore[currentState.id],
    );
  } else {
    currentState = cloneDeep(defaultState);
  }

  return {
    formToStateComponent: (form) => {
      if (form) currentState = formToState(form);
      return currentState;
    },
    formToComponentState: (form) => {
      if (form) currentState = formToState(form);
      return currentState;
    },
    formToState: (form) => {
      if (form) currentState = formToState(form);
      return currentState;
    },
    stateComponentToForm: () => {
      return stateComponentToForm(currentState);
    },
    getStore: () => {
      return {
        [currentState.id]: currentState,
      };
    },
  };
}
