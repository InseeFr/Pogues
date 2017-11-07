import {
  UI_BEHAVIOUR,
  DATATYPE_VIS_HINT,
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';
import { CodesListFactory } from 'widgets/codes-lists';
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
};

export const defaultSingleState = {
  mandatory: false,
  hasSpecialCode: false,
  specialLabel: '',
  specialCode: '',
  specialUiBehaviour: UI_BEHAVIOUR.FIRST_INTENTION,
  specialFollowUpMessage: '',
  visHint: CHECKBOX,
};

function transformationFormToState(form, CodesList) {
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
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodesList.formToStateComponent(codesListForm),
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

function transformationStateToForm(currentState, CodesList) {
  const {
    visHint,
    mandatory,
    hasSpecialCode,
    specialLabel,
    specialCode,
    specialUiBehaviour,
    specialFollowUpMessage,
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
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodesList.stateComponentToForm(),
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

  const CodesList = CodesListFactory({
    codesListsStore,
    initialComponentState: currentState[DEFAULT_CODES_LIST_SELECTOR_PATH],
  });

  return {
    formToState: form => {
      currentState = transformationFormToState(form, CodesList);
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
      return transformationStateToForm(currentState, CodesList);
    },
    stateToModel: () => {
      return transformationStateToModel(currentState, collectedVariables);
    },
    getCodesListStore: () => {
      return CodesList.stateToStore();
    },
  };
};

export default SingleTransformerFactory;
