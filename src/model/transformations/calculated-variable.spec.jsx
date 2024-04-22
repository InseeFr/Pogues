import { remoteToStore, storeToRemote } from './calculated-variable';

import {
  DATATYPE_NAME,
  VARIABLES_TYPES,
} from '../../constants/pogues-constants';

const { TEXT } = DATATYPE_NAME;

const { CALCULATED } = VARIABLES_TYPES;

describe('calculated variables tranformations', () => {
  describe('remoteToStore', () => {
    test('should reduce all variables in an object', () => {
      const remote = [
        {
          id: '1',
          Label: 'label 1',
          Name: 'name 1',
          Formula: 'formula 1',
          Datatype: {
            MaxLength: 2,
            Pattern: '',
            Minimum: '',
            Maximum: '',
            Decimals: '',
            Unit: '',
            Format: '',
            type: 'TextDatatypeType',
            typeName: TEXT,
          },
        },
        {
          id: '2',
          Label: 'label 2',
          Name: 'name 2',
          Formula: 'formula 2',
          Scope: 'jbcggtca',
          Datatype: {
            MaxLength: 2,
            Pattern: '',
            Minimum: '',
            Maximum: '',
            Decimals: '',
            Unit: '',
            Format: '',
            type: 'TextDatatypeType',
            typeName: TEXT,
          },
        },
        {
          id: '3',
          Label: 'label 3',
          Name: 'name 3',
          Formula: 'formula 3',
          Datatype: {
            MaxLength: 3,
            Pattern: '',
            Minimum: '',
            Maximum: '',
            Decimals: '',
            Unit: '',
            Format: '',
            type: 'TextDatatypeType',
            typeName: TEXT,
          },
        },
      ];

      expect(remoteToStore(remote)).toEqual({
        1: {
          id: '1',
          label: 'label 1',
          name: 'name 1',
          formula: 'formula 1',
          scope: '',
          type: TEXT,
          [TEXT]: {
            maxLength: 2,
            pattern: '',
            minimum: '',
            maximum: '',
            decimals: '',
            unit: '',
            format: '',
          },
        },
        2: {
          id: '2',
          label: 'label 2',
          name: 'name 2',
          formula: 'formula 2',
          scope: 'jbcggtca',
          type: TEXT,
          [TEXT]: {
            maxLength: 2,
            pattern: '',
            minimum: '',
            maximum: '',
            decimals: '',
            unit: '',
            format: '',
          },
        },
        3: {
          id: '3',
          label: 'label 3',
          name: 'name 3',
          formula: 'formula 3',
          scope: '',
          type: TEXT,
          [TEXT]: {
            maxLength: 3,
            pattern: '',
            minimum: '',
            maximum: '',
            decimals: '',
            unit: '',
            format: '',
          },
        },
      });
    });
    test('should generate an ID', () => {
      const remote = [
        {
          Label: 'label 1',
          Name: 'name 1',
          Formula: 'formula 1',
          Datatype: {
            MaxLength: 3,
            Pattern: '',
            Minimum: '',
            Maximum: '',
            Decimals: '',
            Unit: '',
            Format: '',
            type: 'TextDatatypeType',
            typeName: TEXT,
          },
        },
        {
          Label: 'label 2',
          Name: 'name 2',
          Formula: 'formula 2',
          Datatype: {
            MaxLength: 3,
            Pattern: '',
            Minimum: '',
            Maximum: '',
            Decimals: '',
            Unit: '',
            Format: '',
            type: 'TextDatatypeType',
            typeName: TEXT,
          },
        },
        {
          Label: 'label 3',
          Name: 'name 3',
          Formula: 'formula 3',
          Datatype: {
            MaxLength: 3,
            Pattern: '',
            Minimum: '',
            Maximum: '',
            Decimals: '',
            Unit: '',
            Format: '',
            type: 'TextDatatypeType',
            typeName: TEXT,
          },
        },
      ];
      const result = remoteToStore(remote);
      Object.keys(result).forEach(key => expect(key).toBeDefined());
    });
  });
  describe('storeToRemote', () => {
    it('should return an array of collected variables', () => {
      const store = {
        1: {
          id: '1',
          label: 'label 1',
          name: 'name 1',
          formula: 'formula 1',
          type: TEXT,
          [TEXT]: { maxLength: 2 },
        },
        2: {
          id: '2',
          label: 'label 2',
          name: 'name 2',
          formula: 'formula 2',
          scope: 'jbcggtca',
          type: TEXT,
          [TEXT]: { maxLength: 2 },
        },
        3: {
          id: '3',
          label: 'label 3',
          name: 'name 3',
          formula: 'formula 3',
          type: TEXT,
          [TEXT]: { maxLength: 3 },
        },
      };

      expect(storeToRemote(store)).toEqual([
        {
          id: '1',
          Label: 'label 1',
          Name: 'name 1',
          Formula: 'formula 1',
          type: CALCULATED,
          Datatype: {
            MaxLength: 2,
            type: 'TextDatatypeType',
            typeName: TEXT,
          },
        },
        {
          id: '2',
          Label: 'label 2',
          Name: 'name 2',
          Formula: 'formula 2',
          type: CALCULATED,
          Scope: 'jbcggtca',
          Datatype: {
            MaxLength: 2,
            type: 'TextDatatypeType',
            typeName: TEXT,
          },
        },
        {
          id: '3',
          Label: 'label 3',
          Name: 'name 3',
          Formula: 'formula 3',
          type: CALCULATED,
          Datatype: {
            MaxLength: 3,
            type: 'TextDatatypeType',
            typeName: TEXT,
          },
        },
      ]);
    });
  });
});
