import {
  remoteToStore,
  remoteToComponentState,
  storeToRemote
} from './collected-variable';

describe('collected variable tranformations', () => {
  describe('remoteToStore', () => {
    test('should return the store representation of a collected variable', () => {
      const input = [
        {
          id: 'jdww2n76',
          Name: 'A',
          Label: 'A label',
          type: 'CollectedVariableType'
        }
      ];
      const responsesByVariable = { jdww2n76: {} };
      const output = {
        jdww2n76: {
          id: 'jdww2n76',
          label: 'A label',
          name: 'A'
        }
      };
      expect(remoteToStore(input, responsesByVariable)).toEqual(output);
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
          y: undefined
        }
      };
      const output = [
        {
          Label: 'A label',
          Name: 'A',
          id: 'jdww2n76',
          type: 'CollectedVariableType'
        }
      ];
      expect(storeToRemote(input)).toEqual(output);
    });
  });
});
