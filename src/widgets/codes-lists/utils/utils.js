export function getCodeIndex(allCodes = [], value = '') {
  return allCodes.map(c => c.value).indexOf(value);
}

export function getCodeWeight(allCodes = [], valueParent = '') {
  const heaviestWeight = allCodes.filter(c => c.parent === valueParent).reduce((acc, c) => {
    return c.weight > acc ? c.weight : acc;
  }, 0);

  return heaviestWeight + 1;
}

export function disableRemoveButton(allCodes, value) {
  return allCodes.filter(c => c.parent === value).length > 0;
}

export function disableAddButton(depth) {
  return depth === 5;
}

export function disableMoveUpButton(allCodes, code) {
  const siblings = allCodes.filter(c => c.parent === code.parent);

  if (siblings.length === 1) {
    return true;
  }

  const index = siblings.map(c => c.value).indexOf(code.value);

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

  const index = siblings.map(c => c.value).indexOf(code.value);

  if (index === allCodes.length - 1) {
    return true;
  }

  return false;
}

export function disableMoveLeftButton(allCodes, code) {
  if (code.depth === 1) {
    return true;
  }

  const siblings = allCodes.filter(c => c.parent === code.parent);
  const index = siblings.map(c => c.value).indexOf(code.value);

  if (index === 0) {
    return true;
  }

  return false;
}

export function disableMoveRightButton(allCodes, code) {
  if (code.depth === 5) {
    return true;
  }

  const siblings = allCodes.filter(c => c.parent === code.parent);
  const index = siblings.map(c => c.value).indexOf(code.value);

  if (index === 0) {
    return true;
  }

  return false;
}

export function getDisabledActions(allCodes, code, actions) {
  const disabledActions = [];

  if (disableRemoveButton(allCodes, code.value)) disabledActions.push(actions.REMOVE.name);
  if (disableMoveUpButton(allCodes, code)) disabledActions.push(actions.MOVE_UP.name);
  if (disableMoveDownButton(allCodes, code)) disabledActions.push(actions.MOVE_DOWN.name);
  if (disableMoveLeftButton(allCodes, code)) disabledActions.push(actions.MOVE_LEFT.name);
  if (disableMoveRightButton(allCodes, code)) disabledActions.push(actions.MOVE_RIGHT.name);

  return disabledActions;
}

export function getMoveUp(allCodes, code, move) {
  return () => {
    const indexOrigin = getCodeIndex(allCodes, code.value);
    const numChildrenCode = allCodes.filter(c => c.parent === code.value).length;
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
    const indexOrigin = getCodeIndex(allCodes, code.value);
    const numChildrenCode = allCodes.filter(c => c.parent === code.value).length;
    const indexSibling = indexOrigin + numChildrenCode + 1;
    const numChildrenSibling = allCodes.filter(c => c.parent === allCodes[indexSibling].value).length;
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
