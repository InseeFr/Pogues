import { remoteToStore, storeToRemote } from './external-variable';

describe('external variable transformation', () => {
  const remote = [
    {
      id: '1',
      Name: 'Name 1',
      Label: 'Label 1',
      type: 'ExternalVariableType'
    },
    {
      id: '2',
      Name: 'Name 2',
      Label: 'Label 2',
      type: 'ExternalVariableType'
    }
  ];
  const state = {
    '1': {
      id: '1',
      name: 'Name 1',
      label: 'Label 1'
    },
    '2': {
      id: '2',
      name: 'Name 2',
      label: 'Label 2'
    }
  };
  describe('remoteToStore', () => {
    it('should return the state representation of an external variable', () => {
      expect(remoteToStore(remote)).toEqual(state);
    });
  });
  describe('storeToRemote', () => {
    it('should return the remote representation of an external variable', () => {
      expect(storeToRemote(state)).toEqual(remote);
    });
  });
});