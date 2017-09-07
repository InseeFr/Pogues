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
  const {
    typeName,
    mandatory,
    MaxLength: maxLength,
    Pattern: pattern,
    Minimum: minimum,
    Maximum: maximum,
    Decimals: decimals,
  } = model;
  const datatype = {};

  if (maxLength !== undefined) datatype.maxLength = maxLength;
  if (pattern !== undefined) datatype.pattern = pattern;
  if (minimum !== undefined) datatype.minimum = minimum;
  if (maximum !== undefined) datatype.maximum = maximum;
  if (decimals !== undefined) datatype.decimals = decimals;

  const responseFormatSimpleData = {
    type: typeName,
    mandatory,
    [typeName]: datatype,
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

function transformationStateToModel(currentState, collectedVariables) {
  const { type: typeName, mandatory } = currentState;
  const dataType = currentState[typeName];
  return {
    Response: [Response.stateToModel({ ...dataType, typeName, mandatory, collectedVariable: collectedVariables[0] })],
  };
}

const SimpleTransformerFactory = (conf = {}) => {
  const { initialState, collectedVariables } = conf;

  let currentState = initialState || defaultSimpleState;

  return {
    formToState: form => {
      currentState = transformationFormToState(form);
      return currentState;
    },
    modelToState: responses => {
      const { responses: [{ Datatype: datatype, mandatory }] } = responses;
      currentState = transformationModelToState({ ...datatype, mandatory });
      return currentState;
    },
    stateToForm: () => {
      return transformationStateToForm(currentState);
    },
    stateToModel: () => {
      return transformationStateToModel(currentState, collectedVariables);
    },
  };
};

export default SimpleTransformerFactory;
