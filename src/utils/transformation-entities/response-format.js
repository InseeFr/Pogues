import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import SimpleTransformerFactory, { defaultSimpleState } from './response-format-simple';
import SingleTransformerFactory, { defaultSingleState } from './response-format-single';
import MultipleTransformerFactory, { defaultMultipleState } from './response-format-multiple';
import TableTransformerFactory, { defaultTableState } from './response-format-table';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

export const defaultResponseFormatState = {
  [SIMPLE]: { ...defaultSimpleState },
  [SINGLE_CHOICE]: { ...defaultSingleState },
  [MULTIPLE_CHOICE]: { ...defaultMultipleState },
  [TABLE]: { ...defaultTableState },
  type: '',
};

function transformationFormToState(form, codesListsStore, currentCodesListsIdsStore) {
  const { type, [type]: responseFormatForm } = form;
  const state = {
    type,
  };

  if (type === SINGLE_CHOICE) {
    state[type] = SingleTransformerFactory({ currentCodesListsIdsStore, codesListsStore }).formToState(
      responseFormatForm
    );
  } else if (type === MULTIPLE_CHOICE) {
    state[type] = MultipleTransformerFactory({ currentCodesListsIdsStore, codesListsStore }).formToState(
      responseFormatForm
    );
  } else if (type === TABLE) {
    state[type] = TableTransformerFactory({ currentCodesListsIdsStore, codesListsStore }).formToState(
      responseFormatForm
    );
  } else {
    state[type] = SimpleTransformerFactory().formToState(responseFormatForm);
  }

  return state;
}

function transformationModelToState(type, responses, dimensions, codesListsStore) {
  let datatypeState = {};

  if (type === SIMPLE) {
    datatypeState = SimpleTransformerFactory().modelToState({ responses });
  } else if (type === SINGLE_CHOICE) {
    datatypeState = SingleTransformerFactory().modelToState({ responses });
  } else if (type === MULTIPLE_CHOICE) {
    datatypeState = MultipleTransformerFactory().modelToState({ responses, dimensions });
  } else if (type === TABLE) {
    datatypeState = TableTransformerFactory({ codesListsStore }).modelToState({ responses, dimensions });
  }

  return {
    type,
    [type]: datatypeState,
  };
}

function transformationStateToForm(currentState, codesListsStore = {}) {
  const { type } = currentState;

  return {
    type,
    [SIMPLE]: SimpleTransformerFactory({
      initialState: currentState[SIMPLE],
    }).stateToForm(),
    [SINGLE_CHOICE]: SingleTransformerFactory({
      initialState: currentState[SINGLE_CHOICE],
      codesListsStore,
    }).stateToForm(),
    [MULTIPLE_CHOICE]: MultipleTransformerFactory({
      initialState: currentState[MULTIPLE_CHOICE],
      codesListsStore,
    }).stateToForm(),
    [TABLE]: TableTransformerFactory({
      initialState: currentState[TABLE],
      codesListsStore,
    }).stateToForm(),
  };
}

function transformationStateToModel(currentState, collectedVariables, codesListsStore) {
  const { type, [type]: responseFormatState } = currentState;
  let model = {};
  let responseFormatModel = {};

  if (type === SIMPLE) {
    responseFormatModel = SimpleTransformerFactory({
      initialState: responseFormatState,
      collectedVariables,
    }).stateToModel();
    model.Response = responseFormatModel.Response;
  } else if (type === SINGLE_CHOICE) {
    responseFormatModel = SingleTransformerFactory({
      initialState: responseFormatState,
      collectedVariables,
    }).stateToModel();
    model.Response = responseFormatModel.Response;
  } else if (type === MULTIPLE_CHOICE) {
    responseFormatModel = MultipleTransformerFactory({
      initialState: responseFormatState,
    }).stateToModel();
    model = {
      ResponseStructure: {
        Dimension: responseFormatModel.Dimension,
      },
      Response: responseFormatModel.Response,
    };
  } else {
    responseFormatModel = TableTransformerFactory({
      initialState: responseFormatState,
      codesListsStore,
    }).stateToModel();
    model = {
      ResponseStructure: {
        Dimension: responseFormatModel.Dimension,
      },
      Response: responseFormatModel.Response,
    };
  }
  return model;
}

const ResponseFormatTransformerFactory = (conf = {}) => {
  const { initialState, collectedVariables, codesListsStore, currentCodesListsIdsStore } = conf;

  let currentState = initialState || defaultResponseFormatState;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, codesListsStore, currentCodesListsIdsStore);
      return currentState;
    },
    modelToState: (type, responses, dimensions) => {
      currentState = transformationModelToState(type, responses, dimensions, codesListsStore);
      return currentState;
    },
    stateToForm: () => {
      return transformationStateToForm(currentState, codesListsStore);
    },
    stateToModel: () => {
      return transformationStateToModel(currentState, collectedVariables, codesListsStore);
    },
  };
};

export default ResponseFormatTransformerFactory;
