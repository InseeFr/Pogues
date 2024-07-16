import { describe, expect, it } from 'vitest';
import { remoteToStore, storeToRemote } from './external-variable';

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
        typeName: 'TEXT',
        MaxLength: 'maxLength',
        Pattern: 'pattern',
        Minimum: 'minimum',
        Maximum: 'maximum',
        Decimals: 'decimals',
        Unit: 'unit',
        Format: 'format',
      },
    },
    {
      id: '2',
      Name: 'Name 2',
      Label: 'Label 2',
      type: 'ExternalVariableType',
      Datatype: {
        type: 'TextDatatypeType',
        typeName: 'TEXT',
        MaxLength: 'maxLength',
        Pattern: 'pattern',
        Minimum: 'minimum',
        Maximum: 'maximum',
        Decimals: 'decimals',
        Unit: 'unit',
        Format: 'format',
      },
    },
  ];
  const state = {
    1: {
      id: '1',
      name: 'Name 1',
      label: 'Label 1',
      type: 'TEXT',
      scope: 'jqqchose',
      TEXT: {
        maxLength: 'maxLength',
        pattern: 'pattern',
        minimum: 'minimum',
        maximum: 'maximum',
        decimals: 'decimals',
        unit: 'unit',
        format: 'format',
      },
    },
    2: {
      id: '2',
      name: 'Name 2',
      label: 'Label 2',
      type: 'TEXT',
      scope: '',
      TEXT: {
        maxLength: 'maxLength',
        pattern: 'pattern',
        minimum: 'minimum',
        maximum: 'maximum',
        decimals: 'decimals',
        unit: 'unit',
        format: 'format',
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
