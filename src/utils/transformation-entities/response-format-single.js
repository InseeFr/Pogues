import {
  CODES_LIST_INPUT_ENUM,
  DATATYPE_NAME,
  DATATYPE_VIS_HINT,
  QUESTION_TYPE_ENUM,
} from 'constants/pogues-constants';
import CodesListTransformerFactory, { defaultCodesListForm } from './codes-list';
import Response from './response';

const { CHECKBOX } = DATATYPE_VIS_HINT;
const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
const { TEXT } = DATATYPE_NAME;
const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;

export const defaultSingleForm = {
  mandatory: false,
  visHint: CHECKBOX,
  codesListId: '',
  type: NEW,
  [NEW]: { ...defaultCodesListForm },
  [REF]: {},
  [QUESTIONNAIRE]: {},
};

export const defaultSingleState = {
  mandatory: false,
  visHint: CHECKBOX,
  codesListId: '',
};

function transformationFormToState(form, codesListsTransformers) {
  const { mandatory, visHint, type, [type]: codesListForm } = form;
  const codesListState = codesListsTransformers[SINGLE_CHOICE].formToState(codesListForm);

  return {
    mandatory,
    visHint,
    codesListId: codesListState.id,
  };
}

function transformationModelToState(model) {
  const { visHint, mandatory, codesListId } = model;

  return {
    codesListId,
    mandatory,
    visHint,
  };
}

function transformationStateToForm(currentState, codesListsStore, codesListsTransformers) {
  const { codesListId, visHint, mandatory } = currentState;
  const codesListTransformer = CodesListTransformerFactory({ initialState: codesListsStore[codesListId] });

  codesListsTransformers[SINGLE_CHOICE] = codesListTransformer;

  return {
    ...defaultSingleForm,
    mandatory,
    visHint,
    codesListId,
    [NEW]: codesListTransformer.stateToForm(),
  };
}

function transformationStateToModel(currentState) {
  const { mandatory, visHint, codesListId } = currentState;
  const responses = [];
  responses.push(
    Response.stateToModel({
      mandatory,
      codeListReference: codesListId,
      type: TEXT,
      datatype: {
        maxLength: 1,
        pattern: '',
        visHint,
      },
    })
  );

  return {
    responses,
  };
}

const SingleTransformerFactory = (conf = {}) => {
  const { initialState, codesListsStore, codesListsTransformers } = conf;

  let currentState = initialState || defaultSingleState;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, codesListsTransformers);
      return currentState;
    },
    modelToState: model => {
      const { responses: [{ datatype: { visHint }, mandatory, codeListReference: codesListId }] } = model;
      currentState = transformationModelToState({ visHint, mandatory, codesListId });
      return currentState;
    },
    stateToForm: () => {
      return transformationStateToForm(currentState, codesListsStore, codesListsTransformers);
    },
    stateToModel: () => {
      return transformationStateToModel(currentState);
    },
  };
};

export default SingleTransformerFactory;
