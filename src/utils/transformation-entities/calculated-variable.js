import { uuid } from 'utils/data-utils';
import { VARIABLES_TYPES } from 'constants/pogues-constants';

const { CALCULATED } = VARIABLES_TYPES;

export const defaultCalculatedVariableForm = {
  label: '',
  name: '',
  formula: '',
  calculatedVariables: [],
};

function transformationFormToStore(form) {
  const { calculatedVariables } = form;

  return calculatedVariables.reduce((acc, cv) => {
    const { label, name, formula } = cv;
    const id = cv.id || uuid();

    return {
      ...acc,
      [id]: {
        id,
        label,
        name,
        formula,
      },
    };
  }, {});
}

function transformationModelToStore(model = []) {
  return model.reduce((acc, cv) => {
    const { Label: label, Name: name, Formula: formula } = cv;
    const id = cv.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        label,
        name,
        formula,
      },
    };
  }, {});
}

function transformationStoreToForm(currentStore) {
  const calculatedVariables = [];

  Object.keys(currentStore).forEach(key => {
    const { id, label, name, formula } = currentStore[key];
    calculatedVariables.push({
      id,
      label,
      name,
      formula,
    });
  });

  return {
    ...defaultCalculatedVariableForm,
    calculatedVariables,
  };
}

function transformationStoreToModel(currentStore) {
  const calculatedVariables = [];

  Object.keys(currentStore).forEach(key => {
    const { id, label: Label, name: Name, formula: Formula } = currentStore[key];
    calculatedVariables.push({
      id,
      Label,
      Name,
      Formula,
      type: CALCULATED,
    });
  });

  return calculatedVariables;
}

const CalculatedVariableTransformerFactory = (conf = {}) => {
  const { initialStore } = conf;

  let currentStore = initialStore || {};

  return {
    formToStore: form => {
      currentStore = transformationFormToStore(form);
      return currentStore;
    },
    modelToStore: model => {
      currentStore = transformationModelToStore(model);
      return currentStore;
    },
    storeToForm: () => {
      return transformationStoreToForm(currentStore);
    },
    storeToModel: () => {
      return transformationStoreToModel(currentStore);
    },
  };
};

export default CalculatedVariableTransformerFactory;
