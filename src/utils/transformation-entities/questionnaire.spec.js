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
    const expectedQuestionnaireState = {
      owner: fakeOwnerId,
      id: fakeQuestionnaireId,
      name: 'THISISAQUE',
      label: 'This is a questionnaire',
      agency: 'fr.insee',
      final: false,
      serie: '',
      operation: '',
      campaigns: ['campaign01'],
    };
    const questionnaireTransformer = QuestionnaireTransformerFactory();
    const questionnnairesStore = questionnaireTransformer.modelToStore(questionnaireModel);

    expect(questionnnairesStore[fakeQuestionnaireId]).toEqual(expectedQuestionnaireState);
  });

  test('Should produce expected FORM from questionnaire STATE', () => {
    const questionnaireTransformer = QuestionnaireTransformerFactory({
      owner: fakeOwnerId,
      initialState: questionnaireStore[fakeQuestionnaireId],
    });
    expect(questionnaireTransformer.stateToForm()).toEqual(questionnaireForm);
  });

  test('Should produce expected MODEL from questionnaire STATE', () => {
    const date = new Date().toString();
    const expectedQuestionnaireModel = cloneDeep(questionnaireModel);

    // @TODO: Orphans are removed in the transformation.
    expectedQuestionnaireModel.CodeLists.CodeList = [];
    expectedQuestionnaireModel.Variables.Variable = [
      {
        id: 'FIRSTID',
        Label: 'This is the first label',
        Name: 'Q1_THISISTHE',
        Formula: 'This is the first formula',
        type: 'CalculatedVariableType',
      },
      {
        id: 'SECONID',
        Label: 'This is the second label',
        Name: 'Q2_THISISTHE',
        Formula: 'This is the second formula',
        type: 'CalculatedVariableType',
      },
      {
        id: 'FIRSTID',
        Name: 'Q1_THISISTHE',
        Label: 'This is the first label',
        type: 'ExternalVariableType',
      },
      {
        id: 'SECONID',
        Name: 'Q2_THISISTHE',
        Label: 'This is the second label',
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
      campaignsStore: {
        campaign01: {
          id: 'campaign01',
          label: 'Campaign 01',
        },
      },
    });

    const { ComponentGroup, ...model } = questionnaireTransformer.stateToModel();
    const { ComponentGroup: componentGroupExpected, ...expectedModel } = expectedQuestionnaireModel;

    expect(model).toEqual({
      ...expectedModel,
      lastUpdatedDate: date,
    });
  });
});
