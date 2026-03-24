/**
 * This method will check if a code list contains a given child
 */
export function hasChild(
  code: { value: string },
  listCodes: { id: string; parent: string }[],
): boolean {
  const found = listCodes.find((listCode) => listCode.parent === code.value);
  return found !== undefined;
}
