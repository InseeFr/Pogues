import {
  DATATYPE_NAME,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  DATATYPE_VIS_HINT,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';
import { CodesListFactory } from 'widgets/codes-lists';
import Dimension from './dimension';
import Response from './response';

const { BOOLEAN, TEXT } = DATATYPE_NAME;
const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST, BOOL } = DIMENSION_FORMATS;
const { CHECKBOX } = DATATYPE_VIS_HINT;

// export const defaultMultipleForm = {
//   [PRIMARY]: defaultCodesListForm,
//   [MEASURE]: {
//     type: BOOL,
//     [BOOL]: {},
//     [CODES_LIST]: {
//       ...defaultCodesListForm,
//       visHint: CHECKBOX,
//     },
//   },
// };

export const defaultMultipleState = {
  [PRIMARY]: {},
  [MEASURE]: {
    type: BOOL,
    [BOOL]: {},
    [CODES_LIST]: {},
  },
};

function getDimension(type, dimensions) {
  const result = dimensions.filter(d => {
    return d.dimensionType === type;
  });
  return result.length > 0 ? result[0] : {};
}

function transformationFormToStatePrimary(form, currentState) {
  return CodesListTransformerFactory({ initialComponentState: currentState }).formToStateComponent(form);
}

function transformationFormToStateMeasure(form, currentState) {
  const { type, [type]: measureForm } = form;
  const state = {
    type,
  };

  if (type === CODES_LIST) {
    const { visHint, ...codesListForm } = measureForm;
    state[CODES_LIST] = {
      visHint,
      ...CodesListTransformerFactory({ initialComponentState: currentState[CODES_LIST] }).formToStateComponent(
        codesListForm
      ),
    };
  } else {
    state[BOOL] = {};
  }

  return state;
}

function transformationFormToState(form, currentState) {
  const { [PRIMARY]: primaryForm, [MEASURE]: measureForm } = form;
  return {
    [PRIMARY]: transformationFormToStatePrimary(primaryForm, currentState[PRIMARY]),
    [MEASURE]: transformationFormToStateMeasure(measureForm, currentState[MEASURE]),
  };
}

function transformationModelToState(model) {
  const { primaryDimension, type, visHint, codesListId } = model;
  const state = {
    [PRIMARY]: { ...defaultMultipleState[PRIMARY] },
    [MEASURE]: { ...defaultMultipleState[MEASURE] },
  };

  state[PRIMARY][DEFAULT_CODES_LIST_SELECTOR_PATH] = { id: primaryDimension.CodeListReference };

  if (type === BOOLEAN) {
    state[MEASURE].type = BOOL;
  } else {
    state[MEASURE].type = CODES_LIST;
    state[MEASURE][CODES_LIST] = {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListId },
      visHint,
    };
  }

  return state;
}

function transformationStateToForm(currentState, CodesListPrimary, CodesListMeasure) {
  const { [MEASURE]: { type, [type]: { visHint } } } = currentState;

  return {
    [PRIMARY]: {
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodesListPrimary.stateComponentToForm(),
    },
    [MEASURE]: {
      type,
      [BOOL]: {},
      [CODES_LIST]: {
        visHint: visHint || CHECKBOX,
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodesListMeasure.stateComponentToForm(),
      },
    },
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
  const { initialState, codesListsStore, collectedVariables } = conf;
  let currentState = initialState || defaultMultipleState;

  const CodesListPrimary = CodesListFactory({
    codesListsStore,
    initialComponentState: currentState[PRIMARY][DEFAULT_CODES_LIST_SELECTOR_PATH],
  });

  const CodesListMeasure = CodesListFactory({
    codesListsStore,
    initialComponentState: currentState[MEASURE][CODES_LIST][DEFAULT_CODES_LIST_SELECTOR_PATH],
  });

  return {
    formToState: form => {
      currentState = transformationFormToState(form, currentState);
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
      return transformationStateToForm(currentState, CodesListPrimary, CodesListMeasure);
    },
    stateToModel: () => {
      return transformationStateToModel(currentState, codesListsStore, collectedVariables);
    },
    getCodesListStore: () => {
      return {};
    },
  };
};

export default MultipleTransformerFactory;
