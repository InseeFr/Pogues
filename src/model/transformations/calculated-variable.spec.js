import {
  stateToRemote,
  remoteToStore,
  storeToRemote
} from './calculated-variable';

import { VARIABLES_TYPES } from 'constants/pogues-constants';

const { CALCULATED } = VARIABLES_TYPES;

describe('calculated variables tranformations', () => {
  describe('remoteToStore', () => {
    test('should reduce all variables in an object', () => {
      const remote = [
        { id: '1', Label: 'label 1', Name: 'name 1', Formula: 'formula 1' },
        { id: '2', Label: 'label 2', Name: 'name 2', Formula: 'formula 2' },
        { id: '3', Label: 'label 3', Name: 'name 3', Formula: 'formula 3' }
      ];

      expect(remoteToStore(remote)).toEqual({
        '1': {
          id: '1',
          label: 'label 1',
          name: 'name 1',
          formula: 'formula 1'
        },
        '2': {
          id: '2',
          label: 'label 2',
          name: 'name 2',
          formula: 'formula 2'
        },
        '3': { id: '3', label: 'label 3', name: 'name 3', formula: 'formula 3' }
      });
    });
    test('should generate an ID', () => {
      const remote = [
        { Label: 'label 1', Name: 'name 1', Formula: 'formula 1' },
        { Label: 'label 2', Name: 'name 2', Formula: 'formula 2' },
        { Label: 'label 3', Name: 'name 3', Formula: 'formula 3' }
      ];
      const result = remoteToStore(remote);
      Object.keys(result).forEach(key => expect(key).toBeDefined());
    });
  });
  describe('storeToRemote', () => {
    it('should return an array of collected variables', () => {
      const store = {
        '1': {
          id: '1',
          label: 'label 1',
          name: 'name 1',
          formula: 'formula 1'
        },
        '2': {
          id: '2',
          label: 'label 2',
          name: 'name 2',
          formula: 'formula 2'
        },
        '3': { id: '3', label: 'label 3', name: 'name 3', formula: 'formula 3' }
      };

      expect(storeToRemote(store)).toEqual([
        {
          id: '1',
          Label: 'label 1',
          Name: 'name 1',
          Formula: 'formula 1',
          type: CALCULATED
        },
        {
          id: '2',
          Label: 'label 2',
          Name: 'name 2',
          Formula: 'formula 2',
          type: CALCULATED
        },
        {
          id: '3',
          Label: 'label 3',
          Name: 'name 3',
          Formula: 'formula 3',
          type: CALCULATED
        }
      ]);
    });
  });
});
