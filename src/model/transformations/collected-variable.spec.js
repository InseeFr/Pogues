import {
  remoteToStore,
  remoteToComponentState,
  storeToRemote,
} from './collected-variable';
import { DATATYPE_NAME } from 'constants/pogues-constants';

const { TEXT, DURATION, DATE } = DATATYPE_NAME;

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
            Pattern: 'pattern',
          },
        },
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
            unit: undefined,
            format: undefined,
          },
        },
      };
      expect(remoteToStore(input, responsesByVariable, codesListStore)).toEqual(
        output,
      );
    });

    test('should return miyears, mimonths, mayears, and mamonths from minimum and maximum to the store representation of a collected variable', () => {
      const input = [
        {
          id: 'k23boas9',
          Name: 'QWSS',
          Label: 'QWSS label',
          type: 'CollectedVariableType',
          CodeListReference: 'id',
          Datatype: {
            typeName: DURATION,            
            Format: "PnYnM",
            Maximum: "P1Y1M",
            Minimum: "P1Y1M",
          },
        },
      ];
      const responsesByVariable = { k23boas9: {} };
      const codesListStore = { id: { label: 'label' } };
      const output = {
        k23boas9: {
          id: 'k23boas9',
          label: 'QWSS label',
          name: 'QWSS',
          type: DURATION,
          codeListReference: 'id',
          codeListReferenceLabel: 'label',
          [DURATION]: {
            format: "PnYnM",
            mamonths: "1",
            maximum: "P1Y1M",
            mayears: "1",
            mimonths: "1",
            minimum: "P1Y1M",
            miyears: "1",
          },
        },
      };
      expect(remoteToStore(input, responsesByVariable, codesListStore)).toEqual(
        output,
      );
    });

    test('should return maminutes = "" if type name Duration and format PTnHnM and miminutes = 0 to the store representation of a collected variable', () => {
      const input = [
        {
          id: 'k23bk67e',
          Name: 'AQS',
          Label: 'AQS label',
          type: 'CollectedVariableType',
          CodeListReference: 'id',
          Datatype: {
            Format: "PTnHnM",
            Maximum: "PT2H2M",
            Minimum: "PT2H0M",
            type: "DurationDatatypeType",
            typeName: DURATION,
          },
        },
      ];
      const responsesByVariable = { k23bk67e: {} };
      const codesListStore = { id: { label: 'label' } };
      const output = {
        k23bk67e: {
          id: 'k23bk67e',
          label: 'AQS label',
          name: 'AQS',
          type: DURATION,
          codeListReference: 'id',
          codeListReferenceLabel: 'label',
          [DURATION]: {
            format: "PTnHnM",
            mahours: "2",
            maminutes: "2",
            maximum: "PT2H2M",
            mihours: "2",
            miminutes: "",
            minimum: "PT2H0M",
          },
        },
      };
      expect(remoteToStore(input, responsesByVariable, codesListStore)).toEqual(
        output,
      );
    });
    test('should return mihundredths = "00" if type name Duration and format HH:CH and mihundredths = 0 to the store representation of a collected variable', () => {
      const input = [
        {
          id: 'k23bk67e',
          Name: 'AQS',
          Label: 'AQS label',
          type: 'CollectedVariableType',
          CodeListReference: 'id',
          Datatype: {
            Format: "HH:CH",
            Maximum: "02:02",
            Minimum: "02:00",
            type: "DurationDatatypeType",
            typeName: DURATION,
          },
        },
      ];
      const responsesByVariable = { k23bk67e: {} };
      const codesListStore = { id: { label: 'label' } };
      const output = {
        k23bk67e: {
          id: 'k23bk67e',
          label: 'AQS label',
          name: 'AQS',
          type: DURATION,
          codeListReference: 'id',
          codeListReferenceLabel: 'label',
          [DURATION]: {
            format: "HH:CH",
            mahundhours: "02",
            mahundredths: "02",
            maximum: "02:02",
            mihundhours: "02",
            mihundredths: "00",
            minimum: "02:00",
          },
        },
      };
      expect(remoteToStore(input, responsesByVariable, codesListStore)).toEqual(
        output,
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
            typeName: 'TEXT',
          },

          id: 'jbgd6m6e',
          mandatory: false,
        },
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
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: undefined,
            mamonths: undefined,
            mihours: undefined,
            miminutes: undefined,
            mihundhours: undefined,
            mihundredths: undefined,
            mahours: undefined,
            maminutes: undefined,
            mahundhours: undefined,
            mahundredths: undefined,
          },
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: 'A label',
          Name: 'A',
          id: 'jdww2n76',
          type: 'CollectedVariableType',
          Datatype: {
            type: 'TextDatatypeType',
            typeName: TEXT,
            MaxLength: 100,
            Pattern: 'pattern',
          },
        },
      ];
      expect(storeToRemote(input)).toEqual(output);
    });

    test('should remove the minimum and maximum in collected variable model if type is DATE', () => {
      const input = {
        k23cdv5w: {
          id: "k23cdv5w",
          label: "A label",
          name: "A",
          x: undefined,
          y: undefined,
          type: DATE,
          [DATE]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: "yyyy",
            minimum: "2090",
            maximum: '',
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: undefined,
            mamonths: undefined,
            mihours: undefined,
            miminutes: undefined,
            mihundhours: undefined,
            mihundredths: undefined,
            mahours: undefined,
            maminutes: undefined,
            mahundhours: undefined,
            mahundredths: undefined,
          },
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: "A label",
          Name: "A",
          id: "k23cdv5w",
          type: 'CollectedVariableType',
          Datatype: {
            Format: "YYYY",
            Minimum: "2090",
            type: "DateDatatypeType",
            typeName: DATE,
          },
        },
      ];
      expect(storeToRemote(input)).toEqual(output);
    });

    test('should return collected variable model if type is DURATION and the HH:CH format', () => {
      const input = {
        k23bk67e: {
          id: "k23bk67e",
          label: "AQS label",
          name: "AQS",
          x: undefined,
          y: undefined,
          type: DURATION,
          [DURATION]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: "HH:CH",
            minimum: undefined,
            maximum: undefined,
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: undefined,
            mamonths: undefined,
            mihours: undefined,
            miminutes: undefined,
            mihundhours: 2,
            mihundredths: 2,
            mahours: undefined,
            maminutes: undefined,
            mahundhours: 3,
            mahundredths: 0,
          },
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: "AQS label",
          Name: "AQS",
          id: "k23bk67e",
          type: 'CollectedVariableType',
          Datatype: {
            Format: "HH:CH",
            Maximum: "03:00",
            Minimum: "02:02",
            type: "DurationDatatypeType",
            typeName: DURATION,
          },
        },
      ];
      expect(storeToRemote(input)).toEqual(output);
    });

    test('should return collected variable model if type is DURATION and the PTnHnM format', () => {
      const input = {
        k23bk67e: {
          id: "k23bk67e",
          label: "AQS label",
          name: "AQS",
          x: undefined,
          y: undefined,
          type: DURATION,
          [DURATION]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: "PTnHnM",
            minimum: undefined,
            maximum: undefined,
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: undefined,
            mamonths: undefined,
            mihours: 2,
            miminutes: "",
            mihundhours: undefined,
            mihundredths: undefined,
            mahours: 2,
            maminutes: 2,
            mahundhours: undefined,
            mahundredths: undefined,
          },
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: "AQS label",
          Name: "AQS",
          id: "k23bk67e",
          type: 'CollectedVariableType',
          Datatype: {
            Format: "PTnHnM",
            Maximum: "PT2H2M",
            Minimum: "PT2H0M",
            type: "DurationDatatypeType",
            typeName: DURATION,
          },
        },
      ];
      expect(storeToRemote(input)).toEqual(output);
    });

    test('should return collected variable model if type is DURATION and the PnYnM format', () => {
      const input = {
        k23boas9: {
          id: "k23boas9",
          label: "QWSS label",
          name: "QWSS",
          x: undefined,
          y: undefined,
          type: DURATION,
          [DURATION]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: "PnYnM",
            minimum: undefined,
            maximum: undefined,
            unit: undefined,
            miyears: 1,
            mimonths: 1,
            mayears: 1,
            mamonths: 1,
            mihours: undefined,
            miminutes: undefined,
            mihundhours: undefined,
            mihundredths: undefined,
            mahours: undefined,
            maminutes: undefined,
            mahundhours: undefined,
            mahundredths: undefined,
          },
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: "QWSS label",
          Name: "QWSS",
          id: "k23boas9",
          type: 'CollectedVariableType',
          Datatype: {
            Format: "PnYnM",
            Maximum: "P1Y1M",
            Minimum: "P1Y1M",
            type: "DurationDatatypeType",
            typeName: DURATION,
          },
        },
      ];
      expect(storeToRemote(input)).toEqual(output);
    });

    test('should not return minimum in collected variable model if type is DURATION and the PnYnM format and miyears and mimonths undefined', () => {
      const input = {
        k23boas9: {
          id: "k23boas9",
          label: "QWSS label",
          name: "QWSS",
          x: undefined,
          y: undefined,
          type: DURATION,
          [DURATION]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: "PnYnM",
            minimum: undefined,
            maximum: undefined,
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: 1,
            mamonths: 1,
            mihours: undefined,
            miminutes: undefined,
            mihundhours: undefined,
            mihundredths: undefined,
            mahours: undefined,
            maminutes: undefined,
            mahundhours: undefined,
            mahundredths: undefined,
          },
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: "QWSS label",
          Name: "QWSS",
          id: "k23boas9",
          type: 'CollectedVariableType',
          Datatype: {
            Format: "PnYnM",
            Maximum: "P1Y1M",
            type: "DurationDatatypeType",
            typeName: DURATION,
          },
        },
      ];
      expect(storeToRemote(input)).toEqual(output);
    });

    test('should not return Maximum collected variable model if type is DURATION and the PTnHnM format and mahours and maminutes undefined', () => {
      const input = {
        k23bk67e: {
          id: "k23bk67e",
          label: "AQS label",
          name: "AQS",
          x: undefined,
          y: undefined,
          type: DURATION,
          [DURATION]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: "PTnHnM",
            minimum: undefined,
            maximum: undefined,
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: undefined,
            mamonths: undefined,
            mihours: 2,
            miminutes: 1,
            mihundhours: undefined,
            mihundredths: undefined,
            mahours: undefined,
            maminutes: undefined,
            mahundhours: undefined,
            mahundredths: undefined,
          },
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: "AQS label",
          Name: "AQS",
          id: "k23bk67e",
          type: 'CollectedVariableType',
          Datatype: {
            Format: "PTnHnM",
            Minimum: "PT2H1M",
            type: "DurationDatatypeType",
            typeName: DURATION,
          },
        },
      ];
      expect(storeToRemote(input)).toEqual(output);
    });
    test('should not return Maximum collected variable model if type is DURATION and the HH:CH format and mahundhours and mahundredths are undefined', () => {
      const input = {
        k23bk67e: {
          id: "k23bk67e",
          label: "AQS label",
          name: "AQS",
          x: undefined,
          y: undefined,
          type: DURATION,
          [DURATION]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: "HH:CH",
            minimum: undefined,
            maximum: undefined,
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: undefined,
            mamonths: undefined,
            mihours: undefined,
            miminutes: undefined,
            mihundhours: 0,
            mihundredths: 3,
            mahours: undefined,
            maminutes: undefined,
            mahundhours: undefined,
            mahundredths: undefined,
          },
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: "AQS label",
          Name: "AQS",
          id: "k23bk67e",
          type: 'CollectedVariableType',
          Datatype: {
            Format: "HH:CH",
            Minimum: "00:03",
            type: "DurationDatatypeType",
            typeName: DURATION,
          },
        },
      ];
      expect(storeToRemote(input)).toEqual(output);
    });
    test('should not return Minimum collected variable model if type is DURATION and the HH:CH format and mihundhours and mihundredths are undefined', () => {
      const input = {
        k23bk67e: {
          id: "k23bk67e",
          label: "AQS label",
          name: "AQS",
          x: undefined,
          y: undefined,
          type: DURATION,
          [DURATION]: {
            decimals: undefined,
            maxLength: undefined,
            pattern: undefined,
            format: "HH:CH",
            minimum: undefined,
            maximum: undefined,
            unit: undefined,
            miyears: undefined,
            mimonths: undefined,
            mayears: undefined,
            mamonths: undefined,
            mihours: undefined,
            miminutes: undefined,
            mihundhours: undefined,
            mihundredths: undefined,
            mahours: undefined,
            maminutes: undefined,
            mahundhours: 0,
            mahundredths: 2,
          },
        },
      };
      const output = [
        {
          CodeListReference: undefined,
          Label: "AQS label",
          Name: "AQS",
          id: "k23bk67e",
          type: 'CollectedVariableType',
          Datatype: {
            Format: "HH:CH",
            Maximum: "00:02",
            type: "DurationDatatypeType",
            typeName: DURATION,
          },
        },
      ];
      expect(storeToRemote(input)).toEqual(output);
    });
  });
});
