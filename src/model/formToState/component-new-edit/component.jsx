import ResponseFormat from './response-format';
import Control from './control';
import Declaration from './declaration';
import Redirection from './redirection';
import CollectedVariable from './collected-variable';
import CalculatedVariable from './calculated-variable';
import ExternalVariable from './external-variable';

import { uuid, nameFromLabel, verifyVariable } from '../../../utils/utils';
import { COMPONENT_TYPE } from '../../../constants/pogues-constants';

const { QUESTION, LOOP, FILTER } = COMPONENT_TYPE;

export const defaultState = {
  id: '',
  type: '',
  parent: '',
  weight: '',
  label: '',
  name: '',
  nameLoop: '',
  filter: '',
  maximum: '',
  BasedOn: '',
  controls: [],
  declarations: [],
  redirections: [],
  collectedVariables: [],
  children: [],
  responseFormat: {},
  TargetMode: [],
  filterImbriquer: [],
};

export function formToState(form, transformers) {
  const {
    name,
    label,
    responseFormat,
    declarations,
    controls,
    redirections,
    collectedVariables,
    TargetMode,
    nameLoop,
    maximum,
    minimum,
    basedOn,
    filter,
    initialMember,
    finalMember,
    addButtonLibel,
    description,
    filterImbriquer,
  } = form;

  let newName;
  if (name && !initialMember) {
    newName = name;
  } else if (label) {
    newName = nameFromLabel(label);
  } else if (initialMember) {
    newName = nameFromLabel(nameLoop);
  }

  transformers.calculatedVariable.formToStore(form.calculatedVariables);
  transformers.externalVariable.formToStore(form.externalVariables);
  return {
    name: newName,
    declarations: transformers.declaration.formToComponentState(declarations),
    controls: transformers.control.formToComponentState(controls),
    redirections: transformers.redirection.formToComponentState(redirections),
    label: verifyVariable(label),
    responseFormat: transformers.responseFormat.formToState(responseFormat),
    collectedVariables:
      transformers.collectedVariable.formToComponentState(collectedVariables),
    TargetMode: TargetMode.split(','),
    nameLoop: nameLoop,
    maximum: maximum,
    minimum: minimum,
    basedOn: basedOn,
    filter: filter,
    initialMember: initialMember,
    finalMember: finalMember,
    addButtonLibel: addButtonLibel,
    description: description,
    filterImbriquer: filterImbriquer,
  };
}

export function stateToForm(currentState, transformers, activeQuestionnaire) {
  const {
    label,
    name,
    type,
    TargetMode,
    nameLoop,
    maximum,
    basedOn,
    filter,
    initialMember,
    finalMember,
    addButtonLibel,
    description,
    filterImbriquer,
    minimum,
  } = currentState;

  let target = '';
  if (type !== LOOP && type !== '' && type !== FILTER) {
    if (label) {
      target = TargetMode.join();
    } else {
      target = activeQuestionnaire.TargetMode.join();
    }
  }
  const form = {
    label: label || '',
    name: name || nameLoop || '',
    declarations: transformers.declaration.stateToForm(),
    controls: transformers.control.stateToForm(),
    redirections: transformers.redirection.stateToForm(),
    TargetMode: target,
    nameLoop: nameLoop || name || '',
    maximum: maximum || '',
    minimum: minimum || '',
    basedOn: basedOn || '',
    filter: filter || '',
    initialMember: initialMember || '',
    finalMember: finalMember || '',
    addButtonLibel: addButtonLibel || '',
    description: description || '',
    filterImbriquer: filterImbriquer,
  };

  if (type === QUESTION) {
    form.responseFormat = transformers.responseFormat.stateToForm();
    form.calculatedVariables = transformers.calculatedVariable.storeToForm();
    form.externalVariables = transformers.externalVariable.storeToForm();
    form.collectedVariables = transformers.collectedVariable.storeToForm();
  }

  return form;
}

const Factory = (initialState = {}, stores = {}, activeQuestionnaire = {}) => {
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
    declaration: Declaration(currentState.declarations, activeQuestionnaire),
    redirection: Redirection(currentState.redirections),
    responseFormat: ResponseFormat(
      currentState.responseFormat,
      codesListsStore,
    ),
    collectedVariable: CollectedVariable(
      currentState.collectedVariables,
      collectedVariablesStore,
    ),
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
    stateToForm: (activeQuestionnaire = {}) => {
      return stateToForm(currentState, transformers, activeQuestionnaire);
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
        responseFormat: transformers.responseFormat.getNormalizedValues(
          form.responseFormat,
        ),
        collectedVariables: form.collectedVariables,
        controls: form.controls,
        declarations: form.declarations,
        redirections: form.redirections,
      };
    },
  };
};

export default Factory;
