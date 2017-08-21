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

function transformationFormToStatePrimary(form, currentCodesListsIdsStore) {
  const { type, [type]: codesListForm } = form;
  const initialState =
    currentCodesListsIdsStore[`${MULTIPLE_CHOICE}.${PRIMARY}`] !== ''
      ? { id: currentCodesListsIdsStore[`${MULTIPLE_CHOICE}.${PRIMARY}`] }
      : undefined;
  const codesListState = CodesListTransformerFactory({ initialState }).formToState(codesListForm);

  return {
    codesListId: codesListState.id,
    codesList: codesListState,
  };
}

function transformationFormToStateMeasure(form, currentCodesListsIdsStore) {
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
    const codesListState = CodesListTransformerFactory({ initialState }).formToState(codesListForm);
    state[CODES_LIST] = {
      visHint,
      codesListId: codesListState.id,
      codesList: codesListState,
    };
  }

  return state;
}

function transformationFormToState(form, currentCodesListsIdsStore) {
  const { [PRIMARY]: primaryForm, [MEASURE]: measureForm } = form;

  return {
    [PRIMARY]: transformationFormToStatePrimary(primaryForm, currentCodesListsIdsStore),
    [MEASURE]: transformationFormToStateMeasure(measureForm, currentCodesListsIdsStore),
  };
}

function transformationModelToState(model) {
  const { primaryDimension, type, visHint, codesListId } = model;
  const state = {
    [PRIMARY]: { ...defaultMultipleState[PRIMARY] },
    [MEASURE]: { ...defaultMultipleState[MEASURE] },
  };

  state[PRIMARY].codesListId = primaryDimension.codeListReference;

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
  const clTransformer = CodesListTransformerFactory({ initialState: codesListsStore[codesListId] });

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
  const clTransformer = CodesListTransformerFactory({ initialState: codesListsStore[codesListId] });

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

function transformationStateToModel(currentState) {
  const { [PRIMARY]: primaryState, [MEASURE]: { type: typeMeasure, [typeMeasure]: measureState } } = currentState;
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
        datatype: { maxLength: 1, pattern: '', visHint },
      })
    );
  } else {
    responses.push(Response.stateToModel({ type: BOOLEAN }));
  }

  return {
    dimensions,
    responses,
  };
}

const MultipleTransformerFactory = (conf = {}) => {
  const { initialState, codesListsStore, currentCodesListsIdsStore } = conf;
  let currentState = initialState || defaultMultipleState;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, currentCodesListsIdsStore);
      return currentState;
    },
    modelToState: model => {
      const { dimensions, responses: [{ datatype: { typeName, visHint }, codeListReference: codesListId }] } = model;
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
      return transformationStateToModel(currentState);
    },
  };
};

export default MultipleTransformerFactory;
