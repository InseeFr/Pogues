import { uuid } from 'utils/utils';
import { VARIABLES_TYPES } from 'constants/pogues-constants';

const { EXTERNAL } = VARIABLES_TYPES;

export const defaultExternalVariableForm = {
  name: '',
  label: '',
  externalVariables: [],
};

function transformationFormToStore(form) {
  const { externalVariables } = form;

  return externalVariables.reduce((acc, ev) => {
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
  const externalVariables = [];

  Object.keys(currentStore).forEach(key => {
    const { id, name, label } = currentStore[key];
    externalVariables.push({
      id,
      name,
      label,
    });
  });

  return {
    ...defaultExternalVariableForm,
    externalVariables,
  };
}

function transformationStoreToModel(currentStore) {
  const externalVariables = [];

  Object.keys(currentStore).forEach(key => {
    const { id, name: Name, label: Label } = currentStore[key];
    externalVariables.push({
      id,
      Name,
      Label,
      type: EXTERNAL,
    });
  });

  return externalVariables;
}

const ExternalVariableTransformerFactory = (conf = {}) => {
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

export default ExternalVariableTransformerFactory;
