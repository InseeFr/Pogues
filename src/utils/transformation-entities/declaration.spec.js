jest.dontMock('./declaration.js');

import _ from 'lodash';

import Declaration, { defaultDeclarationForm, defaultDeclarationState, defaultDeclarationModel } from './declaration';

describe('Transformation entities - Declaration', () => {
  const declarationFirst = {
    declarationType: 'INSTRUCTION',
    label: 'This is the first text',
    position: 'AFTER_RESPONSE',
  };
  const declarationSecond = {
    declarationType: 'INSTRUCTION',
    label: 'This is the second text',
    position: 'AFTER_QUESTION_TEXT',
  };
  test('Default form shape should be the expected', () => {
    const form = _.cloneDeep(defaultDeclarationForm);
    const expectedForm = {
      declarationType: 'INSTRUCTION',
      label: '',
      position: 'AFTER_QUESTION_TEXT',
      declarations: [],
    };
    expect(form).toEqual(expectedForm);
  });
  test('Default state shape should be the expected', () => {
    const state = _.cloneDeep(defaultDeclarationState);
    const expectedState = {
      declarations: [],
    };
    expect(state).toEqual(expectedState);
  });
  test('Default model shape should be the expected', () => {
    const model = _.cloneDeep(defaultDeclarationModel);
    const expectedModel = {
      declarations: [],
    };
    expect(model).toEqual(expectedModel);
  });
  describe('Form to State', () => {
    test('No declarations', () => {
      const form = _.cloneDeep(defaultDeclarationForm);
      const expectedState = _.cloneDeep(defaultDeclarationState);
      expect(Declaration.formToState(form)).toEqual(expectedState);
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
      const state = _.cloneDeep(defaultDeclarationState);
      const formExpected = _.cloneDeep(defaultDeclarationForm);
      expect(Declaration.stateToForm(state)).toEqual(formExpected);
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
      const state = _.cloneDeep(defaultDeclarationState);
      const modelExpected = _.cloneDeep(defaultDeclarationModel);
      expect(Declaration.stateToModel(state)).toEqual(modelExpected);
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
      const model = _.cloneDeep(defaultDeclarationModel);
      const stateExpected = _.cloneDeep(defaultDeclarationState);
      expect(Declaration.modelToState(model)).toEqual(stateExpected);
    });
    test('One declaration', () => {
      const model = _.cloneDeep(defaultDeclarationModel);
      model.declarations.push(declarationFirst);
      const stateExpected = _.cloneDeep(defaultDeclarationState);
      stateExpected.declarations.push(declarationFirst);
      expect(Declaration.modelToState(model)).toEqual(stateExpected);
    });
    test('Two declarations', () => {
      const model = _.cloneDeep(defaultDeclarationModel);
      model.declarations.push(declarationFirst);
      model.declarations.push(declarationSecond);
      const stateExpected = _.cloneDeep(defaultDeclarationState);
      stateExpected.declarations.push(declarationFirst);
      stateExpected.declarations.push(declarationSecond);
      expect(Declaration.modelToState(model)).toEqual(stateExpected);
    });
  });
});
