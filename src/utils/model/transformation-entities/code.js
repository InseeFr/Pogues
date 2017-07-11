import { nameFromLabel } from 'utils/name-utils';

export const defaultCodeState = {
  id: undefined,
  code: undefined,
  label: undefined,
  value: undefined,
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

export default {
  modelToState,
  stateToModel,
};
