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
    const datum = {
      id: codesList.id,
      label: codesList.Label,
      codes: computeCodes(codesList.Code),
    };
    res.push(datum);
  }
  return res;
}

function computeCodes(codes: PoguesCode[] = []): Code[] {
  const res: Code[] = [];
  for (const code of codes) {
    const datum = {
      label: code.Label,
      value: code.Value,
      // TODO subcodes
    };
    res.push(datum);
  }
  return res;
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

function computePoguesCodes(codes: Code[] = []): PoguesCode[] {
  const res: PoguesCode[] = [];
  for (const code of codes) {
    const datum = {
      Label: code.label,
      Value: code.value,
      // TODO subcodes
    };
    res.push(datum);
  }
  return res;
}
