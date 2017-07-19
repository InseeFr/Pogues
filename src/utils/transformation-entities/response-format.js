import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import ResponseFormatSimple, { defaultSimpleForm } from './response-format-simple';
import ResponseFormatSingle, { defaultSingleForm } from './response-format-single';
import ResponseFormatMultiple, { defaultMultipleForm } from './response-format-multiple';
import ResponseFormatTable, { defaultTableForm } from './response-format-table';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

export const defaultResponseFormatForm = {
  [SIMPLE]: { ...defaultSimpleForm },
  [SINGLE_CHOICE]: { ...defaultSingleForm },
  [MULTIPLE_CHOICE]: { ...defaultMultipleForm },
  [TABLE]: { ...defaultTableForm },
  type: SIMPLE,
};

export const defaultResponseFormatState = {
  type: undefined,
};

export const defaultResponseFormatModel = {
  responseStructure: {
    dimensions: [],
  },
  responses: [],
};

function formToState(form) {
  const { type, [type]: responseFormatForm } = form;
  const state = {
    type,
  };

  if (type === SINGLE_CHOICE) {
    state[type] = ResponseFormatSingle.formToState(responseFormatForm);
  } else if (type === MULTIPLE_CHOICE) {
    state[type] = ResponseFormatMultiple.formToState(responseFormatForm);
  } else if (type === TABLE) {
    state[type] = ResponseFormatTable.formToState(responseFormatForm);
  } else {
    state[type] = { ...responseFormatForm };
  }

  return {
    ...defaultResponseFormatState,
    ...state,
  };
}

function stateToForm(state, activeCodeLists, activeCodes) {
  const { type, [type]: responseFormatState } = state;
  const form = {
    type,
  };

  if (type === SINGLE_CHOICE) {
    form[type] = ResponseFormatSingle.stateToForm(responseFormatState, activeCodeLists, activeCodes);
  } else if (type === MULTIPLE_CHOICE) {
    form[type] = ResponseFormatMultiple.stateToForm(responseFormatState, activeCodeLists, activeCodes);
  } else if (type === TABLE) {
    form[type] = ResponseFormatTable.stateToForm(responseFormatState, activeCodeLists, activeCodes);
  } else {
    form[type] = { ...responseFormatState };
  }

  return {
    ...defaultResponseFormatForm,
    ...form,
  };
}

function stateToModel(state) {
  const { type, [type]: responseFormatState } = state;
  const model = { ...defaultResponseFormatModel };

  if (type === SIMPLE) {
    const { responses } = ResponseFormatSimple.stateToModel(responseFormatState);
    model.responses = responses;
  } else if (type === SINGLE_CHOICE) {
    const { responses } = ResponseFormatSingle.stateToModel(responseFormatState);
    model.responses = responses;
  } else if (type === MULTIPLE_CHOICE) {
    const { responses, dimensions } = ResponseFormatMultiple.stateToModel(responseFormatState);
    model.responses = responses;
    model.responseStructure.dimensions = dimensions;
  } else {
    const { responses, dimensions } = ResponseFormatTable.stateToModel(responseFormatState);
    model.responses = responses;
    model.responseStructure.dimensions = dimensions;
  }
  return model;
}

function modelToState(model) {
  const { type, responses, dimensions } = model;
  let datatypeData = {};

  if (type === SIMPLE) {
    datatypeData = ResponseFormatSimple.modelToState({ responses });
  } else if (type === SINGLE_CHOICE) {
    datatypeData = ResponseFormatSingle.modelToState({ responses });
  } else if (type === MULTIPLE_CHOICE) {
    datatypeData = ResponseFormatMultiple.modelToState({ dimensions, responses });
  } else if (type === TABLE) {
    datatypeData = ResponseFormatTable.modelToState({ dimensions, responses });
  }

  const responseFormatData = {
    type,
    [type]: datatypeData,
  };

  return {
    ...defaultResponseFormatState,
    ...responseFormatData,
  };
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
