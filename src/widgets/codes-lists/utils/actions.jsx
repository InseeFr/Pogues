import { getMaxDepthInChildren, getLightierSiblings } from './utils';

export function disableMoveUpButton(allCodes, { parent, value }) {
  const children = allCodes
    .filter(c => c.parent === parent)
    .sort((code, nexCode) => {
      if (code.weight < nexCode.weight) return -1;
      if (code.weight > nexCode.weight) return 1;
      return 0;
    });

  if (children[0].value === value) {
    return true;
  }

  return false;
}

export function disableMoveDownButton(allCodes, { parent, value }) {
  const children = allCodes
    .filter(c => c.parent === parent)
    .sort((code, nexCode) => {
      if (code.weight < nexCode.weight) return -1;
      if (code.weight > nexCode.weight) return 1;
      return 0;
    });

  if (children[children.length - 1].value === value) {
    return true;
  }

  return false;
}

export function disableMoveLeftButton({ parent }) {
  return parent === '';
}

export function disableMoveRightButton(allCodes, code) {
  // We are testing that the code isn't the first children in the level.
  const lightierSiblings = getLightierSiblings(code, allCodes);

  if (lightierSiblings.length === 0) {
    return true;
  }

  // We need to check that moving to right any child depth will exceeds the maximum depth.
  const maxDepthInChildren = getMaxDepthInChildren(code, allCodes);

  return code.depth + maxDepthInChildren > 5;
}

export function getDisabledActions(allCodes, code, actions) {
  const disabledActions = [];
  if (disableMoveUpButton(allCodes, code))
    disabledActions.push(actions.MOVE_UP.name);
  if (disableMoveDownButton(allCodes, code))
    disabledActions.push(actions.MOVE_DOWN.name);
  if (disableMoveLeftButton(code)) disabledActions.push(actions.MOVE_LEFT.name);
  if (disableMoveRightButton(allCodes, code))
    disabledActions.push(actions.MOVE_RIGHT.name);
  if (code.precisionid === undefined || code.precisionid === '')
    disabledActions.push(actions.PRECISION_EDIT.name);
  if (code.precisionid) disabledActions.push(actions.PRECISION.name);

  return disabledActions;
}
