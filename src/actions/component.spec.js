import * as component from './component';

jest.mock('./component-moves');

describe('updateParentChildren', () => {
  function getState() {
    return {
      appState: {
        activeComponentsById: { '2': { id: '2', children: [] } },
      },
    };
  }
  const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2' } } } };
  const fn = component.updateParentChildren(payload);

  test(`should trigger the UPDATE_COMPONENT action`, () => {
    function dispatch(param) {
      expect(param.type).toEqual(component.UPDATE_COMPONENT);
    }
    fn(dispatch, getState);
  });

  test(`should return the ID of the new component`, () => {
    function dispatch(param) {
      expect(param.payload.id).toEqual(payload.payload.id);
    }
    fn(dispatch, getState);
  });

  test(`should call return the last created component`, () => {
    function dispatch(param) {
      expect(param.payload.lastCreatedComponent).toEqual(payload.payload.lastCreatedComponent);
    }
    fn(dispatch, getState);
  });

  test(`should call return the updated parent`, () => {
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({ '2': { id: '2', children: ['1'] } });
    }
    fn(dispatch, getState);
  });
});

describe('orderComponents', () => {
  function getState() {
    return {
      appState: {
        activeComponentsById: { '2': { id: '2', children: [] } },
      },
    };
  }

  test(`should trigger the UPDATE_COMPONENT action`, () => {
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2' } } } };
    const fn = component.orderComponents(payload);

    function dispatch(param) {
      expect(param.type).toEqual(component.UPDATE_COMPONENT);
    }
    fn(dispatch, getState);
  });

  test(`should return the ID of the new component`, () => {
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2' } } } };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.id).toEqual(payload.payload.id);
    }
    fn(dispatch, getState);
  });

  test(`should call moveQuestionAndSubSequenceToSequence`, () => {
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2', type: 'SEQUENCE' } } } };
    const fn = component.orderComponents(payload);

    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({ moveQuestionAndSubSequenceToSequence: true });
    }
    fn(dispatch, getState);
  });

  test(`should call moveQuestionToSubSequence`, () => {
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2', type: 'SUBSEQUENCE' } } } };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({ moveQuestionToSubSequence: true });
    }
    fn(dispatch, getState);
  });

  test(`should call increaseWeightOfAll`, () => {
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2', type: 'QUESTION' } } } };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({ increaseWeightOfAll: true });
    }
    fn(dispatch, getState);
  });
});
