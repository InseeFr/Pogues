import Dimension from './dimension';
import {
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  CODES_LIST_INPUT_ENUM,
  DATATYPE_NAME,
} from 'constants/pogues-constants';
import CodesList, { defaultCodesListForm } from './codes-list';
import ResponseFormatSimple from './response-format-simple';
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
        maximum: '',
        minimum: '',
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
    showTotalLabel: '0',
    totalLabel: undefined,
  },
  [SECONDARY]: {
    showSecondaryAxis: '0',
    codesListId: undefined,
    showTotalLabel: '0',
    totalLabel: undefined,
    type: undefined,
  },
  [MEASURE]: {
    measures: [],
  },
};

export const defaultTableModel = {
  dimensions: [],
  responses: [],
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
  let state = { ...defaultTableState[SECONDARY] };

  if (showSecondaryAxis) {
    const codesListState = CodesList.formToState(codesListForm);
    state = {
      ...state,
      showSecondaryAxis,
      showTotalLabel,
      totalLabel,
      type,
      codesListId: codesListState.codesList.id,
      [type]: codesListState,
    };
  }

  return state;
}

function formToStateMeasure(form, showSecondaryAxis) {
  const { measures, label, type: typeMeasure, [typeMeasure]: measureForm } = form;
  const measureItemsState = [];
  const measureState = {};

  if (showSecondaryAxis) {
    measureState.type = typeMeasure;
    measureState.label = label;

    if (typeMeasure === SIMPLE) {
      measureState[SIMPLE] = { ...measureForm };
    } else {
      measureState[SINGLE_CHOICE] = ResponseFormatSingle.formToState(measureForm);
    }
  } else {
    measures.forEach(m => {
      const { label: labelItem, type: typeMeasureItem, [typeMeasureItem]: measureFormItem } = m;
      const state = {
        label: labelItem,
        type: typeMeasureItem,
      };

      if (typeMeasureItem === SIMPLE) {
        state[SIMPLE] = { ...measureFormItem };
      } else {
        state[SINGLE_CHOICE] = ResponseFormatSingle.formToState(measureFormItem);
      }
      measureItemsState.push(state);
    });
  }

  return {
    ...measureState,
    measures: measureItemsState,
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
    type: NEW,
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

function stateToFormMeasureItem(state, activeCodeLists, activeCodes) {
  const { label, type: typeMeasure, [typeMeasure]: measureState } = state;
  const form = {
    label,
    type: typeMeasure,
  };

  if (typeMeasure === SIMPLE) {
    form[SIMPLE] = { ...measureState };
  } else {
    form[SINGLE_CHOICE] = ResponseFormatSingle.stateToForm(measureState, activeCodeLists, activeCodes);
  }

  return form;
}

function stateToFormMeasure(state, showSecondaryAxis, activeCodeLists, activeCodes) {
  const { measures, ...measureState } = state;
  const measuresForm = [];
  let measureForm = {};

  if (showSecondaryAxis) {
    measureForm = stateToFormMeasureItem(measureState, activeCodeLists, activeCodes);
  } else {
    measures.forEach(m => {
      measuresForm.push(stateToFormMeasureItem(m, activeCodeLists, activeCodes));
    });
  }

  return {
    ...defaultTableForm[MEASURE],
    ...measureForm,
    measures: measuresForm,
  };
}

function getDimensionsByType(type, dimensions) {
  let dimension;

  for (let i = 0; i < dimensions.length; i += 1) {
    if (dimensions[i].dimensionType === type) {
      dimension = dimensions[i];
      break;
    }
  }

  return dimension;
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
    [MEASURE]: formToStateMeasure(measureForm, secondaryForm.showSecondaryAxis),
  };
  return {
    ...defaultTableState,
    ...state,
  };
}

function stateToForm(state, activeCodeLists, activeCodes) {
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: { showSecondaryAxis, ...secondaryState },
    [MEASURE]: measureState,
  } = state;
  const form = {
    [PRIMARY]: stateToFormPrimary(primaryState, activeCodeLists, activeCodes),
    [SECONDARY]: stateToFormSecondary({ showSecondaryAxis, ...secondaryState }, activeCodeLists, activeCodes),
    [MEASURE]: stateToFormMeasure(measureState, showSecondaryAxis, activeCodeLists, activeCodes),
  };
  return {
    ...defaultTableForm,
    ...form,
  };
}

