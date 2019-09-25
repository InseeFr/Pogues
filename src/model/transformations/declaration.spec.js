import { stateToRemote, remoteToState } from './declaration';

describe('declaration tranformations', () => {
  describe('remoteToStore', () => {
    test('should reduce all variables in an object', () => {
      const remote = [
        {
          id: '1',
          Text: 'label 1',
          declarationType: 'declarationType1',
          position: 1,
        },
        {
          id: '2',
          Text: 'label 2',
          declarationType: 'declarationType2',
          position: 2,
        },
        {
          id: '3',
          Text: 'label 3',
          declarationType: 'declarationType3',
          position: 3,
        },
      ];

      expect(remoteToState(remote)).toEqual({
        '1': {
          id: '1',
          label: 'label 1',
          declarationType: 'declarationType1',
          position: 1,
        },
        '2': {
          id: '2',
          label: 'label 2',
          declarationType: 'declarationType2',
          position: 2,
        },
        '3': {
          id: '3',
          label: 'label 3',
          declarationType: 'declarationType3',
          position: 3,
        },
      });
    });
    test('should generate an ID', () => {
      const remote = [
        {
          Text: 'label 1',
          declarationType: 'declarationType1',
          position: 1,
        },
        {
          Text: 'label 2',
          declarationType: 'declarationType2',
          position: 2,
        },
        {
          Text: 'label 3',
          declarationType: 'declarationType3',
          position: 3,
        },
      ];
      const result = remoteToState(remote);
      Object.keys(result).forEach(key => expect(key).toBeDefined());
    });
  });
  describe('storeToRemote', () => {
    it('should return an array of collected variables', () => {
      const store = {
        '1': {
          id: '1',
          label: 'label 1',
          declarationType: 'declarationType1',
          position: 1,
        },
        '2': {
          id: '2',
          label: 'label 2',
          declarationType: 'declarationType2',
          position: 2,
        },
        '3': {
          id: '3',
          label: 'label 3',
          declarationType: 'declarationType3',
          position: 3,
        },
      };

      expect(stateToRemote(store)).toEqual([
        {
          id: '1',
          Text: 'label 1',
          declarationType: 'declarationType1',
          position: 1,
        },
        {
          id: '2',
          Text: 'label 2',
          declarationType: 'declarationType2',
          position: 2,
        },
        {
          id: '3',
          Text: 'label 3',
          declarationType: 'declarationType3',
          position: 3,
        },
      ]);
    });
  });
});
