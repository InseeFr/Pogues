jest.dontMock('./questionnaire.js');

import {
  fakeOwnerId,
  fakeQuestionnaireId,
  questionnaireForm,
  questionnaireStore,
  questionnaireModel,
} from './__mocks__/questionnaire';
import { componentsStore } from './__mocks__/component';
import { codesListsStore } from './__mocks__/codes-list';
import { conditionsStore } from './__mocks__/condition';
import { calculatedVariablesStore } from './__mocks__/calculated-variable';
import { externalVariablesStore } from './__mocks__/external-variable';
import QuestionnaireTransformerFactory from './questionnaire';

describe('Transformation entities - Questionnaire', () => {
  test('Should produce expected STATE in questionnaire creation from creation FORM', () => {
    const questionnaireTransformer = QuestionnaireTransformerFactory({
      owner: fakeOwnerId,
      initialState: questionnaireStore[fakeQuestionnaireId],
    });

    // The id creation is random in questionnaire creation, so it's not take it into account for testing.
    const { id: stateId, ...state } = questionnaireTransformer.formToState(questionnaireForm);
    const { [fakeQuestionnaireId]: { id: expectedStateId, ...expectedState } } = questionnaireStore;

    expect(state).toEqual(expectedState);
  });

  test('Should produce expected STATE from questionnaire MODEL', () => {
    const questionnaireTransformer = QuestionnaireTransformerFactory();
    expect(questionnaireTransformer.modelToStore(questionnaireModel)).toEqual(questionnaireStore);
  });

  test('Should produce expected FORM from questionnaire STATE', () => {
    const questionnaireTransformer = QuestionnaireTransformerFactory({
      owner: fakeOwnerId,
      initialState: questionnaireStore[fakeQuestionnaireId],
    });
    expect(questionnaireTransformer.stateToForm()).toEqual(questionnaireForm);
  });

  test('Should produce expected MODEL from questionnaire STATE', () => {
    const questionnaireTransformer = QuestionnaireTransformerFactory({
      owner: fakeOwnerId,
      initialState: questionnaireStore[fakeQuestionnaireId],
      componentsStore,
      codesListsStore,
      conditionsStore,
      calculatedVariablesStore,
      externalVariablesStore,
    });

    expect(questionnaireTransformer.stateToModel()).toEqual(questionnaireModel);
  });
});
