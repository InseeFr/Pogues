import { uuid } from 'utils/data-utils';
import { VARIABLES_TYPES } from 'constants/pogues-constants';

const { COLLECTED } = VARIABLES_TYPES;

export const defaultCollectedVariableForm = {
  name: '',
  label: '',
  responseFormat: '',
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

function transformationModelToComponentState(model = []) {
  return model.filter(r => r.CollectedVariableReference).map(r => r.CollectedVariableReference);
}

function transformationStoreToForm(currentStore, componentState = {}) {
  const collectedVariables = [];
  const responseFormat = componentState.responseFormat || '';

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
    responseFormat,
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
      type: COLLECTED,
    });
  });

  return collectedVariables;
}

const CollectedVariableTransformerFactory = (conf = {}) => {
  const { initialStore, collectedVariablesStore } = conf;

  let currentStore = initialStore || {};

  return {
    formToStore: form => {
      currentStore = transformationFormToStore(form);
      return currentStore;
    },
    formToComponentState: form => {
      const { collectedVariables } = form;
      return collectedVariables.map(cv => cv.id);
    },
    modelToStore: model => {
      currentStore = transformationModelToStore(model);
      return currentStore;
    },
    modelToComponentState: responses => {
      return transformationModelToComponentState(responses);
    },
    storeToForm: () => {
      return transformationStoreToForm(currentStore);
    },
    stateComponentToForm: componentState => {
      if (componentState) {
        currentStore = componentState.collectedVariables.map(key => {
          return { ...collectedVariablesStore[key] };
        });
      }

      return transformationStoreToForm(currentStore, componentState);
    },
    storeToModel: () => {
      return transformationStoreToModel(currentStore);
    },
  };
};

export default CollectedVariableTransformerFactory;
