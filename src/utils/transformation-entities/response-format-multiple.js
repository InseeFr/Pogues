import {
  CODES_LIST_INPUT_ENUM,
  DATATYPE_NAME,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  DATATYPE_VIS_HINT,
} from 'constants/pogues-constants';
import CodesList, { defaultCodesListForm } from './codes-list';
import Dimension from './dimension';
import Response from './response';

const { BOOLEAN, TEXT } = DATATYPE_NAME;
const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST, BOOL } = DIMENSION_FORMATS;
const { CHECKBOX } = DATATYPE_VIS_HINT;

export const defaultMultipleForm = {
  [PRIMARY]: {
    codesListId: '',
    type: NEW,
    [NEW]: { ...defaultCodesListForm },
    [REF]: {},
    [QUESTIONNAIRE]: {},
  },
  [MEASURE]: {
    type: CODES_LIST,
    [CODES_LIST]: {
      visHint: CHECKBOX,
      codesListId: '',
      type: NEW,
      [NEW]: { ...defaultCodesListForm },
      [REF]: {},
      [QUESTIONNAIRE]: {},
    },
  },
};

export const defaultMultipleState = {
  [PRIMARY]: {
    codesListId: undefined,
  },
  [MEASURE]: {
    type: undefined,
  },
};

export const defaultMultipleModel = {
  dimensions: [],
  responses: [],
};

export const defaultMultipleResponseModel = {
  maxLength: 1,
  pattern: '',
};

function formToStatePrimary(form) {
  const { type, [type]: codesListForm } = form;
  const codesListState = CodesList.formToState(codesListForm);
  return {
    type,
    codesListId: codesListState.codesList.id,
    [type]: codesListState,
  };
}

function formToStateMeasure(form) {
  const { type: typeMeasure, [typeMeasure]: measureForm } = form;
  const state = {
    type: typeMeasure,
    [typeMeasure]: {},
  };

  if (typeMeasure === CODES_LIST) {
    const { visHint, type, [type]: codesListForm } = measureForm;
    const codesListState = CodesList.formToState(codesListForm);
    state[CODES_LIST] = {
      visHint,
      type,
      codesListId: codesListState.codesList.id,
      [type]: codesListState,
    };
  }

  return state;
}

function stateToFormPrimary(state, activeCodeLists, activeCodes) {
  const { codesListId } = state;
  const codesList = activeCodeLists[codesListId];
  const form = {};

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
    ...defaultMultipleForm[PRIMARY],
    ...form,
  };
}

function stateToFormMeasure(state, activeCodeLists, activeCodes) {
  const { type: typeMeasure, [typeMeasure]: measureState } = state;
  const form = {
    type: typeMeasure,
    [typeMeasure]: {},
  };

  if (typeMeasure === CODES_LIST) {
    const { visHint, codesListId } = measureState;
    const codesList = activeCodeLists[codesListId];
    const codesListForm = {
      visHint,
    };

    if (codesList) {
      codesListForm.codesListId = codesListId;
      const codes = codesList.codes;

      // @TODO: This could change
      codesListForm[NEW] = {
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

    form[CODES_LIST] = {
      ...defaultMultipleForm[MEASURE][CODES_LIST],
      ...codesListForm,
    };
  }

  return {
    ...defaultMultipleForm[MEASURE],
    ...form,
  };
}

function getDimension(type, dimensions) {
  const result = dimensions.filter(d => {
    return d.dimensionType === type;
  });
  return result.length > 0 ? result[0] : {};
}

function formToState(form) {
  const { [PRIMARY]: primaryForm, [MEASURE]: measureForm } = form;
  const state = {
    [PRIMARY]: formToStatePrimary(primaryForm),
    [MEASURE]: formToStateMeasure(measureForm),
  };
  return {
    ...defaultMultipleState,
    ...state,
  };
}

function stateToForm(state, activeCodeLists, activeCodes) {
  const { [PRIMARY]: primaryState, [MEASURE]: measureState } = state;
  const form = {
    [PRIMARY]: stateToFormPrimary(primaryState, activeCodeLists, activeCodes),
    [MEASURE]: stateToFormMeasure(measureState, activeCodeLists, activeCodes),
  };
  return {
    ...defaultMultipleForm,
    ...form,
  };
}

function stateToModel(state) {
  const { [PRIMARY]: primaryState, [MEASURE]: { type: typeMeasure, [typeMeasure]: measureState } } = state;
  const dimensions = [];
  const responses = [];
  dimensions.push(Dimension.stateToModel({ ...primaryState, type: PRIMARY }));
  dimensions.push(Dimension.stateToModel({ type: MEASURE }));

  if (typeMeasure === CODES_LIST) {
    const { codesListId, visHint } = measureState;
    responses.push(
      Response.stateToModel({
        codeListReference: codesListId,
        type: TEXT,
        datatype: { ...defaultMultipleResponseModel, visHint },
      })
    );
  } else {
    responses.push(Response.stateToModel({ type: BOOLEAN }));
  }

  return {
    ...defaultMultipleModel,
    ...{
      dimensions,
      responses,
    },
  };
}

function modelToState(model) {
  // @TODO: This logic should be moved to the Dimension and Response transformer
  const { dimensions, responses: [{ datatype: { typeName, visHint }, codeListReference: codesListId }] } = model;
  const primaryDimension = getDimension(PRIMARY, dimensions);
  const state = { ...defaultMultipleState };

  state[PRIMARY].codesListId = primaryDimension.codeListReference;

  if (typeName === BOOLEAN) {
    state[MEASURE].type = BOOL;
  } else {
    state[MEASURE].type = CODES_LIST;
    state[MEASURE][CODES_LIST] = {
      codesListId,
      visHint,
    };
  }

  return state;
}

export default {
  modelToState,
  stateToModel,
  formToState,
  stateToForm,
};
