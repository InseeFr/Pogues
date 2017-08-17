import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME } from 'constants/pogues-constants';
import { uuid } from 'utils/data-utils';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
import CodesListTransformerFactory from 'utils/transformation-entities/codes-list';
import CalculatedVariableTransformerFactory from 'utils/transformation-entities/calculated-variable';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

export const defaultQuestionnaireState = {
  owner: undefined,
  id: undefined,
  label: '',
  name: '',
  agency: undefined,
  survey: undefined,
  componentGroups: undefined,
};

export const defaultQuestionnaireModel = {
  id: '',
  name: '',
  label: [],
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
  calculatedVariables: [],
};

function transformationFormToState(form, currentState) {
  const { owner, id, agency, survey, componentGroups } = currentState;

  const { label, name } = form;

  return {
    owner,
    id: id || uuid(),
    label,
    name,
    agency,
    survey,
    componentGroups,
  };
}

function transformationModelToState(model) {
  const { owner, id, name, label: [label], agency, survey, componentGroups } = model;

  return {
    owner,
    id,
    name,
    label,
    agency,
    survey,
    componentGroups,
  };
}

function transformationStateToForm(currentState) {
  const { label, name } = currentState;
  return {
    label,
    name,
  };
}

function transformationStateToModel(
  currentState,
  componentsStore,
  codesListsStore,
  conditionsStore,
  calculatedVariablesStore
) {
  const { owner, id, label, name, agency, survey, componentGroups } = currentState;
  const model = {
    owner,
    id,
    label: [label],
    name,
  };

  const componentsModel = ComponentTransformerFactory({
    questionnaireId: id,
    initialStore: componentsStore,
    codesListsStore,
  }).storeToModel();

  const calculatedVariablesModel = CalculatedVariableTransformerFactory({
    initialStore: calculatedVariablesStore,
  }).storeToModel();

  const codesListsModel = CodesListTransformerFactory().storeToModel(codesListsStore);

  if (survey) model.survey = survey;
  if (agency) model.agency = agency;
  if (componentGroups) model.componentGroups = componentGroups;

  return {
    ...defaultQuestionnaireModel,
    ...model,
    children: componentsModel,
    codeLists: {
      codeList: codesListsModel,
      codeListSpecification: [],
    },
    calculatedVariables: calculatedVariablesModel,
  };
}

const QuestionnaireTransformerFactory = (conf = {}) => {
  const { owner, initialState, componentsStore, codesListsStore, conditionsStore, calculatedVariablesStore } = conf;

  let currentState = initialState || defaultQuestionnaireState;

  if (owner) currentState.owner = owner;

  return {
    formToState: form => {
      currentState = transformationFormToState(form, currentState);
      return currentState;
    },
    modelToStore: model => {
      currentState = transformationModelToState(model);
      return {
        [currentState.id]: currentState,
      };
    },
    stateToForm: () => {
      return transformationStateToForm(currentState);
    },
    stateToModel: () => {
      return transformationStateToModel(
        currentState,
        componentsStore,
        codesListsStore,
        conditionsStore,
        calculatedVariablesStore
      );
    },
  };
};

export default QuestionnaireTransformerFactory;
