jest.dontMock('./control.js');

import _ from 'lodash';

import Control, { defaultControlForm, defaultControlState, defaultControlModel } from './control';

describe('Transformation entities - Control', () => {
  const controlFirst = {
    controlType: 'INSTRUCTION',
    text: 'This is the first text',
    position: 'AFTER_RESPONSE',
  };
  const controlSecond = {
    controlType: 'INSTRUCTION',
    text: 'This is the second text',
    position: 'AFTER_QUESTION_TEXT',
  };
  test('Default form shape should be the expected', () => {
    const expectedForm = {
      label: '',
      condition: '',
      message: '',
      type: 'INFO',
      during_collect: false,
      post_collect: false,
      controls: [],
    };
    expect(defaultControlForm).toEqual(expectedForm);
  });
  test('Default state shape should be the expected', () => {
    const expectedState = {
      controls: [],
    };
    expect(defaultControlState).toEqual(expectedState);
  });
  test('Default model shape should be the expected', () => {
    const expectedModel = {
      controls: [],
    };
    expect(defaultControlModel).toEqual(expectedModel);
  });
  describe('Form to State', () => {
    test('No controls', () => {
      expect(Control.formToState(defaultControlForm)).toEqual(defaultControlState);
    });
    test('One control', () => {
      const form = _.cloneDeep(defaultControlForm);
      form.controls.push(controlFirst);
      const expectedState = _.cloneDeep(defaultControlState);
      expectedState.controls.push(controlFirst);
      expect(Control.formToState(form)).toEqual(expectedState);
    });
    test('Two controls', () => {
      const form = _.cloneDeep(defaultControlForm);
      form.controls.push(controlFirst);
      form.controls.push(controlSecond);
      const expectedState = _.cloneDeep(defaultControlState);
      expectedState.controls.push(controlFirst);
      expectedState.controls.push(controlSecond);
      expect(Control.formToState(form)).toEqual(expectedState);
    });
  });
  describe('State to Form', () => {
    test('No controls', () => {
      expect(Control.stateToForm(defaultControlState)).toEqual(defaultControlForm);
    });
    test('One control', () => {
      const state = _.cloneDeep(defaultControlState);
      state.controls.push(controlFirst);
      const formExpected = _.cloneDeep(defaultControlForm);
      formExpected.controls.push(controlFirst);
      expect(Control.stateToForm(state)).toEqual(formExpected);
    });
    test('Two controls', () => {
      const state = _.cloneDeep(defaultControlState);
      state.controls.push(controlFirst);
      state.controls.push(controlSecond);
      const formExpected = _.cloneDeep(defaultControlForm);
      formExpected.controls.push(controlFirst);
      formExpected.controls.push(controlSecond);
      expect(Control.stateToForm(state)).toEqual(formExpected);
    });
  });
  describe('State to Model', () => {
    test('No controls', () => {
      expect(Control.stateToModel(defaultControlState)).toEqual(defaultControlModel);
    });
    test('One control', () => {
      const state = _.cloneDeep(defaultControlState);
      state.controls.push(controlFirst);
      const modelExpected = _.cloneDeep(defaultControlModel);
      modelExpected.controls.push(controlFirst);
      expect(Control.stateToModel(state)).toEqual(modelExpected);
    });
    test('Two controls', () => {
      const state = _.cloneDeep(defaultControlState);
      state.controls.push(controlFirst);
      state.controls.push(controlSecond);
      const modelExpected = _.cloneDeep(defaultControlModel);
      modelExpected.controls.push(controlFirst);
      modelExpected.controls.push(controlSecond);
      expect(Control.stateToModel(state)).toEqual(modelExpected);
    });
  });
  describe('Model to State', () => {
    test('No controls', () => {
      expect(Control.modelToState(defaultControlModel)).toEqual(defaultControlState);
    });
    test('One control', () => {
      const model = _.cloneDeep(defaultControlModel);
      model.controls.push(controlFirst);
      const stateExpected = _.cloneDeep(defaultControlModel);
      stateExpected.controls.push(controlFirst);
      expect(Control.modelToState(model)).toEqual(stateExpected);
    });
    test('Two controls', () => {
      const model = _.cloneDeep(defaultControlModel);
      model.controls.push(controlFirst);
      model.controls.push(controlSecond);
      const stateExpected = _.cloneDeep(defaultControlModel);
      stateExpected.controls.push(controlFirst);
      stateExpected.controls.push(controlSecond);
      expect(Control.modelToState(model)).toEqual(stateExpected);
    });
  });
});
