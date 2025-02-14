import { CodesList } from '@/models/codesLists';

import { CodeList as PoguesCodesList } from '../models/pogues';
import { computeCodesLists, computePoguesCodesLists } from './codesLists';

const codesLists: CodesList[] = [
  {
    id: 'id-1',
    label: 'label-1',
    codes: [
      { label: 'code-1', value: 'code-value-1' },
      { label: 'code-2', value: 'code-value-2' },
    ],
  },
];

const poguesCodesLists: PoguesCodesList[] = [
  {
    id: 'id-1',
    Name: 'label-1',
    Label: 'label-1',
    Code: [
      { Label: 'code-1', Value: 'code-value-1' },
      { Label: 'code-2', Value: 'code-value-2' },
    ],
  },
];

describe('computeCodesLists', () => {
  it('works', () => {
    expect(computeCodesLists(poguesCodesLists)).toEqual(codesLists);
  });
  it('works with empty list', () => {
    expect(computeCodesLists([])).toEqual([]);
  });
});

describe('computePoguesCodesLists', () => {
  it('works', () => {
    expect(computePoguesCodesLists(codesLists)).toEqual(poguesCodesLists);
  });
  it('works with empty list', () => {
    expect(computeCodesLists([])).toEqual([]);
  });
});
