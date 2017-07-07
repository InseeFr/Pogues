import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;

export const defaultResponseFormatSingleState = {
  mandatory: undefined,
  visHint: undefined,
  codesListId: undefined,
};

export const defaultResponseFormatSingleForm = {
  [SINGLE_CHOICE]: {
    mandatory: false,
    codesList: '',
    codes: [],
  },
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
  const codes = codesList.codes || []

  return {
    codesListId,
    mandatory,
    visHint,
    codesList: {
      id: codesList.id || '',
      label: codesList.label || '',
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

export default {
  modelToState,
  stateToModel,
  stateToForm,
};
