export function getNewCodeWeight(allCodes = [], parent = '') {
  return (
    allCodes
      .filter((c) => c.parent === parent)
      .map((c) => c.weight)
      .reduce((a, b) => {
        return Math.max(a, b);
      }, 0) + 1
  );
}
