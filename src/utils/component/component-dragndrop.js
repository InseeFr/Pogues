import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { canMoveTo } from 'utils/component/component-utils';

const { SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

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
  drop(props, monitor) {
    const newWeight = (props.type === SEQUENCE || props.type === SUBSEQUENCE) && props.childrenId.length === 0
      ? 0
      : props.weight + 1;
    const parent = (props.type === SEQUENCE || props.type === SUBSEQUENCE) && props.childrenId.length === 0
      ? props.id
      : props.parent;
    if (monitor.isOver({ shallow: false })) {
      props.moveComponent(monitor.getItem().id, parent, newWeight);
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
