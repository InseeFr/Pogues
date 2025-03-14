import { describe, expect, it, test } from 'vitest';

import {
  DATATYPE_NAME,
  VARIABLES_TYPES,
} from '../../constants/pogues-constants';
import { remoteToStore, storeToRemote } from './calculated-variable';

const { TEXT, NUMERIC } = DATATYPE_NAME;

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
            Minimum: '1',
            Maximum: '10',
            Decimals: '',
            IsDynamicUnit: false,
            Unit: 'euro',
            type: 'NumericDatatypeType',
            typeName: NUMERIC,
          },
        },
        {
          id: '3',
          Label: 'label 3',
          Name: 'name 3',
          Formula: 'formula 3',
          Datatype: {
            Minimum: '1',
            Maximum: '10',
            Decimals: '2',
            IsDynamicUnit: true,
            Unit: 'my formula',
            type: 'NumericDatatypeType',
            typeName: NUMERIC,
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
          },
        },
        2: {
          id: '2',
          label: 'label 2',
          name: 'name 2',
          formula: 'formula 2',
          scope: 'jbcggtca',
          type: NUMERIC,
          [NUMERIC]: {
            minimum: '1',
            maximum: '10',
            decimals: '',
            isDynamicUnit: false,
            unit: 'euro',
          },
        },
        3: {
          id: '3',
          label: 'label 3',
          name: 'name 3',
          formula: 'formula 3',
          scope: '',
          type: NUMERIC,
          [NUMERIC]: {
            minimum: '1',
            maximum: '10',
            decimals: '2',
            isDynamicUnit: true,
            unit: 'my formula',
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
            Minimum: '1',
            Maximum: '10',
            Decimals: '',
            IsDynamicUnit: false,
            Unit: 'euro',
            type: 'NumericDatatypeType',
            typeName: NUMERIC,
          },
        },
        {
          Label: 'label 3',
          Name: 'name 3',
          Formula: 'formula 3',
          Datatype: {
            Minimum: '1',
            Maximum: '10',
            Decimals: '2',
            IsDynamicUnit: true,
            Unit: 'my formula',
            type: 'NumericDatatypeType',
            typeName: NUMERIC,
          },
        },
      ];
      const result = remoteToStore(remote);
      Object.keys(result).forEach((key) => expect(key).toBeDefined());
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
          type: NUMERIC,
          [NUMERIC]: {
            minimum: '1',
            maximum: '10',
            decimals: '',
            isDynamicUnit: false,
            unit: 'euro',
          },
        },
        3: {
          id: '3',
          label: 'label 3',
          name: 'name 3',
          formula: 'formula 3',
          type: NUMERIC,
          [NUMERIC]: {
            minimum: '1',
            maximum: '10',
            decimals: '2',
            isDynamicUnit: true,
            unit: 'my formula',
          },
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
            Minimum: '1',
            Maximum: '10',
            Decimals: '',
            IsDynamicUnit: false,
            Unit: 'euro',
            type: 'NumericDatatypeType',
            typeName: NUMERIC,
          },
        },
        {
          id: '3',
          Label: 'label 3',
          Name: 'name 3',
          Formula: 'formula 3',
          type: CALCULATED,
          Datatype: {
            Minimum: '1',
            Maximum: '10',
            Decimals: '2',
            IsDynamicUnit: true,
            Unit: 'my formula',
            type: 'NumericDatatypeType',
            typeName: NUMERIC,
          },
        },
      ]);
    });
  });
});
