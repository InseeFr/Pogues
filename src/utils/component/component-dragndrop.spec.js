import { componentSource, cardTarget, collect } from './component-dragndrop';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

jest.mock('./component-utils');

describe('componentSource', () => {
  describe('beginDrag', () => {
    test('should return the right object', () => {
      const props = { id: '1', type: 'TYPE' };
      expect(componentSource.beginDrag(props)).toEqual(props);
    });
  });
});

describe('cardTarget', () => {
  const monitor = {
    getItem() {
      return {};
    },
  };
  describe('canDrop', () => {
    test('should call canMoveTo method', () => {
      expect(cardTarget.canDrop({}, monitor)).toEqual({ canMoveTo: true });
    });
  });
  describe('drop', () => {
    const m = {
      isOver() {
        return true;
      },
      getItem() {
        return 1;
      },
    };

    test(`when the couldInsertAsChild return true, the weight should be equal to 0`, () => {
      const props = {
        type: SEQUENCE,
        childrenId: [],
        moveComponent(movedComponentId, parentId, newWeight) {
          expect(newWeight).toEqual(0);
        },
      };
      cardTarget.drop(props, m);
    });

    test(`when the couldInsertAsChild return false, the weight should be equal to weight + 1`, () => {
      const props = {
        type: SUBSEQUENCE,
        childrenId: [],
        weight: 3,
        moveComponent(movedComponentId, parentId, newWeight) {
          expect(newWeight).toEqual(4);
        },
      };
      cardTarget.drop(props, m);
    });

    test(`when the couldInsertAsChild return true, the weight should be equal to 0`, () => {
      const props = {
        type: SEQUENCE,
        childrenId: [],
        moveComponent(movedComponentId, parentId, newWeight) {
          expect(newWeight).toEqual(0);
        },
      };
      cardTarget.drop(props, m);
    });

    test(`when the couldInsertAsChild return false, the parent should be equal to this dropped zone`, () => {
      const props = {
        type: SEQUENCE,
        childrenId: [],
        weight: 3,
        id: '1',
        parent: '2',
        moveComponent(movedComponentId, parentId) {
          expect(parentId).toEqual('1');
        },
      };
      cardTarget.drop(props, m);
    });

    test(`when the couldInsertAsChild return false, the parent should be equal to the parent of this dropped zone`, () => {
      const props = {
        type: SUBSEQUENCE,
        childrenId: [],
        weight: 3,
        parent: '2',
        moveComponent(movedComponentId, parentId) {
          expect(parentId).toEqual('2');
        },
      };
      cardTarget.drop(props, m);
    });

    /*[SEQUENCE, SUBSEQUENCE].forEach(type => {
      test(`when the dropped zone is ${type} without children, the parent should be equal to this dropped zone`, () => {
        const props = {
          type: SEQUENCE,
          parent: '2',
          id: '1',
          childrenId: [],
          moveComponent(movedComponentId, parentId) {
            expect(parentId).toEqual('1');
          },
        };
        cardTarget.drop(props, m);
      });
    });*/

    /*[SEQUENCE, SUBSEQUENCE].forEach(type => {
      test(`when the dropped zone has children or is a ${type}, the parent should be equal to the parent of this dropped zone`, () => {
        const props = {
          type: SEQUENCE,
          parent: '2',
          id: '1',
          childrenId: ['children'],
          moveComponent(movedComponentId, parentId) {
            expect(parentId).toEqual('2');
          },
        };
        cardTarget.drop(props, m);
      });
    });*/
  });
});

describe('collect', () => {
  const connect = {
    dragSource() {
      return 'dragSource';
    },
  };

  const monitor = {
    isDragging() {
      return true;
    },
  };
  test('should return the right object', () => {
    expect(collect(connect, monitor)).toEqual({
      connectDragSource: 'dragSource',
      isDragging: true,
    });
  });
});
