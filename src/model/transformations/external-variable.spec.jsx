import { describe, expect, it } from 'vitest';

import { DATATYPE_NAME } from '../../constants/pogues-constants';
import { remoteToStore, storeToRemote } from './external-variable';

const { TEXT, NUMERIC } = DATATYPE_NAME;

describe('external variable transformation', () => {
  const remote = [
    {
      id: '1',
      Name: 'Name 1',
      Label: 'Label 1',
      type: 'ExternalVariableType',
      Scope: 'jqqchose',
      Datatype: {
        type: 'TextDatatypeType',
        typeName: TEXT,
        MaxLength: 'maxLength',
        Pattern: 'pattern',
      },
    },
    {
      id: '2',
      Name: 'Name 2',
      Label: 'Label 2',
      type: 'ExternalVariableType',
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
      Name: 'Name 3',
      Label: 'Label 3',
      type: 'ExternalVariableType',
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
  const state = {
    1: {
      id: '1',
      name: 'Name 1',
      label: 'Label 1',
      type: TEXT,
      scope: 'jqqchose',
      [TEXT]: {
        maxLength: 'maxLength',
        pattern: 'pattern',
      },
    },
    2: {
      id: '2',
      name: 'Name 2',
      label: 'Label 2',
      type: NUMERIC,
      scope: '',
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
      name: 'Name 3',
      label: 'Label 3',
      type: NUMERIC,
      scope: '',
      [NUMERIC]: {
        minimum: '1',
        maximum: '10',
        decimals: '2',
        isDynamicUnit: true,
        unit: 'my formula',
      },
    },
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
