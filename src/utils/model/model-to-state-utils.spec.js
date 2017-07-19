jest.dontMock('./model-to-state-utils.js');

import { questionnaireModelToState, getComponentsFromNestedQuestionnaire } from './model-to-state-utils';
import questionnaire from './fake-questionnaire-model-complet';

describe.skip('Model to state', () => {
  test('A component representing the questionnaire should be added to the list of components', () => {
    const components = getComponentsFromNestedQuestionnaire(questionnaire.children, questionnaire.id);
    const numComponents = Object.keys(components).length;
    const update = questionnaireModelToState(questionnaire);
    const numComponentsById = Object.keys(update.componentByQuestionnaire[questionnaire.id]).length;
    expect(numComponentsById).toBe(numComponents + 1);
  });
});
