import * as Component from './component';
import * as CodesList from './codes-list';
import * as CalculatedVariable from './calculated-variable';
import * as ExternalVariable from './external-variable';
import * as CollectedVariable from './collected-variable';

import { uuid } from 'utils/utils';
import { getOrderedComponents } from 'utils/model/redirections-utils';
import { removeOrphansCodesLists } from 'utils/codes-lists/codes-lists-utils';
import {
  removeOrphansCollectedVariables,
  getCollectedVariablesIdsFromComponents,
} from 'utils/variables/variables-utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTIONNAIRE, SEQUENCE } = COMPONENT_TYPE;

function generateComponentGroups(componentsStore) {
  const orderedComponents = getOrderedComponents(
    componentsStore,
    Object.keys(componentsStore)
      .filter(id => componentsStore[id].type === SEQUENCE)
      .sort(
        (c1, c2) => componentsStore[c1].weight > componentsStore[c2].weight,
      ),
  );

  let startPage = 1;
  const result = [];
  orderedComponents.forEach(componentId => {
    if (!result[startPage - 1]) {
      result.push({
        id: uuid(),
        Name: `PAGE_${startPage}`,
        Label: [`Components for page ${startPage}`],
        MemberReference: [],
      });
    }
    result[startPage - 1].MemberReference.push(componentId);
    if (componentsStore[componentId].pageBreak) {
      startPage += 1;
    }
  });
  return result;
}

export function remoteToState(remote, currentStores = {}) {
  const {
    owner,
    final,
    id,
    Name: name,
    Label: [label],
    agency,
    DataCollection: dataCollection,
    lastUpdatedDate,
    TargetMode,
    declarationMode,
  } = remote;

  const appState = currentStores.appState || {};
  const activeQuestionnaire = appState.activeQuestionnaire || {};
  const questionnaireCurrentState =
    activeQuestionnaire.id === id ? activeQuestionnaire : {};

  return {
    owner,
    final: final === undefined,
    id,
    name,
    label,
    agency,
    lastUpdatedDate,
    serie: questionnaireCurrentState.serie || '',
    operation: questionnaireCurrentState.operation || '',
    campaigns: dataCollection.map(dc => dc.id),
    TargetMode: TargetMode || declarationMode || [],
  };
}

export function remoteToStore(remote, currentStores = {}) {
  return {
    [remote.id]: remoteToState(remote, currentStores),
  };
}

export function stateToRemote(state, stores) {
  const {
    componentsStore,
    codesListsStore,
    calculatedVariablesStore,
    externalVariablesStore,
    collectedVariableByQuestionStore,
    campaignsStore,
  } = stores;

  const collectedVariablesStore = Object.keys(
    collectedVariableByQuestionStore,
  ).reduce((acc, key) => {
    return { ...acc, ...collectedVariableByQuestionStore[key] };
  }, {});

  // We remove from the stores the elements no associated to a component before saving
  const codesListsWihoutOrphans = removeOrphansCodesLists(
    codesListsStore,
    componentsStore,
  );

  const collectedVariablesWithoutOrphans = removeOrphansCollectedVariables(
    getCollectedVariablesIdsFromComponents(componentsStore),
    collectedVariablesStore,
  );

  const {
    owner,
    id,
    label,
    name,
    agency,
    campaigns,
    final,
    TargetMode,
  } = state;
  const dataCollections = campaigns.map(c => ({
    id: c,
    uri: `http://ddi:fr.insee:DataCollection.${c}`,
    Name: campaignsStore[c].label,
  }));
  const remote = {
    owner,
    final,
    id,
    Label: [label],
    Name: name,
    lastUpdatedDate: new Date().toString(),
    DataCollection: dataCollections,
    genericName: QUESTIONNAIRE,
    ComponentGroup: generateComponentGroups(componentsStore),
    agency: agency || 'fr.insee',
    TargetMode,
  };
  const componentsRemote = Component.storeToRemote(
    componentsStore,
    id,
    collectedVariablesWithoutOrphans,
    codesListsStore,
  );
  const codesListsRemote = CodesList.storeToRemote(codesListsWihoutOrphans);
  const calculatedVariablesRemote = CalculatedVariable.storeToRemote(
    calculatedVariablesStore,
  );
  const externalVariablesRemote = ExternalVariable.storeToRemote(
    externalVariablesStore,
  );
  const collectedVariablesRemote = CollectedVariable.storeToRemote(
    collectedVariablesWithoutOrphans,
  );
  const result = {
    ...remote,
    Child: componentsRemote,
    CodeLists: {
      CodeList: codesListsRemote,
    },
    Variables: {
      Variable: [
        ...calculatedVariablesRemote,
        ...externalVariablesRemote,
        ...collectedVariablesRemote,
      ],
    },
  };
  console.log('result', result)
  return {
    ...remote,
    Child: componentsRemote,
    CodeLists: {
      CodeList: codesListsRemote,
    },
    Variables: {
      Variable: [
        ...calculatedVariablesRemote,
        ...externalVariablesRemote,
        ...collectedVariablesRemote,
      ],
    },
  };
}
