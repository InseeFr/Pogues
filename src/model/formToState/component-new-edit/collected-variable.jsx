import { DATATYPE_NAME } from '../../../constants/pogues-constants';
import { uuid } from '../../../utils/utils';
import { sortByYXAndZ } from '../../../utils/variables/collected-variables-utils';

const { TEXT } = DATATYPE_NAME;

export const defaultState = {
  name: '',
  label: '',
  x: '',
  y: '',
  z: '',
  mesureLevel: '',
  codeListReference: '',
  codeListReferenceLabel: '',
  variableReference: '',
  variableReferenceLabel: '',
  choiceType: '',
  isCollected: '1',
  alternativeLabel: '',
};

export const defaultForm = {
  name: '',
  label: '',
  x: '',
  y: '',
  z: '',
  mesureLevel: '',
  type: TEXT,
  collectedVariables: [],
  codeListReference: '',
  codeListReferenceLabel: '',
  variableReference: '',
  variableReferenceLabel: '',
  choiceType: '',
  isCollected: '1',
  alternativeLabel: '',
};

function getTypings(object) {
  return {
    type: object.type,
    // ex: [BOOLEAN]: object[BOOLEAN] or [TEXT]: object[TEXT] ; restricted to the expected type
    [object.type]: object[object.type],
  };
}
export function formToState(form, codesListsStore = {}) {
  const {
    name,
    label,
    x,
    y,
    z,
    mesureLevel,
    arbitraryVariableOfVariableId,
    codeListReference,
    codeListReferenceLabel,
    variableReference,
    variableReferenceLabel,
    choiceType,
    isCollected,
    alternativeLabel,
  } = form;
  const id = form.id || uuid();
  const resolvedVariableReferenceLabel = variableReference
    ? codesListsStore[variableReference]?.label || variableReferenceLabel
    : variableReferenceLabel;

  return {
    id,
    name,
    label,
    x,
    y,
    z,
    arbitraryVariableOfVariableId,
    isCollected,
    alternativeLabel,
    mesureLevel,
    ...getTypings(form),
    codeListReference,
    codeListReferenceLabel,
    variableReference,
    variableReferenceLabel: resolvedVariableReferenceLabel,
    choiceType,
  };
}

export function formToStore(form, codesListsStore = {}) {
  const { collectedVariables } = form;

  return collectedVariables.reduce((acc, cv) => {
    const state = formToState(cv, codesListsStore);

    return {
      ...acc,
      [state.id]: state,
    };
  }, {});
}

export function storeToForm(currentStore) {
  const collectedVariables = Object.keys(currentStore)
    .sort(sortByYXAndZ(currentStore))
    .map((key) => {
      const {
        id,
        name,
        label,
        x,
        y,
        z,
        arbitraryVariableOfVariableId,
        isCollected = '1',
        alternativeLabel,
        mesureLevel,
        codeListReference,
        codeListReferenceLabel,
        variableReference,
        variableReferenceLabel,
        choiceType,
      } = currentStore[key];
      return {
        id,
        name,
        label,
        x,
        y,
        z,
        arbitraryVariableOfVariableId,
        isCollected,
        alternativeLabel,
        mesureLevel,
        ...getTypings(currentStore[key]),
        codeListReference,
        codeListReferenceLabel,
        variableReference,
        variableReferenceLabel,
        choiceType,
      };
    });
  const mergedForm = {
    ...defaultForm,
    collectedVariables,
  };
  return mergedForm;
}

const Factory = (
  currentState = [],
  collectedVariablesStore,
  codesListsStore = {},
) => {
  let currentStore = currentState.reduce((acc, key) => {
    return {
      ...acc,
      [key]: collectedVariablesStore[key],
    };
  }, {});

  return {
    formToStore: (form) => {
      if (form) currentStore = formToStore(form, codesListsStore);
      return currentStore;
    },
    formToComponentState: (form) => {
      if (form) currentStore = formToStore(form, codesListsStore);
      currentState = Object.keys(currentStore);
      return currentState;
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
