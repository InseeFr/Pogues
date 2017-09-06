import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { uuid } from 'utils/data-utils';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
import CodesListTransformerFactory from 'utils/transformation-entities/codes-list';
import CalculatedVariableTransformerFactory from 'utils/transformation-entities/calculated-variable';
import ExternalVariableTransformerFactory from 'utils/transformation-entities/external-variable';
import CollectedVariableTransformerFactory from 'utils/transformation-entities/collected-variable';

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
  const { owner, id, agency, dataCollection, componentGroups, final, lastUpdatedDate } = currentState;

  const { label, name } = form;

  return {
    owner,
    id: id || uuid(),
    label,
    name,
    agency,
    dataCollection,
    componentGroups,
    final,
    lastUpdatedDate,
  };
}

function transformationModelToState(model) {
  const {
    owner,
    final,
    id,
    Name: name,
    Label: [label],
    agency,
    DataCollection: dataCollection,
    ComponentGroup: componentGroups,
    lastUpdatedDate,
  } = model;

  return {
    owner,
    final,
    id,
    name,
    label,
    agency,
    dataCollection,
    componentGroups,
    lastUpdatedDate,
  };
}

function transformationStateToForm(currentState) {
  const { label, name, final, lastUpdatedDate } = currentState;
  return {
    label,
    name,
    final,
    lastUpdatedDate,
  };
}

function transformationStateToModel(
  currentState,
  componentsStore,
  codesListsStore,
  conditionsStore,
  calculatedVariablesStore,
  externalVariablesStore,
  collectedVariableByQuestionStore
) {
  const { owner, id, label, name, agency, dataCollection, componentGroups, final, lastUpdatedDate } = currentState;
  const model = {
    owner,
    final,
    id,
    Label: [label],
    Name: name,
    lastUpdatedDate,
  };

  const componentsModel = ComponentTransformerFactory({
    questionnaireId: id,
    initialStore: componentsStore,
    codesListsStore,
  }).storeToModel();

  const calculatedVariablesModel = CalculatedVariableTransformerFactory({
    initialStore: calculatedVariablesStore,
  }).storeToModel();

  const externalVariablesModel = ExternalVariableTransformerFactory({
    initialStore: externalVariablesStore,
  }).storeToModel();

  const collectedVariablesModel = CollectedVariableTransformerFactory({
    initialStore: Object.keys(collectedVariableByQuestionStore || {}).reduce((acc, key) => {
      return {
        ...acc,
        ...collectedVariableByQuestionStore[key],
      };
    }, {}),
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
      Variable: [...calculatedVariablesModel, ...externalVariablesModel, ...collectedVariablesModel],
    },
  };
}

const QuestionnaireTransformerFactory = (conf = {}) => {
  const {
    owner,
    initialState,
    componentsStore,
    codesListsStore,
    conditionsStore,
    calculatedVariablesStore,
    externalVariablesStore,
    collectedVariableByQuestionStore,
  } = conf;

  let currentState = initialState || defaultQuestionnaireState;

  if (owner) currentState.owner = owner;
  if (!currentState.final) currentState.final = false;
  if (!currentState.lastUpdatedDate) {
    currentState.lastUpdatedDate = new Date().toString();
  }

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
        calculatedVariablesStore,
        externalVariablesStore,
        collectedVariableByQuestionStore
      );
    },
  };
};

export default QuestionnaireTransformerFactory;
