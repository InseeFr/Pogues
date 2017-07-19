import { DATATYPE_NAME } from 'constants/pogues-constants';
import Response from './response';

const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;

export const defaultSimpleForm = {
  mandatory: false,
  type: TEXT,
  [TEXT]: {
    maxLength: 255,
    pattern: '',
  },
  [NUMERIC]: {
    minimum: '',
    maximum: '',
    decimals: '',
  },
  [DATE]: {},
  [BOOLEAN]: {},
};

export const defaultSimpleState = {
  type: undefined,
  mandatory: undefined,
};

export const defaultSimpleModel = {
  responses: [],
};

function stateToModel(state) {
  const { mandatory, type, [type]: simpleState } = state;
  const responses = [];
  responses.push(Response.stateToModel({ mandatory, type, datatype: simpleState }));

  return {
    ...defaultSimpleModel,
    ...{
      responses,
    },
  };
}

function modelToState(model) {
  // @TODO: This logic should be moved to the Response trn
  const { responses: [{ datatype: { typeName, type, ...data }, mandatory }] } = model;
  const responseFormatSimpleData = {
    type: typeName,
    mandatory,
    [typeName]: data,
  };

  return {
    ...defaultSimpleState,
    ...responseFormatSimpleData,
  };
}

export default {
  modelToState,
  stateToModel,
};
