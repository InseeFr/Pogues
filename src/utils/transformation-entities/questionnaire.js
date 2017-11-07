import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { uuid } from 'utils/utils';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
import CodesListTransformerFactory from 'utils/transformation-entities/codes-list';
import CalculatedVariableTransformerFactory from 'utils/transformation-entities/calculated-variable';
import ExternalVariableTransformerFactory from 'utils/transformation-entities/external-variable';
import CollectedVariableTransformerFactory from 'utils/transformation-entities/collected-variable';
import {
  removeOrphansCollectedVariables,
  getCollectedVariablesIdsFromComponents,
} from 'utils/variables/variables-utils';
import { removeOrphansCodesLists } from 'utils/codes-lists/codes-lists-utils';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

export const defaultQuestionnaireState = {
  owner: undefined,
  id: '',
  label: '',
  name: '',
  serie: '',
  operation: '',
  campaigns: [],
  lastUpdatedDate: undefined,
  final: undefined,
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
  DataCollection: [],
  ComponentGroup: [],
  CodeLists: {
    CodeList: [],
  },
  Variables: {
    Variable: [],
  },
};

function transformationFormToState(form, currentState) {
  const { owner, id, final, agency, lastUpdatedDate } = currentState;
  const { label, name, serie, operation, campaigns } = form;

  return {
    owner,
    id: id || uuid(),
    label,
    name,
    serie,
    operation,
    campaigns: campaigns.split(','),
    final,
    agency,
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
    // ComponentGroup: componentGroups, @TODO: This data is not used yet.
    lastUpdatedDate,
  } = model;

  return {
    owner,
    final,
    id,
    name,
    label,
    agency,
    lastUpdatedDate,
    serie: '',
    operation: '',
    campaigns: dataCollection.map(dc => dc.id),
  };
}

function transformationStateToForm(currentState) {
  const { label, name, serie, operation, campaigns } = currentState;

  // If serie and operation doesn't exist, we use campaigns to obtain them calling a service
  return {
    label,
    name,
    serie,
    operation,
    campaigns: campaigns.join(),
  };
}

function transformationStateToModel(
  currentState,
  componentsStore,
  codesListsStore,
  conditionsStore,
  calculatedVariablesStore,
  externalVariablesStore,
  collectedVariableByQuestionStore,
  campaignsStore
) {
  const { owner, id, label, name, agency, campaigns, final, lastUpdatedDate } = currentState;
  const dataCollections = campaigns.map(c => ({
    id: c,
    uri: `http://ddi:fr.insee:DataCollection.${c}`,
    Name: campaignsStore[c].label,
  }));
  const model = {
    owner,
    final,
    id,
    Label: [label],
    Name: name,
    lastUpdatedDate,
    DataCollection: dataCollections,
    ComponentGroup: [
      {
        id: uuid(),
        Name: 'PAGE_1',
        Label: ['Components for page 1'],
        MemberReference: Object.keys(componentsStore),
      },
    ],
  };

  if (agency) model.agency = agency;

  const componentsModel = ComponentTransformerFactory({
    questionnaireId: id,
    initialStore: componentsStore,
    codesListsStore,
  }).storeToModel();

  const collectedVariablesStore = Object.keys(collectedVariableByQuestionStore || {}).reduce((acc, key) => {
    return {
      ...acc,
      ...collectedVariableByQuestionStore[key],
    };
  }, {});

  const calculatedVariablesModel = CalculatedVariableTransformerFactory({
    initialStore: calculatedVariablesStore,
  }).storeToModel();

  const externalVariablesModel = ExternalVariableTransformerFactory({
    initialStore: externalVariablesStore,
  }).storeToModel();

  const collectedVariablesModel = CollectedVariableTransformerFactory({
    initialStore: removeOrphansCollectedVariables(
      getCollectedVariablesIdsFromComponents(componentsStore),
      collectedVariablesStore
    ),
  }).storeToModel();

  const codesListsModel = CodesListTransformerFactory().storeToModel(
    removeOrphansCodesLists(codesListsStore, componentsStore)
  );

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
    campaignsStore,
  } = conf;
  let currentState = initialState || defaultQuestionnaireState;
  let questionnaireComponentState;

  if (owner) currentState.owner = owner;

  if (!currentState.final) currentState.final = false;

  if (!currentState.lastUpdatedDate) {
    currentState.lastUpdatedDate = new Date().toString();
  }

  if (componentsStore) {
    questionnaireComponentState = componentsStore[currentState.id];
  } else {
    questionnaireComponentState = ComponentTransformerFactory({
      initialState: {
        label: currentState.label,
        name: currentState.name,
        id: currentState.id,
        type: QUESTIONNAIRE,
      },
    }).modelToQuestionnaireComponent();
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
        componentsStore || { [questionnaireComponentState.id]: questionnaireComponentState },
        codesListsStore,
        conditionsStore,
        calculatedVariablesStore,
        externalVariablesStore,
        collectedVariableByQuestionStore,
        campaignsStore || {}
      );
    },
    getQuestionnaireState: () => {
      return currentState;
    },
    getQuestionnaireComponentState: () => {
      return questionnaireComponentState;
    },
  };
};

export default QuestionnaireTransformerFactory;
