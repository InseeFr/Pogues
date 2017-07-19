import { CODES_LIST_INPUT_ENUM, DATATYPE_NAME, DATATYPE_VIS_HINT } from 'constants/pogues-constants';
import CodesList, { defaultCodesListForm } from './codes-list';
import Response from './response';

const { CHECKBOX } = DATATYPE_VIS_HINT;
const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
const { TEXT } = DATATYPE_NAME;

export const defaultSingleForm = {
  mandatory: false,
  visHint: CHECKBOX,
  codesListId: '',
  type: NEW,
  [NEW]: { ...defaultCodesListForm },
  [REF]: {},
  [QUESTIONNAIRE]: {},
};

export const defaultSingleState = {
  mandatory: undefined,
  visHint: undefined,
  codesListId: undefined,
  type: undefined,
};

export const defaultSingleModel = {
  responses: [],
};

export const defaultSingleResponseModel = {
  maxLength: 1,
  pattern: '',
};

function formToState(form) {
  const { mandatory, visHint, type, [type]: codesListForm } = form;
  const codesListState = CodesList.formToState(codesListForm);
  const state = {
    mandatory,
    visHint,
    type,
  };

  if (codesListState.codesList.label !== '') {
    state.codesListId = codesListState.codesList.id;
    state[type] = codesListState;
  }

  return {
    ...defaultSingleState,
    ...state,
  };
}

function stateToForm(state, activeCodeLists, activeCodes) {
  const { codesListId, visHint, mandatory } = state;
  const codesList = activeCodeLists[codesListId];
  const form = {
    mandatory,
    visHint,
  };

  if (codesList) {
    form.codesListId = codesListId;
    const codes = codesList.codes;

    // @TODO: This could change
    form[NEW] = {
      codesList: {
        id: codesList.id,
        label: codesList.label,
      },
      codes: codes.map(key => {
        return {
          id: key,
          code: activeCodes[key].code,
          label: activeCodes[key].label,
        };
      }),
    };
  }

  return {
    ...defaultSingleForm,
    ...form,
  };
}

function stateToModel(state) {
  const { mandatory, visHint, codesListId } = state;
  const responses = [];
  responses.push(
    Response.stateToModel({
      mandatory,
      codeListReference: codesListId,
      type: TEXT,
      datatype: { ...defaultSingleResponseModel, visHint },
    })
  );

  return {
    ...defaultSingleModel,
    ...{
      responses,
    },
  };
}

function modelToState(model) {
  // @TODO: This logic should be moved to the Response transformer
  const { responses: [{ datatype: { visHint }, mandatory, codeListReference: codesListId }] } = model;
  const responseFormatSingleData = {
    codesListId,
    mandatory,
    visHint,
  };

  return {
    ...defaultSingleState,
    ...responseFormatSingleData,
  };
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
