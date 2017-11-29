import ResponseFormat from './response-format';
import Control from './control';
import Declaration from './declaration';
import Redirection from './redirection';
import CollectedVariable from './collected-variable';
import CalculatedVariable from './calculated-variable';
import ExternalVariable from './external-variable';

import { uuid, nameFromLabel } from 'utils/utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

export const defaultState = {
  id: '',
  type: '',
  parent: '',
  weight: '',
  label: '',
  name: '',
  controls: [],
  declarations: [],
  redirections: [],
  collectedVariables: [],
  children: [],
  responseFormat: {},
};

export function formToState(form, transformers) {
  const { name, label, responseFormat, declarations, controls, redirections, collectedVariables } = form;

  transformers.calculatedVariable.formToStore(form.calculatedVariables);
  transformers.externalVariable.formToStore(form.externalVariables);

  return {
    name: name || nameFromLabel(label),
    declarations: transformers.declaration.formToComponentState(declarations),
    controls: transformers.control.formToComponentState(controls),
    redirections: transformers.redirection.formToComponentState(redirections),
    label: label,
    responseFormat: transformers.responseFormat.formToState(responseFormat),
    collectedVariables: transformers.collectedVariable.formToComponentState(collectedVariables),
  };
}

export function stateToForm(currentState, transformers) {
  const { label, name, type } = currentState;
  const form = {
    label: label || '',
    name: name || '',
    declarations: transformers.declaration.stateToForm(),
    controls: transformers.control.stateToForm(),
    redirections: transformers.redirection.stateToForm(),
  };

  if (type === QUESTION) {
    form.responseFormat = transformers.responseFormat.stateToForm();
    form.calculatedVariables = transformers.calculatedVariable.storeToForm();
    form.externalVariables = transformers.externalVariable.storeToForm();
    form.collectedVariables = transformers.collectedVariable.storeToForm();
  }

  return form;
}

const Factory = (initialState = {}, stores = {}) => {
  const {
    componentsStore,
    calculatedVariablesStore,
    externalVariablesStore,
    collectedVariablesStore,
    codesListsStore,
  } = stores;
  let currentStore = componentsStore || {};

  let currentState = {
    ...defaultState,
    ...initialState,
    id: initialState.id || uuid(),
  };

  const transformers = {
    control: Control(currentState.controls),
    declaration: Declaration(currentState.declarations),
    redirection: Redirection(currentState.redirections),
    responseFormat: ResponseFormat(currentState.responseFormat, codesListsStore),
    collectedVariable: CollectedVariable(currentState.collectedVariables, collectedVariablesStore),
    calculatedVariable: CalculatedVariable(calculatedVariablesStore),
    externalVariable: ExternalVariable(externalVariablesStore),
  };

  return {
    formToState: form => {
      currentState = {
        ...currentState,
        ...formToState(form, transformers),
      };
      return currentState;
    },
    formToStore: (form, id) => {
      currentState = {
        ...currentState,
        ...formToState(form, transformers),
      };
      currentStore = {
        ...currentStore,
        [id]: currentState,
      };
      return currentStore;
    },
    stateToForm: () => {
      return stateToForm(currentState, transformers);
    },
    getStore: () => {
      return {
        ...currentStore,
        [currentState.id]: currentState,
      };
    },
    getCodesListStore: () => {
      return transformers.responseFormat.getCodesListStore();
    },
    getCalculatedVariablesStore: () => {
      return transformers.calculatedVariable.getStore();
    },
    getExternalVariablesStore: () => {
      return transformers.externalVariable.getStore();
    },
    getCollectedVariablesStore: () => {
      return transformers.collectedVariable.getStore();
    },
    getNormalizedValues: form => {
      // Values ready to be validated
      return {
        name: form.name,
        label: form.label,
        responseFormat: transformers.responseFormat.getNormalizedValues(form.responseFormat),
      };
    },
  };
};

export default Factory;
