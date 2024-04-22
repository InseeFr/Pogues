import { vi } from 'vitest';
import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import { componentSource, cardTarget, collect } from './component-dragndrop';

const { SEQUENCE } = COMPONENT_TYPE;

vi.mock('./component-utils');

describe('componentSource', () => {
  describe('beginDrag', () => {
    test('should return the right object', () => {
      const props = { id: '1', type: 'TYPE' };
      expect(componentSource.beginDrag({ component: props })).toEqual(props);
    });
  });
});

describe('cardTarget', () => {
  const monitor = {
    getItem() {
      return {
        id: '1',
        children: ['3'],
      };
    },
  };
  describe('canDrop', () => {
    test("should return false if the dragged component has the same id as the dropped component's parent", () => {
      expect(
        cardTarget.canDrop({ component: { parent: '1' } }, monitor),
      ).toEqual(false);
    });
    test("should return true if the dragged component has the same id as the dropped component's parent", () => {
      expect(
        cardTarget.canDrop({ component: { parent: '2' } }, monitor),
      ).toEqual(true);
    });

    test('should return false if the dragged component is a grand parent of the dropped component', () => {
      expect(
        cardTarget.canDrop({ component: { parent: '3' } }, monitor),
      ).toEqual(false);
    });
  });
  describe('drop', () => {
    const m = {
      isOver() {
        return true;
      },
      getItem() {
        return {
          id: '2',
        };
      },
    };

    test(`when the isOver return true, should call moveComponent`, () => {
      const props = {
        component: {
          id: '1',
          type: SEQUENCE,
          childrenId: [],
        },
        moveComponent(idDroppedComponent, idDraggedComponent) {
          expect(idDroppedComponent).toEqual('1');
          expect(idDraggedComponent).toEqual('2');
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
