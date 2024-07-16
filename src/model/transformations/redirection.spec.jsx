import { describe, expect, it } from 'vitest';
import { remoteToState, stateToRemote } from './redirection-filters';

describe('redirection filters tramsformation', () => {
  describe('remoteToState', () => {
    it('should return the state representation of a filter', () => {
      expect(
        remoteToState(
          {
            id: 'jqqchose',
            Description: '',
            Expression: '',
            IfTrue: 'j6p0ti5h-j4nw88h2',
            Next: [
              {
                id: 'j6z12s2d',
                Description: '',
                Expression: '',
                IfTrue: 'j6p0ti5h-j4nw88h2',
                Next: [
                  {
                    id: 'kea3voc7',
                    Description: '',
                    Expression: '',
                    IfTrue: 'j6p0ti5h-j3341528',
                    name: 'TIPZ',
                  },
                  {
                    id: 'j7p0ti5h',
                    Description: '',
                    Expression: '',
                    IfTrue: 'j6p0ti5h-j6qe0h9q',
                    name: 'QSD',
                  },
                ],
                name: 'SEQ',
              },
            ],
            name: 'TETS',
          },
          'i6vwid',
          {},
        ),
      ).toEqual({
        j7p0ti5h: {
          TargetMode: [],
          description: '',
          filter: '',
          filterImbriquer: [],
          finalMember: 'j6qe0h9q',
          id: 'j7p0ti5h',
          initialMember: 'j6p0ti5h',
          name: 'QSD',
          parent: 'i6vwid',
          type: 'NESTEDFILTRE',
        },
        jqqchose: {
          TargetMode: [],
          description: '',
          filter: '',
          filterImbriquer: ['j6z12s2d'],
          finalMember: 'j4nw88h2',
          id: 'jqqchose',
          initialMember: 'j6p0ti5h',
          name: 'TETS',
          parent: 'i6vwid',
          type: 'FILTER',
        },
        kea3voc7: {
          TargetMode: [],
          description: '',
          filter: '',
          filterImbriquer: [],
          finalMember: 'j3341528',
          id: 'kea3voc7',
          initialMember: 'j6p0ti5h',
          name: 'TIPZ',
          parent: 'i6vwid',
          type: 'NESTEDFILTRE',
        },
        j6z12s2d: {
          TargetMode: [],
          description: '',
          filter: '',
          filterImbriquer: ['kea3voc7', 'j7p0ti5h'],
          finalMember: 'j4nw88h2',
          id: 'j6z12s2d',
          initialMember: 'j6p0ti5h',
          name: 'SEQ',
          parent: 'i6vwid',
          type: 'NESTEDFILTRE',
        },
      });
    });
  });
  describe('stateToRemote', () => {
    const store = {
      j6z12s2d: {
        TargetMode: [],
        children: ['j6z0z3us'],
        controls: {},
        declarations: {},
        id: 'j6z12s2d',
        label: 'Comment',
        name: 'MODULE6',
        parent: 'i6vwid',
        redirections: {},
        responsesClarification: undefined,
        type: 'SEQUENCE',
        weight: 5,
      },
      mlr12s2d: {
        TargetMode: [],
        children: ['ffscdvfs'],
        controls: {},
        declarations: {},
        id: 'mlr12s2d',
        label: 'Comment',
        name: 'MODULE2',
        parent: 'i6vwid',
        redirections: {},
        responsesClarification: undefined,
        type: 'SEQUENCE',
        weight: 2,
      },
      jqqchose: {
        TargetMode: [],
        filter: '$AGE$ < 18',
        finalMember: 'j6z12s2d',
        id: 'jqqchose',
        initialMember: 'j6p0ti5h',
        name: 'FILTER',
        nameLoop: 'FILTER',
        parent: 'i6vwid',
        type: 'FILTER',
        filterImbriquer: ['kea3voc7'],
        description: 'desc',
      },
      kea3voc7: {
        typeFilter: 'new',
        name: 'TEST',
        description: 'dqddd',
        filter: '',
        initialMember: 'j6p0ti5h',
        finalMember: 'j6p0ti5h',
        filterImbriquer: [],
        type: 'NESTEDFILTRE',
        id: 'kea3voc7',
      },
    };
    const remote = [
      {
        id: 'jqqchose',
        Description: 'desc',
        Expression: '$AGE$ < 18',
        IfTrue: 'j6p0ti5h-j6z12s2d',
        Next: [
          {
            id: 'kea3voc7',
            name: 'TEST',
            Description: 'dqddd',
            Expression: '',
            IfTrue: 'j6p0ti5h-j6p0ti5h',
          },
        ],
      },
    ];
    it('should return the remote representation of a redirection filters', () => {
      expect(stateToRemote(store)).toEqual(remote);
    });
  });
});
