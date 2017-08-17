// import _ from 'lodash';

import QuestionnaireTransformerFactory from 'utils/transformation-entities/questionnaire';
import CalculatedVariableTransformerFactory from 'utils/transformation-entities/calculated-variable';
import CodesListTransformerFactory from 'utils/transformation-entities/codes-list';
import ComponentTransformerFactory from 'utils/transformation-entities/component';
// import Condition from 'utils/transformation-entities/condition';

export function questionnaireModelToStores(model) {
  // const model = _.cloneDeep(questionnaireModel);
  const { id, codeLists: { codeList }, calculatedVariables } = model;

  // Questionnaire store
  const questionnaireById = QuestionnaireTransformerFactory(model).modelToStore(model);

  // Calculate variables store
  const calculatedVariableByQuestionnaire = {
    [id]: CalculatedVariableTransformerFactory().modelToStore(calculatedVariables),
  };

  // Codes lists store
  const codesListsStore = CodesListTransformerFactory().modelToStore(codeList);
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
  const conditionByQuestionnaire = {
    [id]: {},
  };

  return {
    questionnaireById,
    componentByQuestionnaire,
    codeListByQuestionnaire,
    conditionByQuestionnaire,
    calculatedVariableByQuestionnaire,
  };
}

export function questionnaireListModelToState(questionnairesList) {
  return questionnairesList.map(questionnaire => questionnaireModelToStores(questionnaire));
}
