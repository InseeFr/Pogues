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
      return {
        id: '1',
      };
    },
  };
  describe('canDrop', () => {
    test("should return false if the dragged component has the same id as the dropped component's parent", () => {
      expect(cardTarget.canDrop({ parent: '1' }, monitor)).toEqual(false);
    });
    test("should return true if the dragged component has the same id as the dropped component's parent", () => {
      expect(cardTarget.canDrop({ parent: '2' }, monitor)).toEqual(true);
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

    test(`when the isOver return true, should call moveComponent`, () => {
      const props = {
        type: SEQUENCE,
        childrenId: [],
        moveComponent(droppedComponent, draggedComponent) {
          expect(droppedComponent).toEqual(props);
          expect(draggedComponent).toEqual(m.getItem());
        },
      };
      cardTarget.drop(props, m);
    });
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
