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

export const defaultControlState = [];

export const defaultControlModel = {
  controls: [],
};

function formToState(form) {
  const { controls } = form;
  return _.cloneDeep(controls);
}

function stateToForm(state) {
  return {
    ...defaultControlForm,
    controls: _.cloneDeep(state),
  };
}

function stateToModel(state) {
  return {
    controls: state.map(c => {
      const { label, condition, message, type, during_collect, post_collect } = c;
      return {
        label,
        condition,
        message,
        type,
        during_collect,
        post_collect,
      };
    }),
  };
}

function modelToState(model) {
  const state = [];
  const { controls } = model;
  controls.forEach(d => {
    state.push(_.cloneDeep(d));
  });
  return state;
}

export default {
  formToState,
  stateToForm,
  stateToModel,
  modelToState,
};
