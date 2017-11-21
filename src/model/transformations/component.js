import * as ResponseFormat from './response-format';
import * as Declaration from './declaration';
import * as Control from './control';
import * as Redirection from './redirection';
import * as CollectedVariable from './collected-variable';

import { COMPONENT_TYPE, SEQUENCE_TYPE_NAME, QUESTION_TYPE_NAME } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

function remoteToState(remote, componentGroup, codesListsStore) {
  const {
    id,
    questionType,
    genericName,
    Name: name,
    Label: [label],
    Declaration: declarations,
    GoTo: redirections,
    Control: controls,
    Response: responses,
    ResponseStructure: responseStructure,
    Child: children,
    parent,
    weight,
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
    state.label = label;
    state.responseFormat = ResponseFormat.remoteToState(questionType, responses, dimensions, codesListsStore);
    state.collectedVariables = CollectedVariable.remoteToComponentState(responses);

  }

  const cg = componentGroup.find(group => group.MemberReference && group.MemberReference.indexOf(id) >= 0)
  state.pageBreak = cg && cg.MemberReference.indexOf(id) === (cg.MemberReference.length - 1)

  return state;
}

function remoteToStoreNested(children, parent, componentGroup, codesListsStore = {}, acc = {}) {
  let weight = 0;
  children.forEach(child => {
    acc[child.id] = remoteToState({ ...child, weight, parent }, componentGroup, codesListsStore);
    weight += 1;
    if (child.Child) remoteToStoreNested(child.Child, child.id, componentGroup, codesListsStore, acc);
    return acc;
  });

  return acc;
}

export function remoteToStore(remote, questionnaireId, codesListsStore) {
  return {
    ...remoteToStoreNested(remote.Child, questionnaireId, remote.ComponentGroup, codesListsStore),
    [questionnaireId]: remoteToState(remote, []),
  };
}

function childrenToRemote(children, store, codesListsStore = {}, depth = 0) {
  return children
    .sort((keyA, keyB) => {
      if (store[keyA].weight < store[keyB].weight) return -1;
      if (store[keyA].weight > store[keyB].weight) return 1;
      return 0;
    })
    .map(key => {
      const newDepth = depth + 1;
      return storeToRemoteNested(store[key], store, codesListsStore, newDepth); // eslint-disable-line no-use-before-define
    });
}

function storeToRemoteNested(state, store, codesListsStore = {}, depth = 1) {
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
  } = state;

  let remote = {
    id,
    depth,
    Name,
    Label: [label],
    Declaration: Declaration.stateToRemote(declarations),
    Control: Control.stateToRemote(controls),
    GoTo: Redirection.stateToRemote(redirections),
  };

  if (type === QUESTION) {
    remote.type = QUESTION_TYPE_NAME;
    remote.questionType = responseFormat.type;
    remote = {
      ...remote,
      ...ResponseFormat.stateToRemote(responseFormat, collectedVariables, codesListsStore),
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
    remote.Child = childrenToRemote(children, store, codesListsStore, depth);
  }

  return remote;
}

export function storeToRemote(store, questionnaireId, codesListsStore) {
  return store[questionnaireId].children.map(key => {
    return storeToRemoteNested(store[key], store, codesListsStore);
  });
}
