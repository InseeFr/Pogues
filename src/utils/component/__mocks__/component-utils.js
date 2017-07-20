import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { SEQUENCE } = COMPONENT_TYPE;

export function canMoveTo() {
  return { canMoveTo: true };
}

export function couldInsertAsChild(draggedComponent, droppedComponent) {
  return droppedComponent.type === SEQUENCE;
}
