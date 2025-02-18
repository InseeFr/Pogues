import { Code, CodesList } from '@/models/codesLists';

import {
  CodeType as PoguesCode,
  CodeList as PoguesCodesList,
} from '../models/pogues';

/** Compute codes lists that can be used in our app from API data. */
export function computeCodesLists(
  codesLists: PoguesCodesList[] = [],
): CodesList[] {
  const res: CodesList[] = [];
  for (const codesList of codesLists) {
    if (!codesList.Urn) {
      const datum = {
        id: codesList.id,
        label: codesList.Label,
        codes: computeRootCodes(codesList.Code),
      };
      res.push(datum);
    }
  }
  return res;
}

// compute codes at the root of the list: they should not have a parent
function computeRootCodes(codes: PoguesCode[] = []): Code[] {
  const res: Code[] = [];
  for (const code of codes) {
    if (code.Parent) continue;
    const datum = {
      label: code.Label,
      value: code.Value,
      codes: getSubCodes(codes, code.Value),
    };
    res.push(datum);
  }
  return res;
}

// compute a subcode: they have a parent and we should get their children too
function getSubCodes(
  codes: PoguesCode[],
  parentValue: string,
): Code[] | undefined {
  const subCodes = [];
  for (const code of codes) {
    if (code.Parent === parentValue) {
      const datum = {
        label: code.Label,
        value: code.Value,
        codes: getSubCodes(codes, code.Value),
      };
      subCodes.push(datum);
    }
  }
  return subCodes.length > 0 ? subCodes : undefined;
}

/** Compute codes lists that can be sent to the API from our app data. */
export function computePoguesCodesLists(
  codesLists: CodesList[] = [],
): PoguesCodesList[] {
  const res: PoguesCodesList[] = [];
  for (const codesList of codesLists) {
    const datum = {
      id: codesList.id,
      Name: codesList.label,
      Label: codesList.label,
      Code: computePoguesCodes(codesList.codes),
    };
    res.push(datum);
  }
  return res;
}

function computePoguesCodes(codes: Code[] = [], parent?: Code): PoguesCode[] {
  const res: PoguesCode[] = [];
  for (const code of codes) {
    const datum = {
      Label: code.label,
      Value: code.value,
      Parent: parent ? parent.value : undefined,
    };
    res.push(datum);
    res.push(...computePoguesCodes(code.codes, code));
  }
  return res;
}
