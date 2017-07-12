import { CODES_LIST_INPUT_ENUM, DATATYPE_VIS_HINT } from 'constants/pogues-constants';
import CodesList, { defaultCodesListForm } from './codes-list';

const { CHECKBOX } = DATATYPE_VIS_HINT;
const { NEW } = CODES_LIST_INPUT_ENUM;

export const defaultResponseFormatSingleState = {
  mandatory: undefined,
  visHint: undefined,
  codesListId: undefined,
};

export const defaultResponseFormatSingleForm = {
  mandatory: false,
  visHint: CHECKBOX,
  codesListId: '',
  type: NEW,
  [NEW]: { ...defaultCodesListForm },
};

function modelToState(model) {
  const { mandatory, visHint, codesListId } = model;
  const responseFormatSingleData = {
    codesListId,
    mandatory,
    visHint,
  };

  return {
    ...defaultResponseFormatSingleState,
    ...responseFormatSingleData,
  };
}

function stateToModel() {
  return {};
}

function stateToForm(state, activeCodeLists, activeCodes) {
  const { codesListId, visHint, mandatory } = state;
  const codesList = activeCodeLists[state.codesListId] || {};
  const codes = codesList.codes || [];
  const responseFormatSingleForm = {
    codesListId,
    mandatory,
    visHint,
  };

  if (codesList) {
    responseFormatSingleForm[NEW] = {
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
    ...defaultResponseFormatSingleForm,
    ...responseFormatSingleForm,
  };
}

function formToState(form) {
  const { mandatory, visHint, codesListId, type, [type]: codesListForm } = form;
  const responseFormatSingleState = {
    mandatory,
    visHint,
    type,
  };
  const stateCodesList = CodesList.formToState(codesListForm);

  responseFormatSingleState.codesListId = stateCodesList.codesList.id;
  responseFormatSingleState[type] = stateCodesList;

  return {
    ...defaultResponseFormatSingleState,
    ...responseFormatSingleState,
  };
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
