import { remoteToState, stateToRemote } from './redirection-filters';
import { uuid } from 'utils/utils';

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
          pageBreak: false,
          parent: 'i6vwid',
          type: 'NYSTEDFILTRE',
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
          pageBreak: false,
          parent: 'i6vwid',
          type: 'FILTRE',
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
          pageBreak: false,
          parent: 'i6vwid',
          type: 'NYSTEDFILTRE',
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
          pageBreak: false,
          parent: 'i6vwid',
          type: 'NYSTEDFILTRE',
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
        pageBreak: false,
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
        pageBreak: false,
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
        name: 'FILTRE',
        nameLoop: 'FILTRE',
        pageBreak: false,
        parent: 'i6vwid',
        type: 'FILTRE',
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
        type: 'NYSTEDFILTRE',
        id: 'kea3voc7',
      },
    };
    const remote = [
      {
        id: 'jqqchose',
        name: 'FILTRE',
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
