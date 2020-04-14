import * as Questionnaire from './transformations/questionnaire';
import * as CalculatedVariable from './transformations/calculated-variable';
import * as ExternalVariable from './transformations/external-variable';
import * as CollectedVariable from './transformations/collected-variable';
import * as CodesList from './transformations/codes-list';
import * as Component from './transformations/component';
import { VARIABLES_TYPES } from 'constants/pogues-constants';

const { CALCULATED, EXTERNAL, COLLECTED } = VARIABLES_TYPES;

export function questionnaireRemoteToStores(remote, currentStores = {}) {
  const {
    id,
    CodeLists: { CodeList: codesLists },
    Variables: { Variable: variables },
  } = remote;
  const calculatedVariables = variables.filter(v => v.type === CALCULATED);
  const externalVariables = variables.filter(v => v.type === EXTERNAL);
  const collectedVariables = variables.filter(v => v.type === COLLECTED);

  // Questionnaire store
  const questionnaireById = Questionnaire.remoteToStore(remote, currentStores);

  // Calculate variables store
  const calculatedVariableByQuestionnaire = {
    [id]: CalculatedVariable.remoteToStore(calculatedVariables),
  };

  // External variables store
  const externalVariableByQuestionnaire = {
    [id]: ExternalVariable.remoteToStore(externalVariables),
  };
  // Codes lists store
  const variableclarification = Component.getClarificarionfromremote(remote.Child);
  const codesListsStore = CodesList.remoteToStore(codesLists, variableclarification);
  
  const codeListByQuestionnaire = {
    [id]: codesListsStore,
  };
  // Collected variables store
  const responsesByVariable = Component.remoteToVariableResponse(remote);
  const collectedVariableByQuestionnaire = {
    [id]: CollectedVariable.remoteToStore(
      collectedVariables,
      responsesByVariable,
      codesListsStore,
      variableclarification
    ),
  };

  // Components store
  const componentByQuestionnaire = {
    [id]: Component.remoteToStore(remote, id, codesListsStore),
  };
  return {
    questionnaireById,
    calculatedVariableByQuestionnaire,
    externalVariableByQuestionnaire,
    collectedVariableByQuestionnaire,
    codeListByQuestionnaire,
    componentByQuestionnaire,
  };
}

export function questionnaireListRemoteToStores(questionnairesList) {
  const questionnairesStates = [];

  for (let i = 0; i < questionnairesList.length; i += 1) {
    let questionnaireState;
    try {
      questionnaireState = questionnaireRemoteToStores(questionnairesList[i]);
    } catch (e) {
      //
    }

    if (questionnaireState) questionnairesStates.push(questionnaireState);
  }
  return questionnairesStates;
}
