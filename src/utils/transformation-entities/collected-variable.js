import { uuid } from 'utils/data-utils';
import { VARIABLES_TYPES } from 'constants/pogues-constants';

const { EXTERNAL } = VARIABLES_TYPES;

export const defaultCollectedVariableForm = {
  name: '',
  label: '',
  collectedVariables: [],
};

function transformationFormToStore(form) {
  const { collectedVariables } = form;

  return collectedVariables.reduce((acc, ev) => {
    const { name, label } = ev;
    const id = ev.id || uuid();

    return {
      ...acc,
      [id]: {
        id,
        name,
        label,
      },
    };
  }, {});
}

function transformationModelToStore(model = []) {
  return model.reduce((acc, ev) => {
    const { Name: name, Label: label } = ev;
    const id = ev.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        name,
        label,
      },
    };
  }, {});
}

function transformationStoreToForm(currentStore) {
  const collectedVariables = [];

  Object.keys(currentStore).forEach(key => {
    const { id, name, label } = currentStore[key];
    collectedVariables.push({
      id,
      name,
      label,
    });
  });

  return {
    ...defaultCollectedVariableForm,
    collectedVariables,
  };
}

function transformationStoreToModel(currentStore) {
  const collectedVariables = [];

  Object.keys(currentStore).forEach(key => {
    const { id, name: Name, label: Label } = currentStore[key];
    collectedVariables.push({
      id,
      Name,
      Label,
      type: EXTERNAL,
    });
  });

  return collectedVariables;
}

const CollectedVariableTransformerFactory = (conf = {}) => {
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

export default CollectedVariableTransformerFactory;
