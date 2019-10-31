import { uuid } from 'utils/utils';
import { DATATYPE_NAME } from 'constants/pogues-constants';
import { sortByYAndX } from 'utils/variables/collected-variables-utils';

const { TEXT, BOOLEAN, NUMERIC, DATE, DURATION } = DATATYPE_NAME;

export const defaultState = {
  name: '',
  label: '',
  x: '',
  y: '',
  codeListReference: '',
  codeListReferenceLabel: '',
};

export const defaultForm = {
  name: '',
  label: '',
  x: '',
  y: '',
  type: TEXT,
  collectedVariables: [],
  codeListReference: '',
  codeListReferenceLabel: '',
};

function getTypings(object) {
  return {
    type: object.type,
    [TEXT]: object[TEXT],
    [NUMERIC]: object[NUMERIC],
    [DATE]: object[DATE],
    [BOOLEAN]: object[BOOLEAN],
    [DURATION]:  object[DURATION],
  };
}
export function formToState(form) {
  const { name, label, x, y, codeListReference, codeListReferenceLabel } = form;
  const id = form.id || uuid();
  
  return {
    id,
    name,
    label,
    x,
    y,
    ...getTypings(form),
    codeListReference,
    codeListReferenceLabel,
  };
}

export function formToStore(form) {
  const { collectedVariables } = form;

  return collectedVariables.reduce((acc, cv) => {
    const state = formToState(cv);
 
    return {
      ...acc,
      [state.id]: state,
    };
  }, {});
}

export function storeToForm(currentStore) {
  const collectedVariables = Object.keys(currentStore)
    .sort(sortByYAndX(currentStore))
    .map(key => {
      const {
        id,
        name,
        label,
        x,
        y,
        codeListReference,
        codeListReferenceLabel,
      } = currentStore[key];
      return {
        id,
        name,
        label,
        x,
        y,
        ...getTypings(currentStore[key]),
        codeListReference,
        codeListReferenceLabel,
      };
    });

  return {
    ...defaultForm,
    collectedVariables,
  };
}

const Factory = (currentState = [], collectedVariablesStore) => {
  let currentStore = currentState.reduce((acc, key) => {
    return {
      ...acc,
      [key]: collectedVariablesStore[key],
    };
  }, {});

  return {
    formToStore: form => {
      if (form) currentStore = formToStore(form);
      return currentStore;
    },
    formToComponentState: form => {
      if (form) currentStore = formToStore(form);
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
