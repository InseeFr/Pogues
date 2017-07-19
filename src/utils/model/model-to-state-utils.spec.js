jest.dontMock('./model-to-state.js');

import { questionnaireModelToState, getComponentsFromNestedQuestionnaire } from './model-to-state-utils';
import { questionnaires } from './test-data/model-questionnaires-data';

const questionnaire = questionnaires[3];

describe('Model to state', () => {
  test('A component representing the questionnaire should be added to the list of components', () => {
    const components = getComponentsFromNestedQuestionnaire(questionnaire.children, questionnaire.id);
    const numComponents = Object.keys(components).length;
    const update = questionnaireModelToState(questionnaire);
    const numComponentsById = Object.keys(update.componentByQuestionnaire[questionnaire.id]).length;
    expect(numComponentsById).toBe(numComponents + 1);
  });
});
