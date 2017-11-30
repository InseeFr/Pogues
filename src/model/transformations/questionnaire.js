import * as Component from './component';
import * as CodesList from './codes-list';
import * as CalculatedVariable from './calculated-variable';
import * as ExternalVariable from './external-variable';
import * as CollectedVariable from './collected-variable';

import { uuid } from 'utils/utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { removeOrphansCodesLists } from 'utils/codes-lists/codes-lists-utils';
import {
  removeOrphansCollectedVariables,
  getCollectedVariablesIdsFromComponents,
} from 'utils/variables/variables-utils';

const { QUESTIONNAIRE } = COMPONENT_TYPE;

export function remoteToState(remote) {
  const {
    owner,
    final,
    id,
    Name: name,
    Label: [label],
    agency,
    DataCollection: dataCollection,
    lastUpdatedDate,
    // ComponentGroup: componentGroups, @TODO: This data is not used yet.
  } = remote;

  return {
    owner,
    final: final === undefined,
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

export function remoteToStore(remote) {
  return {
    [remote.id]: remoteToState(remote),
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

  const collectedVariablesStore = Object.keys(collectedVariableByQuestionStore).reduce((acc, key) => {
    return { ...acc, ...collectedVariableByQuestionStore[key] };
  }, {});

  // We remove from the stores the elements no associated to a component before saving
  const codesListsWihoutOrphans = removeOrphansCodesLists(codesListsStore, componentsStore);
  const collectedVariablesWithoutOrphans = removeOrphansCollectedVariables(
    getCollectedVariablesIdsFromComponents(componentsStore),
    collectedVariablesStore
  );

  const { owner, id, label, name, agency, campaigns, final } = state;
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
    ComponentGroup: [
      {
        id: uuid(),
        Name: 'PAGE_1',
        Label: ['Components for page 1'],
        MemberReference: Object.keys(componentsStore),
      },
    ],
    agency: agency || '',
  };
  const componentsRemote = Component.storeToRemote(componentsStore, id, collectedVariablesWithoutOrphans);
  const codesListsRemote = CodesList.storeToRemote(codesListsWihoutOrphans);
  const calculatedVariablesRemote = CalculatedVariable.storeToRemote(calculatedVariablesStore);
  const externalVariablesRemote = ExternalVariable.storeToRemote(externalVariablesStore);
  const collectedVariablesRemote = CollectedVariable.storeToRemote(collectedVariablesWithoutOrphans);

  return {
    ...remote,
    Child: componentsRemote,
    CodeLists: {
      CodeList: codesListsRemote,
    },
    Variables: {
      Variable: [...calculatedVariablesRemote, ...externalVariablesRemote, ...collectedVariablesRemote],
    },
  };
}
