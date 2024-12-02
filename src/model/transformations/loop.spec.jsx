import { describe, expect, it } from 'vitest';

import { remoteToState, stateToRemote } from './loop';

describe('loop tramsformation', () => {
  describe('remoteToState', () => {
    it('should return the state representation of a loop', () => {
      expect(
        remoteToState(
          {
            id: 'ka08hypo',
            type: 'DynamicIterationType',
            Name: 'BOUCLE_INDIVIDU',
            MemberReference: ['j6p0ti5h', 'j6p0ti5h'],
            IterableReference: 'ka08eg6w',
            Filter: '$AGE$ < 18',
            Label: 'ekkcoco',
            Step: 1,
          },
          parent,
        ),
      ).toEqual({
        TargetMode: [],
        addButtonLibel: 'ekkcoco',
        basedOn: 'ka08eg6w',
        filter: '$AGE$ < 18',
        finalMember: 'j6p0ti5h',
        id: 'ka08hypo',
        initialMember: 'j6p0ti5h',
        maximum: undefined,
        name: 'BOUCLE_INDIVIDU',
        nameLoop: 'BOUCLE_INDIVIDU',
        type: 'LOOP',
        parent: parent,
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
        addButtonLibel: 'ekk',
        basedOn: 'ka08eg6w',
        filter: '$AGE$ < 18',
        finalMember: 'j6p0ti5h',
        id: 'jqqchose',
        initialMember: 'j6p0ti5h',
        maximum: 4,
        minimum: 3,
        name: 'BOUCLE1',
        nameLoop: 'BOUCLE1',
        parent: 'i6vwid',
        type: 'LOOP',
      },
      jqqchose2: {
        TargetMode: [],
        addButtonLibel: 'ekk',
        basedOn: undefined,
        filter: '$AGE$ < 18',
        finalMember: 'j6p0ti5h',
        id: 'jqqchose2',
        initialMember: 'j6p0ti5h',
        maximum: 4,
        minimum: 3,
        name: 'BOUCLE2',
        nameLoop: 'BOUCLE2',
        parent: 'i6vwid',
        type: 'LOOP',
      },
    };
    const remote = [
      {
        Filter: '$AGE$ < 18',
        IterableReference: 'ka08eg6w',
        Label: 'ekk',
        MemberReference: ['j6p0ti5h', 'j6p0ti5h'],
        Name: 'BOUCLE1',
        id: 'jqqchose',
        type: 'DynamicIterationType',
      },
      {
        Filter: '$AGE$ < 18',
        Label: 'ekk',
        MemberReference: ['j6p0ti5h', 'j6p0ti5h'],
        Name: 'BOUCLE2',
        id: 'jqqchose2',
        type: 'DynamicIterationType',
        Step: '1',
        Maximum: 4,
        Minimum: 3,
      },
    ];
    it('should return the remote representation of a loop', () => {
      expect(stateToRemote(store)).toEqual(remote);
    });
  });
});
