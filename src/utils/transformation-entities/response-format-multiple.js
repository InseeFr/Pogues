import {
  CODES_LIST_INPUT_ENUM,
  DATATYPE_NAME,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  DATATYPE_VIS_HINT,
  QUESTION_TYPE_ENUM,
} from 'constants/pogues-constants';
import CodesListTransformerFactory, { defaultCodesListForm } from './codes-list';
import Dimension from './dimension';
import Response from './response';

const { BOOLEAN, TEXT } = DATATYPE_NAME;
const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST, BOOL } = DIMENSION_FORMATS;
const { CHECKBOX } = DATATYPE_VIS_HINT;
const { MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;

export const defaultMultipleForm = {
  [PRIMARY]: {
    type: NEW,
    [NEW]: { ...defaultCodesListForm },
    [REF]: {},
    [QUESTIONNAIRE]: {},
  },
  [MEASURE]: {
    type: BOOL,
    [BOOL]: {},
    [CODES_LIST]: {
      visHint: CHECKBOX,
      type: NEW,
      [NEW]: { ...defaultCodesListForm },
      [REF]: {},
      [QUESTIONNAIRE]: {},
    },
  },
};

export const defaultMultipleState = {
  [PRIMARY]: {
    codesListId: '',
    codesList: {},
  },
  [MEASURE]: {
    type: BOOL,
    [BOOL]: {},
    [CODES_LIST]: {
      visHint: CHECKBOX,
      codesListId: '',
      codesList: {},
    },
  },
};

function getDimension(type, dimensions) {
  const result = dimensions.filter(d => {
    return d.dimensionType === type;
  });
  return result.length > 0 ? result[0] : {};
}

function transformationFormToStatePrimary(form, currentCodesListsIdsStore, codesListsStore) {
  const { type, [type]: codesListForm } = form;
  const initialState =
    currentCodesListsIdsStore[`${MULTIPLE_CHOICE}.${PRIMARY}`] !== ''
      ? { id: currentCodesListsIdsStore[`${MULTIPLE_CHOICE}.${PRIMARY}`] }
      : undefined;
  const codesListState = CodesListTransformerFactory({ initialState, codesListsStore, type }).formToState(
    codesListForm
  );

  return {
    codesListId: codesListState.id,
    codesList: codesListState,
  };
}

function transformationFormToStateMeasure(form, currentCodesListsIdsStore, codesListsStore) {
  const { type: typeMeasure, [typeMeasure]: measureForm } = form;
  const state = {
    type: typeMeasure,
    [typeMeasure]: {},
  };

  if (typeMeasure === CODES_LIST) {
    const { visHint, type, [type]: codesListForm } = measureForm;
    const initialState =
      currentCodesListsIdsStore[`${MULTIPLE_CHOICE}.${MEASURE}.${CODES_LIST}`] !== ''
        ? { id: currentCodesListsIdsStore[`${MULTIPLE_CHOICE}.${MEASURE}.${CODES_LIST}`] }
        : undefined;
    const codesListState = CodesListTransformerFactory({ initialState, codesListsStore, type }).formToState(
      codesListForm
    );
    state[CODES_LIST] = {
      visHint,
      codesListId: codesListState.id,
      codesList: codesListState,
    };
  }

  return state;
}

function transformationFormToState(form, currentCodesListsIdsStore, codesListsStore) {
  const { [PRIMARY]: primaryForm, [MEASURE]: measureForm } = form;

  return {
    [PRIMARY]: transformationFormToStatePrimary(primaryForm, currentCodesListsIdsStore, codesListsStore),
    [MEASURE]: transformationFormToStateMeasure(measureForm, currentCodesListsIdsStore, codesListsStore),
  };
}

function transformationModelToState(model) {
  const { primaryDimension, type, visHint, codesListId } = model;
  const state = {
    [PRIMARY]: { ...defaultMultipleState[PRIMARY] },
    [MEASURE]: { ...defaultMultipleState[MEASURE] },
  };

  state[PRIMARY].codesListId = primaryDimension.CodeListReference;

  if (type === BOOLEAN) {
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

function transformationStateToFormPrimary(currentState, codesListsStore) {
  const { codesListId } = currentState;
  const clTransformer = CodesListTransformerFactory({
    initialState: codesListsStore[codesListId],
    codesListsStore,
    type: NEW,
  });

  return {
    ...defaultMultipleForm[PRIMARY],
    codesListId,
    [NEW]: clTransformer.stateToForm(),
  };
}

function transformationStateToFormMeasure(currentState, codesListsStore) {
  const state = {
    ...defaultMultipleState[MEASURE],
    ...currentState,
  };
  const { type, [CODES_LIST]: { codesListId, visHint } } = state;
  const clTransformer = CodesListTransformerFactory({
    initialState: codesListsStore[codesListId],
    codesListsStore,
    type: NEW,
  });

  return {
    ...defaultMultipleForm[MEASURE],
    [CODES_LIST]: {
      ...defaultMultipleForm[MEASURE][CODES_LIST],
      visHint,
      codesListId,
      [NEW]: clTransformer.stateToForm(),
    },
    type,
  };
}

function transformationStateToForm(currentState, codesListsStore) {
  const { [PRIMARY]: primaryState, [MEASURE]: measureState } = currentState;

  return {
    [PRIMARY]: transformationStateToFormPrimary(primaryState, codesListsStore),
    [MEASURE]: transformationStateToFormMeasure(measureState, codesListsStore),
  };
}

function transformationStateToModel(currentState, codesListsStore, collectedVariables) {
  const { [PRIMARY]: primaryState, [MEASURE]: { type: typeMeasure, [typeMeasure]: measureState } } = currentState;
  const dimensions = [];
  const responses = [];
  const codesListState = codesListsStore[primaryState.codesListId] || {};
  const numCodes = Object.keys(codesListState.codes || {}).length;
  let responseState;

  dimensions.push(Dimension.stateToModel({ ...primaryState, type: PRIMARY }));
  dimensions.push(Dimension.stateToModel({ type: MEASURE }));

  if (typeMeasure === CODES_LIST) {
    const { codesListId, visHint } = measureState;
    responseState = {
      codesListId,
      typeName: TEXT,
      visHint,
      maxLength: 1,
      pattern: '',
    };
  } else {
    responseState = { typeName: BOOLEAN };
  }

  for (let i = 0; i < numCodes; i += 1) {
    responses.push(Response.stateToModel({ ...responseState, collectedVariable: collectedVariables[i] || '' }));
  }

  return {
    Dimension: dimensions,
    Response: responses,
  };
}

const MultipleTransformerFactory = (conf = {}) => {
  const { initialState, codesListsStore, collectedVariables, currentCodesListsIdsStore } = conf;
  let currentState = initialState || defaultMultipleState;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, currentCodesListsIdsStore, codesListsStore);
      return currentState;
    },
    modelToState: model => {
      const {
        dimensions,
        responses: [{ Datatype: { typeName, visualizationHint: visHint }, CodeListReference: codesListId }],
      } = model;
      currentState = transformationModelToState({
        primaryDimension: getDimension(PRIMARY, dimensions),
        type: typeName,
        visHint,
        codesListId,
      });
      return currentState;
    },
    stateToForm: () => {
      return transformationStateToForm(currentState, codesListsStore);
    },
    stateToModel: () => {
      return transformationStateToModel(currentState, codesListsStore, collectedVariables);
    },
  };
};

export default MultipleTransformerFactory;
