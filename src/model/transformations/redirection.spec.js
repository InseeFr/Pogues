import { remoteToState, stateToRemote } from './redirection-filters';
import { uuid } from 'utils/utils';
describe('redirection filters tramsformation', () => {
  describe('remoteToState', () => {
    it('should return the state representation of a filter', () => {
      expect(
        remoteToState(
          {
            Description: '',
            Expression: '',
            IfTrue: 'j6p0ti5h-j4nw88h2',
            Next: [
              {
                Description: '',
                Expression: '',
                IfTrue: 'j6p0ti5h-j4nw88h2',
                Next: [
                  {
                    Description: '',
                    Expression: '',
                    IfTrue: 'j6p0ti5h-j3341528',
                    id: 'TIPZ',
                  },
                  {
                    Description: '',
                    Expression: '',
                    IfTrue: 'j6p0ti5h-j6qe0h9q',
                    id: 'QSD',
                  },
                ],
                id: 'SEQ',
              },
            ],
            id: 'TETS',
          },
          'i6vwid',
        ),
      ).toEqual({
        qsd: {
          TargetMode: [],
          description: '',
          filter: '',
          filterImbriquer: [],
          finalMember: 'j6qe0h9q',
          id: 'qsd',
          initialMember: '6p0ti5h',
          name: 'QSD',
          pageBreak: false,
          parent: 'i6vwid',
          type: 'NYSTEDFILTRE',
        },
        tets: {
          TargetMode: [],
          description: '',
          filter: '',
          filterImbriquer: ['seq'],
          finalMember: 'j4nw88h2',
          id: 'tets',
          initialMember: '6p0ti5h',
          name: 'TETS',
          pageBreak: false,
          parent: 'i6vwid',
          type: 'FILTRE',
        },
        tipz: {
          TargetMode: [],
          description: '',
          filter: '',
          filterImbriquer: [],
          finalMember: 'j3341528',
          id: 'tipz',
          initialMember: '6p0ti5h',
          name: 'TIPZ',
          pageBreak: false,
          parent: 'i6vwid',
          type: 'NYSTEDFILTRE',
        },
        seq: {
          TargetMode: [],
          description: '',
          filter: '',
          filterImbriquer: ['tipz', 'qsd'],
          finalMember: 'j4nw88h2',
          id: 'seq',
          initialMember: '6p0ti5h',
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
        id: 'FILTRE',
        Description: 'desc',
        Expression: '$AGE$ < 18',
        IfTrue: 'j6p0ti5h-j6z12s2d',
        Next: [
          {
            id: 'TEST',
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
