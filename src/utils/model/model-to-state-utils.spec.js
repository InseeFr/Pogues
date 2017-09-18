jest.dontMock('./model-to-state-utils.js');

import { questionnaireModelToStores, getComponentsFromNestedQuestionnaire } from './model-to-state-utils';
import questionnaires from './__mocks__/questionnaires';

const questionnaire = questionnaires[0];

describe.skip('Model to state', () => {
  test('A component representing the questionnaire should be added to the list of components', () => {
    const components = getComponentsFromNestedQuestionnaire(questionnaire.children, questionnaire.id);
    const numComponents = Object.keys(components).length;
    const update = questionnaireModelToStores(questionnaire);
    const numComponentsById = Object.keys(update.componentByQuestionnaire[questionnaire.id]).length;
    expect(numComponentsById).toBe(numComponents + 1);
  });
});
