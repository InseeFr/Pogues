import * as ResponseFormat from './response-format';
import * as Declaration from './declaration';
import * as Control from './control';
import * as Redirection from './redirection';
import * as CollectedVariable from './collected-variable';

import {
  COMPONENT_TYPE,
  SEQUENCE_TYPE_NAME,
  QUESTION_TYPE_NAME
} from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

function sortByWeight(store) {
  return (keyA, keyB) => {
    if (store[keyA].weight < store[keyB].weight) return -1;
    if (store[keyA].weight > store[keyB].weight) return 1;
    return 0;
  };
}

function getResponseCoordinate(variablesMapping = []) {
  return variablesMapping.reduce((acc, m) => {
    const axis = m.MappingTarget.split(' ');

    return {
      ...acc,
      [m.MappingSource]: {
        x: parseInt(axis[0], 10),
        y: parseInt(axis[1], 10)
      }
    };
  }, {});
}

function getResponsesByVariable(responses = [], coordinatesByResponse = []) {
  return responses.reduce((accInner, response) => {
    const {
      id: responseId,
      CollectedVariableReference: collectedVariableId
    } = response;
    // Mapping only exists in the questions with a matrix of responses
    const coordinates = coordinatesByResponse[responseId] || {};

    return {
      ...accInner,
      [collectedVariableId]: {
        ...coordinates
      }
    };
  }, {});
}

function remoteToVariableResponseNested(children = [], acc = {}) {
  children.forEach(child => {
    const {
      Response: responses,
      ResponseStructure: responseStructure,
      Child: childrenInner
    } = child;
    const variableResponseMapping = responseStructure
      ? responseStructure.Mapping
      : undefined;
    const coordinatesByResponse = getResponseCoordinate(
      variableResponseMapping
    );

    acc = {
      ...acc,
      ...getResponsesByVariable(responses, coordinatesByResponse),
      ...remoteToVariableResponseNested(childrenInner, acc)
    };
  });

  return acc;
}

export function remoteToVariableResponse(remote) {
  return remoteToVariableResponseNested(remote.Child);
}

function remoteToState(remote, componentGroup, codesListsStore) {
  const {
    id,
    questionType,
    genericName,
    Name: name,
    Label: [label],
    Declaration: declarations,
    // Trello #196 : ouput : GoTo --> FlowControl
    FlowControl: redirections,
    Control: controls,
    Response: responses,
    ResponseStructure: responseStructure,
    Child: children,
    parent,
    weight,
    TargetMode,
    declarationMode
  } = remote;

  const state = {
    id,
    name,
    parent: parent || '',
    weight: weight || 0,
    children: children ? children.map(child => child.id) : [],
    declarations: Declaration.remoteToState(declarations),
    controls: Control.remoteToState(controls),
    redirections: Redirection.remoteToState(redirections),
    TargetMode: TargetMode || declarationMode || []
  };

  if (genericName) {
    state.label = label;
    if (genericName === QUESTIONNAIRE) {
      state.type = QUESTIONNAIRE;
    } else if (genericName === 'MODULE') {
      state.type = SEQUENCE;
    } else if (genericName === 'SUBMODULE') {
      state.type = SUBSEQUENCE;
    }
  } else {
    const dimensions = responseStructure ? responseStructure.Dimension : [];

    state.type = QUESTION;
    state.label = label.replace(/&#xd;/gi,'\n\n');
    state.responseFormat = ResponseFormat.remoteToState(
      questionType,
      responses,
      dimensions,
      codesListsStore
    );
    state.collectedVariables = CollectedVariable.remoteToComponentState(
      responses
    );
  }

  const cGroupIndex = componentGroup.findIndex(
    group => group.MemberReference && group.MemberReference.indexOf(id) >= 0
  );
  const cGroup = componentGroup[cGroupIndex];

  state.pageBreak =
    cGroup &&
    cGroupIndex < componentGroup.length - 1 &&
    cGroup.MemberReference.indexOf(id) === cGroup.MemberReference.length - 1;

  return state;
}

function remoteToStoreNested(
  children,
  parent,
  componentGroup,
  codesListsStore = {},
  acc = {}
) {
  let weight = 0;
  children.forEach(child => {
    acc[child.id] = remoteToState(
      { ...child, weight, parent },
      componentGroup,
      codesListsStore
    );
    weight += 1;
    if (child.Child)
      remoteToStoreNested(
        child.Child,
        child.id,
        componentGroup,
        codesListsStore,
        acc
      );
    return acc;
  });

  return acc;
}

export function remoteToStore(remote, questionnaireId, codesListsStore) {
  return {
    ...remoteToStoreNested(
      remote.Child,
      questionnaireId,
      remote.ComponentGroup,
      codesListsStore
    ),
    [questionnaireId]: remoteToState(remote, [])
  };
}

function childrenToRemote(
  children,
  store,
  collectedVariablesStore = {},
  depth = 0
) {
  return children.sort(sortByWeight(store)).map(key => {
    const newDepth = depth + 1;
    return storeToRemoteNested(
      store[key],
      store,
      collectedVariablesStore,
      newDepth
    ); // eslint-disable-line no-use-before-define
  });
}

function storeToRemoteNested(
  state,
  store,
  collectedVariablesStore = {},
  depth = 1
) {
  const {
    id,
    name: Name,
    label,
    type,
    children,
    responseFormat,
    declarations,
    controls,
    redirections,
    collectedVariables,
    TargetMode
  } = state;

  let remote = {
    id,
    depth,
    Name,
    Label: [label.replace(/\n\n/gi,'&#xd;')],
    Declaration: Declaration.stateToRemote(declarations),
    Control: Control.stateToRemote(controls),
    // Trello #196 : ouput : GoTo --> FlowControl
    FlowControl: Redirection.stateToRemote(redirections),
    TargetMode
  };

  if (type === QUESTION) {
    remote.type = QUESTION_TYPE_NAME;
    remote.questionType = responseFormat.type;
    remote = {
      ...remote,
      ...ResponseFormat.stateToRemote(
        responseFormat,
        collectedVariables,
        collectedVariablesStore
      )
    };
  } else {
    remote.type = SEQUENCE_TYPE_NAME;
    if (type === QUESTIONNAIRE) {
      remote.genericName = 'QUESTIONNAIRE';
    } else if (type === SEQUENCE) {
      remote.genericName = 'MODULE';
    } else {
      remote.genericName = 'SUBMODULE';
    }
    remote.Child = childrenToRemote(
      children,
      store,
      collectedVariablesStore,
      depth
    );
  }

  return remote;
}

export function storeToRemote(store, questionnaireId, collectedVariablesStore) {
  return store[questionnaireId].children.sort(sortByWeight(store)).map(key => {
    return storeToRemoteNested(store[key], store, collectedVariablesStore);
  });
}
