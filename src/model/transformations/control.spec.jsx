import { describe, expect, it } from 'vitest';

import { remoteToState, stateToRemote } from './control';

describe('control tramsformation', () => {
  const remote = [
    {
      id: '1',
      Description: 'Description 1',
      Expression: 'Expression 1',
      FailMessage: 'FailMessage 1',
      criticity: 'criticity 1',
      during_collect: 'during_collect 1',
      post_collect: 'post_collect 1',
      scope: false,
    },
    {
      id: '2',
      Description: 'Description 2',
      Expression: 'Expression 2',
      FailMessage: 'FailMessage 2',
      criticity: 'criticity 2',
      during_collect: 'during_collect 2',
      post_collect: 'post_collect 2',
      scope: 'occurrence',
    },
  ];
  const state = {
    1: {
      id: '1',
      label: 'Description 1',
      condition: 'Expression 1',
      message: 'FailMessage 1',
      criticity: 'criticity 1',
      during_collect: 'during_collect 1',
      post_collect: 'post_collect 1',
      scope: 'WHOLE',
    },
    2: {
      id: '2',
      label: 'Description 2',
      condition: 'Expression 2',
      message: 'FailMessage 2',
      criticity: 'criticity 2',
      during_collect: 'during_collect 2',
      post_collect: 'post_collect 2',
      scope: 'OCCURRENCE',
    },
  };
  describe('remoteToState', () => {
    it('should return the state representation of a control', () => {
      expect(remoteToState(remote)).toEqual(state);
    });
  });
  describe('stateToRemote', () => {
    it('should return the remote representation of a control', () => {
      expect(stateToRemote(state)).toEqual(remote);
    });
  });
});
