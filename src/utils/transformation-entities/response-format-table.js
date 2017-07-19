import Dimension from './dimension';
import {
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  CODES_LIST_INPUT_ENUM,
  DATATYPE_NAME,
} from 'constants/pogues-constants';
import CodesList, { defaultCodesListForm } from './codes-list';
import ResponseFormatSingle from './response-format-single';

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;

export const defaultTableForm = {
  [PRIMARY]: {
    type: LIST,
    [LIST]: {
      numLinesMin: 0,
      numLinesMax: 0,
    },
    [CODES_LIST]: {
      codesListId: '',
      type: NEW,
      [NEW]: { ...defaultCodesListForm },
      [REF]: {},
      [QUESTIONNAIRE]: {},
    },
    showTotalLabel: '0',
    totalLabel: '',
  },
  [SECONDARY]: {
    showSecondaryAxis: '',
    codesListId: '',
    showTotalLabel: '0',
    totalLabel: '',
    type: NEW,
    [NEW]: { ...defaultCodesListForm },
    [REF]: {},
    [QUESTIONNAIRE]: {},
  },
  [MEASURE]: {
    label: '',
    type: SIMPLE,
    [SIMPLE]: {
      type: TEXT,
      [TEXT]: {
        maxLength: 255,
        pattern: '',
      },
      [NUMERIC]: {
        minimun: '',
        maximun: '',
        decimals: '',
      },
      [DATE]: {},
      [BOOLEAN]: {},
    },
    [SINGLE_CHOICE]: {
      codesListId: '',
      type: NEW,
      [NEW]: { ...defaultCodesListForm },
      [REF]: {},
      [QUESTIONNAIRE]: {},
    },
    measures: [],
  },
};

export const defaultTableState = {
  [PRIMARY]: {
    type: undefined,
  },
  [SECONDARY]: {
    showSecondaryAxis: undefined,
    codesListId: undefined,
    showTotalLabel: undefined,
    totalLabel: undefined,
    type: undefined,
  },
  [MEASURE]: {
    measures: [],
  },
};

function formToStatePrimary(form) {
  const { showTotalLabel, totalLabel, type: typePrimary, [typePrimary]: primaryForm } = form;
  const state = {
    showTotalLabel,
    totalLabel,
    type: typePrimary,
  };

  if (typePrimary === CODES_LIST) {
    const { type, [type]: codesListForm } = primaryForm;
    const codesListState = CodesList.formToState(codesListForm);
    state[CODES_LIST] = {
      type,
      codesListId: codesListState.codesList.id,
      [type]: codesListState,
    };
  } else {
    state[LIST] = { ...primaryForm };
  }

  return state;
}

function formToStateSecondary(form) {
  const { showSecondaryAxis, showTotalLabel, totalLabel, type, [type]: codesListForm } = form;
  const codesListState = CodesList.formToState(codesListForm);
  return {
    showSecondaryAxis,
    showTotalLabel,
    totalLabel,
    type,
    codesListId: codesListState.codesList.id,
    [type]: codesListState,
  };
}

function formToStateMeasure(form) {
  const { measures } = form;
  const measuresState = [];
  measures.forEach(m => {
    const { label, type: typeMeasure, [typeMeasure]: measureForm } = m;
    const state = {
      label,
      type: typeMeasure,
    };

    if (typeMeasure === SIMPLE) {
      state[SIMPLE] = { ...measureForm };
    } else {
      state[SINGLE_CHOICE] = ResponseFormatSingle.formToState(measureForm);
    }
    measuresState.push(state);
  });

  return {
    measures: measuresState,
  };
}

