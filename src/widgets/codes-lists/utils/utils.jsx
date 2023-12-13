import { getIndexItemsByAttrs } from '../../../utils/widget-utils';

export function getNewCodeWeight(allCodes = [], parent = '') {
  return (
    allCodes
      .filter(c => c.parent === parent)
      .map(c => c.weight)
      .reduce((a, b) => {
        return Math.max(a, b);
      }, 0) + 1
  );
}

export function getChildren(code, codes) {
  return codes.filter(c => c.parent === code.value);
}

export function getDescendents(code, codes) {
  return getChildren(code, codes).reduce((acc, c) => {
    return [...acc, c, ...getDescendents(c, codes)];
  }, []);
}

export function getHeavierSiblings(code, codes) {
  return codes.filter(c => c.parent === code.parent && c.weight > code.weight);
}

export function getLightierSiblings(code, codes) {
  return codes.filter(c => c.parent === code.parent && c.weight < code.weight);
}

export function getMaxDepthInChildren(code, codes) {
  return getDescendents(code, codes)
    .map(c => c.depth)
    .reduce((a, b) => {
      return Math.max(a, b);
    }, 1);
}

export function resetListCodes(codes, removeAll, push) {
  removeAll();
  codes.forEach(c => push(c));
}

export function getIndexCode(value, codes) {
  return getIndexItemsByAttrs(
    {
      value,
    },
    codes,
  );
}
