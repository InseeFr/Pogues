import { describe, expect, it, test } from 'vitest';
import { remoteToState, stateToRemote } from './declaration';

describe('declaration tranformations', () => {
  describe('remoteToStore', () => {
    test('should reduce all variables in an object', () => {
      const remote = [
        {
          id: '1',
          Text: 'label 1',
          declarationType: 'declarationType1',
          position: 1,
          DeclarationMode: ['CATI'],
        },
        {
          id: '2',
          Text: 'label 2',
          declarationType: 'declarationType2',
          position: 2,
          DeclarationMode: ['CATI'],
        },
        {
          id: '3',
          Text: 'label 3',
          declarationType: 'declarationType3',
          position: 3,
          DeclarationMode: ['CATI'],
        },
      ];

      expect(remoteToState(remote)).toEqual({
        1: {
          id: '1',
          label: 'label 1',
          declarationType: 'declarationType1',
          position: 1,
          TargetMode: ['CATI'],
        },
        2: {
          id: '2',
          label: 'label 2',
          declarationType: 'declarationType2',
          position: 2,
          TargetMode: ['CATI'],
        },
        3: {
          id: '3',
          label: 'label 3',
          declarationType: 'declarationType3',
          position: 3,
          TargetMode: ['CATI'],
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
        1: {
          id: '1',
          label: 'label 1',
          declarationType: 'declarationType1',
          position: 1,
          TargetMode: ['CAWI'],
        },
        2: {
          id: '2',
          label: 'label 2',
          declarationType: 'declarationType2',
          position: 2,
          TargetMode: [],
        },
        3: {
          id: '3',
          label: 'label 3',
          declarationType: 'declarationType3',
          position: 3,
          TargetMode: [],
        },
      };

      expect(stateToRemote(store)).toEqual([
        {
          id: '1',
          Text: 'label 1',
          declarationType: 'declarationType1',
          position: 1,
          DeclarationMode: ['CAWI'],
        },
        {
          id: '2',
          Text: 'label 2',
          declarationType: 'declarationType2',
          position: 2,
          DeclarationMode: [],
        },
        {
          id: '3',
          Text: 'label 3',
          declarationType: 'declarationType3',
          position: 3,
          DeclarationMode: [],
        },
      ]);
    });
  });
});