function stateToFormPrimary(state, activeCodeLists, activeCodes) {
  const { showTotalLabel, totalLabel, type: typePrimary, [typePrimary]: primaryState } = state;
  const form = {
    ...defaultTableForm[PRIMARY],
    showTotalLabel,
    totalLabel,
    type: typePrimary,
  };

  if (typePrimary === LIST) {
    form[LIST] = { ...primaryState };
  } else {
    const { codesListId } = primaryState;
    const codesList = activeCodeLists[codesListId];
    if (codesList) {
      form[CODES_LIST].codesListId = codesListId;
      const codes = codesList.codes;

      // @TODO: This could change
      form[CODES_LIST][NEW] = {
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
  }

  return form;
}

function stateToFormSecondary(state, activeCodeLists, activeCodes) {
  const { showSecondaryAxis, showTotalLabel, totalLabel, codesListId, type } = state;
  const codesList = activeCodeLists[codesListId];
  const form = {
    ...defaultTableForm[SECONDARY],
    showSecondaryAxis,
    showTotalLabel,
    totalLabel,
    type,
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

  return form;
}

function stateToFormMeasure(state, activeCodeLists, activeCodes) {
  const { measures } = state;
  const measuresForm = [];

  measures.forEach(m => {
    const { label, type: typeMeasure, [typeMeasure]: measureState } = m;
    const form = {
      label,
      type: typeMeasure,
    };

    if (typeMeasure === SIMPLE) {
      form[SIMPLE] = { ...measureState };
    } else {
      form[SINGLE_CHOICE] = ResponseFormatSingle.stateToForm(measureState, activeCodeLists, activeCodes);
    }

    measuresForm.push(form);
  });

  return {
    ...defaultTableForm[MEASURE],
    measures: measuresForm,
  };
}

function getDimensionsByType(type, dimensions) {
  return dimensions.filter(d => d.dimensionType === type)[0];
}

function getMeasures(dimensions) {
  return dimensions.reduce((acc, d) => {
    if (d.dimensionType === MEASURE) acc.push(d);
    return acc;
  }, []);
}

function formToState(form) {
  const { [PRIMARY]: primaryForm, [SECONDARY]: secondaryForm, [MEASURE]: measureForm } = form;
  const state = {
    [PRIMARY]: formToStatePrimary(primaryForm),
    [SECONDARY]: formToStateSecondary(secondaryForm),
    [MEASURE]: formToStateMeasure(measureForm),
  };
  return {
    ...defaultTableState,
    ...state,
  };
}

function stateToForm(state, activeCodeLists, activeCodes) {
  const { [PRIMARY]: primaryState, [SECONDARY]: secondaryState, [MEASURE]: measureState } = state;
  const form = {
    [PRIMARY]: stateToFormPrimary(primaryState, activeCodeLists, activeCodes),
    [SECONDARY]: stateToFormSecondary(secondaryState, activeCodeLists, activeCodes),
    [MEASURE]: stateToFormMeasure(measureState, activeCodeLists, activeCodes),
  };
  return {
    ...defaultTableForm,
    ...form,
  };
}

function modelToState(model) {
  const { dimensions, responses } = model;
  const responseFormatTableData = {};
  const dimensionPrymaryState = getDimensionsByType(PRIMARY, dimensions);
  const dimensionSecondaryState = getDimensionsByType(SECONDARY, dimensions);
  const measuresStates = getMeasures(dimensions);
  let responseOffset = 1;

  responseFormatTableData.dimensionPrymary = Dimension.modelToState(dimensionPrymaryState);

  if (responseFormatTableData.dimensionPrymary.mainDimensionFormat === LIST)
    responseOffset = responseFormatTableData.dimensionPrymary.numLinesMax || responseOffset;

  if (dimensionSecondaryState)
    responseFormatTableData.dimensionSecondary = Dimension.modelToState(dimensionSecondaryState);

  responseFormatTableData.measures = measuresStates.map((m, index) =>
    Dimension.modelToState({ ...m, response: responses[index * responseOffset] })
  );
  return {
    ...defaultTableState,
    ...responseFormatTableData,
  };
}

function stateToModel(state) {}

export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
