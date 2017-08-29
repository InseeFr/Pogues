import Dimension from './dimension';
import {
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  CODES_LIST_INPUT_ENUM,
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
} from 'constants/pogues-constants';
import CodesListTransformerFactory, { defaultCodesListForm } from './codes-list';
import SimpleTransformerFactory from './response-format-simple';
import SingleTransformerFactory from './response-format-single';
import Response from './response';

const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;
const { CHECKBOX } = DATATYPE_VIS_HINT;
const { TABLE } = QUESTION_TYPE_ENUM;

export const defaultMeasureForm = {
  label: '',
  type: SIMPLE,
  [SIMPLE]: {
    mandatory: undefined,
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

export const defaultListMeasuresForm = {
  ...defaultMeasureForm,
  measures: [],
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
    [CODES_LIST]: {
      codesListId: '',
      codesList: {},
    },
  },
  [SECONDARY]: {
    showSecondaryAxis: false,
    codesListId: '',
    codesList: {},
    showTotalLabel: '0',
    totalLabel: '',
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
    [SINGLE_CHOICE]: {
      visHint: CHECKBOX,
      codesListId: '',
      codesList: {},
    },
  },
  [LIST_MEASURE]: [],
};

// HELPERS

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

function getMeasuresModel(responses, dimensions, offset) {
  const responsesModel = [];
  for (let i = 0; i < dimensions.length; i += 1) {
    responsesModel.push({
      Label: dimensions[i].Label,
      response: responses[i * offset],
    });
  }
  return responsesModel;
}

function parseDynamic(dynamic) {
  return dynamic.split('-').map(v => {
    return v.length > 0 ? parseInt(v, 10) : 0;
  });
}

// FORM TO STATE

function transformationFormToStatePrimary(form, currentCodesListsIdsStore, codesListsStore) {
  const { showTotalLabel, totalLabel, type: typePrimary, [typePrimary]: primaryForm } = form;
  const state = {
    showTotalLabel,
    totalLabel,
    type: typePrimary,
  };

  if (typePrimary === CODES_LIST) {
    const { type, [type]: codesListForm } = primaryForm;
    const initialState =
      currentCodesListsIdsStore[`${TABLE}.${PRIMARY}.${CODES_LIST}`] !== ''
        ? { id: currentCodesListsIdsStore[`${TABLE}.${PRIMARY}.${CODES_LIST}`] }
        : undefined;
    const codesListState = CodesListTransformerFactory({ initialState, codesListsStore, type }).formToState(
      codesListForm
    );

    state[CODES_LIST] = {
      codesListId: codesListState.id,
      codesList: codesListState,
    };
  } else {
    const { numLinesMin, numLinesMax } = primaryForm;
    state[LIST] = { numLinesMin, numLinesMax };
  }

  return state;
}

function transformationFormToStateSecondary(form, primaryState, currentCodesListsIdsStore, codesListsStore) {
  const { showSecondaryAxis, showTotalLabel, totalLabel, type, [type]: codesListForm } = form;
  let state = {
    showSecondaryAxis: showSecondaryAxis && primaryState.type === CODES_LIST,
    showTotalLabel,
    totalLabel,
    codesListState: '',
  };

  if (showSecondaryAxis && primaryState.type === CODES_LIST) {
    const initialState =
      currentCodesListsIdsStore[`${TABLE}.${SECONDARY}`] !== ''
        ? { id: currentCodesListsIdsStore[`${TABLE}.${SECONDARY}`] }
        : undefined;
    const codesListState = CodesListTransformerFactory({ initialState, codesListsStore, type }).formToState(
      codesListForm
    );

    state = {
      ...state,
      codesListId: codesListState.id,
      codesList: codesListState,
    };
  }

  return state;
}

function transformationFormToStateMeasure(
  form,
  currentCodesListsIdsStore,
  selectorPath = `${TABLE}.${MEASURE}.${SINGLE_CHOICE}`,
  codesListsStore
) {
  const { label, type, [type]: measureForm } = form;
  const state = {
    label,
    type,
  };

  if (type === SIMPLE) {
    state[SIMPLE] = SimpleTransformerFactory().formToState(measureForm);
  } else {
    const { visHint, [NEW]: codesListForm } = measureForm;
    const initialState =
      currentCodesListsIdsStore[selectorPath] !== '' ? { id: currentCodesListsIdsStore[selectorPath] } : undefined;
    const codesListState = CodesListTransformerFactory({ initialState, codesListsStore }).formToState(codesListForm);
    state[SINGLE_CHOICE] = {
      visHint,
      codesListId: codesListState.id,
      codesList: codesListState,
    };
  }
  return state;
}

function transformationFormToStateListMeasure(form, currentCodesListsIdsStore, codesListsStore) {
  const { measures } = form;
  return measures.map((measure, index) =>
    transformationFormToStateMeasure(
      measure,
      currentCodesListsIdsStore,
      `${TABLE}.${MEASURE}.${SINGLE_CHOICE}.${index}`,
      codesListsStore
    )
  );
}

function transformationFormToState(form, currentCodesListsIdsStore, codesListsStore) {
  const {
    [PRIMARY]: primaryForm,
    [SECONDARY]: secondaryForm,
    [MEASURE]: measureForm,
    [LIST_MEASURE]: listMeasureForm,
  } = form;

  const primaryState = transformationFormToStatePrimary(primaryForm, currentCodesListsIdsStore, codesListsStore);
  const secondaryState = transformationFormToStateSecondary(
    secondaryForm,
    primaryState,
    currentCodesListsIdsStore,
    codesListsStore
  );
  const state = {
    [PRIMARY]: primaryState,
  };

  if (secondaryState.showSecondaryAxis) {
    state[SECONDARY] = secondaryState;
    state[MEASURE] = transformationFormToStateMeasure(measureForm, currentCodesListsIdsStore);
  } else {
    state[LIST_MEASURE] = transformationFormToStateListMeasure(
      listMeasureForm,
      currentCodesListsIdsStore,
      codesListsStore
    );
  }

  return state;
}

// MODEL TO STATE

function transformationModelToStatePrimary(model) {
  const { totalLabel, dynamic, CodeListReference: codesListId } = model;
  let state = {};

  if (totalLabel) {
    state.showTotalLabel = '1';
    state.totalLabel = totalLabel;
  }

  if (codesListId) {
    state = {
      ...state,
      type: CODES_LIST,
      [CODES_LIST]: {
        codesListId,
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

function transformationModelToStateSecondary(model) {
  const { totalLabel, CodeListReference: codesListId } = model;
  const state = {
    showSecondaryAxis: true,
    codesListId,
  };

  if (totalLabel) {
    state.showTotalLabel = '1';
    state.totalLabel = totalLabel;
  }

  return state;
}

function transformationModelToStateMeasure(model) {
  const { Label: label, response: { CodeListReference, Datatype } } = model;
  const state = {};

  if (CodeListReference) {
    state.type = SINGLE_CHOICE;
    state[SINGLE_CHOICE] = SingleTransformerFactory().modelToState({ responses: [{ Datatype, CodeListReference }] });
  } else {
    state.type = SIMPLE;
    state[SIMPLE] = SimpleTransformerFactory().modelToState({ responses: [{ Datatype }] });
  }
  return {
    label,
    ...state,
  };
}

function transformationModelToState(model, codesListsStore) {
  const { dimensions, responses } = model;
  const state = {};

  // Dimensions
  const dimensionSecondaryModel = getDimensionsByType(SECONDARY, dimensions);
  const dimensionPimaryModel = getDimensionsByType(PRIMARY, dimensions);
  const dimensionMeasuresModel = getDimensionsMeasures(dimensions);

  // Primary and secondary state
  state[PRIMARY] = transformationModelToStatePrimary(dimensionPimaryModel);

  if (dimensionSecondaryModel) {
    state[SECONDARY] = transformationModelToStateSecondary(dimensionSecondaryModel);
  }

  // Measures
  const responsesOffset = getResponsesOffset(state[PRIMARY], state[SECONDARY], codesListsStore);
  const responsesMeasuresModel = getMeasuresModel(responses, dimensionMeasuresModel, responsesOffset);

  if (dimensionSecondaryModel) {
    state[MEASURE] = transformationModelToStateMeasure(responsesMeasuresModel[0]);
  } else {
    state[LIST_MEASURE] = responsesMeasuresModel.map(m => transformationModelToStateMeasure(m));
  }

  return state;
}

// STATE TO FORM

function transformationStateToFormPrimary(currentState, codesListsStore) {
  const state = {
    ...defaultTableState[PRIMARY],
    ...currentState,
  };
  const {
    showTotalLabel,
    totalLabel,
    type,
    [LIST]: { numLinesMin, numLinesMax },
    [CODES_LIST]: { codesListId },
  } = state;
  const codesListTransformer = CodesListTransformerFactory({
    initialState: codesListsStore[codesListId],
    codesListsStore,
  });

  return {
    ...defaultTableForm[PRIMARY],
    [LIST]: {
      numLinesMin,
      numLinesMax,
    },
    [CODES_LIST]: {
      ...defaultTableForm[PRIMARY][CODES_LIST],
      [NEW]: codesListTransformer.stateToForm(),
      codesListId,
    },
    type,
    showTotalLabel,
    totalLabel,
  };
}

function transformationStateToFormSecondary(currentState, codesListsStore) {
  const state = {
    ...defaultTableState[SECONDARY],
    ...currentState,
  };
  const { showSecondaryAxis, showTotalLabel, totalLabel, codesListId } = state;
  const codesListTransformer = CodesListTransformerFactory({
    initialState: codesListsStore[codesListId],
    codesListsStore,
  });

  return {
    ...defaultTableForm[SECONDARY],
    [NEW]: codesListTransformer.stateToForm(),
    codesListId,
    showSecondaryAxis,
    showTotalLabel,
    totalLabel,
  };
}

function transformationStateToFormMeasure(currentState, codesListsStore) {
  const state = {
    ...defaultTableState[MEASURE],
    ...currentState,
  };

  const { label, type, [SIMPLE]: measureStateSimple, [SINGLE_CHOICE]: { visHint, codesListId } } = state;
  const codesListTransformer = CodesListTransformerFactory({
    initialState: codesListsStore[codesListId],
    codesListsStore,
  });

  return {
    ...defaultTableForm[MEASURE],
    [SIMPLE]: SimpleTransformerFactory({ initialState: measureStateSimple }).stateToForm(),
    [SINGLE_CHOICE]: {
      ...defaultTableForm[MEASURE][SINGLE_CHOICE],
      [NEW]: codesListTransformer.stateToForm(),
      codesListId,
      visHint,
    },
    type,
    label,
  };
}

function transformationStateToFormListMeasure(currentState, codesListsStore) {
  return {
    ...defaultListMeasuresForm,
    measures: currentState.map(measureState => transformationStateToFormMeasure(measureState, codesListsStore)),
  };
}

function transformationStateToForm(currentState, codesListsStore) {
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasureState,
  } = currentState;
  return {
    [PRIMARY]: transformationStateToFormPrimary(primaryState, codesListsStore),
    [SECONDARY]: transformationStateToFormSecondary(secondaryState, codesListsStore),
    [MEASURE]: transformationStateToFormMeasure(measureState, codesListsStore),
    [LIST_MEASURE]: transformationStateToFormListMeasure(listMeasureState, codesListsStore),
  };
}

// STATE TO MODEL

function transformationStateToModelResponse(state) {
  const { type: measureType, [measureType]: measureTypeState } = state;
  let model = {};

  if (measureType === SIMPLE) {
    const { mandatory, type, [type]: simpleState } = measureTypeState;
    model = Response.stateToModel({ mandatory, type, ...simpleState });
  } else {
    const { mandatory, visHint, codesListId } = measureTypeState;
    model = Response.stateToModel({
      mandatory,
      codesListId,
      type: TEXT,
      maxLength: 1,
      pattern: '',
      visHint,
    });
  }

  return model;
}

function transformationStateToModel(currentState, codesListsStore) {
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = currentState;
  const { type, [type]: primaryTypeState, ...totalLabelPrimaryState } = primaryState;

  let responseModel = {};
  const dimensionsModel = [];
  const responsesModel = [];
  const responsesOffset = getResponsesOffset(primaryState, secondaryState, codesListsStore);

  // Primary and secondary dimension
  dimensionsModel.push(Dimension.stateToModel({ type: PRIMARY, ...primaryTypeState, ...totalLabelPrimaryState }));

  if (secondaryState) {
    dimensionsModel.push(Dimension.stateToModel({ type: SECONDARY, ...secondaryState }));
  }

  // Measures dimensions
  if (measureState) {
    dimensionsModel.push(Dimension.stateToModel({ type: MEASURE, label: measureState.label }));
    responseModel = transformationStateToModelResponse(measureState);

    for (let i = 0; i < responsesOffset; i += 1) {
      responsesModel.push(responseModel);
    }
  } else {
    listMeasuresState.forEach(m => {
      dimensionsModel.push(Dimension.stateToModel({ type: MEASURE, label: m.label }));
      responseModel = transformationStateToModelResponse(m);
      for (let i = 0; i < responsesOffset; i += 1) {
        responsesModel.push(responseModel);
      }
    });
  }

  return {
    Dimension: dimensionsModel,
    Response: responsesModel,
  };
}

const TableTransformerFactory = (conf = {}) => {
  const { initialState, codesListsStore, currentCodesListsIdsStore } = conf;

  let currentState = initialState || defaultTableState;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, currentCodesListsIdsStore, codesListsStore);
      return currentState;
    },
    modelToState: model => {
      currentState = transformationModelToState(model, codesListsStore);
      return currentState;
    },
    stateToForm: () => {
      return transformationStateToForm({ ...defaultTableState, ...currentState }, codesListsStore);
    },
    stateToModel: () => {
      return transformationStateToModel(currentState, codesListsStore);
    },
  };
};

export default TableTransformerFactory;
