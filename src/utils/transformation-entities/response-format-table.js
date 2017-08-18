import _ from 'lodash';

import Dimension from './dimension';
import {
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  CODES_LIST_INPUT_ENUM,
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
} from 'constants/pogues-constants';
import CodesList, { defaultCodesListForm } from './codes-list';
import ResponseFormatSimple from './response-format-simple';
import ResponseFormatSingle, { defaultSingleResponseModel } from './response-format-single';
import Response from './response';

const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;
const { CHECKBOX } = DATATYPE_VIS_HINT;

export const defaultMeasureForm = {
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
    visHint: CHECKBOX,
    type: NEW,
    [NEW]: { ...defaultCodesListForm },
    [REF]: {},
    [QUESTIONNAIRE]: {},
  },
};

export const defaultListMeasuresForm = {
  ...defaultMeasureForm,
  measures: [],
};

export const defaultSecondaryForm = {
  showSecondaryAxis: false,
  codesListId: '',
  showTotalLabel: '0',
  totalLabel: '',
  type: NEW,
  [NEW]: { ...defaultCodesListForm },
  [REF]: {},
  [QUESTIONNAIRE]: {},
};

export const defaultTableForm = {
  [PRIMARY]: {
    showTotalLabel: '0',
    totalLabel: '',
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
  },
  [SECONDARY]: { ...defaultSecondaryForm },
  [LIST_MEASURE]: { ...defaultListMeasuresForm },
  [MEASURE]: { ...defaultMeasureForm },
};

export const defaultTableState = {
  [PRIMARY]: {
    type: LIST,
    showTotalLabel: '0',
    totalLabel: '',
    [LIST]: {
      numLinesMin: 0,
      numLinesMax: 0,
    },
  },
  [SECONDARY]: {
    showSecondaryAxis: false,
    codesListId: undefined,
    showTotalLabel: '0',
    totalLabel: undefined,
    type: undefined,
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
    },
  },
  [LIST_MEASURE]: [],
};

export const defaultTableModel = {
  dimensions: [],
  responses: [],
};

// HELPERS

function getResponsesOffset(primaryState, secondaryState, activeCodeLists) {
  let responseOffset = 1;

  if (primaryState.type === CODES_LIST) {
    const { CODES_LIST: { codesListId: codesListIdPrimary } } = primaryState;
    let responseOffsetSecondary = 1;

    if (secondaryState) {
      const { codesListId: codesListIdSecondary } = secondaryState;
      responseOffsetSecondary = activeCodeLists[codesListIdSecondary].codes.length || 1;
    }

    responseOffset = (activeCodeLists[codesListIdPrimary].codes.length || 1) * responseOffsetSecondary;
  } else {
    const { LIST: { numLinesMin, numLinesMax } } = primaryState;
    responseOffset = numLinesMax - numLinesMin + 1;
  }
  return responseOffset;
}

// FORM TO STATE

function formToStateCodeList(form) {
  const { type, [type]: codesListForm } = form;
  const codesListState = CodesList.formToState(codesListForm);
  return {
    type,
    codesListId: codesListState.codesList.id,
    [type]: codesListState,
  };
}

export function formToStatePrimary(form) {
  const { showTotalLabel, totalLabel, type, [type]: primaryForm } = form;
  const state = {
    showTotalLabel,
    totalLabel,
    type,
  };

  if (type === CODES_LIST) {
    state[CODES_LIST] = formToStateCodeList(primaryForm);
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

export function formToStateMeasure(form) {
  const { label, type, [type]: measureForm } = form;
  const state = {
    label,
    type,
  };

  if (type === SIMPLE) {
    state[SIMPLE] = ResponseFormatSimple.formToState(measureForm);
  } else {
    state[SINGLE_CHOICE] = ResponseFormatSingle.formToState(measureForm);
  }

  return state;
}

export function formToStateListMeasure(form) {
  const listMeasures = [];

  form.measures.forEach(m => {
    listMeasures.push(formToStateMeasure(m));
  });

  return listMeasures;
}

function formToState(form) {
  const {
    [PRIMARY]: primaryForm,
    [SECONDARY]: secondaryForm,
    [MEASURE]: measureForm,
    [LIST_MEASURE]: listMeasureForm,
  } = form;
  const state = {
    [PRIMARY]: formToStatePrimary(primaryForm),
  };
  if (primaryForm.type === CODES_LIST && secondaryForm.showSecondaryAxis) {
    state[SECONDARY] = formToStateSecondary(secondaryForm);
    state[MEASURE] = formToStateMeasure(measureForm);
  } else {
    state[LIST_MEASURE] = formToStateListMeasure(listMeasureForm);
  }

  return state;
}

// STATE TO FORM

function stateToFormCodeList(state, activeCodeLists, activeCodes) {
  const form = {
    codesListId: '',
    type: NEW,
    [NEW]: _.cloneDeep(defaultCodesListForm),
  };
  const { codesListId } = state;
  const codesList = activeCodeLists[codesListId];
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
    form[CODES_LIST] = stateToFormCodeList(primaryState, activeCodeLists, activeCodes);
  }

  return form;
}

function stateToFormSecondary(state, activeCodeLists, activeCodes) {
  const { showSecondaryAxis, showTotalLabel, totalLabel, ...secondarySate } = state;
  return {
    ...defaultTableForm[SECONDARY],
    showSecondaryAxis,
    showTotalLabel,
    totalLabel,
    ...stateToFormCodeList(secondarySate, activeCodeLists, activeCodes),
  };
}

function stateToFormMeasure(state, activeCodeLists, activeCodes) {
  const { label, type: typeMeasure, [typeMeasure]: measureState } = state;
  const form = {
    label,
    type: typeMeasure,
  };

  if (typeMeasure === SIMPLE) {
    form[SIMPLE] = ResponseFormatSimple.stateToForm(measureState);
  } else {
    form[SINGLE_CHOICE] = ResponseFormatSingle.stateToForm(measureState, activeCodeLists, activeCodes);
  }

  return form;
}

function stateToFormListMeasures(state, activeCodeLists, activeCodes) {
  const measuresForm = [];

  state.forEach(m => {
    measuresForm.push(stateToFormMeasure(m, activeCodeLists, activeCodes));
  });

  return {
    ...defaultListMeasuresForm,
    measures: measuresForm,
  };
}

function stateToForm(state, activeCodeLists, activeCodes) {
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasureState,
  } = state;
  const form = {
    [PRIMARY]: stateToFormPrimary(primaryState, activeCodeLists, activeCodes),
  };

  if (secondaryState) {
    form[SECONDARY] = stateToFormSecondary(secondaryState, activeCodeLists, activeCodes);
  }

  if (measureState) {
    form[MEASURE] = stateToFormMeasure(measureState, activeCodeLists, activeCodes);
  }

  if (listMeasureState) {
    form[LIST_MEASURE] = stateToFormListMeasures(listMeasureState, activeCodeLists, activeCodes);
  }

  return {
    ...defaultTableForm,
    ...form,
  };
}

