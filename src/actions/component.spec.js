import * as component from './component';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

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
  test(`should trigger the UPDATE_COMPONENT action`, () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { '2': { id: '2', children: [] } },
        },
      };
    }
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2' } } } };
    const fn = component.orderComponents(payload);

    function dispatch(param) {
      expect(param.type).toEqual(component.UPDATE_COMPONENT);
    }
    fn(dispatch, getState);
  });

  test(`should return the ID of the new component`, () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { '2': { id: '2', children: [] } },
        },
      };
    }
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2' } } } };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.id).toEqual(payload.payload.id);
    }
    fn(dispatch, getState);
  });

  test(`should call moveQuestionAndSubSequenceToSequence`, () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { '2': { id: '2', children: [] }, '3': { type: QUESTION } },
          selectedComponentId: '3',
        },
      };
    }
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2', type: 'SEQUENCE' } } } };
    const fn = component.orderComponents(payload);

    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({ moveQuestionAndSubSequenceToSequence: true });
    }
    fn(dispatch, getState);
  });

  test(`should call moveQuestionToSubSequence`, () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { '2': { id: '2', children: [] }, '3': { type: QUESTION } },
          selectedComponentId: '3',
        },
      };
    }
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2', type: 'SUBSEQUENCE' } } } };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({ moveQuestionToSubSequence: true });
    }
    fn(dispatch, getState);
  });

  test(`should call increaseWeightOfAll`, () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { '2': { id: '2', children: [] } },
        },
      };
    }
    const payload = { payload: { id: '1', lastCreatedComponent: { '1': { parent: '2', type: 'QUESTION' } } } };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({ increaseWeightOfAll: true });
    }
    fn(dispatch, getState);
  });
});

describe('dragComponent', () => {
  test('should trigger the UPDATE_COMPONENT action', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { '2': { id: '2', children: [] } },
        },
      };
    }
    const fn = component.dragComponent('1', '2', 1);

    function dispatch(param) {
      expect(param.type).toEqual(component.UPDATE_COMPONENT);
    }
    fn(dispatch, getState);
  });

  test('should call moveComponent with the right parameter', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { '2': { id: '2', children: [] } },
        },
      };
    }
    const fn = component.dragComponent('1', '2', 1);

    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        activesComponents: { '2': { id: '2', children: [] } },
        idMovedComponent: '1',
        idTargetComponent: '2',
        newWeight: 1,
      });
    }
    fn(dispatch, getState);
  });
});

describe('removeComponent', () => {
  test('should trigger the REMOVE_COMPONENT action', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { '2': { id: '2', children: [] } },
        },
      };
    }
    const fn = component.removeComponent('1');

    function dispatch(param) {
      expect(param.type).toEqual(component.REMOVE_COMPONENT);
    }
    fn(dispatch, getState);
  });

  test('should call remove with the right parameter', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { '2': { id: '2', children: [] } },
        },
      };
    }
    const fn = component.removeComponent('1');

    function dispatch(param) {
      expect(param.payload).toEqual({
        activeComponentsById: getState().appState.activeComponentsById,
        idDeletedComponent: '1',
      });
    }
    fn(dispatch, getState);
  });
});
