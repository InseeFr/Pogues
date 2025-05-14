import { describe, expect, it } from 'vitest';

import Dictionary from '../utils/dictionary/dictionary';
import {
  cartCodeModeCollecte,
  emptyCodes,
  emptyMeasures,
  letterStart,
  maxLength,
  maxValue,
  maximumRequired,
  minValue,
  minimumRequired,
  name,
  nameSize,
  required,
  requiredSelect,
  validCollectedVariables,
  validateDuplicates,
  validateExistingTarget,
} from './validation-rules';

describe('required', () => {
  it('should return required field message if value is null or undefined', () => {
    expect(required(null)).toEqual(Dictionary.validationRequired);
    expect(required(undefined)).toEqual(Dictionary.validationRequired);
  });
  it('should handle string value, returning required field message only if empty string', () => {
    expect(required('')).toEqual(Dictionary.validationRequired);
    expect(required('my value')).toBeUndefined();
  });
  it('should accept numeric value', () => {
    expect(required(2)).toBeUndefined();
    expect(required(-2)).toBeUndefined();
    expect(required(0)).toBeUndefined();
  });
});

describe('maxLength', () => {
  const max = 5;
  it('should return the error message if undefined', () => {
    expect(maxLength(max)()).toBeUndefined();
  });
  it('should return the error message if defined', () => {
    expect(maxLength(max)('sdfsfsdfsdfsdfs')).toEqual(
      `Must be ${max} characters or less`,
    );
  });
  it('should return undefined', () => {
    expect(maxLength(max)('sdfs')).toBeUndefined();
  });
});

describe('minValue', () => {
  const max = 5;
  it('should return the error message if undefined', () => {
    expect(minValue(max)()).toEqual(`${Dictionary.validationMinNumber} ${max}`);
  });
  it('should return the error message if defined', () => {
    expect(minValue(max)(2)).toEqual(
      `${Dictionary.validationMinNumber} ${max}`,
    );
  });
  it('should return undefined', () => {
    expect(minValue(max)(6)).toBeUndefined();
  });
});

describe('maxValue', () => {
  const max = 5;
  it('should return the error message if undefined', () => {
    expect(maxValue(max)()).toEqual(`${Dictionary.validationMaxNumber} ${max}`);
  });
  it('should return the error message if defined', () => {
    expect(maxValue(max)(6)).toEqual(
      `${Dictionary.validationMaxNumber} ${max}`,
    );
  });
  it('should return undefined', () => {
    expect(maxValue(max)(4)).toBeUndefined();
  });
});

describe('requiredSelect', () => {
  it('should return the error message', () => {
    expect(requiredSelect()).toEqual(Dictionary.validationRequired);
  });
  it('should return undefined', () => {
    expect(requiredSelect(['value'])).toBeUndefined();
  });
});

describe('name', () => {
  it('should return the error message', () => {
    expect(name('name with space')).toEqual(Dictionary.validationInvalidName);
  });
  it('should return undefined', () => {
    expect(name('value')).toBeUndefined();
  });
});

describe('nameSize', () => {
  it('should return the error message', () => {
    expect(nameSize('long long long long long longvalue')).toEqual(
      Dictionary.validationInvalidNameSize,
    );
  });
  it('should return undefined', () => {
    expect(nameSize('value')).toBeUndefined();
  });
});

describe('emptyCodes', () => {
  it('should return the error message', () => {
    expect(emptyCodes()).toEqual('No codes');
  });
  it('should return undefined', () => {
    expect(emptyCodes(['value'])).toBeUndefined();
  });
});

describe('emptyMeasures', () => {
  it('should return the error message', () => {
    expect(emptyMeasures([])).toEqual(Dictionary.noMeasureYet);
  });
  it('should return undefined', () => {
    expect(emptyMeasures(['value'])).toBeUndefined();
  });
});

describe('validateExistingTarget', () => {
  it('should return the error message', () => {
    expect(
      validateExistingTarget('value', { stores: { componentsStore: {} } }),
    ).toEqual(Dictionary.errorGoToNonExistingTgt);
  });
  it('should return undefined', () => {
    expect(
      validateExistingTarget('value', {
        stores: { componentsStore: { value: {} } },
      }),
    ).toBeUndefined();
  });
});

describe('validateDuplicates', () => {
  it('should return the error message', () => {
    expect(validateDuplicates('value', { form: [{ name: 'value' }] })).toEqual(
      'Duplicated',
    );
  });
  it('should return undefined', () => {
    expect(
      validateDuplicates('value', { form: [{ name: 'value2' }] }),
    ).toBeUndefined();
  });
});

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

describe('letterStart', () => {
  it('should return the error message if  Identifiant start with number', () => {
    expect(letterStart('5TTJDJ')).toEqual(Dictionary.IsNotLetter);
  });
  it('should return undefined if value undefined', () => {
    expect(letterStart(undefined)).toBeUndefined();
  });
});

describe('minimumRequired', () => {
  const value = '';
  const state = {
    form: {
      TargetMode: '',
      addButtonLibel: '',
      basedOn: 'j6qg8rc6',
      controls: {},
      declarations: {},
      description: '',
      filter: '',
      filterImbriquer: [],
      finalMember: 'j6p0ti5h',
      initialMember: 'j6p0ti5h',
      label: '',
      maximum: '$MAYOR$  > 1',
      minimum: '',
      name: '',
      nameLoop: 'loop1',
      redirections: {},
    },
  };
  it('should return the error message if maximum is defined and mimimum is not', () => {
    expect(minimumRequired(value, state)).toEqual(true);
  });
});

describe('maximumRequired', () => {
  const value = '';
  const state = {
    form: {
      TargetMode: '',
      addButtonLibel: '',
      basedOn: 'j6qg8rc6',
      controls: {},
      declarations: {},
      description: '',
      filter: '',
      filterImbriquer: [],
      finalMember: 'j6p0ti5h',
      initialMember: 'j6p0ti5h',
      label: '',
      maximum: '',
      minimum: '$MAYOR$  > 1',
      name: '',
      nameLoop: 'loop1',
      redirections: {},
    },
  };
  it('should return the error message if maximum is defined and mimimum is not', () => {
    expect(maximumRequired(value, state)).toEqual(true);
  });
});

describe('cartCodeModeCollecte', () => {
  it('should return true declaration TargetMode empty and declaration type is CODECARD', () => {
    const value = 'CODECARD';
    const state = {
      form: {
        declarations: {
          TargetMode: '',
          declarationType: 'CODECARD',
          declarations: [],
          label: 'declar',
          position: 'AFTER_QUESTION_TEXT',
        },
      },
      stores: {},
    };
    expect(cartCodeModeCollecte(value, state)).toEqual(true);
  });
  it('should return true declaration CAWI or PAPI include in TargetMode and declaration type is CODECARD', () => {
    const value = 'CODECARD';
    const state = {
      form: {
        declarations: {
          TargetMode: 'CAWI,CAPI,CATI',
          declarationType: 'CODECARD',
          declarations: [],
          label: 'declar',
          position: 'AFTER_QUESTION_TEXT',
        },
      },
      stores: {},
    };
    expect(cartCodeModeCollecte(value, state)).toEqual(true);
  });
});
