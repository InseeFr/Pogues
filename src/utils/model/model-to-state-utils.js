import Questionnaire from 'utils/transformation-entities/questionnaire';
import Component from 'utils/transformation-entities/component';
import CodesList from 'utils/transformation-entities/codes-list';
import Code from 'utils/transformation-entities/code';
import Condition from 'utils/transformation-entities/condition';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { uuid } from 'utils/data-utils';
import { containsComment } from './model-utils';

const { QUESTION } = COMPONENT_TYPE;

export function getComponentsFromNestedQuestionnaire(questionnaireChildren, questionnaireId) {
  function getComponentsFromNested(children, parent, carry) {
    let weight = 0;
    children.forEach(child => {
      carry[child.id] = Component.modelToState({ ...child, weight, parent });
      weight += 1;
      if (child.children) getComponentsFromNested(child.children, child.id, carry);
      return carry;
    });

    return carry;
  }
  return getComponentsFromNested(questionnaireChildren, questionnaireId, {});
}

export function getCodesListAndCodesFromQuestionnaire(codesLists) {
  return codesLists.reduce(
    (acc, codesList) => {
      const codes = codesList.codes.reduce((accCodes, code) => {
        const id = uuid();
        return {
          ...accCodes,
          [id]: { ...Code.modelToState({ ...code, id }) },
        };
      }, {});

      acc.codesLists = {
        ...acc.codesLists,
        [codesList.id]: { ...CodesList.modelToState({ ...codesList, codes }) },
      };

      acc.codes = {
        ...acc.codes,
        ...codes,
      };

      return acc;
    },
    { codesLists: {}, codes: {} }
  );
}

export function filterQuestions(components) {
  return Object.keys(components).reduce((acc, key) => {
    if (components[key].type === QUESTION) acc[key] = components[key];
    return acc;
  }, {});
}

export function getConditionsFromQuestionRawLabel(questionRawLabel) {
  const hasComment = containsComment(questionRawLabel);
  if (!hasComment) return {};
  const { conditions } = JSON.parse(hasComment[1]);
  return conditions.reduce((acc, cond) => {
    const condition = Condition.modelToState(cond);
    return {
      ...acc,
      [condition.id]: conditions,
    };
  }, {});
}

export function getConditionsFromQuestions(questions) {
  return Object.keys(questions).reduce((acc, key) => {
    const conditions = getConditionsFromQuestionRawLabel(questions[key].rawLabel);
    return {
      ...acc,
      ...conditions,
    };
  }, {});
}

export function questionnaireModelToState(questionnaireModel) {
  const { id, children, codeLists: { codeList } } = questionnaireModel;
  const components = getComponentsFromNestedQuestionnaire(children, id);
  const questionnaireComponent = Component.modelToState(questionnaireModel);
  const questions = filterQuestions(components);
  const { codesLists, codes } = getCodesListAndCodesFromQuestionnaire(codeList);
  const conditions = getConditionsFromQuestions(questions);
  const questionnaire = Questionnaire.modelToState({ ...questionnaireModel, components, codesLists, conditions });

  const conditionByQuestionnaire = {
    [id]: {
      ...conditions,
    },
  };

  const codeListByQuestionnaire = {
    [id]: {
      ...codesLists,
    },
  };

  const codeByQuestionnaire = {
    [id]: {
      ...codes,
    },
  };

  const componentByQuestionnaire = {
    [id]: {
      ...components,
      [id]: questionnaireComponent,
    },
  };

  const questionnaireById = {
    [id]: {
      ...questionnaire,
    },
  };

  return {
    questionnaireById,
    componentByQuestionnaire,
    codeListByQuestionnaire,
    codeByQuestionnaire,
    conditionByQuestionnaire,
  };
}

export function questionnaireListModelToState(questionnairesList) {
  return questionnairesList.map(questionnaire => questionnaireModelToState(questionnaire));
}
