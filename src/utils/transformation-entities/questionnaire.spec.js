jest.dontMock('./questionnaire.js');

import cloneDeep from 'lodash.clonedeep';

import {
  fakeOwnerId,
  fakeQuestionnaireId,
  questionnaireForm,
  questionnaireStore,
  questionnaireModel,
} from './__mocks__/questionnaire';
import { componentsStore, fakeQuestionId } from './__mocks__/component';
import { codesListsStore } from './__mocks__/codes-list';
import { conditionsStore } from './__mocks__/condition';
import { calculatedVariablesStore } from './__mocks__/calculated-variable';
import { externalVariablesStore } from './__mocks__/external-variable';
import { collectedVariablesStore } from './__mocks__/collected-variable';
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

  test('Should produce expected STATE from questonnaire MODEL', () => {
    const date = new Date().toString();
    const questionnaireTransformer = QuestionnaireTransformerFactory();
    expect(
      questionnaireTransformer.modelToStore({
        ...questionnaireModel,
        lastUpdatedDate: date,
      })
    ).toEqual({
      ...questionnaireStore,
    });
  });

  test('Should produce expected FORM from questionnaire STATE', () => {
    const date = new Date().toString();
    const questionnaireTransformer = QuestionnaireTransformerFactory({
      owner: fakeOwnerId,
      initialState: {
        ...questionnaireStore[fakeQuestionnaireId],
        lastUpdatedDate: date,
      },
    });
    expect(questionnaireTransformer.stateToForm()).toEqual({
      ...questionnaireForm,
      lastUpdatedDate: date,
    });
  });

  test('Should produce expected MODEL from questionnaire STATE', () => {
    const date = new Date().toString();
    const expectedQuestionnaireModel = cloneDeep(questionnaireModel);
    expectedQuestionnaireModel.Variables.Variable = [
      {
        id: 'FIRSTID',
        Label: 'This is the first label',
        Name: 'Q1_THISISTHE',
        Formula: 'This is the first formula',
        type: 'CalculatedVariableType',
      },
      {
        id: 'FIRSTID',
        Name: 'Q1_THISISTHE',
        Label: 'This is the first label',
        type: 'ExternalVariableType',
      },
      {
        id: 'FIRSTID',
        Name: 'Q1_THISISTHE',
        Label: 'This is the first label',
        type: 'CollectedVariableType',
      },
    ];

    const questionnaireTransformer = QuestionnaireTransformerFactory({
      owner: fakeOwnerId,
      initialState: {
        ...questionnaireStore[fakeQuestionnaireId],
        lastUpdatedDate: date,
      },
      componentsStore,
      codesListsStore,
      conditionsStore,
      calculatedVariablesStore,
      externalVariablesStore,
      collectedVariableByQuestionStore: {
        [fakeQuestionId]: collectedVariablesStore,
      },
    });

    expect(questionnaireTransformer.stateToModel()).toEqual({
      ...expectedQuestionnaireModel,
      lastUpdatedDate: date,
    });
  });
});
