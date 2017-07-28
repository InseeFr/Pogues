jest.dontMock('./declaration.js');

import _ from 'lodash';

import Declaration, { defaultDeclarationForm, defaultDeclarationState, defaultDeclarationModel } from './declaration';

describe('Transformation entities - Declaration', () => {
  const declarationFirst = {
    declarationType: 'INSTRUCTION',
    text: 'This is the first text',
    position: 'AFTER_RESPONSE',
  };
  const declarationSecond = {
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
    const expectedState = {
      declarations: [],
    };
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
      form.declarations.push(declarationFirst);
      const expectedState = _.cloneDeep(defaultDeclarationState);
      expectedState.declarations.push(declarationFirst);
      expect(Declaration.formToState(form)).toEqual(expectedState);
    });
    test('Two declarations', () => {
      const form = _.cloneDeep(defaultDeclarationForm);
      form.declarations.push(declarationFirst);
      form.declarations.push(declarationSecond);
      const expectedState = _.cloneDeep(defaultDeclarationState);
      expectedState.declarations.push(declarationFirst);
      expectedState.declarations.push(declarationSecond);
      expect(Declaration.formToState(form)).toEqual(expectedState);
    });
  });
  describe('State to Form', () => {
    test('No declarations', () => {
      expect(Declaration.stateToForm(defaultDeclarationState)).toEqual(defaultDeclarationForm);
    });
    test('One declaration', () => {
      const state = _.cloneDeep(defaultDeclarationState);
      state.declarations.push(declarationFirst);
      const formExpected = _.cloneDeep(defaultDeclarationForm);
      formExpected.declarations.push(declarationFirst);
      expect(Declaration.stateToForm(state)).toEqual(formExpected);
    });
    test('Two declarations', () => {
      const state = _.cloneDeep(defaultDeclarationState);
      state.declarations.push(declarationFirst);
      state.declarations.push(declarationSecond);
      const formExpected = _.cloneDeep(defaultDeclarationForm);
      formExpected.declarations.push(declarationFirst);
      formExpected.declarations.push(declarationSecond);
      expect(Declaration.stateToForm(state)).toEqual(formExpected);
    });
  });
  describe('State to Model', () => {
    test('No declarations', () => {
      expect(Declaration.stateToModel(defaultDeclarationState)).toEqual(defaultDeclarationModel);
    });
    test('One declaration', () => {
      const state = _.cloneDeep(defaultDeclarationState);
      state.declarations.push(declarationFirst);
      const modelExpected = _.cloneDeep(defaultDeclarationModel);
      modelExpected.declarations.push(declarationFirst);
      expect(Declaration.stateToModel(state)).toEqual(modelExpected);
    });
    test('Two declarations', () => {
      const state = _.cloneDeep(defaultDeclarationState);
      state.declarations.push(declarationFirst);
      state.declarations.push(declarationSecond);
      const modelExpected = _.cloneDeep(defaultDeclarationModel);
      modelExpected.declarations.push(declarationFirst);
      modelExpected.declarations.push(declarationSecond);
      expect(Declaration.stateToModel(state)).toEqual(modelExpected);
    });
  });
  describe('Model to State', () => {
    test('No declarations', () => {
      expect(Declaration.modelToState(defaultDeclarationModel)).toEqual(defaultDeclarationState);
    });
    test('One declaration', () => {
      const model = _.cloneDeep(defaultDeclarationModel);
      model.declarations.push(declarationFirst);
      const stateExpected = _.cloneDeep(defaultDeclarationModel);
      stateExpected.declarations.push(declarationFirst);
      expect(Declaration.modelToState(model)).toEqual(stateExpected);
    });
    test('Two declarations', () => {
      const model = _.cloneDeep(defaultDeclarationModel);
      model.declarations.push(declarationFirst);
      model.declarations.push(declarationSecond);
      const stateExpected = _.cloneDeep(defaultDeclarationModel);
      stateExpected.declarations.push(declarationFirst);
      stateExpected.declarations.push(declarationSecond);
      expect(Declaration.modelToState(model)).toEqual(stateExpected);
    });
  });
});
