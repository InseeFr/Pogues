import QuestionnaireTransformerFactory from 'utils/transformation-entities/questionnaire';
import CalculatedVariableTransformerFactory from 'utils/transformation-entities/calculated-variable';
import ExternalVariableTransformerFactory from 'utils/transformation-entities/external-variable';
import CodesListTransformerFactory from 'utils/transformation-entities/codes-list';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
// import Condition from 'utils/transformation-entities/condition';
import { VARIABLES_TYPES } from 'constants/pogues-constants';
import Logger from 'utils/logger/logger';

const { CALCULATED, EXTERNAL } = VARIABLES_TYPES;
const logger = new Logger('ModelToStateUtils', 'Utils');

export function questionnaireModelToStores(model) {
  const { id, CodeLists: { CodeList: codesLists }, Variables: { Variable: variables } } = model;
  const calculatedVariables = variables.filter(v => v.type === CALCULATED);
  const externalVariables = variables.filter(v => v.type === EXTERNAL);

  // Questionnaire store
  const questionnaireById = QuestionnaireTransformerFactory(model).modelToStore(model);

  // Calculate variables store
  const calculatedVariableByQuestionnaire = {
    [id]: CalculatedVariableTransformerFactory().modelToStore(calculatedVariables),
  };

  // External variables store
  const externalVariableByQuestionnaire = {
    [id]: ExternalVariableTransformerFactory().modelToStore(externalVariables),
  };

  // Codes lists store
  const codesListsStore = CodesListTransformerFactory().modelToStore(codesLists);
  const codeListByQuestionnaire = {
    [id]: codesListsStore,
  };

  // Components store
  const componentByQuestionnaire = {
    [id]: ComponentTransformerFactory({ questionnaireId: id, codesListsStore }).modelToStore(model),
  };

  // const questions = filterQuestions(components);
  // const conditions = getConditionsFromQuestions(questions);
  // @TODO
  // const conditionByQuestionnaire = {
  //   [id]: {},
  // };

  return {
    questionnaireById,
    calculatedVariableByQuestionnaire,
    externalVariableByQuestionnaire,
    codeListByQuestionnaire,
    componentByQuestionnaire,
    conditionByQuestionnaire: {},
  };
}

export function questionnaireListModelToState(questionnairesList) {
  const questionnairesStates = [];

  for (let i = 0; i < questionnairesList.length; i += 1) {
    let questionnaireState;
    try {
      questionnaireState = questionnaireModelToStores(questionnairesList[i]);
    } catch (e) {
      logger.error(e);
    }

    if (questionnaireState) questionnairesStates.push(questionnaireState);
  }
  return questionnairesStates;
}
