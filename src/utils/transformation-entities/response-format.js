import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import SimpleTransformerFactory, { defaultSimpleState } from './response-format-simple';
import SingleTransformerFactory, { defaultSingleState } from './response-format-single';
import MultipleTransformerFactory, { defaultMultipleState } from './response-format-multiple';
import TableTransformerFactory, { defaultTableState } from './response-format-table';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

const defaultResponseFormatState = {
  [SIMPLE]: { ...defaultSimpleState },
  [SINGLE_CHOICE]: { ...defaultSingleState },
  [MULTIPLE_CHOICE]: { ...defaultMultipleState },
  [TABLE]: { ...defaultTableState },
  type: SIMPLE,
};

function transformationFormToState(form, codesListsTransformers) {
  const { type, [type]: responseFormatForm } = form;
  const state = {
    type,
  };

  if (type === SINGLE_CHOICE) {
    state[type] = SingleTransformerFactory({ codesListsTransformers }).formToState(responseFormatForm);
  } else if (type === MULTIPLE_CHOICE) {
    state[type] = MultipleTransformerFactory({ codesListsTransformers }).formToState(responseFormatForm);
  } else if (type === TABLE) {
    state[type] = TableTransformerFactory({ codesListsTransformers }).formToState(responseFormatForm);
  } else {
    state[type] = SimpleTransformerFactory().formToState(responseFormatForm);
  }

  return state;
}

function transformationModelToState(type, responses, dimensions) {
  let datatypeState = {};

  if (type === SIMPLE) {
    datatypeState = SimpleTransformerFactory().modelToState({ responses });
  } else if (type === SINGLE_CHOICE) {
    datatypeState = SingleTransformerFactory().modelToState({ responses });
  } else if (type === MULTIPLE_CHOICE) {
    datatypeState = MultipleTransformerFactory().modelToState({ responses, dimensions });
  } else if (type === TABLE) {
    datatypeState = TableTransformerFactory().modelToState({ responses, dimensions });
  }

  return {
    type,
    [type]: datatypeState,
  };
}

function transformationStateToForm(currentState, codesListsStore = {}, codesListsTransformers = {}) {
  const { type } = currentState;

  return {
    type,
    [SIMPLE]: SimpleTransformerFactory({
      initialState: currentState[SIMPLE],
    }).stateToForm(),
    [SINGLE_CHOICE]: SingleTransformerFactory({
      initialState: currentState[SINGLE_CHOICE],
      codesListsStore,
      codesListsTransformers,
    }).stateToForm(),
    [MULTIPLE_CHOICE]: MultipleTransformerFactory({
      initialState: currentState[MULTIPLE_CHOICE],
      codesListsStore,
      codesListsTransformers,
    }).stateToForm(),
    [TABLE]: TableTransformerFactory({
      initialState: currentState[TABLE],
      codesListsStore,
      codesListsTransformers,
    }).stateToForm(),
  };
}

function transformationStateToModel(currentState) {
  const { type, [type]: responseFormatState } = currentState;
  const model = {
    responseStructure: {
      dimensions: [],
    },
    responses: [],
  };
  let responseFormatModel = {};

  if (type === SIMPLE) {
    responseFormatModel = SimpleTransformerFactory({ initialState: responseFormatState }).stateToModel();
    model.responses = responseFormatModel.responses;
  } else if (type === SINGLE_CHOICE) {
    responseFormatModel = SingleTransformerFactory({ initialState: responseFormatState }).stateToModel();
    model.responses = responseFormatModel.responses;
  } else if (type === MULTIPLE_CHOICE) {
    responseFormatModel = MultipleTransformerFactory({ initialState: responseFormatState }).stateToModel();
    model.responses = responseFormatModel.responses;
    model.responseStructure.dimensions = responseFormatModel.dimensions;
  } else {
    responseFormatModel = TableTransformerFactory({ initialState: responseFormatState }).stateToModel();
    model.responses = responseFormatModel.responses;
    model.responseStructure.dimensions = responseFormatModel.dimensions;
  }
  return model;
}

const ResponseFormatTransformerFactory = (conf = {}) => {
  const { initialState, codesListsStore, codesListsTransformers } = conf;

  let currentState = initialState || defaultResponseFormatState;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, codesListsTransformers);
      return currentState;
    },
    modelToState: (type, responses, dimensions) => {
      currentState = transformationModelToState(type, responses, dimensions, codesListsStore);
      return currentState;
    },
    stateToForm: () => {
      return transformationStateToForm(currentState, codesListsStore, codesListsTransformers);
    },
    stateToModel: () => {
      return transformationStateToModel(currentState, codesListsStore);
    },
  };
};

export default ResponseFormatTransformerFactory;
