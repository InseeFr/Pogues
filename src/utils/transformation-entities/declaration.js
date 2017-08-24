import { uuid } from 'utils/data-utils';

export const declarationsFormDefault = {
  declarationType: 'INSTRUCTION',
  label: '',
  position: 'AFTER_QUESTION_TEXT',
  ref: 0,
  declarations: [],
};

function transformationFormToState(form) {
  const { declarations } = form;

  return declarations.reduce((acc, declaration) => {
    const { declarationType, label, position } = declaration;
    const id = declaration.id || uuid();

    return {
      ...acc,
      [id]: {
        id,
        label,
        declarationType,
        position,
      },
    };
  }, {});
}

function transformationModelToState(model = []) {
  return model.reduce((acc, declaration) => {
    const { declarationType, Text: label, position } = declaration;
    const id = declaration.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        label,
        declarationType,
        position,
      },
    };
  }, {});
}

function transformationStateToForm(currentState) {
  const declarations = [];

  Object.keys(currentState).forEach(key => {
    const { id, declarationType, label, position } = currentState[key];
    declarations.push({
      id,
      label,
      declarationType,
      position,
    });
  });

  return {
    ...declarationsFormDefault,
    declarations,
  };
}

function transformationStateToModel(currentState) {
  const declarations = [];

  Object.keys(currentState).forEach(key => {
    const { id, declarationType, label: Text, position } = currentState[key];
    declarations.push({
      id,
      Text,
      declarationType,
      position,
    });
  });

  return declarations;
}

const DeclarationTransformerFactory = (conf = {}) => {
  const { initialState } = conf;

  let currentState = initialState || {};

  return {
    formToState: form => {
      currentState = transformationFormToState(form);
      return currentState;
    },
    modelToState: model => {
      currentState = transformationModelToState(model);
      return currentState;
    },
    stateToForm: () => {
      return transformationStateToForm(currentState);
    },
    stateToModel: () => {
      return transformationStateToModel(currentState);
    },
  };
};

export default DeclarationTransformerFactory;