function stateToModel(state, activeCodeLists) {
  const {
    [PRIMARY]: { type, [type]: primaryState, ...totalLabelPrimaryState },
    [SECONDARY]: { showSecondaryAxis, ...secondaryState },
    [MEASURE]: { measures, label, type: typeMeasure, [typeMeasure]: measureState },
  } = state;
  const dimensionsModel = [];
  let responsesModel = [];
  let measureResponses = {};
  let responseOffset = 1;

  dimensionsModel.push(Dimension.stateToModel({ ...primaryState, ...totalLabelPrimaryState, type: PRIMARY }));

  if (type === CODES_LIST && showSecondaryAxis) {
    const { codesListId } = secondaryState;
    responseOffset = activeCodeLists[codesListId].codes.length || 1;
  } else if (type === LIST) {
    const { numLinesMin, numLinesMax } = primaryState;
    responseOffset = numLinesMax - numLinesMin + 1;
  }

  if (showSecondaryAxis) {
    dimensionsModel.push(Dimension.stateToModel({ ...secondaryState, type: SECONDARY }));
    dimensionsModel.push(Dimension.stateToModel({ label, type: MEASURE }));
    if (typeMeasure === SIMPLE) {
      measureResponses = ResponseFormatSimple.stateToModel(measureState);
    } else {
      measureResponses = ResponseFormatSingle.stateToModel(measureState);
    }
    for (let i = 0; i < responseOffset; i += 1) {
      responsesModel = [...responsesModel, ...measureResponses.responses];
    }
  } else {
    measures.forEach(m => {
      const { label: measureItemLabel, type: measureItemType, [measureItemType]: measureItemState } = m;
      dimensionsModel.push(Dimension.stateToModel({ label: measureItemLabel, type: MEASURE }));
      if (measureItemType === SIMPLE) {
        measureResponses = ResponseFormatSimple.stateToModel(measureItemState);
      } else {
        measureResponses = ResponseFormatSingle.stateToModel(measureItemState);
      }
      for (let i = 0; i < responseOffset; i += 1) {
        responsesModel = [...responsesModel, ...measureResponses.responses];
      }
    });
  }
  return {
    dimensions: dimensionsModel,
    responses: responsesModel,
  };
}

function parseDynamic(dynamic) {
  return dynamic.split('-').map(v => {
    return v.length > 0 ? parseInt(v, 10) : 0;
  });
}

function modelToStatePrimary(model) {
  const { totalLabel, dynamic, codeListReference } = model;
  const state = {};

  if (totalLabel) {
    state.showTotalLabel = '1';
    state.totalLabel = totalLabel;
  }

  if (codeListReference) {
    state.type = CODES_LIST;
    state[CODES_LIST] = {
      codesListId: codeListReference,
    };
  } else {
    const [numLinesMin, numLinesMax] = parseDynamic(dynamic);
    state.type = LIST;
    state[LIST] = {};
    state[LIST] = {
      numLinesMin: numLinesMin,
      numLinesMax: numLinesMax,
    };
  }

  return {
    ...defaultTableModel[PRIMARY],
    ...state,
  };
}

function modelToStateSecondary(model) {
  const { totalLabel, codeListReference } = model;
  const state = {
    showSecondaryAxis: true,
    codesListId: codeListReference,
  };

  if (totalLabel) {
    state.showTotalLabel = '1';
    state.totalLabel = totalLabel;
  }
  return {
    ...defaultTableState[SECONDARY],
    ...state,
  };
}

function modelToStateMeasure(model) {
  const { label, response: { codeListReference, datatype } } = model;
  const state = {};

  if (codeListReference) {
    state.type = SINGLE_CHOICE;
    state[SINGLE_CHOICE] = { ...ResponseFormatSingle.modelToState({ responses: [{ datatype, codeListReference }] }) };
  } else {
    state.type = SIMPLE;
    state[SIMPLE] = { ...ResponseFormatSimple.modelToState({ responses: [{ datatype }] }) };
  }
  return {
    label,
    ...state,
  };
}

function modelToState(model, activeCodeLists) {
  const { dimensions, responses } = model;
  let responseOffset = 1;
  const dimensionSecondaryState = getDimensionsByType(SECONDARY, dimensions);
  const primaryState = modelToStatePrimary(getDimensionsByType(PRIMARY, dimensions));
  let secondaryState = { ...defaultTableState[SECONDARY] };
  const dimensionMeasuresState = getMeasures(dimensions);
  let measuresStates = [];
  let measureState = {};

  if (primaryState.type === CODES_LIST && dimensionSecondaryState) {
    secondaryState = modelToStateSecondary(dimensionSecondaryState);
    const { codesListId } = secondaryState;
    responseOffset = activeCodeLists[codesListId].codes.length || 1;
    measureState = modelToStateMeasure({ label: dimensionMeasuresState[0].label, response: responses[0] });
  } else if (primaryState.type === LIST) {
    const { LIST: { numLinesMin, numLinesMax } } = primaryState;
    responseOffset = numLinesMax - numLinesMin + 1;
  }

  if (!dimensionSecondaryState) {
    measuresStates = dimensionMeasuresState.map((m, index) => {
      return modelToStateMeasure({label: m.label, response: responses[index * responseOffset]});
    });
  }

  return {
    ...defaultTableState,
    ...{
      [PRIMARY]: primaryState,
      [SECONDARY]: secondaryState,
      [MEASURE]: {
        ...defaultTableState[MEASURE],
        ...measureState,
        measures: measuresStates,
      },
    },
  };
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
