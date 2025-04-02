import { CodesList } from '@/models/codesLists';

import { CodeList as PoguesCodesList } from '../models/pogues';
import { computeCodesLists } from './codesLists';

const codesLists: CodesList[] = [
  {
    id: 'id-1',
    label: 'label-1',
    codes: [
      {
        label: 'code-1',
        value: 'value-1',
        codes: [
          {
            label: 'sub-code-1',
            value: 'sub-value-1',
            codes: [
              {
                label: 'sub-sub-code-1',
                value: 'sub-sub-value-1',
              },
            ],
          },
        ],
      },
      { label: 'code-2', value: 'value-2' },
    ],
  },
];

const poguesCodesLists: PoguesCodesList[] = [
  {
    id: 'id-1',
    Name: 'label-1',
    Label: 'label-1',
    Code: [
      { Label: 'code-1', Value: 'value-1' },
      {
        Label: 'sub-code-1',
        Value: 'sub-value-1',
        Parent: 'value-1',
      },
      {
        Label: 'sub-sub-code-1',
        Value: 'sub-sub-value-1',
        Parent: 'sub-value-1',
      },
      { Label: 'code-2', Value: 'value-2' },
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
