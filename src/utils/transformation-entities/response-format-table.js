import Dimension from './dimension';
import {
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
} from 'constants/pogues-constants';
import CodesListTransformerFactory, { defaultCodesListForm, defaultCodesListComponentState } from './codes-list';
import SimpleTransformerFactory from './response-format-simple';
import SingleTransformerFactory from './response-format-single';
import Response from './response';

const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { DATE, NUMERIC, TEXT, BOOLEAN } = DATATYPE_NAME;
const { CHECKBOX } = DATATYPE_VIS_HINT;

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
    ...defaultCodesListForm,
    visHint: CHECKBOX,
  },
};

export const defaultPrimaryForm = {
  showTotalLabel: '0',
  totalLabel: '',
  type: LIST,
  [LIST]: {
    numLinesMin: 0,
    numLinesMax: 0,
  },
  [CODES_LIST]: defaultCodesListForm,
};

export const defaultSecondaryForm = {
  ...defaultCodesListForm,
  showSecondaryAxis: false,
  showTotalLabel: '0',
  totalLabel: '',
};

export const defaultListMeasuresForm = {
  ...defaultMeasureForm,
  measures: [],
};

export const defaultTableForm = {
  [PRIMARY]: defaultPrimaryForm,
  [SECONDARY]: defaultSecondaryForm,
  [LIST_MEASURE]: defaultListMeasuresForm,
  [MEASURE]: defaultMeasureForm,
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
    [CODES_LIST]: defaultCodesListComponentState,
  },
  [SECONDARY]: {
    ...defaultCodesListComponentState,
    showSecondaryAxis: false,
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
      ...defaultCodesListComponentState,
      visHint: CHECKBOX,
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
      responseOffsetSecondary = Object.keys(activeCodeLists[codesListIdSecondary].codes).length;
    }

    responseOffset = Object.keys(activeCodeLists[codesListIdPrimary].codes).length * responseOffsetSecondary;
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

function transformationFormToStatePrimary(form, currentState) {
  const { showTotalLabel, totalLabel, type, [type]: primaryForm } = form;

  const state = {
    showTotalLabel,
    totalLabel,
    type,
  };

  if (type === LIST) {
    const { numLinesMin, numLinesMax } = primaryForm;
    state[LIST] = { numLinesMin, numLinesMax };
  } else {
    state[CODES_LIST] = CodesListTransformerFactory({
      initialComponentState: currentState[CODES_LIST],
    }).formToStateComponent(primaryForm);
  }

  return state;
}

function transformationFormToStateSecondary(form, currentState) {
  const { showSecondaryAxis, showTotalLabel, totalLabel, ...codesListForm } = form;
  return {
    showSecondaryAxis,
    showTotalLabel,
    totalLabel,
    ...CodesListTransformerFactory({ initialComponentState: currentState }).formToStateComponent(codesListForm),
  };
}

function transformationFormToStateMeasure(form, currentState = {}) {
  const { label, type, [type]: measureForm } = form;
  const state = {
    label,
    type,
  };

  if (type === SIMPLE) {
    state[SIMPLE] = SimpleTransformerFactory().formToState(measureForm);
  } else {
    const { visHint, ...codesListForm } = measureForm;
    state[SINGLE_CHOICE] = {
      visHint,
      ...CodesListTransformerFactory({ initialComponentState: currentState[SINGLE_CHOICE] }).formToStateComponent(
        codesListForm
      ),
    };
  }
  return state;
}

function transformationFormToStateListMeasure(form, currentState) {
  const { measures } = form;
  return measures.map((measure, index) => transformationFormToStateMeasure(measure, currentState[index]));
}

