import { getIndexItemsByAttrs } from '../../../utils/widget-utils';
import {
  getNewCodeWeight,
  getDescendents,
  getIndexCode,
  getHeavierSiblings,
} from './utils';

function getPreviousSibling(code, codes) {
  return getIndexItemsByAttrs(
    {
      parent: code.parent,
      weight: code.weight - 1,
    },
    codes,
  );
}

function getNextSibling(code, codes) {
  return getIndexItemsByAttrs(
    {
      parent: code.parent,
      weight: code.weight + 1,
    },
    codes,
  );
}

function increaseDescendentsDepth(code, codes) {
  const descendentsValues = getDescendents(code, codes).map(c => c.value);

  return codes.map(c => {
    if (descendentsValues.indexOf(c.value) !== -1) {
      return {
        ...c,
        depth: c.depth + 1,
      };
    }
    return c;
  });
}

function decreaseDescendentsDepth(code, codes) {
  const descendentsValues = getDescendents(code, codes).map(c => c.value);

  return codes.map(c => {
    if (descendentsValues.indexOf(c.value) !== -1) {
      return {
        ...c,
        depth: c.depth - 1,
      };
    }
    return c;
  });
}

function decreaseHeavierSiblingsWeight(code, codes) {
  const heavierSiblings = getHeavierSiblings(code, codes).map(c => c.value);

  return codes.map(c => {
    if (heavierSiblings.indexOf(c.value) !== -1) {
      return {
        ...c,
        weight: c.weight - 1,
      };
    }
    return c;
  });
}

export function moveUp(codeValue, codes) {
  const newCodes = [...codes];
  const indexCode = getIndexCode(codeValue, codes);

  if (indexCode !== undefined) {
    const code = codes[indexCode];
    const indexSiblingTarget = getPreviousSibling(code, codes);

    if (indexSiblingTarget !== undefined) {
      newCodes.splice(indexCode, 1, { ...code, weight: code.weight - 1 });
      newCodes.splice(indexSiblingTarget, 1, {
        ...codes[indexSiblingTarget],
        weight: codes[indexSiblingTarget].weight + 1,
      });
    }
  }

  return newCodes;
}

export function moveDown(codeValue, codes) {
  const newCodes = [...codes];
  const indexCode = getIndexCode(codeValue, codes);

  if (indexCode !== undefined) {
    const code = codes[indexCode];
    const indexSiblingTarget = getNextSibling(code, codes);

    if (indexSiblingTarget !== undefined) {
      newCodes.splice(indexCode, 1, { ...code, weight: code.weight + 1 });
      newCodes.splice(indexSiblingTarget, 1, {
        ...codes[indexSiblingTarget],
        weight: codes[indexSiblingTarget].weight - 1,
      });
    }
  }

  return newCodes;
}

export function moveLeft(codeValue, codes) {
  let newCodes = [...codes];
  const indexCode = getIndexCode(codeValue, codes);

  if (indexCode !== undefined) {
    const code = codes[indexCode];
    const indexNewSibling = getIndexCode(code.parent, codes);
    const indexNewParent = getIndexCode(codes[indexNewSibling].parent, codes);
    const newParent = codes[indexNewParent] || {};

    newCodes.splice(indexCode, 1, {
      ...code,
      depth: code.depth - 1,
      parent: newParent.value || '',
      weight: getNewCodeWeight(codes, newParent.value),
    });

    newCodes = decreaseDescendentsDepth(code, newCodes);
  }

  return newCodes;
}

export function moveRight(codeValue, codes) {
  let newCodes = [...codes];
  const indexCode = getIndexCode(codeValue, codes);

  if (indexCode !== undefined) {
    const code = codes[indexCode];
    const indexSiblingTarget = getPreviousSibling(code, codes);

    if (indexSiblingTarget !== undefined) {
      const newParent = codes[indexSiblingTarget];

      newCodes.splice(indexCode, 1, {
        ...code,
        depth: newParent.depth + 1,
        parent: newParent.value,
        weight: getNewCodeWeight(codes, newParent.value),
      });

      newCodes = increaseDescendentsDepth(code, newCodes);
      newCodes = decreaseHeavierSiblingsWeight(code, newCodes);
    }
  }

  return newCodes;
}
