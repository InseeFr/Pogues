import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

export const defaultComponentState = {
  id: undefined,
  type: undefined,
  parent: undefined,
  weight: undefined,
  depth: undefined,
  name: undefined,
  label: undefined,
};

class Component {
  constructor() {
    this.data = { ...defaultComponentState };
    return this;
  }
  initFromModel(data) {
    const { id, type, depth, name, label: [label] } = data;
    const componentData = {
      id,
      depth,
      name,
      label,
    };

    if (type === SEQUENCE_TYPE_NAME) {
      if (depth === 0) {
        componentData.type = QUESTIONNAIRE;
      } else if (depth === 1) {
        componentData.type = SEQUENCE;
      } else {
        componentData.type = SUBSEQUENCE;
      }
    } else if (type === QUESTION_TYPE_NAME) {
      componentData.type = QUESTION;
    }

    this.data = {
      ...this.data,
      ...componentData,
    };

    return this;
  }
  initFromState(data) {
    this.data = {
      ...this.data,
      ...data,
    };
    return this;
  }
  getStateData() {
    return { ...this.data };
  }
  transformToModel() {
    const model = {};
    const data = this.data;

    if (data.type === QUESTION) {
      model.type = QUESTION_TYPE_NAME;
      model.genericName = '';
    } else {
      model.type = SEQUENCE_TYPE_NAME;

      if (data.type === QUESTIONNAIRE) {
        model.genericName = 'QUESTIONNAIRE';
      } else {
        model.genericName = 'MODULE';
      }
    }
    if (data.id !== undefined) model.id = data.id;
    if (data.depth !== undefined) model.depth = data.depth;
    if (data.name !== undefined) model.name = data.name;
    if (data.label !== undefined) model.label = [data.label];

    return model;
  }
}

export default Component;
