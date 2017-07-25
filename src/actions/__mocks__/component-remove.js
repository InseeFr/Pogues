export function removeLeafComponent(activesComponents, deletedComponent) {
  return {
    removeLeafComponent: true,
    activesComponents,
    deletedComponent,
  };
}

export function removeSubSequence(activesComponents, deletedComponent) {
  return {
    removeSubSequence: true,
    activesComponents,
    deletedComponent,
  };
}

export function removeSequence(activesComponents, deletedComponent) {
  return {
    removeSequence: true,
    activesComponents,
    deletedComponent,
  };
}
