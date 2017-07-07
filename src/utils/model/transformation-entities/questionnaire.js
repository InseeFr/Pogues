import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME } from 'constants/pogues-constants';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

export const defaultQuestionnaireState = {
  id: undefined,
  name: undefined,
  label: undefined,
  agency: undefined,
  survey: undefined,
  components: [],
  codeLists: [],
  conditions: [],
};

export const defaultQuestionnaireModel = {
  id: '',
  name: '',
  label: [],
  declarations: [],
  goTos: [],
  controls: [],
  genericName: QUESTIONNAIRE,
  children: [],
  depth: 0,
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
  const { id, name, label: [label], agency, survey, components, codesLists, conditions } = model;
  const questionnaireData = {
    id,
    name,
    label,
    agency,
    survey,
    components: Object.keys(components),
    codeLists: Object.keys(codesLists),
    conditions: Object.keys(conditions),
  };

  return {
    ...defaultQuestionnaireState,
    ...questionnaireData,
  };
}

function stateToModel(questionnaire, children, codeList) {
  return {
    ...defaultQuestionnaireModel,
    id: questionnaire.id,
    name: questionnaire.name,
    label: [questionnaire.label],
    children,
    codeLists: {
      codeList,
      codeListSpecification: [],
    },
  };
}

export default {
  modelToState,
  stateToModel,
};
