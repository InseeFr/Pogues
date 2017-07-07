import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import ResponseFormatSimple, { defaultResponseFormatSimpleForm } from './response-format-simple.js';
import ResponseFormatSingle, { defaultResponseFormatSingleForm } from './response-format-single.js';
import ResponseFormatMultiple from './response-format-multiple.js';
import ResponseFormatTable from './response-format-table.js';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

export const defaultResponseFormatState = {
  type: undefined,
};

function modelToState(model) {
  const { type, responses, dimensions } = model;
  let datatypeData = {};

  if (type && responses.length > 0) {
    if (type === SIMPLE) {
      const [{ datatype: { typeName, type, ...data }, mandatory }] = responses;
      datatypeData = ResponseFormatSimple.modelToState({ mandatory, type: typeName, ...data });
    } else if (type === SINGLE_CHOICE) {
      const [{ datatype: { visHint }, mandatory, codeListReference }] = responses;
      datatypeData = ResponseFormatSingle.modelToState({ mandatory, visHint, codesListId: codeListReference });
    } else if (type === MULTIPLE_CHOICE) {
      // datatypeData = ResponseFormatMultiple.modelToState();
    } else if (type === TABLE) {
      datatypeData = ResponseFormatTable.modelToState({ dimensions, responses });
    }
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

function stateToModel(state) {}

function stateToForm(responseFormatState, activeCodeLists, activeCodes) {
  const { type, [type]: datatypeState } = responseFormatState;
  let formDataType = {};

  if (type === SIMPLE) {
    formDataType = ResponseFormatSimple.stateToForm(datatypeState);
  } else if (type === SINGLE_CHOICE) {
    formDataType = ResponseFormatSingle.stateToForm(datatypeState, activeCodeLists, activeCodes);
  } else if (type === TABLE) {
    formDataType = ResponseFormatSingle.stateToForm(datatypeState, activeCodeLists, activeCodes);
  }

  const responseFormat = {
    type: type,
    [type]: formDataType,
  };

  return {
    ...defaultResponseFormatSimpleForm,
    ...defaultResponseFormatSingleForm,
    ...responseFormat,
  };
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
};
