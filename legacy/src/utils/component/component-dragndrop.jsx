export const PropType = 'COMPONENT';

/**
 * When we start dragging a component, we will define the information we need
 * for the drag&drop behavior. This informations will then be available thanks to
 * the monitor.getItem() method
 */
export const componentSource = {
  beginDrag(props) {
    return {
      id: props.component.id,
      type: props.component.type,
      parent: props.component.parent,
      children: props.component.children,
    };
  },
};

/**
 * Collect function for React DND @DropTarget annotated component
 */
export const cardTarget = {
  /**
   * The canDrop only return false if we try to drag a component into its
   * own children
   */
  canDrop(props, monitor) {
    return (
      props.component.parent !== monitor.getItem().id &&
      monitor.getItem().children.indexOf(props.component.parent) < 0
    );
  },
  /**
   * When the component is physically dropped, this method will be executed.
   */
  drop(droppedComponent, monitor) {
    if (monitor.isOver({ shallow: false })) {
      droppedComponent.moveComponent(
        droppedComponent.component.id,
        monitor.getItem().id,
      );
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
