jest.dontMock('./declaration.js');

import _ from 'lodash';

import Declaration, { defaultDeclarationForm, defaultDeclarationState, defaultDeclarationModel } from './declaration';

describe('Transformation entities - Declaration', () => {
  const declarationFirstState = {
    declarationType: 'INSTRUCTION',
    label: 'This is the first text',
    position: 'AFTER_RESPONSE',
  };
  const declarationSecondState = {
    declarationType: 'INSTRUCTION',
    label: 'This is the second text',
    position: 'AFTER_QUESTION_TEXT',
  };
  const declarationFirstModel = {
    declarationType: 'INSTRUCTION',
    text: 'This is the first text',
    position: 'AFTER_RESPONSE',
  };
  const declarationSecondModel = {
    declarationType: 'INSTRUCTION',
    text: 'This is the second text',
    position: 'AFTER_QUESTION_TEXT',
  };
  test('Default form shape should be the expected', () => {
    const expectedForm = {
      declarationType: 'INSTRUCTION',
      label: '',
      position: 'AFTER_QUESTION_TEXT',
      declarations: [],
    };
    expect(defaultDeclarationForm).toEqual(expectedForm);
  });
  test('Default state shape should be the expected', () => {
    const expectedState = [];
    expect(defaultDeclarationState).toEqual(expectedState);
  });
  test('Default model shape should be the expected', () => {
    const expectedModel = {
      declarations: [],
    };
    expect(defaultDeclarationModel).toEqual(expectedModel);
  });
  describe('Form to State', () => {
    test('No declarations', () => {
      expect(Declaration.formToState(defaultDeclarationForm)).toEqual(defaultDeclarationState);
    });
    test('One declaration', () => {
      const form = _.cloneDeep(defaultDeclarationForm);
      form.declarations.push(declarationFirstState);
      const expectedState = _.cloneDeep(defaultDeclarationState);
      expectedState.push(declarationFirstState);
      expect(Declaration.formToState(form)).toEqual(expectedState);
    });
    test('Two declarations', () => {
      const form = _.cloneDeep(defaultDeclarationForm);
      form.declarations.push(declarationFirstState);
      form.declarations.push(declarationSecondState);
      const expectedState = _.cloneDeep(defaultDeclarationState);
      expectedState.push(declarationFirstState);
      expectedState.push(declarationSecondState);
      expect(Declaration.formToState(form)).toEqual(expectedState);
    });
  });
  describe('State to Form', () => {
    test('No declarations', () => {
      expect(Declaration.stateToForm(defaultDeclarationState)).toEqual(defaultDeclarationForm);
    });
    test('One declaration', () => {
      const state = _.cloneDeep(defaultDeclarationState);
      state.push(declarationFirstState);
      const formExpected = _.cloneDeep(defaultDeclarationForm);
      formExpected.declarations.push(declarationFirstState);
      expect(Declaration.stateToForm(state)).toEqual(formExpected);
    });
    test('Two declarations', () => {
      const state = _.cloneDeep(defaultDeclarationState);
      state.push(declarationFirstState);
      state.push(declarationSecondState);
      const formExpected = _.cloneDeep(defaultDeclarationForm);
      formExpected.declarations.push(declarationFirstState);
      formExpected.declarations.push(declarationSecondState);
      expect(Declaration.stateToForm(state)).toEqual(formExpected);
    });
  });
  describe('State to Model', () => {
    test('No declarations', () => {
      expect(Declaration.stateToModel(defaultDeclarationState)).toEqual(defaultDeclarationModel);
    });
    test('One declaration', () => {
      const state = _.cloneDeep(defaultDeclarationState);
      state.push(declarationFirstState);
      const modelExpected = _.cloneDeep(defaultDeclarationModel);
      modelExpected.declarations.push(declarationFirstModel);
      expect(Declaration.stateToModel(state)).toEqual(modelExpected);
    });
    test('Two declarations', () => {
      const state = _.cloneDeep(defaultDeclarationState);
      state.push(declarationFirstState);
      state.push(declarationSecondState);
      const modelExpected = _.cloneDeep(defaultDeclarationModel);
      modelExpected.declarations.push(declarationFirstModel);
      modelExpected.declarations.push(declarationSecondModel);
      expect(Declaration.stateToModel(state)).toEqual(modelExpected);
    });
  });
  describe('Model to State', () => {
    test('No declarations', () => {
      expect(Declaration.modelToState(defaultDeclarationModel)).toEqual(defaultDeclarationState);
    });
    test('One declaration', () => {
      const model = _.cloneDeep(defaultDeclarationModel);
      model.declarations.push(declarationFirstModel);
      const stateExpected = [declarationFirstState]
      expect(Declaration.modelToState(model)).toEqual(stateExpected);
    });
    test('Two declarations', () => {
      const model = _.cloneDeep(defaultDeclarationModel);
      model.declarations.push(declarationFirstModel);
      model.declarations.push(declarationSecondModel);
      const stateExpected = [declarationFirstState, declarationSecondState]
      expect(Declaration.modelToState(model)).toEqual(stateExpected);
    });
  });
});
