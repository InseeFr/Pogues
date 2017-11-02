export function getCodeIndex(allCodes = [], codeAttr = '') {
  return allCodes.map(c => c.code).indexOf(codeAttr);
}

export function getCodeDepth(allCodes, codeParent) {
  let depth = 1;
  let currentCodeParent = codeParent;

  while (currentCodeParent !== '') {
    depth += 1;
    const indexParent = getCodeIndex(allCodes, currentCodeParent);
    currentCodeParent = allCodes[indexParent].parent;
  }

  return depth;
}

export function disableRemoveButton(allCodes, codeAttr) {
  return allCodes.filter(c => c.parent === codeAttr).length > 0;
}

export function disableAddButton(depth) {
  return depth === 5;
}

export function disableMoveUpButton(allCodes, code) {
  const siblings = allCodes.filter(c => c.parent === code.parent);

  if (siblings.length === 1) {
    return true;
  }

  const index = siblings.map(c => c.code).indexOf(code.code);

  if (index === 0) {
    return true;
  }

  return false;
}

export function disableMoveDownButton(allCodes, code) {
  const siblings = allCodes.filter(c => c.parent === code.parent);

  if (siblings.length === 1) {
    return true;
  }

  const index = siblings.map(c => c.code).indexOf(code.code);

  if (index === allCodes.length - 1) {
    return true;
  }

  return false;
}

export function disableMoveLeftButton(allCodes, code, depth) {
  if (depth === 1) {
    return true;
  }

  const siblings = allCodes.filter(c => c.parent === code.parent);
  const index = siblings.map(c => c.code).indexOf(code.code);

  if (index === 0) {
    return true;
  }

  return false;
}

export function disableMoveRightButton(allCodes, code, depth) {
  if (depth === 5) {
    return true;
  }

  const siblings = allCodes.filter(c => c.parent === code.parent);
  const index = siblings.map(c => c.code).indexOf(code.code);

  if (index === 0) {
    return true;
  }

  return false;
}

export function getDisabledActions(allCodes, code, depth, actions) {
  const disabledActions = [];

  if (disableAddButton(depth)) disabledActions.push(actions.SHOW_ADD);
  if (disableRemoveButton(allCodes, code.code)) disabledActions.push(actions.REMOVE);
  if (disableMoveUpButton(allCodes, code)) disabledActions.push(actions.MOVE_UP);
  if (disableMoveDownButton(allCodes, code)) disabledActions.push(actions.MOVE_DOWN);
  if (disableMoveLeftButton(allCodes, code, depth)) disabledActions.push(actions.MOVE_LEFT);
  if (disableMoveRightButton(allCodes, code, depth)) disabledActions.push(actions.MOVE_RIGHT);

  return disabledActions;
}

export function getMoveUp(allCodes, code, move) {
  return () => {
    const indexOrigin = getCodeIndex(allCodes, code.code);
    const numChildrenCode = allCodes.filter(c => c.parent === code.code).length;
    let indexSibling = indexOrigin - 1;

    while (allCodes[indexOrigin].parent !== allCodes[indexSibling].parent) {
      indexSibling -= 1;
    }

    for (let i = 0; i < numChildrenCode + 1; i += 1) {
      move(indexOrigin + i, indexSibling + i);
    }
  };
}

export function getMoveDown(allCodes, code, move) {
  return () => {
    const indexOrigin = getCodeIndex(allCodes, code.code);
    const numChildrenCode = allCodes.filter(c => c.parent === code.code).length;
    const indexSibling = indexOrigin + numChildrenCode + 1;
    const numChildrenSibling = allCodes.filter(c => c.parent === allCodes[indexSibling].code).length;
    const targetIndex = indexSibling + numChildrenSibling;

    for (let i = 0; i < numChildrenCode + 1; i += 1) {
      move(indexOrigin, targetIndex);
    }
  };
}

export function getMoveLeft(allCodes, code, insert, remove) {
  return () => {};
}

export function getMoveRight(allCodes, code, insert, remove) {
  return () => {};
}
