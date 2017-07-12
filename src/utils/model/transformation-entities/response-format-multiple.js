import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;

export const defaultResponseFormatMultipleState = {
  type: undefined,
};

export const defaultResponseFormatMultipleForm = {
};

function modelToState(model) {
  const { type, responses, dimensions } = model;
  const responseFormatMultipleData = {
    type,
  };

  return {
    ...defaultResponseFormatMultipleState,
    ...responseFormatMultipleData,
  };
}

function stateToModel(state) {}

function formToState(form) {
  return { ...form };
}

export default {
  modelToState,
  stateToModel,
  formToState,
};
