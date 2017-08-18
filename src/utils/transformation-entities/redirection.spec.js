jest.dontMock('./redirection.js');

import _ from 'lodash';

import Redirection, { defaultRedirectionForm, defaultRedirectionState, defaultRedirectionModel } from './redirection';

describe('Transformation entities - Redirection', () => {
  const redirectionFirst = {
    id: 'j5xtred5',
    label: 'This is the first label',
    condition: 'This is the first conditions',
    cible: 'j4xw6543',
  };
  const redirectionSecond = {
    id: 'j5xered5',
    label: 'This is the second label',
    condition: 'This is the second conditions',
    cible: 'j4xtt543',
  };
  test('Default form shape should be the expected', () => {
    const expectedForm = {
      label: '',
      condition: '',
      cible: '',
      redirections: [],
    };
    expect(defaultRedirectionForm).toEqual(expectedForm);
  });
  test('Default state shape should be the expected', () => {
    const expectedState = [];
    expect(defaultRedirectionState).toEqual(expectedState);
  });
  test('Default model shape should be the expected', () => {
    const expectedModel = {
      redirections: [],
    };
    expect(defaultRedirectionModel).toEqual(expectedModel);
  });
  describe('Form to State', () => {
    test('No redirections', () => {
      expect(Redirection.formToState(defaultRedirectionForm)).toEqual(defaultRedirectionState);
    });
    test.only('One redirection', () => {
      const form = _.cloneDeep(defaultRedirectionForm);
      form.redirections.push(redirectionFirst);
      const expectedState = _.cloneDeep(defaultRedirectionState);
      expectedState.push(redirectionFirst);
      expect(Redirection.formToState(form)).toEqual(expectedState);
    });
    test('Two redirections', () => {
      const form = _.cloneDeep(defaultRedirectionForm);
      form.redirections.push(redirectionFirst);
      form.redirections.push(redirectionSecond);
      const expectedState = _.cloneDeep(defaultRedirectionState);
      expectedState.push(redirectionFirst);
      expectedState.push(redirectionSecond);
      expect(Redirection.formToState(form)).toEqual(expectedState);
    });
  });
  describe('State to Form', () => {
    test('No redirections', () => {
      expect(Redirection.stateToForm(defaultRedirectionState)).toEqual(defaultRedirectionForm);
    });
    test('One redirection', () => {
      const state = _.cloneDeep(defaultRedirectionState);
      state.push(redirectionFirst);
      const formExpected = _.cloneDeep(defaultRedirectionForm);
      formExpected.redirections.push(redirectionFirst);
      expect(Redirection.stateToForm(state)).toEqual(formExpected);
    });
    test('Two redirections', () => {
      const state = _.cloneDeep(defaultRedirectionState);
      state.push(redirectionFirst);
      state.push(redirectionSecond);
      const formExpected = _.cloneDeep(defaultRedirectionForm);
      formExpected.redirections.push(redirectionFirst);
      formExpected.redirections.push(redirectionSecond);
      expect(Redirection.stateToForm(state)).toEqual(formExpected);
    });
  });
  describe('State to Model', () => {
    test('No redirections', () => {
      expect(Redirection.stateToModel(defaultRedirectionState)).toEqual(defaultRedirectionModel);
    });
    test('One redirection', () => {
      const state = _.cloneDeep(defaultRedirectionState);
      state.push(redirectionFirst);
      const modelExpected = _.cloneDeep(defaultRedirectionModel);
      modelExpected.redirections.push(redirectionFirst);
      expect(Redirection.stateToModel(state)).toEqual(modelExpected);
    });
    test('Two redirections', () => {
      const state = _.cloneDeep(defaultRedirectionState);
      state.push(redirectionFirst);
      state.push(redirectionSecond);
      const modelExpected = _.cloneDeep(defaultRedirectionModel);
      modelExpected.redirections.push(redirectionFirst);
      modelExpected.redirections.push(redirectionSecond);
      expect(Redirection.stateToModel(state)).toEqual(modelExpected);
    });
  });
  describe('Model to State', () => {
    test('No redirections', () => {
      expect(Redirection.modelToState(defaultRedirectionModel)).toEqual(defaultRedirectionState);
    });
    test('One redirection', () => {
      const model = _.cloneDeep(defaultRedirectionModel);
      model.redirections.push(redirectionFirst);
      const stateExpected = [redirectionFirst];
      expect(Redirection.modelToState(model)).toEqual(stateExpected);
    });
    test('Two redirections', () => {
      const model = _.cloneDeep(defaultRedirectionModel);
      model.redirections.push(redirectionFirst);
      model.redirections.push(redirectionSecond);
      const stateExpected = [redirectionFirst, redirectionSecond];
      expect(Redirection.modelToState(model)).toEqual(stateExpected);
    });
  });
});
