import { uuid } from 'utils/utils';

export const controlsFormDefault = {
  label: '',
  condition: '',
  message: '',
  type: 'INFO',
  during_collect: false,
  post_collect: false,
  controls: [],
};

function transformationFormToState(form) {
  const { controls } = form;

  return controls.reduce((acc, control) => {
    const { label, condition, message, type, during_collect, post_collect } = control;
    const id = control.id || uuid();

    return {
      ...acc,
      [id]: {
        id,
        label,
        condition,
        message,
        type,
        during_collect,
        post_collect,
      },
    };
  }, {});
}

function transformationModelToState(model = []) {
  return model.reduce((acc, control) => {
    const {
      Description: label,
      Expression: condition,
      FailMessage: message,
      type,
      during_collect,
      post_collect,
    } = control;
    const id = control.id || uuid();
    return {
      ...acc,
      [id]: {
        id,
        label,
        condition,
        message,
        type,
        during_collect,
        post_collect,
      },
    };
  }, {});
}

function transformationStateToForm(currentState) {
  const controls = [];

  Object.keys(currentState).forEach(key => {
    const { id, label, condition, message, type, during_collect, post_collect } = currentState[key];
    controls.push({
      id,
      label,
      condition,
      message,
      type,
      during_collect,
      post_collect,
    });
  });

  return {
    ...controlsFormDefault,
    controls,
  };
}

function transformationStateToModel(currentState) {
  const controls = [];

  Object.keys(currentState).forEach(key => {
    const {
      id,
      label: Description,
      condition: Expression,
      message: FailMessage,
      type,
      during_collect,
      post_collect,
    } = currentState[key];

    controls.push({
      id,
      Description,
      Expression,
      FailMessage,
      type,
      during_collect,
      post_collect,
    });
  });

  return controls;
}

const ControlTransformerFactory = (conf = {}) => {
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

export default ControlTransformerFactory;
