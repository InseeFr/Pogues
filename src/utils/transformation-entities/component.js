import _ from 'lodash';

import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME } from 'constants/pogues-constants';
import { getQuestionLabelFromRaw } from 'utils/model/model-utils';
import { nameFromLabel } from 'utils/name-utils';
import ResponseFormat from './response-format';
import Declaration from './declaration';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

export const defaultComponentForm = {
  label: '',
  name: '',
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
  declarations: undefined,
};

export const defaultComponentModel = {
  id: '',
  type: '',
  name: '',
  label: [],
  genericName: '',
  depth: 0,
  questionType: '',
  children: [],
  responses: [],
  responseStructure: {
    dimensions: {},
  },
  declarations: [],
};

function stateToModelChildren(children, components, codesLists, depth = 0) {
  return children
    .sort((keyA, keyB) => {
      if (components[keyA].weight < components[keyB].weight) return -1;
      if (components[keyA].weight > components[keyB].weight) return 1;
      return 0;
    })
    .map(key => {
      const newDepth = depth + 1;
      return stateToModel({ ...components[key], depth: newDepth }, components, codesLists);
    });
}

function formToState(form) {
  const { id, type, parent, weight, name, label, children, responseFormat, declarations } = form;

  const state = {
    id,
    type,
    label,
    name: name || nameFromLabel(label),
    parent: parent || '',
    weight: weight || 0,
    children: children || [],
  };

  if (type === QUESTION) {
    // @TODO: Markdown parser
    state.label = label;
    state.rawLabel = label;
    state.responseFormat = ResponseFormat.formToState(responseFormat);
    state.declarations = Declaration.formToState(declarations);
  } else {
    state.label = label;
  }

  return {
    ..._.cloneDeep(defaultComponentState),
    ...state,
  };
}

function stateToForm(component, activeCodeLists, activeCodes) {
  const { label, name, type, responseFormat, declarations } = component;

  const form = {
    label,
    name,
  };

  if (type === QUESTION) {
    form.responseFormat = ResponseFormat.stateToForm(responseFormat, activeCodeLists, activeCodes);
    form.declarations = Declaration.stateToForm(declarations);
  }

  return {
    ...defaultComponentForm,
    ...form,
  };
}

function stateToModel(state, components, codesLists = {}) {
  const { id, depth, name, label, type, children, responseFormat, declarations } = state;
  let model = {
    id,
    depth,
    name,
    label: [label],
  };

  if (type === QUESTION) {
    model.type = QUESTION_TYPE_NAME;
    model.questionType = responseFormat.type;

    model = {
      ...model,
      ...ResponseFormat.stateToModel(responseFormat, codesLists),
      ...Declaration.stateToModel(declarations),
    };
  } else {
    model.type = SEQUENCE_TYPE_NAME;
    if (type === QUESTIONNAIRE) {
      model.genericName = 'QUESTIONNAIRE';
    } else {
      model.genericName = 'MODULE';
    }
    model.children = stateToModelChildren(children, components, codesLists, depth);
  }

  return {
    ..._.cloneDeep(defaultComponentModel),
    ...model,
  };
}

function modelToState(model, activeCodeLists = {}) {
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
    declarations,
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
    componentData.responseFormat = ResponseFormat.modelToState(
      {
        type: questionType,
        responses,
        dimensions,
      },
      activeCodeLists
    );
    componentData.declarations = Declaration.modelToState({ declarations });
  }

  return {
    ..._.cloneDeep(defaultComponentState),
    ...componentData,
  };
}

export default {
  modelToState,
  stateToModel,
  stateToForm,
  formToState,
};