// STATE TO MODEL

function stateToModelResponse(state) {
  const { type: measureType, [measureType]: measureTypeState } = state;
  let model = {};

  if (measureType === SIMPLE) {
    const { mandatory, type, [type]: simpleState } = measureTypeState;
    model = Response.stateToModel({ mandatory, type, datatype: simpleState });
  } else {
    const { mandatory, visHint, codesListId } = measureTypeState;
    model = Response.stateToModel({
      mandatory,
      codeListReference: codesListId,
      type: TEXT,
      datatype: { ...defaultSingleResponseModel, visHint },
    });
  }

  return model;
}

function stateToModel(state, activeCodeLists) {
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = state;
  const { type, [type]: primaryTypeState, ...totalLabelPrimaryState } = primaryState;

  let responseModel = {};
  const dimensionsModel = [];
  const responsesModel = [];
  const responsesOffset = getResponsesOffset(primaryState, secondaryState, activeCodeLists);

  // Primary and secondary dimension
  dimensionsModel.push(Dimension.stateToModel({ type: PRIMARY, ...primaryTypeState, ...totalLabelPrimaryState }));

  if (secondaryState) {
    dimensionsModel.push(Dimension.stateToModel({ type: SECONDARY, ...secondaryState }));
  }

  // Measures dimensions
  if (measureState) {
    dimensionsModel.push(Dimension.stateToModel({ type: MEASURE, label: measureState.label }));
    responseModel = stateToModelResponse(measureState);

    for (let i = 0; i < responsesOffset; i += 1) {
      responsesModel.push(responseModel);
    }
  } else {
    listMeasuresState.forEach(m => {
      dimensionsModel.push(Dimension.stateToModel({ type: MEASURE, label: m.label }));
      responseModel = stateToModelResponse(m);
      for (let i = 0; i < responsesOffset; i += 1) {
        responsesModel.push(responseModel);
      }
    });
  }

  return {
    dimensions: dimensionsModel,
    responses: responsesModel,
  };
}

// MODEL TO STATE

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

function getDimensionsMeasures(dimensions) {
  return dimensions.reduce((acc, d) => {
    if (d.dimensionType === MEASURE) acc.push(d);
    return acc;
  }, []);
}

function parseDynamic(dynamic) {
  return dynamic.split('-').map(v => {
    return v.length > 0 ? parseInt(v, 10) : 0;
  });
}

function modelToStatePrimary(model) {
  const { totalLabel, dynamic, codeListReference } = model;
  let state = {};

  if (totalLabel) {
    state.showTotalLabel = '1';
    state.totalLabel = totalLabel;
  }

  if (codeListReference) {
    state = {
      ...state,
      type: CODES_LIST,
      [CODES_LIST]: {
        codesListId: codeListReference,
      },
    };
  } else {
    const [numLinesMin, numLinesMax] = parseDynamic(dynamic);
    state = {
      ...state,
      type: LIST,
      [LIST]: {
        numLinesMin: numLinesMin,
        numLinesMax: numLinesMax,
      },
    };
  }

  return state;
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

  return state;
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

function getMeasuresModel(responses, dimensions, offset) {
  const responsesModel = [];
  for (let i = 0; i < dimensions.length; i += 1) {
    responsesModel.push({
      label: dimensions[i].label,
      response: responses[i * offset],
    });
  }
  return responsesModel;
}

function modelToState(model, activeCodeLists) {
  const { dimensions, responses } = model;
  const state = {};

  // Dimensions
  const dimensionSecondaryModel = getDimensionsByType(SECONDARY, dimensions);
  const dimensionPimaryModel = getDimensionsByType(PRIMARY, dimensions);
  const dimensionMeasuresModel = getDimensionsMeasures(dimensions);

  // Primary and secondary state
  state[PRIMARY] = modelToStatePrimary(dimensionPimaryModel);

  if (dimensionSecondaryModel) {
    state[SECONDARY] = modelToStateSecondary(dimensionSecondaryModel);
  }

  // Measures
  const responsesOffset = getResponsesOffset(state[PRIMARY], state[SECONDARY], activeCodeLists);
  const responsesMeasuresModel = getMeasuresModel(responses, dimensionMeasuresModel, responsesOffset);

  if (dimensionSecondaryModel) {
    state[MEASURE] = modelToStateMeasure(responsesMeasuresModel[0]);
  } else {
    state[LIST_MEASURE] = responsesMeasuresModel.map(m => modelToStateMeasure(m));
  }

  return state;
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
