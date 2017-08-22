import { COMPONENT_TYPE } from 'constants/pogues-constants';
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
  dataCollection: undefined,
  componentGroups: undefined,
};

export const defaultQuestionnaireModel = {
  id: '',
  owner: '',
  depth: 0,
  genericName: QUESTIONNAIRE,
  agency: 'fr.insee', // @TODO: This should not be constant,
  Name: '',
  Label: [],
  Child: [],
  // @TODO: Idem
  DataCollection: [
    {
      id: 'dataCollection1',
      uri: 'http://ddi:fr.insee:DataCollection.INSEE-POPO-DC-1.1',
      Name: 'POPO-2017-A00',
    },
  ],
  // @TODO: Idem
  ComponentGroup: [
    {
      id: 'j3tu30jo',
      Name: 'PAGE_1',
      Label: ['Components for page 1'],
      MemberReference: [],
    },
  ],
  CodeLists: {
    CodeList: [],
  },
  Variables: {
    Variable: [],
  },
};

function transformationFormToState(form, currentState) {
  const { owner, id, agency, dataCollection, componentGroups } = currentState;

  const { label, name } = form;

  return {
    owner,
    id: id || uuid(),
    label,
    name,
    agency,
    dataCollection,
    componentGroups,
  };
}

function transformationModelToState(model) {
  const {
    owner,
    id,
    Name: name,
    Label: [label],
    agency,
    DataCollection: dataCollection,
    ComponentGroup: componentGroups,
  } = model;

  return {
    owner,
    id,
    name,
    label,
    agency,
    dataCollection,
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
  const { owner, id, label, name, agency, dataCollection, componentGroups } = currentState;
  const model = {
    owner,
    id,
    Label: [label],
    Name: name,
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

  if (dataCollection) model.DataCollection = dataCollection;
  if (agency) model.agency = agency;
  if (componentGroups) model.ComponentGroup = componentGroups;

  return {
    ...defaultQuestionnaireModel,
    ...model,
    Child: componentsModel,
    CodeLists: {
      CodeList: codesListsModel,
    },
    Variables: {
      Variable: calculatedVariablesModel,
    },
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
