/** Add or remove a value from a set based on provided boolean. */
export function changeSetValue<T>(
  set: Set<T>,
  value: T,
  shouldHaveValue: boolean,
): Set<T> {
  if (shouldHaveValue) return addSetValue(set, value);
  return removeSetValue(set, value);
}

function addSetValue<T>(set: Set<T>, value: T): Set<T> {
  return new Set(set).add(value);
}

function removeSetValue<T>(set: Set<T>, value: T): Set<T> {
  const res = new Set(set);
  res.delete(value);
  return res;
}
