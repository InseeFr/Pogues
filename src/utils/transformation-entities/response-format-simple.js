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
  mandatory: false,
  type: TEXT,
  [TEXT]: {
    maxLength: 255,
    pattern: '',
  },
};

function transformationFormToState(form) {
  const { type, mandatory, [type]: simpleForm } = form;

  return {
    type,
    mandatory,
    [type]: { ...simpleForm },
  };
}

function transformationModelToState(model) {
  const { typeName, type, mandatory, ...data } = model;
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

function transformationStateToForm(currentState) {
  const { mandatory, type, [type]: simpleState } = currentState;

  return {
    ...defaultSimpleForm,
    mandatory,
    type,
    [type]: {
      ...simpleState,
    },
  };
}

function transformationStateToModel(currentState) {
  const { mandatory, type, [type]: simpleState } = currentState;
  const responses = [];
  responses.push(Response.stateToModel({ mandatory, type, datatype: simpleState }));

  return {
    responses,
  };
}

const SimpleTransformerFactory = (conf = {}) => {
  const { initialState } = conf;

  let currentState = initialState || defaultSimpleState;

  return {
    formToState: form => {
      currentState = transformationFormToState(form);
      return currentState;
    },
    modelToState: responses => {
      const { responses: [{ datatype, mandatory }] } = responses;
      currentState = transformationModelToState({ ...datatype, mandatory });
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

export default SimpleTransformerFactory;
