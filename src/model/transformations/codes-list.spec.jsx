import { describe, expect, test } from 'vitest';

import {
  remoteToCodesState,
  remoteToState,
  remoteToStore,
  storeToRemote,
} from './codes-list';

describe('codes list tranformations', () => {
  describe('remoteToCodesState', () => {
    test('should return the state representation of a codelist', () => {
      const input = [
        { Parent: '', Label: 'Frozen products', Value: 'A' },
        { Parent: 'A', Label: 'Ice creams', Value: 'A1' },
        { Parent: 'A', Label: 'Jasper Beardly', Value: 'A2' },
        { Parent: '', Label: 'Meat', Value: 'B' },
        { Parent: 'B', Label: 'Bacon', Value: 'B1' },
        { Parent: 'B', Label: 'Pork chop', Value: 'B2' },
        { Parent: 'B', Label: 'Chicken', Value: 'B3' },
        { Value: 'C', Label: 'Compote', Parent: '' },
        { Value: 'C1', Label: 'Powersauce', Parent: 'C' },
        { Parent: '', Label: 'Other', Value: 'D' },
      ];
      const output = {
        A: {
          value: 'A',
          label: 'Frozen products',
          parent: '',
          depth: 1,
          weight: 1,
        },
        A1: {
          value: 'A1',
          label: 'Ice creams',
          parent: 'A',
          depth: 2,
          weight: 1,
        },
        A2: {
          value: 'A2',
          label: 'Jasper Beardly',
          parent: 'A',
          depth: 2,
          weight: 2,
        },
        B: { value: 'B', label: 'Meat', parent: '', depth: 1, weight: 2 },
        B1: { value: 'B1', label: 'Bacon', parent: 'B', depth: 2, weight: 1 },
        B2: {
          value: 'B2',
          label: 'Pork chop',
          parent: 'B',
          depth: 2,
          weight: 2,
        },
        B3: { value: 'B3', label: 'Chicken', parent: 'B', depth: 2, weight: 3 },
        C: { value: 'C', label: 'Compote', parent: '', depth: 1, weight: 3 },
        C1: {
          value: 'C1',
          label: 'Powersauce',
          parent: 'C',
          depth: 2,
          weight: 1,
        },
        D: { value: 'D', label: 'Other', parent: '', depth: 1, weight: 4 },
      };
      expect(remoteToCodesState(input)).toEqual(output);
    });
  });

  describe('remoteToStore', () => {
    test('should return the correct store representation of a code list', () => {
      const input = [
        {
          Label: 'Products',
          id: 'j4nwh16i',
          Code: [
            { Parent: '', Label: 'Frozen products', Value: 'A' },
            { Parent: 'A', Label: 'Ice creams', Value: 'A1' },
            { Parent: 'A', Label: 'Jasper Beardly', Value: 'A2' },
            { Parent: '', Label: 'Meat', Value: 'B' },
            { Parent: 'B', Label: 'Bacon', Value: 'B1' },
            { Parent: 'B', Label: 'Pork chop', Value: 'B2' },
            { Parent: 'B', Label: 'Chicken', Value: 'B3' },
            { Value: 'C', Label: 'Compote', Parent: '' },
            { Value: 'C1', Label: 'Powersauce', Parent: 'C' },
            { Parent: '', Label: 'Other', Value: 'D' },
          ],
          Name: '',
        },
      ];

      const output = {
        j4nwh16i: {
          id: 'j4nwh16i',
          label: 'Products',
          codes: {
            A: {
              value: 'A',
              label: 'Frozen products',
              parent: '',
              depth: 1,
              weight: 1,
            },
            A1: {
              value: 'A1',
              label: 'Ice creams',
              parent: 'A',
              depth: 2,
              weight: 1,
            },
            A2: {
              value: 'A2',
              label: 'Jasper Beardly',
              parent: 'A',
              depth: 2,
              weight: 2,
            },
            B: { value: 'B', label: 'Meat', parent: '', depth: 1, weight: 2 },
            B1: {
              value: 'B1',
              label: 'Bacon',
              parent: 'B',
              depth: 2,
              weight: 1,
            },
            B2: {
              value: 'B2',
              label: 'Pork chop',
              parent: 'B',
              depth: 2,
              weight: 2,
            },
            B3: {
              value: 'B3',
              label: 'Chicken',
              parent: 'B',
              depth: 2,
              weight: 3,
            },
            C: {
              value: 'C',
              label: 'Compote',
              parent: '',
              depth: 1,
              weight: 3,
            },
            C1: {
              value: 'C1',
              label: 'Powersauce',
              parent: 'C',
              depth: 2,
              weight: 1,
            },
            D: { value: 'D', label: 'Other', parent: '', depth: 1, weight: 4 },
          },
          name: '',
        },
      };
      expect(remoteToStore(input)).toEqual(output);
    });
    test('should work with clarification', () => {
      const input = [
        {
          Label: 'Means of transport',
          id: 'j6p2kivg',
          Code: [
            { Parent: '', Label: 'Car', Value: '1' },
            { Parent: '', Label: 'Bike', Value: '2' },
            { Parent: '', Label: 'Skateboard', Value: '3' },
            { Parent: '', Label: 'Plane', Value: '4' },
          ],
          Name: '',
        },
        {
          Label: 'Country',
          id: 'jbdye1wa',
          Code: [
            { Parent: '', Label: 'Brazil', Value: '1' },
            { Parent: '', Label: 'Canada', Value: '2' },
            { Parent: '', Label: 'Japan', Value: '3' },
            { Parent: '', Label: 'France', Value: '4' },
            {
              Parent: '',
              Label: '[Other country](. "Included principalities")',
              Value: '5',
            },
            { Parent: '', Label: 'Other planet', Value: '6' },
          ],
          Name: '',
        },
      ];

      const clarification = [
        {
          responseclar: {
            id: 'k4e0h8vg',
            Name: 'clar-id-1',
            Label: 'Préciser :',
            Response: [
              {
                id: 'k4e0gjs8',
                Datatype: {
                  typeName: 'TEXT',
                  type: 'TextDatatypeType',
                  MaxLength: 249,
                },
                CollectedVariableReference: 'variable-id-1',
                mandatory: false,
              },
            ],
          },
          position: 2,
          codelistid: 'j6p2kivg',
          type: 'MULTIPLE_CHOICE',
        },
        {
          responseclar: {
            id: 'k4e0rr9w',
            Name: 'clar-id-2',
            Label: 'Préciser :',
            Response: [
              {
                id: 'k4e0gjs8',
                Datatype: {
                  typeName: 'TEXT',
                  type: 'TextDatatypeType',
                  MaxLength: '5',
                },
                CollectedVariableReference: 'variable-id-2',
                mandatory: false,
              },
            ],
          },
          position: '1',
          codelistid: 'jbdye1wa',
          type: 'SINGLE_CHOICE',
        },
      ];

      const output = {
        j6p2kivg: {
          id: 'j6p2kivg',
          label: 'Means of transport',
          codes: {
            1: { value: '1', label: 'Car', parent: '', depth: 1, weight: 1 },
            2: { value: '2', label: 'Bike', parent: '', depth: 1, weight: 2 },
            3: {
              value: '3',
              label: 'Skateboard',
              parent: '',
              depth: 1,
              weight: 3,
              precisionByCollectedVariableId: {
                'variable-id-1': {
                  precisionid: 'clar-id-1',
                  precisionlabel: 'Préciser :',
                  precisionsize: 249,
                },
              },
            },
            4: {
              value: '4',
              label: 'Plane',
              parent: '',
              depth: 1,
              weight: 4,
            },
          },
          name: '',
        },
        jbdye1wa: {
          id: 'jbdye1wa',
          label: 'Country',
          codes: {
            1: {
              value: '1',
              label: 'Brazil',
              parent: '',
              depth: 1,
              weight: 1,
              precisionByCollectedVariableId: {
                'variable-id-2': {
                  precisionid: 'clar-id-2',
                  precisionlabel: 'Préciser :',
                  precisionsize: '5',
                },
              },
            },
            2: {
              value: '2',
              label: 'Canada',
              parent: '',
              depth: 1,
              weight: 2,
            },
            3: {
              value: '3',
              label: 'Japan',
              parent: '',
              depth: 1,
              weight: 3,
            },
            4: {
              value: '4',
              label: 'France',
              parent: '',
              depth: 1,
              weight: 4,
            },
            5: {
              value: '5',
              label: '[Other country](. "Included principalities")',
              parent: '',
              depth: 1,
              weight: 5,
            },
            6: {
              value: '6',
              label: 'Other planet',
              parent: '',
              depth: 1,
              weight: 6,
            },
          },
          name: '',
        },
      };
      expect(remoteToStore(input, clarification)).toEqual(output);
    });
    test('should work with multiple clarification for one code', () => {
      const input = [
        {
          Label: 'Means of transport',
          id: 'j6p2kivg',
          Code: [
            { Parent: '', Label: 'Car', Value: '1' },
            { Parent: '', Label: 'Bike', Value: '2' },
            { Parent: '', Label: 'Skateboard', Value: '3' },
            { Parent: '', Label: 'Plane', Value: '4' },
          ],
          Name: '',
        },
      ];

      const clarification = [
        {
          responseclar: {
            id: 'k4e0h8vg',
            Name: 'clar-id-1',
            Label: 'Préciser :',
            Response: [
              {
                id: 'k4e0gjs8',
                Datatype: {
                  typeName: 'TEXT',
                  type: 'TextDatatypeType',
                  MaxLength: 249,
                },
                CollectedVariableReference: 'variable-id-1',
                mandatory: false,
              },
            ],
          },
          position: 2,
          codelistid: 'j6p2kivg',
          type: 'MULTIPLE_CHOICE',
        },
        {
          responseclar: {
            id: 'k4e0h8vh',
            Name: 'clar-id-2',
            Label: 'Préciser :',
            Response: [
              {
                id: 'k4e0gjs9',
                Datatype: {
                  typeName: 'TEXT',
                  type: 'TextDatatypeType',
                  MaxLength: 249,
                },
                CollectedVariableReference: 'variable-id-2',
                mandatory: false,
              },
            ],
          },
          position: 2,
          codelistid: 'j6p2kivg',
          type: 'MULTIPLE_CHOICE',
        },
      ];

      const output = {
        j6p2kivg: {
          id: 'j6p2kivg',
          label: 'Means of transport',
          codes: {
            1: { value: '1', label: 'Car', parent: '', depth: 1, weight: 1 },
            2: { value: '2', label: 'Bike', parent: '', depth: 1, weight: 2 },
            3: {
              value: '3',
              label: 'Skateboard',
              parent: '',
              depth: 1,
              weight: 3,
              precisionByCollectedVariableId: {
                'variable-id-1': {
                  precisionid: 'clar-id-1',
                  precisionlabel: 'Préciser :',
                  precisionsize: 249,
                },
                'variable-id-2': {
                  precisionid: 'clar-id-2',
                  precisionlabel: 'Préciser :',
                  precisionsize: 249,
                },
              },
            },
            4: {
              value: '4',
              label: 'Plane',
              parent: '',
              depth: 1,
              weight: 4,
            },
          },
          name: '',
        },
      };
      expect(remoteToStore(input, clarification)).toEqual(output);
    });
  });
  describe('remoteToState', () => {
    test('should return the state version of the store', () => {
      expect(remoteToState({ store: true })).toEqual({ id: { store: true } });
    });
  });
  describe('storeToRemote', () => {
    test('should return the remote representation of a codelist', () => {
      const input = {
        j4nwh16i: {
          id: 'j4nwh16i',
          label: 'Products',
          codes: {
            A: {
              value: 'A',
              label: 'Frozen products',
              parent: '',
              depth: 1,
              weight: 1,
            },
            A1: {
              value: 'A1',
              label: 'Ice creams',
              parent: 'A',
              depth: 2,
              weight: 1,
            },
            A2: {
              value: 'A2',
              label: 'Jasper Beardly',
              parent: 'A',
              depth: 2,
              weight: 2,
            },
            B: { value: 'B', label: 'Meat', parent: '', depth: 1, weight: 2 },
            B1: {
              value: 'B1',
              label: 'Bacon',
              parent: 'B',
              depth: 2,
              weight: 1,
            },
            B2: {
              value: 'B2',
              label: 'Pork chop',
              parent: 'B',
              depth: 2,
              weight: 2,
            },
            B3: {
              value: 'B3',
              label: 'Chicken',
              parent: 'B',
              depth: 2,
              weight: 3,
            },
            C: {
              value: 'C',
              label: 'Compote',
              parent: '',
              depth: 1,
              weight: 3,
            },
            C1: {
              value: 'C1',
              label: 'Powersauce',
              parent: 'C',
              depth: 2,
              weight: 1,
            },
            D: { value: 'D', label: 'Other', parent: '', depth: 1, weight: 4 },
          },
          name: '',
        },
      };
      const output = [
        {
          id: 'j4nwh16i',
          Label: 'Products',
          Code: [
            { Label: 'Frozen products', Value: 'A', Parent: '' },
            { Label: 'Ice creams', Value: 'A1', Parent: 'A' },
            { Label: 'Jasper Beardly', Value: 'A2', Parent: 'A' },
            { Label: 'Meat', Value: 'B', Parent: '' },
            { Label: 'Bacon', Value: 'B1', Parent: 'B' },
            { Label: 'Pork chop', Value: 'B2', Parent: 'B' },
            { Label: 'Chicken', Value: 'B3', Parent: 'B' },
            { Label: 'Compote', Value: 'C', Parent: '' },
            { Label: 'Powersauce', Value: 'C1', Parent: 'C' },
            { Label: 'Other', Value: 'D', Parent: '' },
          ],
        },
      ];

      expect(storeToRemote(input)).toEqual(output);
    });
  });
});
