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
            mahours: undefined,
            maminutes: undefined,
          },
        },
      };
     const input1 = {
        kapgzmji: {
          TargetMode: ["CAWI", "PAPI"],
          children: [],
          collectedVariables: ["kaphc2ly"],
          controls: {},
          declarations: {},
          id: "kapgzmji",
          label: "question1",
          name: "QUESTION1",
          pageBreak: false,
          parent: "kaph7dbh",
          redirections: {},
          responseFormat: {
            type: "SIMPLE",
            SIMPLE: 
              {
              TEXT: {maxLength: 255, pattern: ""},
              id: "kaph6l3y",
              mandatory: false,
              type: "TEXT"
              }
           },
          responsesClarification: undefined,
          type: "QUESTION",
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ["CAWI", "PAPI"],
          children: ["kapgzmji", "kaphg7pd"],
          controls: {},
          declarations: {},
          id: "kaph7dbh",
          label: "sequence1",
          name: "SEQUENCE1",
          pageBreak: false,
          parent: "kaphhxpd",
          redirections: {},
          responsesClarification: undefined,
          type: "SEQUENCE",
          weight: 0,
        },
      }
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
      expect(storeToRemote(input, input1)).toEqual(output);
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
            mahours: undefined,
            maminutes: undefined,
          },
        },
      };
      const input1 = {
        kapgzmji: {
          TargetMode: ["CAWI", "PAPI"],
          children: [],
          collectedVariables: ["kaphc2ly"],
          controls: {},
          declarations: {},
          id: "kapgzmji",
          label: "question1",
          name: "QUESTION1",
          pageBreak: false,
          parent: "kaph7dbh",
          redirections: {},
          responseFormat: {
            type: "SIMPLE",
            SIMPLE: 
              {
              TEXT: {maxLength: 255, pattern: ""},
              id: "kaph6l3y",
              mandatory: false,
              type: "TEXT"
              }
           },
          responsesClarification: undefined,
          type: "QUESTION",
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ["CAWI", "PAPI"],
          children: ["kapgzmji", "kaphg7pd"],
          controls: {},
          declarations: {},
          id: "kaph7dbh",
          label: "sequence1",
          name: "SEQUENCE1",
          pageBreak: false,
          parent: "kaphhxpd",
          redirections: {},
          responsesClarification: undefined,
          type: "SEQUENCE",
          weight: 0,
        },
      }
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
      expect(storeToRemote(input, input1)).toEqual(output);
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
            mahours: 2,
            maminutes: 2,
          },
        },
      };
      const input1 = {
        kapgzmji: {
          TargetMode: ["CAWI", "PAPI"],
          children: [],
          collectedVariables: ["kaphc2ly"],
          controls: {},
          declarations: {},
          id: "kapgzmji",
          label: "question1",
          name: "QUESTION1",
          pageBreak: false,
          parent: "kaph7dbh",
          redirections: {},
          responseFormat: {
            type: "SIMPLE",
            SIMPLE: 
              {
              TEXT: {maxLength: 255, pattern: ""},
              id: "kaph6l3y",
              mandatory: false,
              type: "TEXT"
              }
           },
          responsesClarification: undefined,
          type: "QUESTION",
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ["CAWI", "PAPI"],
          children: ["kapgzmji", "kaphg7pd"],
          controls: {},
          declarations: {},
          id: "kaph7dbh",
          label: "sequence1",
          name: "SEQUENCE1",
          pageBreak: false,
          parent: "kaphhxpd",
          redirections: {},
          responsesClarification: undefined,
          type: "SEQUENCE",
          weight: 0,
        },
      }
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
      expect(storeToRemote(input, input1)).toEqual(output);
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
            mahours: undefined,
            maminutes: undefined,
          },
        },
      };
      const input1 = {
        kapgzmji: {
          TargetMode: ["CAWI", "PAPI"],
          children: [],
          collectedVariables: ["kaphc2ly"],
          controls: {},
          declarations: {},
          id: "kapgzmji",
          label: "question1",
          name: "QUESTION1",
          pageBreak: false,
          parent: "kaph7dbh",
          redirections: {},
          responseFormat: {
            type: "SIMPLE",
            SIMPLE: 
              {
              TEXT: {maxLength: 255, pattern: ""},
              id: "kaph6l3y",
              mandatory: false,
              type: "TEXT"
              }
           },
          responsesClarification: undefined,
          type: "QUESTION",
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ["CAWI", "PAPI"],
          children: ["kapgzmji", "kaphg7pd"],
          controls: {},
          declarations: {},
          id: "kaph7dbh",
          label: "sequence1",
          name: "SEQUENCE1",
          pageBreak: false,
          parent: "kaphhxpd",
          redirections: {},
          responsesClarification: undefined,
          type: "SEQUENCE",
          weight: 0,
        },
      }
      
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
      expect(storeToRemote(input, input1)).toEqual(output);
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
            mahours: undefined,
            maminutes: undefined,
          },
        },
      };
      const input1 = {
        kapgzmji: {
          TargetMode: ["CAWI", "PAPI"],
          children: [],
          collectedVariables: ["kaphc2ly"],
          controls: {},
          declarations: {},
          id: "kapgzmji",
          label: "question1",
          name: "QUESTION1",
          pageBreak: false,
          parent: "kaph7dbh",
          redirections: {},
          responseFormat: {
            type: "SIMPLE",
            SIMPLE: 
              {
              TEXT: {maxLength: 255, pattern: ""},
              id: "kaph6l3y",
              mandatory: false,
              type: "TEXT"
              }
           },
          responsesClarification: undefined,
          type: "QUESTION",
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ["CAWI", "PAPI"],
          children: ["kapgzmji", "kaphg7pd"],
          controls: {},
          declarations: {},
          id: "kaph7dbh",
          label: "sequence1",
          name: "SEQUENCE1",
          pageBreak: false,
          parent: "kaphhxpd",
          redirections: {},
          responsesClarification: undefined,
          type: "SEQUENCE",
          weight: 0,
        },
      }
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
      expect(storeToRemote(input, input1)).toEqual(output);
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
            mahours: undefined,
            maminutes: undefined,
          },
        },
      };

      const input1 = {
        kapgzmji: {
          TargetMode: ["CAWI", "PAPI"],
          children: [],
          collectedVariables: ["kaphc2ly"],
          controls: {},
          declarations: {},
          id: "kapgzmji",
          label: "question1",
          name: "QUESTION1",
          pageBreak: false,
          parent: "kaph7dbh",
          redirections: {},
          responseFormat: {
            type: "SIMPLE",
            SIMPLE: 
              {
              TEXT: {maxLength: 255, pattern: ""},
              id: "kaph6l3y",
              mandatory: false,
              type: "TEXT"
              }
           },
          responsesClarification: undefined,
          type: "QUESTION",
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ["CAWI", "PAPI"],
          children: ["kapgzmji", "kaphg7pd"],
          controls: {},
          declarations: {},
          id: "kaph7dbh",
          label: "sequence1",
          name: "SEQUENCE1",
          pageBreak: false,
          parent: "kaphhxpd",
          redirections: {},
          responsesClarification: undefined,
          type: "SEQUENCE",
          weight: 0,
        },
      }
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
      expect(storeToRemote(input, input1)).toEqual(output);
    });

    test('should not return Scoop collected variable model if there is LOOP', () => {
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
            mahours: undefined,
            maminutes: undefined,
          },
        },
      };
      const input1 = {
        kapgzmji: {
          TargetMode: ["CAWI", "PAPI"],
          children: [],
          collectedVariables: ["kaphc2ly"],
          controls: {},
          declarations: {},
          id: "kapgzmji",
          label: "question1",
          name: "QUESTION1",
          pageBreak: false,
          parent: "kaph7dbh",
          redirections: {},
          responseFormat: {
            type: "SIMPLE",
            SIMPLE: 
              {
              TEXT: {maxLength: 255, pattern: ""},
              id: "kaph6l3y",
              mandatory: false,
              type: "TEXT"
              }
           },
          responsesClarification: undefined,
          type: "QUESTION",
          weight: 0,
        },
        kaph7dbh: {
          TargetMode: ["CAWI", "PAPI"],
          children: ["kapgzmji", "kaphg7pd"],
          controls: {},
          declarations: {},
          id: "kaph7dbh",
          label: "sequence1",
          name: "SEQUENCE1",
          pageBreak: false,
          parent: "kaphhxpd",
          redirections: {},
          responsesClarification: undefined,
          type: "SEQUENCE",
          weight: 0,
        },
        kaph99on: {
          BasedOn: "",
          TargetMode: ["CAWI", "PAPI"],
          addButtonLibel: "",
          basedOn: "",
          children: [],
          collectedVariables: ["kaphgxz7"],
          controls: {},
          declarations: {},
          filter: "",
          finalMember: "",
          id: "kaph99on",
          initialMember: "",
          label: "test1",
          maximum: "",
          name: "TEST1",
          nameLoop: "",
          parent: "kaph699u",
          redirections: {},
          responseFormat: {
             type: "SIMPLE",
             SIMPLE: {
                  TEXT: {maxLength: 255, pattern: ""},
              id: undefined,
              mandatory: false,
              type: "TEXT",
             }
            },
          type: "QUESTION",
          weight: 0,
        },
        kaph699u: {
            BasedOn: "",
            TargetMode: ["CAWI", "PAPI"],
            addButtonLibel: "",
            basedOn: "",
            children: ["kaph99on"],
            collectedVariables: [],
            controls: {},
            declarations: {},
            filter: "",
            finalMember: "",
            id: "kaph699u",
            initialMember: "",
            label: "subsequence",
            maximum: "",
            name: "SUBSEQUENC",
            nameLoop: "",
            parent: "kaphlk90",
            redirections: {},
            responseFormat: {},
            type: "SUBSEQUENCE",
            weight: 0
        },
        kaphg7pd: {
            TargetMode: ["CAWI", "PAPI"],
            children: [],
            collectedVariables: ["kaphdzm1"],
            controls: {},
            declarations: {},
            id: "kaphg7pd",
            label: "question2",
            name: "QUESTION2",
            pageBreak: false,
            parent: "kaph7dbh",
            redirections: {},
            responseFormat: {
                type: "TABLE",
                TABLE: {
                      LIST_MEASURE: [
                       {
                        label: "sdd",
                        type: "SIMPLE",
                        SIMPLE: {
                                SIMPLE: {  
                                   id: undefined, 
                                   type: "TEXT",
                                   mandatory: undefined,
                                   TEXT: {
                                      maxLength: 255,
                                      pattern: ""
                                    }
                                  },
                                label: "sdd",
                                type: "SIMPLE"
                                }
                       },
                      ],
                      PRIMARY: {
                        LIST: {numLinesMin: 3, numLinesMax: 1},
                        type: "LIST"
                      },
                }
            },
            responsesClarification: [],
            type: "QUESTION",
            weight: 1,
        },
        kaphhxpd: {
              TargetMode: ["CAWI", "PAPI"],
              children: ["kaph7dbh", "kaphlk90"],
              controls: {},
              declarations: {},
              id: "kaphhxpd",
              label: "Loop",
              name: "LOOP",
              pageBreak: undefined,
              parent: "",
              redirections: {},
              responsesClarification: undefined,
              type: "QUESTIONNAIRE",
              weight: 0,
        },
        kaphlk90: {
              BasedOn: "",
              TargetMode: ["CAWI", "PAPI"],
              addButtonLibel: "",
              basedOn: "",
              children: ["kaph699u"],
              collectedVariables: [],
              controls: {},
              declarations: {},
              filter: "",
              finalMember: "",
              id: "kaphlk90",
              initialMember: "",
              label: "sequence2",
              maximum: "",
              name: "SEQUENCE2",
              nameLoop: "",
              parent: "kaphhxpd",
              redirections: {},
              responseFormat: {},
              type: "SEQUENCE",
              weight: 1,
        }
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
      expect(storeToRemote(input, input1)).toEqual(output);
    });
  });
});
