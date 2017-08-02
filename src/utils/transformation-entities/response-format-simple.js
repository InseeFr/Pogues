import _ from 'lodash';

import { DATATYPE_NAME } from 'constants/pogues-constants';
import Response, { defaultResponseModel } from './response';

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
  mandatory: false,
  type: TEXT,
  [TEXT]: {
    maxLength: 255,
    pattern: '',
  },
};

export const defaultSimpleModel = {
  responses: [
    {
      ...defaultResponseModel,
    },
  ],
};

function formToState(form) {
  const { type, mandatory, [type]: simpleForm } = form;
  return {
    type,
    mandatory,
    [type]: simpleForm,
  };
}

function stateToForm(state) {
  return {
    ..._.cloneDeep(defaultSimpleForm),
    ...state,
  };
}

function stateToModel(state) {
  const { mandatory, type, [type]: simpleState } = state;
  const responses = [];
  responses.push(Response.stateToModel({ mandatory, type, datatype: simpleState }));

  return {
    responses,
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
  formToState,
  stateToForm,
  modelToState,
  stateToModel,
};
