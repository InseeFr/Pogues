jest.dontMock('./model-to-state-utils.js');

import { normalizeQuestionnaire, normalizeComponent } from './model-to-state-utils';
import fakeQuestionnaireModel from './fake-questionnaire-model';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE;
const model = fakeQuestionnaireModel;

describe('normalizeQuestionnaire', () => {
  test('should return "questionnaire" attribute with the expected values', () => {
    const expectedValue = {
      id: model.id,
      label: model.label[0],
    };
    const state = normalizeQuestionnaire(model);

    expect(state.questionnaire).toEqual(expectedValue);
  });
});

describe('normalizeComponent', () => {
  test('should return expected values when the component is of type "SEQUENCE"', () => {
    const sequence = model.children[0];
    const expectedValue = {
      id: sequence.id,
      name: sequence.name,
      label: sequence.label[0],
      parent: model.id,
      children: sequence.children.map(c => c.id),
      type: SEQUENCE,
    };
    const component = normalizeComponent(sequence, model.id);

    expect(component).toEqual(expectedValue);
  });

  test('should return expected values when the component is of type "QUESTION"', () => {
    const question = model.children[0].children[0].children[0];
    const expectedValue = {
      id: question.id,
      name: question.name,
      label: question.label[0],
      parent: model.id,
      children: [],
      type: QUESTION,
    };
    const component = normalizeComponent(question, model.id);

    expect(component).toEqual(expectedValue);
  });
});
