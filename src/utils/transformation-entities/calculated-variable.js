import { uuid } from 'utils/data-utils';

export const defaultCalculatedVariableForm = {
  label: '',
  name: '',
  formula: '',
  calculatedVariables: [],
};

// function formToState(form) {
//   const { calculatedVariables } = form;
//   return calculatedVariables.reduce((acc, cv) => {
//     const { label, name, formula } = cv;
//     const id = cv.id || uuid();
//
//     return {
//       ...acc,
//       [id]: {
//         id,
//         label,
//         name,
//         formula,
//       },
//     };
//   }, {});
// }
//
//
//
// function stateToModel(state) {
//   const calculatedVariables = [];
//
//   Object.keys(state).forEach(key => {
//     const { label, name, formula } = state[key];
//     calculatedVariables.push({
//       label,
//       name,
//       formula,
//     });
//   });
//
//   return calculatedVariables;
// }

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
    const { id, label, name, formula } = currentStore[key];
    calculatedVariables.push({
      id,
      label,
      name,
      formula,
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
