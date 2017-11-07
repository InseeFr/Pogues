import { uuid } from 'utils/utils';

export const redirectionsFormDefault = {
  label: '',
  condition: '',
  cible: '',
  redirections: [],
};

function transformationFormToState(form) {
  const { redirections } = form;

  return redirections.reduce((acc, redirection) => {
    const { label, condition, cible } = redirection;
    const id = redirection.id || uuid();

    return {
      ...acc,
      [id]: {
        id,
        label,
        condition,
        cible,
      },
    };
  }, {});
}

function transformationModelToState(model = []) {
  return model.reduce((acc, redirection) => {
    const { label, Expression: condition, IfTrue: cible } = redirection;
    const id = redirection.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        label,
        condition,
        cible,
      },
    };
  }, {});
}

function transformationStateToForm(currentState) {
  const redirections = [];

  Object.keys(currentState).forEach(key => {
    const { id, label, condition, cible } = currentState[key];
    redirections.push({
      id,
      label,
      condition,
      cible,
    });
  });

  return {
    ...redirectionsFormDefault,
    redirections,
  };
}

function transformationStateToModel(currentState) {
  const redirections = [];

  Object.keys(currentState).forEach(key => {
    const { id, label, condition: Expression, cible: IfTrue } = currentState[key];
    redirections.push({
      id,
      label,
      Expression,
      IfTrue,
    });
  });

  return redirections;
}

const RedirectionTransformerFactory = (conf = {}) => {
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

export default RedirectionTransformerFactory;
