import * as actionComponent from './actionComponent';

jest.mock('./component-update');
jest.mock('./component-remove');
describe('updateComponent', () => {
  test('should trigger the UPDATE_COMPONENT action', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            jldkkdkj: { id: 'jldkdkj', children: [], type: 'QUESTION' },
          },
        },
      };
    }
    const componentsStore = {
      jldkkdkj: { id: 'jldkdkj', children: [], type: 'QUESTION' },
    };
    const fn = actionComponent.updateComponent('jldkdkj', componentsStore);

    function dispatch(param) {
      expect(param.type).toEqual(actionComponent.UPDATE_COMPONENT);
    }
    fn(dispatch, getState);
  });

  test('should call update with the right parameter', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            jldkkdkj: { id: 'jldkkdkj', children: [], type: 'QUESTION' },
          },
        },
      };
    }
    const componentsStore = {
      jldkkdkj: { id: 'jldkkdkj', children: [], type: 'QUESTION' },
    };
    const fn = actionComponent.updateComponent('jldkkdkj', componentsStore);

    function dispatch(param) {
      expect(param.payload.update).toEqual({
        activeComponentsById: {
          jldkkdkj: { id: 'jldkkdkj', children: [], type: 'QUESTION' },
        },
        activeCalculatedVariablesById: {},
        activeExternalVariablesById: {},
        activeCollectedVariablesById: {
          jldkkdkj: {},
        },
        activeCodeListsById: {},
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
    const fn = actionComponent.removeComponent('1');

    function dispatch(param) {
      expect(param.type).toEqual(actionComponent.REMOVE_COMPONENT);
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
    const fn = actionComponent.removeComponent('1');

    function dispatch(param) {
      expect(param.payload).toEqual({
        activeComponentsById: getState().appState.activeComponentsById,
        idDeletedComponent: '1',
      });
    }
    fn(dispatch, getState);
  });
});
