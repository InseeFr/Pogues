import { describe, expect, it } from 'vitest';

import Dictionary from '../dictionary/dictionary';
import { validCollectedVariables } from './validate-variables';

describe('validCollectedVariables', () => {
  it('should return an error if the codeListReference is not the same', () => {
    const value = [
      {
        id: 'jjjyiuzv',
        name: 'SDFSDFsdfsdf',
        label: 'SDFSDFsdfsdf label',
        codeListReference: 'jjjyctp7',
        codeListReferenceLabel: '',
        type: 'TEXT',
        TEXT: {
          maxLength: 1,
        },
      },
    ];
    const state = {
      form: {
        name: 'SDFSDFsdfsdf',
        label: 'sdfsdf',
        responseFormat: {
          type: 'SINGLE_CHOICE',
          SINGLE_CHOICE: {
            mandatory: false,
            visHint: 'CHECKBOX',
            CodesList: {
              id: 'jjjynmyp',
              label: 'cxcvxcvxcv',
              codes: [
                {
                  value: 'asdasd',
                  label: 'sdfsdfs',
                  parent: '',
                  weight: 1,
                  depth: 1,
                },
              ],
              panel: 'QUEST',
            },
          },
        },
        collectedVariables: {
          name: '',
          label: '',
          x: '',
          y: '',
          type: 'TEXT',
          collectedVariables: [
            {
              id: 'jjjyiuzv',
              name: 'SDFSDFsdfsdf',
              label: 'SDFSDFsdfsdf label',
              codeListReference: 'jjjyctp7',
              codeListReferenceLabel: '',
              type: 'TEXT',
              TEXT: {
                maxLength: 1,
              },
            },
          ],
          codeListReference: '',
          codeListReferenceLabel: '',
        },
      },
      stores: {
        jjjynmyp: {
          id: 'jjjynmyp',
          label: 'cxcvxcvxcv',
          codes: {
            asdasd: {
              value: 'asdasd',
              label: 'sdfsdfs',
              parent: '',
              weight: 1,
              depth: 1,
            },
          },
        },
      },
    };
    expect(validCollectedVariables(value, state)).toBe(
      Dictionary.validation_collectedvariable_need_reset,
    );
  });

  it('should return an error if the precision exist', () => {
    const value = [
      {
        id: 'k4dx42lw',
        name: 'QSDD',
        label: 'QSDD label',
        codeListReference: 'k4dwt1kq',
        codeListReferenceLabel: 'qs',
        type: 'TEXT',
        TEXT: {
          maxLength: 1,
        },
      },
    ];
    const state = {
      form: {
        name: 'SDFSDFsdfsdf',
        label: 'sdfsdf',
        responseFormat: {
          type: 'SINGLE_CHOICE',
          SINGLE_CHOICE: {
            mandatory: false,
            visHint: 'CHECKBOX',
            CodesList: {
              id: 'k4dwt1kq',
              label: 'qs',
              codes: [
                {
                  value: 'aa',
                  label: 'bb',
                  parent: '',
                  weight: 1,
                  depth: 1,
                  precisionsize: 249,
                  precisionid: 'test',
                  precisionlabel: 'Préciser :',
                },
              ],
              panel: 'QUEST',
            },
          },
        },
        collectedVariables: {
          name: '',
          label: '',
          x: '',
          y: '',
          type: 'TEXT',
          collectedVariables: [
            {
              id: 'k4dx42lw',
              name: 'QSDD',
              label: 'QSDD label',
              codeListReference: 'k4dwt1kq',
              codeListReferenceLabel: 'qs',
              type: 'TEXT',
              TEXT: {
                maxLength: 1,
              },
            },
          ],
          codeListReference: '',
          codeListReferenceLabel: '',
        },
      },
      stores: {
        jjjynmyp: {
          id: 'jjjynmyp',
          label: 'cxcvxcvxcv',
          codes: {
            asdasd: {
              value: 'aa',
              label: 'bb',
              parent: '',
              weight: 1,
              depth: 1,
            },
          },
        },
      },
    };
    expect(validCollectedVariables(value, state)).toBe(
      Dictionary.validation_collectedvariable_need_reset,
    );
  });

  it("should return an error when precision's collected variable does not exist", () => {
    const value = [
      {
        id: 'var1',
        name: 'Q1',
        label: 'Q1 label',
        codeListReference: 'cl-1',
        codeListReferenceLabel: 'ma code list',
        type: 'TEXT',
      },
    ];
    const state = {
      form: {
        name: 'Q1',
        label: 'ma question',
        responseFormat: {
          type: 'SINGLE_CHOICE',
          SINGLE_CHOICE: {
            CodesList: {
              id: 'cl-1',
              label: 'ma code list',
              codes: [
                {
                  value: 'A',
                  label: 'A',
                  precisionid: 'Q1ACL',
                  precisionlabel: 'Préciser :',
                  precisionsize: 249,
                },
                {
                  value: 'B',
                  label: 'B',
                },
              ],
            },
          },
        },
        collectedVariables: {
          type: 'TEXT',
          collectedVariables: [
            {
              id: 'var1',
              name: 'Q1',
              label: 'Q1 label',
              codeListReference: 'cl-1',
              codeListReferenceLabel: 'ma code list',
              type: 'TEXT',
            },
          ],
        },
      },
      stores: {
        'cl-1': {
          id: 'cl-1',
          label: 'ma code list',
          codes: {
            A: {
              value: 'A',
              label: 'A',
            },
            B: {
              value: 'B',
              label: 'B',
            },
          },
        },
      },
    };
    expect(validCollectedVariables(value, state)).toBe(
      Dictionary.validation_collectedvariable_need_reset,
    );
  });

  it("should be valid when precision's collected variable exists", () => {
    const value = [
      {
        id: 'var1',
        name: 'Q1',
        label: 'Q1 label',
        codeListReference: 'cl-1',
        codeListReferenceLabel: 'ma code list',
        type: 'TEXT',
      },
      {
        id: 'var2',
        name: 'Q1ACL',
        label: 'Q1ACL label',
        codeListReference: undefined,
        codeListReferenceLabel: '',
        type: 'TEXT',
      },
    ];
    const state = {
      form: {
        name: 'Q1',
        label: 'ma question',
        responseFormat: {
          type: 'SINGLE_CHOICE',
          SINGLE_CHOICE: {
            CodesList: {
              id: 'cl-1',
              label: 'ma code list',
              codes: [
                {
                  value: 'A',
                  label: 'A',
                  precisionByCollectedVariableId: {
                    var2: {
                      precisionid: 'Q1ACL',
                      precisionlabel: 'Préciser :',
                      precisionsize: 249,
                    },
                    var3: {
                      precisionid: 'Q2ACL',
                      precisionlabel: 'Préciser :',
                      precisionsize: 249,
                    },
                  },
                },
                {
                  value: 'B',
                  label: 'B',
                },
              ],
            },
          },
        },
        collectedVariables: {
          type: 'TEXT',
          collectedVariables: [
            {
              id: 'var1',
              name: 'Q1',
              label: 'Q1 label',
              codeListReference: 'cl-1',
              codeListReferenceLabel: 'ma code list',
              type: 'TEXT',
            },
            {
              id: 'var2',
              name: 'Q1ACL',
              label: 'Q1ACL label',
              codeListReference: undefined,
              codeListReferenceLabel: '',
              type: 'TEXT',
            },
          ],
        },
      },
      stores: {
        'cl-1': {
          id: 'cl-1',
          label: 'ma code list',
          codes: {
            A: {
              value: 'A',
              label: 'A',
              precisionByCollectedVariableId: {
                var2: {
                  precisionid: 'Q1ACL',
                  precisionlabel: 'Préciser :',
                  precisionsize: 249,
                },
                var3: {
                  precisionid: 'Q2ACL',
                  precisionlabel: 'Préciser :',
                  precisionsize: 249,
                },
              },
            },
            B: {
              value: 'B',
              label: 'B',
            },
          },
        },
      },
    };
    expect(validCollectedVariables(value, state)).toBe(undefined);
  });

  it('should return an error if the codeListReference is not undefined if type === SIMPLE', () => {
    const value = [
      {
        id: 'k25y6zf1',
        name: 'SD',
        label: 'SD label',
        codeListReference: 'k25y8eyw',
        codeListReferenceLabel: 'tes',
        type: 'TEXT',
        TEXT: {
          maxLength: 1,
        },
      },
    ];
    const state = {
      form: {
        name: 'SD',
        label: 'sd',
        responseFormat: {
          type: 'SIMPLE',
          SIMPLE: {
            type: 'TEXT',
            TEXT: {
              maxLength: 249,
            },
          },
        },
        collectedVariables: {
          name: '',
          label: '',
          x: '',
          y: '',
          type: 'TEXT',
          collectedVariables: [
            {
              id: 'k25y6zf1',
              name: 'SD',
              label: 'SD label',
              codeListReference: 'k25y8eyw',
              codeListReferenceLabel: 'tes',
              type: 'TEXT',
              TEXT: {
                maxLength: 1,
              },
            },
          ],
          codeListReference: '',
          codeListReferenceLabel: '',
        },
      },
      stores: {
        jjjynmyp: {
          id: 'k25y8eyw',
          label: 'tes',
          codes: {
            asdasd: {
              depth: 1,
              label: 'ss',
              parent: '',
              value: 'ss',
              weight: 1,
            },
          },
        },
      },
    };
    expect(validCollectedVariables(value, state)).toBe(
      Dictionary.validation_collectedvariable_need_reset,
    );
  });

  it('should return an error if change response content ', () => {
    const value = [
      {
        id: 'k25z3biw',
        name: 'QSD',
        label: 'QSD label',
        codeListReference: undefined,
        codeListReferenceLabel: '',
        type: 'TEXT',
        TEXT: {
          maxLength: 249,
        },
      },
    ];
    const state = {
      form: {
        name: 'QSD',
        label: 'qsd',
        responseFormat: {
          type: 'SIMPLE',
          SIMPLE: {
            type: 'TEXT',
            TEXT: {
              maxLength: 249,
            },
          },
        },
        collectedVariables: {
          name: '',
          label: '',
          x: '',
          y: '',
          type: 'TEXT',
          collectedVariables: [
            {
              id: 'k25z3biw',
              name: 'QSD',
              label: 'QSD label',
              codeListReference: undefined,
              codeListReferenceLabel: '',
              type: 'TEXT',
              TEXT: {
                maxLength: 249,
              },
            },
          ],
          codeListReference: '',
          codeListReferenceLabel: '',
        },
      },
      stores: {},
    };
    expect(validCollectedVariables(value, state)).toBe(false);
  });
});
