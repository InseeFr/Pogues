export function moveQuestionAndSubSequenceToSequence() {
  return {
    moveQuestionAndSubSequenceToSequence: true,
  };
}

export function increaseWeightOfAll() {
  return {
    increaseWeightOfAll: true,
  };
}

export function moveQuestionToSubSequence() {
  return {
    moveQuestionToSubSequence: true,
  };
}

export function moveComponent(activesComponents, idMovedComponent, idTargetComponent, newWeight) {
  return {
    activesComponents,
    idMovedComponent,
    idTargetComponent,
    newWeight,
  };
}
