import { UI_BEHAVIOUR, CODES_LIST_INPUT_ENUM, DATATYPE_NAME, DATATYPE_VIS_HINT } from 'constants/pogues-constants';
import CodesList, { defaultCodesListForm } from './codes-list';
import Response from './response';

const { CHECKBOX } = DATATYPE_VIS_HINT;
const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
const { TEXT } = DATATYPE_NAME;

export const defaultSingleForm = {
  mandatory: false,
  hasSpecialCode: false,
  specialLabel: '',
  specialCode: '',
  specialUiBehaviour: UI_BEHAVIOUR.FIRST_INTENTION,
  specialFollowUpMessage: '',
  visHint: CHECKBOX,
  codesListId: '',
  type: NEW,
  [NEW]: { ...defaultCodesListForm },
  [REF]: {},
  [QUESTIONNAIRE]: {},
};

export const defaultSingleState = {
  mandatory: undefined,
  visHint: CHECKBOX,
  codesListId: '',
  type: NEW,
};

export const defaultSingleModel = {
  responses: [],
};

export const defaultSingleResponseModel = {
  maxLength: 1,
  pattern: '',
};

function formToState(form) {
  const {
    mandatory,
    visHint,
    type,
    [type]: codesListForm,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
  } = form;
  const codesListState = CodesList.formToState(codesListForm);
  const state = {
    mandatory,
    visHint,
    type,
    hasSpecialCode,
    specialLabel: hasSpecialCode ? specialLabel : '',
    specialCode: hasSpecialCode ? specialCode : '',
    specialUiBehaviour: hasSpecialCode ? specialUiBehaviour : UI_BEHAVIOUR.FIRST_INTENTION,
    specialFollowUpMessage: hasSpecialCode ? specialFollowUpMessage : '',
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
  const {
    codesListId,
    visHint,
    mandatory,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
  } = state;
  const codesList = activeCodeLists[codesListId];
  const form = {
    mandatory,
    visHint,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
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
  const {
    mandatory,
    visHint,
    codesListId,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
  } = state;
  const responses = [];
  const model = {
    mandatory,
    codeListReference: codesListId,
    type: TEXT,
    datatype: { ...defaultSingleResponseModel, visHint },
  };
  if (hasSpecialCode) {
    model.nonResponseModality = {
      value: specialCode,
      label: specialLabel,
      firstIntentionDisplay: specialUiBehaviour === UI_BEHAVIOUR.FIRST_INTENTION,
      invite: specialFollowUpMessage,
    };
  }
  responses.push(Response.stateToModel(model));

  return {
    ...defaultSingleModel,
    ...{
      responses,
    },
  };
}

function modelToState(model) {
  // @TODO: This logic should be moved to the Response transformer
  const {
    responses: [{ datatype: { visHint }, mandatory, nonResponseModality, codeListReference: codesListId }],
  } = model;

  const responseFormatSingleData = {
    codesListId,
    mandatory,
    visHint,
    hasSpecialCode: !!nonResponseModality,
    specialLabel: nonResponseModality ? nonResponseModality.label : '',
    specialCode: nonResponseModality ? nonResponseModality.value : '',
    specialUiBehaviour:
      nonResponseModality && !nonResponseModality.firstIntentionDisplay
        ? UI_BEHAVIOUR.SECOND_INTENTION
        : UI_BEHAVIOUR.FIRST_INTENTION,
    specialFollowUpMessage: nonResponseModality ? nonResponseModality.invite : '',
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
