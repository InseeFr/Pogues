jest.dontMock('./component.js');

import ComponentTransformerFactory from './component';
import { questionnaireModel, fakeQuestionnaireId } from './__mocks__/questionnaire';
import {
  componentsStore,
  componentsModel,
  sequenceFormDefault,
  sequenceForm,
  sequenceInfos,
  sequenceState,
  subsequenceForm,
  subsequenceInfos,
  subsequenceState,
  questionFormDefault,
  questionForm,
  questionInfos,
  questionState,
} from './__mocks__/component';
import { codesListsStore } from './__mocks__/codes-list';
import { calculatedVariablesStore } from './__mocks__/calculated-variable';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

describe.skip('Transformation entities - Component', () => {
  test('Should produce expected STATE in sequence creation from FORM', () => {
    expect(ComponentTransformerFactory().formToState(sequenceForm, sequenceInfos)).toEqual(sequenceState);
  });

  test('Should produce expected STATE in subsequence creation from FORM', () => {
    expect(ComponentTransformerFactory().formToState(subsequenceForm, subsequenceInfos)).toEqual(subsequenceState);
  });

  test('Should produce expected STATE in question creation from FORM', () => {
    expect(ComponentTransformerFactory().formToState(questionForm, questionInfos)).toEqual(questionState);
  });

  test('Should produce expected STORE from questionnaire MODEL', () => {
    const componentTransformer = ComponentTransformerFactory({ questionnaireId: fakeQuestionnaireId, codesListsStore });
    expect(componentTransformer.modelToStore(questionnaireModel)).toEqual(componentsStore);
  });

  test('Should produce expected FORM for a new sequence or subsequence', () => {
    const componentTransformer = ComponentTransformerFactory();
    expect(componentTransformer.stateToForm({ type: SEQUENCE })).toEqual(sequenceFormDefault);
    expect(componentTransformer.stateToForm({ type: SUBSEQUENCE })).toEqual(sequenceFormDefault);
  });

  test('Should produce expected FORM for a new question', () => {
    const componentTransformer = ComponentTransformerFactory({ codesListsStore, calculatedVariablesStore });
    expect(componentTransformer.stateToForm({ type: QUESTION })).toEqual(questionFormDefault);
  });

  test('Should produce expected FORM for a existing sequence or subsequence', () => {
    const componentTransformer = ComponentTransformerFactory({ initialStore: componentsStore });
    expect(componentTransformer.stateToForm({ id: 'FAKE_COMPONENT_ID_1' })).toEqual(sequenceFormDefault);
    expect(componentTransformer.stateToForm({ id: 'FAKE_COMPONENT_ID_2' })).toEqual(sequenceFormDefault);
  });

  test('Should produce expected FORM for a existing question', () => {
    const componentTransformer = ComponentTransformerFactory({
      initialStore: componentsStore,
      codesListsStore,
      calculatedVariablesStore,
    });
    expect(componentTransformer.stateToForm({ type: QUESTION })).toEqual(questionFormDefault);
  });

  test('Should produce expected MODEL from questionnaire STORE', () => {
    const componentTransformer = ComponentTransformerFactory({
      initialStore: componentsStore,
      questionnaireId: fakeQuestionnaireId,
      codesListsStore,
    });
    expect(componentTransformer.storeToModel()).toEqual(componentsModel);
  });
});
