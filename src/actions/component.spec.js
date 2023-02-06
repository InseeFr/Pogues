import * as component from './component';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SUBSEQUENCE, SEQUENCE } = COMPONENT_TYPE;

jest.mock('./component-move');
jest.mock('./component-update');
jest.mock('./component-remove');
jest.mock('./component-insert');

describe('updateParentChildren', () => {
  function getState() {
    return {
      appState: {
        activeComponentsById: {
          99: {},
          2: { id: '2', parent: '99', children: [] },
        },
      },
    };
  }
  const payload = {
    payload: { id: '1', lastCreatedComponent: { 1: { parent: '2' } } },
  };
  const fn = component.updateParentChildren(payload);

  test(`should trigger the UPDATE_COMPONENT_PARENT action`, () => {
    function dispatch(param) {
      expect(param.type).toEqual(component.UPDATE_COMPONENT_PARENT);
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
      expect(param.payload.lastCreatedComponent).toEqual(
        payload.payload.lastCreatedComponent,
      );
    }
    fn(dispatch, getState);
  });

  test(`should call return the updated parent`, () => {
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        2: { id: '2', children: ['1'], parent: '99' },
      });
    }
    fn(dispatch, getState);
  });
});

describe('orderComponents', () => {
  test(`should trigger the UPDATE_COMPONENT_ORDER action`, () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            99: { children: [] },
            2: { parent: '99', id: '2', children: [] },
          },
          selectedComponentId: '2',
        },
      };
    }
    const payload = {
      payload: { id: '1', lastCreatedComponent: { 1: { parent: '2' } } },
    };
    const fn = component.orderComponents(payload);

    function dispatch(param) {
      expect(param.type).toEqual(component.UPDATE_COMPONENT_ORDER);
    }
    fn(dispatch, getState);
  });

  test(`should return the ID of the new component`, () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            99: { children: [] },
            2: { parent: '99', id: '2', children: [] },
          },
          selectedComponentId: '2',
        },
      };
    }
    const payload = {
      payload: { id: '1', lastCreatedComponent: { 1: { parent: '2' } } },
    };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.id).toEqual(payload.payload.id);
    }
    fn(dispatch, getState);
  });

  test('when we want to insert a question next to a question, should call increaseWeightOfAll', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            99: { children: [] },
            2: { parent: '99', id: '2', children: [], type: QUESTION },
          },
          selectedComponentId: '2',
        },
      };
    }
    const payload = {
      payload: {
        id: '1',
        lastCreatedComponent: { 1: { parent: '2', type: QUESTION } },
      },
    };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        increaseWeightOfAll: true,
      });
    }
    fn(dispatch, getState);
  });

  test('when we want to insert a question next to a subsequence, should call increaseWeightOfAll', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            99: { children: [] },
            2: { parent: '99', id: '2', children: [], type: SUBSEQUENCE },
          },
          selectedComponentId: '2',
        },
      };
    }
    const payload = {
      payload: {
        id: '1',
        lastCreatedComponent: { 1: { parent: '2', type: QUESTION } },
      },
    };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        increaseWeightOfAll: true,
      });
    }
    fn(dispatch, getState);
  });
  test('when we want to insert a question next to a sequence, should call increaseWeightOfAll', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            99: { children: [] },
            2: { parent: '99', id: '2', children: [], type: SEQUENCE },
          },
          selectedComponentId: '2',
        },
      };
    }
    const payload = {
      payload: {
        id: '1',
        lastCreatedComponent: { 1: { parent: '2', type: QUESTION } },
      },
    };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        increaseWeightOfAll: true,
      });
    }
    fn(dispatch, getState);
  });

  test('when we want to insert a sequence next to a question, should call moveQuestionAndSubSequenceToSequence', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            2: { id: '2', children: [] },
            3: { parent: '2', type: QUESTION, children: [] },
          },
          selectedComponentId: '3',
        },
      };
    }
    const payload = {
      payload: {
        id: '1',
        lastCreatedComponent: { 1: { parent: '2', type: SEQUENCE } },
      },
    };
    const fn = component.orderComponents(payload);

    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        moveQuestionAndSubSequenceToSequence: true,
      });
    }
    fn(dispatch, getState);
  });
  test('when we want to insert a sequence next to a subsequence, should call moveQuestionAndSubSequenceToSequence', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            2: { id: '2', children: [] },
            3: { parent: '2', type: SUBSEQUENCE, children: [] },
          },
          selectedComponentId: '3',
        },
      };
    }
    const payload = {
      payload: {
        id: '1',
        lastCreatedComponent: { 1: { parent: '2', type: SEQUENCE } },
      },
    };
    const fn = component.orderComponents(payload);

    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        moveQuestionAndSubSequenceToSequence: true,
      });
    }
    fn(dispatch, getState);
  });
  test('when we want to insert a sequence next to a sequence with children, should call moveQuestionAndSubSequenceToSequence', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            2: { id: '2', children: [] },
            3: { id: '3', parent: '2', type: SEQUENCE, children: ['5'] },
            5: { id: '5', type: QUESTION, children: [], weight: 0 },
          },
          selectedComponentId: '3',
        },
      };
    }
    const payload = {
      payload: {
        id: '1',
        lastCreatedComponent: { 1: { parent: '2', type: SEQUENCE } },
      },
    };
    const fn = component.orderComponents(payload);

    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        moveQuestionAndSubSequenceToSequence: true,
      });
    }
    fn(dispatch, getState);
  });

  // Resolve this test before releasing questionnaire composition
  // test('when we want to insert a sequence next to a sequence without children, should call increaseWeightOfAll', () => {
  //   function getState() {
  //     return {
  //       appState: {
  //         activeComponentsById: {
  //           2: { id: '2', children: [] },
  //           3: { parent: '2', type: SEQUENCE, children: [] },
  //         },
  //         selectedComponentId: '3',
  //       },
  //     };
  //   }
  //   const payload = {
  //     payload: {
  //       id: '1',
  //       lastCreatedComponent: { 1: { parent: '2', type: SEQUENCE } },
  //     },
  //   };
  //   const fn = component.orderComponents(payload);

  //   function dispatch(param) {
  //     expect(param.payload.update.activeComponentsById).toEqual({
  //       increaseWeightOfAll: true,
  //     });
  //   }
  //   fn(dispatch, getState);
  // });

  test('when we want to insert a subsequence next to a QUESTION with a question as sibling, should call moveQuestionToSubSequence', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            2: { id: '2', children: ['3', '4'] },
            3: { parent: '2', type: QUESTION, children: [], weight: 0 },
            4: { parent: '2', type: QUESTION, children: [], weight: 1 },
          },
          selectedComponentId: '3',
        },
      };
    }
    const payload = {
      payload: {
        id: '1',
        lastCreatedComponent: { 1: { parent: '2', type: SUBSEQUENCE } },
      },
    };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        moveQuestionToSubSequence: true,
      });
    }
    fn(dispatch, getState);
  });

  test('when we want to insert a subsequence next to a QUESTION without a QUESTION as sibling, should call increaseWeightOfAll', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            2: { id: '2', children: [] },
            3: { parent: '2', type: QUESTION, children: [] },
          },
          selectedComponentId: '3',
        },
      };
    }
    const payload = {
      payload: {
        id: '1',
        lastCreatedComponent: { 1: { parent: '2', type: SUBSEQUENCE } },
      },
    };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        increaseWeightOfAll: true,
      });
    }
    fn(dispatch, getState);
  });
  test('when we want to insert a subsequence next to a subsequence with children, should call moveQuestionToSubSequence', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            2: { id: '2', children: [], type: SEQUENCE },
            3: {
              id: '3',
              type: SUBSEQUENCE,
              parent: '2',
              children: ['4', '5'],
            },
            4: {
              id: '4',
              parent: '3',
              children: [],
              type: QUESTION,
              weight: 0,
            },
            5: {
              id: '5',
              parent: '3',
              children: [],
              type: QUESTION,
              weight: 1,
            },
          },
          selectedComponentId: '3',
        },
      };
    }
    const payload = {
      payload: {
        id: '1',
        lastCreatedComponent: {
          1: { id: '1', parent: '2', type: SUBSEQUENCE },
        },
      },
    };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        moveQuestionToSubSequence: true,
      });
    }
    fn(dispatch, getState);
  });
  test('when we want to insert a subsequence next to a SUBSEQUENCE without children, should call increaseWeightOfAll', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            2: { id: '2', children: [] },
            3: { parent: '2', type: SUBSEQUENCE, children: [] },
          },
          selectedComponentId: '3',
        },
      };
    }
    const payload = {
      payload: {
        id: '1',
        lastCreatedComponent: { 1: { parent: '2', type: SUBSEQUENCE } },
      },
    };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        increaseWeightOfAll: true,
      });
    }
    fn(dispatch, getState);
  });
  test('when we want to insert a subsequence next to a sequence, should call increaseWeightOfAll', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: {
            2: { id: '2', children: [] },
            3: { parent: '2', type: SEQUENCE, children: [] },
          },
          selectedComponentId: '3',
        },
      };
    }
    const payload = {
      payload: {
        id: '1',
        lastCreatedComponent: { 1: { parent: '2', type: SUBSEQUENCE } },
      },
    };
    const fn = component.orderComponents(payload);
    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        increaseWeightOfAll: true,
      });
    }
    fn(dispatch, getState);
  });
});

