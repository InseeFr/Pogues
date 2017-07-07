import { QUESTION_TYPE_ENUM, DATATYPE_NAME } from 'constants/pogues-constants';

const { SIMPLE } = QUESTION_TYPE_ENUM;
const { TEXT } = DATATYPE_NAME;

export const defaultResponseFormatSimpleState = {
  type: undefined,
  mandatory: undefined,
};

export const defaultResponseFormatSimpleForm = {
  [SIMPLE]: {
    mandatory: false,
    type: TEXT,
    [TEXT]: {
      maxLength: 255,
    },
  },
};

function modelToState(model) {
  const { type, mandatory, ...data } = model;
  const responseFormatSimpleData = {
    type,
    mandatory,
    [type]: data,
  };

  return {
    ...defaultResponseFormatSimpleState,
    ...responseFormatSimpleData,
  };
}

function stateToModel(state) {}

function stateToForm(state) {
  return { ...state };
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
};
