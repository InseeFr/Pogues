import _ from 'lodash';

export const defaultControlForm = {
  label: '',
  condition: '',
  message: '',
  type: 'INFO',
  during_collect: false,
  post_collect: false,
  controls: [],
};

export const defaultControlState = {
  controls: [],
};

export const defaultControlModel = {
  controls: [],
};

function formToState(form) {
  const { controls } = form;
  return {
    ...defaultControlState,
    controls,
  };
}

function stateToForm(state) {
  const { controls } = state;
  return {
    ...defaultControlForm,
    controls: _.cloneDeep(controls),
  };
}

function stateToModel(state) {
  const { controls } = state;
  return {
    ...defaultControlModel,
    controls: _.cloneDeep(controls),
  };
}

function modelToState(model) {
  const { controls } = model;
  return {
    ...defaultControlState,
    controls: _.cloneDeep(controls),
  };
}

export default {
  formToState,
  stateToForm,
  stateToModel,
  modelToState,
};
