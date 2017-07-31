import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME } from 'constants/pogues-constants';
import Component from 'utils/transformation-entities/component';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

export const defaultQuestionnaireForm = {
  label: '',
  name: '',
};

export const defaultQuestionnaireState = {
  id: undefined,
  owner: undefined,
  name: undefined,
  label: undefined,
  components: [],
  codeLists: [],
  conditions: [],
  declarations: [],
  controls: [],
  redirections: [],
  agency: undefined,
  survey: undefined,
};

export const defaultQuestionnaireModel = {
  id: '',
  name: '',
  label: [],
  declarations: [],
  redirections: [],
  controls: [],
  genericName: QUESTIONNAIRE,
  children: [],
  depth: 0,
  owner: '',
  type: SEQUENCE_TYPE_NAME,
  agency: 'fr.insee', // @TODO: This should not be constant,
  survey: {
    agency: 'fr.insee', // @TODO: Idem
    name: 'POPO', // @TODO: Idem,
    id: '',
  },
  componentGroups: [
    // @TODO: Idem
    {
      name: 'PAGE_1', // @TODO: Idem
      label: 'Components for page 1', // @TODO: Idem
      Member: [],
      id: '',
    },
  ],
  codeLists: {
    codeList: [],
    codeListSpecification: [],
  },
};

function modelToState(model) {
  const { id, name, label: [label], agency, survey, components, codesLists, conditions, owner } = model;
  const questionnaireData = {
    id,
    name,
    label,
    agency,
    survey,
    owner,
    components: Object.keys(components),
    codeLists: Object.keys(codesLists),
    conditions: Object.keys(conditions),
  };

  return {
    ...defaultQuestionnaireState,
    ...questionnaireData,
  };
}

function stateToModel(questionnaire, components, codesLists = {}, codeList = []) {
  const { id, owner } = questionnaire;
  const model = Component.stateToModel({ ...components[id], depth: 0 }, components, codesLists);

  return {
    ...defaultQuestionnaireModel,
    ...model,
    owner,
    codeLists: {
      codeList,
      codeListSpecification: [],
    },
  };
}

function formToState(form) {
  const { id, name, label, owner } = form;

  return {
    ...defaultQuestionnaireState,
    id,
    name,
    label,
    owner,
  };
}

export default {
  modelToState,
  stateToModel,
  formToState,
};
