import { DATATYPE_NAME } from 'constants/pogues-constants';

const { TEXT } = DATATYPE_NAME;

export const defaultResponseFormatSimpleState = {
  type: undefined,
  mandatory: undefined,
};

export const defaultResponseFormatSimpleForm = {
  mandatory: false,
  type: TEXT,
  [TEXT]: {
    maxLength: 255,
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

export default {
  modelToState,
  stateToModel,
};
