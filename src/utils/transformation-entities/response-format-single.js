import {
  UI_BEHAVIOUR,
  CODES_LIST_INPUT_ENUM,
  DATATYPE_VIS_HINT,
  QUESTION_TYPE_ENUM,
  DATATYPE_NAME,
} from 'constants/pogues-constants';
import CodesListTransformerFactory, { defaultCodesListForm } from './codes-list';
import Response from './response';

const { CHECKBOX } = DATATYPE_VIS_HINT;
const { NEW, REF, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;
const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { TEXT } = DATATYPE_NAME;

export const defaultSingleForm = {
  mandatory: false,
  hasSpecialCode: false,
  specialLabel: '',
  specialCode: '',
  specialUiBehaviour: UI_BEHAVIOUR.FIRST_INTENTION,
  specialFollowUpMessage: '',
  visHint: CHECKBOX,
  type: NEW,
  [NEW]: { ...defaultCodesListForm },
  [REF]: {},
  [QUESTIONNAIRE]: {},
};

export const defaultSingleState = {
  mandatory: false,
  hasSpecialCode: false,
  specialLabel: '',
  specialCode: '',
  specialUiBehaviour: UI_BEHAVIOUR.FIRST_INTENTION,
  specialFollowUpMessage: '',
  visHint: CHECKBOX,
  codesListId: '',
  codesList: {},
};

function transformationFormToState(form, codesListsStore, currentCodesListsIdsStore) {
  const {
    mandatory,
    visHint,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
    type,
    [type]: codesListForm,
  } = form;
  const initialState =
    currentCodesListsIdsStore[SINGLE_CHOICE] !== '' ? { id: currentCodesListsIdsStore[SINGLE_CHOICE] } : undefined;
  const codesListState = CodesListTransformerFactory({
    initialState,
    codesListsStore,
    type,
  }).formToState(codesListForm);

  return {
    mandatory,
    visHint,
    hasSpecialCode,
    specialLabel: hasSpecialCode ? specialLabel : '',
    specialCode: hasSpecialCode ? specialCode : '',
    specialUiBehaviour: hasSpecialCode ? specialUiBehaviour : UI_BEHAVIOUR.FIRST_INTENTION,
    specialFollowUpMessage: hasSpecialCode ? specialFollowUpMessage : '',
    codesListId: codesListState.id,
    codesList: codesListState,
    type,
  };
}

function transformationModelToState(model) {
  const { visHint, mandatory, nonResponseModality, codesListId } = model;
  return {
    codesListId,
    mandatory,
    visHint,
    hasSpecialCode: !!nonResponseModality,
    specialLabel: nonResponseModality !== undefined ? nonResponseModality.label : '',
    specialCode: nonResponseModality !== undefined ? nonResponseModality.value : '',
    specialUiBehaviour:
      nonResponseModality && !nonResponseModality.firstIntentionDisplay
        ? UI_BEHAVIOUR.SECOND_INTENTION
        : UI_BEHAVIOUR.FIRST_INTENTION,
    specialFollowUpMessage: nonResponseModality ? nonResponseModality.invite : '',
  };
}

function transformationStateToForm(currentState, codesListsStore) {
  const {
    codesListId,
    visHint,
    mandatory,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
    type,
  } = currentState;

  return {
    ...defaultSingleForm,
    mandatory,
    visHint,
    codesListId,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
    [type]: CodesListTransformerFactory({ initialState: codesListsStore[codesListId], type }).stateToForm(),
  };
}

function transformationStateToModel(currentState) {
  return {
    Response: [Response.stateToModel({ type: TEXT, maxLength: 1, pattern: '', ...currentState })],
  };
}

const SingleTransformerFactory = (conf = {}) => {
  const { initialState, codesListsStore, currentCodesListsIdsStore } = conf;

  let currentState = initialState || defaultSingleState;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, codesListsStore, currentCodesListsIdsStore);
      return currentState;
    },
    modelToState: model => {
      const {
        responses: [
          { Datatype: { visualizationHint: visHint }, mandatory, nonResponseModality, CodeListReference: codesListId },
        ],
      } = model;
      currentState = transformationModelToState({ visHint, mandatory, nonResponseModality, codesListId });
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

export default SingleTransformerFactory;
