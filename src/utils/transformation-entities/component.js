import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME } from 'constants/pogues-constants';
import { getQuestionLabelFromRaw } from 'utils/model/model-utils';
import { nameFromLabel } from 'utils/name-utils';
import ResponseFormat from './response-format';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

export const defaultComponentForm = {
  label: '',
};

export const defaultComponentState = {
  id: undefined,
  type: undefined,
  parent: undefined,
  weight: undefined,
  name: undefined,
  label: undefined,
  rawLabel: undefined,
  children: [],
  responseFormat: undefined,
};

export const defaultComponentModel = {
  type: '',
  id: '',
  name: '',
  label: [],
  genericName: '',
  depth: 0,
  goTos: [],
  declarations: [],
  controls: [],
  children: [],
  questionType: '',
  responses: [],
};

function formToState(values) {
  const { id, type, label, name, parent, weight, responseFormat } = values;

  const componentData = {
    id,
    type,
    name: name || nameFromLabel(label),
    parent: parent || '',
    weight: weight || 0,
  };

  if (type === QUESTION) {
    componentData.rawLabel = label;
    componentData.label = label;
    componentData.responseFormat = ResponseFormat.formToState(responseFormat);
  } else {
    componentData.label = label;
  }

  return {
    ...defaultComponentState,
    ...componentData,
  };
}

function stateToForm(component, activeCodeLists, activeCodes) {
  const { label, name, type, responseFormat } = component;
  const form = {
    label,
    name,
  };

  if (type === QUESTION) {
    form.responseFormat = ResponseFormat.stateToForm(responseFormat, activeCodeLists, activeCodes);
  }

  return {
    ...defaultComponentForm,
    ...form,
  };
}

function stateToModel(component) {
  const { id, depth, name, label, type, children, responseFormat } = component;
  let componentModel = {
    id,
    depth,
    name,
    label: [label],
    children,
  };

  if (type === QUESTION) {
    componentModel.type = QUESTION_TYPE_NAME;
    componentModel.questionType = responseFormat.type;
    componentModel = { ...componentModel, ...ResponseFormat.stateToModel(responseFormat) };
  } else {
    componentModel.type = SEQUENCE_TYPE_NAME;
    if (type === QUESTIONNAIRE) {
      componentModel.genericName = 'QUESTIONNAIRE';
    } else {
      componentModel.genericName = 'MODULE';
    }
  }

  return {
    ...defaultComponentModel,
    ...componentModel,
  };
}

function modelToState(model) {
  const {
    id,
    type,
    depth,
    name,
    label: [label],
    parent,
    weight,
    children,
    questionType,
    responses,
    responseStructure,
  } = model;
  const componentData = {
    id,
    name,
    parent: parent || '',
    weight: weight || 0,
  };

  if (type === SEQUENCE_TYPE_NAME) {
    componentData.children = children.map(child => child.id);
    componentData.label = label;
    if (depth === 0) {
      componentData.type = QUESTIONNAIRE;
    } else if (depth === 1) {
      componentData.type = SEQUENCE;
    } else {
      componentData.type = SUBSEQUENCE;
    }
  } else if (type === QUESTION_TYPE_NAME) {
    const dimensions = responseStructure ? responseStructure.dimensions : [];
    componentData.type = QUESTION;
    componentData.label = getQuestionLabelFromRaw(label);
    componentData.rawLabel = label;
    componentData.responseFormat = ResponseFormat.modelToState({
      type: questionType,
      responses,
      dimensions,
    });
  }

  return {
    ...defaultComponentState,
    ...componentData,
  };
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
