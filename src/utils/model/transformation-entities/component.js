import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME } from 'constants/pogues-constants';
import ResponseFormat from './response-format';
import { containsComment } from 'utils/model/model-utils';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

export const defaultComponentState = {
  id: undefined,
  type: undefined,
  parent: undefined,
  weight: undefined,
  depth: undefined,
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

export function getQuestionLabelFromRaw(rawQuestionLabel) {
  // @TODO: Markdow is not parsed yed. Include this feature.
  const hasComment = containsComment(rawQuestionLabel);
  if (!hasComment) return rawQuestionLabel;
  const { label } = JSON.parse(hasComment[1]);
  return label;
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
    depth,
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

function stateToModel(state) {
  const model = {};

  if (state.type === QUESTION) {
    model.type = QUESTION_TYPE_NAME;
    model.genericName = '';
  } else {
    model.type = SEQUENCE_TYPE_NAME;

    if (state.type === QUESTIONNAIRE) {
      model.genericName = 'QUESTIONNAIRE';
    } else {
      model.genericName = 'MODULE';
    }
  }
  if (state.id !== undefined) model.id = state.id;
  if (state.depth !== undefined) model.depth = state.depth;
  if (state.name !== undefined) model.name = state.name;
  if (state.label !== undefined) model.label = [state.label];

  return model;
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

  return form;
}

function formToState(values) {
  const { id, type, label, name, parent, weight } = values;
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
