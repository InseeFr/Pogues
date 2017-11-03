import {
  UI_BEHAVIOUR,
  DATATYPE_VIS_HINT,
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';
import { CodesListFactory, defaultCodesList } from 'widgets/codes-lists';
import Response from './response';

const { CHECKBOX } = DATATYPE_VIS_HINT;
const { TEXT } = DATATYPE_NAME;

export const defaultSingleForm = {
  mandatory: false,
  hasSpecialCode: false,
  specialLabel: '',
  specialCode: '',
  specialUiBehaviour: UI_BEHAVIOUR.FIRST_INTENTION,
  specialFollowUpMessage: '',
  visHint: CHECKBOX,
  [DEFAULT_CODES_LIST_SELECTOR_PATH]: defaultCodesList,
};

export const defaultSingleState = {
  mandatory: false,
  hasSpecialCode: false,
  specialLabel: '',
  specialCode: '',
  specialUiBehaviour: UI_BEHAVIOUR.FIRST_INTENTION,
  specialFollowUpMessage: '',
  visHint: CHECKBOX,
  [DEFAULT_CODES_LIST_SELECTOR_PATH]: defaultCodesList,
};

function transformationFormToState(form, currentState) {
  const {
    mandatory,
    visHint,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListForm,
  } = form;

  return {
    mandatory,
    visHint,
    hasSpecialCode,
    specialLabel: hasSpecialCode ? specialLabel : '',
    specialCode: hasSpecialCode ? specialCode : '',
    specialUiBehaviour: hasSpecialCode ? specialUiBehaviour : UI_BEHAVIOUR.FIRST_INTENTION,
    specialFollowUpMessage: hasSpecialCode ? specialFollowUpMessage : '',
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodesListFactory({ initialComponentState: currentState }).formToState(
      codesListForm
    ),
  };
}

function transformationModelToState(model) {
  const { visHint, mandatory, nonResponseModality, codesListId } = model;
  return {
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListId },
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
    visHint,
    mandatory,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: codesListState,
  } = currentState;

  return {
    ...defaultSingleForm,
    mandatory,
    visHint,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodesListFactory({
      codesListsStore,
      initialComponentState: codesListState,
    }).stateComponentToForm(),
  };
}

function transformationStateToModel(currentState, collectedVariables) {
  return {
    Response: [
      Response.stateToModel({
        ...currentState,
        typeName: TEXT,
        maxLength: 1,
        pattern: '',
        collectedVariable: collectedVariables[0],
      }),
    ],
  };
}

const SingleTransformerFactory = (conf = {}) => {
  const { initialState, codesListsStore, collectedVariables } = conf;
  let currentState = initialState || defaultSingleState;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, currentState);
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
      return transformationStateToModel(currentState, collectedVariables);
    },
  };
};

export default SingleTransformerFactory;
