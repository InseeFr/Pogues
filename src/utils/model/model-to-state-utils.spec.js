jest.dontMock('./model-to-state-utils.js');

import { normalizeQuestionnaire, normalizeComponent } from './model-to-state-utils';
import fakeQuestionnaireModel from './fake-questionnaire-model';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE;

describe.skip('normalizeQuestionnaire', () => {
  test('should return "questionnaire" attribute with the expected values', () => {
    const expectedValue = {
      id: fakeQuestionnaireModel.id,
    };
    const state = normalizeQuestionnaire(fakeQuestionnaireModel);
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^state: ', state);
    expect(state.componentByQuestionnaire.id).toEqual(expectedValue.id);
  });
});

describe.skip('normalizeComponent', () => {
  test('should return expected values when the component is of type "SEQUENCE"', () => {
    const sequence = fakeQuestionnaireModel.children[0];
    const expectedValue = {
      id: sequence.id,
      name: sequence.name,
      label: sequence.label[0],
      parent: fakeQuestionnaireModel.id,
      children: sequence.children.map(c => c.id),
      type: SEQUENCE,
    };
    const component = normalizeComponent(sequence, fakeQuestionnaireModel.id);

    expect(component).toEqual(expectedValue);
  });

  test('should return expected values when the component is of type "QUESTION"', () => {
    const question = fakeQuestionnaireModel.children[0].children[0].children[0];
    const expectedValue = {
      id: question.id,
      name: question.name,
      label: question.label[0],
      parent: fakeQuestionnaireModel.id,
      children: [],
      type: QUESTION,
    };
    const component = normalizeComponent(question, fakeQuestionnaireModel.id);

    expect(component).toEqual(expectedValue);
  });
});
