import {
  COMPONENT_TYPE,
  FORMULA_LANGUAGE,
  QUESTIONNAIRE_TYPE,
  QUESTION_END_CHILD,
} from '../../constants/pogues-constants';
import { uuid } from '../../utils/utils';
import {
  getCollectedVariablesIdsFromComponents,
  removeOrphansCollectedVariables,
} from '../../utils/variables/variables-utils';
import * as CalculatedVariable from './calculated-variable';
import * as CodesList from './codes-list';
import * as CollectedVariable from './collected-variable';
import * as Component from './component';
import * as ExternalVariable from './external-variable';
import * as Loop from './loop';
import * as RedirectionsFilter from './redirection-filters';

const { QUESTIONNAIRE, SEQUENCE, FILTER, REDIRECTION, EXTERNAL_ELEMENT } =
  COMPONENT_TYPE;
const { Filtres, Redirections } = QUESTIONNAIRE_TYPE;
const { XPATH, VTL } = FORMULA_LANGUAGE;

function generateComponentGroups(componentsStore, ComponentGroup) {
  const orderedComponents = getOrderedComponents(
    componentsStore,
    Object.keys(componentsStore)
      .filter(
        (id) =>
          componentsStore[id].type === SEQUENCE ||
          componentsStore[id].type === EXTERNAL_ELEMENT,
      )
      .sort(
        (c1, c2) => componentsStore[c1].weight > componentsStore[c2].weight,
      ),
  );
  let startPage = 1;
  const result = [];
  orderedComponents.forEach((componentId) => {
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

function getOrderedComponents(componentsStore, rootComponentIds) {
  return rootComponentIds.reduce((acc, id) => {
    return [
      ...acc,
      id,
      ...getOrderedComponents(
        componentsStore,
        componentsStore[id].children.sort(
          (c1, c2) => componentsStore[c1].weight > componentsStore[c2].weight,
        ),
      ),
    ];
  }, []);
}

const generateChildQuestionnaireRef = (componentsStore) => {
  return Object.keys(componentsStore).filter(
    (id) => componentsStore[id].type === EXTERNAL_ELEMENT,
  );
};

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
    ComponentGroup,
    flowLogic,
    formulasLanguage,
    childQuestionnaireRef,
    articulation,
    multimode,
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
    campaigns: dataCollection.map((dc) => dc.id),
    TargetMode: TargetMode || declarationMode || [],
    dynamiqueSpecified:
      flowLogic && flowLogic === FILTER ? Filtres : Redirections,
    formulaSpecified:
      formulasLanguage && formulasLanguage === VTL ? VTL : XPATH,
    ComponentGroup,
    childQuestionnaireRef,
    articulation,
    multimode,
  };
}

export function remoteToState1(remote) {
  const {
    owner,
    final,
    id,
    Label: [label],
    lastUpdatedDate,
    DataCollection,
    TargetMode,
    Name: name,
    flowLogic,
    formulasLanguage,
    childQuestionnaireRef,
  } = remote;

  return {
    owner,
    final: final === undefined,
    id,
    label,
    lastUpdatedDate,
    campaigns: DataCollection.map((dc) => dc.id),
    TargetMode: TargetMode || [],
    name,
    dynamiqueSpecified:
      flowLogic && flowLogic === FILTER ? Filtres : Redirections,
    formulaSpecified:
      formulasLanguage && formulasLanguage === VTL ? VTL : XPATH,
    childQuestionnaireRef,
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

  const codesListDuplicated = Object.values(codesListsStore).filter(
    (code) => code.isDuplicated,
  );
  if (codesListDuplicated.length > 0) {
    codesListDuplicated.forEach((element) => {
      codesListsStore[element.id] = element;
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
    formulaSpecified,
    ComponentGroup,
    articulation,
    multimode,
  } = state;

  const dataCollections = campaigns.map((c) => ({
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
    formulasLanguage:
      formulaSpecified && formulaSpecified === VTL ? VTL : XPATH,
    childQuestionnaireRef: generateChildQuestionnaireRef(componentsStore),
    articulation,
    multimode,
  };
  const componentsRemote = Component.storeToRemote(
    componentsStore,
    id,
    collectedVariablesWithoutOrphans,
    codesListsStore,
    dynamiqueSpecified,
    formulaSpecified,
  );
  const questionEnd = QUESTION_END_CHILD;
  questionEnd.TargetMode = TargetMode;
  componentsRemote.push(QUESTION_END_CHILD);
  const codesListsRemote = CodesList.storeToRemote(codesListsStore);
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
