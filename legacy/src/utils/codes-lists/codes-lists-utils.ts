import { CodeList, RemoteCodeList } from '@/models/code-lists';

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

const isNullish = (param: unknown) => param === undefined || param === null;

export const isNomenclatureCodeList = (codeList?: CodeList): boolean =>
  !isNullish(codeList?.urn) || !isNullish(codeList?.suggesterParameters);

export const isNomenclatureRemoteCodeList = (
  codeList?: RemoteCodeList,
): boolean =>
  !isNullish(codeList?.Urn) || !isNullish(codeList?.SuggesterParameters);
