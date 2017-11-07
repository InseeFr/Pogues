import * as Component from './component';
import * as CodesList from './codes-list';
import * as CalculatedVariable from './calculated-variable';
import * as ExternalVariable from './external-variable';
import * as CollectedVariable from './collected-variable';

import { uuid, nestedStoreToFlat } from 'utils/utils';

export function remoteToState(remote) {
  const {
    owner,
    final,
    id,
    Name: name,
    Label: [label],
    agency,
    DataCollection: dataCollection,
    // ComponentGroup: componentGroups, @TODO: This data is not used yet.
  } = remote;

  return {
    owner,
    final: final === undefined,
    id,
    name,
    label,
    agency,
    lastUpdatedDate: new Date().toString(),
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
  const collectedVariablesStore = nestedStoreToFlat(collectedVariableByQuestionStore);
  const { owner, id, label, name, agency, campaigns, final, lastUpdatedDate } = state;
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
    agency: agency || '',
  };

  const componentsRemote = Component.storeToRemote(componentsStore, id, codesListsStore);
  const codesListsRemote = CodesList.storeToRemote(codesListsStore);
  const calculatedVariablesRemote = CalculatedVariable.storeToRemote(calculatedVariablesStore);
  const externalVariablesRemote = ExternalVariable.storeToRemote(externalVariablesStore);
  const collectedVariablesRemote = CollectedVariable.storeToRemote(collectedVariablesStore);

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
