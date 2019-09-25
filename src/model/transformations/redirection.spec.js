import { remoteToState, stateToRemote } from './redirection';

describe('redirection transformation', () => {
  const remote = [
    {
      id: '1',
      Description: 'Description 1',
      Expression: 'Expression 1',
      IfTrue: 'IfTrue 1',
    },
    {
      id: '2',
      Description: 'Description 2',
      Expression: 'Expression 2',
      IfTrue: 'IfTrue 2',
    },
  ];
  const state = {
    '1': {
      id: '1',
      label: 'Description 1',
      condition: 'Expression 1',
      cible: 'IfTrue 1',
    },
    '2': {
      id: '2',
      label: 'Description 2',
      condition: 'Expression 2',
      cible: 'IfTrue 2',
    },
  };
  describe('remoteToState', () => {
    it('should return the state representation of an redirection', () => {
      expect(remoteToState(remote)).toEqual(state);
    });
  });
  describe('stateToRemote', () => {
    it('should return the remote representation of an redirection   ', () => {
      expect(stateToRemote(state)).toEqual(remote);
    });
  });
});
