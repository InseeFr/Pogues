import { nameFromLabel } from 'utils/name-utils';
import { uuid } from 'utils/data-utils';

export const defaultCodeState = {
  id: undefined,
  code: undefined,
  label: undefined,
  value: undefined,
};

export const defaultCodeForm = {
  id: '',
  code: '',
  label: '',
  value: '',
};

function modelToState(model) {
  const { id, label, value } = model;
  const codeData = {
    id,
    code: nameFromLabel(label),
    label,
    value,
  };

  return {
    ...defaultCodeState,
    ...codeData,
  };
}

function stateToModel(state) {}

function formToState(form) {
  const { id, code, label, value } = form;
  const codeState = {
    id: id || uuid(),
    code,
    label,
    value,
  };

  return {
    ...defaultCodeForm,
    ...codeState,
  };
}

export default {
  modelToState,
  stateToModel,
  formToState,
};
