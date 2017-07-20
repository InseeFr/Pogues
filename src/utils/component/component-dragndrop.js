import { canMoveTo, couldInsertAsChild } from 'utils/component/component-utils';

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
  /**
    * This method will return trus if a component can be dropped next to another one
    */
  canDrop(props, monitor) {
    return canMoveTo(monitor.getItem(), props);
  },

  /**
   * When the component is physically dropped, this method will be executed. We 
   * will calculate the tardet weight and parent, and then update the store.
   */
  drop(droppedComponent, monitor) {
    const draggedComponent = monitor.getItem();
    const newWeight = couldInsertAsChild(draggedComponent, droppedComponent) ? 0 : droppedComponent.weight + 1;
    const parent = couldInsertAsChild(draggedComponent, droppedComponent)
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
