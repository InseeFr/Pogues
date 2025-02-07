import { Code, CodesList } from '@/models/codesLists';

import {
  CodeType as PogueCode,
  CodeList as PogueCodesList,
} from '../models/pogues';

export function computeCodesLists(
  codesLists: PogueCodesList[] = [],
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

function computeCodes(codes: PogueCode[] = []): Code[] {
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

export function computePoguesCodesLists(
  codesLists: CodesList[] = [],
): PogueCodesList[] {
  const res: PogueCodesList[] = [];
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

function computePoguesCodes(codes: Code[] = []): PogueCode[] {
  const res: PogueCode[] = [];
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
