import { describe, expect, it } from 'vitest';

import { remoteToState, stateToRemote } from './loop';

describe('loop tramsformation', () => {
  describe('remoteToState', () => {
    it('should return the state representation of a loop based on another loop', () => {
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

    it('should return the state representation of a loop not based on another loop, with dynamic length', () => {
      expect(
        remoteToState(
          {
            id: 'ka08hypo',
            type: 'DynamicIterationType',
            Name: 'BOUCLE_INDIVIDU',
            MemberReference: ['j6p0ti5h', 'j6p0ti5h'],
            Filter: '$AGE$ < 18',
            Label: 'ekkcoco',
            isFixedLength: false,
            maximum: 3,
            minimum: 1,
            Step: 1,
          },
          parent,
        ),
      ).toEqual({
        id: 'ka08hypo',
        TargetMode: [],
        addButtonLibel: 'ekkcoco',
        filter: '$AGE$ < 18',
        finalMember: 'j6p0ti5h',
        initialMember: 'j6p0ti5h',
        basedOn: undefined,
        isFixedLength: false,
        maximum: 3,
        minimum: 1,
        name: 'BOUCLE_INDIVIDU',
        nameLoop: 'BOUCLE_INDIVIDU',
        type: 'LOOP',
        parent: parent,
      });
    });

    it('should return the state representation of a loop not based on another loop, with fixed length', () => {
      const defaultRemote = {
        id: 'ka08hypo',
        type: 'DynamicIterationType',
        Name: 'BOUCLE_INDIVIDU',
        MemberReference: ['j6p0ti5h', 'j6p0ti5h'],
        Filter: '$AGE$ < 18',
        Label: 'ekkcoco',
        isFixedLength: true,
        size: '$NBHAB$',
        Step: 1,
      };

      // all occurrences displayed on the same page
      expect(remoteToState(defaultRemote, parent)).toEqual({
        id: 'ka08hypo',
        TargetMode: [],
        addButtonLibel: 'ekkcoco',
        filter: '$AGE$ < 18',
        finalMember: 'j6p0ti5h',
        initialMember: 'j6p0ti5h',
        basedOn: undefined,
        isFixedLength: true,
        size: '$NBHAB$',
        name: 'BOUCLE_INDIVIDU',
        nameLoop: 'BOUCLE_INDIVIDU',
        type: 'LOOP',
        parent: parent,
      });

      // loop displayed with one page per occurrence
      const splitIterationsRemote = {
        ...defaultRemote,
        shouldSplitIterations: true,
      };
      expect(remoteToState(splitIterationsRemote, parent)).toEqual({
        id: 'ka08hypo',
        TargetMode: [],
        addButtonLibel: 'ekkcoco',
        filter: '$AGE$ < 18',
        finalMember: 'j6p0ti5h',
        initialMember: 'j6p0ti5h',
        basedOn: undefined,
        isFixedLength: true,
        size: '$NBHAB$',
        shouldSplitIterations: true,
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
        id: 'j6z12s2d',
        TargetMode: [],
        children: ['j6z0z3us'],
        controls: {},
        declarations: {},
        label: 'Comment',
        name: 'MODULE6',
        parent: 'i6vwid',
        redirections: {},
        responsesClarification: undefined,
        type: 'SEQUENCE',
        weight: 5,
      },
      mlr12s2d: {
        id: 'mlr12s2d',
        TargetMode: [],
        children: ['ffscdvfs'],
        controls: {},
        declarations: {},
        label: 'Comment',
        name: 'MODULE2',
        parent: 'i6vwid',
        redirections: {},
        responsesClarification: undefined,
        type: 'SEQUENCE',
        weight: 2,
      },
      jqqchose: {
        id: 'jqqchose',
        TargetMode: [],
        addButtonLibel: 'ekk',
        basedOn: 'ka08eg6w',
        filter: '$AGE$ < 18',
        finalMember: 'j6p0ti5h',
        initialMember: 'j6p0ti5h',
        maximum: 4,
        minimum: 3,
        name: 'BOUCLE1',
        nameLoop: 'BOUCLE1',
        parent: 'i6vwid',
        type: 'LOOP',
        isFixedLength: false,
      },
      jqqchose2: {
        id: 'jqqchose2',
        TargetMode: [],
        addButtonLibel: 'ekk',
        basedOn: undefined,
        filter: '$AGE$ < 18',
        finalMember: 'j6p0ti5h',
        initialMember: 'j6p0ti5h',
        maximum: 4,
        minimum: 3,
        name: 'BOUCLE2',
        nameLoop: 'BOUCLE2',
        parent: 'i6vwid',
        type: 'LOOP',
        isFixedLength: false,
      },
      jqqchose3: {
        id: 'jqqchose3',
        TargetMode: [],
        addButtonLibel: 'fixed button',
        basedOn: undefined,
        filter: '',
        finalMember: 'j6p0ti5h',
        initialMember: 'j6p0ti5h',
        name: 'BOUCLE3',
        nameLoop: 'BOUCLE3',
        parent: 'i6vwid',
        type: 'LOOP',
        isFixedLength: true,
        size: 2,
        shouldSplitIterations: true,
      },
    };
    const remote = [
      {
        id: 'jqqchose',
        Filter: '$AGE$ < 18',
        IterableReference: 'ka08eg6w',
        MemberReference: ['j6p0ti5h', 'j6p0ti5h'],
        Name: 'BOUCLE1',
        type: 'DynamicIterationType',
      },
      {
        id: 'jqqchose2',
        Filter: '$AGE$ < 18',
        Label: 'ekk',
        MemberReference: ['j6p0ti5h', 'j6p0ti5h'],
        Name: 'BOUCLE2',
        type: 'DynamicIterationType',
        Step: '1',
        isFixedLength: false,
        maximum: 4,
        minimum: 3,
      },
      {
        id: 'jqqchose3',
        MemberReference: ['j6p0ti5h', 'j6p0ti5h'],
        Name: 'BOUCLE3',
        type: 'DynamicIterationType',
        Step: '1',
        isFixedLength: true,
        size: 2,
        shouldSplitIterations: true,
      },
    ];
    it('should return the remote representation of a loop', () => {
      expect(stateToRemote(store)).toEqual(remote);
    });
  });
});
