import {
  remoteToStore,
  remoteToComponentState,
  storeToRemote
} from './collected-variable';
import { DATATYPE_NAME } from 'constants/pogues-constants';

const { TEXT } = DATATYPE_NAME;

describe('collected variable tranformations', () => {
  describe('remoteToStore', () => {
    test('should return the store representation of a collected variable', () => {
      const input = [
        {
          id: 'jdww2n76',
          Name: 'A',
          Label: 'A label',
          type: 'CollectedVariableType',
          CodeListReference: 'id',
          Datatype: {
            typeName: TEXT,
            MaxLength: 100,
            Pattern: 'pattern'
          }
        }
      ];
      const responsesByVariable = { jdww2n76: {} };
      const codesListStore = { id: { label: 'label' } };
      const output = {
        jdww2n76: {
          id: 'jdww2n76',
          label: 'A label',
          name: 'A',
          type: TEXT,
          codeListReference: 'id',
          codeListReferenceLabel: 'label',
          [TEXT]: {
            decimals: undefined,
            maxLength: 100,
            pattern: 'pattern',
            maximum: undefined,
            minimum: undefined,
            unit: undefined
          }
        }
      };
      expect(remoteToStore(input, responsesByVariable, codesListStore)).toEqual(
        output
      );
    });
  });
  describe('remoteToComponentState', () => {
    test('should return the state representation of a collected variable', () => {
      const input = [
        {
          CollectedVariableReference: 'jbcggt4x',
          Datatype: {
            MaxLength: 255,
            Pattern: '',
            type: 'TextDatatypeType',
            typeName: 'TEXT'
          },

          id: 'jbgd6m6e',
          mandatory: false
        }
      ];
      const output = ['jbcggt4x'];
      expect(remoteToComponentState(input)).toEqual(output);
    });
  });
  describe('storeToRemote', () => {
    test('should return the remote representation of a collected variable', () => {
      const input = {
        jdww2n76: {
          id: 'jdww2n76',
          label: 'A label',
          name: 'A',
          x: undefined,
          y: undefined,
          type: TEXT,
          [TEXT]: {
            decimals: undefined,
            maxLength: 100,
            pattern: 'pattern',
            maximum: undefined,
            minimum: undefined,
            unit: undefined
          }
        }
      };
      const output = [
        {
          Label: 'A label',
          Name: 'A',
          id: 'jdww2n76',
          type: 'CollectedVariableType',
          Datatype: {
            type: 'TextDatatypeType',
            typeName: TEXT,
            MaxLength: 100,
            Pattern: 'pattern'
          }
        }
      ];
      expect(storeToRemote(input)).toEqual(output);
    });
  });
});