describe('dragComponent', () => {
  test('should trigger the MOVE_COMPONENT action', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { 2: { id: '2', children: [] } },
        },
      };
    }
    const fn = component.dragComponent('1', '2', 1);

    function dispatch(param) {
      expect(param.type).toEqual(component.MOVE_COMPONENT);
    }
    fn(dispatch, getState);
  });

  test('should call moveComponent with the right parameter', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { 2: { id: '2', children: [] } },
        },
      };
    }
    const fn = component.dragComponent('1', '2', 1);

    function dispatch(param) {
      expect(param.payload.update.activeComponentsById).toEqual({
        activesComponents: { 2: { id: '2', children: [] } },
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
          activeComponentsById: { 2: { id: '2', children: [] } },
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
          activeComponentsById: { 2: { id: '2', children: [] } },
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

describe('duplicateComponent', () => {
  test('should trigger the DUPLICATE_COMPONENT action', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { 2: { id: '2', children: [] } },
        },
      };
    }
    const fn = component.duplicateComponent('1');

    function dispatch(param) {
      expect(param.type).toEqual(component.DUPLICATE_COMPONENT);
    }
    fn(dispatch, getState);
  });

  test('should call duplicate function with the right parameters', () => {
    function getState() {
      return {
        appState: {
          activeComponentsById: { 2: { id: '2', children: [] } },
        },
      };
    }
    const fn = component.duplicateComponent('2');

    function dispatch(param) {
      expect(param.payload).toEqual({
        update: {
          activeComponentsById: {
            activesComponents: getState().appState.activeComponentsById,
            idComponent: '2',
          },
        },
      });
    }
    fn(dispatch, getState);
  });
});
