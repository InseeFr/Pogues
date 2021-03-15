import * as Component from './component';
import * as CodesList from './codes-list';
import * as CalculatedVariable from './calculated-variable';
import * as ExternalVariable from './external-variable';
import * as CollectedVariable from './collected-variable';
import * as Loop from './loop';
import * as RedirectionsFilter from './redirection-filters';

import { uuid } from 'utils/utils';
import { getOrderedComponents } from 'utils/model/redirections-utils';
import { removeOrphansCodesLists } from 'utils/codes-lists/codes-lists-utils';
import {
  removeOrphansCollectedVariables,
  getCollectedVariablesIdsFromComponents,
} from 'utils/variables/variables-utils';
import {
  COMPONENT_TYPE,
  QUESTION_END_CHILD,
  QUESTIONNAIRE_TYPE,
} from 'constants/pogues-constants';
import { element, object } from 'prop-types';

const { QUESTIONNAIRE, SEQUENCE, FILTER, REDIRECTION } = COMPONENT_TYPE;
const { Filtres, Redirections } = QUESTIONNAIRE_TYPE;

function generateComponentGroups(componentsStore, ComponentGroup) {
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
        id:
          ComponentGroup && ComponentGroup[startPage - 1]?.id
            ? ComponentGroup[startPage - 1].id
            : uuid(),
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
  if (
    result[result.length - 1] &&
    !result[result.length - 1].MemberReference.includes('idendquest')
  ) {
    result[result.length - 1].MemberReference.push('idendquest');
  }
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
    FlowControl,
    ComponentGroup,
    flowLogic,
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
    dynamiqueSpecified:
      flowLogic && flowLogic === FILTER ? Filtres : Redirections,
    ComponentGroup,
  };
}

export function remoteToState1(remote) {
  const {
    final,
    id,
    Label: [label],
    lastUpdatedDate,
    DataCollection,
    TargetMode,
    Name: name,
    flowLogic,
  } = remote;

  return {
    final: final === undefined,
    id,
    label,
    lastUpdatedDate,
    campaigns: DataCollection.map(dc => dc.id),
    TargetMode: TargetMode || [],
    name,
    dynamiqueSpecified:
      flowLogic && flowLogic === FILTER ? Filtres : Redirections
  };
}

export function remoteToStore(remote, currentStores = {}) {
  return {
    [remote.id]: remoteToState(remote, currentStores),
  };
}

export function remoteToStore1(remote) {
  return {
    [remote.id]: remoteToState1(remote),
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
  const codesListDuplicated = Object.values(codesListsStore).filter(
    code => code.isDuplicated,
  );
  if (codesListDuplicated.length > 0) {
    codesListDuplicated.forEach(element => {
      codesListsWihoutOrphans[element.id] = element;
    });
  }

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
    dynamiqueSpecified,
    ComponentGroup,
  } = state;

  const dataCollections = campaigns.map(c => ({
    id: c,
    uri: `http://ddi:fr.insee:DataCollection.${c}`,
    Name: campaignsStore ? campaignsStore[c]?.label : undefined,
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
    ComponentGroup: generateComponentGroups(componentsStore, ComponentGroup),
    agency: agency || 'fr.insee',
    TargetMode,
    flowLogic: dynamiqueSpecified === Redirections ? REDIRECTION : FILTER,
  };
  const componentsRemote = Component.storeToRemote(
    componentsStore,
    id,
    collectedVariablesWithoutOrphans,
    codesListsStore,
    dynamiqueSpecified,
  );
  const questionEnd = QUESTION_END_CHILD;
  questionEnd.TargetMode = TargetMode;
  componentsRemote.push(QUESTION_END_CHILD);
  const codesListsRemote = CodesList.storeToRemote(codesListsWihoutOrphans);
  const calculatedVariablesRemote = CalculatedVariable.storeToRemote(
    calculatedVariablesStore,
  );
  const externalVariablesRemote = ExternalVariable.storeToRemote(
    externalVariablesStore,
  );
  const collectedVariablesRemote = CollectedVariable.storeToRemote(
    collectedVariablesWithoutOrphans,
    componentsStore,
  );
  const Iterations = Loop.stateToRemote(componentsStore);
  const FlowControl = RedirectionsFilter.stateToRemote(componentsStore);

  const json = {
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
  if (Iterations.length !== 0) {
    json.Iterations = {
      Iteration: Iterations,
    };
  }
  if (dynamiqueSpecified === Filtres) {
    json.FlowControl = FlowControl;
  }
  return json;
}
