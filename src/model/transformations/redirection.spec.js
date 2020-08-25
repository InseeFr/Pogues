import { remoteToState, stateToRemote } from './redirection-filters';

describe('redirection filters tramsformation', () => {
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
        imbriquers: ['kea3voc7'],
        description: 'desc',
      },
      kea3voc7: {
        typeFilter: 'new',
        name: 'TEST',
        descriptionImbriquer: 'dqddd',
        conditionImbriquer: '',
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
