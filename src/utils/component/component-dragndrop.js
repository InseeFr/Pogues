import { couldInsertToSibling, couldInsertAsChild } from 'utils/component/component-utils';
import { findDOMNode } from 'react-dom';

export const PropType = 'COMPONENT';

/**
 * When we start dragging a component, we will defined the information we need
 * for the drag&drop behavior. This informations will then be available thanks to 
 * the monitor.getItem() method
 */
export const componentSource = {
  beginDrag(props) {
    return {
      id: props.id,
      type: props.type,
    };
  },
};

/**
 * Collect function for React DND @DropTarget annotated component
 */
export const cardTarget = {
  hover: function(props, monitor, component) {
    if (monitor.isOver({ shallow: true })) {
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const dragDir = {
        diff: monitor.getDifferenceFromInitialOffset(),
        initialSourceOffset: monitor.getInitialSourceClientOffset(),
      };
      const shouldAddMargin = dragDir.initialSourceOffset.x + dragDir.diff.x - hoverBoundingRect.left > 30;
      if (props.dragndropPosition && props.dragndropPosition.margin !== shouldAddMargin) {
        props.setPlaceholder({ margin: shouldAddMargin });
      }
    }
  },
  /**
    * This method will return trus if a component can be dropped next to another one
    */
  canDrop(props, monitor) {
    return (
      (!props.dragndropPosition.margin && couldInsertToSibling(monitor.getItem(), props)) ||
      (props.dragndropPosition.margin && couldInsertAsChild(props, monitor.getItem()))
    );
  },

  /**
   * When the component is physically dropped, this method will be executed. We 
   * will calculate the tardet weight and parent, and then update the store.
   */
  drop(droppedComponent, monitor) {
    const draggedComponent = monitor.getItem();
    const newWeight =
      droppedComponent.dragndropPosition.margin && couldInsertAsChild(droppedComponent, draggedComponent)
        ? 0
        : droppedComponent.weight + 1;
    const parent =
      droppedComponent.dragndropPosition.margin && couldInsertAsChild(droppedComponent, draggedComponent)
        ? droppedComponent.id
        : droppedComponent.parent;
    if (monitor.isOver({ shallow: false })) {
      droppedComponent.moveComponent(draggedComponent.id, parent, newWeight);
    }
  },
};

/**
 * Collect function for React DND @DragSource annotated component
 */
export function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}