function transformationFormToState(form, currentState) {
  const {
    [PRIMARY]: primaryForm,
    [SECONDARY]: secondaryForm,
    [MEASURE]: measureForm,
    [LIST_MEASURE]: listMeasureForm,
  } = form;

  const state = {
    [PRIMARY]: transformationFormToStatePrimary(primaryForm, currentState[PRIMARY]),
  };

  if (secondaryForm.showSecondaryAxis && primaryForm.type === CODES_LIST) {
    state[SECONDARY] = transformationFormToStateSecondary(secondaryForm, currentState[SECONDARY]);
    state[MEASURE] = transformationFormToStateMeasure(measureForm, currentState[MEASURE]);
  } else {
    state[LIST_MEASURE] = transformationFormToStateListMeasure(listMeasureForm, currentState[LIST_MEASURE]);
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
  const dimensionPrimaryModel = getDimensionsByType(PRIMARY, dimensions);
  const dimensionMeasuresModel = getDimensionsMeasures(dimensions);

  // Primary and secondary state
  state[PRIMARY] = transformationModelToStatePrimary(dimensionPrimaryModel);

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
  const { showTotalLabel, totalLabel, type, [type]: primaryState } = currentState;
  const form = {
    showTotalLabel,
    totalLabel,
    type,
  };

  if (type === LIST) {
    const { numLinesMin, numLinesMax } = primaryState;
    form[LIST] = {
      numLinesMin,
      numLinesMax,
    };
  } else {
    form[CODES_LIST] = CodesListTransformerFactory({
      codesListsStore,
      initialComponentState: primaryState,
    }).stateComponentToForm();
  }

  return form;
}

function transformationStateToFormSecondary(currentState, codesListsStore) {
  const { showSecondaryAxis, showTotalLabel, totalLabel, ...codesListState } = currentState;
  return {
    showSecondaryAxis,
    showTotalLabel,
    totalLabel,
    ...CodesListTransformerFactory({
      codesListsStore,
      initialComponentState: codesListState,
    }).stateComponentToForm(),
  };
}

function transformationStateToFormMeasure(currentState, codesListsStore) {
  const { label, type, [type]: measureState } = currentState;
  const form = {
    label,
    type,
  };

  if (type === SIMPLE) {
    form[SIMPLE] = SimpleTransformerFactory({ initialState: measureState }).stateToForm();
  } else {
    const { visHint, ...codesListState } = measureState;
    form[SINGLE_CHOICE] = {
      visHint,
      ...CodesListTransformerFactory({
        codesListsStore,
        initialComponentState: codesListState,
      }).stateComponentToForm(),
    };
  }

  return form;
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
  let secondaryForm = {};
  let measureForm = {};
  let listMeasureForm = {};

  if (secondaryState) {
    secondaryForm = transformationStateToFormSecondary(secondaryState, codesListsStore);
  }

  if (measureState) {
    measureForm = transformationStateToFormMeasure(measureState, codesListsStore);
  }

  if (listMeasureState) {
    listMeasureForm = transformationStateToFormListMeasure(listMeasureState, codesListsStore);
  }

  return {
    [PRIMARY]: {
      ...defaultTableForm[PRIMARY],
      ...transformationStateToFormPrimary(primaryState, codesListsStore),
    },
    [SECONDARY]: {
      ...defaultTableForm[SECONDARY],
      ...secondaryForm,
    },
    [MEASURE]: {
      ...defaultTableForm[MEASURE],
      ...measureForm,
    },
    [LIST_MEASURE]: {
      ...defaultTableForm[LIST_MEASURE],
      ...listMeasureForm,
    },
  };
}

// STATE TO MODEL

function transformationStateToModelResponse(state) {
  const { type: measureType, [measureType]: measureTypeState, collectedVariable } = state;
  let model = {};

  if (measureType === SIMPLE) {
    const { mandatory, type: typeName, [typeName]: simpleState } = measureTypeState;
    model = Response.stateToModel({ mandatory, typeName, ...simpleState, collectedVariable });
  } else {
    const { mandatory, visHint, codesListId } = measureTypeState;
    model = Response.stateToModel({
      mandatory,
      codesListId,
      typeName: TEXT,
      maxLength: 1,
      pattern: '',
      visHint,
      collectedVariable,
    });
  }

  return model;
}

function transformationStateToModel(currentState, codesListsStore, collectedVariables) {
  let i;
  let j;
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = currentState;
  const { type, [type]: { type: typePrimaryCodesList, ...primaryTypeState }, ...totalLabelPrimaryState } = primaryState;
  const dimensionsModel = [];
  const responsesModel = [];
  const responsesOffset = getResponsesOffset(primaryState, secondaryState, codesListsStore);

  // Primary and secondary dimension
  dimensionsModel.push(Dimension.stateToModel({ type: PRIMARY, ...primaryTypeState, ...totalLabelPrimaryState }));

  if (secondaryState) {
    const { type: typeSecondaryCodesList, ...secondaryTypeState } = secondaryState;
    dimensionsModel.push(Dimension.stateToModel({ type: SECONDARY, ...secondaryTypeState }));
  }

  // Measures dimensions
  if (measureState) {
    dimensionsModel.push(Dimension.stateToModel({ type: MEASURE, label: measureState.label }));

    for (i = 0; i < responsesOffset; i += 1) {
      responsesModel.push(
        transformationStateToModelResponse({
          ...measureState,
          collectedVariable: collectedVariables[i] || '',
        })
      );
    }
  } else {
    for (i = 0; i < listMeasuresState.length; i += 1) {
      dimensionsModel.push(Dimension.stateToModel({ type: MEASURE, label: listMeasuresState[i].label }));
    }
    for (i = 0; i < responsesOffset; i += 1) {
      for (j = 0; j < listMeasuresState.length; j += 1) {
        responsesModel.push(
          transformationStateToModelResponse({
            ...listMeasuresState[j],
            collectedVariable: collectedVariables[i * listMeasuresState.length + j] || '',
          })
        );
      }
    }
  }

  return {
    Dimension: dimensionsModel,
    Response: responsesModel,
  };
}

const TableTransformerFactory = (conf = {}) => {
  const { initialState, codesListsStore, collectedVariables } = conf;

  let currentState = initialState || defaultTableState;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, currentState);
      return currentState;
    },
    modelToState: model => {
      currentState = transformationModelToState(model, codesListsStore);
      return currentState;
    },
    stateToForm: () => {
      return transformationStateToForm(currentState, codesListsStore);
    },
    stateToModel: () => {
      return transformationStateToModel(currentState, codesListsStore, collectedVariables);
    },
    getCodesListStore: () => {
      return {};
    },
  };
};

export default TableTransformerFactory;
